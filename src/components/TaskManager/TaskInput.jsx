import React, { useState } from 'react';

const TaskInput = ({ onAddTask, darkMode }) => {
  const [title, setTitle] = useState('');
  const [addTime, setAddTime] = useState(false);
  const [datetime, setDateTime] = useState('');

  const handleTask = () => {
    if (!title.trim()) return;

    const date = addTime && datetime ? datetime.split('T')[0] : null;
    const time = addTime && datetime ? datetime.split('T')[1] : null;

    const newTask = {
      title,
      date,
      time,
    };

    onAddTask(newTask);
    setTitle('');
    setAddTime(false);
    setDateTime('');
  };

  return (
    <div
      className={`w-full max-w-md rounded-lg shadow-md p-4 mt-4 transition-colors duration-300 ${
        darkMode
          ? 'bg-gradient-to-tr from-gray-800 to-gray-700'
          : 'bg-gradient-to-tr from-white to-blue-50'
      }`}
    >
      <div className="flex flex-col space-y-3">
        {/* Input and Add Button */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            placeholder="Add a task..."
            className={`flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-yellow-500'
                : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-500'
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={handleTask}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg transition-colors ${
              darkMode
                ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Add
          </button>
        </div>

        {/* Add Time Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="addTime"
              checked={addTime}
              onChange={(e) => setAddTime(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="addTime"
              className={`ml-2 text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Add Time
            </label>
          </div>

          {addTime && (
            <input
              type="datetime-local"
              id="dateTime"
              value={datetime}
              onChange={(e) => setDateTime(e.target.value)}
              className={`border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-gray-700 text-white border-gray-600 focus:ring-yellow-500'
                  : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-500'
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
