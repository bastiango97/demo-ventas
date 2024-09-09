import React from 'react';
import './TaskInstance.css';

const TaskInstance = ({ 
    name, 
    createdTime, 
    isSelected, 
    onClick, 
    clientName, 
    carModelYear, 
    premium, 
    priority 
}) => {
    return (
        <div 
            className={`task-instance ${isSelected ? 'selected' : ''}`} 
            onClick={onClick}
        >
            <div className="task-header">
                <span className={`priority ${priority.toLowerCase()}`}>{priority}</span>
                <p className="task-name">{name}</p>
            </div>
            <div className="task-details">
                <p><strong>Cliente:</strong> {clientName}</p>
                <p><strong>Auto:</strong> {carModelYear}</p>
                <p><strong>Prima:</strong> ${premium}</p>
                <p><strong>Creado:</strong> {createdTime}</p>
            </div>
        </div>
    );
};

export default TaskInstance;
