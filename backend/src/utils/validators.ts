export const validateTask = (data: any) => {
  const errors: string[] = [];

  if (!data.title || data.title.trim() === '') {
    errors.push('Title is required');
  }

  if (!data.priority || !['Low', 'Medium', 'High'].includes(data.priority)) {
    errors.push('Priority must be Low, Medium, or High');
  }

  if (!data.status || !['Pending', 'In Progress', 'Completed'].includes(data.status)) {
    errors.push('Status must be Pending, In Progress, or Completed');
  }

  if (!data.due_date) {
    errors.push('Due date is required');
  } else {
    const dueDate = new Date(data.due_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (dueDate < today) {
      errors.push('Due date cannot be earlier than today');
    }
  }

  return errors;
};