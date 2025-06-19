import React, { useState } from 'react';

const TaskInput = ({ onAddTask, darkMode }) => {
  const [title, setTitle] = useState("");
  const [addTime, setAddTime] = useState(false);
  const [datetime, setDateTime] = useState("");

  const handleTask = () => {
    if (!title.trim()) return;

    const task = {
      id: Date.now(),
      title,
      date: addTime && datetime ? datetime.split("T")[0] : "",
      time: addTime && datetime ? datetime.split("T")[1] : "",
    };

    onAddTask(task);
    setTitle("");
    setAddTime(false);
    setDateTime("");
  };

  const inputClass = `w-full flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 ${
    darkMode
      ? 'bg-gray-800 border-gray-600 text-white focus:ring-yellow-400'
      : 'bg-white border-blue-500 text-gray-800 focus:ring-blue-500'
  }`;

  const buttonClass = `w-full md:w-auto px-4 py-2 rounded-lg transition-colors ${
    darkMode
      ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
      : 'bg-blue-500 hover:bg-blue-600 text-white'
  }`;

  return (
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
      <input
        type="text"
        placeholder="Add a task..."
        className={inputClass}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleTask} className={buttonClass}>
        Add
      </button>
    </div>
  );
};

export default TaskInput;
