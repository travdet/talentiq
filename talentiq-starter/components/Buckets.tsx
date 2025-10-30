'use client';
export function Buckets({ items }: { items: any[] }) {
  const best = items.filter(i => i.score >= 20);
  const strong = items.filter(i => i.score >= 12 && i.score < 20);
  const wild = items.filter(i => i.score < 12);
  return (
    <div className="space-y-4">
      <Group title="✅ Best Matches" list={best} />
      <Group title="🎯 Strong Alternates" list={strong} />
      <Group title="⚡ Wildcards" list={wild} />
    </div>
  );
}

function Group({ title, list }: { title: string, list: any[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{title}</h3>
        <span className="badge">{list.length}</span>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        {list.map((i, idx) => (
          <div key={idx} className="card p-3 flex items-center justify-between">
            <span>{i.actor.name}</span>
            <span className="text-xs font-mono">{i.score}</span>
          </div>
        ))}
        {list.length === 0 && <div className="text-xs text-gray-500">No items.</div>}
      </div>
    </div>
  );
}
