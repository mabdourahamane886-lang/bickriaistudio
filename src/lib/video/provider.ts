export interface VideoProvider {
  createRender(input: {
    scenes: Array<{ narration?: string; visualPrompt?: string; durationSeconds?: number }>;
    format: "9:16" | "16:9" | "1:1";
  }): Promise<{ id: string; status: string }>;
}

export function getVideoProvider(): VideoProvider {
  throw new Error("Aucun fournisseur vidéo configuré.");
}
