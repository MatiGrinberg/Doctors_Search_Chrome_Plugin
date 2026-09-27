import { LLMProvider, SurgeryQuery, MedicalSociety } from '../../../shared/types';

export class OpenAIProvider implements LLMProvider {
  name = 'OpenAI';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async identifySocieties(query: SurgeryQuery): Promise<MedicalSociety[]> {
    const prompt = `Dado el país ${query.country.name} y el tipo de cirugía ${query.surgeryType}, devuelve exclusivamente un listado en formato JSON con los nombres exactos de las sociedades médicas oficiales que regulan o se especializan en este procedimiento en dicho territorio. Propiedades del objeto: "name" y "officialUrl".`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      throw new Error(`[${response.status}] Error en la API de OpenAI: ${response.statusText}`);
    }

    const data = await response.json();
    try {
      const parsed = JSON.parse(data.choices[0].message.content);
      // Asumiendo que la IA devuelve { "societies": [...] } o un array
      return Array.isArray(parsed) ? parsed : (parsed.societies || []);
    } catch (e) {
      throw new Error('No se pudo parsear la respuesta JSON de OpenAI.');
    }
  }
}
