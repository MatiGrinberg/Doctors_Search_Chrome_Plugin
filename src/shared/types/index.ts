export interface Country {
  code: string;
  name: string;
}

export interface SurgeryQuery {
  country: Country;
  surgeryType: string;
}

export interface MedicalSociety {
  name: string;
  officialUrl?: string;
}

export interface Doctor {
  name: string;
  profileUrl?: string;
  sourceUrl: string;
}

export interface AuditLog {
  timestamp: string;
  query: SurgeryQuery;
  llmProviderUsed: string;
  societiesFound: MedicalSociety[];
  sourcesCrawled: string[];
  doctorsIdentified: Doctor[];
  errors: string[];
}

export interface LLMProvider {
  name: string;
  identifySocieties(query: SurgeryQuery): Promise<MedicalSociety[]>;
}

export type ExtMessage = 
  | { action: 'START_SEARCH'; payload: SurgeryQuery };

export type ExtResponse = 
  | { status: 'SUCCESS'; data: AuditLog }
  | { status: 'ERROR'; error: string; code?: string };
