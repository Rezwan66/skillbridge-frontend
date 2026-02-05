import { StatCard } from '../shared/StatCard';

export function AdminStats({ stats }: { stats: Record<string, number> }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard label="Total Users" value={stats?.totalUsers} />
      <StatCard label="Total Tutors" value={stats?.totalTutors} />
      <StatCard label="Total Bookings" value={stats?.totalBookings} />
      <StatCard label="Completed Bookings" value={stats?.completedBookings} />
    </div>
  );
}
