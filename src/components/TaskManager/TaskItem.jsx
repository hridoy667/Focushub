import React, { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const TaskItem = ({ task, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({...task});

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask({...task}); // Reset to original values
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="border p-3 rounded-lg bg-gray-100 bg-gradient-to-br from-white via-blue-100 to-purple-100
 hover:bg-gray-50 transition-colors duration-200 group">
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
          <div className="flex items-center space-x-3">
            <input
              type="date"
              name="date"
              value={editedTask.date || ''}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 text-sm"
            />
            <input
              type="time"
              name="time"
              value={editedTask.time || ''}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 text-sm"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button 
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg"
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
              <p className="text-sm text-gray-600">
                ⏰ {task.date} at {task.time}
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic">
                No time specified
              </p>
            )}
          </div>
          
          <div className="flex space-x-2 group-hover:opacity-100">
            <button 
              className="text-gray-500 hover:text-blue-500"
              onClick={handleEditClick}
            >
              <FiEdit2 size={18} />
            </button>
            <button 
              className="text-gray-500 hover:text-red-500" 
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