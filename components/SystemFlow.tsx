
import React, { useState, useEffect } from 'react';

const SystemFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(true);

  const steps = [
    { id: 'inputs', label: 'Inputs Stage', icon: '📹', desc: 'Capture: NDI, SRT, RTMP, UVC Native Sockets', color: 'cyan' },
    { id: 'connectivity', label: 'Network Core', icon: '📡', desc: 'Handshake & Latency Measurement Services', color: 'cyan' },
    { id: 'sync', label: 'Jitter Sync', icon: '⏱️', desc: 'PTP Master Clock & Circular RAM Buffers', color: 'cyan' },
    { id: 'video', label: 'Video Engine', icon: '⚙️', desc: 'Zero-Copy 2K Rendering Pipeline (OpenGL)', color: 'red' },
    { id: 'audio', label: 'Audio Hub', icon: '🎚️', desc: 'Oboe NDK Stack: Side-chain Ducking Logic', color: 'red' },
    { id: 'compositor', label: 'Scene Compositor', icon: '🖼️', desc: 'GPU Multi-Source Layering & Transitions', color: 'red' },
    { id: 'sports', label: 'Match Logic', icon: '🏆', desc: 'Rule Engine & Scoreboard Graphics Injector', color: 'cyan' },
    { id: 'social', label: 'Social Hub', icon: '💬', desc: 'Gemini AI Overlay & Sentiment Analysis', color: 'cyan' },
    { id: 'output', label: 'Output Core', icon: '🚀', desc: 'Hardware HEVC Encoder & ABR Uplink', color: 'red' },
    { id: 'cloud', label: 'Broadcast Cloud', icon: '☁️', desc: 'Multi-Destination RTMP/SRT Relay', color: 'red' }
  ];

  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-32">
      <header className="space-y-4 border-b border-[#00e5ff22] pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">Engineering Pipeline</h1>
          <p className="text-[#00e5ff] text-lg font-bold tracking-widest uppercase text-sm">Low-Latency Multimedia Stack: From Photon to Cloud Bitstream.</p>
        </div>
        <button 
          onClick={() => setIsSimulating(!isSimulating)}
          className={`px-8 py-3 font-black text-[10px] uppercase tracking-[0.3em] transition-all border ${isSimulating ? 'bg-[#ff004022] border-[#ff0040] text-[#ff0040]' : 'bg-[#00e5ff22] border-[#00e5ff] text-[#00e5ff]'}`}
        >
          {isSimulating ? 'HALT SIMULATION' : 'EXECUTE FLOW'}
        </button>
      </header>

      {/* Main Flow Diagram */}
      <div className="relative glass p-16 rounded-sm border border-[#00e5ff11] overflow-hidden min-h-[650px] flex flex-col justify-center bg-black/40">
        
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="absolute inset-x-20 top-1/2 h-px bg-[#00e5ff11] -translate-y-1/2 z-0 hidden lg:block"></div>
        
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-24 gap-x-12 relative z-10">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const isProcessed = activeStep > idx;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`w-28 h-28 rounded-sm flex items-center justify-center text-4xl mb-6 transition-all duration-700 border relative ${
                    isActive ? `scale-110 shadow-[0_0_30px_rgba(0,229,255,0.4)] z-20 bg-black border-[#00e5ff]` : 
                    isProcessed ? `bg-[#00e5ff05] border-[#00e5ff22] opacity-50` : 'bg-black border-white/5 opacity-20'
                  }`}
                >
                  {step.icon}
                  {isActive && (
                    <div className="absolute -inset-4 border border-[#00e5ff44] animate-ping"></div>
                  )}
                  {isActive && (
                    <div className="absolute -top-12 bg-[#ff0040] text-white px-4 py-1 font-black uppercase tracking-widest text-[8px] whitespace-nowrap shadow-[0_0_15px_#ff0040]">
                      Active Process
                    </div>
                  )}
                </div>
                
                <div className="text-center space-y-3">
                  <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isActive ? `text-[#00e5ff]` : 'text-slate-500'}`}>
                    {step.label}
                  </h3>
                  <p className={`text-[9px] max-w-[140px] mx-auto leading-relaxed transition-opacity font-bold uppercase tracking-tighter ${isActive ? 'opacity-100 text-slate-300' : 'opacity-30 text-slate-600'}`}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#121212] p-10 rounded-sm border border-[#00e5ff11] space-y-8">
           <h2 className="text-xl font-black text-[#00e5ff] uppercase tracking-[0.3em]">Execution Policy</h2>
           <div className="space-y-6">
              <div className="flex gap-6">
                 <div className="text-[#ff0040] font-black text-lg">01</div>
                 <div className="space-y-1">
                    <div className="text-[10px] font-black text-white uppercase tracking-widest">Async Thread Pool</div>
                    <p className="text-[10px] text-slate-500 leading-relaxed uppercase">Cada etapa del pipeline opera en un contexto de hilo desacoplado con afinidad a núcleos de alto rendimiento (Big Cores).</p>
                 </div>
              </div>
              <div className="flex gap-6">
                 <div className="text-[#ff0040] font-black text-lg">02</div>
                 <div className="space-y-1">
                    <div className="text-[10px] font-black text-white uppercase tracking-widest">Memory Locking</div>
                    <p className="text-[10px] text-slate-500 leading-relaxed uppercase">Uso de mlock() en buffers críticos para prevenir el swap de página durante ráfagas de codificación HEVC.</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-[#121212] p-10 rounded-sm border border-[#ff004022] space-y-8">
           <h2 className="text-xl font-black text-[#ff0040] uppercase tracking-[0.3em]">Fault Tolerancy</h2>
           <div className="space-y-4">
              <div className="p-5 bg-black/40 border border-[#ff004011]">
                 <div className="flex justify-between mb-2">
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Socket Congestion</span>
                   <span className="text-[9px] text-[#ff0040] font-black uppercase">Drop Packet Policy</span>
                 </div>
                 <p className="text-[10px] text-slate-400 italic font-bold">Si el congestion window de TCP/SRT se satura, el Connectivity Core descarta frames B para priorizar frames I/P.</p>
              </div>
              <div className="p-5 bg-black/40 border border-[#ff004011]">
                 <div className="flex justify-between mb-2">
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Encoder Stall</span>
                   <span className="text-[9px] text-[#ff0040] font-black uppercase">Re-init Signal</span>
                 </div>
                 <p className="text-[10px] text-slate-400 italic font-bold">Detección de estancamiento en MediaCodec. Reinicio automático del encoder en menos de 250ms.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SystemFlow;
