/* ===== CHART RENDERING (Canvas API) ===== */

const Charts = {
  /**
   * Draw a smooth area/line chart on a canvas element.
   * @param {string} canvasId - Canvas element ID
   * @param {number[]} data - Array of numeric values
   * @param {object} opts - Options: lineColor, fillColor, lineWidth, animate
   */
  drawAreaChart(canvasId, data, opts = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const padding = { top: 10, bottom: 10, left: 0, right: 0 };

    const lineColor = opts.lineColor || '#FFFFFF';
    const fillColor = opts.fillColor || 'rgba(255,255,255,0.15)';
    const lineWidth = opts.lineWidth || 2.5;
    const animate = opts.animate !== false;

    const min = Math.min(...data) * 0.98;
    const max = Math.max(...data) * 1.02;
    const range = max - min || 1;

    const points = data.map((val, i) => ({
      x: padding.left + (i / (data.length - 1)) * (w - padding.left - padding.right),
      y: padding.top + (1 - (val - min) / range) * (h - padding.top - padding.bottom),
    }));

    function drawFrame(progress) {
      ctx.clearRect(0, 0, w, h);

      const visibleCount = Math.ceil(points.length * progress);
      const visiblePoints = points.slice(0, visibleCount);

      if (visiblePoints.length < 2) return;

      // Draw smooth curve using cubic bezier
      ctx.beginPath();
      ctx.moveTo(visiblePoints[0].x, visiblePoints[0].y);

      for (let i = 1; i < visiblePoints.length; i++) {
        const prev = visiblePoints[i - 1];
        const curr = visiblePoints[i];
        const cpx1 = prev.x + (curr.x - prev.x) * 0.4;
        const cpx2 = prev.x + (curr.x - prev.x) * 0.6;
        ctx.bezierCurveTo(cpx1, prev.y, cpx2, curr.y, curr.x, curr.y);
      }

      // Fill area
      const fillPath = new Path2D();
      fillPath.moveTo(visiblePoints[0].x, visiblePoints[0].y);
      for (let i = 1; i < visiblePoints.length; i++) {
        const prev = visiblePoints[i - 1];
        const curr = visiblePoints[i];
        const cpx1 = prev.x + (curr.x - prev.x) * 0.4;
        const cpx2 = prev.x + (curr.x - prev.x) * 0.6;
        fillPath.bezierCurveTo(cpx1, prev.y, cpx2, curr.y, curr.x, curr.y);
      }
      fillPath.lineTo(visiblePoints[visiblePoints.length - 1].x, h);
      fillPath.lineTo(visiblePoints[0].x, h);
      fillPath.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      if (fillColor.includes('rgba')) {
        gradient.addColorStop(0, fillColor);
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
      } else {
        gradient.addColorStop(0, fillColor);
        gradient.addColorStop(1, 'transparent');
      }

      ctx.fillStyle = gradient;
      ctx.fill(fillPath);

      // Draw line
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Draw dot at last point
      const lastPt = visiblePoints[visiblePoints.length - 1];
      ctx.beginPath();
      ctx.arc(lastPt.x, lastPt.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = lineColor;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(lastPt.x, lastPt.y, 6, 0, Math.PI * 2);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    if (animate) {
      let start = null;
      const duration = 1200;

      function anim(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        drawFrame(eased);
        if (progress < 1) requestAnimationFrame(anim);
      }

      requestAnimationFrame(anim);
    } else {
      drawFrame(1);
    }
  },

  /**
   * Draw a small sparkline/mini chart.
   */
  drawMiniChart(canvasId, data, opts = {}) {
    this.drawAreaChart(canvasId, data, {
      lineColor: opts.lineColor || '#00C48C',
      fillColor: opts.fillColor || 'rgba(0,196,140,0.1)',
      lineWidth: opts.lineWidth || 1.8,
      animate: opts.animate !== false,
    });
  },
};
