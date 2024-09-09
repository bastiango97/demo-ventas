import React, { useEffect } from 'react';

const Graph5 = () => {
    useEffect(() => {
        // Load the Google Charts script
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.onload = () => {
            window.google.charts.load('current', { packages: ['corechart', 'bar'] });
            window.google.charts.setOnLoadCallback(drawCharts);
        };
        document.head.appendChild(script);

        const drawCharts = () => {
            // Data for Alto profile
            const dataAlto = window.google.visualization.arrayToDataTable([
                ['Rango de Probabilidad', 'Número de Prospectos'],
                ['0-20%', 5],
                ['21-40%', 15],
                ['41-60%', 40],
                ['61-80%', 60],
                ['81-100%', 80],
            ]);

            // Data for Medio profile
            const dataMedio = window.google.visualization.arrayToDataTable([
                ['Rango de Probabilidad', 'Número de Prospectos'],
                ['0-20%', 10],
                ['21-40%', 30],
                ['41-60%', 45],
                ['61-80%', 50],
                ['81-100%', 25],
            ]);

            // Data for Bajo profile
            const dataBajo = window.google.visualization.arrayToDataTable([
                ['Rango de Probabilidad', 'Número de Prospectos'],
                ['0-20%', 25],
                ['21-40%', 40],
                ['41-60%', 50],
                ['61-80%', 20],
                ['81-100%', 10],
            ]);

            const options = {
                title: 'Distribución de Probabilidad de Venta',
                chartArea: { width: '50%' },
                hAxis: {
                    title: 'Número de Prospectos',
                    minValue: 0,
                },
                vAxis: {
                    title: 'Rango de Probabilidad',
                },
            };

            const chartAlto = new window.google.visualization.BarChart(document.getElementById('chart_alto'));
            chartAlto.draw(dataAlto, options);

            const chartMedio = new window.google.visualization.BarChart(document.getElementById('chart_medio'));
            chartMedio.draw(dataMedio, options);

            const chartBajo = new window.google.visualization.BarChart(document.getElementById('chart_bajo'));
            chartBajo.draw(dataBajo, options);
        };
    }, []);

    return (
        <div>
            <h3>Perfil Alto</h3>
            <div id="chart_alto" style={{ width: '900px', height: '300px' }}></div>

            <h3>Perfil Medio</h3>
            <div id="chart_medio" style={{ width: '900px', height: '300px' }}></div>

            <h3>Perfil Bajo</h3>
            <div id="chart_bajo" style={{ width: '900px', height: '300px' }}></div>
        </div>
    );
};

export default Graph5;
