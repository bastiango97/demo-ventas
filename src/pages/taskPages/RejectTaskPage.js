import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RejectTaskPage = () => {
    const { taskId } = useParams();

    useEffect(() => {
        const completeTask = async () => {
            try {
                const response = await fetch(`https://demo-aseguradoras.onrender.com/engine-rest/task/${taskId}/complete`, {
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

                if (response.ok) {
                    console.log('Task completed successfully');
                } else {
                    console.error('Failed to complete task:', response.statusText);
                }
            } catch (error) {
                console.error('Error completing task:', error);
            }
        };

        completeTask();
    }, [taskId]);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Póliza Rechazada</h1>
            <p>Ha rechazado la póliza de seguro. Lamentamos que no esté interesado en esta oferta.</p>
        </div>
    );
};

export default RejectTaskPage;
