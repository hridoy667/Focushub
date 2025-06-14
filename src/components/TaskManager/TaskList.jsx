import React, { useState } from 'react';
import TaskItem from './TaskItem';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const TaskList = ({ tasks, onDelete, onEdit }) => {
    const [visibleTasks, setVisibleTasks] = useState(8);
    const showAll = visibleTasks >= tasks.length;

    // Function to convert 24-hour time to 12-hour format with AM/PM
    const formatTime = (timeString) => {
        if (!timeString) return '';
        
        const [hours, minutes] = timeString.split(':');
        const hourInt = parseInt(hours, 10);
        const period = hourInt >= 12 ? 'PM' : 'AM';
        const twelveHour = hourInt % 12 || 12; // Convert 0 to 12 for 12AM
        
        return `${twelveHour}:${minutes} ${period}`;
    };

    // Sort tasks with formatted time
    const sortedTasks = [...tasks].sort((a, b) => {
        const timeA = a.date && a.time ? new Date(`${a.date}T${a.time}`) : new Date('9999-12-31T23:59');
        const timeB = b.date && b.time ? new Date(`${b.date}T${b.time}`) : new Date('9999-12-31T23:59');
        return timeA - timeB;
    }).map(task => ({
        ...task,
        // Add formattedTime to each task object
        formattedTime: task.time ? formatTime(task.time) : ''
    }));

    const displayedTasks = sortedTasks.slice(0, visibleTasks);

    const toggleTasks = () => {
        setVisibleTasks(showAll ? 8 : tasks.length);
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 auto-rows-fr">
                {displayedTasks.map(task => (
                    <TaskItem 
                        key={task.id} 
                        task={{
                            ...task,
                            time: task.formattedTime // Use formatted time
                        }}
                        onDelete={() => onDelete(task.id)}
                        onEdit={onEdit}
                    />
                ))}
            </div>
            
            {tasks.length > 8 && (
                <div className="mt-4 flex justify-center">
                    <button 
                        onClick={toggleTasks}
                        className=""
                    >
                        {showAll ? (
                            <>
                                <FiChevronUp /> Show Less
                            </>
                        ) : (
                            <>
                                <FiChevronDown /> Show More
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskList;