import React, { useState } from 'react';
import { Calendar, Download, X, ChevronDown, Info, FileText, FileSpreadsheet } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import clsx from 'clsx';

const metricData = [
  { 
    domain: 'nike.com', 
    color: '#0070F3',
    score: 97, 
    refDomains: '224K', 
    backlinks: '860M', 
    refIps: '123K', 
    visits: '209M', 
    traffic: '166M',
    highest: { score: true, refDomains: true, backlinks: true, refIps: true, visits: true, traffic: true }
  },
  { 
    domain: 'adidas.com', 
    color: '#009F4D',
    score: 80, 
    refDomains: '112K', 
    backlinks: '309M', 
    refIps: '72.4K', 
    visits: '48.1M', 
    traffic: '15.8M',
    highest: { score: false, refDomains: false, backlinks: false, refIps: false, visits: false, traffic: false }
  }
];

const trendData = [
  { name: 'Feb 2023', nikeAuth: 88, adidasAuth: 70, nikeRef: 220000, adidasRef: 105000 },
  { name: 'May 2023', nikeAuth: 89, adidasAuth: 71, nikeRef: 218000, adidasRef: 110000 },
  { name: 'Jul 2023', nikeAuth: 89, adidasAuth: 71, nikeRef: 210000, adidasRef: 108000 },
  { name: 'Sep 2023', nikeAuth: 90, adidasAuth: 73, nikeRef: 195000, adidasRef: 112000 },
  { name: 'Dec 2023', nikeAuth: 92, adidasAuth: 70, nikeRef: 224000, adidasRef: 100000 }
];

const categoriesData = [
  { category: 'Arts & Entertainment', nike: '2.5K', adidas: '2.9K', highest: 'adidas' },
  { category: 'News', nike: '2.3K', adidas: '2.3K', highest: null },
  { category: 'Business & Industrial', nike: '2.2K', adidas: '2.2K', highest: null },
  { category: 'Internet & Telecom', nike: '1.4K', adidas: '1.5K', highest: 'adidas' },
  { category: 'News > Broadcast & Network News', nike: '1.3K', adidas: '1.1K', highest: 'nike' },
];

export default function CompetitorAnalysis() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showChart1Menu, setShowChart1Menu] = useState(false);
  const [showChart2Menu, setShowChart2Menu] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Competitor Analysis</h2>
          <p className="text-gray-500 text-sm">Compare your website with competitors to find opportunities and improve your SEO strategy.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => {
                setShowDatePicker(!showDatePicker);
                setShowExportMenu(false);
              }}
              className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm focus:outline-none"
            >
              <Calendar className="w-4 h-4 text-gray-500" />
              Sep 15, 2026 - Sep 15, 2026
              <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
            </button>
            {showDatePicker && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 shadow-xl rounded-xl p-2 w-64 z-50">
                <div className="font-semibold text-gray-800 mb-2 px-2 pt-2 text-sm">Select Date Range</div>
                <div className="space-y-1">
                  <button onClick={() => setShowDatePicker(false)} className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Last 7 Days</button>
                  <button onClick={() => setShowDatePicker(false)} className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Last 30 Days</button>
                  <button onClick={() => setShowDatePicker(false)} className="w-full text-left px-3 py-2 text-sm text-[#0070F3] bg-blue-50/50 rounded-lg font-medium transition-colors">Sep 15, 2026 - Sep 15, 2026</button>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => {
                setShowExportMenu(!showExportMenu);
                setShowDatePicker(false);
              }}
              className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-[#0070F3] hover:bg-gray-50 transition-colors shadow-sm focus:outline-none"
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
            {showExportMenu && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 shadow-xl rounded-xl w-48 z-50 p-1">
                <button onClick={() => setShowExportMenu(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <FileText className="w-4 h-4 text-red-500" /> Export as PDF
                </button>
                <button onClick={() => setShowExportMenu(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <FileSpreadsheet className="w-4 h-4 text-green-600" /> Export as CSV
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inputs Section */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <label className="block text-sm font-bold text-gray-800 mb-3">Root Domain(s)</label>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 border-2 border-[#0070F3]/30 bg-blue-50/50 pl-2 pr-3 py-1.5 rounded-lg w-64 group relative">
            <span className="text-[10px] font-bold text-[#0070F3] bg-blue-100 px-1.5 py-0.5 rounded">You</span>
            <span className="text-sm font-medium text-gray-800 flex-1">nike.com</span>
            <button className="text-gray-400 hover:text-gray-600 active:scale-95"><X className="w-4 h-4" /></button>
          </div>
          
          <div className="flex items-center gap-2 border border-gray-200 pl-3 pr-3 py-1.5 rounded-lg w-64 group relative">
            <div className="w-2.5 h-2.5 rounded-full bg-[#009F4D]"></div>
            <span className="text-sm font-medium text-gray-800 flex-1">adidas.com</span>
            <button className="text-gray-400 hover:text-gray-600 active:scale-95"><X className="w-4 h-4" /></button>
          </div>

          <div className="flex items-center gap-2 border border-gray-200 border-dashed pl-3 pr-3 py-1.5 rounded-lg w-64 group relative">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
            <input type="text" placeholder="Add competitor" className="text-sm text-gray-500 flex-1 bg-transparent border-none focus:outline-none placeholder:text-gray-400" />
          </div>

          <div className="flex items-center gap-2 border border-gray-200 border-dashed pl-3 pr-3 py-1.5 rounded-lg w-64 group relative hidden lg:flex">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
            <input type="text" placeholder="Add competitor" className="text-sm text-gray-500 flex-1 bg-transparent border-none focus:outline-none placeholder:text-gray-400" />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button className="bg-[#009F4D] hover:bg-[#008f45] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm active:scale-95">
              Compare
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm active:scale-95">
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Main Metrics Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden text-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="font-semibold text-gray-800 py-4 px-5">Domain / URL</th>
                <th className="font-semibold text-gray-800 py-4 px-5 text-center">Authority Score</th>
                <th className="font-semibold text-gray-800 py-4 px-5 text-center">Referring Domains</th>
                <th className="font-semibold text-gray-800 py-4 px-5 text-center">Backlinks</th>
                <th className="font-semibold text-gray-800 py-4 px-5 text-center">Referring IPs</th>
                <th className="font-semibold text-gray-800 py-4 px-5 text-center">Monthly Visits</th>
                <th className="font-semibold text-gray-800 py-4 px-5 text-center">Organic Traffic</th>
              </tr>
            </thead>
            <tbody>
              {metricData.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-none">
                  <td className="py-4 px-5 flex items-center gap-2 font-medium">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: row.color }}></div>
                    {row.domain}
                  </td>
                  <td className={clsx("py-4 px-5 text-center font-medium", row.highest.score ? "bg-[#eefcf4] text-gray-900" : "text-gray-700")}>
                    {row.score}
                  </td>
                  <td className={clsx("py-4 px-5 text-center font-medium text-[#0070F3]", row.highest.refDomains && "bg-[#eefcf4]")}>
                    {row.refDomains}
                  </td>
                  <td className={clsx("py-4 px-5 text-center font-medium text-[#0070F3]", row.highest.backlinks && "bg-[#eefcf4]")}>
                    {row.backlinks}
                  </td>
                  <td className={clsx("py-4 px-5 text-center font-medium text-[#0070F3]", row.highest.refIps && "bg-[#eefcf4]")}>
                    {row.refIps}
                  </td>
                  <td className={clsx("py-4 px-5 text-center font-medium text-[#0070F3]", row.highest.visits && "bg-[#eefcf4]")}>
                    {row.visits}
                  </td>
                  <td className={clsx("py-4 px-5 font-medium text-[#0070F3] relative", row.highest.traffic && "bg-[#eefcf4]")}>
                    <div 
                      className="flex items-center justify-center gap-1 cursor-pointer hover:text-blue-800 group"
                    >
                      {row.traffic}
                      <ChevronDown className="w-3.5 h-3.5 text-[#0070F3]" />
                      
                      {/* Dropdown for traffic */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white border border-gray-200 shadow-xl rounded-lg w-40 z-40 p-1 hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100 font-semibold text-center">Traffic Sources</div>
                        <div className="flex justify-between px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded"><span>Search</span> <span>65%</span></div>
                        <div className="flex justify-between px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded"><span>Direct</span> <span>25%</span></div>
                        <div className="flex justify-between px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded"><span>Referral</span> <span>10%</span></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Authority Score Trend */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
              Authority Score Trend <Info className="w-4 h-4 text-gray-400 cursor-help" />
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowChart1Menu(!showChart1Menu)}
                className="flex items-center gap-1 text-xs text-gray-500 font-medium hover:text-gray-700 border border-gray-200 rounded-md px-2 py-1 focus:outline-none"
              >
                Last 12 months <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {showChart1Menu && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 shadow-lg rounded-lg w-36 z-40 p-1">
                  <button onClick={() => setShowChart1Menu(false)} className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded">Last 6 months</button>
                  <button onClick={() => setShowChart1Menu(false)} className="w-full text-left px-3 py-1.5 text-xs text-gray-900 bg-gray-50 rounded font-medium">Last 12 months</button>
                  <button onClick={() => setShowChart1Menu(false)} className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded">All time</button>
                </div>
              )}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 25, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} domain={[0, 100]} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="nikeAuth" stroke="#0070F3" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="adidasAuth" stroke="#009F4D" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
              <div className="w-3 h-3 rounded-full bg-[#0070F3]"></div> nike.com
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
              <div className="w-3 h-3 rounded-full bg-[#009F4D]"></div> adidas.com
            </div>
          </div>
        </div>

        {/* Referring Domains Trend */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
              Referring Domains Trend <Info className="w-4 h-4 text-gray-400 cursor-help" />
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowChart2Menu(!showChart2Menu)}
                className="flex items-center gap-1 text-xs text-gray-500 font-medium hover:text-gray-700 border border-gray-200 rounded-md px-2 py-1 focus:outline-none"
              >
                Last 12 months <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {showChart2Menu && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 shadow-lg rounded-lg w-36 z-40 p-1">
                  <button onClick={() => setShowChart2Menu(false)} className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded">Last 6 months</button>
                  <button onClick={() => setShowChart2Menu(false)} className="w-full text-left px-3 py-1.5 text-xs text-gray-900 bg-gray-50 rounded font-medium">Last 12 months</button>
                  <button onClick={() => setShowChart2Menu(false)} className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded">All time</button>
                </div>
              )}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 25, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(val) => `${val/1000}K`} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="nikeRef" stroke="#0070F3" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="adidasRef" stroke="#009F4D" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
              <div className="w-3 h-3 rounded-full bg-[#0070F3]"></div> nike.com
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
              <div className="w-3 h-3 rounded-full bg-[#009F4D]"></div> adidas.com
            </div>
          </div>
        </div>
      </div>

      {/* Stacked Bars Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Backlink Types */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-4">
            Backlink Types <Info className="w-4 h-4 text-gray-400 cursor-help" />
          </div>
          <div className="flex items-center gap-5 mb-6 text-xs font-medium text-gray-600">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#0070F3]"></div> Text</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div> Image</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#93c5fd]"></div> Form</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#bfdbfe]"></div> Frame</div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 text-xs font-medium text-gray-700">nike.com</div>
              <div className="flex-1 h-6 rounded-r flex overflow-hidden">
                <div className="bg-[#0070F3] hover:opacity-80 cursor-pointer" style={{ width: '80%' }}></div>
                <div className="bg-[#3b82f6] hover:opacity-80 cursor-pointer" style={{ width: '15%' }}></div>
                <div className="bg-[#93c5fd] hover:opacity-80 cursor-pointer" style={{ width: '3%' }}></div>
                <div className="bg-[#bfdbfe] hover:opacity-80 cursor-pointer" style={{ width: '2%' }}></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 text-xs font-medium text-gray-700">adidas.com</div>
              <div className="flex-1 h-6 rounded-r flex overflow-hidden">
                <div className="bg-[#0070F3] hover:opacity-80 cursor-pointer" style={{ width: '70%' }}></div>
                <div className="bg-[#3b82f6] hover:opacity-80 cursor-pointer" style={{ width: '25%' }}></div>
                <div className="bg-[#93c5fd] hover:opacity-80 cursor-pointer" style={{ width: '3%' }}></div>
                <div className="bg-[#bfdbfe] hover:opacity-80 cursor-pointer" style={{ width: '2%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Link Attributes */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-4">
            Link Attributes <Info className="w-4 h-4 text-gray-400 cursor-help" />
          </div>
          <div className="flex items-center gap-5 mb-6 text-xs font-medium text-gray-600">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div> Follow</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#c4b5fd]"></div> Nofollow + Sponsored + UGC</div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 text-xs font-medium text-gray-700">nike.com</div>
              <div className="flex-1 h-6 rounded-r flex overflow-hidden">
                <div className="bg-[#8b5cf6] hover:opacity-80 cursor-pointer" style={{ width: '90%' }}></div>
                <div className="bg-[#c4b5fd] hover:opacity-80 cursor-pointer" style={{ width: '10%' }}></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 text-xs font-medium text-gray-700">adidas.com</div>
              <div className="flex-1 h-6 rounded-r flex overflow-hidden">
                <div className="bg-[#8b5cf6] hover:opacity-80 cursor-pointer" style={{ width: '85%' }}></div>
                <div className="bg-[#c4b5fd] hover:opacity-80 cursor-pointer" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-5">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-4">
          Top Categories of Referring Domains <Info className="w-4 h-4 text-gray-400 cursor-help" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-600">
                <th className="font-normal py-3 px-2 w-1/2">Categories</th>
                <th className="font-normal py-3 px-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0070F3]"></div>
                    nike.com
                  </div>
                </th>
                <th className="font-normal py-3 px-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#009F4D]"></div>
                    adidas.com
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {categoriesData.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-none">
                  <td className="py-3 px-2 text-gray-700">{row.category}</td>
                  <td className={clsx("py-3 px-2 text-center text-[#0070F3] font-medium", row.highest === 'nike' && "bg-[#eefcf4]")}>
                    {row.nike}
                  </td>
                  <td className={clsx("py-3 px-2 text-center text-[#0070F3] font-medium", row.highest === 'adidas' && "bg-[#eefcf4]")}>
                    {row.adidas}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
