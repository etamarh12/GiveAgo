import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import TopBar from './topBar/topBar';
import axios from 'axios';
import {
    StyledFooter,
    StyledPage,
    StyledHeader,
    StyledParagraph,
    StyledArticle,
    StyledChartContainer,
    StyledCanvas,
} from './homePage.styled';

export const HomePage = () => {
    const [chartData, setChartData] = useState({
        labels: ['הזמנות חדשות', 'הזמנות בהמתנה', 'הזמנות סגורות', 'סה"כ הזמנות'],
        datasets: [
            {
                label: 'מצב ההזמנות',
                data: [150, 200, 300, 250, 400, 350],
                backgroundColor: [
                    'rgba(255, 99, 133, 0.147)',
                    'rgba(153, 102, 255, 0.34)',
                    'rgba(255, 204, 86, 0.27)',
                    'rgba(75, 192, 192, 0.326)',
                    'rgba(13, 113, 180, 0.348)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(131, 64, 255)',
                    'rgb(255, 205, 86)',
                    'rgb(20, 220, 164)',
                ],
                borderWidth: 1,
            },
        ],
    });

    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3001/api/orders/filteredOrders');
                const { newOrders, waitingOrders, closedOrders, totalOrders } = response.data;
                setChartData(prevChartData => ({
                    ...prevChartData,
                    datasets: [
                        {
                            ...prevChartData.datasets[0],
                            data: [newOrders, waitingOrders, closedOrders, totalOrders],
                        },
                    ],
                }));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const ctx = document.getElementById('chartCanvas').getContext('2d');

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                weight: 'bold',
                                size: 15,
                            },
                            color: '#000000b8',
                        },
                    },
                    x: {
                        ticks: {
                            font: {
                                weight: 'bold',
                                size: 15,
                            },
                            color: '#000000b8',
                        },
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                weight: 'bold',
                                size: 15,
                            },
                            color: '#000000b8',
                        },
                    },
                },
            },
        });
    }, [chartData]);

    return (
        <StyledPage>
            <TopBar />
            <StyledHeader>
                <StyledArticle>
                    <StyledParagraph>
                        פלטפורמה למשלוחים שנועדה לסייע לעסקים למסור את המשלוחים שלהם בצורה יעילה ונכונה ללקוחותיהם.
                    </StyledParagraph>
                    <StyledParagraph>
                        באמצעות האתר שלנו, ניתן לקלוט פניות למשלוח ולהבטיח משלוח מהיר ונוח ללקוחות.
                        הפתרון המושלם לעסקים שרוצים לספק משלוחים ללקוחותיהם בצורה יעילה ומסודרת.
                    </StyledParagraph>
                </StyledArticle>
                <StyledChartContainer>
                    <StyledCanvas id="chartCanvas"></StyledCanvas>
                </StyledChartContainer>
            </StyledHeader>
            <StyledFooter>זכויות יוצרים © 2023 ChenWave R&D. כל הזכויות שמורות</StyledFooter>
        </StyledPage>
    );
};