import { ScreenBackground } from './ScreenBackground';
import { PhoneNav } from './PhoneNav';
import { useCountUp } from '../hooks/useCountUp';

export function ScreenTwo() {
  const count1 = useCountUp(227, 800, 2200);
  const count2 = useCountUp(374, 1000, 2200);
  const count3 = useCountUp(4987, 1200, 2200);

  return (
    <div className="relative w-full h-full flex flex-col px-5 pb-8 pt-[76px] overflow-hidden select-none">
      {/* Background */}
      <ScreenBackground />

      {/* Top Navigation */}
      <PhoneNav />

      {/* Location Block */}
      <div className="z-10 mb-4 animate-fade-slide-up delay-400">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white/60 text-[16px]">United Kingdom</span>
          <img
            src="https://framerusercontent.com/images/pqUTggaeyOivtzDImRzkBRdww.png"
            alt="UK Flag"
            className="w-6 h-6 object-contain inline-block"
          />
        </div>
        <h2 className="text-white font-normal leading-[0.95] tracking-[-0.05em] text-[48px]">
          Silverstone<br />England
        </h2>
      </div>

      {/* Circuit Image */}
      <div className="z-10 flex-1 flex items-center justify-center -mx-5 px-2 min-h-0 animate-scale-in delay-600">
        <img
          src="https://framerusercontent.com/images/raKAG2bJP9xeqi118VMniPLvbAA.png"
          alt="Silverstone Circuit"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Stats Block */}
      <div className="z-10 mt-auto pt-4 animate-fade-slide-up delay-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-white/60 text-[16px]">Season Points</span>
          <img
            src="https://framerusercontent.com/images/pIXUcwyAF0xzCIaKjtNLahHpasQ.png"
            alt="Medal"
            className="w-6 h-6 object-contain inline-block"
          />
        </div>

        <div className="flex flex-col">
          <div
            className="font-semibold tracking-[-0.06em] text-[110px] leading-[0.72] bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(to bottom, white 0%, rgba(255,255,255,0.4) 50%, transparent 85%)',
              WebkitBackgroundClip: 'text',
            }}
          >
            {count1}
          </div>
          <div
            className="font-semibold tracking-[-0.06em] text-[110px] leading-[0.72] bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(to bottom, white 0%, rgba(255,255,255,0.4) 50%, transparent 85%)',
              WebkitBackgroundClip: 'text',
            }}
          >
            {count2}
          </div>
          <div className="font-semibold tracking-[-0.06em] text-[110px] leading-[0.72] text-[#EDB40B]">
            {count3}
          </div>
        </div>
      </div>
    </div>
  );
}
