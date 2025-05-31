import React, { useState } from 'react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Finish project report',
      date: '2025-06-01',
      time: '09:30',
    },
    {
      id: 2,
      title: 'Buy groceries',
      date: '',
      time: '',
    },
    {
      id: 3,
      title: 'Team meeting',
      date: '2025-06-01',
      time: '08:00',
    },
  ]);

  // Sort tasks: tasks without time go to bottom
  const sortedTasks = [...tasks].sort((a, b) => {
    const timeA = a.date && a.time ? new Date(`${a.date}T${a.time}`) : new Date('9999-12-31T23:59');
    const timeB = b.date && b.time ? new Date(`${b.date}T${b.time}`) : new Date('9999-12-31T23:59');
    return timeA - timeB;
  });

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4">📝 Your Tasks</h2>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 space-y-3">
        {sortedTasks.map((task) => (
          <div key={task.id} className="border p-3 rounded-md bg-gray-100">
            <p className="font-semibold">{task.title}</p>
            {task.date && task.time ? (
              <p className="text-sm text-gray-600">
                ⏰ {task.date} at {task.time}
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic">No time specified</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
