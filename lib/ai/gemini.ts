import 'server-only';
import type { AIProvider, GenerateRequest, GenerateResult } from './types';

export class GeminiProvider implements AIProvider {
  readonly name = 'gemini' as const;

  async generate(request: GenerateRequest): Promise<GenerateResult> {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = request.model || process.env.GEMINI_MODEL || 'gemini-2.5-flash';

    if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');

    const systemInstruction = request.messages
      .filter((m) => m.role === 'system')
      .map((m) => m.content)
      .join('\n\n');

    const contents = request.messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: systemInstruction
            ? { parts: [{ text: systemInstruction }] }
            : undefined,
          contents,
          generationConfig: {
            temperature: request.temperature,
            maxOutputTokens: request.maxOutputTokens,
          },
        }),
      },
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || `Gemini request failed with ${response.status}`);
    }

    const text = data.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text || '')
      .join('') || '';

    return {
      provider: this.name,
      model,
      text,
      inputTokens: data.usageMetadata?.promptTokenCount,
      outputTokens: data.usageMetadata?.candidatesTokenCount,
      raw: data,
    };
  }
}
