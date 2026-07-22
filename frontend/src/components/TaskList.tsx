import React from 'react';
import { Task } from '../types';
import { Edit2, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns/format';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="task-table-container">
        <div style={{ padding: '2rem' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton skeleton-line"></div>
          ))}
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-table-container">
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 3h5v5"></path>
              <path d="M8 3H3v5"></path>
              <path d="M12 22v-8"></path>
              <path d="m2 13 10-10 10 10"></path>
            </svg>
          </div>
          <h3 className="empty-state-title">No tasks found</h3>
          <p className="empty-state-text">
            Get started by creating your first task or adjust your filters.
          </p>
        </div>
      </div>
    );
  }

  const getPriorityBadge = (priority: string) => {
    const classes = {
      Low: 'badge-priority-low',
      Medium: 'badge-priority-medium',
      High: 'badge-priority-high',
    };
    return (
      <span className={`badge ${classes[priority as keyof typeof classes]}`}>
        <span className="badge-dot"></span>
        {priority}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const classes = {
      Pending: 'badge-status-pending',
      'In Progress': 'badge-status-inprogress',
      Completed: 'badge-status-completed',
    };
    return (
      <span className={`badge ${classes[status as keyof typeof classes]}`}>
        <span className="badge-dot"></span>
        {status}
      </span>
    );
  };

  return (
    <div className="task-table-container fade-in">
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <div className="task-title">{task.title}</div>
                {task.description && (
                  <div className="task-description">{task.description}</div>
                )}
              </td>
              <td>{getPriorityBadge(task.priority)}</td>
              <td>{getStatusBadge(task.status)}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={14} style={{ color: 'var(--text-tertiary)' }} />
                  {format(new Date(task.due_date), 'MMM dd, yyyy')}
                </div>
              </td>
              <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                {format(new Date(task.created_at), 'MMM dd, yyyy')}
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="action-btn"
                    onClick={() => onEdit(task)}
                    title="Edit task"
                  >
                    <Edit2 />
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => onDelete(task)}
                    title="Delete task"
                  >
                    <Trash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;