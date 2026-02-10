
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Comment {
  id: number;
  user: string;
  text: string;
  platform: 'YouTube' | 'Twitch' | 'Facebook' | 'TikTok' | 'Kick';
  priority: 'low' | 'medium' | 'high';
  category?: string;
  suggestedAction?: string;
}

const SocialHub: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, user: 'StreamFan_22', text: '¡Increíble jugada! El portero estuvo volando.', platform: 'Twitch', priority: 'medium' },
    { id: 2, user: 'Juan_Deportes', text: '¿Cuánto queda de partido? Me perdí el inicio.', platform: 'YouTube', priority: 'high' },
    { id: 3, user: 'Coach_X', text: 'La formación 4-3-3 no está funcionando para el equipo local.', platform: 'Facebook', priority: 'medium' },
    { id: 4, user: 'Troll99', text: 'Este stream va lag, el comentarista es malo.', platform: 'Kick', priority: 'low' },
  ]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

  const analyzeCommentsWithAI = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analyze the following sports stream comments. For each, determine:
      1. Category (Question, Praise, Technical Analysis, or Spam).
      2. Priority (High if it's a good question or deep analysis, Low if spam).
      3. A short "On-Air Label" (max 20 chars).
      
      Comments:
      ${comments.map(c => `ID ${c.id}: "${c.text}"`).join('\n')}
      
      Return as a JSON array of objects with ids and these fields.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      const results = JSON.parse(response.text || '[]');
      setComments(prev => prev.map(c => {
        const analysis = results.find((r: any) => r.id === c.id);
        if (analysis) {
          return {
            ...c,
            priority: analysis.priority.toLowerCase() as any,
            category: analysis.category,
            suggestedAction: analysis.onAirLabel
          };
        }
        return c;
      }));
    } catch (error) {
      console.error("AI Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col gap-6">
      <header className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-black text-white">SOCIAL HUB MODERATION</h1>
           <p className="text-slate-400 text-sm uppercase font-bold tracking-widest mt-1 italic">Powered by Gemini AI Intelligence</p>
        </div>
        <div className="flex gap-4">
            <button 
              onClick={analyzeCommentsWithAI}
              disabled={isAnalyzing}
              className={`px-6 py-2 rounded-xl text-xs font-black transition-all border ${isAnalyzing ? 'bg-purple-900/40 border-purple-500 animate-pulse text-purple-300' : 'bg-slate-800 border-slate-700 hover:border-purple-500 hover:text-purple-400'}`}
            >
              {isAnalyzing ? 'ANALIZANDO...' : '✨ AI SMART TRIAGE'}
            </button>
            <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800">
                {['YouTube', 'Twitch', 'Kick'].map(p => (
                    <div key={p} className="px-3 py-1 text-[10px] font-bold text-slate-500">{p}</div>
                ))}
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
        {/* Chat Feed */}
        <div className="lg:col-span-2 glass rounded-[2.5rem] border border-slate-800 flex flex-col overflow-hidden shadow-2xl">
           <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                 <span className="text-xs font-black uppercase tracking-widest">Live Audience Stream</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Auto-Moderation: ACTIVE</span>
           </div>
           
           <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {comments.sort((a, b) => (a.priority === 'high' ? -1 : 1)).map((msg) => (
                <div 
                    key={msg.id} 
                    className={`p-5 rounded-3xl border transition-all flex justify-between items-center gap-4 ${
                        msg.priority === 'high' 
                        ? 'bg-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-900/10' 
                        : msg.priority === 'low' ? 'opacity-40 bg-slate-900 border-slate-800' : 'bg-slate-800/40 border-slate-800'
                    }`}
                >
                  <div className="flex gap-5 items-center flex-1">
                    <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center font-black text-slate-500 border border-slate-700 text-xl">
                        {msg.user[0].toUpperCase()}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                            <span className="font-black text-sm text-white">{msg.user}</span>
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                                msg.platform === 'Twitch' ? 'bg-purple-600 text-white' : 
                                msg.platform === 'YouTube' ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'
                            }`}>{msg.platform}</span>
                            {msg.category && <span className="text-[8px] text-blue-400 font-bold uppercase tracking-widest bg-blue-900/30 px-2 py-0.5 rounded-lg border border-blue-500/20">{msg.category}</span>}
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 items-end">
                      {msg.priority === 'high' && (
                        <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-[9px] font-black text-yellow-500 animate-pulse">
                            PRIORITY
                        </div>
                      )}
                      <button 
                        onClick={() => setSelectedCommentId(msg.id)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-blue-900/40 transition-all active:scale-95"
                      >
                        Push to Air
                      </button>
                  </div>
                </div>
              ))}
           </div>

           {/* AI Insight Bar */}
           <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <span className="text-lg">🤖</span>
                 <span className="text-xs font-bold uppercase tracking-tight">AI Suggestion: Feature "Juan_Deportes" to answer game clock query.</span>
              </div>
              <button className="text-[10px] font-black underline uppercase">Dismiss</button>
           </div>
        </div>

        {/* Analytics & Multistream Status */}
        <div className="space-y-6">
            <div className="glass p-8 rounded-[2.5rem] border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Audience Sentiment</h3>
                <div className="flex items-center gap-6">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                           <circle cx="40" cy="40" r="36" fill="transparent" stroke="#1e293b" strokeWidth="8"/>
                           <circle cx="40" cy="40" r="36" fill="transparent" stroke="#22c55e" strokeWidth="8" strokeDasharray="226" strokeDashoffset="45"/>
                        </svg>
                        <span className="absolute text-xl font-black text-green-400">82%</span>
                    </div>
                    <div className="space-y-1">
                        <div className="text-sm font-black">Highly Positive</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Trending: #TeamLocal #EpicSave</div>
                    </div>
                </div>
            </div>

            <div className="glass p-8 rounded-[2.5rem] border border-slate-800">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 text-center">Platform Health</h3>
                <div className="space-y-4">
                    {[
                      { p: 'YouTube', v: '1.2k', s: 'STABLE' },
                      { p: 'TikTok', v: '4.8k', s: 'STABLE' },
                      { p: 'Twitch', v: '850', s: 'LAG' },
                    ].map(item => (
                        <div key={item.p} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                            <span className="text-xs font-black">{item.p}</span>
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-mono text-slate-400">{item.v} viewers</span>
                                <span className={`text-[8px] font-black px-2 py-0.5 rounded ${item.s === 'STABLE' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{item.s}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass p-8 rounded-[2.5rem] border border-slate-800 bg-indigo-900/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">🗨️</div>
                <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Moderation Insights</h3>
                <p className="text-sm text-slate-300 italic leading-relaxed">
                   "He bloqueado automáticamente 12 comentarios identificados como 'Toxic Spam' en los últimos 5 minutos."
                </p>
                <button className="mt-4 w-full py-2 bg-indigo-600/20 border border-indigo-500/50 text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">Review Blocklist</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SocialHub;
