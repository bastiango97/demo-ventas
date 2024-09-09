import React, { useEffect } from 'react';

const Graph7 = () => {
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
                ['Mes', 'Prospectos Nuevos Acumulados', 'Meta Acumulada'],
                ['Enero', 20, 25],
                ['Febrero', 50, 50],
                ['Marzo', 85, 75],
                ['Abril', 125, 100],
                ['Mayo', 175, 125],
                ['Junio', 235, 150],
            ]);

            const options = {
                title: 'Crecimiento Acumulado de Prospectos Nuevos vs Meta',
                hAxis: { title: 'Mes' },
                vAxis: { title: 'Número de Prospectos' },
                isStacked: true,
                colors: ['#1b9e77', '#d95f02'],
            };

            const chart = new window.google.visualization.AreaChart(document.getElementById('area_chart'));
            chart.draw(data, options);
        };
    }, []);

    return <div id="area_chart" style={{ width: '900px', height: '500px' }}></div>;
};

export default Graph7;
