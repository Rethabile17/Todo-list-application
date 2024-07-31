import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TodoList.css'; 

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('Low');

  const navigate = useNavigate();
  const apiUrl = 'http://localhost:3005/todos'; // Your backend endpoint

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const validateForm = () => {
    return true;
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      try {
        const newTaskObj = {
          description: newTask,
          priority: taskPriority,
        };
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTaskObj),
        });
        const addedTask = await response.json();
        setTasks([...tasks, addedTask]);
        setNewTask('');
        setTaskPriority('Low');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await fetch(`${apiUrl}/${taskId}`, { method: 'DELETE' });
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setTaskDescription(taskToEdit.description);
    setTaskPriority(taskToEdit.priority);
    setEditedTaskId(taskId);
    setEditMode(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = {
        description: taskDescription,
        priority: taskPriority,
      };
      const response = await fetch(`${apiUrl}/${editedTaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      const updatedTaskData = await response.json();
      const updatedTasks = tasks.map((task) =>
        task.id === editedTaskId ? updatedTaskData : task
      );

      setTasks(updatedTasks);
      setEditMode(false);
      setTaskDescription('');
      setTaskPriority('Low');
      setEditedTaskId(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleCancelUpdate = () => {
    setEditMode(false);
    setTaskDescription('');
    setTaskPriority('Low');
    setEditedTaskId(null);
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'yellow';
      case 'Low':
        return 'green';
      default:
        return 'black';
    }
  };

  const handleNavigation = () => {
    if (validateForm()) {
      navigate('/');
    }
  };
       
  return (
    <div className="todo-container">
      <h2>ToDo List</h2>
      <form onSubmit={editMode ? handleUpdate : handleSubmit}>
        <input
          type="text"
          placeholder={editMode ? 'Update task...' : 'Add a task...'}
          value={editMode ? taskDescription : newTask}
          onChange={editMode ? (e) => setTaskDescription(e.target.value) : handleChange}
        />
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit">{editMode ? 'Update Task' : 'Add Task'}</button>
        {editMode && (
          <button type="button" onClick={handleCancelUpdate}>
            Cancel
          </button>
        )}
      </form>

      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => handleSearch(e.target.value)}
      />

      <ul>
        {tasks
          .filter((task) =>
            task.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((task) => (
            <li key={task.id} style={{ color: priorityColor(task.priority) }}>
              {task.description} - {task.priority}
              <button onClick={() => handleEdit(task.id)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoList;