import React, { useState } from 'react';
import { Search, ArrowRight, Bell, Settings, LogOut, User } from 'lucide-react';

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 z-40 relative">
      <div className="flex-1 max-w-2xl relative flex items-center gap-2">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Enter your domain to compare (e.g. nike.com)" 
            className="w-full pl-4 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
          />
        </div>
        <button className="bg-[#009F4D] hover:bg-[#008f45] text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap active:scale-95">
          Compare Competitors <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:bg-gray-50 rounded-full"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 shadow-xl rounded-xl w-80 z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <span className="font-bold text-sm text-gray-800">Notifications</span>
                <span className="text-xs text-[#0070F3] cursor-pointer hover:underline">Mark all as read</span>
              </div>
              <div className="p-2 max-h-64 overflow-y-auto">
                <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="text-sm font-medium text-gray-800">Weekly report ready</div>
                  <div className="text-xs text-gray-500 mt-1">Your competitor analysis report is ready to download.</div>
                  <div className="text-[10px] text-gray-400 mt-1">2 hours ago</div>
                </div>
                <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="text-sm font-medium text-gray-800">New competitor detected</div>
                  <div className="text-xs text-gray-500 mt-1">We found a new rising competitor in your niche.</div>
                  <div className="text-[10px] text-gray-400 mt-1">1 day ago</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <div 
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 pr-3 rounded-xl transition-colors select-none"
          >
            <div className="w-9 h-9 rounded-full bg-[#0A2518] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              U
            </div>
            <div className="text-sm">
              <div className="text-gray-500 text-xs">Good Evening,</div>
              <div className="font-bold flex items-center gap-1 leading-tight text-gray-800">
                Utsav <span role="img" aria-label="wave">👋</span>
              </div>
            </div>
          </div>
          
          {showUserMenu && (
            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 shadow-xl rounded-xl w-56 z-50 overflow-hidden py-1">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="font-bold text-sm text-gray-900">Utsav Kishore</div>
                <div className="text-xs text-gray-500">utsav@example.com</div>
              </div>
              <div className="p-1">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-left">
                  <User className="w-4 h-4 text-gray-400" /> My Profile
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-left">
                  <Settings className="w-4 h-4 text-gray-400" /> Account Settings
                </button>
              </div>
              <div className="p-1 border-t border-gray-100">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors text-left">
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
