import { ScreenBackground } from './ScreenBackground';
import { PhoneNav } from './PhoneNav';

export function ScreenThree() {
  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Background */}
      <ScreenBackground />

      {/* Top Navigation */}
      <PhoneNav />

      {/* Team Title */}
      <div className="absolute top-[100px] left-5 z-10 animate-fade-slide-up delay-300">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white/60 text-[15px]">Team Name</span>
          <img
            src="https://framerusercontent.com/images/sUDhzMuxKIOvqjSH5U1fn0QSXqI.png"
            alt="Ferrari Team"
            className="w-5 h-5 object-contain"
          />
        </div>
        <h2 className="text-white font-normal leading-[0.83] text-[52px] tracking-[-0.08em]">
          Scuderia<br />Ferrari
        </h2>
      </div>

      {/* Chassis Section */}
      <div className="absolute top-[245px] left-5 z-10 animate-fade-slide-up delay-500">
        <div className="flex items-center gap-2 mb-1">
          <img
            src="https://framerusercontent.com/images/zIA1tYDOAdZo3k6IXX9gBC5FGbY.png"
            alt="Chassis Icon"
            className="w-5 h-5 object-contain"
          />
          <span className="text-white/60 text-[15px]">Chassis</span>
        </div>
        <div className="text-[#EDB40B] font-semibold leading-[0.79] text-[120px] tracking-[-0.08em]">
          SF-26
        </div>
      </div>

      {/* Car Image */}
      <img
        src="https://framerusercontent.com/images/MzKCSYB4uVt9psQq4jRwQNRDjc.png"
        alt="Ferrari SF-26 Car"
        className="absolute top-[390px] left-3 right-3 z-10 w-[calc(100%-24px)] h-auto object-contain animate-fade-slide-left delay-700 pointer-events-none"
      />

      {/* Bottom Driver Cards */}
      <div className="absolute bottom-0 left-0 right-0 flex z-10 animate-fade-slide-up delay-900">
        {/* Leclerc Card */}
        <div
          className="w-1/2 h-[200px] rounded-t-2xl p-3 flex flex-col justify-between overflow-hidden"
          style={{
            background: 'rgba(20,20,30,0.8)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderBottom: 'none',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-white/60 text-[13px] font-normal truncate">Charles Leclerc</span>
              <img
                src="https://framerusercontent.com/images/JIl4japgQlMAQRvh1gDHszRvkUY.png?width=92&height=92"
                alt="Profile"
                className="w-4 h-4 opacity-60 object-contain shrink-0"
              />
            </div>
            <img
              src="https://framerusercontent.com/images/MJfqhcmEoIBnfimJNhKqoZpq0.png"
              alt="Leclerc Stats"
              className="h-5 w-auto object-contain"
            />
          </div>
          <div className="text-white font-semibold leading-[0.79] text-[110px] tracking-[-0.08em] mt-auto">
            16
          </div>
        </div>

        {/* Hamilton Card */}
        <div
          className="w-1/2 h-[200px] rounded-t-2xl p-3 flex flex-col justify-between overflow-hidden"
          style={{
            background: 'rgba(20,20,30,0.8)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderBottom: 'none',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-white/60 text-[13px] font-normal truncate">Lewis Hamilton</span>
              <img
                src="https://framerusercontent.com/images/JIl4japgQlMAQRvh1gDHszRvkUY.png?width=92&height=92"
                alt="Profile"
                className="w-4 h-4 opacity-60 object-contain shrink-0"
              />
            </div>
            <img
              src="https://framerusercontent.com/images/3EwXxC1QutaGnlNDZMlAN66ZmTU.png"
              alt="Hamilton Stats"
              className="h-5 w-auto object-contain"
            />
          </div>
          <div className="text-white font-semibold leading-[0.79] text-[110px] tracking-[-0.08em] mt-auto">
            44
          </div>
        </div>
      </div>
    </div>
  );
}
