'use client';
import React, { useState } from 'react';

export function BreakdownForm({ onParsed }: { onParsed: (obj: any) => void }) {
  const [text, setText] = useState(
    'Role: Streetwise Detective, 28-34. SAG-AFTRA. Proficient with firearms and boxing. Spanish a plus. Local hire: New York.'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setLoading(true); setError(null);
    try {
      const r = await fetch('/api/parse', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ text }) });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'Parse failed');
      onParsed(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <textarea className="w-full h-48 rounded-xl border p-2 font-mono text-sm" value={text} onChange={e => setText(e.target.value)} />
      <div className="mt-2 flex gap-2">
        <button className="btn" onClick={submit} disabled={loading}>{loading ? 'Parsing…' : 'Parse with AI'}</button>
        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>
      <p className="text-xs text-gray-500 mt-2">This calls /api/parse → OpenAI (JSON mode) with a strict schema.</p>
    </div>
  );
}
