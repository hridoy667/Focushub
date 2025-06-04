import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const TaskItem = ({ task,onDelete, onEdit}) => {
  const handleEditClick = () => {
    const newTitle = prompt('Edit task title:', task.title);
    if (newTitle !== null && newTitle.trim() !== '') {
      // Pass updated task to parent
      onEdit({ ...task, title: newTitle });
    }
  };
  return (
    <div className="border p-3 rounded-md bg-gray-100 hover:bg-gray-50 transition-colors duration-200 group">
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
          <button className="text-gray-500 hover:text-blue-500"
          onClick={handleEditClick}>
            <FiEdit2 size={18} />
          </button>
          <button className="text-gray-500 hover:text-red-500" onClick={onDelete}>
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
