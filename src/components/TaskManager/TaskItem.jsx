import React, { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const TaskItem = ({ task, onDelete, onEdit, darkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask({ ...task }); // Reset to original values
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className={`font-[Poppins] p-3 rounded-lg transition-colors duration-200 group
        ${darkMode
          ? 'bg-brown-800 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100 hover:bg-gray-700'
          : 'bg-brown-300 bg-gradient-to-br from-white via-brown-300 to-purple-100 text-gray-900 hover:bg-gray-50'}
      `}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className={`w-full border rounded-lg p-2 ${
              darkMode
                ? 'border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-500 focus:border-blue-500'
                : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
          <div className="flex items-center space-x-3">
            <input
              type="date"
              name="date"
              value={editedTask.date || ''}
              onChange={handleChange}
              className={`rounded-lg p-2 text-sm border ${
                darkMode
                  ? 'border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-500 focus:border-blue-500'
                  : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            <input
              type="time"
              name="time"
              value={editedTask.time || ''}
              onChange={handleChange}
              className={`rounded-lg p-2 text-sm border ${
                darkMode
                  ? 'border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-500 focus:border-blue-500'
                  : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className={`px-3 py-1 rounded-lg ${
                darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-300 text-gray-800'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="font-semibold">{task.title}</p>
            {task.date && task.time ? (
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                ⏰ {task.date} at {task.time}
              </p>
            ) : (
              <p className={`${darkMode ? 'text-gray-400 italic' : 'text-gray-400 italic'} text-sm`}>
                No time specified
              </p>
            )}
          </div>

          <div className="flex space-x-2 group-hover:opacity-100">
            <button
              className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-500'}`}
              onClick={handleEditClick}
            >
              <FiEdit2 size={18} />
            </button>
            <button
              className={`${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'}`}
              onClick={onDelete}
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
