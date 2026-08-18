import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

console.log("env url", import.meta.env.VITE_API_URL)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks. Is the backend running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      const response = await axios.post(`${API_URL}/tasks`, { title: newTaskTitle });
      setTasks([response.data, ...tasks]);
      setNewTaskTitle('');
      setError('');
    } catch (err) {
      setError('Failed to add task.');
      console.error(err); 
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await axios.put(`${API_URL}/tasks/${task.id}`, { completed: updatedTask.completed });
      setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));
    } catch (err) {
      setError('Failed to update task.');
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (err) {
      setError('Failed to delete task.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Azure Full-Stack Test</h1>
        <p>A simple To-Do List application</p>
      </header>
      <main className="container">
        <form onSubmit={handleAddTask} className="task-form">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
          />
          <button type="submit">Add Task</button>
        </form>

        {error && <p className="error">{error}</p>}
        
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id} className={task.completed ? 'completed' : ''}>
                <span onClick={() => handleToggleComplete(task)}>
                  {task.title}
                </span>
                <button onClick={() => handleDeleteTask(task.id)} className="delete-btn">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
