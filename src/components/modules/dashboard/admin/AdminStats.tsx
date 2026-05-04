import { StatCard } from '../shared/StatCard';
import { StatsChart } from '../shared/StatsChart';

export function AdminStats({ stats }: { stats: Record<string, number> }) {
  // Mock data based on real stats for chart display
  const chartData = [
    { name: 'Jan', value: Math.floor((stats?.totalBookings || 0) * 0.1) },
    { name: 'Feb', value: Math.floor((stats?.totalBookings || 0) * 0.15) },
    { name: 'Mar', value: Math.floor((stats?.totalBookings || 0) * 0.25) },
    { name: 'Apr', value: Math.floor((stats?.totalBookings || 0) * 0.2) },
    { name: 'May', value: Math.floor((stats?.totalBookings || 0) * 0.3) },
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={stats?.totalUsers || 0} />
        <StatCard label="Total Tutors" value={stats?.totalTutors || 0} />
        <StatCard label="Total Bookings" value={stats?.totalBookings || 0} />
        <StatCard label="Completed Bookings" value={stats?.completedBookings || 0} />
      </div>
      
      <StatsChart data={chartData} title="Bookings Over Time" type="line" />
    </>
  );
}
