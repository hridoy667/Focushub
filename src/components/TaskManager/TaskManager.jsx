import React, { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';

const TaskManager = ({ darkMode }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  const saveToLocalStorage = (taskList) => {
    localStorage.setItem('tasks', JSON.stringify(taskList));
  };

  const handleAddTask = (newTask) => {
    const updatedTasks = [...tasks, { ...newTask, id: Date.now() }];
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  const handleEditTask = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 max-w-7xl mx-auto">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4">📝 Your Tasks</h2>
        <TaskInput onAddTask={handleAddTask} darkMode={darkMode} />
        <div className="mt-4 rounded-lg p-4">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center">No task added</p>
          ) : (
            <TaskList
              tasks={tasks}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              darkMode={darkMode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
