
import React, { useState } from 'react';
import { ReplayEvent } from '../types';

const ReplayEngine: React.FC = () => {
    const [events, setEvents] = useState<ReplayEvent[]>([]);
    const [activeEvent, setActiveEvent] = useState<ReplayEvent | null>(null);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

    const markEvent = (type: ReplayEvent['type']) => {
        const newEvent: ReplayEvent = {
            id: `evt_${Date.now().toString().slice(-5)}`,
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
            type: type,
            sourceId: 'cam-1', // Should come from program source
            durationMs: 10000,
        };
        setEvents(prev => [newEvent, ...prev].slice(0, 6)); // Keep last 6 events
    };

    return (
        <div className="h-full flex flex-col gap-4 text-white">
            <div className="text-center pb-2 border-b border-[#00e5ff22]">
                <div className="text-[10px] font-black text-[#00e5ff] uppercase tracking-[0.3em]">Replay Engine (EVS)</div>
                <div className="text-xs text-green-400 font-bold animate-pulse">BUFFERING 30S OK</div>
            </div>

            {/* Main Action Button */}
            <button 
                onClick={() => markEvent('MANUAL')}
                className="w-full py-4 bg-black/40 border-2 border-[#00e5ff] text-[#00e5ff] font-black text-sm uppercase tracking-[0.3em] hover:bg-[#00e5ff] hover:text-black transition-all shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                MARK EVENT
            </button>

            {/* Event Queue */}
            <div className="flex-1 flex flex-col gap-2 overflow-y-auto no-scrollbar pr-2">
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">EVENT QUEUE</div>
                {events.length === 0 ? (
                    <div className="text-center text-slate-600 p-8 text-xs font-bold uppercase">NO EVENTS MARKED</div>
                ) : (
                    events.map(event => (
                        <div key={event.id} onClick={() => setActiveEvent(event)} className={`p-3 bg-black/40 border border-white/10 flex items-center justify-between cursor-pointer transition-all ${
                            activeEvent?.id === event.id ? 'border-[#ff0040]' : 'hover:border-white/30'
                        }`}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-black shrink-0">
                                    <img src={`https://picsum.photos/seed/${event.id}/100/100`} alt="replay thumb" className="w-full h-full object-cover"/>
                                </div>
                                <div>
                                    <div className="text-[10px] font-black uppercase text-white">{event.type}</div>
                                    <div className="text-[9px] text-slate-400">{event.timestamp}</div>
                                </div>
                            </div>
                            <div className="text-[8px] font-mono text-slate-500">{event.id}</div>
                        </div>
                    ))
                )}
            </div>

            {/* Playback Controls */}
            <div className={`p-4 bg-black/40 border border-[#ff004033] transition-opacity ${activeEvent ? 'opacity-100' : 'opacity-30'}`}>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Playback Control: {activeEvent?.id || 'NONE'}</div>
                {activeEvent ? (
                    <div className="flex flex-col gap-3">
                        <div className="h-24 bg-black border border-white/10 flex items-center justify-center">
                           <div className="text-5xl opacity-50">▶</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                             <div className="flex gap-1">
                                <button onClick={() => setPlaybackSpeed(0.5)} className={`flex-1 text-[10px] font-black border ${playbackSpeed === 0.5 ? 'bg-white text-black' : 'border-white/20 text-slate-300'}`}>0.5x</button>
                                <button onClick={() => setPlaybackSpeed(1.0)} className={`flex-1 text-[10px] font-black border ${playbackSpeed === 1.0 ? 'bg-white text-black' : 'border-white/20 text-slate-300'}`}>1.0x</button>
                             </div>
                             <button className="py-2 bg-black border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">PLAY</button>
                        </div>
                        <button onClick={() => setActiveEvent(null)} className="py-3 bg-[#ff0040] text-white font-black text-xs uppercase tracking-[0.2em]">RETURN TO LIVE</button>
                    </div>
                ) : (
                    <div className="text-center text-slate-700 p-10 text-xs font-bold uppercase">LOAD AN EVENT</div>
                )}
            </div>
        </div>
    );
};

export default ReplayEngine;
