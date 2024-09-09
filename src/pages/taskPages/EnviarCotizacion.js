import React, { useState } from 'react';
import './EnviarCotizacion.css';

const EnviarCotizacion = ({ task, fetchTasks }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    // Extract client information from task variables
    const clientInfo = {
        name: task.variables?.nomCliente?.value || 'Desconocido',
        gender: task.variables?.select_pkuo0o?.value || 'Desconocido',
        email: task.variables?.correoCliente?.value || 'Desconocido',
        phone: task.variables?.telefonoCliente?.value || 'Desconocido',
        postalCode: task.variables?.codigoPostal?.value || 'Desconocido',
        carMake: task.variables?.marca?.value || 'Desconocido',
        carModel: task.variables?.modelo?.value || 'Desconocido',
        carYear: task.variables?.year?.value || 'Desconocido',
        coveragePackage: task.variables?.paquete?.value || 'Desconocido',
    };

    const calculatedData = {
        premium: task.variables?.prima?.value || 'Desconocido',
        priority: task.variables?.closureProbability?.value || 'Desconocido',
    };

    const handleCompleteTask = async () => {
        setModalVisible(true);
        setIsLoading(true);

        try {
            const response = await fetch(`https://demo-aseguradoras.onrender.com/engine-rest/task/${task.id}/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}) // Empty JSON body
            });

            if (response.ok) {
                setIsSuccess(true);
                fetchTasks(); // Call fetchTasks after the task is completed to refresh the sidebar
            } else {
                const errorText = await response.text();
                console.error('Failed to complete task:', errorText);
                alert(`Failed to complete the task. Server responded with status: ${response.status}, message: ${errorText}`);
            }
        } catch (error) {
            console.error('Error while completing task:', error);
            alert(`An error occurred while completing the task. Details: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setIsSuccess(false);
    };

    return (
        <div className="enviar-cotizacion-container">
            <h2>Enviar Cotización</h2>
            <p><strong>Nombre del Cliente:</strong> {clientInfo.name}</p>
            <p><strong>Género:</strong> {clientInfo.gender}</p>
            <p><strong>Correo del Cliente:</strong> {clientInfo.email}</p>
            <p><strong>Teléfono:</strong> {clientInfo.phone}</p>
            <p><strong>Código Postal:</strong> {clientInfo.postalCode}</p>

            <h3>Información del Automóvil</h3>
            <p><strong>Marca:</strong> {clientInfo.carMake}</p>
            <p><strong>Modelo:</strong> {clientInfo.carModel}</p>
            <p><strong>Año:</strong> {clientInfo.carYear}</p>
            <p><strong>Paquete de Cobertura:</strong> {clientInfo.coveragePackage}</p>

            <h3>Información Calculada</h3>
            <p><strong>Prima:</strong> {calculatedData.premium}</p>
            <p><strong>Prioridad:</strong> {calculatedData.priority}</p>

            <button className="complete-task-button" onClick={handleCompleteTask}>
                Enviar a Cliente
            </button>

            {modalVisible && (
                <div className="custom-modal-overlay-alt">
                    <div className="custom-modal-alt">
                        {isLoading ? (
                            <div className="loading-spinner-alt"></div>
                        ) : isSuccess ? (
                            <>
                                <p>Se ha enviado la cotización al cliente.</p>
                                <button className="modal-close-button-alt" onClick={closeModal}>Cerrar</button>
                            </>
                        ) : (
                            <>
                                <p>Algo salió mal. Inténtalo de nuevo.</p>
                                <button className="modal-close-button-alt" onClick={closeModal}>Cerrar</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnviarCotizacion;

