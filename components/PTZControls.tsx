
import React from 'react';
import { PTZState } from '../types';

interface PTZControlsProps {
    state: PTZState;
    setState: React.Dispatch<React.SetStateAction<PTZState>>;
}

const PTZControls: React.FC<PTZControlsProps> = ({ state, setState }) => {
    
    const handlePreset = (preset: number) => {
        setState(s => ({ ...s, activePreset: preset }));
        // Logic to send PTZ command would go here
    };

    return (
        <div className="h-full flex flex-col gap-6 text-white">
            <div className="text-center">
                <div className="text-[10px] font-black text-[#00e5ff] uppercase tracking-[0.3em]">PTZ Control Surface</div>
                <div className="text-xs text-slate-500">Source: CAM-03 (DRONE)</div>
            </div>

            {/* Virtual Joystick */}
            <div className="flex-1 flex items-center justify-center">
                <div className="w-48 h-48 bg-black rounded-full border-2 border-[#00e5ff22] relative flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#00e5ff] rounded-full border-4 border-black shadow-[0_0_20px_rgba(0,229,255,0.5)] cursor-pointer active:scale-95 transition-transform"></div>
                    <div className="absolute inset-0 border-[20px] border-black rounded-full"></div>
                    <div className="absolute inset-4 border-2 border-[#00e5ff11] rounded-full"></div>
                </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
                <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Zoom</label>
                    <input type="range" min="1" max="16" step="0.1" className="w-full h-1 accent-[#00e5ff] bg-black/50 appearance-none cursor-pointer" />
                </div>
                <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Speed</label>
                    <input type="range" min="0.1" max="1" step="0.1" className="w-full h-1 accent-[#ff0040] bg-black/50 appearance-none cursor-pointer" />
                </div>
            </div>

            {/* Presets */}
            <div>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Presets</div>
                <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <button key={i} onClick={() => handlePreset(i+1)} className={`py-4 text-xs font-black border-2 transition-all ${
                            state.activePreset === (i+1) ? 'bg-[#00e5ff] text-black border-[#00e5ff]' : 'bg-black/40 border-white/10 text-slate-400 hover:border-[#00e5ff]'
                        }`}>
                            P{i+1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PTZControls;
