import { LLMProvider, SurgeryQuery, MedicalSociety } from '../../../shared/types';

export class GeminiProvider implements LLMProvider {
  name = 'Gemini';
  private apiKey: string;
  private endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async identifySocieties(query: SurgeryQuery): Promise<MedicalSociety[]> {
    const prompt = `Dado el país ${query.country.name} y el tipo de cirugía ${query.surgeryType}, devuelve exclusivamente un listado en formato JSON (sin markdown, solo el array JSON puro) con los nombres exactos de las sociedades médicas oficiales que regulan o se especializan en este procedimiento en dicho territorio. Cada objeto del array debe tener las propiedades "name" y opcionalmente "officialUrl".`;

    const response = await fetch(`${this.endpoint}?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      throw new Error(`[${response.status}] Error en la API de Gemini: ${response.statusText}`);
    }

    const data = await response.json();
    try {
      const text = data.candidates[0].content.parts[0].text;
      return JSON.parse(text);
    } catch (e) {
      throw new Error('No se pudo parsear la respuesta JSON de Gemini.');
    }
  }
}
