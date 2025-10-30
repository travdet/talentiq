'use client';
import React, { useState } from 'react';
import { BreakdownForm } from '@/components/BreakdownForm';
import { Buckets } from '@/components/Buckets';
import { ActorCard } from '@/components/ActorCard';

const MOCK = [
  { id: 'a1', name: 'Ava Reynolds', union: 'SAG-AFTRA', ageRange: '25-33', archetypes: ['Detective','Professional'], skills: ['Firearms','Spanish','Boxing'], city: 'New York', lastCheckIn: '2025-10-01' },
  { id: 'a2', name: 'Marco Alvarez', union: 'Non-Union', ageRange: '30-40', archetypes: ['Dad','Best Friend'], skills: ['Spanish','Guitar','Singing'], city: 'Atlanta', lastCheckIn: '2025-09-20' },
  { id: 'a3', name: 'Naomi Chen', union: 'SAG-Eligible', ageRange: '18-26', archetypes: ['Comedian','Best Friend'], skills: ['French','Stunts'], city: 'Los Angeles', lastCheckIn: '2025-10-10' },
];

export default function Home() {
  const [scored, setScored] = useState<any[]>([]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <aside className="lg:col-span-4 card p-4">
        <h2 className="font-semibold mb-2">Paste Casting Breakdown</h2>
        <BreakdownForm onParsed={(req) => {
          // extremely naive scoring to visualize
          const results = MOCK.map(a => {
            let score = 0;
            if (req.union && req.union === a.union) score += 10;
            const arch = (req.archetypes || []).filter((x: string) => a.archetypes.includes(x)).length;
            const skills = (req.skills || []).filter((x: string) => a.skills.includes(x)).length;
            score += arch * 8 + skills * 6;
            return { actor: a, score };
          }).sort((x,y) => y.score - x.score);
          setScored(results);
        }} />
      </aside>
      <section className="lg:col-span-8 space-y-4">
        <div className="card p-4">
          <h2 className="font-semibold mb-2">Recommendations</h2>
          <Buckets items={scored} />
        </div>
        <div className="card p-4">
          <h2 className="font-semibold mb-2">All Actors (mock)</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
            {MOCK.map(a => <ActorCard key={a.id} actor={a} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
