
import React, { useState } from 'react';

interface ProtocolPhase {
  id: number;
  title: string;
  time: string;
  tasks: string[];
  status: 'pending' | 'active' | 'completed' | 'warning';
}

const MatchProtocol: React.FC = () => {
  const [phases, setPhases] = useState<ProtocolPhase[]>([
    {
      id: 1,
      title: 'FASE 1 · PRUEBA DE RED',
      time: '30–45 min antes',
      status: 'active',
      tasks: [
        'Crear HOTSPOT dedicado (no Wi-Fi público)',
        'Conectar Smartphone NDI',
        'Conectar GoPro RTMP',
        'Conectar DJI Mini 3',
        'Verificar latencia por cámara',
        'Validar pérdida de paquetes < 0.5%',
        'Chequear temperatura inicial'
      ]
    },
    {
      id: 2,
      title: 'FASE 2 · PRUEBA DE CARGA',
      time: '15 min antes',
      status: 'pending',
      tasks: [
        'Activar 3–5 cámaras simultáneas',
        'Iniciar Marcador (Sports Engine)',
        'Activar Social Hub (AI On)',
        'Habilitar Replay Buffer (30s Circular)',
        'Monitorear RAM y FPS estables'
      ]
    },
    {
      id: 3,
      title: 'FASE 3 · TRANSMISIÓN PRIVADA',
      time: '10 min antes',
      status: 'pending',
      tasks: [
        'Stream YouTube (Modo Oculto)',
        'Stream TikTok (Modo Oculto)',
        'Probar conmutación rápida (Fast Cut)',
        'Forzar un GOAL / HOME RUN',
        'Sincronizar Audio/Video (Offset check)'
      ]
    },
    {
      id: 4,
      title: 'FASE 4 · SIMULACIÓN DE ERROR',
      time: 'Crítica',
      status: 'pending',
      tasks: [
        'Apagar fuente secundaria (Test Reconexión)',
        'Alejar Smartphone (Test Jitter Buffer)',
        'Corte Wi-Fi 5s (Test Resiliencia)',
        'Validar audio "Safe Mode"'
      ]
    },
    {
      id: 5,
      title: 'FASE 5 · PARTIDO REAL',
      time: 'En vivo',
      status: 'pending',
      tasks: [
        'Monitorear temperatura estable (< 45°C)',
        'Verificar Audio Lock activo',
        'Latencia global bajo umbral',
        'NO tocar ajustes complejos'
      ]
    }
  ]);

  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());

  const toggleTask = (task: string) => {
    const next = new Set(checkedTasks);
    if (next.has(task)) next.delete(task);
    else next.add(task);
    setCheckedTasks(next);
  };

  const updatePhaseStatus = (id: number, status: ProtocolPhase['status']) => {
    setPhases(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 pb-20">
      <header className="flex justify-between items-center border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight uppercase">Protocolo de Operación</h1>
          <p className="text-slate-400 mt-2 font-bold uppercase text-xs tracking-[0.3em]">Technical Pre-Game & Live Strategy</p>
        </div>
        <div className="flex gap-4">
           <div className="glass px-6 py-3 rounded-2xl border border-slate-800 flex items-center gap-4">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Progress</span>
              <div className="w-48 h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                 <div 
                   className="h-full bg-blue-500 transition-all duration-500" 
                   style={{ width: `${(checkedTasks.size / phases.reduce((acc, p) => acc + p.tasks.length, 0)) * 100}%` }}
                 ></div>
              </div>
              <span className="text-xs font-mono font-bold text-blue-400">{Math.round((checkedTasks.size / phases.reduce((acc, p) => acc + p.tasks.length, 0)) * 100)}%</span>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {phases.map((phase) => (
          <div 
            key={phase.id} 
            className={`glass rounded-[2.5rem] border transition-all duration-300 relative overflow-hidden ${
              phase.status === 'active' ? 'border-blue-500 shadow-2xl shadow-blue-900/10' : 
              phase.status === 'completed' ? 'border-green-500 opacity-60' : 'border-slate-800'
            }`}
          >
            {phase.status === 'active' && <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 animate-pulse"></div>}
            
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                 <div>
                    <h2 className="text-xl font-black text-white">{phase.title}</h2>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{phase.time}</span>
                 </div>
                 <select 
                   value={phase.status} 
                   onChange={(e) => updatePhaseStatus(phase.id, e.target.value as any)}
                   className="bg-slate-900 border border-slate-700 rounded-lg text-[10px] font-bold px-2 py-1 text-slate-300 uppercase"
                 >
                    <option value="pending">Pendiente</option>
                    <option value="active">Activo</option>
                    <option value="completed">Completado</option>
                    <option value="warning">Alerta</option>
                 </select>
              </div>

              <div className="space-y-3">
                {phase.tasks.map((task, idx) => (
                  <label 
                    key={idx} 
                    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${
                      checkedTasks.has(task) 
                      ? 'bg-slate-900/50 border-slate-700 text-slate-500' 
                      : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-200'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      checked={checkedTasks.has(task)}
                      onChange={() => toggleTask(task)}
                      className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900"
                    />
                    <span className={`text-sm font-medium ${checkedTasks.has(task) ? 'line-through' : ''}`}>{task}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="space-y-8">
            <div className="glass p-10 rounded-[3rem] border border-orange-500/30 bg-orange-600/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl">🚨</div>
                <h3 className="text-xl font-black text-orange-500 uppercase mb-4">Simulación de Errores</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-8">
                  Utiliza estos triggers durante la <strong>FASE 4</strong> para validar la resiliencia del motor de producción y la respuesta del equipo técnico.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <button className="py-4 bg-orange-600 hover:bg-orange-500 text-white font-black text-xs uppercase rounded-2xl transition-all shadow-lg shadow-orange-900/40">Cortar NDI-1</button>
                    <button className="py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-black text-xs uppercase rounded-2xl transition-all border border-slate-700">Inyectar Lag</button>
                    <button className="py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-black text-xs uppercase rounded-2xl transition-all border border-slate-700">Mute Emergencia</button>
                    <button className="py-4 bg-red-600/20 border border-red-500 text-red-500 hover:bg-red-600 hover:text-white font-black text-xs uppercase rounded-2xl transition-all">Flush Buffers</button>
                </div>
            </div>

            <div className="glass p-10 rounded-[3rem] border border-blue-500/30 bg-blue-900/10">
                <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-6">Métricas en Tiempo Real</h3>
                <div className="space-y-6">
                    <div className="flex justify-between items-end">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">SoC Temp</span>
                        <span className="text-2xl font-black text-green-400">41.8°C</span>
                    </div>
                    <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                        <div className="w-[41%] h-full bg-green-500"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8 pt-4">
                        <div>
                            <span className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Enc. Lag</span>
                            <span className="text-xl font-black">12ms</span>
                        </div>
                        <div>
                            <span className="block text-[10px] font-bold text-slate-500 uppercase mb-1">RAM Free</span>
                            <span className="text-xl font-black">2.4 GB</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MatchProtocol;
