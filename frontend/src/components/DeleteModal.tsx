import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteModalProps {
  taskTitle: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ taskTitle, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div className="modal-header">
          <h2 className="modal-title">Delete Task</h2>
          <button className="modal-close" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 1rem',
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--danger)',
              }}
            >
              <AlertTriangle size={32} />
            </div>
            <p style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Are you sure you want to delete this task?
            </p>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>"{taskTitle}"</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-secondary" disabled={loading}>
            Cancel
          </button>
          <button onClick={handleConfirm} className="btn btn-danger" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Deleting...
              </>
            ) : (
              'Delete Task'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;