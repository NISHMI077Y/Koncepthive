import { Response } from 'express';
import pool from '../config/database';
import { AuthRequest } from '../middleware/authMiddleware';
import { validateTask } from '../utils/validators';

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { status, priority, search, sort } = req.query;

    let query = 'SELECT * FROM tasks WHERE 1=1';
    const params: any[] = [];
    let paramCount = 0;

    if (status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      params.push(status);
    }

    if (priority) {
      paramCount++;
      query += ` AND priority = $${paramCount}`;
      params.push(priority);
    }

    if (search) {
      paramCount++;
      query += ` AND title ILIKE $${paramCount}`;
      params.push(`%${search}%`);
    }

    // Sorting
    switch (sort) {
      case 'newest':
        query += ' ORDER BY created_at DESC';
        break;
      case 'oldest':
        query += ' ORDER BY created_at ASC';
        break;
      case 'due_date':
        query += ' ORDER BY due_date ASC';
        break;
      default:
        query += ' ORDER BY created_at DESC';
    }

    const result = await pool.query(query, params);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks',
    });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch task',
    });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, priority, status, due_date } = req.body;

    const errors = validateTask(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    const result = await pool.query(
      `INSERT INTO tasks (title, description, priority, status, due_date) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [title, description || null, priority, status, due_date]
    );

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create task',
    });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status, due_date } = req.body;

    const errors = validateTask(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    const result = await pool.query(
      `UPDATE tasks 
       SET title = $1, description = $2, priority = $3, status = $4, 
           due_date = $5, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $6 
       RETURNING *`,
      [title, description || null, priority, status, due_date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update task',
    });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete task',
    });
  }
};

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const stats = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'Pending') as pending,
        COUNT(*) FILTER (WHERE status = 'In Progress') as in_progress,
        COUNT(*) FILTER (WHERE status = 'Completed') as completed,
        COUNT(*) FILTER (WHERE status != 'Completed' AND due_date < CURRENT_DATE) as overdue
      FROM tasks
    `);

    res.json({
      success: true,
      data: {
        total: parseInt(stats.rows[0].total),
        pending: parseInt(stats.rows[0].pending),
        inProgress: parseInt(stats.rows[0].in_progress),
        completed: parseInt(stats.rows[0].completed),
        overdue: parseInt(stats.rows[0].overdue),
      },
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
    });
  }
};