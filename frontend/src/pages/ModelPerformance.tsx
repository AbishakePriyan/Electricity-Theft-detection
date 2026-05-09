import React, { useEffect, useState } from 'react';
import { getModelPerformance } from '../api';

const ModelPerformance = () => {
  const [perf, setPerf] = useState<any>(null);

  useEffect(() => {
    getModelPerformance().then(res => setPerf(res.data));
  }, []);

  if (!perf) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Model Info Strip */}
      <div className="glass-card rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-2.5 rounded-lg">
            <span className="material-symbols-outlined text-primary">analytics</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline-md text-on-surface">lstm_autoencoder.h5</h2>
              <span className="bg-green-500/10 text-green-500 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-green-500/20">Production</span>
            </div>
            <p className="text-xs text-slate-500 font-label-caps">Trained:  Apr 26, 2026 • Version: 2.4.1-stable</p>
          </div>
        </div>
        <div className="flex gap-8 border-l border-[#21262D] pl-8">
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Architecture</p>
            <p className="text-sm font-semibold text-on-surface">Recurrent LSTM</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Training Samples</p>
            <p className="text-sm font-semibold text-on-surface">1.2M Meter Records</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Latency</p>
            <p className="text-sm font-semibold text-on-surface">42ms / inference</p>
          </div>
        </div>
        <button className="bg-primary text-on-primary px-4 py-2 rounded font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">refresh</span>
          RE-TRAIN MODEL
        </button>
      </div>

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Accuracy', val: perf.accuracy, color: 'text-primary', circle: 'text-primary', offset: 175.9 * (1 - perf.accuracy) },
          { label: 'Precision', val: perf.precision, color: 'text-secondary', circle: 'text-secondary', offset: 175.9 * (1 - perf.precision) },
          { label: 'Recall', val: perf.recall, color: 'text-tertiary', circle: 'text-tertiary', offset: 175.9 * (1 - perf.recall) },
          { label: 'F1 Score', val: perf.f1, color: 'text-primary-fixed-dim', circle: 'text-primary-fixed-dim', offset: 175.9 * (1 - perf.f1) },
        ].map(m => (
          <div key={m.label} className="glass-card rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-label-caps mb-1">{m.label}</p>
              <h3 className={`text-3xl font-numeric-data text-on-surface`}>{(m.val * 100).toFixed(1)}%</h3>
            </div>
            <div className="relative w-16 h-16">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-[#21262D]" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="4"></circle>
                <circle className={m.circle} cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray="175.9" strokeDashoffset={m.offset} strokeWidth="4"></circle>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">{(m.val * 100).toFixed(0)}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Confusion Matrix */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4 glass-card rounded-xl p-6">
          <h4 className="font-headline-md text-on-surface mb-6">Confusion Matrix</h4>
          <div className="grid grid-cols-2 gap-2 text-center mb-6">
            <div className="p-4 rounded-lg bg-surface-container-high border border-[#21262D]">
              <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">True Negative</p>
              <p className="text-xl font-numeric-data">{perf.confusion_matrix.tn.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-error-container/20 border border-error-container/30">
              <p className="text-[10px] text-error font-bold uppercase mb-1">False Positive</p>
              <p className="text-xl font-numeric-data">{perf.confusion_matrix.fp.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-tertiary-container/20 border border-tertiary-container/30">
              <p className="text-[10px] text-tertiary font-bold uppercase mb-1">False Negative</p>
              <p className="text-xl font-numeric-data">{perf.confusion_matrix.fn.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/20 border border-primary/30">
              <p className="text-[10px] text-primary font-bold uppercase mb-1">True Positive</p>
              <p className="text-xl font-numeric-data">{perf.confusion_matrix.tp.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        {/* AUC Curve Placeholder */}
        <div className="col-span-12 lg:col-span-8 glass-card rounded-xl p-6">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h4 className="font-headline-md text-on-surface">ROC-AUC Curve</h4>
              <p className="text-xs text-slate-500">Receiver Operating Characteristic</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-xs font-label-caps">AUC SCORE</p>
              <p className="text-2xl font-numeric-data text-primary">{perf.auc}</p>
            </div>
          </div>
          <div className="h-[280px] w-full recessed-chart rounded-lg relative overflow-hidden flex items-end p-2">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path className="text-primary/40" d="M 0 100 Q 5 10 100 0" fill="none" stroke="currentColor" strokeWidth="1.5"></path>
              <path className="text-slate-700" d="M 0 100 L 100 0" fill="none" stroke="currentColor" strokeDasharray="2" strokeWidth="0.5"></path>
              <circle className="text-primary shadow-[0_0_10px_#22C55E]" cx="15" cy="12" fill="currentColor" r="2.5"></circle>
            </svg>
            <div className="absolute bottom-4 left-4 text-[10px] text-slate-600 font-bold">FALSE POSITIVE RATE</div>
            <div className="absolute top-4 left-4 text-[10px] text-slate-600 font-bold origin-top-left -rotate-90 -translate-x-full">TRUE POSITIVE RATE</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPerformance;
