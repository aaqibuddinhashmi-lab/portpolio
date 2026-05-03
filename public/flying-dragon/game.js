// Flying Dragon - Browser Game (Canvas)
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Constants
const GAME_W = 800, GAME_H = 600, FPS = 60;
const GRAVITY = 0.5, FLAP = -6.9, MAX_VEL = 10;
const PIPE_SPEED = 3, PIPE_GAP = 200, PIPE_W = 70, PIPE_SPAWN = 2000;
const BIRD_W = 50, BIRD_H = 35;

// Skins
const SKINS = {
  ember: { body:[227,99,84], dark:[169,56,58], wing:[255,195,124], belly:[255,228,177], horn:[255,242,214], eye:[62,33,44], spark:[[255,244,199],[255,179,82],[255,90,55]] },
  jade: { body:[109,196,134], dark:[62,132,96], wing:[198,244,190], belly:[233,255,225], horn:[247,253,235], eye:[32,60,48], spark:[[236,255,205],[143,255,191],[101,211,175]] },
  moon: { body:[145,143,238], dark:[86,87,182], wing:[216,193,255], belly:[239,231,255], horn:[251,245,255], eye:[45,34,84], spark:[[244,234,255],[197,182,255],[138,113,255]] }
};
const THEMES = {
  sunset: { top:[77,55,143], mid:[177,86,116], bottom:[255,181,120], glow:[255,215,148], sun:[255,226,157] },
  moonrise: { top:[29,38,92], mid:[70,84,154], bottom:[125,115,175], glow:[163,189,255], sun:[236,242,255] }
};

// State
let state = 'ready', score = 0, highScore = 0, skinKey = 'ember', themeKey = 'sunset';
let bird = null, pipes = [], particles = [], baseX = 0, ticks = 0, lastPipe = 0;
let countdown = 0, countdownTimer = 0;
let viewport = { x:0, y:0, w:GAME_W, h:GAME_H, scale:1 };

// Load save
try { const s = JSON.parse(localStorage.getItem('fd_save')||'{}'); highScore = s.hi||0; skinKey = s.skin||'ember'; themeKey = s.theme||'sunset'; } catch(e){}
function save() { localStorage.setItem('fd_save', JSON.stringify({hi:highScore,skin:skinKey,theme:themeKey})); }

// Utils
const rgb = (c,a) => a!==undefined ? `rgba(${c[0]},${c[1]},${c[2]},${a})` : `rgb(${c[0]},${c[1]},${c[2]})`;
const rand = (a,b) => Math.random()*(b-a)+a;
const clamp = (v,lo,hi) => Math.max(lo,Math.min(hi,v));

// Resize
function resize() {
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const scaleX = canvas.width/GAME_W, scaleY = canvas.height/GAME_H;
  viewport.scale = Math.min(scaleX, scaleY);
  viewport.w = GAME_W*viewport.scale; viewport.h = GAME_H*viewport.scale;
  viewport.x = (canvas.width-viewport.w)/2; viewport.y = (canvas.height-viewport.h)/2;
}
window.addEventListener('resize', resize); resize();

// Dragon drawing
function drawDragon(x, y, rot, frame, palette, scale=1) {
  ctx.save();
  ctx.translate(x+BIRD_W*scale/2, y+BIRD_H*scale/2);
  ctx.rotate(rot*Math.PI/180);
  ctx.scale(scale, scale);
  const s = 0.5; // art->bird scale
  const ol = [48,33,37];
  const wingLift = [0.85,0.2,-0.7,-0.1][frame%4];
  const wp = 12+wingLift*18;
  // Tail
  ctx.fillStyle = rgb(palette.dark);
  ctx.beginPath(); ctx.moveTo((24-50)*s,(39-35)*s); ctx.lineTo((5-50)*s,(32-35)*s); ctx.lineTo((8-50)*s,(40-35)*s); ctx.lineTo((3-50)*s,(49-35)*s); ctx.lineTo((17-50)*s,(47-35)*s); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = rgb(ol); ctx.lineWidth = 1.5*s; ctx.stroke();
  // Tail fin
  ctx.fillStyle = rgb(palette.wing);
  ctx.beginPath(); ctx.moveTo((6-50)*s,(33-35)*s); ctx.lineTo((0-50)*s,(25-35)*s); ctx.lineTo((11-50)*s,(29-35)*s); ctx.closePath(); ctx.fill(); ctx.stroke();
  // Rear wing
  ctx.fillStyle = rgb(palette.dark);
  ctx.beginPath(); ctx.moveTo((34-50)*s,(39-35)*s); ctx.lineTo((17-50)*s,(wp-35)*s); ctx.lineTo((7-50)*s,(wp+12-35)*s); ctx.lineTo((21-50)*s,(44-35)*s); ctx.closePath(); ctx.fill(); ctx.stroke();
  // Body
  ctx.fillStyle = rgb(palette.body);
  ctx.beginPath(); ctx.ellipse((47-50)*s,(35-35)*s, 17*s, 11*s, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  // Belly
  ctx.fillStyle = rgb(palette.belly);
  ctx.beginPath(); ctx.ellipse((50.5-50)*s,(35.5-35)*s, 7.5*s, 5.5*s, 0, 0, Math.PI*2); ctx.fill();
  // Front wing
  ctx.fillStyle = rgb(palette.wing);
  ctx.beginPath(); ctx.moveTo((51-50)*s,(38-35)*s); ctx.lineTo((30-50)*s,(wp+8-35)*s); ctx.lineTo((21-50)*s,(wp+20-35)*s); ctx.lineTo((40-50)*s,(46-35)*s); ctx.closePath(); ctx.fill(); ctx.stroke();
  // Head
  ctx.fillStyle = rgb(palette.body);
  ctx.beginPath(); ctx.ellipse((65-50)*s,(29-35)*s, 12*s, 12*s, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = rgb(palette.belly);
  ctx.beginPath(); ctx.ellipse((64-50)*s,(28-35)*s, 6*s, 4*s, 0, 0, Math.PI*2); ctx.fill();
  // Horns
  ctx.fillStyle = rgb(palette.horn);
  ctx.beginPath(); ctx.moveTo((61-50)*s,(17-35)*s); ctx.lineTo((59-50)*s,(8-35)*s); ctx.lineTo((66-50)*s,(16-35)*s); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo((70-50)*s,(18-35)*s); ctx.lineTo((72-50)*s,(8-35)*s); ctx.lineTo((76-50)*s,(18-35)*s); ctx.closePath(); ctx.fill(); ctx.stroke();
  // Spikes
  for(const sx of [36,44,52]) {
    ctx.beginPath(); ctx.moveTo((sx-50)*s,(24-35)*s); ctx.lineTo((sx+2-50)*s,(16-35)*s); ctx.lineTo((sx+6-50)*s,(24-35)*s); ctx.closePath(); ctx.fill(); ctx.stroke();
  }
  // Eye
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc((68-50)*s,(28-35)*s, 4*s, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = rgb(palette.eye); ctx.beginPath(); ctx.arc((69-50)*s,(28-35)*s, 2*s, 0, Math.PI*2); ctx.fill();
  // Mouth
  ctx.strokeStyle = rgb(palette.eye); ctx.lineWidth = 1*s;
  ctx.beginPath(); ctx.moveTo((63-50)*s,(35-35)*s); ctx.lineTo((72-50)*s,(37-35)*s); ctx.stroke();
  // Feet
  ctx.fillStyle = rgb(palette.dark);
  for(const fx of [42,52]) { ctx.beginPath(); ctx.ellipse((fx+4-50)*s,(45.5-35)*s, 4*s, 2.5*s, 0, 0, Math.PI*2); ctx.fill(); }
  ctx.restore();
}

// Sky drawing
function drawSky(theme) {
  const t = THEMES[theme];
  const grad = ctx.createLinearGradient(0,0,0,GAME_H);
  grad.addColorStop(0, rgb(t.top)); grad.addColorStop(0.5, rgb(t.mid)); grad.addColorStop(1, rgb(t.bottom));
  ctx.fillStyle = grad; ctx.fillRect(0,0,GAME_W,GAME_H);
  // Sun/Moon
  ctx.fillStyle = rgb(t.sun, 0.3);
  ctx.beginPath(); ctx.arc(650, 100, 80, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = rgb(t.sun, 0.6);
  ctx.beginPath(); ctx.arc(650, 100, 40, 0, Math.PI*2); ctx.fill();
  // Stars for moonrise
  if(theme==='moonrise') {
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    for(let i=0;i<30;i++) { const sx=(i*137+23)%GAME_W, sy=(i*97+11)%300; ctx.fillRect(sx,sy,2,2); }
  }
  // Clouds
  ctx.fillStyle = rgb(t.glow, 0.15);
  for(let i=0;i<4;i++) { const cx=(i*220+ticks*0.1+50)%900-50; ctx.beginPath(); ctx.ellipse(cx,80+i*40,60,20,0,0,Math.PI*2); ctx.fill(); }
}

// Ground
function drawGround() {
  ctx.fillStyle = '#2d1f0e';
  ctx.fillRect(0, GAME_H-50, GAME_W, 50);
  ctx.fillStyle = '#4a3520';
  ctx.fillRect(0, GAME_H-50, GAME_W, 4);
  // Grass tufts
  ctx.fillStyle = '#3a6b35';
  for(let i=0;i<40;i++) {
    const gx = ((i*23+Math.floor(baseX))%GAME_W+GAME_W)%GAME_W;
    ctx.fillRect(gx, GAME_H-52, 3, 6);
  }
}

// Pipe drawing
function drawPipe(pipe) {
  const colors = themeKey==='sunset' ? {body:[80,58,52],rim:[110,80,65],highlight:[140,110,90]} : {body:[50,55,85],rim:[70,78,110],highlight:[100,110,145]};
  // Top pipe
  ctx.fillStyle = rgb(colors.body);
  ctx.fillRect(pipe.x, 0, PIPE_W, pipe.topH);
  ctx.fillStyle = rgb(colors.rim);
  ctx.fillRect(pipe.x-4, pipe.topH-20, PIPE_W+8, 20);
  ctx.fillStyle = rgb(colors.highlight, 0.3);
  ctx.fillRect(pipe.x+5, 0, 8, pipe.topH-20);
  // Bottom pipe
  const botY = pipe.topH+PIPE_GAP;
  ctx.fillStyle = rgb(colors.body);
  ctx.fillRect(pipe.x, botY, PIPE_W, GAME_H-botY-50);
  ctx.fillStyle = rgb(colors.rim);
  ctx.fillRect(pipe.x-4, botY, PIPE_W+8, 20);
  ctx.fillStyle = rgb(colors.highlight, 0.3);
  ctx.fillRect(pipe.x+5, botY+20, 8, GAME_H-botY-70);
}

// Create bird
function resetBird() {
  bird = { x:GAME_W/4, y:GAME_H/2-BIRD_H/2, vy:0, frame:0, animTimer:0, rot:0 };
}
resetBird();

// Particle system
function spawnParticle() {
  if(particles.length>18 || ticks%2!==0) return;
  const p = SKINS[skinKey];
  particles.push({ x:bird.x+5, y:bird.y+BIRD_H/2+rand(-2,4), dx:rand(-1.6,-0.5), dy:rand(-0.5,0.6), r:rand(2,4), life:rand(10,18)|0, maxLife:18, color:p.spark[(Math.random()*3)|0] });
}

function updateParticles() {
  for(const p of particles) { p.x+=p.dx; p.y+=p.dy; p.dy+=0.03; p.r*=0.94; p.life--; }
  particles = particles.filter(p=>p.life>0&&p.r>0.6);
}

function drawParticles() {
  for(const p of particles) {
    const a = clamp(p.life/p.maxLife,0,1);
    ctx.fillStyle = rgb(p.color, a);
    ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(1,p.r), 0, Math.PI*2); ctx.fill();
  }
}

// Input
let inputQueue = [];
function doFlap() { if(state==='playing') inputQueue.push('flap'); else if(state==='ready') { state='countdown'; countdown=3; countdownTimer=Date.now(); } else if(state==='gameover') resetGame(); }

canvas.addEventListener('mousedown', e => { e.preventDefault(); doFlap(); });
canvas.addEventListener('touchstart', e => { e.preventDefault(); doFlap(); }, {passive:false});
window.addEventListener('keydown', e => { if(e.code==='Space'||e.code==='ArrowUp') { e.preventDefault(); doFlap(); } });

function resetGame() {
  resetBird(); pipes=[]; particles=[]; score=0; baseX=0; state='ready'; lastPipe=0;
}

// Game loop
function update() {
  ticks++;
  if(state==='countdown') {
    const elapsed = Date.now()-countdownTimer;
    const newCD = 3-Math.floor(elapsed/1000);
    if(newCD<=0) { state='playing'; countdown=0; lastPipe=ticks; }
    else countdown=newCD;
    // Idle bob
    bird.y = GAME_H/2-BIRD_H/2 + Math.sin(ticks/30)*6;
    bird.animTimer = (bird.animTimer+1)%24;
    bird.frame = (bird.animTimer/6|0)%4;
    bird.rot = Math.sin(ticks/35)*5;
    return;
  }
  if(state==='ready') {
    bird.y = GAME_H/2-BIRD_H/2 + Math.sin(ticks/30)*6;
    bird.animTimer = (bird.animTimer+1)%24;
    bird.frame = (bird.animTimer/6|0)%4;
    bird.rot = Math.sin(ticks/35)*5;
    return;
  }
  if(state!=='playing') return;

  // Process input
  while(inputQueue.length) { inputQueue.shift(); bird.vy=FLAP; }

  // Physics
  bird.vy = Math.min(bird.vy+GRAVITY, MAX_VEL);
  bird.y += bird.vy;
  bird.animTimer = (bird.animTimer+1)%24;
  bird.frame = (bird.animTimer/6|0)%4;
  bird.rot = clamp(-bird.vy*3.2, -26, 24);

  spawnParticle();
  updateParticles();

  // Pipes
  if(ticks-lastPipe > PIPE_SPAWN/1000*FPS) {
    const topH = rand(80, GAME_H-PIPE_GAP-130);
    pipes.push({ x:GAME_W, topH, scored:false });
    lastPipe = ticks;
  }
  baseX = (baseX+PIPE_SPEED)%(GAME_W);
  for(const p of pipes) { p.x -= PIPE_SPEED; if(!p.scored && p.x+PIPE_W<bird.x) { p.scored=true; score++; } }
  pipes = pipes.filter(p=>p.x>-PIPE_W-10);

  // Collision
  const bx=bird.x+8, by=bird.y+6, bw=BIRD_W-16, bh=BIRD_H-12;
  if(bird.y+BIRD_H>GAME_H-50 || bird.y<0) die();
  for(const p of pipes) {
    if(bx+bw>p.x && bx<p.x+PIPE_W) {
      if(by<p.topH || by+bh>p.topH+PIPE_GAP) die();
    }
  }
}

function die() {
  state='gameover';
  if(score>highScore) { highScore=score; save(); }
}

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='#0a0a1a'; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.save();
  ctx.translate(viewport.x, viewport.y);
  ctx.scale(viewport.scale, viewport.scale);

  drawSky(themeKey);
  for(const p of pipes) drawPipe(p);
  drawGround();
  drawParticles();
  drawDragon(bird.x, bird.y, bird.rot, bird.frame, SKINS[skinKey]);

  // Score
  if(state==='playing'||state==='gameover') {
    ctx.fillStyle='#fff'; ctx.font='bold 48px sans-serif'; ctx.textAlign='center';
    ctx.shadowColor='rgba(0,0,0,0.5)'; ctx.shadowBlur=6;
    ctx.fillText(score, GAME_W/2, 60);
    ctx.shadowBlur=0;
  }

  // Ready screen
  if(state==='ready') {
    ctx.fillStyle='rgba(0,0,0,0.3)'; ctx.fillRect(0,0,GAME_W,GAME_H);
    ctx.fillStyle='#fff'; ctx.font='bold 42px sans-serif'; ctx.textAlign='center';
    ctx.fillText('FLYING DRAGON', GAME_W/2, GAME_H/2-60);
    ctx.font='20px sans-serif'; ctx.fillStyle='rgba(255,255,255,0.7)';
    ctx.fillText('Click / Tap / Space to Start', GAME_W/2, GAME_H/2+20);
    // Skin buttons
    const skinNames = Object.keys(SKINS);
    for(let i=0;i<skinNames.length;i++) {
      const sx = GAME_W/2-120+i*120, sy=GAME_H/2+60;
      ctx.fillStyle = skinNames[i]===skinKey ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)';
      ctx.strokeStyle = skinNames[i]===skinKey ? '#fff' : 'rgba(255,255,255,0.3)';
      ctx.lineWidth=2;
      ctx.beginPath(); ctx.roundRect(sx-40,sy-10,80,50,8); ctx.fill(); ctx.stroke();
      drawDragon(sx-BIRD_W/2, sy, 0, (ticks/8|0)%4, SKINS[skinNames[i]], 0.8);
    }
    // Theme toggle
    ctx.fillStyle='rgba(255,255,255,0.1)'; ctx.beginPath(); ctx.roundRect(GAME_W/2-60,GAME_H/2+130,120,30,6); ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.7)'; ctx.font='14px sans-serif';
    ctx.fillText(themeKey==='sunset'?'☀ Sunset':'🌙 Moonrise', GAME_W/2, GAME_H/2+150);
  }

  // Countdown
  if(state==='countdown') {
    ctx.fillStyle='#fff'; ctx.font='bold 72px sans-serif'; ctx.textAlign='center';
    ctx.shadowColor='rgba(0,0,0,0.5)'; ctx.shadowBlur=10;
    ctx.fillText(countdown, GAME_W/2, GAME_H/2+20);
    ctx.shadowBlur=0;
  }

  // Game over
  if(state==='gameover') {
    ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.fillRect(0,0,GAME_W,GAME_H);
    ctx.fillStyle='#ff6b6b'; ctx.font='bold 48px sans-serif'; ctx.textAlign='center';
    ctx.fillText('GAME OVER', GAME_W/2, GAME_H/2-50);
    ctx.fillStyle='#fff'; ctx.font='28px sans-serif';
    ctx.fillText(`Score: ${score}`, GAME_W/2, GAME_H/2+10);
    ctx.fillStyle='rgba(255,255,255,0.6)'; ctx.font='20px sans-serif';
    ctx.fillText(`Best: ${highScore}`, GAME_W/2, GAME_H/2+45);
    ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font='18px sans-serif';
    ctx.fillText('Tap to Restart', GAME_W/2, GAME_H/2+90);
  }

  ctx.restore();
}

// Skin/theme selection on ready screen
canvas.addEventListener('click', e => {
  if(state!=='ready') return;
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX-rect.left-viewport.x)/viewport.scale;
  const my = (e.clientY-rect.top-viewport.y)/viewport.scale;
  // Skin buttons
  const skinNames = Object.keys(SKINS);
  for(let i=0;i<skinNames.length;i++) {
    const sx=GAME_W/2-120+i*120, sy=GAME_H/2+60;
    if(mx>sx-40&&mx<sx+40&&my>sy-10&&my<sy+40) { skinKey=skinNames[i]; save(); e.stopPropagation(); return; }
  }
  // Theme toggle
  if(mx>GAME_W/2-60&&mx<GAME_W/2+60&&my>GAME_H/2+130&&my<GAME_H/2+160) {
    themeKey = themeKey==='sunset'?'moonrise':'sunset'; save(); e.stopPropagation(); return;
  }
});

// Main loop
function loop() { update(); draw(); requestAnimationFrame(loop); }
loop();
