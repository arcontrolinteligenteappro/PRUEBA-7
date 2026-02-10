
import React from 'react';

type TabId = 'director' | 'architecture' | 'audio' | 'social' | 'connectivity' | 'sports' | 'protocol' | 'blueprint' | 'guide' | 'pipeline' | 'advanced' | 'flow';

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'director', label: 'DIRECTOR', icon: '🔴' },
    { id: 'flow', label: 'PIPELINE', icon: '🔄' },
    { id: 'sports', label: 'SPORTS', icon: '🏆' },
    { id: 'connectivity', label: 'CONNECT', icon: '📡' },
    { id: 'audio', label: 'AUDIO', icon: '🎚️' },
    { id: 'advanced', label: 'NDK CORE', icon: '⚙️' },
    { id: 'social', label: 'SOCIAL', icon: '💬' },
    { id: 'pipeline', label: 'BUFFER', icon: '🧬' },
    { id: 'protocol', label: 'LOGS', icon: '📋' },
    { id: 'architecture', label: 'ARCH', icon: '🏗️' },
    { id: 'blueprint', label: 'VIEWMODEL', icon: '📐' },
    { id: 'guide', label: 'GUIDE', icon: '📖' },
  ] as const;

  return (
    <aside className="w-20 lg:w-64 bg-[#0a0f1d] border-r border-[#00e5ff22] flex flex-col items-center lg:items-stretch p-4 gap-4 z-50">
      <div className="flex items-center gap-3 px-2 mb-8 shrink-0">
        <div className="w-12 h-12 bg-[#ff0040] rounded-sm flex items-center justify-center font-black text-2xl shadow-[0_0_15px_rgba(255,0,64,0.4)] text-white">AR</div>
        <div className="hidden lg:block">
           <div className="font-black text-lg tracking-tighter leading-none text-white">CONTROL</div>
           <div className="text-[9px] font-bold text-[#00e5ff] tracking-[0.3em]">LIVE CAM</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as any)}
            className={`flex items-center gap-4 px-4 py-3 transition-all duration-300 relative group ${
              activeTab === tab.id 
                ? 'bg-[#00e5ff11] text-[#00e5ff] border-l-4 border-[#00e5ff]' 
                : 'text-slate-500 hover:text-slate-200 hover:bg-[#ffffff05]'
            }`}
          >
            <span className="text-xl opacity-80 group-hover:scale-110 transition-transform">{tab.icon}</span>
            <span className="hidden lg:block font-bold text-xs tracking-widest uppercase">{tab.label}</span>
            {activeTab === tab.id && (
                <div className="absolute right-2 w-1 h-1 bg-[#00e5ff] rounded-full shadow-[0_0_5px_#00e5ff]"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-[#00e5ff11] shrink-0">
        <div className="hidden lg:block mb-4 px-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Snapdragon 8 Gen 3</span>
            <span className="text-[10px] text-orange-400 font-bold">42.5°C</span>
          </div>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden border border-white/5">
            <div className="w-[42%] h-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"></div>
          </div>
          <div className="mt-2 text-[8px] text-slate-600 font-bold uppercase tracking-widest text-right">Thermal Limit: 48°C</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
