import React, { useEffect } from 'react';

const Graph2 = () => {
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
            // Datos: Número de prospectos por número de cotizaciones
            const data = window.google.visualization.arrayToDataTable([
                ['Número de Cotizaciones', 'Número de Prospectos'],
                ['1', 100],
                ['2', 80],
                ['3', 60],
                ['4', 40],
                ['5', 30],
                ['6', 20],
                ['7', 15],
                ['8', 10],
                ['9', 5],
                ['10 o más', 3],
            ]);

            const options = {
                title: 'Distribución de Prospectos por Número de Cotizaciones',
                chartArea: { width: '50%' },
                hAxis: {
                    title: 'Número de Cotizaciones',
                    minValue: 0,
                },
                vAxis: {
                    title: 'Número de Prospectos',
                },
            };

            const chart = new window.google.visualization.ColumnChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        };
    }, []);

    return <div id="chart_div" style={{ width: '900px', height: '500px' }}></div>;
};

export default Graph2;
