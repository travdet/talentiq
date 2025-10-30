'use client';
export function ActorCard({ actor }: { actor: any }) {
  return (
    <div className="card p-3">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{actor.name}</div>
        <span className="badge">{actor.union}</span>
      </div>
      <div className="text-xs text-gray-600">{actor.ageRange} • {actor.city}</div>
      <div className="text-xs mt-1">Archetypes: {actor.archetypes.join(', ')}</div>
      <div className="text-xs">Skills: {actor.skills.join(', ')}</div>
    </div>
  );
}
