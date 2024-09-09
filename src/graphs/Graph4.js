import React, { useEffect } from 'react';

const Graph4 = () => {
    useEffect(() => {
        // Load the Google Charts script
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.onload = () => {
            window.google.charts.load('current', { packages: ['corechart', 'bar'] });
            window.google.charts.setOnLoadCallback(drawChart);
        };
        document.head.appendChild(script);

        const drawChart = () => {
            const data = window.google.visualization.arrayToDataTable([
                ['Razón', 'Ganados', 'Pérdidas'],
                ['Precio competitivo', 120, 30],
                ['Atención al cliente', 90, 40],
                ['Cobertura ofrecida', 80, 50],
                ['Marca del vehículo', 70, 60],
                ['Recomendaciones', 100, 20],
            ]);

            const options = {
                title: 'Razones de Pérdida y Ganados de Prospectos',
                chartArea: { width: '50%' },
                hAxis: {
                    title: 'Número de Prospectos',
                    minValue: 0,
                },
                vAxis: {
                    title: 'Razón',
                },
                bars: 'horizontal',
                series: {
                    0: { color: '#1b9e77' }, // Verde para ganados
                    1: { color: '#d95f02' }, // Naranja para pérdidas
                },
            };

            const chart = new window.google.visualization.BarChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        };
    }, []);

    return <div id="chart_div" style={{ width: '900px', height: '500px' }}></div>;
};

export default Graph4;
