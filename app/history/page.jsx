"use client"

import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSession } from "next-auth/react";

Chart.register(...registerables);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const renderChart = (chartType, canvasId, labels, datasets) => {
    const chartData = {
        labels: labels,
        datasets: datasets
    };

    const chartElement = document.getElementById(canvasId);

    new Chart(chartElement, {
        type: chartType,
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: chartType === 'bar' ? {
                x: {
                    grid: {
                        display: false
                    },
                    stacked: true // Add this line
                },
                y: {
                    beginAtZero: true,
                    stacked: true // Add this line
                }
            } : {},
            plugins: chartType === 'pie' ? {
                legend: {
                    display: false,
                }
            } : {}
        }
    });
};

export default function Page() {
    const { data: session, status } = useSession();
    const [userMeals, setUserMeals] = useState([]);

    useEffect(() => {
        fetch('/api/meal', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(mealsData => {

                const meals = mealsData
                    .filter(meal => meal.user === session.user._id)
                    .sort((a, b) => new Date(a.date) - new Date(b.date));

                setUserMeals(meals);
            })
            .catch(err => console.error("Error loading meals: ", err));
    }, [status, session]);

    useEffect(() => {
        if (userMeals.length > 0) {
            const labels = userMeals.map(meal => formatDate(meal.date));
            let totalProteins = 0;
            let totalCarbs = 0;
            let totalFats = 0;
            const stackBarData = [];
            const calories = [];

            userMeals.forEach(meal => {
                const totalNutrition = meal.productsList.reduce((total, product) => ({
                    proteins: total.proteins + (product.proteins * (product.quantity || 1)),
                    carbs: total.carbs + (product.carbs * (product.quantity || 1)),
                    fat: total.fat + (product.fat * (product.quantity || 1)),
                }), { proteins: 0, carbs: 0, fat: 0 });

                stackBarData.push(totalNutrition);
                calories.push(totalNutrition.proteins*4 + totalNutrition.carbs*4 + totalNutrition.fat*9);

                totalProteins += totalNutrition.proteins;
                totalCarbs += totalNutrition.carbs;
                totalFats += totalNutrition.fat;
            });

            // Pie Chart
            renderChart('doughnut', 'macroPieChart', ['Proteins', 'Carbs', 'Fats'], [{
                data: [totalProteins, totalCarbs, totalFats],
                backgroundColor: ['rgb(255,175,204)', 'rgb(205,180,219)', 'rgb(162,210,255)'],
            }]);

            // Stacked Bar Chart
            renderChart('bar', 'nutritionChart', labels, [{
                label: 'Proteins',
                data: stackBarData.map(data => data.proteins),
                backgroundColor: 'rgb(255,175,204)',
            }, {
                label: 'Carbs',
                data: stackBarData.map(data => data.carbs),
                backgroundColor: 'rgb(205,180,219)',
            }, {
                label: 'Fat',
                data: stackBarData.map(data => data.fat),
                backgroundColor: 'rgb(162,210,255)',
            }]);

            // Line Chart for Calories
            renderChart('line', 'caloriesChart', labels, [{
                label: 'Calories',
                data: calories,
                borderColor: 'rgb(255,99,247)',
                fill: true,
                backgroundColor: 'rgba(255,99,247,0.2)',
                lineTension: 0.1,
            }]);

        }
    }, [userMeals]);

    return (
        <>
            <h1 className="text-4xl mt-8 mb-4 font-light uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">
                Meals history:
            </h1>

            <h2>Macronutrition</h2>
            <div className="flex flex-col sm:flex-row justify-between">
                <div className="flex-1 sm:mr-4 lg:flex-initial">
                    <canvas id="macroPieChart" />
                </div>
                <div className="flex-1">
                    <canvas id="nutritionChart" />
                </div>
            </div>

            <div className="mt-8">
                <h2>Calories intake</h2>
                <canvas id="caloriesChart" />
            </div>
        </>
    );

}
