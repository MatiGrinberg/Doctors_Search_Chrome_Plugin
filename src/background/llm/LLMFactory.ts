import { LLMProvider } from '../../shared/types';
import { OpenAIProvider } from './providers/OpenAIProvider';
import { GeminiProvider } from './providers/GeminiProvider';

export class LLMFactory {
  static create(providerName: string, apiKey: string): LLMProvider {
    switch (providerName.toLowerCase()) {
      case 'openai':
        return new OpenAIProvider(apiKey);
      case 'gemini':
        return new GeminiProvider(apiKey);
      default:
        throw new Error(`Proveedor LLM no soportado: ${providerName}`);
    }
  }
}
