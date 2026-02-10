
import React, { useState } from 'react';
import { MediaSource, PTZState, SourceType, TransitionType } from '../types';
import HealthMonitor from './HealthMonitor';
import PTZControls from './PTZControls';
import ReplayEngine from './ReplayEngine';

// Sub-component for Audio VU Meter
const VUMeter: React.FC<{ peak: number }> = ({ peak }) => (
    <div className="w-full h-4 bg-black/50 border border-white/10 flex items-center p-0.5">
        <div className="w-full h-full flex items-center">
            <div className="h-full bg-green-500 transition-all duration-100" style={{ width: `${Math.max(0, 100 + peak)}%` }}></div>
            <div className="h-full bg-yellow-500 transition-all duration-100" style={{ width: `${Math.max(0, 100 + peak - 75)}%` }}></div>
            <div className="h-full bg-red-500 transition-all duration-100" style={{ width: `${Math.max(0, 100 + peak - 95)}%` }}></div>
        </div>
    </div>
);

const DirectorView: React.FC = () => {
    const [program, setProgram] = useState<string>('cam-1');
    const [preview, setPreview] = useState<string>('cam-2');
    const [sources] = useState<MediaSource[]>(() => Array.from({ length: 5 }).map((_, i) => ({
        id: `cam-${i + 1}`,
        name: i === 0 ? 'MASTER' : i === 1 ? 'SIDELINE' : i === 2 ? 'DRONE' : `SRC 0${i+1}`,
        type: SourceType.NDI_HX, resolution: '1080p', fps: 60, bitrate: 12, latency: 40 + i*10, status: 'connected',
        health: { battery: 90 - i * 5, temperature: 35 + i, signal: 98 - i * 3 },
        ptzState: { pan: 0, tilt: 0, zoom: 1, speed: 0.5, activePreset: null }
    })));

    const [ptzState, setPtzState] = useState<PTZState>({ pan: 0, tilt: 0, zoom: 1, speed: 0.5, activePreset: 1 });
    const [activeConfigTab, setActiveConfigTab] = useState('PTZ');

    return (
        <div className="h-full flex flex-col bg-[#050a14] font-mono select-none">
            <div className="flex-1 flex min-h-0">
                {/* Main Production Area */}
                <div className="flex-1 flex flex-col p-4 gap-4">
                    {/* Top Panel: PVW/PGM */}
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                           <div className="flex-1 relative border-2 border-[#00e5ff] shadow-[0_0_30px_rgba(0,229,255,0.1)]">
                               <img src={`https://picsum.photos/seed/${preview}/1280/720`} alt="Preview" className="w-full h-full object-cover" />
                               <div className="absolute top-0 left-0 bg-[#00e5ff] text-black px-4 py-1 font-black text-[10px] tracking-[0.5em] uppercase">PREVIEW</div>
                           </div>
                           <VUMeter peak={-18 + Math.random() * 5} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex-1 relative border-2 border-[#ff0040] shadow-[0_0_30px_rgba(255,0,64,0.15)]">
                                <img src={`https://picsum.photos/seed/${program}/1280/720`} alt="Program" className="w-full h-full object-cover" />
                                <div className="absolute top-0 left-0 bg-[#ff0040] text-white px-4 py-1 font-black text-[10px] tracking-[0.5em] uppercase">PROGRAM</div>
                            </div>
                            <VUMeter peak={-6 + Math.random() * 3} />
                        </div>
                    </div>
                    {/* Central Bar: Source Bus & Transitions */}
                    <div className="h-28 bg-[#0a0f1d] border border-[#00e5ff11] p-4 flex items-center justify-center gap-8">
                        <div className="flex gap-2">
                            {sources.map(s => (
                                <button key={s.id} onClick={() => setPreview(s.id)} className={`w-20 h-16 text-xs font-black uppercase transition-all border-2 ${
                                    program === s.id ? 'bg-[#ff0040] text-white border-[#ff0040]' :
                                    preview === s.id ? 'bg-[#00e5ff] text-black border-[#00e5ff]' :
                                    'bg-black/40 border-white/10 text-slate-400 hover:border-[#00e5ff]'
                                }`}>
                                    {s.name}
                                </button>
                            ))}
                        </div>
                        <div className="w-px h-full bg-[#00e5ff22]"></div>
                        <div className="flex gap-4">
                            <button className="w-24 h-16 bg-black/40 border-2 border-white/10 text-slate-300 font-black tracking-[0.3em] uppercase">CUT</button>
                            <button onClick={() => setProgram(preview)} className="w-24 h-16 bg-[#ff0040] text-white font-black tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(255,0,64,0.4)]">TAKE</button>
                        </div>
                    </div>
                </div>

                {/* Right Column: PTZ & Config */}
                <div className="w-[400px] bg-[#0a0f1d] border-l border-[#00e5ff11] flex flex-col p-4 gap-4">
                    <div className="flex gap-1 bg-black/40 p-1 border border-white/5">
                        {['PTZ', 'REPLAY', 'AUDIO', 'FX'].map(tab => (
                            <button key={tab} onClick={() => setActiveConfigTab(tab)} className={`flex-1 py-2 text-[10px] font-black tracking-widest uppercase transition-all ${activeConfigTab === tab ? 'bg-[#00e5ff] text-black' : 'text-slate-500 hover:bg-white/5'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 bg-black/40 border border-white/5 p-4">
                        {activeConfigTab === 'PTZ' && <PTZControls state={ptzState} setState={setPtzState} />}
                        {activeConfigTab === 'REPLAY' && <ReplayEngine />}
                        {activeConfigTab === 'AUDIO' && <div className="text-slate-600 text-center p-10">AUDIO MIXER PANEL</div>}
                        {activeConfigTab === 'FX' && <div className="text-slate-600 text-center p-10">DSK & OVERLAYS</div>}
                    </div>
                </div>
            </div>
            {/* Bottom Panel: Health Monitor */}
            <HealthMonitor sources={sources} systemHealth={{ socTemp: 42.5, ramUsage: 65 }} />
        </div>
    );
};

export default DirectorView;
