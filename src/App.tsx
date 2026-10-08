import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_125121_afb71ce9-9c64-4c54-90b5-c89c0764c052.png&w=1920&q=85';

const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_135737_0da59642-725b-451a-997b-b0283d95a42a.png&w=1280&q=85';

// Concentric arc calculations centered at (-110, 300)
const CX = -110;
const CY = 300;
const degToRad = (deg: number) => (deg * Math.PI) / 180;
const getCoords = (r: number, deg: number) => {
  const rad = degToRad(deg);
  return {
    x: Number((CX + r * Math.cos(rad)).toFixed(2)),
    y: Number((CY + r * Math.sin(rad)).toFixed(2)),
  };
};

interface ArcData {
  r: number;
  start: number;
  end: number;
  dot: number;
  num: string;
  suffix: string;
  label: string;
}

const ARC_DATA: ArcData[] = [
  {
    r: 330,
    start: -92,
    end: 16,
    dot: -46,
    num: '10',
    suffix: '+',
    label: 'YEARS REAL',
  },
  {
    r: 395,
    start: -56,
    end: 60,
    dot: 2,
    num: '40',
    suffix: '+',
    label: 'USE FORMS',
  },
  {
    r: 460,
    start: -14,
    end: 72,
    dot: 44,
    num: '95',
    suffix: '%',
    label: 'REPEAT MEMBERS',
  },
];

const NAV_LINKS = ['Module', 'Case Records', 'Biotech', 'Tiers', 'Live Demo'];

export default function App() {
  const [activeLink, setActiveLink] = useState('Module');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);
  const gridPatternRef = useRef<SVGPatternElement | null>(null);

  // Mouse physics coordinates
  const mouseState = useRef({
    targetX: -999,
    targetY: -999,
    targetGridX: 0,
    targetGridY: 0,
    smoothX: -999,
    smoothY: -999,
    currentGridX: 0,
    currentGridY: 0,
  });

  const lastRenderedPos = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      lastRenderedPos.current = { x: -999, y: -999 }; // trigger redraw
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const onMouseMove = (e: MouseEvent) => {
      const normX = e.clientX / window.innerWidth;
      const normY = e.clientY / window.innerHeight;
      mouseState.current.targetX = e.clientX;
      mouseState.current.targetY = e.clientY;
      mouseState.current.targetGridX = (normX - 0.5) * 16;
      mouseState.current.targetGridY = (normY - 0.5) * 16;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        const touch = e.touches[0];
        const normX = touch.clientX / window.innerWidth;
        const normY = touch.clientY / window.innerHeight;
        mouseState.current.targetX = touch.clientX;
        mouseState.current.targetY = touch.clientY;
        mouseState.current.targetGridX = (normX - 0.5) * 16;
        mouseState.current.targetGridY = (normY - 0.5) * 16;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    let animationFrameId: number;

    const loop = () => {
      const state = mouseState.current;

      // 1. Grid Parallax: target = (normalized cursor position − 0.5) × 16px, eased at 0.06 lerp per frame
      state.currentGridX += (state.targetGridX - state.currentGridX) * 0.06;
      state.currentGridY += (state.targetGridY - state.currentGridY) * 0.06;

      if (gridPatternRef.current) {
        gridPatternRef.current.setAttribute('x', state.currentGridX.toFixed(2));
        gridPatternRef.current.setAttribute('y', state.currentGridY.toFixed(2));
      }

      // 2. Cursor smoothing: rAF loop with lerp factor 0.1 toward real mouse position, starting offscreen at (-999, -999)
      state.smoothX += (state.targetX - state.smoothX) * 0.1;
      state.smoothY += (state.targetY - state.smoothY) * 0.1;

      // 3. Spotlight Mask Render
      const ctx = canvas.getContext('2d');
      const revealEl = revealRef.current;

      if (ctx && revealEl) {
        const dist = Math.hypot(
          state.smoothX - lastRenderedPos.current.x,
          state.smoothY - lastRenderedPos.current.y,
        );

        // Only redraw & update mask dataURL when cursor position changes
        if (dist > 0.1) {
          lastRenderedPos.current = { x: state.smoothX, y: state.smoothY };

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const radius = 260;
          const grad = ctx.createRadialGradient(
            state.smoothX,
            state.smoothY,
            0,
            state.smoothX,
            state.smoothY,
            radius,
          );

          // stops: 0→1 opacity, 0.4→1, 0.6→0.75, 0.75→0.4, 0.88→0.12, 1→0
          grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
          grad.addColorStop(0.4, 'rgba(0, 0, 0, 1)');
          grad.addColorStop(0.6, 'rgba(0, 0, 0, 0.75)');
          grad.addColorStop(0.75, 'rgba(0, 0, 0, 0.4)');
          grad.addColorStop(0.88, 'rgba(0, 0, 0, 0.12)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(state.smoothX, state.smoothY, radius, 0, Math.PI * 2);
          ctx.fill();

          const dataUrl = canvas.toDataURL();
          revealEl.style.maskImage = `url(${dataUrl})`;
          revealEl.style.webkitMaskImage = `url(${dataUrl})`;
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-white tracking-[-0.02em] selection:bg-red-500/30 selection:text-white"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* Hidden canvas for spotlight mask */}
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

      {/* Semantic context for Search Engines (SEO) & Screen Readers prioritizing ajaynxt.com */}
      <header className="sr-only">
        <h1>ajaynxt.com — Official Website Work by Ajay Saini | Creative 3D Web Development</h1>
        <p>
          Welcome to ajaynxt.com, the official website work and creative engineering portfolio of Ajay Saini.
          Specializing in bespoke luxury websites, interactive 3D canvas experiences, spotlight radial masking,
          smooth physics parallax, and cutting-edge UI/UX. Discover our full body of work and client projects at https://ajaynxt.com.
        </p>
      </header>

      {/* Navbar (fixed, z-50) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between md:justify-center p-4 sm:p-5">
        {/* Desktop (md+): ONE centered pill */}
        <div className="hidden md:flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-full pl-3 pr-2 py-2 nav-drop border border-white/10 shadow-lg shadow-black/20">
          {/* 22x22 white SVG logo linked to ajaynxt.com */}
          <a
            href="https://ajaynxt.com"
            target="_blank"
            rel="noopener noreferrer"
            title="ajaynxt.com — Ajay Saini"
            className="flex items-center hover:opacity-80 transition-opacity gap-1.5 mr-1"
          >
            <svg
              className="w-[22px] h-[22px] text-white flex-shrink-0"
              viewBox="0 0 256 256"
              fill="currentColor"
              aria-label="ajaynxt.com Logo"
            >
              <path d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z" />
            </svg>
            <span className="text-white text-[13px] font-semibold tracking-tight hidden lg:inline">ajaynxt.com</span>
          </a>

          {/* Links */}
          {NAV_LINKS.map((link) => {
            const isActive = activeLink === link;
            return (
              <button
                key={link}
                onClick={() => setActiveLink(link)}
                className={`text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link}
              </button>
            );
          })}

          {/* White CTA "Connect" opens Ajay Saini details */}
          <button
            onClick={() => setConnectModalOpen(true)}
            className="bg-white text-gray-900 text-sm font-semibold px-5 py-1.5 rounded-full hover:bg-gray-100 transition-colors ml-1 active:scale-95"
          >
            Connect
          </button>
        </div>

        {/* Mobile (<md): Logo pill (left) and Hamburger toggle pill (right) */}
        <div className="flex md:hidden items-center justify-between w-full">
          {/* Logo pill */}
          <a
            href="https://ajaynxt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/60 backdrop-blur-md rounded-full px-3 py-2 flex items-center nav-drop border border-white/10"
            title="Ajay Saini (ajaynxt.com)"
          >
            <svg
              className="w-[22px] h-[22px] text-white flex-shrink-0"
              viewBox="0 0 256 256"
              fill="currentColor"
              aria-label="Logo"
            >
              <path d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z" />
            </svg>
          </a>

          {/* Hamburger toggle pill */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="bg-black/60 backdrop-blur-md rounded-full p-2 flex items-center justify-center text-white nav-drop border border-white/10 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown (fixed, z-40) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white pt-16 pb-6 px-5 shadow-lg flex flex-col border-b border-gray-200">
          <div className="flex flex-col mb-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => {
                  setActiveLink(link);
                  setMobileMenuOpen(false);
                }}
                className={`py-3 border-b border-gray-100 text-left text-sm font-medium transition-colors ${
                  activeLink === link ? 'text-black font-semibold' : 'text-gray-800'
                } hover:text-black`}
              >
                {link}
              </button>
            ))}
            <a
              href="https://ajaynxt.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 border-b border-gray-100 text-left text-sm font-medium text-red-600 hover:text-red-700 flex items-center justify-between"
            >
              <span>Creator: Ajay Saini</span>
              <span>ajaynxt.com ↗</span>
            </a>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setConnectModalOpen(true);
            }}
            className="bg-gray-900 text-white text-sm font-semibold py-2.5 px-5 rounded-full hover:bg-black transition-colors w-full"
          >
            Connect
          </button>
        </div>
      )}

      {/* Hero section (100dvh, relative overflow-hidden) */}
      <section className="relative h-[100dvh] w-full overflow-hidden select-none bg-black">
        {/* Layer 1: Grid background (z-0) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-10"
          aria-hidden="true"
        >
          <defs>
            <pattern
              ref={gridPatternRef}
              id="hero-grid-pattern"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
              x="0"
              y="0"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#64748b"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
        </svg>

        {/* Layer 2: Base image (z-10) with Ken Burns intro */}
        <div
          className="absolute inset-0 bg-center bg-cover z-10 animate-ken-burns pointer-events-none"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
          aria-hidden="true"
        />

        {/* Layer 3: Cursor spotlight reveal layer (z-30) */}
        <div
          ref={revealRef}
          className="absolute inset-0 bg-center bg-cover z-30 animate-ken-burns pointer-events-none"
          style={{
            backgroundImage: `url(${BG_IMAGE_2})`,
            maskSize: '100% 100%',
            WebkitMaskSize: '100% 100%',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />

        {/* Layer 4: Stats on a fading circular arc (z-50, hidden below sm) */}
        <div className="hidden sm:block absolute inset-y-0 right-0 pointer-events-none z-50 h-full w-auto">
          <svg
            viewBox="0 0 380 700"
            preserveAspectRatio="xMaxYMid meet"
            className="h-full w-auto"
            aria-label="Statistics"
          >
            <defs>
              {ARC_DATA.map((arc, i) => {
                const pStart = getCoords(arc.r, arc.start);
                const pEnd = getCoords(arc.r, arc.end);
                return (
                  <linearGradient
                    key={`arc-grad-${i}`}
                    id={`arc-grad-${i}`}
                    gradientUnits="userSpaceOnUse"
                    x1={pStart.x}
                    y1={pStart.y}
                    x2={pEnd.x}
                    y2={pEnd.y}
                  >
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                    <stop offset="22%" stopColor="#ffffff" stopOpacity="0.5" />
                    <stop offset="55%" stopColor="#ffffff" stopOpacity="0.5" />
                    <stop offset="85%" stopColor="#ffffff" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                );
              })}
            </defs>

            {ARC_DATA.map((arc, i) => {
              const pStart = getCoords(arc.r, arc.start);
              const pEnd = getCoords(arc.r, arc.end);
              const pDot = getCoords(arc.r, arc.dot);

              // Arc length: r * deltaAngle(rad)
              const deltaAngleRad = degToRad(arc.end - arc.start);
              const arcLength = Number((arc.r * deltaAngleRad).toFixed(2));

              // Delays
              const lineDelay = Number((0.4 + i * 0.22).toFixed(2));
              const markDelay = Number((lineDelay + 0.9).toFixed(2));

              return (
                <g key={`arc-group-${i}`}>
                  {/* Arc stroke line */}
                  <path
                    d={`M ${pStart.x} ${pStart.y} A ${arc.r} ${arc.r} 0 0 1 ${pEnd.x} ${pEnd.y}`}
                    fill="none"
                    stroke={`url(#arc-grad-${i})`}
                    strokeWidth="1.1"
                    className="arc-line"
                    style={
                      {
                        '--len': `${arcLength}px`,
                        '--delay': `${lineDelay}s`,
                      } as React.CSSProperties
                    }
                  />

                  {/* Filled white circle r=3.4 */}
                  <circle
                    cx={pDot.x}
                    cy={pDot.y}
                    r="3.4"
                    fill="#ffffff"
                    className="arc-dot"
                    style={
                      {
                        '--delay': `${markDelay}s`,
                      } as React.CSSProperties
                    }
                  />

                  {/* White ring r=7 at 35% stroke opacity */}
                  <circle
                    cx={pDot.x}
                    cy={pDot.y}
                    r="7"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.1"
                    strokeOpacity="0.35"
                    className="arc-ring"
                    style={
                      {
                        '--delay': `${Number((markDelay + 0.3).toFixed(2))}s`,
                      } as React.CSSProperties
                    }
                  />

                  {/* Number at dot+(16,4) in white 32px */}
                  <text
                    x={pDot.x + 16}
                    y={pDot.y + 4}
                    fill="#ffffff"
                    fontSize="32"
                    fontWeight="700"
                    className="arc-text font-mono"
                    style={
                      {
                        '--delay': `${Number((markDelay + 0.15).toFixed(2))}s`,
                      } as React.CSSProperties
                    }
                  >
                    {arc.num}
                    <tspan fontSize="19" dy="-10" letterSpacing="-1px">
                      {arc.suffix}
                    </tspan>
                  </text>

                  {/* Uppercase label at dot+(18,22), 8.5px, weight 600, letter-spacing 2px, 80% opacity */}
                  <text
                    x={pDot.x + 18}
                    y={pDot.y + 22}
                    fill="#ffffff"
                    fillOpacity="0.8"
                    fontSize="8.5"
                    fontWeight="600"
                    letterSpacing="2px"
                    className="arc-text uppercase font-mono"
                    style={
                      {
                        '--delay': `${Number((markDelay + 0.3).toFixed(2))}s`,
                      } as React.CSSProperties
                    }
                  >
                    {arc.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Layer 5: Hero text block (z-50) */}
        <div className="absolute bottom-12 sm:bottom-16 md:bottom-24 left-5 sm:left-8 md:left-12 max-w-[300px] sm:max-w-md z-50">
          {/* Eyebrow */}
          <div
            className="hero-rise text-[11px] sm:text-xs font-semibold tracking-[0.12em] text-white/90 mb-3 sm:mb-4"
            style={{ animationDelay: '0.15s' }}
          >
            Gateway to your <span className="italic">augmented self</span> ·{' '}
            <a
              href="https://ajaynxt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 font-semibold hover:underline inline-flex items-center gap-0.5"
            >
              ajaynxt.com ↗
            </a>
          </div>

          {/* H1 */}
          <h1
            className="hero-rise text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-0.08em] text-white font-bold mb-4 sm:mb-6"
            style={{ animationDelay: '0.3s' }}
          >
            A window
            <br />
            of coming
            <br />
            enhancements
          </h1>

          {/* Paragraph */}
          <p
            className="hero-rise text-sm sm:text-base text-white/90 leading-relaxed mb-6 sm:mb-8"
            style={{ animationDelay: '0.5s' }}
          >
            A future where carbon fiber, titanium, and human instinct align. Not
            machine. Not human. Something wonderfully poised between.
          </p>

          {/* CTA Buttons */}
          <div className="hero-rise flex flex-wrap items-center gap-3" style={{ animationDelay: '0.7s' }}>
            <button
              onClick={() => setConnectModalOpen(true)}
              className="group relative overflow-hidden bg-white text-gray-900 font-semibold text-sm sm:text-base px-7 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg shadow-black/20 transition-transform duration-200 ease-out hover:scale-[1.04] active:scale-95 focus:outline-none"
            >
              <span className="relative z-10">Reserve Now</span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            </button>
            <a
              href="https://ajaynxt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black/70 hover:bg-black backdrop-blur-md text-white font-medium text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-white/20 hover:border-red-500/80 transition-all hover:scale-[1.03] active:scale-95 shadow-lg"
              title="Explore official website work at ajaynxt.com"
            >
              <span>ajaynxt.com</span>
              <span className="text-red-400 font-bold text-xs">↗</span>
            </a>
          </div>
        </div>

        {/* Cyberpunk HUD Attribution Badge for ajaynxt.com (bottom right) */}
        <div className="fixed bottom-3 right-4 z-50 hidden sm:flex items-center gap-2">
          <a
            href="https://ajaynxt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-black/80 hover:bg-black backdrop-blur-md border border-white/20 hover:border-red-500/80 px-4 py-2 rounded-full text-[12px] text-white transition-all shadow-xl shadow-red-950/30 group"
            title="Official Portfolio & Website Work: ajaynxt.com"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block" />
            <span className="font-mono tracking-wider font-semibold">OFFICIAL PORTFOLIO //</span>
            <span className="text-red-400 font-bold group-hover:underline">ajaynxt.com ↗</span>
          </a>
        </div>
      </section>

      {/* Cyberpunk System Connect Modal */}
      {connectModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-neutral-950/95 border border-white/20 rounded-2xl p-6 sm:p-8 text-white shadow-2xl shadow-red-950/30">
            {/* Close button */}
            <button
              onClick={() => setConnectModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 mb-2 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-pulse" />
              SYSTEM IDENT // AJAY SAINI — FEATURED WEBSITE WORK
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-white">
              Ajay Saini <span className="text-gray-400 text-lg font-normal">(@ajaynxt)</span>
            </h2>

            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              Featured website work by Ajay Saini. Creative Web Developer &amp; Video Editor crafting responsive luxury websites, interactive 3D web applications, bespoke UI/UX, and high-performance digital experiences.
            </p>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-mono text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-gray-400 uppercase text-[10px] mb-1">Official Portfolio</div>
                <a
                  href="https://ajaynxt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:underline font-semibold block truncate"
                >
                  ajaynxt.com ↗
                </a>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-gray-400 uppercase text-[10px] mb-1">Email Direct</div>
                <a
                  href="mailto:ajayx3neha@gmail.com"
                  className="text-white hover:underline block truncate"
                >
                  ajayx3neha@gmail.com
                </a>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-gray-400 uppercase text-[10px] mb-1">Phone / WhatsApp</div>
                <a
                  href="tel:+919929562585"
                  className="text-white hover:underline block truncate"
                >
                  +91 99295 62585
                </a>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-gray-400 uppercase text-[10px] mb-1">GitHub Repos</div>
                <a
                  href="https://github.com/ajaynxt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline block truncate"
                >
                  github.com/ajaynxt ↗
                </a>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://ajaynxt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-white text-gray-900 font-semibold py-3 px-5 rounded-full hover:bg-gray-100 transition-colors text-sm"
              >
                Visit ajaynxt.com ↗
              </a>
              <a
                href="mailto:ajayx3neha@gmail.com?subject=Project%20Inquiry%20via%20Cyberpunk%20Demo"
                className="flex-1 text-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 px-5 rounded-full transition-colors text-sm"
              >
                Send Message
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
