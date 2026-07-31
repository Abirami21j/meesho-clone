import React, { useEffect, useState } from "react";
import { AnimatedText } from "@/components/ui/animated-text";

export default function SplashScreen({
  appName = "meesho",
  tagline = "Smart Shopping, Small Spending",
  duration = 6000, // Increased slightly to enjoy the animation
  onFinish = () => {},
}) {
  const [phase, setPhase] = useState("solo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("settle"), 800);
    const t2 = setTimeout(() => setPhase("still"), 1500);
    const t3 = setTimeout(() => setPhase("exit"), duration - 450);
    const t4 = setTimeout(() => onFinish(), duration);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [duration, onFinish]);

  const settled = phase === "settle" || phase === "still" || phase === "exit";

  const members = [
    { name: "Jeevankumar M", short: "Jeevankumar M" },
    { name: "Abirami J", short: "Abirami J" },
    { name: "Ruthiksha C", short: "Ruthiksha C" },
    { name: "Jamuna S", short: "Jamuna S" },
    { name: "Naren L", short: "Naren L" },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0, left: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: "radial-gradient(circle at 50% 30%, #3a0b27 0%, #15020d 100%)",
        zIndex: 9999,
        transition: "opacity 500ms ease",
        opacity: phase === "exit" ? 0 : 1
      }}
    >
      <style>{`
        @keyframes markIn {
          from { transform: scale(0.75); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes wordIn {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes taglineIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loadProgress {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        .splash-mark {
          font-family: 'Poppins', 'Segoe UI', sans-serif;
          font-weight: 800;
          color: #f7941d;
          line-height: 0.8;
          text-shadow: 0 0 40px rgba(247, 148, 29, 0.4);
          animation: markIn 600ms cubic-bezier(.25,.1,.25,1) both;
          transition: font-size 600ms cubic-bezier(.4,0,.2,1), margin 600ms cubic-bezier(.4,0,.2,1);
        }
        .splash-tagline {
          font-family: 'Poppins', 'Segoe UI', sans-serif;
          font-weight: 400;
          color: #f2d9e8;
          letter-spacing: 0.02em;
          opacity: 0;
          font-size: 0.875rem;
          margin-top: 0.5rem;
        }
        .settled .splash-tagline {
          animation: taglineIn 500ms ease-out 260ms forwards;
        }
        .float-icon {
          position: absolute;
          opacity: 0.05;
          color: #f7941d;
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Background Floating Accents */}
      <svg className="float-icon" style={{ top: '15%', left: '20%' }} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      <svg className="float-icon" style={{ top: '25%', right: '20%', animationDelay: '1s' }} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
      <svg className="float-icon" style={{ top: '40%', right: '10%', animationDelay: '2s' }} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      <svg className="float-icon" style={{ top: '45%', left: '10%', animationDelay: '1.5s' }} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
      <svg className="float-icon" style={{ bottom: '25%', left: '15%', animationDelay: '0.5s' }} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
      <svg className="float-icon" style={{ bottom: '25%', right: '15%', animationDelay: '2.5s' }} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>

      {/* Decorative corner glows */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      {/* Main Logo Container */}
      <div 
        className={settled ? "settled" : ""}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            marginTop: '5vh' // Push up slightly to make room for bottom content
        }}
      >
        <span
          className="splash-mark"
          style={{
            fontSize: settled ? "5.5rem" : "6.5rem",
            marginBottom: settled ? "0.2rem" : "0",
          }}
        >
          m
        </span>
        {settled && (
          <AnimatedText 
            text={appName} 
            delay={0.15}
            duration={0.1}
            textClassName="text-white text-[2.5rem] font-bold tracking-widest mt-2 leading-none"
            underlineGradient="from-white via-gray-300 to-white"
          />
        )}
        {tagline && (
          <div className="splash-tagline">{settled && tagline}</div>
        )}
      </div>

      {/* Credits Section - Slides in from bottom when settled */}
      <div 
        className={`w-full flex flex-col items-center pb-8 px-4 transition-all duration-1000 ease-out transform ${settled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        style={{ transitionDelay: '600ms' }}
      >
        <div className="mb-6 flex flex-col items-center">
          <span className="text-[#f2d9e8] text-[11px] opacity-80 mb-2 font-['Poppins']">Developed by</span>
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f7941d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="M15 18l-6-6 6-6"/></svg>
            <AnimatedText 
              text="THE BUILDERS" 
              delay={1.2}
              duration={0.1}
              textClassName="text-[#f7941d] text-2xl font-black tracking-widest"
              underlineGradient="from-transparent via-transparent to-transparent"
            />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f7941d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <span className="italic text-white text-[13px] mt-2 font-serif opacity-90">✨ "Building Ideas. Delivering Innovation."</span>
        </div>

        {/* Team Members Header */}
        <div className="flex items-center gap-3 w-full max-w-lg mb-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#f7941d]/50 to-[#f7941d] flex-1"></div>
          <div className="flex items-center gap-2 text-white text-[10px] tracking-[0.2em] font-bold uppercase">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#f7941d" stroke="#f7941d" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            TEAM MEMBERS
          </div>
          <div className="h-px bg-gradient-to-l from-transparent via-[#f7941d]/50 to-[#f7941d] flex-1"></div>
        </div>

        {/* Team Members List */}
        <div className="flex items-center justify-center w-full max-w-2xl mb-8">
          {members.map((m, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-2 relative group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-pink-500/70 flex items-center justify-center bg-pink-500/5 transition-transform duration-300 hover:scale-110">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f7941d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <span className="text-white text-[10px] md:text-[11px] whitespace-nowrap absolute -bottom-5 opacity-90">{m.short}</span>
              </div>
              {i < members.length - 1 && (
                <div className="mx-2 md:mx-4 h-1 w-1 rounded-full bg-pink-500 opacity-50 mb-5"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Separator */}
        <div className="flex items-center gap-3 w-full max-w-sm mt-4 mb-2">
          <div className="h-px bg-gradient-to-r from-transparent to-[#f7941d]/30 flex-1"></div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f7941d" strokeWidth="1.5" className="opacity-70"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <div className="h-px bg-gradient-to-l from-transparent to-[#f7941d]/30 flex-1"></div>
        </div>

        <div className="text-[11px] text-center text-[#f2d9e8] mb-6 font-['Poppins']">
          <span className="opacity-80">Developed as part of the</span><br/>
          <strong className="text-yellow-500 font-bold text-[13px] opacity-100 drop-shadow-md">IndiWebPros Solutions Pvt. Ltd.</strong><br/>
          <span className="opacity-80">Internship Program</span>
        </div>
        
        {/* Loading Bar */}
        <div className="flex flex-col items-center w-48">
          <div className="text-[11px] text-pink-500 mb-2 font-medium tracking-wide">Loading...</div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 w-full origin-left"
              style={{ animation: 'loadProgress 2s ease-out forwards' }}
            ></div>
          </div>
        </div>

      </div>
    </div>
  );
}
