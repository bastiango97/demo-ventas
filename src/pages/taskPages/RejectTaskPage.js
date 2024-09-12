import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RejectTaskPage = () => {
    const { processInstanceId } = useParams(); // Use processInstanceId instead of taskId

    useEffect(() => {
        const completeTask = async () => {
            try {
                // Fetch tasks associated with the process instance ID
                const tasksResponse = await fetch(`https://demo-aseguradoras.onrender.com/engine-rest/task?processInstanceId=${processInstanceId}`);
                
                if (!tasksResponse.ok) {
                    console.error('Failed to fetch tasks:', tasksResponse.statusText);
                    return;
                }

                const tasks = await tasksResponse.json();
                
                if (tasks.length === 0) {
                    console.error('No tasks found for the provided process instance ID');
                    return;
                }

                // Assuming you want to complete the first task found
                const task = tasks[0];

                // Complete the task
                const completeTaskResponse = await fetch(`https://demo-aseguradoras.onrender.com/engine-rest/task/${task.id}/complete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        variables: {
                            decision: { value: 'No', type: 'String' }
                        }
                    }),
                });

                if (completeTaskResponse.ok) {
                    console.log('Task completed successfully');
                } else {
                    console.error('Failed to complete task:', completeTaskResponse.statusText);
                }
            } catch (error) {
                console.error('Error completing task:', error);
            }
        };

        completeTask();
    }, [processInstanceId]);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Póliza Rechazada</h1>
            <p>Ha rechazado la póliza de seguro. Lamentamos que no esté interesado en esta oferta.</p>
        </div>
    );
};

export default RejectTaskPage;
