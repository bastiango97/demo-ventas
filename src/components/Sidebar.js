import React, { useState } from 'react';
import './Sidebar.css';
import TaskInstance from './TaskInstance';
import Modal from './Modal';

const Sidebar = ({ selectedTask, setSelectedTask, tasks, fetchTasks }) => {
    const [activeSections, setActiveSections] = useState({
        RevisarCotizacion: false,
        EnviarCotizacion: false,
        CambiosPoliza: false,
    });

    const [showModal, setShowModal] = useState(false);

    const toggleSection = (section) => {
        setActiveSections((prevSections) => ({
            ...prevSections,
            [section]: !prevSections[section]
        }));
    };

    const handleTaskSelection = (task) => {
        setSelectedTask(task);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleConfirm = () => {
        setShowModal(false);
    };

    const categorizeTasks = (tasks) => {
        if (!Array.isArray(tasks)) return { EnviarCotizacion: [], RevisarCotizacion: [], CambiosPoliza: [] };
        return {
            EnviarCotizacion: tasks.filter(task => task.name === 'Cotización'),
            RevisarCotizacion: tasks.filter(task => task.name === 'Revisar cotización'),
            CambiosPoliza: tasks.filter(task => task.name === 'Cambios en Póliza'),
        };
    };

    const categorizedTasks = categorizeTasks(tasks);

    return (
        <div className="sidebar">
            <div className="sidebar-header-container">
                <h2>Procesos</h2>
                <button className="create-button" onClick={openModal}>Nueva Venta</button>
            </div>
            <div className="sidebar-tasks-container">
                {/* Enviar Cotización a Cliente Section */}
                <div className="sidebar-section">
                    <div className="sidebar-header" onClick={() => toggleSection('EnviarCotizacion')}>
                        Enviar Cotización a Cliente <span>{activeSections.EnviarCotizacion ? '▲' : '▼'}</span>
                    </div>
                    {activeSections.EnviarCotizacion && (
                        <div className="sidebar-content">
                            {categorizedTasks.EnviarCotizacion.map(task => (
                                <TaskInstance
                                    key={task.id}
                                    id={task.id}
                                    name={task.name}
                                    createdTime={new Date(task.created).toLocaleString()}
                                    clientName={task.variables?.nomCliente?.value || 'Desconocido'}
                                    carModelYear={`${task.variables?.marca?.value || 'Marca desconocida'} ${task.variables?.year?.value || 'Año desconocido'}`}
                                    premium={task.variables?.prima?.value || 'Desconocido'}
                                    priority={task.variables?.closureProbability?.value || 'Desconocido'}
                                    isSelected={selectedTask && selectedTask.id === task.id}
                                    onClick={() => handleTaskSelection(task)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Revisar Cotización Section */}
                <div className="sidebar-section">
                    <div className="sidebar-header" onClick={() => toggleSection('RevisarCotizacion')}>
                        Revisar Cotización <span>{activeSections.RevisarCotizacion ? '▲' : '▼'}</span>
                    </div>
                    {activeSections.RevisarCotizacion && (
                        <div className="sidebar-content">
                            {categorizedTasks.RevisarCotizacion.map(task => (
                                <TaskInstance
                                    key={task.id}
                                    id={task.id}
                                    name={task.name}
                                    createdTime={new Date(task.created).toLocaleString()}
                                    clientName={task.variables?.nomCliente?.value || 'Desconocido'}
                                    carModelYear={`${task.variables?.marca?.value || 'Marca desconocida'} ${task.variables?.year?.value || 'Año desconocido'}`}
                                    premium={task.variables?.prima?.value || 'Desconocido'}
                                    priority={task.variables?.closureProbability?.value || 'Desconocido'}
                                    isSelected={selectedTask && selectedTask.id === task.id}
                                    onClick={() => handleTaskSelection(task)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Cambios en Póliza Section */}
                <div className="sidebar-section">
                    <div className="sidebar-header" onClick={() => toggleSection('CambiosPoliza')}>
                        Cambios en Póliza <span>{activeSections.CambiosPoliza ? '▲' : '▼'}</span>
                    </div>
                    {activeSections.CambiosPoliza && (
                        <div className="sidebar-content">
                            {categorizedTasks.CambiosPoliza.map(task => (
                                <TaskInstance
                                    key={task.id}
                                    id={task.id}
                                    name={task.name}
                                    createdTime={new Date(task.created).toLocaleString()}
                                    clientName={task.variables?.nomCliente?.value || 'Desconocido'}
                                    carModelYear={`${task.variables?.marca?.value || 'Marca desconocida'} ${task.variables?.year?.value || 'Año desconocido'}`}
                                    premium={task.variables?.prima?.value || 'Desconocido'}
                                    priority={task.variables?.closureProbability?.value || 'Desconocido'}
                                    isSelected={selectedTask && selectedTask.id === task.id}
                                    onClick={() => handleTaskSelection(task)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Component */}
            <Modal show={showModal} handleClose={closeModal} handleConfirm={handleConfirm} fetchTasks={fetchTasks}   />
        </div>
    );
};

export default Sidebar;
