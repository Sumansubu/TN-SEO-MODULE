import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CompetitorAnalysis from './components/CompetitorAnalysis';

function App() {
  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <CompetitorAnalysis />
        </main>
      </div>
    </div>
  );
}

export default App;
