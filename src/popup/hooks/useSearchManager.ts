import { useState } from 'react';
import { SurgeryQuery, AuditLog, ExtMessage, ExtResponse } from '../../shared/types';

export function useSearchManager() {
  const [results, setResults] = useState<AuditLog | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startSearch = async (query: SurgeryQuery) => {
    setLoading(true);
    setError(null);
    setResults(null);
    
    try {
      const message: ExtMessage = { action: 'START_SEARCH', payload: query };
      
      const response = await chrome.runtime.sendMessage(message) as ExtResponse;
      
      if (response.status === 'SUCCESS') {
        setResults(response.data);
      } else {
        // Manejo de errores de API (ej. 401)
        const errorMsg = response.code === '401' 
          ? 'Error de autenticación (401). Revisa tu API Key de IA.' 
          : response.error;
        setError(`Error: ${errorMsg}`);
      }
    } catch (err: any) {
      setError(err.message || 'Error de comunicación con el Service Worker. ¿Está la extensión recargada?');
    } finally {
      setLoading(false);
    }
  };

  return { startSearch, results, loading, error };
}
