import { useEffect, useState } from 'react';
import { getConsumers, getConsumerDetail } from '../api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ConsumerAnalysis = () => {
  const [selectedId, setSelectedId] = useState<string>('C_4821093');
  const [consumers, setConsumers] = useState<any[]>([]);
  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    getConsumers().then(res => {
      setConsumers(res.data.slice(0, 10));
      if (res.data.length > 0) {
        setSelectedId(res.data[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedId) {
      getConsumerDetail(selectedId).then(res => setDetail(res.data));
    }
  }, [selectedId]);

  const chartData = detail?.series?.map((val: number, i: number) => ({
    day: i + 1,
    consumption: val,
    prediction: val * (0.9 + Math.random() * 0.2) // Simulated prediction
  })) || [];

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface">Consumer Analysis</h1>
          <p className="text-slate-500 font-body-md mt-1">Detailed forensic analysis of electrical consumption and theft risk vectors.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#21262D] text-on-surface rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-[#30363D] transition-colors border border-transparent hover:border-[#3d4a3d]">
            <span className="material-symbols-outlined text-sm">download</span> Export Report
          </button>
          <button className="px-4 py-2 bg-primary text-on-primary rounded-lg font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-sm">security</span> Initiate Audit
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-5">
        {/* Profile Card */}
        <div className="col-span-12 lg:col-span-4 glass-card p-6 rounded-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-error/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1">Consumer ID</p>
                <h2 className="text-2xl font-black font-numeric-data text-on-surface">{selectedId}</h2>
              </div>
              <span className={`px-3 py-1 bg-error/15 text-error text-[10px] font-black tracking-widest uppercase rounded border border-error/20 ${detail?.risk_score > 80 ? '' : 'hidden'}`}>
                High Risk
              </span>
            </div>
            <div className="grid grid-cols-2 gap-y-6 mb-8">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1">Region</p>
                <p className="font-bold text-on-surface">East District</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1">Meter Type</p>
                <p className="font-bold text-on-surface flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-green-500">bolt</span>
                  Smart Meter Gen 3
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1">Risk Status</p>
                <p className={`font-bold ${detail?.risk_score > 80 ? 'text-error' : 'text-primary'}`}>
                  {detail?.status}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1">Label</p>
                <p className="font-bold text-on-surface">{detail?.actual_label === 1 ? 'Fraudulent' : 'Normal'}</p>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-[#21262D]">
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2">Aggregated Risk Score</p>
            <div className="flex items-end gap-3">
              <span className={`text-5xl font-black font-numeric-data ${detail?.risk_score > 80 ? 'text-error' : 'text-primary'}`}>
                {detail?.risk_score.toFixed(1)}
              </span>
              <div className="flex-grow h-2 bg-[#21262D] rounded-full mb-3 relative overflow-hidden">
                <div 
                  className={`absolute inset-y-0 left-0 ${detail?.risk_score > 80 ? 'bg-error shadow-[0_0_10px_#ffb4ab]' : 'bg-primary shadow-[0_0_10px_#4be277]'}`} 
                  style={{ width: `${detail?.risk_score}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Line Chart */}
        <div className="col-span-12 lg:col-span-8 glass-card p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Consumption vs Model Reconstruction</h3>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">Forensic Analysis (kWh)</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_#4be277]"></div>
                <span className="text-[10px] font-bold text-slate-400">ACTUAL</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary shadow-[0_0_8px_#89ceff]"></div>
                <span className="text-[10px] font-bold text-slate-400">PREDICTION</span>
              </div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#21262D" vertical={false} />
                <XAxis dataKey="day" hide />
                <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161B22', border: '1px solid #21262D' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="consumption" stroke="#4be277" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="prediction" stroke="#89ceff" strokeWidth={2} dot={false} opacity={0.6} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* List of Consumers for Selection */}
        <div className="col-span-12 glass-card rounded-xl overflow-hidden">
          <div className="p-4 border-b border-[#21262D] bg-[#0B0F14]">
            <h3 className="font-label-caps text-label-caps uppercase text-slate-500">Select Consumer for Analysis</h3>
          </div>
          <div className="flex overflow-x-auto p-4 gap-4 custom-scrollbar">
            {consumers.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`flex-shrink-0 p-4 rounded-lg border transition-all ${
                  selectedId === c.id 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-[#21262D] bg-[#161B22] text-slate-400 hover:border-slate-500'
                }`}
              >
                <p className="text-xs font-numeric-data">{c.id}</p>
                <p className="text-[10px] font-bold">{c.risk_score.toFixed(1)}% Risk</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerAnalysis;
