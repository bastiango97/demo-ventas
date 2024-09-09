import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import EnviarCotizacion from './taskPages/EnviarCotizacion';
import RevisarCotizacion from './taskPages/RevisarCotizacion';
import HacerCambios from './taskPages/HacerCambios';

const Procesos = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([]);  // Manage tasks state here

    const fetchTasks = async () => {
        try {
            const response = await fetch('https://demo-aseguradoras.onrender.com/engine-rest/task', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const tasksData = await response.json();
    
                // Fetch variables for each task's process instance
                const tasksWithVariables = await Promise.all(
                    tasksData.map(async (task) => {
                        const variablesResponse = await fetch(`https://demo-aseguradoras.onrender.com/engine-rest/process-instance/${task.processInstanceId}/variables`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
    
                        if (variablesResponse.ok) {
                            const variables = await variablesResponse.json();
                            return { ...task, variables }; // Include the variables in the task object
                        } else {
                            console.error('Failed to fetch variables for task:', task.id);
                            return task; // Return the task without variables if the fetch fails
                        }
                    })
                );
    
                setTasks(tasksWithVariables); // Set the tasks with their variables
            } else {
                console.error('Failed to fetch tasks:', response.status);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
    

    useEffect(() => {
        fetchTasks();  // Fetch tasks when the component mounts
    }, []);

    const renderTaskContent = () => {
        if (!selectedTask) {
            return <h1>Selecciona una tarea de la barra lateral</h1>;
        }

        switch (selectedTask.name) {
            case 'Cotización':
                return <EnviarCotizacion task={selectedTask} fetchTasks={fetchTasks} />;
            case 'Revisar cotización':
                return <RevisarCotizacion task={selectedTask} fetchTasks={fetchTasks} />;
            case 'Cambios en Póliza':
                return <HacerCambios task={selectedTask} fetchTasks={fetchTasks} />;
            default:
                return <h1>Tarea no reconocida</h1>;
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar 
                selectedTask={selectedTask} 
                setSelectedTask={setSelectedTask} 
                tasks={tasks}  // Pass tasks to Sidebar
                fetchTasks={fetchTasks}
            />
            <div style={{ flex: 1, padding: '20px' }}>
                {renderTaskContent()}
            </div>
        </div>
    );
};

export default Procesos;
