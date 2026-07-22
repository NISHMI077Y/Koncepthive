import React from 'react';
import { DashboardStats as Stats } from '../types';
import { CheckCircle, Clock, PlayCircle, XCircle, ListTodo } from 'lucide-react';

interface DashboardStatsProps {
  stats: Stats | null;
  loading: boolean;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="dashboard-stats">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton skeleton-card"></div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: ListTodo,
      color: '#4F46E5',
      bgColor: 'rgba(79, 70, 229, 0.1)',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: '#94A3B8',
      bgColor: 'rgba(148, 163, 184, 0.1)',
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: PlayCircle,
      color: '#4F46E5',
      bgColor: 'rgba(79, 70, 229, 0.1)',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: '#22C55E',
      bgColor: 'rgba(34, 197, 94, 0.1)',
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      icon: XCircle,
      color: '#EF4444',
      bgColor: 'rgba(239, 68, 68, 0.1)',
    },
  ];

  return (
    <div className="dashboard-stats">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="stat-card fade-in"
            style={{ '--accent-color': stat.color, '--icon-bg': stat.bgColor } as any}
          >
            <div className="stat-card-header">
              <div className="stat-card-icon">
                <Icon />
              </div>
            </div>
            <div className="stat-card-value">{stat.value}</div>
            <div className="stat-card-label">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;