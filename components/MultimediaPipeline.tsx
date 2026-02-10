
import React from 'react';

const MultimediaPipeline: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-32">
      <header className="space-y-4 border-b border-slate-800 pb-8">
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase">Multimedia Pipeline Analysis</h1>
        <p className="text-slate-400 text-lg italic">Arquitectura de baja latencia: Del Fotón al Bitstream.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Layer 1: Ingesta */}
        <div className="glass p-8 rounded-[2.5rem] border border-slate-800 space-y-6 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 text-6xl opacity-10">📥</div>
          <h2 className="text-xl font-black text-blue-400 uppercase">1. Ingesta Multi-Vínculo</h2>
          <div className="space-y-4 text-sm text-slate-400">
            <p><strong className="text-white">NDI/SRT Receiver:</strong> Implementado en C++ (NDK). Los paquetes llegan vía <code className="text-blue-500">UdpSocket</code> y se reensamblan en un buffer circular asíncrono.</p>
            <p><strong className="text-white">Jitter Buffer:</strong> Algoritmo de suavizado basado en marcas de tiempo PTS (Presentation Time Stamp) para compensar variaciones de red de hasta 500ms.</p>
          </div>
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-[10px] text-blue-500">
            // NDK Logic<br/>
            SrtClient.receive(packet);<br/>
            BufferManager.push(packet.pts);
          </div>
        </div>

        {/* Layer 2: Processing */}
        <div className="glass p-8 rounded-[2.5rem] border border-blue-600/30 space-y-6 relative overflow-hidden bg-blue-600/5">
          <div className="absolute -top-4 -right-4 text-6xl opacity-10">⚙️</div>
          <h2 className="text-xl font-black text-white uppercase">2. Master Render (GPU)</h2>
          <div className="space-y-4 text-sm text-slate-400">
            <p><strong className="text-white">Zero-Copy Mapping:</strong> Uso de <code className="text-blue-500">SurfaceTexture</code> vinculado a <code className="text-blue-500">GL_TEXTURE_EXTERNAL_OES</code>. No hay copia de bytes entre el decodificador y el renderizador.</p>
            <p><strong className="text-white">Shader Pipeline:</strong> Composición de 9 fuentes simultáneas + Marcador + Chroma Key en un solo paso de renderizado (Single Pass) para ahorrar batería.</p>
          </div>
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-[10px] text-green-500">
            #version 300 es<br/>
            uniform samplerExternalOES uTex;<br/>
            gl_FragColor = mix(texA, texB, uTBar);
          </div>
        </div>

        {/* Layer 3: Output */}
        <div className="glass p-8 rounded-[2.5rem] border border-slate-800 space-y-6 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 text-6xl opacity-10">🚀</div>
          <h2 className="text-xl font-black text-red-500 uppercase">3. Encoding & Uplink</h2>
          <div className="space-y-4 text-sm text-slate-400">
            <p><strong className="text-white">Hardware HEVC:</strong> El EGLContext inyecta frames directamente al <code className="text-blue-500">MediaCodec</code> vía Input Surface.</p>
            <p><strong className="text-white">ABR Logic:</strong> El bitrate se ajusta cada 2 segundos basándose en el estado de <code className="text-blue-500">SO_SNDBUF</code> para evitar saturación de subida.</p>
          </div>
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-[10px] text-red-400">
            MediaFormat.KEY_BIT_RATE = currentAbr;<br/>
            codec.signalEndOfInputStream();
          </div>
        </div>
      </div>

      {/* Class Hierarchy Section */}
      <section className="glass p-10 rounded-[3rem] border border-slate-800">
        <h2 className="text-2xl font-black text-white uppercase mb-8">Estructura de Clases Core (Logic Base)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              class: 'ProductionEngine', 
              desc: 'Orquestador principal. Gestiona el ciclo de vida de los EGLContext y el Switcher.',
              methods: ['start()', 'stop()', 'setPreview(id)', 'take()']
            },
            { 
              class: 'SourceManager', 
              desc: 'Fábrica de fuentes. Descubre y vincula cámaras NDI, SRT y Locales.',
              methods: ['discover()', 'bind(source)', 'release()']
            },
            { 
              class: 'SportsLogicManager', 
              desc: 'Motor de reglas. Procesa eventos de juego y actualiza el overlay.',
              methods: ['onGoal()', 'updateTimer()', 'triggerReplay()']
            },
            { 
              class: 'AudioMixerCore', 
              desc: 'Mezclador NDK (Oboe). Gestiona el DSP y el Side-chain Ducking.',
              methods: ['setVolume(ch)', 'lock(ch)', 'setDelay(ms)']
            }
          ].map((item, i) => (
            <div key={i} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="text-blue-400 font-bold text-sm">class {item.class}</div>
              <p className="text-[10px] text-slate-500 italic leading-relaxed">{item.desc}</p>
              <div className="space-y-1">
                {item.methods.map((m, j) => <div key={j} className="text-[9px] font-mono text-slate-400">• {m}</div>)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MultimediaPipeline;
