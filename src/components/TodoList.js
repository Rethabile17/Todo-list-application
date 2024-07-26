import React, { useState } from 'react';
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

  const validateForm = () => {
    return true;
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: tasks.length + 1,
        description: newTask,
        priority: taskPriority,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setTaskDescription(taskToEdit.description);
    setTaskPriority(taskToEdit.priority);
    setEditedTaskId(taskId);
    setEditMode(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTasks = tasks.map((task) =>
      task.id === editedTaskId
        ? { ...task, description: taskDescription, priority: taskPriority }
        : task
    );

    setTasks(updatedTasks);
    setEditMode(false);
    setTaskDescription('');
    setTaskPriority('Low');
    setEditedTaskId(null);
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
          value={editMode ? taskPriority : 'Low'}
          onChange={(e) => setTaskPriority(e.target.value)}
          disabled={editMode}
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