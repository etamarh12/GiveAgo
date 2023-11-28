import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';

const HomeChart = () => {
  const [chartData, setChartData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/orders/filteredOrders');
        setChartData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!chartData) return;

    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);

    var option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: chartData.newOrders, name: 'הזמנות חדשות' },
            { value: chartData.waitingOrders, name: 'הזמנות בהמתנה' },
            { value: chartData.closedOrders, name: 'הזמנות סגורות' },
            { value: chartData.totalOrders, name: 'סך הכל הזמנות' }
          ]
        }
      ]
    };

    option && myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [chartData]);
  return (
    <div id="main" style={{ width: '100%', height: '400px' }}></div>
  );
}

export default HomeChart;
