export interface AIProvider {
  generateIdeas(input: {
    topic: string;
    platform?: string;
    language?: string;
    count?: number;
  }): Promise<unknown>;
  generateScript(input: { idea: string; durationSeconds?: number }): Promise<unknown>;
}

export function getAIProvider(): AIProvider {
  throw new Error("Aucun fournisseur IA configuré. Implémenter l'adaptateur serveur.");
}
