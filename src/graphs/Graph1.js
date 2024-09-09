import React, { useEffect } from 'react';

const Graph1 = () => {
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
            // Datos por día (ejemplo de 7 días)
            const dataDay = window.google.visualization.arrayToDataTable([
                ['Día', 'Prospectos'],
                ['Lunes', 100],
                ['Martes', 120],
                ['Miércoles', 150],
                ['Jueves', 80],
                ['Viernes', 130],
                ['Sábado', 90],
                ['Domingo', 70],
            ]);

            // Datos por semana (ejemplo de 4 semanas)
            const dataWeek = window.google.visualization.arrayToDataTable([
                ['Semana', 'Prospectos'],
                ['Semana 1', 400],
                ['Semana 2', 350],
                ['Semana 3', 500],
                ['Semana 4', 450],
            ]);

            // Datos por mes (ejemplo de 4 meses)
            const dataMonth = window.google.visualization.arrayToDataTable([
                ['Mes', 'Prospectos'],
                ['Enero', 1500],
                ['Febrero', 1200],
                ['Marzo', 1800],
                ['Abril', 1600],
            ]);

            const options = {
                title: 'Número de Prospectos Cotizados',
                chartArea: { width: '50%' },
                hAxis: {
                    title: 'Total de Prospectos',
                    minValue: 0,
                },
                vAxis: {
                    title: 'Periodo',
                },
            };

            const chart = new window.google.visualization.BarChart(document.getElementById('chart_div'));
            chart.draw(dataDay, options); // Por defecto se muestra el gráfico por día

            // Update chart based on selected period
            document.getElementById('period_selector').addEventListener('change', function () {
                const selectedOption = this.value;
                if (selectedOption === 'day') {
                    chart.draw(dataDay, options);
                } else if (selectedOption === 'week') {
                    chart.draw(dataWeek, options);
                } else if (selectedOption === 'month') {
                    chart.draw(dataMonth, options);
                }
            });
        };
    }, []);

    return (
        <div>
            <h3>Seleccione el periodo:</h3>
            <select id="period_selector">
                <option value="day">Día</option>
                <option value="week">Semana</option>
                <option value="month">Mes</option>
            </select>

            <div id="chart_div" style={{ width: '900px', height: '500px' }}></div>
        </div>
    );
};

export default Graph1;
