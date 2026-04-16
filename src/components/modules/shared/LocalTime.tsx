'use client';

import { useEffect, useState } from 'react';

type LocalTimeProps = {
  date: string | Date;
  format?: 'date' | 'time' | 'datetime' | 'timeRange';
  endDate?: string | Date; // Used only for timeRange
};

export default function LocalTime({ date, format = 'date', endDate }: LocalTimeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a generic skeleton or empty space to avoid hydration mismatch
    return <span className="opacity-0">Loading...</span>;
  }

  const d = new Date(date);

  if (format === 'date') {
    return <span>{d.toLocaleDateString()}</span>;
  }

  if (format === 'time') {
    return (
      <span>
        {d.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
    );
  }

  if (format === 'timeRange' && endDate) {
    const end = new Date(endDate);
    return (
      <span>
        {d.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
        {' – '}
        {end.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
    );
  }

  return <span>{d.toLocaleString()}</span>;
}
