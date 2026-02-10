
import React, { useState, useEffect, useRef } from 'react';
import { SportType, MatchState } from '../types';

const SportsEngineControl: React.FC = () => {
  const [match, setMatch] = useState<MatchState>({
    sport: SportType.FOOTBALL,
    teamA: { name: 'VALORANT ACADEMY', score: 0, color: '#ff0040', fouls: 0 },
    teamB: { name: 'CYBER TITANS', score: 0, color: '#00e5ff', fouls: 0 },
    period: 1,
    timerMs: 0,
    isTimerRunning: false,
    isGameOver: false
  });

  const [replayEvents, setReplayEvents] = useState<{ id: number; time: string; type: string }[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (match.isTimerRunning) {
      timerRef.current = window.setInterval(() => {
        setMatch(prev => ({ ...prev, timerMs: prev.timerMs + 1000 }));
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [match.isTimerRunning]);

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleScore = (team: 'A' | 'B', increment: number) => {
    setMatch(prev => ({
      ...prev,
      [team === 'A' ? 'teamA' : 'teamB']: {
        ...prev[team === 'A' ? 'teamA' : 'teamB'],
        score: Math.max(0, prev[team === 'A' ? 'teamA' : 'teamB'].score + increment)
      }
    }));

    if (increment > 0) {
      triggerReplay(team === 'A' ? 'GOAL TEAM A' : 'GOAL TEAM B');
    }
  };

  const triggerReplay = (type: string) => {
    const newEvent = { id: Date.now(), time: formatTime(match.timerMs), type };
    setReplayEvents(prev => [newEvent, ...prev].slice(0, 8));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 pb-32 font-mono">
      <header className="flex justify-between items-end border-b border-[#00e5ff22] pb-8">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">Sports Engine</h1>
          <p className="text-[#00e5ff] text-xs font-black tracking-[0.4em] uppercase mt-2">Match Logic & Real-Time Graphic Overlays.</p>
        </div>
        <div className="flex gap-1 bg-black p-1 border border-white/5">
           {Object.values(SportType).map(s => (
             <button 
                key={s}
                onClick={() => setMatch(prev => ({ ...prev, sport: s }))}
                className={`px-6 py-2 text-[10px] font-black tracking-widest transition-all uppercase ${match.sport === s ? 'bg-[#00e5ff] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}
             >
                {s}
             </button>
           ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <div className="lg:col-span-2 space-y-10">
           <div className="bg-[#121212] p-12 rounded-sm border border-[#00e5ff22] flex flex-col items-center gap-16 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent opacity-30"></div>
              
              <div className="text-7xl font-black tracking-tighter text-[#00e5ff] bg-black px-12 py-4 border border-[#00e5ff33] shadow-[inset_0_0_20px_rgba(0,229,255,0.1)]">
                  {formatTime(match.timerMs)}
              </div>

              <div className="flex justify-between items-center w-full">
                 <div className="text-center space-y-6 flex-1">
                    <div className="w-24 h-24 border-2 border-[#ff0040] mx-auto bg-black flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(255,0,64,0.2)]">🏠</div>
                    <div className="text-xs font-black text-[#ff0040] tracking-widest uppercase">{match.teamA.name}</div>
                    <div className="text-9xl font-black text-white tracking-tighter leading-none">{match.teamA.score}</div>
                    <div className="flex gap-4 justify-center pt-6">
                       <button onClick={() => handleScore('A', 1)} className="w-14 h-14 bg-black border border-[#ff0040] text-[#ff0040] font-black text-2xl hover:bg-[#ff0040] hover:text-white transition-all">+</button>
                       <button onClick={() => handleScore('A', -1)} className="w-14 h-14 bg-black border border-slate-800 text-slate-600 font-black text-2xl hover:bg-slate-800 transition-all">-</button>
                    </div>
                 </div>

                 <div className="text-4xl font-black text-slate-800 px-8 italic">VS</div>

                 <div className="text-center space-y-6 flex-1">
                    <div className="w-24 h-24 border-2 border-[#00e5ff] mx-auto bg-black flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(0,229,255,0.2)]">🚌</div>
                    <div className="text-xs font-black text-[#00e5ff] tracking-widest uppercase">{match.teamB.name}</div>
                    <div className="text-9xl font-black text-white tracking-tighter leading-none">{match.teamB.score}</div>
                    <div className="flex gap-4 justify-center pt-6">
                       <button onClick={() => handleScore('B', 1)} className="w-14 h-14 bg-black border border-[#00e5ff] text-[#00e5ff] font-black text-2xl hover:bg-[#00e5ff] hover:text-black transition-all">+</button>
                       <button onClick={() => handleScore('B', -1)} className="w-14 h-14 bg-black border border-slate-800 text-slate-600 font-black text-2xl hover:bg-slate-800 transition-all">-</button>
                    </div>
                 </div>
              </div>

              <div className="flex gap-10 items-center bg-black p-8 border border-white/5">
                  <div className="text-center">
                      <span className="block text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Current Period</span>
                      <span className="text-3xl font-black text-white">0{match.period}</span>
                  </div>
                  <div className="h-10 w-px bg-slate-800"></div>
                  <button 
                    onClick={() => setMatch(prev => ({ ...prev, isTimerRunning: !prev.isTimerRunning }))}
                    className={`px-10 py-4 font-black text-[10px] tracking-[0.4em] uppercase transition-all border ${match.isTimerRunning ? 'bg-[#ff004022] border-[#ff0040] text-[#ff0040]' : 'bg-[#00e5ff22] border-[#00e5ff] text-[#00e5ff]'}`}
                  >
                    {match.isTimerRunning ? 'PAUSE CLOCK' : 'START CLOCK'}
                  </button>
                  <div className="h-10 w-px bg-slate-800"></div>
                  <button 
                    onClick={() => triggerReplay('MANUAL_MARK')}
                    className="border border-white/20 text-white px-8 py-4 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all"
                  >
                    MARK REPLAY
                  </button>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-8">
              <div className="bg-[#121212] p-8 rounded-sm border border-white/5 space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Technical Triggers</h3>
                  <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => triggerReplay('YELLOW_CARD')} className="py-4 border border-yellow-500/30 text-yellow-500 text-[9px] font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all">Yellow Card</button>
                      <button onClick={() => triggerReplay('RED_CARD')} className="py-4 border border-red-500/30 text-red-500 text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Red Card</button>
                      <button onClick={() => triggerReplay('VAR_REVIEW')} className="py-4 border border-[#00e5ff33] text-[#00e5ff] text-[9px] font-black uppercase tracking-widest hover:bg-[#00e5ff] hover:text-black transition-all">VAR Check</button>
                      <button onClick={() => triggerReplay('INJURY_TIME')} className="py-4 border border-white/10 text-slate-400 text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Injury Time</button>
                  </div>
              </div>
              <div className="bg-[#121212] p-8 rounded-sm border border-white/5 space-y-6 text-center">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Graphics Mapping</h3>
                  <div className="flex flex-col gap-3 pt-2">
                      <div className="flex justify-between items-center p-4 bg-black border border-white/5">
                          <span className="text-[10px] font-black uppercase text-slate-400">Score Lower Third</span>
                          <div className="w-8 h-3 bg-[#00e5ff] shadow-[0_0_5px_#00e5ff]"></div>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-black border border-white/5">
                          <span className="text-[10px] font-black uppercase text-slate-400">Timer Top Right</span>
                          <div className="w-8 h-3 bg-[#00e5ff] shadow-[0_0_5px_#00e5ff]"></div>
                      </div>
                  </div>
              </div>
           </div>
        </div>

        {/* Replay Feed (Cyber Feed) */}
        <div className="bg-[#0a0f1d] border border-white/5 flex flex-col overflow-hidden">
            <div className="p-6 bg-black border-b border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00e5ff]">REPLAY_QUEUE.LOG</span>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[8px] font-black text-slate-500 uppercase">Buffer Active</span>
                </div>
            </div>
            <div className="flex-1 p-6 space-y-4 overflow-y-auto no-scrollbar">
                {replayEvents.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-700 gap-6 text-center p-10 opacity-30">
                        <div className="text-5xl">⚡</div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">Waiting for events...<br/>Circular RAM Buffer is 100% stable.</p>
                    </div>
                ) : (
                    replayEvents.map(event => (
                        <div key={event.id} className="p-6 bg-black border border-white/5 group hover:border-[#00e5ff] transition-all relative overflow-hidden">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[10px] font-black text-[#00e5ff] tracking-widest">@ {event.time}</span>
                                <div className="text-[8px] font-black text-slate-600">ID: {event.id.toString().slice(-4)}</div>
                            </div>
                            <h4 className="font-black text-xs uppercase text-white tracking-widest">{event.type.replace('_', ' ')}</h4>
                            <button className="mt-4 w-full py-3 border border-[#00e5ff] text-[#00e5ff] font-black text-[9px] uppercase tracking-[0.3em] hover:bg-[#00e5ff] hover:text-black transition-all">Play Replay</button>
                        </div>
                    ))
                )}
            </div>
            <div className="p-6 bg-black border-t border-white/10">
                <div className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-loose">
                   SYSTEM: Recording triggers as broadcast metadata.<br/>
                   REPLAY_ENGINE: Active 2K Frame Storing.
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SportsEngineControl;
