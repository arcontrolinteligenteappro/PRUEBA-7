
import React from 'react';

const AdvancedMultimediaSpecs: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-32">
      <header className="space-y-4 border-b border-slate-800 pb-8">
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase">Especificaciones Multimedia Avanzadas</h1>
        <p className="text-slate-400 text-lg italic">Profundización en Shaders, Sincronización PTP e Integración de Hardware Externo.</p>
      </header>

      {/* 1. Advanced Shaders: Chroma Key & Graphics */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-green-900/20">🎨</div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">1. Motor de Shaders (GLSL ES 3.2)</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass p-8 rounded-[2.5rem] border border-slate-800 space-y-4">
            <h3 className="text-sm font-black text-green-400 uppercase tracking-widest">Chroma Key Real-Time</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Implementación de algoritmo de distancia euclidiana en espacio de color YUV para una eliminación de fondo más precisa que en RGB, permitiendo sombras naturales y bordes suaves.
            </p>
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 font-mono text-[10px] text-green-500 overflow-x-auto">
{`// Fragment Shader Snippet
precision mediump float;
uniform samplerExternalOES uTexture;
uniform vec3 uKeyColor; // YUV Space
uniform float uThreshold;

void main() {
    vec4 texColor = texture(uTexture, vTexCoord);
    float dist = distance(texColor.xyz, uKeyColor);
    float alpha = smoothstep(uThreshold, uThreshold + 0.1, dist);
    gl_FragColor = vec4(texColor.rgb, alpha * texColor.a);
}`}
            </div>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border border-slate-800 space-y-4">
            <h3 className="text-sm font-black text-blue-400 uppercase tracking-widest">Lower Thirds & Dynamic Graphics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Los gráficos no son bitmaps estáticos; son planos renderizados sobre la escena con soporte para animaciones procedurales (Lerp) controladas por el Sports Engine.
            </p>
            <ul className="text-[10px] text-slate-500 space-y-1 italic">
              <li>• Soporte para Lottie-to-Texture mapping.</li>
              <li>• Instanced Rendering para elementos repetitivos (ej: marcadores de faltas).</li>
              <li>• Blending aditivo para efectos de brillo en "Home Run" triggers.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Precision Sync: PTP & Jitter Buffer */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-900/20">⏱️</div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">2. Sincronización A/V (PTP Logic)</h2>
        </div>

        <div className="glass p-8 rounded-[3rem] border border-slate-800 space-y-8">
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            Para alinear 9 cámaras con latencias dispares, implementamos un <strong>Master Clock</strong> basado en PTP (Precision Time Protocol). Cada frame entrante es etiquetado con un <code className="text-blue-400">PresentationTimestamp</code> global.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-black text-blue-500 mb-2 uppercase">Audio Drift Correction</h4>
              <p className="text-[10px] text-slate-500 italic">
                El motor Oboe ajusta dinámicamente el tamaño de los ráfagas (burst) de audio para evitar el desvío (drift) respecto al reloj de video maestro.
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-black text-blue-500 mb-2 uppercase">V-Sync Alignment</h4>
              <p className="text-[10px] text-slate-500 italic">
                El renderizador de la GPU espera al frame más atrasado (hasta un umbral de 250ms) antes de realizar el compositing, garantizando que el "Corte" ocurra en el mismo instante temporal.
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-black text-blue-500 mb-2 uppercase">NTP Reference</h4>
              <p className="text-[10px] text-slate-500 italic">
                Uso de servidores NTP locales para sincronización entre múltiples dispositivos Android actuando como cámaras remotas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. External Hardware: DJI & GoPro Integration */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-red-900/20">🚁</div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">3. Integración de Hardware Externo</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass p-8 rounded-[2.5rem] border border-slate-800 flex gap-6">
            <div className="shrink-0 text-4xl">🎮</div>
            <div className="space-y-3">
              <h3 className="font-black text-white uppercase tracking-tight">DJI Mobile SDK (V5)</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li>• Ingesta de stream H.264 directo vía USB-C / Wi-Fi.</li>
                <li>• Control remoto de Gimbal integrado en la interfaz de ARControl.</li>
                <li>• Lectura de telemetría (Altura/Batería) como overlay automático.</li>
              </ul>
            </div>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border border-slate-800 flex gap-6">
            <div className="shrink-0 text-4xl">📷</div>
            <div className="space-y-3">
              <h3 className="font-black text-white uppercase tracking-tight">GoPro Open SDK</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li>• Disparo de grabación local en 4K mientras se transmite en 1080p.</li>
                <li>• Control de FOV (Superview/Linear) desde el Dashboard.</li>
                <li>• Preview de baja latencia vía BLE + Wi-Fi Direct.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvancedMultimediaSpecs;
