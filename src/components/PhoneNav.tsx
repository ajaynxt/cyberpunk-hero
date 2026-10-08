import { useState } from 'react';
import { X } from 'lucide-react';

export function PhoneNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 h-14 mt-[20px]">
        {/* Left: F1 Logo */}
        <img
          src="https://framerusercontent.com/images/NZPITJ6zDBvxVT7rc1NH2sOU.png"
          alt="Formula 1"
          className="h-7 w-auto object-contain"
        />

        {/* Right: Two 14x14 square buttons, no rounding */}
        <div className="flex items-center gap-2">
          {/* White button with profile icon */}
          <button
            type="button"
            className="w-14 h-14 bg-white flex items-center justify-center shrink-0 cursor-pointer transition-opacity hover:opacity-90"
            aria-label="Profile"
          >
            <img
              src="https://framerusercontent.com/images/JIl4japgQlMAQRvh1gDHszRvkUY.png?width=92&height=92"
              alt="Profile"
              className="w-5 h-5 object-contain"
            />
          </button>

          {/* Glass button with two white bars */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="w-14 h-14 flex flex-col items-center justify-center shrink-0 cursor-pointer transition-colors"
            style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            aria-label="Open menu"
          >
            <div className="flex flex-col items-end gap-[5px] w-[21px]">
              <span className="w-[21px] h-[2px] bg-white rounded-full block" />
              <span className="w-[10px] h-[2px] bg-white rounded-full block" />
            </div>
          </button>
        </div>
      </div>

      {/* Menu Overlay (z-50, full screen) */}
      <div
        className={`absolute inset-0 z-50 flex flex-col justify-between px-6 py-5 transition-opacity ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'linear-gradient(160deg, #1a0000 0%, #8B0000 40%, #E10600 100%)',
          transitionDuration: '400ms',
        }}
      >
        {/* Top header row */}
        <div className="flex items-center justify-between h-14 mt-[20px]">
          <img
            src="https://framerusercontent.com/images/NZPITJ6zDBvxVT7rc1NH2sOU.png"
            alt="Formula 1"
            className="h-7 w-auto object-contain"
          />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="w-14 h-14 flex items-center justify-center text-white cursor-pointer transition-colors"
            style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Links */}
        <nav className="flex flex-col gap-6 my-auto">
          {['Biography', 'Statistics', 'Career'].map((link, i) => (
            <a
              key={link}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
              }}
              className="text-3xl font-bold tracking-tight text-white hover:text-[#EDB40B] transition-colors inline-block"
              style={{
                transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s, opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s, color 0.2s ease`,
              }}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Bottom sign in button */}
        <div className="pb-4">
          <button
            type="button"
            className="w-full py-4 bg-white text-black font-semibold uppercase tracking-wider text-sm hover:bg-white/90 transition-colors cursor-pointer"
          >
            Sign in
          </button>
        </div>
      </div>
    </>
  );
}
