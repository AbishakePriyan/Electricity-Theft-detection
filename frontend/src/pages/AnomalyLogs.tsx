import React, { useEffect, useState } from 'react';
import { getLogs } from '../api';

const AnomalyLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    getLogs().then(res => setLogs(res.data));
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <nav className="flex items-center gap-2 text-slate-500 mb-2">
            <span className="font-label-caps text-label-caps uppercase">System</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="font-label-caps text-label-caps uppercase text-green-500">Anomaly Logs</span>
          </nav>
          <h2 className="font-headline-xl text-headline-xl text-on-surface">Detection Logs</h2>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-[#21262D] hover:bg-[#30363D] text-on-surface px-4 py-2 rounded-lg text-sm font-medium transition-all">
            <span className="material-symbols-outlined text-sm">file_download</span>
            Export Report
          </button>
        </div>
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0B0F14] border-b border-[#21262D]">
                <th className="px-6 py-4 font-label-caps text-label-caps uppercase text-slate-500">Customer ID</th>
                <th className="px-6 py-4 font-label-caps text-label-caps uppercase text-slate-500">Risk Score</th>
                <th className="px-6 py-4 font-label-caps text-label-caps uppercase text-slate-500">Status</th>
                <th className="px-6 py-4 font-label-caps text-label-caps uppercase text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262D]">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-[#1C2128] transition-colors group">
                  <td className="px-6 py-4 font-numeric-data text-sm text-primary">{log.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-[#21262D] rounded-full overflow-hidden w-24">
                        <div 
                          className={`h-full rounded-full ${log.risk_score > 80 ? 'bg-red-500' : 'bg-tertiary'}`} 
                          style={{ width: `${log.risk_score}%` }}
                        ></div>
                      </div>
                      <span className="font-numeric-data text-sm text-on-surface">{(log.risk_score / 100).toFixed(3)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                      log.status === 'Urgent' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-tertiary-container/10 text-tertiary border-tertiary-container/20'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-slate-500 hover:text-green-500 transition-colors">
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnomalyLogs;
