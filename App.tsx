
import React, { useState } from 'react';
import DirectorView from './components/DirectorView';
import ArchitectureView from './components/ArchitectureView';
import AudioMixer from './components/AudioMixer';
import SocialHub from './components/SocialHub';
import Sidebar from './components/Sidebar';
import ConnectivityHub from './components/ConnectivityHub';
import SportsEngineControl from './components/SportsEngineControl';
import MatchProtocol from './components/MatchProtocol';
import TechnicalBlueprint from './components/TechnicalBlueprint';
import ImplementationGuide from './components/ImplementationGuide';
import MultimediaPipeline from './components/MultimediaPipeline';
import AdvancedMultimediaSpecs from './components/AdvancedMultimediaSpecs';
import SystemFlow from './components/SystemFlow';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'director' | 'architecture' | 'audio' | 'social' | 'connectivity' | 'sports' | 'protocol' | 'blueprint' | 'guide' | 'pipeline' | 'advanced' | 'flow'>('director');

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  }

  return (
    <div className="flex h-screen bg-[#050a14] text-slate-100 overflow-hidden font-mono">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="flex-1 overflow-y-auto relative no-scrollbar">
        {activeTab === 'director' && <DirectorView />}
        {activeTab === 'architecture' && <ArchitectureView />}
        {activeTab === 'audio' && <AudioMixer />}
        {activeTab === 'social' && <SocialHub />}
        {activeTab === 'connectivity' && <ConnectivityHub />}
        {activeTab === 'sports' && <SportsEngineControl />}
        {activeTab === 'protocol' && <MatchProtocol />}
        {activeTab === 'blueprint' && <TechnicalBlueprint />}
        {activeTab === 'guide' && <ImplementationGuide />}
        {activeTab === 'pipeline' && <MultimediaPipeline />}
        {activeTab === 'advanced' && <AdvancedMultimediaSpecs />}
        {activeTab === 'flow' && <SystemFlow />}
      </main>
    </div>
  );
};

export default App;
