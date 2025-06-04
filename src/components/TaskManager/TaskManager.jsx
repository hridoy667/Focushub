import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import TaskInput from './TaskInput';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);

    // Load tasks from localStorage on first render
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('task')) || [];
        setTasks(storedTasks);
    }, []);

    // Sort tasks: tasks without time go to bottom
    const sortedTasks = [...tasks].sort((a, b) => {
        const timeA = a.date && a.time ? new Date(`${a.date}T${a.time}`) : new Date('9999-12-31T23:59');
        const timeB = b.date && b.time ? new Date(`${b.date}T${b.time}`) : new Date('9999-12-31T23:59');
        return timeA - timeB;
    });

    const handleAddTask = (newTask) => {
        const updatedTasks = [...tasks, { ...newTask, id: Date.now() }];
        setTasks(updatedTasks);
        localStorage.setItem('task', JSON.stringify(updatedTasks));
    };
    // Delete task handler
const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('task', JSON.stringify(updatedTasks));
  };
  
  // Edit task handler (simple version to replace task by id)
  const handleEditTask = (updatedTask) => {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('task', JSON.stringify(updatedTasks));
  };
    return (
        <div className="flex flex-col items-start mt-10 px-4">
            <h2 className="text-2xl font-bold mb-4">📝 Your Tasks</h2>
            <TaskInput onAddTask={handleAddTask} />
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 space-y-3">
                {sortedTasks.map((task) => (
                    <TaskItem key={task.id} task={task}  onDelete={() => handleDeleteTask(task.id)} 
                    onEdit={handleEditTask}/>
                ))}
            </div>
            
        </div>
    );
};

export default TaskManager;
