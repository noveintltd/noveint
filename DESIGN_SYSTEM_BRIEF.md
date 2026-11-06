# NOVEINT.COM → NOVETOOLS.COM
## Master UI/UX Design & Styling Brief (Design System Specification)

**Version:** 1.0.0  
**Target Platform:** `novetools.com` (Derived from `noveint.com`)  
**Design Philosophy:** *Cyberpunk Minimalist / High-Tech Monochromatic Editorial* — Void black canvases, terminal neon accents, high-contrast typography, mathematical grid alignments, and reactive micro-interactions.

---

## 1. Color Palette & Surface Tokens

### 1.1 Core Brand Colors
| Token Name | Hex Code | RGB Equivalent | Usage & Semantic Role |
| :--- | :--- | :--- | :--- |
| **Void Black** | `#000000` | `rgb(0, 0, 0)` | Primary canvas background, input backgrounds, backdrop overlays |
| **Neon Terminal Green** | `#39FF14` | `rgb(57, 255, 20)` | Primary interactive accent, active links, glow highlights, primary CTAs |
| **Pure White** | `#FFFFFF` | `rgb(255, 255, 255)` | Primary headlines, brand suffix (`INT` / `TOOLS`), active icons |
| **Muted Light Gray** | `#D1D5DB` | `rgb(209, 213, 219)` (gray-300) | Secondary body copy on hover, feature labels |
| **Subdued Slate** | `#9CA3AF` | `rgb(156, 163, 175)` (gray-400) | Standard body descriptions, inactive nav links |
| **Dimmed Slate** | `#6B7280` | `rgb(107, 114, 128)` (gray-500) | Secondary captions, sub-labels, package feature disclaimers |
| **Deep Slate** | `#4B5563` | `rgb(75, 85, 99)` (gray-600) | Inactive features, legal disclaimer copy, metadata lines |
| **Error Crimson** | `#EF4444` | `rgb(239, 68, 68)` (red-500) | Form validation errors, network disconnect alerts |

---

### 1.2 Surface Opacities & Glassmorphism Shades
```css
/* Card & Panel Surfaces */
--surface-card-base:       rgba(255, 255, 255, 0.03);  /* bg-white/[0.03] */
--surface-card-glass:      rgba(255, 255, 255, 0.05);  /* bg-white/5 backdrop-blur-sm */
--surface-scrolled-nav:    rgba(0, 0, 0, 0.95);        /* backdrop-blur-md */
--surface-floating-widget: rgba(0, 0, 0, 0.90);        /* bg-black/90 backdrop-blur-md */
--surface-neon-tint:       rgba(57, 255, 20, 0.05);    /* bg-[#39FF14]/5 (success container) */

/* Structural Borders & Lines */
--border-subtle:           rgba(255, 255, 255, 0.05);  /* border-white/5 */
--border-standard:         rgba(255, 255, 255, 0.10);  /* border-white/10 */
--border-input:            rgba(255, 255, 255, 0.20);  /* border-white/20 */
--border-nav-scrolled:     rgba(255, 255, 255, 0.20);  /* border-b border-white/20 */
--border-neon-subtle:      rgba(57, 255, 20, 0.20);    /* border-[#39FF14]/20 */
--border-neon-active:      rgba(57, 255, 20, 0.40);    /* border-[#39FF14]/40 */
--border-neon-solid:       #39FF14;                    /* border-[#39FF14] */

/* Selection Highlight */
::selection {
  background: #39FF14;
  color: #000000;
}
```

---

## 2. Typography & Letter-Spacing System

### 2.1 Font Family Hierarchy
- **Primary Sans-Serif:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Fallback / Monospace Accents:** Embedded numbers, data tags, and package indices use strict tabular figures or wide-tracked geometric layouts.
- **Font Smoothness:** `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`

### 2.2 Weights & Roles
- `font-black` (`900`): Brand marks, mega hero titles, package prices, primary action buttons.
- `font-bold` (`700`): Section eyebrow badges, form labels, nav actions, status badges.
- `font-semibold` (`600`): Nav items, dropdown links.
- `font-normal` (`400`): Secondary descriptions, package listings.
- `font-light` (`300`): Sub-hero narrative text, fine-print disclaimers.

### 2.3 Tracking (Letter-Spacing) & Text Transform Matrix
| Element / Role | Tailwind Class | Letter Spacing Value | Transform | Font Weight |
| :--- | :--- | :--- | :--- | :--- |
| **Mega Hero Display** | `tracking-tighter` | `-0.05em` | `uppercase` | `900` (`font-black`) |
| **Section H2 Headings** | `tracking-tighter` | `-0.05em` | `uppercase` | `900` (`font-black`) |
| **Service Card H3** | `tracking-tight` | `-0.025em` | `uppercase` | `900` (`font-black`) |
| **Desktop Nav Links** | `tracking-widest` | `0.1em` | `uppercase` | `600` (`font-semibold`) |
| **Action Buttons (CTA)** | `tracking-[0.2em]` to `[0.4em]` | `0.2em` – `0.4em` | `uppercase` | `900` (`font-black`) |
| **Eyebrow Tags / Badges**| `tracking-[0.3em]` | `0.3em` | `uppercase` | `700` (`font-bold`) |
| **Footer & Meta Links** | `tracking-[0.2em]` | `0.2em` | `uppercase` | `900` (`font-black`) |
| **Location / UTC Stamp** | `tracking-[0.4em]` | `0.4em` | `uppercase` | `900` (`font-black`) |
| **Input Field Labels** | `tracking-widest` | `0.1em` | `uppercase` | `700` (`font-bold`) |

---

## 3. UI Components, Borders & Shadows

### 3.1 Neon Button Specification (`.neon-button`)
The signature interactive element used across heroes, forms, and tools.

```css
.neon-button {
  border: 1px solid #39FF14;
  color: #39FF14;
  background-color: transparent;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  font-weight: 900;
  border-radius: 0px; /* Strict 0px geometric discipline */
}

/* Shimmer scanline effect on hover */
.neon-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(57, 255, 20, 0.25), transparent);
  transition: 0.5s;
}

.neon-button:hover::after {
  left: 100%;
}

.neon-button:hover {
  background-color: #39FF14;
  color: #000000;
  box-shadow: 0 0 30px rgba(57, 255, 20, 0.5);
  transform: translateY(-2px);
}
```

---

### 3.2 Cyberpunk Corner Cut Cards
Cards in Nove use geometric framing with high-tech corner reticles that illuminate on hover:

```tsx
<div className="group relative border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex flex-col h-full transition-all duration-300 hover:border-white/20">
  {/* Top-Left Reticle Corner */}
  <div className="absolute -top-px -left-px w-4 h-4 border-t border-l border-[#39FF14] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  
  {/* Bottom-Right Reticle Corner */}
  <div className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-[#39FF14] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

  {/* Card Content */}
  <div className="text-[10px] text-[#39FF14] font-black tracking-[0.3em] uppercase mb-4 opacity-50">
    TOOL // 01
  </div>
  <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white group-hover:text-[#39FF14] transition-colors">
    Utility Title
  </h3>
  <p className="text-[11px] text-gray-500 font-light tracking-wide leading-relaxed">
    Description text goes here...
  </p>
</div>
```

---

### 3.3 Large Monospaced Background Watermark Cards
Used in capability matrices:
- **Card Container:** `relative overflow-hidden border border-white/10 p-8 bg-black hover:border-[#39FF14] transition-all duration-500`
- **Watermark Number:** 
  ```tsx
  <div className="absolute -top-4 -right-2 text-8xl md:text-9xl font-black text-white/5 select-none transition-all duration-700 group-hover:text-[#39FF14]/10 group-hover:-translate-y-2 group-hover:translate-x-2 pointer-events-none">
    01
  </div>
  ```

---

### 3.4 Input & Form Component System
- **Container:** `space-y-2`
- **Label:** `text-[10px] font-bold tracking-widest text-[#39FF14] uppercase ml-1`
- **Input / Textarea:**
  ```html
  <input 
    className="w-full bg-black border border-white/20 p-4 outline-none focus:border-[#39FF14] transition-colors text-white rounded-none" 
  />
  ```
- **Focus Shadow:** Optional `focus:shadow-[0_0_15px_rgba(57,255,20,0.3)]`.

---

### 3.5 Glow & Shadow Formulas
```css
/* Inline Neon Glow for text or badges */
.neon-glow-sm { box-shadow: 0 0 10px #39FF14; }
.neon-glow-md { box-shadow: 0 0 20px #39FF14; }
.neon-glow-lg { box-shadow: 0 0 30px rgba(57, 255, 20, 0.5); }
.neon-drop-shadow { filter: drop-shadow(0 0 15px rgba(57, 255, 20, 0.8)); }

/* Subtle pulse glow for status dots */
.status-dot-active {
  box-shadow: 0 0 8px rgba(57, 255, 20, 0.5);
}
```

---

## 4. Navigation & Footer Layout Architecture

### 4.1 Global Navbar Anatomy
- **Positioning:** Fixed top (`fixed top-0 w-full z-[140]`).
- **Initial State:** `bg-transparent py-6 md:py-8 transition-all duration-300`.
- **Scrolled State (`.is-scrolled`):**
  - Background: `rgba(0, 0, 0, 0.95) !important`
  - Backdrop Blur: `blur(10px) !important`
  - Border: `1px solid rgba(255, 255, 255, 0.2) !important` (bottom border)
  - Height: `h-10 md:h-12` container.
- **Max Width:** `max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center`.

#### 4.1.1 Logo Construct (1:1 Ratio Formula)
```tsx
<Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-2 shrink-0 group">
  <span>
    <span className="text-[#39FF14]">NOVE</span>TOOLS
  </span>
  <img 
    src="/nove_trans_300.webp" 
    alt="NoveTools" 
    className="h-[1.25em] w-auto inline-block object-contain transition-transform duration-300 group-hover:scale-105"
  />
</Link>
```
*Note: For `novetools.com`, replace `INT` with `TOOLS` in white (`#FFFFFF`) with `NOVE` in `#39FF14`.*

#### 4.1.2 Desktop Navigation Links & Underline Animation
```tsx
<Link to="/tools" className="relative py-2 text-white hover:text-[#39FF14] transition-colors text-sm font-semibold tracking-widest uppercase">
  <motion.span whileHover="hover" initial="initial" className="relative">
    Tools
    <motion.div 
      variants={{
        hover: { scaleX: 1, opacity: 1 },
        initial: { scaleX: 0, opacity: 0 }
      }}
      className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#39FF14] shadow-[0_0_10px_#39FF14]"
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ originX: 0 }}
    />
  </motion.span>
</Link>
```

#### 4.1.3 Mobile Navigation Drawer
- **Trigger:** Cyberpunk 3-bar hamburger lines (`w-7 h-0.5 bg-[#39FF14]`), transforming into an "X" on toggle:
  - Line 1: `rotate-45 translate-y-0.5`
  - Line 2: `opacity-0`
  - Line 3: `-rotate-45 -translate-y-0.5`
- **Drawer Overlay:** `fixed inset-0 z-[130] bg-black transition-transform duration-500 ease-in-out`
- **Slide Direction:** Top-to-bottom (`-translate-y-full` to `translate-y-0`).
- **Links:** `text-4xl font-black uppercase tracking-tighter hover:text-[#39FF14] transition-all`.
- **Stagger:** Delays applied per index (`transitionDelay: index * 50ms`).

---

### 4.2 Footer Specification
- **Wrapper:** `py-12 border-t border-white/10 bg-black px-6 md:px-12`
- **Layout:**
  - Column 1: Logo construct + Sub-tagline (`text-[10px] text-gray-500 uppercase tracking-[0.2em]`).
  - Column 2: Legal links (`text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#39FF14]`).
  - Column 3: Region / Timezone stamp (`text-[10px] text-[#39FF14]/60 uppercase tracking-[0.4em] font-black` + `GMT / UTC`).
- **Bottom Legal Bar:**
  - `pt-8 border-t border-white/5`
  - `text-[9px] text-gray-600 leading-relaxed max-w-4xl`

---

## 5. Micro-Interactions, Motion & 3D Environments

### 5.1 3D Perspective Grid Floor
A trademark Nove spatial asset to include beneath hero or tool showcase sections:

```css
.perspective-grid {
  position: absolute;
  bottom: -35%;
  left: -50%;
  width: 200%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(57, 255, 20, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(57, 255, 20, 0.12) 1px, transparent 1px);
  background-size: 60px 60px;
  transform: perspective(700px) rotateX(65deg);
  mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 80%);
  -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 80%);
  z-index: 0;
  pointer-events: none;
}
```

---

### 5.2 Radar / Radar Sweep Animation
Used on featured product teasers:
```tsx
<div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
  {/* Concentric Ping Rings */}
  <div className="absolute inset-0 rounded-full border border-[#39FF14]/30 animate-ping [animation-duration:3s]" />
  <div className="absolute inset-4 rounded-full border border-[#39FF14]/20 animate-ping [animation-duration:3s] [animation-delay:1s]" />
  <div className="absolute inset-8 rounded-full border border-[#39FF14]/10 animate-ping [animation-duration:3s] [animation-delay:2s]" />
  
  {/* Rotating Scanner Blade */}
  <div className="absolute inset-0 rounded-full border border-[#39FF14]/50 overflow-hidden">
    <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-[#39FF14]/30 origin-right animate-[spin_4s_linear_infinite]" />
  </div>

  {/* Center Emblem */}
  <div className="relative z-10 text-3xl font-black text-[#39FF14] drop-shadow-[0_0_15px_rgba(57,255,20,0.8)]">
    NoveTools
  </div>
</div>
```

---

### 5.3 Vertical Reading Progress Indicator
A sleek vertical line pinned along the viewport edge:
```tsx
<div className="fixed top-0 left-0 w-[2px] h-full z-[120] bg-white/5 pointer-events-none hidden md:block">
  <div
    className="w-full bg-[#39FF14] shadow-[0_0_8px_#39FF14] transition-all duration-150"
    style={{ height: `${scrollProgress}%` }}
  />
</div>
```

---

### 5.4 Custom Dual-Ring Cursor (`CustomCursor.tsx`)
1. **Outer Ring:**
   - Size: `32px` (`w-8 h-8`), border `1px solid #39FF14`, `mixBlendMode: 'difference'`.
   - Scale: expands to `scale(1.5)` over clickable targets (`button`, `a`, `role="button"`).
2. **Inner Core Dot:**
   - Size: `8px` (`w-2 h-2`), background `#39FF14`, `shadow-[0_0_10px_#39FF14]`.

---

### 5.5 Fast Slide-Up Animation (`.animate-hero-entry`)
```css
@keyframes fastSlideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-hero-entry {
  animation: fastSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

---

## 6. Implementation Checklist for `novetools.com`

- [ ] **Base Canvas:** Set `body` background `#000000`, text `#ffffff`, selection `bg-[#39FF14] text-black`.
- [ ] **Tailwind Config:** Register font `'Inter'`, and custom utilities (`.neon-button`, `.perspective-grid`, `.grid-bg`).
- [ ] **Logo Asset:** Use the shared `/nove_trans_300.webp` SVG/WebP emblem next to `<span className="text-[#39FF14]">NOVE</span>TOOLS`.
- [ ] **Card Geometry:** Enforce strict zero-radius corners (`rounded-none`), subtle border `border-white/10`, and glowing reticle corners (`border-[#39FF14]`).
- [ ] **Micro-interactions:** Include origin-left line scale animations (`scaleX`) on all navigation and action links.
- [ ] **Bilingual Ready:** Provide native toggling between `EN` and `zh-TW` with matching uppercase tracking adjustments.
