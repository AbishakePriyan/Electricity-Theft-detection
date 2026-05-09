import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideNavBar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: 'dashboard', label: 'DSH' },
    { path: '/analysis', icon: 'person_search', label: 'CON' },
    { path: '/model', icon: 'model_training', label: 'MOD' },
    { path: '/alerts', icon: 'notification_important', label: 'ALR' },
    { path: '/logs', icon: 'assignment_late', label: 'LOG' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[72px] z-50 bg-[#0B0F14] border-r border-[#21262D] flex flex-col items-center py-6">
      <div className="mb-10">
        <div className="w-10 h-10 bg-primary-container rounded flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
        </div>
      </div>
      <nav className="flex flex-col items-center gap-4 w-full">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center py-4 gap-1 w-full transition-all group hover:text-green-400 hover:bg-[#161B22] ${
                isActive ? 'text-green-500' : 'text-slate-500'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 w-1 h-8 bg-green-500 rounded-r-full shadow-[0_0_10px_#22C55E]" />
              )}
              <span 
                className={`material-symbols-outlined scale-110 duration-200 ${isActive ? 'fill-1' : ''}`}
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className="font-inter text-[10px] uppercase font-bold tracking-widest">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto flex flex-col items-center gap-4 w-full">
        <button className="text-slate-500 flex flex-col items-center py-4 gap-1 w-full hover:text-green-400 hover:bg-[#161B22] transition-all">
          <span className="material-symbols-outlined">help</span>
        </button>
        <button className="text-slate-500 flex flex-col items-center py-4 gap-1 w-full hover:text-green-400 hover:bg-[#161B22] transition-all">
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>
    </aside>
  );
};

const TopNavBar = () => {
  return (
    <header className="fixed top-0 right-0 left-[72px] h-16 z-40 bg-[#161B22]/90 backdrop-blur-md border-b border-[#21262D] flex justify-between items-center px-6">
      <div className="flex items-center gap-8">
        <h1 className="text-lg font-black tracking-tighter text-green-500">Electricity Theft Detection</h1>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">search</span>
          <input
            className="bg-[#0B0F14] border border-[#21262D] rounded px-10 py-1.5 text-sm w-80 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 text-on-surface"
            placeholder="Search consumers or anomalies..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:bg-[#21262D] hover:text-green-400 transition-colors rounded">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-2 text-slate-400 hover:bg-[#21262D] hover:text-green-400 transition-colors rounded">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="h-8 w-8 rounded-full border border-[#21262D] overflow-hidden">
          <img
            alt="Analyst Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2wl_-2rgllS5intxGIVU6Klf8Z2D2cDMnKiyNkw160aUvf-rjfJgpa5CxrXnVJUfavmCSIdzK1LFEJC8FpOn6EX7zIzZfXR36RGG1qRCN7j6aOjsf5zLvCxt4Bs0ijCEn-_fLN2LDUJW3YZMkRG-woJdqJkXfgCUNfiiY7nm6G78pgBrmKy_W1sHWLxCDZYC2yF5qJ8_1v1gR_hc7xrXowtaTqWTpbW_otfGq27Nl6ksWOPyvAiM9wmw_HptnJE3dCBEVEB6EJuAQ"
          />
        </div>
      </div>
    </header>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <SideNavBar />
      <TopNavBar />
      <main className="ml-[72px] pt-16 p-6 min-h-screen bg-[#0B0F14]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
