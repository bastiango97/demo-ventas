import React from 'react';
import './Sidebar_stats.css';

const SidebarStats = ({ selectedGraph, setSelectedGraph }) => {

    const handleGraphSelection = (graphId) => {
        setSelectedGraph(graphId);
    };

    return (
        <div className="sidebar-stats">
            <div className="sidebar-stats-header-container">
                <h2>Estadísticas</h2>
            </div>
            <div className="sidebar-stats-content">
                {/* List of Graphs */}
                <div className="sidebar-stats-section" onClick={() => handleGraphSelection('graph1')}>
                    <div className={`sidebar-stats-header ${selectedGraph === 'graph1' ? 'stats-active' : ''}`}>
                        Número de prospectos cotizados
                    </div>
                </div>
                <div className="sidebar-stats-section" onClick={() => handleGraphSelection('graph2')}>
                    <div className={`sidebar-stats-header ${selectedGraph === 'graph2' ? 'stats-active' : ''}`}>
                        Cotizaciones realizadas por prospecto
                    </div>
                </div>
                <div className="sidebar-stats-section" onClick={() => handleGraphSelection('graph3')}>
                    <div className={`sidebar-stats-header ${selectedGraph === 'graph3' ? 'stats-active' : ''}`}>
                        Prospectos ganados y ventas caídas
                    </div>
                </div>
                <div className="sidebar-stats-section" onClick={() => handleGraphSelection('graph4')}>
                    <div className={`sidebar-stats-header ${selectedGraph === 'graph4' ? 'stats-active' : ''}`}>
                        Razones de pérdida y ganados
                    </div>
                </div>
                <div className="sidebar-stats-section" onClick={() => handleGraphSelection('graph5')}>
                    <div className={`sidebar-stats-header ${selectedGraph === 'graph5' ? 'stats-active' : ''}`}>
                        Probabilidad de cierre por perfil
                    </div>
                </div>
                <div className="sidebar-stats-section" onClick={() => handleGraphSelection('graph6')}>
                    <div className={`sidebar-stats-header ${selectedGraph === 'graph6' ? 'stats-active' : ''}`}>
                        Tiempo de respuesta del prospecto
                    </div>
                </div>
                <div className="sidebar-stats-section" onClick={() => handleGraphSelection('graph7')}>
                    <div className={`sidebar-stats-header ${selectedGraph === 'graph7' ? 'stats-active' : ''}`}>
                        Crecimiento de prospectos nuevos
                    </div>
                </div>
                <div className="sidebar-stats-section" onClick={() => handleGraphSelection('graph8')}>
                    <div className={`sidebar-stats-header ${selectedGraph === 'graph8' ? 'stats-active' : ''}`}>
                        Factores de éxito por categoría
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarStats;
