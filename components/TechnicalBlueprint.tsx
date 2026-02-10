
import React from 'react';
import { ViewModelSpec } from '../types';

const TechnicalBlueprint: React.FC = () => {
  const viewModels: ViewModelSpec[] = [
    {
      name: 'VideoProductionViewModel',
      responsibilities: [
        'Gestión de las 9 texturas externas (EGL Surface)',
        'Orquestación del T-Bar y transiciones',
        'Cálculo de bitrate adaptativo (ABR)',
        'Monitoreo de frames perdidos (Dropped Frames)'
      ],
      states: [
        'uiState: ProductionUiState (Loading, Ready, Error)',
        'previewSource: MutableStateFlow<String>',
        'programSource: MutableStateFlow<String>',
        'isTransitioning: State<Boolean>'
      ],
      logicSnippet: `// Android/Kotlin Example
class VideoProductionViewModel @Inject constructor(
    private val videoEngine: VideoEngineCore
) : ViewModel() {
    private val _uiState = MutableStateFlow<ProductionUiState>(ProductionUiState.Loading)
    val uiState = _uiState.asStateFlow()

    fun performTake(transition: TransitionType) {
        viewModelScope.launch {
            videoEngine.startTransition(
                from = programSource.value,
                to = previewSource.value,
                type = transition
            )
        }
    }
}`
    },
    {
      name: 'JetpackComposeUIState',
      responsibilities: [
        'Declarative UI definition',
        'Immutability of view states',
        'One-way data flow (UDF)'
      ],
      states: [
        'data class DirectorState(val activeCamId: String, val sources: List<MediaSource>)',
        'sealed interface UIEvent { object OnTake : UIEvent }'
      ],
      logicSnippet: `// Jetpack Compose Screen
@Composable
fun DirectorScreen(viewModel: VideoProductionViewModel) {
    val state by viewModel.uiState.collectAsState()

    Scaffold {
        Column {
            ProgramMonitor(sourceId = state.activeCamId)
            SourceGrid(sources = state.sources) { camId ->
                viewModel.onEvent(SelectPreview(camId))
            }
            TakeButton(onClick = { viewModel.onEvent(UIEvent.OnTake) })
        }
    }
}`
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-20">
      <header className="space-y-4">
        <h1 className="text-4xl font-black text-white tracking-tight uppercase">Architectural Blueprint</h1>
        <p className="text-xl text-slate-400">Especificación técnica profunda del motor multimedia ARControl.</p>
      </header>

      {/* Logic Layers Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {viewModels.map((vm, idx) => (
          <div key={idx} className="glass rounded-[2.5rem] border border-slate-800 overflow-hidden flex flex-col">
            <div className="p-8 bg-slate-900/50 border-b border-slate-800">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-lg">VM</div>
                  <h2 className="text-xl font-black text-white">{vm.name}</h2>
               </div>
               <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Responsabilidades</span>
                    <ul className="text-xs text-slate-400 space-y-1">
                      {vm.responsibilities.map((r, i) => <li key={i}>• {r}</li>)}
                    </ul>
                  </div>
               </div>
            </div>
            <div className="flex-1 p-8 bg-slate-950 font-mono text-[11px]">
               <span className="text-blue-500 font-bold mb-4 block">// Lógica Base & Estados Compose</span>
               <pre className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                 {vm.logicSnippet}
               </pre>
            </div>
          </div>
        ))}
      </section>

      {/* Performance & Optimization Table */}
      <section className="glass rounded-[3rem] border border-slate-800 overflow-hidden">
         <div className="p-10 border-b border-slate-800 bg-slate-900/30">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Android Optimization Stack</h2>
            <p className="text-slate-400 text-sm italic">Configuraciones críticas para evitar thermal throttling y jitter.</p>
         </div>
         <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-4">
               <h3 className="text-xs font-black text-red-500 uppercase tracking-widest">CPU & Power</h3>
               <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 text-[11px] text-slate-400 space-y-4">
                  <p><strong className="text-white">Performance Mode:</strong> Uso de <code className="text-blue-400">PowerManager.WakeLock</code> y desactivación de ahorro de batería forzada mediante permisos especiales.</p>
                  <p><strong className="text-white">Affinity:</strong> Pinning de hilos de audio a los "Big Cores" del SoC para garantizar latencia determinística.</p>
               </div>
            </div>
            <div className="space-y-4">
               <h3 className="text-xs font-black text-green-500 uppercase tracking-widest">Memory Management</h3>
               <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 text-[11px] text-slate-400 space-y-4">
                  <p><strong className="text-white">Zero-Copy:</strong> Evitar <code className="text-blue-400">byte[]</code>. Todo el video fluye mediante IDs de texturas OpenGL o descriptores de archivo nativos.</p>
                  <p><strong className="text-white">Circular Buffers:</strong> Uso de buffers circulares pre-asignados en memoria nativa (Direct ByteBuffers) para evitar el GC durante el streaming.</p>
               </div>
            </div>
            <div className="space-y-4">
               <h3 className="text-xs font-black text-blue-500 uppercase tracking-widest">Network Stack</h3>
               <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 text-[11px] text-slate-400 space-y-4">
                  <p><strong className="text-white">Adaptive Bitrate:</strong> Implementación de algoritmos BBR (Bottleneck Bandwidth and RTT) para ajustar el bitrate del encoder en vivo.</p>
                  <p><strong className="text-white">Socket Tuning:</strong> Aumento de buffers de socket TCP/UDP a nivel de OS (<code className="text-blue-400">SO_RCVBUF</code> / <code className="text-blue-400">SO_SNDBUF</code>).</p>
               </div>
            </div>
         </div>
      </section>

      {/* Logic Diagram - SVG */}
      <section className="glass p-10 rounded-[3rem] border border-slate-800 space-y-8">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight text-center">Data Pipeline Flow (Master System)</h2>
          <div className="flex justify-center">
              <div className="w-full max-w-4xl bg-slate-950 p-8 rounded-3xl border border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest text-center">
                  <div className="flex flex-col gap-4 items-center">
                      <div className="w-20 h-20 rounded-full border-2 border-slate-800 flex items-center justify-center text-white bg-slate-900">CAPTURE</div>
                      <span>Native Sockets</span>
                  </div>
                  <div className="h-0.5 w-12 bg-slate-800"></div>
                  <div className="flex flex-col gap-4 items-center">
                      <div className="w-20 h-20 rounded-full border-2 border-slate-800 flex items-center justify-center text-white bg-slate-900">BUFFER</div>
                      <span>Jitter Control</span>
                  </div>
                  <div className="h-0.5 w-12 bg-slate-800"></div>
                  <div className="flex flex-col gap-4 items-center">
                      <div className="w-24 h-24 rounded-full border-4 border-blue-600 flex items-center justify-center text-white bg-blue-600/10 shadow-lg shadow-blue-900/30">GPU MASTER</div>
                      <span className="text-blue-400">2K Render</span>
                  </div>
                  <div className="h-0.5 w-12 bg-slate-800"></div>
                  <div className="flex flex-col gap-4 items-center">
                      <div className="w-20 h-20 rounded-full border-2 border-slate-800 flex items-center justify-center text-white bg-slate-900">ENCODER</div>
                      <span>Hardware HEVC</span>
                  </div>
                  <div className="h-0.5 w-12 bg-slate-800"></div>
                  <div className="flex flex-col gap-4 items-center">
                      <div className="w-20 h-20 rounded-full border-2 border-slate-800 flex items-center justify-center text-white bg-slate-900">STREAM</div>
                      <span>RTMP/SRT</span>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default TechnicalBlueprint;
