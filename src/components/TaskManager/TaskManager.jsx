import React, { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);

    // Load tasks from localStorage on first render
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('task')) || [];
        setTasks(storedTasks);
    }, []);

    const handleAddTask = (newTask) => {
        const updatedTasks = [...tasks, { ...newTask, id: Date.now() }];
        setTasks(updatedTasks);
        localStorage.setItem('task', JSON.stringify(updatedTasks));
    };

    const handleDeleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      };

    const handleEditTask = (updatedTask) => {
        const updatedTasks = tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 p-4 max-w-7xl mx-auto">
            {/* Main task management area (full width when alone) */}
            <div className="w-full">
                <h2 className="text-2xl font-bold mb-4">📝 Your Tasks</h2>
                <TaskInput onAddTask={handleAddTask} />
                <div className="mt-4 bg-white rounded-lg p-4">
                    {tasks.length === 0 ? (
                        <p className="text-gray-500 text-center">No task added</p>
                    ) : (
                        <TaskList
                            tasks={tasks}
                            onDelete={handleDeleteTask}
                            onEdit={handleEditTask}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskManager;