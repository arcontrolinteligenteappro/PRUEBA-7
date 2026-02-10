
import React from 'react';

const ArchitectureView: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12 pb-20">
      <header className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-4">
          <span className="bg-blue-600 p-2 rounded-lg">🏗️</span>
          ARControl Sport Live Cam: Architecture Specification
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed">
          Diseño modular de alto rendimiento para Android e iOS basado en <span className="text-blue-400 font-bold">Zero-Copy Memory</span> y 
          procesamiento <span className="text-green-400 font-bold">NDK/C++</span> para latencia ultra-baja.
        </p>
      </header>

      {/* Enterprise Repository Structure */}
      <section className="glass p-10 rounded-[3rem] border border-slate-800 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 text-8xl text-blue-500">📂</div>
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-4xl border border-blue-500/30 text-blue-400">📁</div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Enterprise Repository Structure</h2>
            <p className="text-slate-400 text-sm italic">Organización modular por capas para escalabilidad y mantenibilidad en producción real.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Android Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-green-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="text-lg">🤖</span> Android (Kotlin) Stack
            </h3>
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 font-mono text-xs leading-relaxed text-slate-300">
              <div className="text-green-500 font-bold">arcontrol-android/</div>
              <div className="ml-4 border-l border-slate-800 pl-4 py-1">
                <div className="text-blue-400 font-bold">app/</div>
                <div className="ml-4 border-l border-slate-800 pl-4">
                  <div className="text-yellow-500">ui/</div>
                  <div className="ml-4 text-slate-500 italic">director/, scoreboard/, social/, settings/</div>
                  <div className="text-yellow-500">viewmodel/</div>
                  <div className="ml-4 text-slate-500 italic">VideoViewModel.kt, AudioViewModel.kt, SportsViewModel.kt</div>
                  <div className="text-yellow-500">service/</div>
                  <div className="ml-4 text-slate-500 italic">ConnectivityService.kt, StreamingService.kt</div>
                  <div>MainActivity.kt</div>
                </div>
                <div className="text-blue-400 font-bold mt-2">core/</div>
                <div className="ml-4 text-slate-500 italic">video/, audio/, network/, sync/, replay/</div>
                <div className="text-blue-400 font-bold mt-2">data/</div>
                <div className="ml-4 text-slate-500 italic">models/, repositories/, cloud/</div>
                <div className="text-slate-400 mt-2">utils/</div>
              </div>
            </div>
          </div>

          {/* iOS Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="text-lg">🍎</span> iOS (SwiftUI) Stack
            </h3>
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 font-mono text-xs leading-relaxed text-slate-300">
              <div className="text-blue-400 font-bold">arcontrol-ios/</div>
              <div className="ml-4 border-l border-slate-800 pl-4 py-1">
                <div className="text-white font-bold">App/</div>
                <div className="ml-4">ARControlApp.swift</div>
                <div className="text-white font-bold mt-2">UI/</div>
                <div className="ml-4 border-l border-slate-800 pl-4 text-slate-500 italic">
                  DirectorView/, ScoreboardView/, SocialView/
                </div>
                <div className="text-white font-bold mt-2">ViewModels/</div>
                <div className="ml-4 text-slate-500 italic">VideoVM.swift, AudioVM.swift, SportsVM.swift</div>
                <div className="text-white font-bold mt-2">Core/</div>
                <div className="ml-4 text-slate-500 italic">VideoEngine/, AudioEngine/, NetworkEngine/, ReplayEngine/</div>
                <div className="text-white font-bold mt-2">Services/</div>
                <div className="ml-4 text-slate-500 italic">ConnectivityService.swift, StreamingService.swift</div>
                <div className="text-slate-400 mt-2">Utils/</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Pipeline Deep-Dive */}
      <section className="glass p-10 rounded-[3rem] border border-slate-800 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 text-8xl">📐</div>
          <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-red-600/20 rounded-2xl flex items-center justify-center text-4xl border border-red-500/30">🎞️</div>
              <div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">Zero-Copy Multimedia Pipeline</h2>
                  <p className="text-slate-400 text-sm italic">Optimización agresiva de memoria mediante AHardwareBuffer y EGL/OpenGL mapping.</p>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                  <h3 className="text-xs font-black text-blue-400 uppercase tracking-[0.2em]">Video Processing Logic</h3>
                  <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                      <div className="flex gap-4">
                          <div className="font-mono text-blue-500 text-xs">01</div>
                          <p className="text-xs text-slate-400"><strong className="text-white">Ingesta NDK:</strong> Los paquetes SRT/NDI se desempaquetan en C++ nativo y se envían directamente al MediaCodec en modo asíncrono.</p>
                      </div>
                      <div className="flex gap-4">
                          <div className="font-mono text-blue-500 text-xs">02</div>
                          <p className="text-xs text-slate-400"><strong className="text-white">Texture Mapping:</strong> La salida del decodificador se vincula a una textura <code className="bg-slate-800 px-1 rounded">GL_TEXTURE_EXTERNAL_OES</code> sin copiar bytes a la JVM.</p>
                      </div>
                      <div className="flex gap-4">
                          <div className="font-mono text-blue-500 text-xs">03</div>
                          <p className="text-xs text-slate-400"><strong className="text-white">Internal 2K Master:</strong> El Switcher renderiza en un Framebuffer de 2K (2560x1440) para mantener la fidelidad en recortes digitales (Smart Crop 9:16).</p>
                      </div>
                  </div>
              </div>
              <div className="space-y-4">
                  <h3 className="text-xs font-black text-green-400 uppercase tracking-[0.2em]">Scaling & Output</h3>
                  <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                      <div className="flex gap-4">
                          <div className="font-mono text-green-500 text-xs">04</div>
                          <p className="text-xs text-slate-400"><strong className="text-white">GPU Downscaling:</strong> Mediante Linear Interpolation en shaders, el Master 2K se escala a 1080p para el encoder final, reduciendo aliasing.</p>
                      </div>
                      <div className="flex gap-4">
                          <div className="font-mono text-green-500 text-xs">05</div>
                          <p className="text-xs text-slate-400"><strong className="text-white">Multi-Encoder:</strong> Salida simultánea a Grabación local (4K Proxy) y Multistream (1080p) usando múltiples sesiones de MediaCodec concurrentes.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Sports Logic Engine Section */}
      <section className="glass p-8 rounded-3xl border-l-4 border-l-yellow-500 space-y-6">
          <div className="flex items-center gap-4">
              <span className="text-4xl">🏆</span>
              <div>
                  <h2 className="text-2xl font-black text-white">Sports & Replay Logic (Match Engine)</h2>
                  <p className="text-slate-400 text-sm">Motor de reglas reactivo y gestión de triggers para repeticiones instantáneas.</p>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <h3 className="text-yellow-400 font-bold text-xs uppercase mb-3">Replay Buffer Logic</h3>
                  <ul className="text-xs text-slate-400 space-y-2">
                      <li>• 30s Circular Memory Buffer (RAM)</li>
                      <li>• Flagging asincrónico vía EventBus</li>
                      <li>• Segmentación de clip (10s pre, 5s post)</li>
                      <li>• Background transcoding a Proxy-MP4</li>
                  </ul>
              </div>
              <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <h3 className="text-green-400 font-bold text-xs uppercase mb-3">Rule Strategy Pattern</h3>
                  <ul className="text-xs text-slate-400 space-y-2">
                      <li>• Interfaz abstracta para SportRuleSet</li>
                      <li>• Gestión de estado in-memory (MatchState)</li>
                      <li>• Sincronización con RTMP Metadata (SEI)</li>
                      <li>• Exportación de stats en tiempo real (JSON)</li>
                  </ul>
              </div>
              <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <h3 className="text-blue-400 font-bold text-xs uppercase mb-3">Input Mapping</h3>
                  <ul className="text-xs text-slate-400 space-y-2">
                      <li>• Bluetooth HID Support (Gamepads)</li>
                      <li>• Gesture recognition (Tap/Swipe/Hold)</li>
                      <li>• Physical Volume Key interceptors</li>
                      <li>• Voice command support (via Audio Hub)</li>
                  </ul>
              </div>
          </div>
      </section>

      {/* Audio Engine Section */}
      <section className="glass p-8 rounded-3xl border-l-4 border-l-blue-400 space-y-6">
          <div className="flex items-center gap-4">
              <span className="text-4xl">🎚️</span>
              <div>
                  <h2 className="text-2xl font-black text-white">Audio Engine (32-Bit Oboe Stack)</h2>
                  <p className="text-slate-400 text-sm">Mezcla profesional con compensación de latencia y procesamiento dinámico side-chain.</p>
              </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <h3 className="text-blue-400 font-bold text-xs uppercase mb-3">AAudio / Oboe Stack</h3>
                  <ul className="text-xs text-slate-400 space-y-2">
                      <li>• Low Latency Exclusive Mode</li>
                      <li>• 48kHz / 32-bit Internal Mix</li>
                      <li>• Resampling sinc-interpolated</li>
                  </ul>
              </div>
              <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <h3 className="text-orange-400 font-bold text-xs uppercase mb-3">Dynamics Processing</h3>
                  <ul className="text-xs text-slate-400 space-y-2">
                      <li>• Side-chain Voice Ducking</li>
                      <li>• Look-ahead Master Limiter</li>
                      <li>• Constant Power Crossfades</li>
                  </ul>
              </div>
              <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <h3 className="text-cyan-400 font-bold text-xs uppercase mb-3">Compensación</h3>
                  <ul className="text-xs text-slate-400 space-y-2">
                      <li>• 0ms - 2000ms delay configurable</li>
                      <li>• Sincronización PTP con video</li>
                      <li>• Audio Follow Video (AFV) mapping</li>
                  </ul>
              </div>
          </div>
      </section>
    </div>
  );
};

export default ArchitectureView;
