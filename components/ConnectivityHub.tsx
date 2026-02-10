
import React, { useState, useEffect } from 'react';
import { SourceType, MediaSource, ConnectivityStats } from '../types';

// Sub-component for individual stat display
const StatCard: React.FC<{ label: string; value: string; unit: string; color: string }> = ({ label, value, unit, color }) => (
  <div className="bg-black/40 p-6 border border-white/5">
    <div className={`text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2`}>{label}</div>
    <div className="flex items-baseline gap-2">
      <span className={`text-3xl font-black ${color}`}>{value}</span>
      <span className="text-sm font-bold text-slate-400">{unit}</span>
    </div>
  </div>
);

// Sub-component for the sparkline graph
const Sparkline: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  const max = Math.max(...data, 1);
  const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d / max) * 100}`).join(' ');
  
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};


const ConnectivityHub: React.FC = () => {
  const [sources, setSources] = useState<MediaSource[]>([
    { id: 'cam-1', name: 'MASTER NDI', type: SourceType.NDI_HX, resolution: '2K', fps: 60, bitrate: 15.2, latency: 45, status: 'connected', stats: { ip: '192.168.1.101', jitter: [2,3,2,4,2], packetLoss: 0.01, rtt: 5, bufferUsage: 0.2, syncDelay: 0 } },
    { id: 'cam-2', name: 'DRONE SRT', type: SourceType.SRT, resolution: '1080p', fps: 60, bitrate: 8.5, latency: 250, status: 'connected', stats: { ip: '203.0.113.45', jitter: [15,18,12,20,16], packetLoss: 0.4, rtt: 85, bufferUsage: 0.6, syncDelay: 120 } },
    { id: 'cam-3', name: 'GOPRO RTMP', type: SourceType.GOPRO, resolution: '1080p', fps: 60, bitrate: 12.0, latency: 120, status: 'connecting' },
    { id: 'cam-4', name: 'UVC CAPTURE', type: SourceType.UVC, resolution: '1080p', fps: 50, bitrate: 0, latency: 5, status: 'disconnected', stats: { ip: 'LOCAL', jitter: [0], packetLoss: 0, rtt: 1, bufferUsage: 0, syncDelay: 20 } },
  ]);

  // Simulate real-time network telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSources(prevSources => prevSources.map(s => {
        if (s.status !== 'connected' || !s.stats) return s;
        const newJitter = [...s.stats.jitter.slice(1), s.stats.jitter[s.stats.jitter.length -1] + (Math.random() * 4 - 2)];
        return {
          ...s,
          bitrate: +(s.bitrate + (Math.random() * 0.8 - 0.4)).toFixed(1),
          stats: { ...s.stats, jitter: newJitter }
        };
      }));
    }, 500);
    return () => clearInterval(interval);
  }, []);
  
  const updateSourceDelay = (id: string, delay: number) => {
      setSources(prev => prev.map(s => s.id === id && s.stats ? {...s, stats: {...s.stats, syncDelay: delay }} : s));
  }

  return (
    <div className="p-8 max-w-full mx-auto space-y-8 font-mono">
      <header className="flex justify-between items-end border-b border-[#00e5ff22] pb-6">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-[0.2em]">Connectivity Core</h1>
          <p className="text-[#00e5ff] mt-2 uppercase text-xs font-black tracking-[0.4em]">NDK Multi-Link Engine | Jitter & Latency Control</p>
        </div>
        <div className="flex gap-4">
            <button className="bg-black/40 border border-[#00e5ff] text-[#00e5ff] px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#00e5ff] hover:text-black transition-all">SCAN NETWORK (MDNS)</button>
            <button className="bg-[#ff0040] border border-[#ff0040] text-white px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-opacity-80 transition-all shadow-[0_0_20px_rgba(255,0,64,0.3)]">LINK VIA QR</button>
        </div>
      </header>

      {/* Global Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Bandwidth" value="35.7" unit="Mbps" color="neon-text-cyan" />
        <StatCard label="Avg. Latency" value="138" unit="ms" color="text-green-400" />
        <StatCard label="Packet Loss" value="0.08" unit="%" color="text-yellow-400" />
        <StatCard label="Active Links" value="2 / 9" unit="Sources" color="text-white" />
      </div>

      {/* Source Management Interface */}
      <div className="space-y-6">
        {sources.map((source) => (
            <div key={source.id} className="bg-[#121212]/90 border border-[#00e5ff22] transition-all hover:border-[#00e5ff44] grid grid-cols-12 gap-8 items-center p-6 relative">
              
              {/* Status Indicator */}
              <div className={`absolute left-0 top-0 h-full w-1 ${
                source.status === 'connected' ? 'bg-[#00e5ff] shadow-[0_0_10px_#00e5ff]' : 
                source.status === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-slate-800'
              }`}></div>

              {/* Source Info */}
              <div className="col-span-12 lg:col-span-3 flex gap-6 items-center">
                <div className="w-16 h-16 bg-black border border-white/10 flex items-center justify-center text-3xl shrink-0">
                  {source.type === SourceType.NDI_HX ? '📡' : source.type === SourceType.SRT ? '🚀' : '📸'}
                </div>
                <div>
                   <h3 className="font-black text-lg text-white uppercase tracking-tighter">{source.name}</h3>
                   <div className="text-[10px] font-bold text-slate-500 tracking-widest">{source.stats?.ip || 'N/A'}</div>
                   <div className="flex items-center gap-2 mt-2">
                      <span className="text-[8px] font-black text-black bg-[#00e5ff] px-2 py-0.5 uppercase">{source.type}</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase">{source.resolution}@{source.fps}</span>
                   </div>
                </div>
              </div>

              {/* Live Telemetry */}
              <div className="col-span-12 lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                 <div>
                    <div className="text-[8px] uppercase tracking-[0.2em] font-black text-slate-500">Bitrate</div>
                    <div className="text-lg font-black text-white">{source.bitrate.toFixed(1)} <span className="text-xs text-slate-500">Mbps</span></div>
                 </div>
                 <div>
                    <div className="text-[8px] uppercase tracking-[0.2em] font-black text-slate-500">Latency</div>
                    <div className="text-lg font-black text-white">{source.latency} <span className="text-xs text-slate-500">ms</span></div>
                 </div>
                 <div className="col-span-2">
                    <div className="text-[8px] uppercase tracking-[0.2em] font-black text-slate-500 mb-1">Jitter</div>
                    <div className="h-8 w-full">
                        {source.stats?.jitter && <Sparkline data={source.stats.jitter} color="#f97316" />}
                    </div>
                 </div>
              </div>
              
              {/* Controls & Config */}
              <div className="col-span-12 lg:col-span-3 flex items-center gap-4">
                  <div className="flex-1">
                      <label className="text-[8px] uppercase tracking-[0.2em] font-black text-slate-500">Sync Delay</label>
                      <div className="flex items-center gap-2">
                          <input 
                            type="range" min="0" max="500" step="10" 
                            value={source.stats?.syncDelay || 0}
                            onChange={(e) => updateSourceDelay(source.id, parseInt(e.target.value))}
                            disabled={!source.stats}
                            className="w-full h-1 accent-[#00e5ff] bg-black appearance-none cursor-pointer" 
                          />
                          <span className="text-xs font-black w-12 text-right">{source.stats?.syncDelay || 0}ms</span>
                      </div>
                  </div>
                  <button className="w-10 h-10 bg-black border border-white/5 text-slate-500 hover:text-[#00e5ff] hover:border-[#00e5ff] transition-colors">⚙️</button>
              </div>

            </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectivityHub;
