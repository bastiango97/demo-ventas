import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, handleConfirm, fetchTasks }) => {
    const [formData, setFormData] = useState({
        clienteNombre: '',
        genero: '',
        correoCliente: '',
        telefono: '',
        codigoPostal: '',
        marca: '',
        modelo: '',
        ano: '',
        paqueteCobertura: '',
        nomAgente: '',
        correoAgente: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    
    

const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading animation
    setIsLoading(true);
    setIsSuccess(false);

    try {
        

        // Start a new BPMN process instance
        const processStartResponse = await fetch('https://demo-aseguradoras.onrender.com/engine-rest/process-definition/key/demo-aseguradoras-process/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}) // Empty JSON body
        });

        if (!processStartResponse.ok) throw new Error('Failed to start the process');

        const processInstance = await processStartResponse.json();

        // Now fetch the tasks for this process instance to get the first task
        const tasksResponse = await fetch(`https://demo-aseguradoras.onrender.com/engine-rest/task?processInstanceId=${processInstance.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!tasksResponse.ok) throw new Error('Failed to fetch tasks');

        const tasks = await tasksResponse.json();
        const firstTask = tasks.find(task => task.name === 'Capturar datos para Cotización');

        if (!firstTask) throw new Error('No matching task found');

        

        // Complete the first task with form data
        const completeTaskResponse = await fetch(`https://demo-aseguradoras.onrender.com/engine-rest/task/${firstTask.id}/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                variables: {
                    nomCliente: { value: formData.clienteNombre, type: 'String' },
                    genero: { value: formData.genero, type: 'String' },
                    correoCliente: { value: formData.correoCliente, type: 'String' },
                    telefonoCliente: { value: formData.telefono, type: 'String' },
                    codigoPostal: { value: formData.codigoPostal, type: 'String' },
                    marca: { value: formData.marca, type: 'String' },
                    modelo: { value: formData.modelo, type: 'String' },
                    year: { value: formData.ano, type: 'String' },
                    paquete: { value: formData.paqueteCobertura, type: 'String' },
                    nomAgente: { value: formData.nomAgente, type: 'String' },
                    correoAgente: { value: formData.correoAgente, type: 'String' },
                },
            }),
        });

        if (!completeTaskResponse.ok) throw new Error('Failed to complete the task');

        setIsSuccess(true);

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    } finally {
        console.log(fetchTasks); // Check if this is correctly passed
        setIsLoading(false); // Stop loading animation
        if (fetchTasks) {
            fetchTasks(); // Refresh the tasks list
        }
    }
};

    const handleResetForm = () => {
        setFormData({
            clienteNombre: '',
            genero: '',
            correoCliente: '',
            telefono: '',
            codigoPostal: '',
            marca: '',
            modelo: '',
            ano: '',
            paqueteCobertura: '',
            nomAgente: '',
            correoAgente: '',
        });
        setIsSuccess(false);
        handleClose();
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                {!isLoading && !isSuccess && (
                    <>
                        <button className="modal-close" onClick={handleClose}>×</button>
                        <h2 className="modal-title">Iniciar Nueva Venta</h2>
                        <form onSubmit={handleSubmit} className="modal-form">
                            <div className="modal-form-group">
                                <label>Nombre del Cliente</label>
                                <input 
                                    type="text" 
                                    name="clienteNombre" 
                                    value={formData.clienteNombre} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="modal-form-group">
                                <label>Género</label>
                                <select 
                                    name="genero" 
                                    value={formData.genero} 
                                    onChange={handleChange} 
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </select>
                            </div>
                            <div className="modal-form-group">
                                <label>Correo del Cliente</label>
                                <input 
                                    type="email" 
                                    name="correoCliente" 
                                    value={formData.correoCliente} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="modal-form-group">
                                <label>Teléfono</label>
                                <input 
                                    type="tel" 
                                    name="telefono" 
                                    value={formData.telefono} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="modal-form-group">
                                <label>Código Postal</label>
                                <input 
                                    type="text" 
                                    name="codigoPostal" 
                                    value={formData.codigoPostal} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="modal-form-group">
                                <label>Marca</label>
                                <input 
                                    type="text" 
                                    name="marca" 
                                    value={formData.marca} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="modal-form-group">
                                <label>Modelo</label>
                                <input 
                                    type="text" 
                                    name="modelo" 
                                    value={formData.modelo} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="modal-form-group">
                                <label>Año</label>
                                <input 
                                    type="text" 
                                    name="ano" 
                                    value={formData.ano} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="modal-form-group">
                                <label>Paquete de Cobertura</label>
                                <select 
                                    name="paqueteCobertura" 
                                    value={formData.paqueteCobertura} 
                                    onChange={handleChange} 
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Amplia">Amplia</option>
                                    <option value="Limitada">Limitada</option>
                                    <option value="Responsabilidad Civil">Responsabilidad Civil</option>
                                </select>
                            </div>
                            <div className="modal-form-group">
                                <label>Nombre del Agente</label>
                                <input 
                                    type="text" 
                                    name="nomAgente" 
                                    value={formData.nomAgente} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="modal-form-group">
                                <label>Correo del Agente</label>
                                <input 
                                    type="email" 
                                    name="correoAgente" 
                                    value={formData.correoAgente} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="submit" className="modal-button confirm">Iniciar Venta</button>
                                <button type="button" className="modal-button cancel" onClick={handleClose}>Cancelar</button>
                            </div>
                        </form>
                    </>
                )}

                {isLoading && (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Creando Venta...</p>
                    </div>
                )}

                {isSuccess && (
                    <div className="success-message">
                                                <p>Se ha creado la venta correctamente. ¡Gracias por su confianza!</p>
                        <button onClick={handleResetForm} className="modal-button confirm">Cerrar</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;

