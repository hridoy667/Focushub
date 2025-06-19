import React, { useState } from 'react';

const TaskInput = ({ onAddTask }) => {
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

    return (
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 ">
        <input
          type="text"
          placeholder="Add a task..."
          className="w-full  d:flex-1 border border-blue-500 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button 
          onClick={handleTask} 
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add
        </button>
      </div>
      
    );
};

export default TaskInput;
