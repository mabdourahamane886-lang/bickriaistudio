export interface SocialProvider {
  authorize(): Promise<string>;
  publish(input: {
    title: string;
    description?: string;
    videoUrl: string;
  }): Promise<{ externalId: string }>;
}
