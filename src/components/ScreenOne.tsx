import { ScreenBackground } from './ScreenBackground';
import { PhoneNav } from './PhoneNav';

export function ScreenOne() {
  return (
    <div className="relative w-full h-full flex flex-col px-5 pb-0 pt-[76px] overflow-hidden select-none">
      {/* Background */}
      <ScreenBackground />

      {/* Top Navigation */}
      <PhoneNav />

      {/* Location Block */}
      <div className="z-10 mt-4 mb-2 animate-fade-slide-up delay-300">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white/60 text-[16px]">United Kingdom</span>
          <img
            src="https://framerusercontent.com/images/pqUTggaeyOivtzDImRzkBRdww.png"
            alt="UK Flag"
            className="w-6 h-6 object-contain inline-block"
          />
        </div>
        <h1 className="text-white font-normal leading-[0.95] tracking-[-0.05em] text-[48px]">
          Silverstone<br />England
        </h1>
      </div>

      {/* Driver Photo Container */}
      <div className="absolute inset-0 z-[5] flex items-end justify-center pointer-events-none overflow-hidden">
        <img
          src="https://framerusercontent.com/images/m5IyHuJeOQ5P0GOvWx1xv0IR9Y.png"
          alt="Lewis Hamilton"
          className="w-[calc(140%-5px)] max-w-none h-auto object-contain animate-scale-in delay-500 origin-bottom"
        />
        {/* Blur overlay (the key glass effect) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none"
          style={{
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            mask: 'linear-gradient(to bottom, transparent 0%, black 50%)',
            WebkitMask: 'linear-gradient(to bottom, transparent 0%, black 50%)',
          }}
        />
      </div>

      {/* Bottom Content */}
      <div className="z-10 absolute bottom-0 left-0 right-0 px-5 pb-5">
        <img
          src="https://framerusercontent.com/images/dAAdqktZVxBDjPKk97YCjZjsE.png"
          alt="Driver Avatars"
          className="h-12 w-auto object-contain animate-fade-slide-up delay-700 mb-3"
        />
        <div className="text-white font-semibold leading-[0.82] tracking-[-0.05em] text-[64px] animate-speed-reveal delay-800">
          Lewis<br />Hamilton
        </div>
      </div>
    </div>
  );
}
