import 'server-only';
import { DeepSeekProvider } from './deepseek';
import { GeminiProvider } from './gemini';
import { OpenAIProvider } from './openai';
import type { AIProvider, AIProviderName, GenerateRequest } from './types';

const providers: Record<AIProviderName, AIProvider> = {
  openai: new OpenAIProvider(),
  gemini: new GeminiProvider(),
  deepseek: new DeepSeekProvider(),
};

export function getAIProvider(name: AIProviderName) {
  return providers[name];
}

export async function generateWithProvider(name: AIProviderName, request: GenerateRequest) {
  return getAIProvider(name).generate(request);
}

export * from './types';
