
import React from 'react';

const ImplementationGuide: React.FC = () => {
  const modules = [
    {
      title: 'Módulo 1: Ingesta Multimedia (NDK Core)',
      features: ['Soporte LibSRT/libndi nativo', 'Gestión de Jitter Buffer adaptativo', 'AHardwareBuffer Mapping'],
      operability: 'Captura en hilos de prioridad real-time (SCHED_FIFO) para evitar frames descartados por el sistema operativo.'
    },
    {
      title: 'Módulo 2: Motor de Renderizado (OpenGL/Vulkan)',
      features: ['Composición 2K Multi-Textura', 'Shaders de transición (Fade/Wipe)', 'Smart Crop 9:16 dinámico'],
      operability: 'Renderizado en espacio de color YUV para evitar conversiones costosas antes del encoding HEVC.'
    },
    {
      title: 'Módulo 3: Audio Master (Oboe Stack)',
      features: ['Mezcla 32-bit Float', 'Side-chain Auto-Ducking', 'Compensación PTP'],
      operability: 'Utiliza AAudio en modo exclusivo para latencias menores a 10ms en dispositivos compatibles.'
    }
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 pb-32">
      <header className="space-y-4 border-b border-slate-800 pb-8">
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase">Guía de Implementación Maestra</h1>
        <p className="text-slate-400 text-lg italic">Análisis Senior de Operatividad Funcional.</p>
      </header>

      {/* Operability Analysis */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-blue-400 uppercase tracking-tight">1. Análisis de Operatividad</h2>
        <div className="glass p-8 rounded-[2.5rem] border border-slate-800 space-y-6">
          <p className="text-slate-300 leading-relaxed text-sm">
            La operatividad de <strong>ARControl Sport</strong> se basa en la <strong>Arquitectura de Buffer Circular Desacoplado</strong>. El sistema no bloquea el hilo de UI bajo ninguna circunstancia. El flujo de video ocurre íntegramente en la GPU, mientras que el motor de red SRT gestiona su propia memoria en C++ para garantizar que el sistema Android no recolecte basura (GC) durante momentos críticos del partido.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
              <h4 className="text-white font-bold mb-2 uppercase text-xs">Latencia Determinística</h4>
              <p className="text-[11px] text-slate-500">Compensación dinámica de latencia basada en el RTCP Receiver Reports. El sistema auto-ajusta el buffer para mantener el stream fluido incluso con pérdida de paquetes del 10%.</p>
            </div>
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
              <h4 className="text-white font-bold mb-2 uppercase text-xs">Fail-Safe Audio</h4>
              <p className="text-[11px] text-slate-500">Si el proceso multimedia principal falla, un hilo de audio independiente (Oboe) mantiene el ambiente activo para evitar el silencio absoluto en la transmisión.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Functional Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-green-400 uppercase tracking-tight">2. Desglose de Funciones</h2>
        <div className="space-y-4">
          {modules.map((m, i) => (
            <div key={i} className="glass p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors">
              <h3 className="text-xl font-black text-white mb-4">{m.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Funciones Críticas</span>
                   <ul className="text-sm text-slate-400 space-y-2">
                     {m.features.map((f, j) => <li key={j} className="flex items-center gap-2"><span className="text-green-500">✔</span> {f}</li>)}
                   </ul>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                   <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-2">Comportamiento del Sistema</span>
                   <p className="text-xs text-slate-400 leading-relaxed">{m.operability}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Master Prompt */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-orange-500 uppercase tracking-tight">3. Prompt Maestro Final</h2>
        <div className="bg-slate-950 p-10 rounded-[3rem] border-2 border-orange-500/30 relative">
          <div className="absolute top-6 right-10 text-xs font-black text-orange-500 uppercase tracking-widest animate-pulse">Engineering Payload</div>
          <pre className="text-[11px] text-slate-300 whitespace-pre-wrap font-mono leading-relaxed h-80 overflow-y-auto no-scrollbar p-2">
{`### MASTER PROMPT: ARCONTROL SPORT LIVE CAM - CORE IMPLEMENTATION

Actúa como un Senior Multimedia Systems Engineer (Android/NDK).
Genera la arquitectura de clases base para "ARControl Sport".

ESPECIFICACIONES REQUERIDAS:
1. Clase 'VideoEngineCore' (Kotlin): Manejo de EGLContext y vinculación de SurfaceTexture.
2. Clase 'NativeStreamingClient' (C++): Implementación de socket SRT con callback para JitterBuffer.
3. Shader 'MasterSportsMixer.glsl': 
   - Soporte para 9 texturas OES.
   - Blend dinámico para transiciones Program/Preview.
   - Aplica máscara de SmartCrop 9:16 opcional.

ENTREGABLES:
- CMakeLists.txt para las librerías nativas (libNDI, libSRT, libOboe).
- MainActivity.kt con setup de permisos y arranque de servicios Foreground.
- ViewModels de Producción con StateFlow para estados de conexión de 9 fuentes.

RESTRICCIÓN TÉCNICA:
- Priorizar C++ para todo lo que sea manipulación de frames raw.
- Usar Jetpack Compose para la UI.
- Memoria: Zero object allocation en el loop de renderizado.`}
          </pre>
          <div className="mt-8 flex justify-center">
            <button className="px-10 py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-orange-900/40 transition-all active:scale-95">
              Copiar Prompt de Ingeniería
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImplementationGuide;
