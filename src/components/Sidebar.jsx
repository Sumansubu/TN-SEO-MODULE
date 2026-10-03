import React from 'react';
import { 
  MonitorPlay, 
  Search, 
  Settings, 
  FileText, 
  FileCheck2, 
  Link2, 
  Users,
  Sparkles,
  BarChart3,
  ChevronRight,
  Crown
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { icon: MonitorPlay, label: 'Website Audit', active: false },
  { icon: Search, label: 'Keyword Research', active: false },
  { icon: Settings, label: 'Technical SEO', active: false },
  { icon: FileText, label: 'Content / AI Writer', active: false },
  { icon: FileCheck2, label: 'On-Page SEO', active: false },
  { icon: Link2, label: 'Backlink Analysis', active: false },
  { icon: Users, label: 'Competitor Analysis', active: true },
  { icon: Sparkles, label: 'AI Recommendations', active: false },
  { icon: BarChart3, label: 'Reports', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#0A2518] text-white flex flex-col h-full shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-brand-green p-1.5 rounded-lg flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight tracking-tight">TN SEO</h1>
          <p className="text-xs text-gray-300 font-medium tracking-widest">MODULE</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href="#"
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                item.active 
                  ? "bg-[#009F4D] text-white" 
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className={clsx("w-5 h-5", item.active ? "text-white" : "text-gray-400")} />
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-[#0f3422] rounded-xl p-4 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <Crown className="w-16 h-16" />
          </div>
          <div className="flex items-center gap-2 mb-2 relative z-10">
            <Crown className="w-5 h-5 text-yellow-500" />
            <h3 className="font-bold text-sm">Upgrade to Pro</h3>
          </div>
          <p className="text-xs text-gray-400 mb-4 relative z-10 leading-relaxed">
            Get deeper insights and unlimited competitor analysis.
          </p>
          <button className="w-full bg-[#009F4D] hover:bg-[#008f45] text-white text-sm font-medium py-2 rounded-lg transition-colors flex justify-center items-center gap-2 relative z-10">
            Upgrade Now <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4 border-t border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#009F4D] flex items-center justify-center font-bold text-sm">
            U
          </div>
          <div>
            <div className="text-sm font-bold">Utsav Kishore</div>
            <div className="text-xs text-gray-400">Free Plan</div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </aside>
  );
}
