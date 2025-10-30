import { NextRequest, NextResponse } from 'next/server';
import { parseBreakdownWithAI, BreakdownSchema } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Missing text' }, { status: 400 });
    }
    const parsed = await parseBreakdownWithAI(text);
    // Ensure valid JSON
    const safe = BreakdownSchema.parse(parsed);
    return NextResponse.json(safe);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
