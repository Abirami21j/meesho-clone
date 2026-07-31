import React, { useEffect, useState } from "react";
import { AnimatedText } from "@/components/ui/animated-text";


export default function SplashScreen({
  appName = "meesho",
  tagline = "Smart Shopping, Small Spending",
  duration = 5000,
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

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0, left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: "#4f0d38",
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
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .splash-mark {
          font-family: 'Poppins', 'Segoe UI', sans-serif;
          font-weight: 800;
          color: #f7941d;
          line-height: 0.8;
          animation: markIn 600ms cubic-bezier(.25,.1,.25,1) both;
          transition: font-size 600ms cubic-bezier(.4,0,.2,1), margin 600ms cubic-bezier(.4,0,.2,1);
        }
        .splash-word {
          font-family: 'Poppins', 'Segoe UI', sans-serif;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.01em;
          opacity: 0;
          font-size: 1.875rem;
          height: 2.25rem;
          display: flex;
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
        .settled .splash-word {
          animation: wordIn 500ms cubic-bezier(.2,.8,.3,1) 60ms forwards;
        }
        .settled .splash-tagline {
          animation: taglineIn 500ms ease-out 260ms forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .splash-mark, .splash-word, .splash-tagline { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
      <div 
        className={settled ? "settled" : ""}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}
      >
        <span
          className="splash-mark"
          style={{
            fontSize: settled ? "5rem" : "6.5rem",
            marginBottom: settled ? "0.2rem" : "0",
          }}
        >
          m
        </span>
        {settled && (
          <AnimatedText 
            text={appName} 
            delay={0.2}
            duration={0.15}
            textClassName="text-white text-3xl font-bold tracking-widest mt-2"
            underlineGradient="from-white via-gray-300 to-white"
          />
        )}
        {tagline && (
          <div className="splash-tagline">{settled && tagline}</div>
        )}

        <div 
          style={{
            position: 'absolute',
            bottom: '2rem',
            textAlign: 'center',
            color: '#f2d9e8',
            fontSize: '0.75rem',
            fontFamily: "'Poppins', 'Segoe UI', sans-serif",
            opacity: 0,
            animation: settled ? "taglineIn 1s ease-out 500ms forwards" : "none",
            width: '100%'
          }}
        >
          <div style={{ marginBottom: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ opacity: 0.8 }}>Developed by</span>
            {settled && (
              <AnimatedText 
                text="THE BUILDERS" 
                delay={0.8}
                duration={0.1}
                textClassName="text-[#f7941d] text-xl font-black tracking-widest mt-1 mb-1"
                underlineGradient="from-transparent via-pink-400 to-transparent"
              />
            )}
            <span style={{ fontStyle: 'italic', color: '#fff', fontSize: '0.8rem' }}>✨ "Building Ideas. Delivering Innovation."</span>
          </div>

          <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', padding: '0 20px', fontSize: '0.8rem' }}>
            <strong style={{ opacity: 0.9 }}>Team Members:</strong>
            <span style={{ color: '#fff', fontWeight: 'bold', textShadow: '0 0 5px rgba(255,255,255,0.5)' }}>• Abirami J</span>
            <span style={{ color: '#fff', fontWeight: 'bold', textShadow: '0 0 5px rgba(255,255,255,0.5)' }}>• Jeevankumar M</span>
            <span style={{ color: '#fff', fontWeight: 'bold', textShadow: '0 0 5px rgba(255,255,255,0.5)' }}>• Ruthiksha C</span>
            <span style={{ color: '#fff', fontWeight: 'bold', textShadow: '0 0 5px rgba(255,255,255,0.5)' }}>• Jamuna S</span>
            <span style={{ color: '#fff', fontWeight: 'bold', textShadow: '0 0 5px rgba(255,255,255,0.5)' }}>• Naren L</span>
          </div>

          <div style={{ opacity: 0.7, fontSize: '0.7rem' }}>
            Developed as part of the<br/>
            <strong style={{ color: '#fff' }}>IndiWebPros Solutions Pvt. Ltd.</strong><br/>
            Internship Program
          </div>
          
          <div className="animate-pulse" style={{ marginTop: '15px', fontSize: '0.7rem', opacity: 0.6 }}>
            Loading...
          </div>
        </div>
      </div>
    </div>
  );
}
