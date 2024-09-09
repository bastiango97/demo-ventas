import React, { useState } from 'react';
import './RevisarCotizacion.css';

const RevisarCotizacion = ({ task, fetchTasks }) => {  // Added fetchTasks as a prop
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Extract client information from task variables
    const clientInfo = {
        name: task.variables?.nomCliente?.value || 'Desconocido',
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
    };

    const handleCompleteTask = async (decision, message) => {
        setModalVisible(true);
        setIsLoading(true);

        try {
            const response = await fetch(`https://demo-aseguradoras.onrender.com/engine-rest/task/${task.id}/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    variables: {
                        decision: { value: decision, type: 'String' }
                    }
                })
            });

            if (response.ok) {
                setModalMessage(message);
                fetchTasks();  // Reload tasks after successful completion
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

    const handleAccept = () => handleCompleteTask('Si', 'La póliza ha sido emitida exitosamente.');

    const handleReject = () => handleCompleteTask('No', 'La cotización ha sido rechazada.');

    const handleRequestChanges = () => handleCompleteTask('Cambio', 'Se ha solicitado cambios en la cotización.');

    const closeModal = () => {
        setModalVisible(false);
        setModalMessage('');
    };

    return (
        <div className="revisar-cotizacion-container">
            <h2>Revisar Cotización</h2>
            <p><strong>Nombre del Cliente:</strong> {clientInfo.name}</p>
            <p><strong>Correo Electrónico:</strong> {clientInfo.email}</p>
            <p><strong>Teléfono:</strong> {clientInfo.phone}</p>
            <p><strong>Código Postal:</strong> {clientInfo.postalCode}</p>

            <div className="quote-details">
                <h3>Detalles del Automóvil</h3>
                <p><strong>Marca:</strong> {clientInfo.carMake}</p>
                <p><strong>Modelo:</strong> {clientInfo.carModel}</p>
                <p><strong>Año:</strong> {clientInfo.carYear}</p>
                <p><strong>Paquete de Cobertura:</strong> {clientInfo.coveragePackage}</p>

                <h3>Información de la Cotización</h3>
                <p><strong>Prima:</strong> {calculatedData.premium}</p>
            </div>

            <div className="action-buttons">
                <button onClick={handleAccept}>Aceptar y emitir Póliza</button>
                <button className="reject-button" onClick={handleReject}>Rechazar</button>
                <button className="changes-button" onClick={handleRequestChanges}>Solicitar Cambios</button>
            </div>

            {modalVisible && (
                <div className="custom-modal-overlay-alt">
                    <div className="custom-modal-alt">
                        {isLoading ? (
                            <div className="loading-spinner-alt"></div>
                        ) : (
                            <>
                                <p>{modalMessage}</p>
                                <button className="modal-close-button-alt" onClick={closeModal}>Cerrar</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RevisarCotizacion;
