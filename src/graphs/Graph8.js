import React, { useEffect } from 'react';

const Graph8 = () => {
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
                ['Categoría de Rendimiento', 'Tiempo de Respuesta', 'Atención al Cliente', 'Conocimiento del Producto', 'Seguimiento'],
                ['Alto', 40, 30, 20, 10],
                ['Medio', 30, 25, 25, 20],
                ['Bajo', 20, 15, 30, 25],
            ]);

            const options = {
                title: 'Factores Clave de Éxito por Categoría de Rendimiento',
                chartArea: { width: '60%' },
                isStacked: true,
                hAxis: {
                    title: 'Puntuación Total de Factores',
                    minValue: 0,
                },
                vAxis: {
                    title: 'Categoría de Rendimiento',
                },
                colors: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a'],
            };

            const chart = new window.google.visualization.BarChart(document.getElementById('bar_chart'));
            chart.draw(data, options);
        };
    }, []);

    return <div id="bar_chart" style={{ width: '900px', height: '500px' }}></div>;
};

export default Graph8;
