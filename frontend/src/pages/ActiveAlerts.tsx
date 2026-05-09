import React, { useEffect, useState } from 'react';
import { getAlerts } from '../api';

const ActiveAlerts = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);

  useEffect(() => {
    getAlerts().then(res => {
      setAlerts(res.data);
      if (res.data.length > 0) setSelectedAlert(res.data[0]);
    });
  }, []);

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col bg-surface-dim -m-6">
      {/* Alert Summary Strip */}
      <div className="px-6 py-4 flex gap-4 overflow-x-auto custom-scrollbar bg-surface-container-low border-b border-[#21262D]">
        {[
          { label: 'Critical', val: 12, color: 'border-red-500', icon: 'error', iconColor: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'Warning', val: 48, color: 'border-orange-500', icon: 'warning', iconColor: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Resolved', val: 156, color: 'border-green-500', icon: 'check_circle', iconColor: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'System Health', val: '99.4%', color: 'border-secondary', icon: 'monitoring', iconColor: 'text-secondary', bg: 'bg-secondary/10' },
        ].map(s => (
          <div key={s.label} className={`flex-1 min-w-[200px] glass-card rounded-lg p-4 flex items-center gap-4 border-l-4 ${s.color}`}>
            <div className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center ${s.iconColor}`}>
              <span className="material-symbols-outlined">{s.icon}</span>
            </div>
            <div>
              <p className="text-xs font-label-caps text-slate-400 uppercase">{s.label}</p>
              <p className="text-2xl font-numeric-data text-on-surface">{s.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <section className="w-1/3 min-w-[380px] border-r border-[#21262D] flex flex-col">
          <div className="p-4 border-b border-[#21262D] flex justify-between items-center bg-[#0B0F14]">
            <h2 className="font-headline-md text-on-surface">Live Alert Feed</h2>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
            {alerts.map(a => (
              <div 
                key={a.id}
                onClick={() => setSelectedAlert(a)}
                className={`glass-card rounded-lg p-4 border-l-4 transition-all cursor-pointer ${
                  a.risk_score > 80 ? 'border-red-500' : 'border-orange-500'
                } ${selectedAlert?.id === a.id ? 'ring-1 ring-primary/20 bg-[#1C2128]' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${a.risk_score > 80 ? 'bg-red-500 pulse-red' : 'bg-orange-500'}`}></span>
                    <span className={`text-xs font-bold uppercase tracking-widest ${a.risk_score > 80 ? 'text-red-500' : 'text-orange-500'}`}>
                      {a.risk_score > 80 ? 'Theft Pattern' : 'Anomaly Warning'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-numeric-data">Active</span>
                </div>
                <h3 className="text-sm font-bold text-on-surface">{a.id} — Zone B</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">Reconstruction error: {a.risk_score.toFixed(3)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Right Panel */}
        <section className="flex-1 bg-[#0B0F14] overflow-y-auto custom-scrollbar p-8">
          {selectedAlert && (
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-red-500/20 text-red-500 text-xs font-bold rounded">CASE #{selectedAlert.id}</span>
                  </div>
                  <h2 className="text-4xl font-headline-xl text-on-surface">Commercial Sector B - Site Alpha</h2>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-2.5 bg-primary-container text-on-primary-container rounded font-bold text-sm hover:opacity-90 shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all">
                    START INVESTIGATION
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-8 glass-card rounded-xl p-6">
                   <h3 className="font-headline-md text-on-surface mb-6">Detection Details</h3>
                   <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                      <p className="text-sm text-red-400">
                        Significant divergence from historical pattern detected. Reconstruction error spiked to {(selectedAlert.risk_score / 100).toFixed(4)}. 
                        Probability of theft: {selectedAlert.risk_score.toFixed(1)}%.
                      </p>
                   </div>
                </div>
                <div className="col-span-12 lg:col-span-4 space-y-4">
                  <div className="glass-card rounded-xl p-5">
                    <p className="text-xs font-label-caps text-slate-400 uppercase">Risk Level</p>
                    <p className="text-3xl font-numeric-data text-red-500">{selectedAlert.risk_score.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ActiveAlerts;
