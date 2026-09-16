import 'server-only';
import type { AIProvider, GenerateRequest, GenerateResult } from './types';

export class OpenAIProvider implements AIProvider {
  readonly name = 'openai' as const;

  async generate(request: GenerateRequest): Promise<GenerateResult> {
    const apiKey = process.env.OPENAI_API_KEY;
    const model = request.model || process.env.OPENAI_MODEL || 'gpt-5.6-luna';

    if (!apiKey) throw new Error('OPENAI_API_KEY is not configured');

    const system = request.messages.filter((m) => m.role === 'system').map((m) => m.content).join('\n\n');
    const input = request.messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({ role: m.role, content: m.content }));

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        instructions: system || undefined,
        input,
        max_output_tokens: request.maxOutputTokens,
        temperature: request.temperature,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || `OpenAI request failed with ${response.status}`);
    }

    const text = data.output_text || data.output
      ?.flatMap((item: any) => item.content || [])
      ?.filter((part: any) => part.type === 'output_text')
      ?.map((part: any) => part.text)
      ?.join('') || '';

    return {
      provider: this.name,
      model,
      text,
      inputTokens: data.usage?.input_tokens,
      outputTokens: data.usage?.output_tokens,
      raw: data,
    };
  }
}
