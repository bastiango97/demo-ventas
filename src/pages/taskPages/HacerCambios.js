import React, { useState, useEffect } from 'react';
import './HacerCambios.css';

const HacerCambios = ({ task, fetchTasks }) => {  // Accept fetchTasks as a prop
    const [selectedCoverage, setSelectedCoverage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Load the initial coverage option when the component mounts
    useEffect(() => {
        const initialCoverage = task.variables?.paquete?.value || 'Amplia'; // Default to 'Amplia' if not found
        setSelectedCoverage(initialCoverage);
    }, [task.variables]);

    const handleCoverageChange = (event) => {
        setSelectedCoverage(event.target.value);
    };

    const handleSubmit = async () => {
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
                        paquete: { value: selectedCoverage, type: 'String' }
                    }
                })
            });

            if (response.ok) {
                setModalMessage(`Paquete de Cobertura actualizado a: ${selectedCoverage}`);
                fetchTasks();  // Reload tasks after successful completion
            } else {
                const errorText = await response.text();
                console.error('Failed to complete task:', errorText);
                alert(`Failed to update coverage. Server responded with status: ${response.status}, message: ${errorText}`);
            }
        } catch (error) {
            console.error('Error while updating coverage:', error);
            alert(`An error occurred while updating coverage. Details: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalMessage('');
    };

    return (
        <div className="hacer-cambios-container">
            <h2>Hacer Cambios en Paquete de Cobertura</h2>
            <p>Seleccione la opción de cobertura que desea cambiar:</p>

            <div className="coverage-options">
                <label>
                    <input
                        type="radio"
                        value="Amplia"
                        checked={selectedCoverage === 'Amplia'}
                        onChange={handleCoverageChange}
                    />
                    Amplia
                </label>
                <label>
                    <input
                        type="radio"
                        value="Limitada"
                        checked={selectedCoverage === 'Limitada'}
                        onChange={handleCoverageChange}
                    />
                    Limitada
                </label>
                <label>
                    <input
                        type="radio"
                        value="Responsabilidad Civil"
                        checked={selectedCoverage === 'Responsabilidad Civil'}
                        onChange={handleCoverageChange}
                    />
                    Responsabilidad Civil
                </label>
            </div>

            <div className="action-buttons">
                <button onClick={handleSubmit}>Confirmar Cambios</button>
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

export default HacerCambios;
