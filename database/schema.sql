-- Create database
CREATE DATABASE taskmanagement;

-- Connect to database
\c taskmanagement;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(50) NOT NULL CHECK (priority IN ('Low', 'Medium', 'High')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('Pending', 'In Progress', 'Completed')),
    due_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default user (password is hashed version of "123456")
INSERT INTO users (name, email, password) 
VALUES ('Admin', 'admin@test.com', '$2b$10$rKjEJzKz5JxGV7xKZ5JxGOeKjEJzKz5JxGV7xKZ5JxGOeKjEJzKz5.');

-- Sample tasks
INSERT INTO tasks (title, description, priority, status, due_date) VALUES
('Complete project proposal', 'Draft and finalize the Q4 project proposal', 'High', 'In Progress', '2024-07-30'),
('Team meeting', 'Weekly sync with development team', 'Medium', 'Pending', '2024-07-25'),
('Code review', 'Review pull requests from team members', 'High', 'Pending', '2024-07-24'),
('Update documentation', 'Update API documentation for new endpoints', 'Low', 'Completed', '2024-07-20'),
('Bug fixes', 'Fix reported bugs in authentication module', 'High', 'In Progress', '2024-07-26');