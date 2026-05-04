import { StatCard } from '../shared/StatCard';
import { StatsChart } from '../shared/StatsChart';

export function TutorStats({ stats }: { stats: Record<string, number> }) {
  const chartData = [
    { name: 'Completed', value: stats?.completed || 0 },
    { name: 'Upcoming', value: stats?.upcoming || 0 },
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Sessions" value={stats?.totalSessions || 0} />
        <StatCard label="Completed Sessions" value={stats?.completed || 0} />
        <StatCard label="Upcoming Sessions" value={stats?.upcoming || 0} />
        <StatCard
          label="Average Rating"
          value={stats?.avgRating?.toFixed(1) ?? '—'}
        />
      </div>

      {(stats?.totalSessions || 0) > 0 && (
        <StatsChart data={chartData} title="Session Status Overview" type="bar" />
      )}
    </>
  );
}
