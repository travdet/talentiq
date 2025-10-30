import { z } from 'zod';

export const BreakdownSchema = z.object({
  union: z.string().nullable(),
  ageRange: z.tuple([z.number(), z.number()]).nullable(),
  cities: z.array(z.string()),
  archetypes: z.array(z.string()),
  skills: z.array(z.string()),
  boundaries: z.array(z.string())
});

export type Breakdown = z.infer<typeof BreakdownSchema>;

// This is a thin wrapper that calls the OpenAI Responses API with JSON mode.
export async function parseBreakdownWithAI(raw: string): Promise<Breakdown> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY missing');

  const body = {
    model: 'gpt-4.1-mini',
    messages: [
      { role: 'system', content: 'You extract casting requirements into strict JSON.' },
      { role: 'user', content: `Extract union (exact string or null), age range as [min,max] or null, cities (array of city names), archetypes (array), skills (array), boundaries (array) from this casting breakdown. Return ONLY minified JSON.\n\n${raw}` }
    ],
    response_format: { type: 'json_object' }
  };

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${t}`);
  }
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? '{}';
  const parsed = BreakdownSchema.safeParse(JSON.parse(content));
  if (!parsed.success) throw new Error('Schema validation failed');
  return parsed.data;
}
