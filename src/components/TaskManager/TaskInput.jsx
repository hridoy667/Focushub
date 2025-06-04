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
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 mt-4">
            <div className="flex flex-col space-y-3">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Add a task..."
                        className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button 
                        onClick={handleTask} 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Add
                    </button>
                </div>
                
                <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="addTime"
                            checked={addTime}
                            onChange={(e) => setAddTime(e.target.checked)}
                            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="addTime" className="ml-2 text-sm text-gray-700">
                            Add Time
                        </label>
                    </div>

                    {addTime && (
                        <input
                            type="datetime-local"
                            id="dateTime"
                            value={datetime}
                            onChange={(e) => setDateTime(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskInput;
