import React, { useEffect } from 'react';

const Graph3 = () => {
    useEffect(() => {
        // Load the Google Charts script
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.onload = () => {
            window.google.charts.load('current', { packages: ['corechart'] });
            window.google.charts.setOnLoadCallback(drawChart);
        };
        document.head.appendChild(script);

        const drawChart = () => {
            const data = window.google.visualization.arrayToDataTable([
                ['Estado', 'Cantidad de Prospectos'],
                ['Ganados', 300],
                ['Venta Caída', 150],
            ]);

            const options = {
                title: 'Distribución de Prospectos Ganados vs Ventas Caídas',
                pieHole: 0.4,
                slices: {
                    0: { color: '#1b9e77' }, // Verde para ganados
                    1: { color: '#d95f02' }, // Naranja para ventas caídas
                },
            };

            const chart = new window.google.visualization.PieChart(document.getElementById('donut_chart'));
            chart.draw(data, options);
        };
    }, []);

    return <div id="donut_chart" style={{ width: '900px', height: '500px' }}></div>;
};

export default Graph3;
