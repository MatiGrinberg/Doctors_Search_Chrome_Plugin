import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import ResultsView from './components/ResultsView';
import DebugPanel from './components/DebugPanel';
import { useSearchManager } from './hooks/useSearchManager';

function App() {
  const { startSearch, results, loading, error } = useSearchManager();

  return (
    <div className="flex flex-col h-full p-4 space-y-4 text-slate-800">
      <header className="text-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Medical Society AI
        </h1>
        <p className="text-sm text-slate-500">Explorer & Crawler</p>
      </header>

      <main className="flex-1 space-y-4">
        <SearchForm onSearch={startSearch} isLoading={loading} />
        
        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {results && !loading && (
          <ResultsView results={results} />
        )}
      </main>

      {results && !loading && (
        <footer className="pt-4 border-t border-slate-200">
          <DebugPanel auditLog={results} />
        </footer>
      )}
    </div>
  );
}

export default App;
