import { StatCard } from '../shared/StatCard';
import { StatsChart } from '../shared/StatsChart';

export function StudentStats({ stats }: { stats: Record<string, number> }) {
  const chartData = [
    { name: 'Completed', value: stats?.completed || 0 },
    { name: 'Upcoming', value: stats?.upcoming || 0 },
    { name: 'Total', value: stats?.totalBookings || 0 },
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Bookings" value={stats?.totalBookings || 0} />
        <StatCard label="Completed Sessions" value={stats?.completed || 0} />
        <StatCard label="Upcoming Sessions" value={stats?.upcoming || 0} />
        <StatCard
          label="Average Rating"
          value={stats?.avgRating?.toFixed(1) ?? '—'}
        />
      </div>

      {(stats?.totalBookings || 0) > 0 && (
        <StatsChart data={chartData} title="Booking Status Overview" type="bar" />
      )}
    </>
  );
}
