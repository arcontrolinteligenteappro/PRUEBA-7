
import React, { useState, useEffect } from 'react';
import { SourceType, MediaSource, TransitionType } from '../types';

const Dashboard: React.FC = () => {
  const [activeCam, setActiveCam] = useState('cam-1');
  const [previewCam, setPreviewCam] = useState('cam-2');
  const [transition, setTransition] = useState<TransitionType>('FADE');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tBarPos, setTBarPos] = useState(0); 
  const [showOutputPanel, setShowOutputPanel] = useState(false);
  
  const [currentBitrate, setCurrentBitrate] = useState(14.8);
  const [droppedFrames, setDroppedFrames] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBitrate(prev => +(prev + (Math.random() * 0.6 - 0.3)).toFixed(1));
      if (Math.random() > 0.97) setDroppedFrames(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const sources: MediaSource[] = Array.from({ length: 9 }).map((_, i) => ({
    id: `cam-${i + 1}`,
    name: i === 0 ? 'MASTER NDI' : i === 1 ? 'SIDELINE 4K' : i === 4 ? 'DJI DRONE' : i === 5 ? 'GOAL GOPRO' : `SOURCE 0${i + 1}`,
    type: i === 0 ? SourceType.NDI_HX : i === 1 ? SourceType.UVC : i === 4 ? SourceType.DJI_DRONE : SourceType.GOPRO,
    resolution: i === 0 ? '2560x1440' : '1920x1080',
    fps: 60,
    bitrate: i === 0 ? currentBitrate : 12.0 + (Math.random() * 3),
    latency: 18 + i * 4,
    status: i === 8 ? 'disconnected' : i === 7 ? 'connecting' : 'connected'
  }));

  const handleTake = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 4;
      setTBarPos(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setActiveCam(previewCam);
        setIsTransitioning(false);
        setTBarPos(0);
      }
    }, 15);
  };

  return (
    <div className="h-full flex flex-col bg-[#050a14] select-none relative font-mono">
      
      {/* Output Configuration Modal */}
      {showOutputPanel && (
        <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-8">
            <div className="bg-[#121212] w-full max-w-5xl rounded-sm border border-[#00e5ff33] shadow-[0_0_50px_rgba(0,229,255,0.1)] overflow-hidden flex flex-col">
                <div className="p-6 border-b border-[#00e5ff11] flex justify-between items-center bg-[#1a1a1a]">
                    <h2 className="text-xl font-black text-[#00e5ff] uppercase tracking-[0.3em]">Broadcast Config</h2>
                    <button onClick={() => setShowOutputPanel(false)} className="text-[#ff0040] hover:scale-125 transition-transform font-bold text-xl">✕</button>
                </div>
                <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div>
                           <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Encoder Core</h3>
                           <div className="bg-black/40 p-6 rounded-sm border border-[#00e5ff11] space-y-6">
                               <div className="flex justify-between items-center">
                                   <span className="text-xs font-bold text-slate-300">Target Resolution</span>
                                   <span className="text-xs text-[#00e5ff] font-black">2K MASTER (2560x1440)</span>
                               </div>
                               <div className="flex justify-between items-center">
                                   <span className="text-xs font-bold text-slate-300">Codec Profile</span>
                                   <span className="text-[10px] bg-[#ff0040] text-white px-3 py-1 font-black">HEVC / H.265</span>
                               </div>
                               <div className="flex justify-between items-center">
                                   <span className="text-xs font-bold text-slate-300">Bitrate Policy</span>
                                   <span className="text-xs text-[#00e5ff] font-black">CBR @ 18.0 Mbps</span>
                               </div>
                           </div>
                        </div>
                        <div className="p-6 bg-[#ff004011] border border-[#ff004033] rounded-sm">
                            <h4 className="text-[10px] font-black text-[#ff0040] mb-2 uppercase tracking-widest">Hardware Alert</h4>
                            <p className="text-[9px] text-slate-400 leading-relaxed uppercase">La temperatura del SoC está escalando. El motor reducirá el preview a 30fps si se superan los 46°C para priorizar el encoding final.</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cdn Uplink (Multistream)</h3>
                        <div className="space-y-3">
                        {['YT_SPORT_LIVE', 'TIKTOK_VERTICAL', 'TWITCH_OFFICIAL', 'SRT_BACKUP'].map(dest => (
                          <div key={dest} className="flex items-center justify-between p-4 bg-black/20 border border-white/5 group hover:border-[#00e5ff44] transition-colors">
                             <span className="font-bold text-[10px] text-slate-300 tracking-widest">{dest}</span>
                             <div className="flex items-center gap-3">
                                <span className="text-[8px] text-green-500 font-bold">STABLE</span>
                                <div className="w-8 h-3 bg-green-500/20 border border-green-500/50"></div>
                             </div>
                          </div>
                        ))}
                        </div>
                        <button className="w-full py-4 border border-[#00e5ff] text-[#00e5ff] font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#00e5ff] hover:text-black transition-all">Add Multi-Uplink</button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Director Status Bar */}
      <div className="h-14 bg-[#0a0f1d] border-b border-[#00e5ff11] flex items-center justify-between px-6 shrink-0 z-40">
        <div className="flex items-center gap-10">
           <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-[#ff0040] animate-pulse shadow-[0_0_10px_#ff0040]"></div>
              <span className="font-black text-[10px] tracking-[0.4em] text-[#ff0040] uppercase">Live On-Air</span>
           </div>
           
           <div className="flex gap-8">
              <div className="flex flex-col">
                <span className="text-[7px] text-slate-600 font-black uppercase tracking-widest mb-1">Bandwidth</span>
                <span className="text-[10px] font-black text-[#00e5ff] tracking-widest">{currentBitrate} Mbps</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[7px] text-slate-600 font-black uppercase tracking-widest mb-1">Dropped</span>
                <span className={`text-[10px] font-black tracking-widest ${droppedFrames > 0 ? 'text-[#ff0040]' : 'text-slate-400'}`}>{droppedFrames}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[7px] text-slate-600 font-black uppercase tracking-widest mb-1">Uptime</span>
                <span className="text-[10px] font-black text-slate-300 tracking-widest">01:42:15.08</span>
              </div>
           </div>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex gap-1 bg-black/40 p-1 border border-white/5">
              {(['CUT', 'FADE', 'WIPE'] as TransitionType[]).map(t => (
                <button 
                  key={t}
                  onClick={() => setTransition(t)}
                  className={`px-4 py-1 font-black text-[8px] tracking-widest transition-all ${transition === t ? 'bg-[#00e5ff] text-black shadow-[0_0_10px_rgba(0,229,255,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {t}
                </button>
              ))}
           </div>
           <button 
            onClick={() => setShowOutputPanel(true)}
            className="border border-[#ff0040] text-[#ff0040] px-6 py-1.5 font-black text-[9px] uppercase tracking-[0.3em] hover:bg-[#ff0040] hover:text-white transition-all shadow-[0_0_15px_rgba(255,0,64,0.1)]"
           >
              Master Config
           </button>
        </div>
      </div>

      {/* Main Director Workspace */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        
        {/* Left: Program & Preview (Technical View) */}
        <div className="w-1/2 flex flex-col p-4 gap-4 bg-black/40">
            <div className={`flex-1 relative border-2 ${isTransitioning ? 'border-orange-500' : 'border-[#ff0040] shadow-[0_0_30px_rgba(255,0,64,0.15)]'}`}>
                <img src={`https://picsum.photos/seed/${activeCam}/1280/720`} alt="Program" className="w-full h-full object-cover" />
                <div className="absolute top-0 left-0 bg-[#ff0040] text-white px-4 py-1 font-black text-[10px] tracking-[0.5em] uppercase">PROGRAM</div>
                <div className="absolute bottom-4 left-4">
                    <div className="text-[8px] font-black text-[#ff0040] uppercase tracking-widest">Source Master</div>
                    <div className="text-xl font-black text-white tracking-tighter uppercase">{sources.find(s => s.id === activeCam)?.name}</div>
                </div>
                {isTransitioning && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-5xl font-black text-orange-500 animate-pulse tracking-[0.5em] uppercase italic">Transitioning</div>
                  </div>
                )}
            </div>

            <div className="flex-1 relative border-2 border-[#00e5ff] shadow-[0_0_30px_rgba(0,229,255,0.1)]">
                <img src={`https://picsum.photos/seed/${previewCam}/1280/720`} alt="Preview" className="w-full h-full object-cover grayscale-[0.5] opacity-80" />
                <div className="absolute top-0 left-0 bg-[#00e5ff] text-black px-4 py-1 font-black text-[10px] tracking-[0.5em] uppercase">PREVIEW</div>
                <div className="absolute bottom-4 left-4">
                    <div className="text-[8px] font-black text-[#00e5ff] uppercase tracking-widest">Next Queue</div>
                    <div className="text-xl font-black text-white tracking-tighter uppercase">{sources.find(s => s.id === previewCam)?.name}</div>
                </div>
            </div>
        </div>

        {/* Right: Camera Grid & T-Bar */}
        <div className="w-1/2 flex flex-col p-4 gap-4 border-l border-[#00e5ff11]">
            <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-3">
              {sources.map((source) => (
                <div 
                  key={source.id}
                  onClick={() => setPreviewCam(source.id)}
                  onDoubleClick={() => { setPreviewCam(source.id); handleTake(); }}
                  className={`relative cursor-pointer transition-all border group overflow-hidden ${
                    activeCam === source.id ? 'border-[#ff0040] ring-1 ring-[#ff0040]' : 
                    previewCam === source.id ? 'border-[#00e5ff] ring-1 ring-[#00e5ff]' : 
                    'border-[#00e5ff22] hover:border-[#00e5ff88]'
                  } ${source.status === 'disconnected' ? 'opacity-30' : ''}`}
                >
                  <img src={`https://picsum.photos/seed/${source.id}/400/225`} alt={source.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-1 right-1 px-1 bg-black/80 text-[7px] font-black text-slate-400">{source.type}</div>
                  
                  <div className={`absolute bottom-0 inset-x-0 p-1.5 flex justify-between items-center transition-colors ${activeCam === source.id ? 'bg-[#ff0040]' : 'bg-black/70'}`}>
                    <span className="text-[8px] font-black tracking-tighter truncate text-white uppercase">{source.name}</span>
                    <span className="text-[7px] font-black text-slate-300">{source.bitrate.toFixed(1)}M</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Studio Production Controls */}
            <div className="h-44 bg-[#0a0f1d] border border-[#00e5ff11] p-6 flex items-center gap-12">
                <div className="flex flex-col items-center gap-3">
                   <div className="text-[7px] font-black text-[#00e5ff] uppercase tracking-[0.3em]">T-Bar Master</div>
                   <div className="w-8 h-32 bg-black border border-[#00e5ff22] relative">
                       <div 
                         className="w-full h-4 bg-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.6)] absolute transition-all"
                         style={{ bottom: `${tBarPos}%` }}
                       ></div>
                   </div>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-4 h-full">
                    <button 
                      onClick={() => setTransition('CUT')}
                      className={`font-black text-[10px] uppercase tracking-[0.5em] border transition-all ${
                        transition === 'CUT' ? 'bg-[#00e5ff11] border-[#00e5ff] text-[#00e5ff]' : 'border-white/5 text-slate-600 hover:text-slate-400'
                      }`}
                    >
                       Cut
                    </button>
                    <button 
                      onClick={handleTake}
                      disabled={isTransitioning}
                      className={`font-black text-lg uppercase tracking-[0.5em] transition-all relative group ${
                        isTransitioning ? 'bg-orange-950/20 text-orange-900 border border-orange-900' : 'bg-[#ff0040] text-white shadow-[0_0_25px_rgba(255,0,64,0.3)]'
                      }`}
                    >
                      TAKE
                      {!isTransitioning && (
                         <div className="absolute -inset-1 border border-[#ff0040] opacity-30 group-hover:opacity-100 transition-opacity"></div>
                      )}
                    </button>
                    <div className="flex gap-2">
                       <button className="flex-1 bg-black border border-white/5 font-black text-[8px] uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">BLACK</button>
                       <button className="flex-1 bg-[#ff004011] border border-[#ff004055] font-black text-[8px] uppercase tracking-[0.2em] text-[#ff0040] hover:bg-[#ff0040] hover:text-white transition-all">REPLAY</button>
                    </div>
                    <div className="flex gap-2">
                       <button className="flex-1 bg-black border border-white/5 font-black text-[8px] uppercase tracking-[0.2em] text-slate-500">PIP 01</button>
                       <button className="flex-1 bg-black border border-white/5 font-black text-[8px] uppercase tracking-[0.2em] text-slate-500">CHROMA</button>
                    </div>
                </div>

                <div className="flex flex-col gap-1 w-36">
                    <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-1 text-center">SCENE TRIGGERS</span>
                    {['START_INTRO', 'GAME_ACTIVE', 'HALF_TIME', 'FINAL_OUTRO'].map(scene => (
                      <button key={scene} className="py-2 bg-black border border-white/5 text-[8px] font-black text-slate-500 hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all uppercase tracking-tighter">
                        {scene}
                      </button>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <footer className="h-14 bg-[#0a0f1d] border-t border-[#00e5ff11] flex items-center justify-between px-8 shrink-0">
          <div className="flex gap-8">
              <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] shadow-[0_0_5px_#00e5ff]"></span>
                  <span className="text-[9px] font-black text-[#00e5ff] uppercase tracking-widest">Pipeline: Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Network: Low Jitter</span>
              </div>
          </div>
          <div className="flex items-center gap-10">
              <div className="flex items-center gap-4">
                  <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">GPU MAPPING</span>
                  <div className="w-24 h-1.5 bg-black border border-white/5 overflow-hidden">
                      <div className="h-full bg-[#00e5ff] w-1/3 shadow-[0_0_10px_#00e5ff]"></div>
                  </div>
              </div>
              <span className="text-[10px] font-black text-slate-500 tracking-[0.2em]">ARCONTROL_V5_ENG_CORE</span>
          </div>
      </footer>
    </div>
  );
};

export default Dashboard;
