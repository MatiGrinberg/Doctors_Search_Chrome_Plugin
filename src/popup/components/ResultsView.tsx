import React from 'react';
import { AuditLog } from '../../shared/types';

interface Props {
  results: AuditLog;
}

export default function ResultsView({ results }: Props) {
  if (results.societiesFound.length === 0) {
    return (
      <div className="glass-panel p-4 text-center text-slate-500">
        No se encontraron sociedades para esta consulta.
      </div>
    );
  }

  return (
    <div className="glass-panel p-4 space-y-3">
      <h2 className="text-lg font-semibold text-slate-800">Sociedades Encontradas</h2>
      <ul className="space-y-2">
        {results.societiesFound.map((society, index) => (
          <li key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-100 shadow-sm">
            <span className="font-medium block text-blue-900">{society.name}</span>
            {society.officialUrl && (
              <a 
                href={society.officialUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:underline mt-1 inline-block"
              >
                Sitio Oficial
              </a>
            )}
          </li>
        ))}
      </ul>
      
      {results.doctorsIdentified.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-semibold text-slate-800 mb-2">Doctores ({results.doctorsIdentified.length})</h3>
          <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {results.doctorsIdentified.map((doc, idx) => (
              <li key={idx} className="text-sm p-2 bg-white rounded border border-slate-200">
                {doc.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
