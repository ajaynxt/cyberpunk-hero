import { PhoneMockup } from './components/PhoneMockup';
import { ScreenOne } from './components/ScreenOne';
import { ScreenTwo } from './components/ScreenTwo';
import { ScreenThree } from './components/ScreenThree';

export default function App() {
  const bgImageUrl =
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260709_152331_bd312d1a-1f20-46b9-9b68-12bcdcf6d53e.png&w=1280&q=85';

  return (
    <main className="relative w-full min-h-screen md:h-screen overflow-x-hidden overflow-y-auto md:overflow-hidden font-sans bg-[#0a0e1c]">
      {/* Page Background Image & Dark Overlay */}
      <img
        src={bgImageUrl}
        alt="Page Background"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />
      <div className="absolute inset-0 bg-black/70 z-[1] pointer-events-none" />

      {/* Desktop Layout (md+) */}
      <div className="hidden md:flex relative z-[2] w-full h-screen items-center justify-center py-6">
        <div className="flex items-end justify-center gap-[2vw]">
          {/* Phone 1: Lewis Hamilton Hero */}
          <div className="animate-fade-slide-up delay-300">
            <PhoneMockup>
              <ScreenOne />
            </PhoneMockup>
          </div>

          {/* Phone 2: Silverstone Circuit + Stats (Middle phone -mb-6) */}
          <div className="animate-fade-slide-up delay-500 -mb-6">
            <PhoneMockup>
              <ScreenTwo />
            </PhoneMockup>
          </div>

          {/* Phone 3: Scuderia Ferrari Team */}
          <div className="animate-fade-slide-up delay-700">
            <PhoneMockup>
              <ScreenThree />
            </PhoneMockup>
          </div>
        </div>
      </div>

      {/* Mobile Layout (below md) */}
      <div className="md:hidden relative z-[2] flex flex-col items-center gap-[50px] py-[20px] px-[20px]">
        {/* Phone 1: Lewis Hamilton Hero */}
        <div className="animate-fade-slide-up delay-300">
          <PhoneMockup>
            <ScreenOne />
          </PhoneMockup>
        </div>

        {/* Phone 2: Silverstone Circuit + Stats */}
        <div className="animate-fade-slide-up delay-500">
          <PhoneMockup>
            <ScreenTwo />
          </PhoneMockup>
        </div>

        {/* Phone 3: Scuderia Ferrari Team */}
        <div className="animate-fade-slide-up delay-700">
          <PhoneMockup>
            <ScreenThree />
          </PhoneMockup>
        </div>
      </div>
    </main>
  );
}
