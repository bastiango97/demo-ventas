import React, { useState } from 'react';
import SidebarStats from '../components/Sidebar_stats';
import Graph1 from '../graphs/Graph1';
import Graph2 from '../graphs/Graph2';
import Graph3 from '../graphs/Graph3';
import Graph4 from '../graphs/Graph4';
import Graph5 from '../graphs/Graph5';
import Graph6 from '../graphs/Graph6';
import Graph7 from '../graphs/Graph7';
import Graph8 from '../graphs/Graph8';

const Dashboard = () => {
    const [selectedGraph, setSelectedGraph] = useState('graph1');

    const renderGraphContent = () => {
        switch (selectedGraph) {
            case 'graph1':
                return <Graph1 />;
            case 'graph2':
                return <Graph2 />;
            case 'graph3':
                return <Graph3 />;
            case 'graph4':
                return <Graph4 />;
            case 'graph5':
                return <Graph5 />;
            case 'graph6':
                return <Graph6 />;
            case 'graph7':
                return <Graph7 />;
            case 'graph8':
                return <Graph8 />;
            default:
                return <h1>Selecciona un gráfico de la barra lateral</h1>;
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <SidebarStats selectedGraph={selectedGraph} setSelectedGraph={setSelectedGraph} />
            <div style={{ flex: 1, padding: '20px' }}>
                {renderGraphContent()}
            </div>
        </div>
    );
};

export default Dashboard;
