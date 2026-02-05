import { StatCard } from '../shared/StatCard';

export function TutorStats({ stats }: { stats: Record<string, number> }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard label="Total Sessions" value={stats?.totalSessions} />
      <StatCard label="Completed Sessions" value={stats?.completed} />
      <StatCard label="Upcoming Sessions" value={stats?.upcoming} />
      <StatCard
        label="Average Rating"
        value={stats?.avgRating?.toFixed(1) ?? '—'}
      />
    </div>
  );
}
