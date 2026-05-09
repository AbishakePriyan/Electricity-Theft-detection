import { useEffect, useState } from 'react';
import { getStats, getConsumers } from '../api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [consumers, setConsumers] = useState<any[]>([]);

  useEffect(() => {
    getStats().then(res => setStats(res.data));
    getConsumers().then(res => setConsumers(res.data.slice(0, 6)));
  }, []);

  const lineData = [
    { name: 'Jan 01', normal: 80, anomalous: 150 },
    { name: 'Jan 08', normal: 75, anomalous: 160 },
    { name: 'Jan 15', normal: 82, anomalous: 140 },
    { name: 'Jan 22', normal: 70, anomalous: 180 },
    { name: 'Jan 30', normal: 85, anomalous: 130 },
  ];

  const pieData = stats ? [
    { name: 'Normal', value: stats.normal, color: '#4be277' },
    { name: 'Moderate', value: stats.moderate, color: '#ffba61' },
    { name: 'Theft', value: stats.theft, color: '#ffb4ab' },
  ] : [];

  const barData = [
    { range: '0-10', count: 85 },
    { range: '20-30', count: 70 },
    { range: '40-50', count: 50 },
    { range: '60-70', count: 40 },
    { range: '80-90', count: 60 },
    { range: '90-100', count: 80 },
  ];

  if (!stats) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-grid-gutter">
        <div className="glass-card p-4 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-caps text-label-caps text-slate-400 uppercase">Total Consumers</span>
            <span className="material-symbols-outlined text-green-500/50">group</span>
          </div>
          <div className="font-numeric-data text-[28px] text-on-background">{stats.total.toLocaleString()}</div>
          <div className="text-[12px] text-slate-500 mt-1">Live monitoring active</div>
        </div>
        <div className="glass-card p-4 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-caps text-label-caps text-slate-400 uppercase">Normal Users</span>
            <span className="material-symbols-outlined text-green-500/50">check_circle</span>
          </div>
          <div className="font-numeric-data text-[28px] text-on-background">{stats.normal.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-[12px] text-green-500 mt-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span>2.1%</span>
            <span className="text-slate-500">vs last month</span>
          </div>
        </div>
        <div className="glass-card p-4 rounded-lg border-t-2 border-t-error">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-caps text-label-caps text-slate-400 uppercase">Theft Detected</span>
            <span className="material-symbols-outlined text-error/50">warning</span>
          </div>
          <div className="font-numeric-data text-[28px] text-error">{stats.theft.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-[12px] text-error mt-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span>0.8%</span>
            <span className="text-slate-500">urgent cases</span>
          </div>
        </div>
        <div className="glass-card p-4 rounded-lg border-t-2 border-t-tertiary">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-caps text-label-caps text-slate-400 uppercase">Moderate Risk</span>
            <span className="material-symbols-outlined text-tertiary/50">priority_high</span>
          </div>
          <div className="font-numeric-data text-[28px] text-tertiary">{stats.moderate.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-[12px] text-green-500 mt-1">
            <span className="material-symbols-outlined text-[14px]">trending_down</span>
            <span>1.2%</span>
            <span className="text-slate-500">being mitigated</span>
          </div>
        </div>
        <div className="glass-card p-4 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-caps text-label-caps text-slate-400 uppercase">Avg Risk Score</span>
            <span className="material-symbols-outlined text-blue-500/50">speed</span>
          </div>
          <div className="font-numeric-data text-[28px] text-on-background">{stats.avg_risk}<span className="text-lg text-slate-500">/100</span></div>
          <div className="w-full bg-[#0B0F14] h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${stats.avg_risk}%` }}></div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-12 gap-grid-gutter">
        <div className="col-span-12 lg:col-span-8 glass-card p-6 rounded-lg">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-background">Average Daily Consumption Trend</h2>
              <p className="text-sm text-slate-400">Normal vs Anomalous pattern monitoring (Jan 01-30)</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-xs text-slate-400">Normal</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-error"></span>
                <span className="text-xs text-slate-400">Anomalous</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full recessed rounded p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#21262D" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161B22', border: '1px solid #21262D' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="normal" stroke="#22c55e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="anomalous" stroke="#ffb4ab" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 glass-card p-6 rounded-lg flex flex-col">
          <h2 className="font-headline-md text-headline-md text-on-background mb-1">Risk Distribution</h2>
          <p className="text-sm text-slate-400 mb-8">Breakdown by anomaly severity</p>
          <div className="flex-grow flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-3">
            {pieData.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <span className="font-numeric-data">{((item.value / stats.total) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-12 gap-grid-gutter">
        <div className="col-span-12 lg:col-span-4 glass-card p-6 rounded-lg">
          <h2 className="font-headline-md text-headline-md text-on-background mb-1">Risk Score Distribution</h2>
          <p className="text-sm text-slate-400 mb-8">Bucketed consumer risk ratings</p>
          <div className="h-[300px] recessed p-4 rounded">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#21262D" vertical={false} />
                <XAxis dataKey="range" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#161B22', border: '1px solid #21262D' }} />
                <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.count > 70 ? '#ffb4ab' : (entry.count > 50 ? '#ffba61' : '#4be277')} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 glass-card rounded-lg overflow-hidden flex flex-col">
          <div className="p-6 flex justify-between items-center">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-background">Recent Anomaly Detections</h2>
              <p className="text-sm text-slate-400">Latest flagged consumers requiring verification</p>
            </div>
            <button className="px-4 py-2 bg-[#21262D] hover:bg-[#30363D] text-xs font-bold rounded transition-colors text-slate-300 uppercase tracking-widest">View All Logs</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#0B0F14] border-y border-[#21262D]">
                <tr>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Consumer ID</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Risk Score</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#21262D]">
                {consumers.map((c) => (
                  <tr key={c.id} className="hover:bg-[#1C2128] transition-colors">
                    <td className="px-6 py-4 font-numeric-data text-sm">{c.id}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.risk_score > 80 ? 'bg-error/15 text-error' : (c.risk_score > 40 ? 'bg-tertiary/15 text-tertiary' : 'bg-primary/15 text-primary')
                      }`}>
                        {c.risk_score.toFixed(1)}/100
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-[10px] font-bold uppercase ${
                      c.status === 'Urgent' ? 'text-error' : (c.status === 'Pending' ? 'text-tertiary' : 'text-primary')
                    }`}>
                      {c.status}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-green-500 hover:text-green-400">
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
    </div>
  );
};

export default Dashboard;
