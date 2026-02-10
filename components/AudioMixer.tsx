
import React, { useState, useEffect } from 'react';
import { AudioChannel } from '../types';

const AudioMixer: React.FC = () => {
  const [channels, setChannels] = useState<AudioChannel[]>([
    { id: '1', name: 'Master Comment', level: 0.85, isMuted: false, followVideo: false, isLocked: true, delayMs: 0, peakDb: -3 },
    { id: '2', name: 'Ambient Field L', level: 0.6, isMuted: false, followVideo: true, isLocked: false, delayMs: 120, peakDb: -12 },
    { id: '3', name: 'Ambient Field R', level: 0.6, isMuted: false, followVideo: true, isLocked: false, delayMs: 120, peakDb: -12 },
    { id: '4', name: 'Umpire Wireless', level: 0.4, isMuted: false, followVideo: false, isLocked: false, delayMs: 80, peakDb: -18 },
    { id: '5', name: 'FX / Stings', level: 0.5, isMuted: false, followVideo: false, isLocked: false, delayMs: 0, peakDb: -6 },
    { id: '6', name: 'Aux Return', level: 0.0, isMuted: true, followVideo: false, isLocked: false, delayMs: 400, peakDb: -60 },
  ]);

  const [isDucking, setIsDucking] = useState(false);

  // Simulate real-time meter movement
  useEffect(() => {
    const interval = setInterval(() => {
      setChannels(prev => prev.map(ch => ({
        ...ch,
        peakDb: ch.isMuted ? -60 : Math.max(-60, ch.peakDb + (Math.random() * 4 - 2))
      })));
      // Toggle ducking simulation if commentary is high
      setIsDucking(channels[0].peakDb > -10);
    }, 150);
    return () => clearInterval(interval);
  }, [channels]);

  const updateChannel = (id: string, updates: Partial<AudioChannel>) => {
    setChannels(prev => prev.map(ch => ch.id === id ? { ...ch, ...updates } : ch));
  };

  return (
    <div className="p-8 h-full flex flex-col gap-6">
      <header className="flex justify-between items-start">
        <div>
           <h1 className="text-3xl font-black text-white">AUDIO MASTER HUB</h1>
           <p className="text-slate-400 text-sm uppercase font-bold tracking-widest mt-1">32-Bit Floating Point Engine | Zero-Latency Oboe Stack</p>
        </div>
        <div className="flex gap-4">
           <div className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${isDucking ? 'bg-orange-600/20 border-orange-500 text-orange-400 animate-pulse' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
              AUTO-DUCKING: {isDucking ? 'ACTIVE' : 'READY'}
           </div>
           <button className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-900/40 transition-all">LIMITER CONFIG</button>
        </div>
      </header>

      <div className="flex-1 glass rounded-3xl p-8 border border-slate-800 overflow-x-auto">
        <div className="flex gap-10 h-full min-w-max">
          {channels.map((chan) => (
            <div key={chan.id} className="flex flex-col items-center gap-4 w-28 group">
              
              {/* dB Scale & Meter */}
              <div className="flex-1 flex gap-2 w-full">
                <div className="flex flex-col justify-between text-[8px] font-mono text-slate-600 pb-1">
                    <span>0</span>
                    <span>-6</span>
                    <span>-12</span>
                    <span>-18</span>
                    <span>-24</span>
                    <span>-36</span>
                    <span>-48</span>
                    <span>-60</span>
                </div>
                <div className="flex-1 bg-slate-950 rounded-lg relative overflow-hidden flex flex-col-reverse p-1 border border-slate-800">
                    <div 
                      className={`w-full rounded-sm transition-all duration-150 ${
                          chan.peakDb > -6 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 
                          chan.peakDb > -18 ? 'bg-yellow-400' : 'bg-green-500'
                      }`}
                      style={{ height: `${Math.max(2, ((chan.peakDb + 60) / 60) * 100)}%` }}
                    ></div>
                    {/* Tick marks */}
                    <div className="absolute inset-x-0 h-full flex flex-col justify-between py-2 pointer-events-none opacity-10">
                        {[...Array(12)].map((_, i) => <div key={i} className="h-px bg-white w-full"></div>)}
                    </div>
                </div>
              </div>

              {/* Fader Control */}
              <div className="relative w-full h-8 flex items-center justify-center">
                  <input 
                    type="range" 
                    min="0" max="1" step="0.01" 
                    value={chan.level}
                    onChange={(e) => updateChannel(chan.id, { level: parseFloat(e.target.value) })}
                    className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-full appearance-none" 
                  />
                  <div className="absolute -top-4 text-[10px] font-mono font-bold text-slate-500">
                      {(chan.level === 0) ? '-∞' : `${(20 * Math.log10(chan.level)).toFixed(1)}dB`}
                  </div>
              </div>

              {/* Channel Config */}
              <div className="flex flex-col gap-2 w-full">
                <button 
                  onClick={() => updateChannel(chan.id, { isMuted: !chan.isMuted })}
                  className={`py-2 text-[10px] font-black rounded-lg uppercase transition-all border ${
                      chan.isMuted ? 'bg-red-600 border-red-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  Mute
                </button>

                <div className="flex gap-1">
                   <button 
                    onClick={() => updateChannel(chan.id, { followVideo: !chan.followVideo, isLocked: false })}
                    className={`flex-1 py-1.5 text-[8px] rounded-lg uppercase font-black transition-all border ${
                        chan.followVideo ? 'bg-orange-600 border-orange-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-600'
                    }`}
                   >
                       AFV
                   </button>
                   <button 
                    onClick={() => updateChannel(chan.id, { isLocked: !chan.isLocked, followVideo: false })}
                    className={`flex-1 py-1.5 text-[8px] rounded-lg uppercase font-black transition-all border ${
                        chan.isLocked ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-600'
                    }`}
                   >
                       Lock
                   </button>
                </div>

                {/* Delay Control */}
                <div className="flex flex-col items-center gap-1 bg-slate-900/50 p-2 rounded-xl border border-slate-800">
                    <span className="text-[7px] font-black text-slate-500 uppercase tracking-tighter">Delay ms</span>
                    <div className="flex items-center gap-2">
                        <button onClick={() => updateChannel(chan.id, { delayMs: Math.max(0, chan.delayMs - 10) })} className="text-[10px] hover:text-blue-400">-</button>
                        <span className="text-[10px] font-mono text-blue-400">{chan.delayMs}</span>
                        <button onClick={() => updateChannel(chan.id, { delayMs: chan.delayMs + 10 })} className="text-[10px] hover:text-blue-400">+</button>
                    </div>
                </div>

                <div className="h-10 flex items-center justify-center text-center">
                   <span className="text-[10px] font-bold text-slate-300 line-clamp-2 uppercase leading-tight tracking-tighter group-hover:text-white transition-colors">
                       {chan.name}
                   </span>
                </div>
              </div>
            </div>
          ))}

          {/* Master Out Section */}
          <div className="w-px bg-slate-800 mx-2 h-full"></div>
          
          <div className="flex flex-col items-center gap-4 w-40">
              <div className="flex-1 w-full bg-slate-950 rounded-2xl relative overflow-hidden flex p-2 gap-2 border border-blue-900/30">
                {[0, 1].map(i => (
                    <div key={i} className="flex-1 h-full bg-slate-900 rounded-lg flex flex-col-reverse overflow-hidden">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-600 via-blue-400 to-cyan-300" 
                          style={{ height: '78%' }}
                        ></div>
                    </div>
                ))}
                {/* dB Scale for Master */}
                <div className="absolute right-3 inset-y-0 flex flex-col justify-between py-4 text-[7px] text-slate-600 font-bold">
                    <span>0</span>
                    <span>-10</span>
                    <span>-20</span>
                    <span>-30</span>
                    <span>-40</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full text-center">
                 <div className="text-2xl font-black text-blue-400 tracking-tighter">-2.4 dB</div>
                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-800 py-1 rounded-lg">Master LR Out</div>
                 
                 <div className="mt-4 p-3 bg-blue-950/20 rounded-2xl border border-blue-900/30 space-y-2">
                    <div className="flex justify-between text-[8px] font-bold">
                        <span className="text-slate-500">ENCODING:</span>
                        <span className="text-blue-400">AAC-LC 256kbps</span>
                    </div>
                    <div className="flex justify-between text-[8px] font-bold">
                        <span className="text-slate-500">SRATE:</span>
                        <span className="text-blue-400">48.0 kHz</span>
                    </div>
                 </div>
              </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="flex justify-between items-center px-4 py-2 bg-slate-900/50 rounded-2xl border border-slate-800">
          <div className="flex gap-6 items-center">
              <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Input Sync: STABLE</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                  <span className="text-slate-600 uppercase">Total Headroom:</span>
                  <span className="text-blue-400">+12.0 dB</span>
              </div>
          </div>
          <div className="text-[10px] font-mono text-slate-600">
              OBOE ENGINE v2.4.1 | THREAD_PRIORITY_URGENT_AUDIO
          </div>
      </footer>
    </div>
  );
};

export default AudioMixer;
