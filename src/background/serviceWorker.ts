import { ExtMessage, ExtResponse } from '../shared/types';
import { LLMFactory } from './llm/LLMFactory';

const ACTIVE_PROVIDER = import.meta.env.VITE_LLM_PROVIDER || 'gemini';
const API_KEY = import.meta.env.VITE_LLM_API_KEY;

chrome.runtime.onMessage.addListener((
  message: ExtMessage, 
  sender, 
  sendResponse: (response: ExtResponse) => void
) => {
  if (message.action === 'START_SEARCH') {
    handleSearch(message.payload).then(response => {
      sendResponse(response);
    }).catch(err => {
      // Intentamos extraer código de error si existe (ej. 401)
      const codeMatch = err.message.match(/\[(\d{3})\]/);
      const code = codeMatch ? codeMatch[1] : undefined;
      sendResponse({ status: 'ERROR', error: err.message, code });
    });
    return true; // Asíncrono
  }
});

async function handleSearch(query: any): Promise<ExtResponse> {
  if (!API_KEY) {
    throw new Error('API Key no configurada. Revisa tus variables de entorno.');
  }

  const llm = LLMFactory.create(ACTIVE_PROVIDER, API_KEY);
  
  // 1. Identificar sociedades médicas
  const societies = await llm.identifySocieties(query);

  // 2. Aquí iría la inyección del Content Script para crawling. 
  // Por ahora lo simulamos.
  const sourcesCrawled = societies.map(s => s.officialUrl).filter(Boolean) as string[];
  const mockDoctors = societies.length > 0 ? [
    { name: 'Dr. Ejemplo Uno', sourceUrl: societies[0].officialUrl || 'N/A' },
    { name: 'Dra. Ejemplo Dos', sourceUrl: societies[0].officialUrl || 'N/A' }
  ] : [];

  const auditLog = {
    timestamp: new Date().toISOString(),
    query,
    llmProviderUsed: ACTIVE_PROVIDER,
    societiesFound: societies,
    sourcesCrawled,
    doctorsIdentified: mockDoctors,
    errors: []
  };

  return { status: 'SUCCESS', data: auditLog };
}
