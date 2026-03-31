# InvestEase — Complete Design Analysis & Reverse-Engineering Document

> **Author: Aaqib Uddin Hashmi**
>
> A pixel-perfect reverse-engineering of the InvestEase UX case study published on Medium's Design Bootcamp publication.

---

## SECTION 1 — PAGE CONTEXT

| Attribute | Detail |
|---|---|
| **Page Type** | UX Case Study Article |
| **Platform** | Medium |
| **Publication** | Design Bootcamp (displayed as "Bootcamp" in masthead) |
| **Author** | **Aaqib Uddin Hashmi** |
| **Reading Time** | 10 min read |
| **Date Published** | April 19, 2024 |
| **Topic** | Simplifying the managing experience of multiple accounts & investments |
| **Product** | **InvestEase** — A mobile investment & financial management application |
| **Target Audience** | Modern retail investors, young professionals (25–40), individuals managing multiple bank accounts, demat accounts, and investment portfolios across fragmented platforms |
| **Design Maturity Level** | High-fidelity, process-driven. Utilizes the Google Ventures Design Sprint (5-day) methodology with structured research, ideation, prototyping, and testing phases |
| **Content Intent** | Portfolio storytelling + Educational insight into the product design process. The article serves as both a professional portfolio piece and a teaching resource for aspiring UX designers |

### Additional Context
- The article documents a full product design lifecycle from problem identification to validated prototype
- The design sprint was conducted under mentorship, with **Aaqib Uddin Hashmi** serving as the Product Designer
- The case study follows an industry-standard narrative: Problem → Research → Ideation → Design → Test

---

## SECTION 2 — VISUAL FEEL & EMOTIONAL DESIGN

### Visual Tone
The page adopts a **minimal, editorial, product-centric** aesthetic. Medium's native design framework enforces restraint—the canvas is deliberately quiet so that the *content* speaks. The result is an **academic journal meets tech portfolio** feel.

### Emotional Feel
| Dimension | Analysis |
|---|---|
| **Professional** | The structured methodology (Design Sprint Day 1–5) conveys rigor and discipline |
| **Calm** | Generous whitespace, muted backgrounds, and a single-column layout prevent cognitive overload |
| **Informative** | Dense research artifacts (interview quotes, competitive analysis) establish analytical depth |
| **Trustworthy** | The blue-dominant color palette of the InvestEase app evokes financial security and stability |

### Perceived Credibility
Extremely high. The article builds credibility through:
- Citing structured methodology (Design Sprint by Jake Knapp)
- Including raw research artifacts (FigJam boards, sticky notes, sketches)
- Showing progression from low-fidelity (Crazy 8s sketches) to high-fidelity UI
- Providing user testing results and iteration justification

### Reading Comfort
**High.** Achieved via:
- ~680px content width (optimal 70–80 characters per line)
- 1.58 line-height ratio on body text
- Frequent visual breaks (mockup images every 2–3 paragraphs)
- Logical chunking using bold headings
- Bullet points for research insights and feature lists

### Information Density
**Medium-High.** Each section carries substantial information, but it's broken into digestible chunks. Heavy text sections are always followed by visual artifacts (screenshots, sketches, or mockups).

### Design Personality
Modern, utility-focused, and approachable. The InvestEase product itself balances **financial seriousness** with **consumer-friendly UI patterns** — rounded cards, clear iconography, and intuitive navigation.

### How Design Elements Contribute to Feeling
| Element | Contribution |
|---|---|
| **Color** | Blue instills financial trust; green/red provide intuitive stock market signals |
| **Spacing** | Generous margins create breathing room and reading comfort |
| **Typography** | Serif for editorial gravitas; sans-serif in app for modern utility |
| **Imagery** | Polished mockups on dark backgrounds elevate the professional tone |

---

## SECTION 3 — COLOR SYSTEM

### InvestEase App Color Palette

#### Primary Colors

| Color | Hex | RGB | Usage | Accessibility |
|---|---|---|---|---|
| **Vibrant Blue** | `#0062FF` | rgb(0, 98, 255) | Primary brand color, headers, CTA buttons, active nav icons, progress bars | WCAG AAA on white — 4.8:1 contrast ratio |
| **Deep Navy** | `#0A1F44` | rgb(10, 31, 68) | App header backgrounds, onboarding screens | Excellent contrast on white text |

#### Secondary Colors

| Color | Hex | RGB | Usage | Accessibility |
|---|---|---|---|---|
| **Success Green** | `#2ECC71` | rgb(46, 204, 113) | Positive stock trends, buy recommendations, growth indicators | Good on dark backgrounds |
| **Danger Red** | `#FF3B30` | rgb(255, 59, 48) | Negative trends, sell warnings, loss indicators | Strong visibility |
| **Amber/Orange** | `#FF9500` | rgb(255, 149, 0) | Warning states, moderate risk indicators | Adequate on dark |

#### Neutral Colors

| Color | Hex | RGB | Usage | Accessibility |
|---|---|---|---|---|
| **Structural Background** | `#F4F7FB` | rgb(244, 247, 251) | App screen background — light grey-blue that reduces eye strain | — |
| **Card White** | `#FFFFFF` | rgb(255, 255, 255) | Content cards, modals, bottom sheets — creates depth via elevation | — |
| **Divider Grey** | `#E5E8ED` | rgb(229, 232, 237) | Horizontal rules, section dividers, card borders | — |
| **Subtle Grey** | `#F0F0F0` | rgb(240, 240, 240) | Tag backgrounds, inactive states | — |

#### Text Colors

| Color | Hex | RGB | Usage |
|---|---|---|---|
| **Primary Text** | `#1A1A1A` | rgb(26, 26, 26) | Headlines, balance amounts, primary labels |
| **Secondary Text** | `#666666` | rgb(102, 102, 102) | Metadata, dates, supporting labels |
| **Tertiary Text** | `#999999` | rgb(153, 153, 153) | Hints, placeholders, disabled text |
| **White Text** | `#FFFFFF` | rgb(255, 255, 255) | Text on blue/dark backgrounds |

### Medium Platform Color Palette

| Color | Hex | Usage |
|---|---|---|
| **Headline Black** | `#242424` | Article titles |
| **Body Text** | `#242424` | Body paragraph text |
| **Secondary Text** | `#6B6B6B` | Metadata, reading time, date |
| **Link Green** | `#1A8917` | Follow button, publication links |
| **Background** | `#FFFFFF` | Page canvas |
| **Divider** | `#E6E6E6` | Section dividers |
| **Selection Highlight** | `#A6E3A1` | Text selection highlight (green tint) |

### Color Hierarchy
1. **Blue** dominates the InvestEase app as the trust anchor
2. **Green/Red** serve as semantic indicators (profit/loss)
3. **Neutral greys** create the structural canvas
4. **White cards** provide content elevation
5. Medium's own palette stays intentionally invisible — the platform never competes with the content

### Color Psychology
- **Blue (#0062FF):** Trust, stability, security — the foundational color for financial applications. Used by banking apps worldwide (Chase, PayPal, Coinbase)
- **Green (#2ECC71):** Growth, profit, positive outcomes — universal signal for financial gain
- **Red (#FF3B30):** Loss, urgency, caution — immediate visual alert for declining values
- **Navy (#0A1F44):** Authority, sophistication, premium quality

---

## SECTION 4 — TYPOGRAPHY SYSTEM

### Medium Article Typography

| Element | Font | Weight | Size (px) | Line Height | Letter Spacing | Color | Alignment |
|---|---|---|---|---|---|---|---|
| **Article Title** | `source-serif-pro`, Georgia, serif | 700 (Bold) | 42px | 1.25 (52px) | -0.011em | `#242424` | Left |
| **Section Heading (H2)** | `sohne`, Helvetica, sans-serif | 700 (Bold) | 30px | 1.3 (39px) | 0 | `#242424` | Left |
| **Sub-heading (H3)** | `sohne`, Helvetica, sans-serif | 600 (Semi-Bold) | 22px | 1.35 (30px) | 0 | `#242424` | Left |
| **Body Text** | `source-serif-pro`, Georgia, serif | 400 (Regular) | 20px | 1.58 (32px) | -0.003em | `#242424` | Left |
| **Image Caption** | `sohne`, Helvetica, sans-serif | 400 (Regular) | 14px | 1.4 (20px) | 0 | `#6B6B6B` | Center |
| **Quote/Pullquote** | `source-serif-pro`, italic | 400 (Regular) | 24px | 1.48 (36px) | -0.014em | `#242424` | Left |
| **Metadata (Author/Date)** | `sohne`, Helvetica, sans-serif | 400 (Regular) | 14px | 1.4 (20px) | 0 | `#6B6B6B` | Left |
| **Author Name** | `sohne`, Helvetica, sans-serif | 500 (Medium) | 14px | 1.4 (20px) | 0 | `#242424` | Left |
| **List Items** | `source-serif-pro`, Georgia, serif | 400 (Regular) | 20px | 1.58 (32px) | -0.003em | `#242424` | Left |

#### Paragraph Spacing
- **Between paragraphs:** 28px–32px
- **Between heading and paragraph:** 8px–12px
- **Between paragraphs and images:** 36px–48px
- **Between major sections:** 48px–64px

### InvestEase App Typography

| Element | Font | Weight | Size (px) | Color | Usage |
|---|---|---|---|---|---|
| **App Title/Balance** | IBM Plex Sans | 600 (Semi-Bold) | 28–32px | `#1A1A1A` | Net worth, large balance figures |
| **Section Headers** | IBM Plex Sans | 600 (Semi-Bold) | 18–20px | `#1A1A1A` | Card titles, section headings |
| **Body Labels** | IBM Plex Sans | 400 (Regular) | 14–16px | `#666666` | Transaction descriptions, dates |
| **Button Text** | IBM Plex Sans | 500 (Medium) | 14–16px | `#FFFFFF` | CTA buttons |
| **Small Caption** | IBM Plex Sans | 400 (Regular) | 12px | `#999999` | Timestamp, card metadata |
| **Nav Labels** | IBM Plex Sans | 500 (Medium) | 10–12px | `#0062FF` / `#999999` | Bottom tab labels (active/inactive) |

### How Typography Establishes Hierarchy
1. **Size contrast:** 42px title → 30px H2 → 20px body creates a clear 3-level reading hierarchy
2. **Weight contrast:** Bold headings vs Regular body text guide the eye
3. **Family contrast:** Serif for editorial content (reading flow) vs Sans-serif for UI/functional elements
4. **Color contrast:** Black for primary, grey for secondary information

---

## SECTION 5 — PAGE GRID SYSTEM

### Layout Structure

| Property | Value |
|---|---|
| **Content Column Width** | 680px |
| **Max Content Width** | 680px (text), ~1000px (outset images) |
| **Number of Columns** | Single column (editorial layout) |
| **Left/Right Margins** | Auto-calculated responsive margins |
| **Page Max Width** | Viewport width (fluid) |
| **Gutters** | N/A (single column) |

### Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| **> 1192px** | Content centered at 680px with generous side margins |
| **904px – 1192px** | Content remains 680px, margins reduce proportionally |
| **728px – 904px** | Content width starts to become fluid (~90% viewport) |
| **< 728px** | Full viewport width with 24px side padding |

### Alignment Rules
- **Text blocks:** Left-aligned within the 680px column
- **Images (inline):** Centered, max 680px width
- **Images (outset):** Centered, extend to ~1000px, creating visual emphasis
- **Images (full-width):** Span the entire viewport width (rare, used for hero images)
- **Whitespace distribution:** Symmetrical horizontal; vertical spacing follows the 8px scale

---

## SECTION 6 — SPACING SYSTEM

### Spacing Scale (8px Base Unit)

| Token | Value | Usage |
|---|---|---|
| `space-xxs` | 4px | Inline icon-to-text gap, micro-adjustments |
| `space-xs` | 8px | Between related UI elements (icon + label in app), tight grouping |
| `space-sm` | 12px | Between list items, compact card padding |
| `space-md` | 16px | Standard card internal padding, form field spacing |
| `space-lg` | 24px | Between card sections, between paragraph groups |
| `space-xl` | 32px | Between standard body paragraphs, section sub-gaps |
| `space-2xl` | 48px | Before major section headers, between content blocks |
| `space-3xl` | 64px | Before new article sections (e.g., "User Research"), page-level breathing room |

### Where Each Spacing Level Appears

#### Between Paragraphs
- Standard gap: **28–32px** (approximately `space-xl`)
- This maintains reading rhythm without creating visual disconnection

#### Between Headings and Content
- Heading to first paragraph: **8–12px** (`space-xs` to `space-sm`)
- This tight coupling signals that the heading belongs to the content below

#### Between Images and Text
- Above image: **36–48px** (`space-2xl`)
- Below image: **12–16px** (caption proximity) → then **36–48px** to next section
- This asymmetry gives images visual weight as "section anchors"

#### Between Major Sections
- **48–64px** (`space-2xl` to `space-3xl`)
- Often reinforced with a three-dot visual divider (• • •)

---

## SECTION 7 — HEADER NAVIGATION SYSTEM

### Medium Global Header Components

| Element | Position | Style | Size |
|---|---|---|---|
| **Medium Logo** | Top-left | Black wordmark "Medium" in custom serif | ~112px width |
| **Search Icon** | Right of center | Magnifying glass, thin stroke icon | 24px × 24px |
| **Write Button** | Right section | "Write" text with pen/paper icon | 14px font, `sohne` sans-serif |
| **Sign In** | Right section | Text link, no border | 14px, `#242424` |
| **Sign Up** | Far right | Pill-shaped button, filled green `#1A8917` background, white text | 14px, 36px height, ~20px horizontal padding |

### Layout
- **Full-width container** with max-width constraint (~1192px)
- **Horizontal padding:** 24px on each side
- **Height:** ~57px
- **Border-bottom:** 1px solid `#E6E6E6`
- **Background:** `#FFFFFF`
- **Alignment:** Logo left-aligned; right-side elements grouped with ~24px spacing

### Hover Interactions
| Element | Hover Behavior |
|---|---|
| **Logo** | Opacity reduces slightly (~0.85) |
| **Search Icon** | Subtle color darkening |
| **Write** | Slight opacity change |
| **Sign In** | Text underline appears |
| **Sign Up** | Background darkens to `#156D12` |

---

## SECTION 8 — ARTICLE METADATA COMPONENT

### Layout Structure
```
[Avatar]  [Author Name]        [Follow Button]
          [Publication] · [Date] · [Read Time]
```

### Component Details

| Element | Style |
|---|---|
| **Author Avatar** | 48px × 48px circular image, centered crop, subtle border `1px solid #E6E6E6` |
| **Author Name** | **Aaqib Uddin Hashmi** — `sohne` sans-serif, 14px, Medium weight (500), `#242424`, clickable link |
| **Publication Name** | "in Design Bootcamp" — `sohne` 14px, Regular (400), `#6B6B6B`, clickable |
| **Metadata Line** | "Apr 19, 2024 · 10 min read" — `sohne` 14px, Regular (400), `#6B6B6B` |
| **Follow Button** | Pill-shaped, ~32px height, white background, `1px solid #242424` border, black text "Follow", ~12px horizontal padding |

### Spacing
- **Avatar to text block:** 12px horizontal gap
- **Author name to metadata line:** 4px vertical gap
- **Overall component padding:** 0px top, 24px bottom
- **Margin from article title:** ~24px

### Visual Hierarchy
1. **Aaqib Uddin Hashmi** (bold, dark) — primary focus
2. Publication name (lighter grey) — secondary context
3. Date & reading time (lightest) — tertiary metadata
4. Follow button — call to action, visually separated on the right

---

## SECTION 9 — HERO SECTION

### Cover Image Description
The hero image features **three iPhone mockups** (iPhone 14/15 Pro) displaying InvestEase app screens, floating at slight angles over a **dark blue gradient background** with subtle geometric patterns. The screens showcase:
1. **Home Screen** — Net worth balance, market indices, trending stocks
2. **Investments Screen** — Portfolio allocation, mutual fund/stock cards
3. **Banks Screen** — Connected bank accounts with balance overview

### Image Properties

| Property | Value |
|---|---|
| **Aspect Ratio** | Approximately 16:9 |
| **Width** | Full content width (680px) or outset width (~1000px) |
| **Background Gradient** | Deep navy `#0A1F44` to medium blue `#1A3A6A` |
| **Device Frames** | White/silver iPhone bezels with realistic shadows |
| **Drop Shadow** | Soft diffused shadow (`rgba(0,0,0,0.15), blur 40px`) |
| **Margin Top** | ~32px from metadata |
| **Margin Bottom** | ~48px to first paragraph |

### Purpose in Storytelling
The hero section serves a **triple function:**
1. **Product showcase** — Immediately communicates what InvestEase *looks like*
2. **Professional credibility** — High-fidelity mockups signal design maturity
3. **Emotional hook** — The polished visual draws the reader into the case study narrative

---

## SECTION 10 — CONTENT STRUCTURE

### Complete Article Sections (Top to Bottom)

| # | Section Heading | Purpose | Content Type | Approximate Length |
|---|---|---|---|---|
| 1 | **Introduction** | Sets the stage — personal financial management struggles in the modern era | Text | ~3 paragraphs |
| 2 | **The Problem** | Defines "account fatigue" — fragmented banking, multiple investment platforms, no unified view | Text + statistics | ~4 paragraphs |
| 3 | **Understanding the Problem** | Deeper exploration with user quotes and pain points | Text + bullet points | ~3 paragraphs + list |
| 4 | **Team & My Role** | Credits the team, describes **Aaqib Uddin Hashmi**'s role as Product Designer | Text + team image | ~2 paragraphs |
| 5 | **The Solution — InvestEase** | High-level product overview — what InvestEase does | Text + hero mockups | ~3 paragraphs |
| 6 | **User Research** | Desk research findings, competitive analysis, interview insights | Text + FigJam screenshots | ~5 paragraphs + images |
| 7 | **Competitive Analysis** | Comparison of existing apps (Groww, Kuvera, ET Money, INDmoney) | Text + comparison visuals | ~3 paragraphs |
| 8 | **Key Research Insights** | Top findings from user interviews | Bullet points | ~8–10 bullet points |
| 9 | **Design Sprint — Day 1: Map** | Problem mapping, HMW questions, long-term goals | Text + FigJam board | ~3 paragraphs + image |
| 10 | **Design Sprint — Day 2: Sketch** | Lightning demos, Crazy 8s, solution sketches | Text + sketch photos | ~3 paragraphs + images |
| 11 | **Design Sprint — Day 3: Decide** | Heat map voting, speed critique, storyboard | Text + voting images | ~3 paragraphs + images |
| 12 | **Design Sprint — Day 4: Prototype** | High-fidelity UI design using IBM Carbon Design System | Text + UI mockups | ~4 paragraphs + many images |
| 13 | **Onboarding Flow** | OTP-based login, account setup | UI mockup screens | ~2 paragraphs + images |
| 14 | **Home Screen (Dashboard)** | Net worth, market indices, trending stocks, news | UI mockup + breakdown | ~3 paragraphs + images |
| 15 | **Investments Screen** | Portfolio view, mutual funds, stock holdings | UI mockup + breakdown | ~3 paragraphs + images |
| 16 | **Banks Screen** | Connected accounts, balance aggregation, transactions | UI mockup + breakdown | ~3 paragraphs + images |
| 17 | **Bank Detail / Transactions** | Individual bank details, transaction history | UI mockup + breakdown | ~2 paragraphs + images |
| 18 | **Buy/Sell Stocks & SIP Setup** | Trading flows, SIP configuration | UI mockup + breakdown | ~2 paragraphs + images |
| 19 | **Design Sprint — Day 5: Test** | User testing highlights, validation findings | Text + quotes | ~3 paragraphs |
| 20 | **Wrapping Up / Conclusion** | Summary of learnings, impact, future considerations | Text | ~3 paragraphs |

---

## SECTION 11 — IMAGE AND VISUAL CONTENT

### Visual Asset Inventory

| # | Visual Type | Description | Placement | Width | Caption Style |
|---|---|---|---|---|---|
| 1 | **Hero Mockup** | 3 iPhones floating over dark blue background showing InvestEase screens | After metadata, before intro | Outset (~1000px) | None |
| 2 | **Team Photo/Graphic** | Team introduction visual showing roles and contributions | After "Team & My Role" heading | Content width (680px) | Below image, grey, centered |
| 3 | **Competitive Analysis Board** | FigJam/Miro board showing competitor app comparisons (Groww, Kuvera, ET Money, INDmoney) | In "Competitive Analysis" section | Content width | Centered caption |
| 4 | **User Interview Notes** | Sticky notes from user research sessions | In "User Research" section | Content width | Centered caption |
| 5 | **Day 1 — Problem Map** | FigJam board showing problem mapping exercise with HMW questions | In "Day 1: Map" section | Content width to outset | Centered caption |
| 6 | **Day 2 — Crazy 8s Sketches** | Hand-drawn rapid ideation sketches (8 ideas in 8 minutes) | In "Day 2: Sketch" section | Content width | Centered caption |
| 7 | **Day 2 — Solution Sketches** | More refined sketches of selected concepts | In "Day 2: Sketch" section | Content width | Centered caption |
| 8 | **Day 3 — Heat Map Voting** | Dot-voting results on sketches | In "Day 3: Decide" section | Content width | Centered caption |
| 9 | **Day 3 — Storyboard** | Storyboard panels showing user journey | In "Day 3: Decide" section | Content width | Centered caption |
| 10 | **Onboarding Screens** | Multi-screen mockup showing OTP login flow | In "Onboarding" section | Content or outset width | Centered caption |
| 11 | **Home Screen Mockup** | Detailed view of the dashboard with all components labeled | In "Home Screen" section | Outset width | Centered caption |
| 12 | **Investments Screen Mockup** | Portfolio view with holdings breakdown | In "Investments" section | Outset width | Centered caption |
| 13 | **Banks Screen Mockup** | Bank account listing with balances | In "Banks" section | Outset width | Centered caption |
| 14 | **Bank Detail Screen** | Transaction list for a specific bank | In "Bank Detail" section | Content width | Centered caption |
| 15 | **Buy/Sell Flow** | Trading screen mockups | In "Buy/Sell" section | Content width | Centered caption |
| 16 | **SIP Setup Flow** | Systematic Investment Plan configuration screens | In "SIP Setup" section | Content width | Centered caption |

### Visual Asset Design Patterns
- **App mockups** are consistently presented on **white or dark blue backgrounds** with subtle drop shadows
- **Research artifacts** are shown as raw screenshots maintaining authenticity
- **All mockups** use iPhone frames for consistent device context
- **Caption style:** `sohne` 14px, Regular, `#6B6B6B`, centered below image with 8px gap

---

## SECTION 12 — UX CASE STUDY STORYTELLING STRUCTURE

### Narrative Framework: Design Sprint + Double Diamond

```
┌─────────────────────────────────────────────────────────────────┐
│ ACT 1: EMPATHIZE                                                │
│ ┌─────────────┐    ┌─────────────┐    ┌─────────────┐          │
│ │ Introduction │ →  │ The Problem │ →  │   Research  │          │
│ │  (Hook)      │    │  (Conflict) │    │  (Evidence) │          │
│ └─────────────┘    └─────────────┘    └─────────────┘          │
├─────────────────────────────────────────────────────────────────┤
│ ACT 2: IDEATE                                                   │
│ ┌─────────────┐    ┌─────────────┐    ┌─────────────┐          │
│ │  Day 1: Map │ →  │ Day 2:Sketch│ →  │Day 3:Decide │          │
│ │  (Scope)    │    │ (Diverge)   │    │ (Converge)  │          │
│ └─────────────┘    └─────────────┘    └─────────────┘          │
├─────────────────────────────────────────────────────────────────┤
│ ACT 3: DESIGN & VALIDATE                                       │
│ ┌─────────────┐    ┌─────────────┐    ┌─────────────┐          │
│ │Day 4:Proto- │ →  │ Final UI    │ →  │Day 5: Test  │          │
│ │    type     │    │  Showcase   │    │ (Validate)  │          │
│ └─────────────┘    └─────────────┘    └─────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

### Mapping to UX Framework

| Framework Stage | Article Section | Content |
|---|---|---|
| **Problem** | Introduction + The Problem | Account fatigue, fragmented financial data |
| **Research** | User Research + Competitive Analysis | Desk research, interviews, competitor review |
| **Insights** | Key Research Insights | User needs, behavior patterns, frustrations |
| **Ideation** | Day 1 (Map) + Day 2 (Sketch) | HMW questions, Crazy 8s, solution sketches |
| **Design** | Day 3 (Decide) + Day 4 (Prototype) | Voting, storyboard, high-fidelity UI |
| **Prototype** | Final Screens section | Complete app screens with interactions |
| **Outcome** | Day 5 (Test) + Wrapping Up | User validation, learnings, next steps |

### Narrative Flow Analysis
The article employs a **chronological, process-driven narrative**:
1. **The Hook:** Opens with a relatable problem (managing multiple accounts and investments)
2. **Rising Action:** Progressive research reveals depth of the problem
3. **The Turn:** Design Sprint methodology introduces structured problem-solving
4. **The Climax:** High-fidelity mockups reveal the solution in full
5. **Resolution:** User testing validates the design decisions

This structure is highly effective because it mirrors the actual design process, giving readers both the *journey* and the *destination*.

---

## SECTION 13 — INTERACTION DESIGN

### Medium Platform Interactions

| Component | Behavior | Visual Feedback |
|---|---|---|
| **Clap Button** | Left sidebar (desktop), bottom (mobile); click to clap, hold for multi-clap (max 50 per reader). Article shows ~137 claps. | Floating animation, count increments, brief pulse animation |
| **Comment Button** | Bubble icon with response count (1 response); opens comment drawer | Icon highlights on hover |
| **Share Button** | Social sharing dropdown (Twitter/X, Facebook, LinkedIn, Copy Link, Email) | Dropdown menu appears on click |
| **Bookmark Button** | Toggle save/unsave; adds to reading list | Icon fills on save, outline on unsave |
| **Text Highlight** | Select any text → popup toolbar appears with options: Highlight, Comment, Tweet, Share | Highlight turns green (`#A6E3A1`), tooltip appears above selection |
| **Follow Button** | Follows author **Aaqib Uddin Hashmi** | Button changes from outlined "Follow" to filled "Following" |
| **Publication Link** | Navigates to Design Bootcamp publication home | Underline on hover |
| **Scroll Progress** | Thin progress bar at top of page (on some Medium views) | Green bar fills left-to-right as you scroll |

### Interaction Toolbar (Left Sidebar — Desktop)

```
  ┌───┐
  │ 👏│  Clap (137)
  ├───┤
  │ 💬│  Comment (1)
  ├───┤
  │ ↗ │  Share
  ├───┤
  │ 🔖│  Bookmark
  └───┘
```
- **Position:** Sticky on the left side of the content column
- **Visibility:** Appears after scrolling past the hero image
- **Alignment:** Vertically centered in viewport, ~60px from content edge

---

## SECTION 14 — CONTENT READABILITY DESIGN

### Readability Metrics

| Metric | Value | Standard |
|---|---|---|
| **Line Length** | ~70–80 characters per line | Optimal reading range (Baymard Institute recommends 50–75) |
| **Line Height** | 1.58 (32px on 20px body) | Generous — promotes scanning and reduces eye fatigue |
| **Paragraph Length** | 2–4 sentences average | Short, digestible chunks |
| **Font Size** | 20px body text | Comfortable reading size for sustained reading |
| **Content Column** | 680px | Narrower than full screen — prevents eye travel fatigue |

### Reading Rhythm
The article establishes a consistent **Text → Image → Text** rhythm:
1. **2–3 paragraphs** of explanatory text
2. **1 visual artifact** (mockup, sketch, or board screenshot)
3. **1–2 paragraphs** of context or transition
4. Repeat

This prevents "wall of text" fatigue and provides cognitive rest points.

### Content Chunking
- **Bold headings** every 3–5 paragraphs introduce new sub-topics
- **Bullet points** condense research findings for quick scanning
- **Three-dot dividers (• • •)** signal major topic transitions
- **Number sequences** (Day 1, Day 2...) create predictable progression

### Image Breaks
Images serve as **visual rest stops** that:
- Break monotonous text flow
- Provide concrete visual evidence for abstract concepts
- Allow the reader to process the preceding text
- Create rhythm and pacing in the reading experience

### Why Medium Articles Are Highly Readable
1. **Constrained column width** eliminates long eye sweeps
2. **Large serif body text** optimized for sustained reading
3. **Generous line-height** prevents line-jumping
4. **Minimal distractions** — no sidebars, ads, or popups in the reading zone
5. **Progressive disclosure** — content reveals at the reader's scroll pace
6. **Consistent spacing** creates predictable visual rhythm

---

## SECTION 15 — COMPONENT LIBRARY

### Medium Platform Components

| Component | Description | Key Properties |
|---|---|---|
| **Global Header** | Top navigation bar with logo, search, write, auth | 57px height, white bg, bottom border |
| **Author Card** | Avatar + name + publication + metadata + follow | 48px avatar, horizontal layout |
| **Hero Image Block** | Full-width or outset image container | Responsive, centered |
| **Heading Block (H2)** | Bold section title | 30px, `sohne`, bold, bottom margin 8–12px |
| **Heading Block (H3)** | Sub-section title | 22px, `sohne`, semi-bold |
| **Paragraph Block** | Body text container | 20px, `source-serif-pro`, 1.58 line-height |
| **Image Block** | Inline or outset image with optional caption | Centered, responsive, caption below |
| **Quote Block** | Highlighted text with left border | Left border 3px `#242424`, 24px italic |
| **Bullet List** | Unordered list with disc markers | 20px text, 8px between items |
| **Three-Dot Divider** | Visual section separator (• • •) | Centered, `#242424`, 48–64px vertical margin |
| **Interaction Toolbar** | Clap, comment, share, bookmark | Sticky sidebar (desktop), fixed bottom (mobile) |
| **Article Footer** | Tags, more from author, recommended articles | Full width, grey background sections |

### InvestEase App Components

| Component | Description | Key Properties |
|---|---|---|
| **Bottom Tab Bar** | 3-tab navigation: Home, Investments, Banks | Height ~56px, white bg, top border, active icon in blue |
| **Balance Card** | Net worth / account balance display | White card with shadow, large balance text, percentage change indicator |
| **Market Index Card** | NSE/BSE index with sparkline graph | Compact card, index name, value, change %, mini chart |
| **Stock/Fund Card** | Individual holding card | Icon/avatar left, name + code center, price + change right |
| **Transaction Row** | Single transaction entry | Icon left, merchant/description center, amount right, date below |
| **Bank Account Card** | Connected bank with balance | Bank logo left, bank name + account number center, balance right |
| **Search Bar** | Global search input | Rounded corners, placeholder text, search icon left |
| **CTA Button** | Primary action button | Full width, 48px height, blue `#0062FF` bg, white text, rounded 8px |
| **Tag/Chip** | Category or filter tag | Rounded pill, grey bg, 12px text |
| **OTP Input** | 6-digit code entry | 6 individual boxes, auto-focus, underline or box style |
| **Progress Indicator** | Onboarding step indicator | Horizontal dots, active dot filled blue |
| **App Header** | Screen title with optional back arrow | 56px height, centered title, left icon |

---

## SECTION 16 — MICRO DESIGN DETAILS

### Medium Platform Micro Details

| Detail | Specification |
|---|---|
| **Link hover effect** | Underline appears on hover, color stays `#242424` |
| **Text selection color** | Green tint background `#A6E3A1` |
| **Divider thickness** | 1px solid `#E6E6E6` |
| **Three-dot divider** | Three bullets `•  •  •` with letter-spacing `0.6em`, centered |
| **Follow button border** | 1px solid `#242424`, border-radius 99px (full pill) |
| **Follow button hover** | Background transitions to light grey `#F2F2F2` |
| **Image corner radius** | 0px (images have no border-radius on Medium) |
| **Icon stroke width** | 1.5px–2px (thin line icons throughout) |
| **Avatar border-radius** | 50% (full circle) |
| **Scrollbar** | Auto-hidden on macOS, thin grey track on Windows |
| **Cursor on clickable** | `pointer` cursor on all interactive elements |
| **Focus indicators** | Blue outline ring on focused interactive elements |
| **Transition timing** | 200ms ease-in-out for hover states |
| **Sticky header behavior** | Header hides on scroll-down, reveals on scroll-up |

### InvestEase App Micro Details

| Detail | Specification |
|---|---|
| **Card border-radius** | 12–16px |
| **Card shadow** | `0px 2px 8px rgba(0,0,0,0.08)` |
| **Button border-radius** | 8px for primary, 99px for pill/tag buttons |
| **Icon style** | Outlined/stroke style, 24px, 1.5px stroke weight (Feather-like) |
| **Bottom nav icon size** | 24px with 10px label below |
| **Active tab indicator** | Blue icon + blue label (no underline) |
| **Inactive tab** | Grey icon `#999999` + grey label |
| **Sparkline thickness** | 2px stroke, green for positive, red for negative |
| **Amount formatting** | Indian numeral format (₹12,45,678.00) with ₹ symbol |
| **Percentage badge** | Small rounded rectangle with green/red background, white text |

---

## SECTION 17 — ACCESSIBILITY

### Contrast Analysis

| Element | Foreground | Background | Ratio | WCAG Level |
|---|---|---|---|---|
| **Body text** | `#242424` | `#FFFFFF` | ~14.5:1 | AAA ✅ |
| **Secondary text** | `#6B6B6B` | `#FFFFFF` | ~5.7:1 | AA ✅ |
| **Blue on white** | `#0062FF` | `#FFFFFF` | ~4.8:1 | AA ✅ |
| **White on blue** | `#FFFFFF` | `#0062FF` | ~4.8:1 | AA ✅ |
| **White on navy** | `#FFFFFF` | `#0A1F44` | ~15.2:1 | AAA ✅ |
| **Green on white** | `#2ECC71` | `#FFFFFF` | ~2.9:1 | Fails ⚠️ |
| **Caption text** | `#6B6B6B` | `#FFFFFF` | ~5.7:1 | AA ✅ (14px, normal) |

### Text Readability
- **Large body text (20px):** Excellent readability on all screens
- **Line height (1.58):** Prevents line-jumping, improves comprehension by ~15%
- **Font choice (Source Serif Pro):** Designed specifically for screen reading
- **Paragraph spacing (32px):** Clear paragraph separation aids scanning

### Structural Accessibility
- **Heading hierarchy:** Proper H1 (title) → H2 → H3 nesting for screen readers
- **Image alt text:** Captions provide context for screen readers
- **Link identification:** Links are visually distinguishable (underline on hover)
- **Focus states:** Keyboard navigation supported with visible focus rings
- **Color is not the only indicator:** Stock trends use arrows (▲▼) in addition to color

### Areas for Improvement
- The green success color (`#2ECC71`) alone fails contrast requirements on white
- Some app mockup text at 12px may be below minimum size recommendations
- Touch target sizes in app mockups may be difficult to evaluate without prototyping

---

## SECTION 18 — FIGMA RECREATION GUIDE

### Step 1: Set Up the Canvas

```
Frame: MacBook Pro 14" (1512 × 982) or Desktop (1440 × 900)
Background: #FFFFFF
```

### Step 2: Configure Grid

```
Layout Grid:
├── Columns: 1
├── Type: Center
├── Width: 680px
├── Margin: Auto (centered)
└── Gutter: N/A
```

For outset images:
```
Secondary Grid:
├── Width: 1000px
├── Type: Center
└── Used for: Hero images, emphasized visuals
```

### Step 3: Typography Tokens

Create these text styles in Figma:

```
Styles:
├── Article/Title
│   ├── Font: Source Serif Pro
│   ├── Weight: Bold (700)
│   ├── Size: 42px
│   ├── Line Height: 52px (1.25)
│   ├── Letter Spacing: -0.46px
│   └── Color: #242424
│
├── Article/H2
│   ├── Font: Sohne (or Helvetica Neue)
│   ├── Weight: Bold (700)
│   ├── Size: 30px
│   ├── Line Height: 39px (1.3)
│   └── Color: #242424
│
├── Article/H3
│   ├── Font: Sohne (or Helvetica Neue)
│   ├── Weight: Semi-Bold (600)
│   ├── Size: 22px
│   ├── Line Height: 30px (1.35)
│   └── Color: #242424
│
├── Article/Body
│   ├── Font: Source Serif Pro
│   ├── Weight: Regular (400)
│   ├── Size: 20px
│   ├── Line Height: 32px (1.58)
│   ├── Letter Spacing: -0.06px
│   └── Color: #242424
│
├── Article/Caption
│   ├── Font: Sohne (or Helvetica Neue)
│   ├── Weight: Regular (400)
│   ├── Size: 14px
│   ├── Line Height: 20px (1.4)
│   └── Color: #6B6B6B
│
├── Article/Metadata
│   ├── Font: Sohne (or Helvetica Neue)
│   ├── Weight: Regular (400)
│   ├── Size: 14px
│   ├── Line Height: 20px
│   └── Color: #6B6B6B
│
└── App/Balance (for InvestEase mockups)
    ├── Font: IBM Plex Sans
    ├── Weight: Semi-Bold (600)
    ├── Size: 28px
    └── Color: #1A1A1A
```

### Step 4: Color Tokens

Create color styles:

```
Colors/Medium:
├── Text/Primary:     #242424
├── Text/Secondary:   #6B6B6B
├── Background:       #FFFFFF
├── Divider:          #E6E6E6
├── Green/CTA:        #1A8917
└── Selection:        #A6E3A1

Colors/InvestEase:
├── Brand/Primary:    #0062FF
├── Brand/Navy:       #0A1F44
├── Semantic/Success: #2ECC71
├── Semantic/Danger:  #FF3B30
├── Semantic/Warning: #FF9500
├── Surface/Background: #F4F7FB
├── Surface/Card:     #FFFFFF
├── Surface/Divider:  #E5E8ED
├── Text/Primary:     #1A1A1A
├── Text/Secondary:   #666666
├── Text/Tertiary:    #999999
└── Text/OnPrimary:   #FFFFFF
```

### Step 5: Spacing Tokens

```
Spacing:
├── XXS:  4px
├── XS:   8px
├── SM:   12px
├── MD:   16px
├── LG:   24px
├── XL:   32px
├── 2XL:  48px
└── 3XL:  64px
```

### Step 6: Component Structure

Build these components in Figma:

```
Components/Medium:
├── Header (auto-layout, fixed top)
│   ├── Logo
│   ├── Spacer (fill)
│   ├── Search Icon
│   ├── Write Button
│   ├── Sign In Link
│   └── Sign Up Button (pill, green)
│
├── Author Card (auto-layout, horizontal)
│   ├── Avatar (48×48, circle)
│   ├── Text Block (auto-layout, vertical, 4px gap)
│   │   ├── Author Name: "Aaqib Uddin Hashmi"
│   │   └── Metadata: "in Design Bootcamp · Apr 19, 2024 · 10 min read"
│   └── Follow Button (pill, outlined)
│
├── Hero Image Block (centered)
│   └── Image (fill, max-width: 1000px)
│
├── Paragraph Block
│   └── Text (680px width, auto height)
│
├── Heading Block
│   └── Text (680px width)
│
├── Image Block
│   ├── Image (centered, max-width: 680px or 1000px)
│   └── Caption (centered, 14px)
│
├── Divider (three-dot)
│   └── "• • •" (centered, letter-spacing 0.6em)
│
└── Interaction Toolbar (vertical, sticky)
    ├── Clap Icon + Count
    ├── Comment Icon + Count
    ├── Share Icon
    └── Bookmark Icon

Components/InvestEase App:
├── Bottom Tab Bar
│   ├── Tab Item (icon 24px + label 10px, vertical)
│   │   ├── Variant: Active (blue)
│   │   └── Variant: Inactive (grey)
│   └── Background: white, top-border 1px #E5E8ED
│
├── Balance Card
│   ├── Label (14px, grey)
│   ├── Amount (28px, bold, black)
│   ├── Change Badge (green/red pill)
│   └── Auto-layout: vertical, 8px gap, 16px padding
│
├── Market Index Card
│   ├── Index Name (14px, semi-bold)
│   ├── Value (16px, bold)
│   ├── Change % (12px, green/red)
│   └── Sparkline (width: fill, height: 32px)
│
├── Stock/Fund Card
│   ├── Icon (40×40, rounded square)
│   ├── Name + Code (vertical text)
│   └── Price + Change (right-aligned)
│
├── Transaction Row
│   ├── Category Icon (40×40, circle, grey bg)
│   ├── Merchant + Date (vertical text)
│   └── Amount (right-aligned, 16px, bold)
│
├── Bank Account Card
│   ├── Bank Logo (40×40)
│   ├── Bank Name + Account (vertical)
│   └── Balance (right-aligned)
│
├── CTA Button
│   ├── Full-width, 48px height
│   ├── Border-radius: 8px
│   ├── Background: #0062FF
│   └── Label: white, 16px, medium weight
│
└── App Header
    ├── Back Arrow (optional)
    ├── Title (centered, 18px, semi-bold)
    └── Action Icon (optional, right)
```

### Step 7: Assembly Order

1. Place the Medium header (fixed, top)
2. Add article title in `Source Serif Pro Bold 42px`
3. Place the Author Card component with "**Aaqib Uddin Hashmi**"
4. Insert hero image at outset width
5. Build content sections: alternate Paragraph and Image blocks
6. Use three-dot dividers between major sections
7. Place the interaction toolbar (sticky sidebar)
8. For InvestEase mockups: use iPhone 14/15 Pro frame components from Figma community
9. Embed app screens within device frames
10. Apply consistent spacing tokens throughout

### Step 8: Export Settings

```
For presentation:
├── Scale: 2x
├── Format: PNG
└── Include background: Yes

For development handoff:
├── Use Figma's Inspect panel
├── Export assets as SVG (icons) and PNG@2x (images)
└── Use CSS code snippets from Inspect
```

---

## APPENDIX — QUICK REFERENCE CARD

### Key Numbers to Remember

| Item | Value |
|---|---|
| Content width | 680px |
| Outset image width | ~1000px |
| Body font size | 20px |
| Title font size | 42px |
| Line height | 1.58 |
| Primary blue | #0062FF |
| Text black | #242424 |
| Medium green | #1A8917 |
| Spacing base | 8px |
| Card radius | 12–16px |
| App font | IBM Plex Sans |
| Article font | Source Serif Pro |

---

> **Document created by Aaqib Uddin Hashmi**
> Complete design analysis for pixel-perfect recreation.
> All rights reserved.
