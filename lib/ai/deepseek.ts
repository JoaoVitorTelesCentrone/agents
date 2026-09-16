import 'server-only';
import type { AIProvider, GenerateRequest, GenerateResult } from './types';

export class DeepSeekProvider implements AIProvider {
  readonly name = 'deepseek' as const;

  async generate(request: GenerateRequest): Promise<GenerateResult> {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    const model = request.model || process.env.DEEPSEEK_MODEL || 'deepseek-chat';

    if (!apiKey) throw new Error('DEEPSEEK_API_KEY is not configured');

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: request.messages,
        temperature: request.temperature,
        max_tokens: request.maxOutputTokens,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || `DeepSeek request failed with ${response.status}`);
    }

    return {
      provider: this.name,
      model,
      text: data.choices?.[0]?.message?.content || '',
      inputTokens: data.usage?.prompt_tokens,
      outputTokens: data.usage?.completion_tokens,
      raw: data,
    };
  }
}
