import React, { useState } from 'react';
import { SurgeryQuery } from '../../shared/types';

interface Props {
  onSearch: (query: SurgeryQuery) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: Props) {
  const [countryCode, setCountryCode] = useState('ES');
  const [surgeryType, setSurgeryType] = useState('');

  const countries = [
    { code: 'ES', name: 'España' },
    { code: 'MX', name: 'México' },
    { code: 'AR', name: 'Argentina' },
    { code: 'CO', name: 'Colombia' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!surgeryType.trim()) return;
    
    const country = countries.find(c => c.code === countryCode)!;
    onSearch({ country, surgeryType });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">País</label>
        <select 
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          disabled={isLoading}
          className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border bg-white"
        >
          {countries.map(c => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Cirugía</label>
        <input 
          type="text" 
          value={surgeryType}
          onChange={(e) => setSurgeryType(e.target.value)}
          disabled={isLoading}
          placeholder="Ej. Rinoplastia, Cirugía Maxilofacial"
          className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        />
      </div>

      <button 
        type="submit" 
        disabled={isLoading || !surgeryType.trim()}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 font-medium"
      >
        {isLoading ? 'Buscando...' : 'Buscar Sociedades'}
      </button>
    </form>
  );
}
