
import React from 'react';
import { MediaSource } from '../types';

interface HealthMonitorProps {
    sources: MediaSource[];
    systemHealth: {
        socTemp: number;
        ramUsage: number; // as percentage
    }
}

const HealthIndicator: React.FC<{ value: number; type: 'temp' | 'signal' | 'battery' }> = ({ value, type }) => {
    let color = 'text-green-400';
    if ((type === 'temp' && value > 45) || (type === 'signal' && value < 50) || (type === 'battery' && value < 20)) {
        color = 'text-red-500 animate-pulse';
    } else if ((type === 'temp' && value > 40) || (type === 'signal' && value < 75) || (type === 'battery' && value < 50)) {
        color = 'text-yellow-400';
    }
    return <span className={`font-black ${color}`}>{value}{type === 'temp' ? '°C' : '%'}</span>;
};

const HealthMonitor: React.FC<HealthMonitorProps> = ({ sources, systemHealth }) => {
    return (
        <div className="h-28 shrink-0 bg-[#0a0f1d] border-t border-[#00e5ff11] p-4 flex gap-8 items-center">
            {/* System Health */}
            <div className="bg-black/40 border border-white/5 p-4 h-full w-64 flex flex-col justify-center">
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">System Core</div>
                <div className="flex items-end justify-between mt-2">
                    <div className="leading-none">
                        <div className="text-[8px] text-slate-400">SoC TEMP</div>
                        <div className="text-2xl font-black text-orange-400">{systemHealth.socTemp}°C</div>
                    </div>
                    <div className="leading-none text-right">
                        <div className="text-[8px] text-slate-400">RAM</div>
                        <div className="text-2xl font-black text-[#00e5ff]">{systemHealth.ramUsage}%</div>
                    </div>
                </div>
            </div>

            {/* Sources Health Table */}
            <div className="flex-1 h-full overflow-x-auto no-scrollbar">
                <div className="flex h-full gap-4 min-w-max">
                    {sources.map(source => (
                        <div key={source.id} className={`h-full w-48 shrink-0 bg-black/40 border border-white/5 p-3 flex flex-col justify-between transition-opacity ${source.status !== 'connected' ? 'opacity-30' : ''}`}>
                            <div className="flex justify-between items-center">
                                <div className="text-[10px] font-black uppercase text-white">{source.name}</div>
                                <div className="text-[8px] font-bold text-slate-500">{source.type}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[9px] uppercase tracking-widest">
                                <span className="text-slate-500">SIGNAL</span>
                                <span className="text-right"><HealthIndicator value={source.health?.signal ?? 0} type="signal" /></span>
                                <span className="text-slate-500">LATENCY</span>
                                <span className="text-right font-black">{source.latency}ms</span>
                                <span className="text-slate-500">TEMP</span>
                                <span className="text-right"><HealthIndicator value={source.health?.temperature ?? 0} type="temp" /></span>
                                <span className="text-slate-500">BATT</span>
                                <span className="text-right"><HealthIndicator value={source.health?.battery ?? 0} type="battery" /></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HealthMonitor;
