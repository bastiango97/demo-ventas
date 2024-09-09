import React, { useEffect } from 'react';

const Graph6 = () => {
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
                ['Días', 'Número de Prospectos'],
                ['1', 4],
                ['2', 5],
                ['3', 7],
                ['4', 6],
                ['5', 3],
                ['6', 8],
                ['7', 10],
                ['8', 12],
                ['9', 9],
                ['10', 5],
                ['11', 4],
                ['12', 3],
                ['13', 2],
                ['14', 1],
                ['15', 0],
                ['16', 1],
                ['17', 1],
                ['18', 0],
                ['19', 0],
                ['20', 1],
                ['21', 1],
                ['22', 0],
                ['23', 0],
                ['24', 0],
                ['25', 1],
                ['26', 0],
                ['27', 1],
                ['28', 0],
                ['29', 0],
                ['30', 0],
            ]);

            const options = {
                title: 'Distribución de Tiempos de Respuesta de los Prospectos',
                hAxis: {
                    title: 'Días hasta la Respuesta',
                    minValue: 0,
                    maxValue: 30,
                },
                vAxis: {
                    title: 'Número de Prospectos',
                    minValue: 0,
                },
                legend: { position: 'none' },
            };

            const chart = new window.google.visualization.ColumnChart(document.getElementById('histogram_chart'));
            chart.draw(data, options);
        };
    }, []);

    return <div id="histogram_chart" style={{ width: '900px', height: '500px' }}></div>;
};

export default Graph6;
