export type AIProviderName = 'openai' | 'gemini' | 'deepseek';

export type AIMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type GenerateRequest = {
  messages: AIMessage[];
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
};

export type GenerateResult = {
  provider: AIProviderName;
  model: string;
  text: string;
  inputTokens?: number;
  outputTokens?: number;
  raw?: unknown;
};

export interface AIProvider {
  name: AIProviderName;
  generate(request: GenerateRequest): Promise<GenerateResult>;
}
