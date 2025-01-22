import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

const LineChart2 = () => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const createChart = () => {
      Chart.register(
        LineController,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement
      );
      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "Mar 1",
            "Mar 2",
            "Mar 3",
            "Mar 4",
            "Mar 5",
            "Mar 6",
            "Mar 7",
            "Mar 8",
            "Mar 9",
            "Mar 10",
            "Mar 11",
            "Mar 12",
            "Mar 13",
          ],
          datasets: [
            {
              label: "Data 1",
              data: [
                10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849,
                24159, 32651, 31984, 38451,
              ],
              backgroundColor: "rgba(2,117,216,0.2)",
              borderColor: "rgba(2,117,216,1)",
              pointRadius: 5,
              pointBackgroundColor: "rgba(2,117,216,1)",
              pointBorderColor: "rgba(255,255,255,0.8)",
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(2,117,216,1)",
              pointHitRadius: 50,
              pointBorderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "category", // Change to category if you're using simple labels
              grid: {
                display: false,
              },
              ticks: {
                maxTicksLimit: 7,
              },
            },
            y: {
              type: "linear", // y-axis is linear
              ticks: {
                min: 0,
                max: 40000,
                maxTicksLimit: 5,
              },
              grid: {
                color: "rgba(0, 0, 0, .125)",
              },
            },
          },
          legend: {
            display: false,
          },
        },
      });
    };

    const destroyChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    };

    const initializeChart = () => {
      destroyChart(); // 이전 차트 파괴
      createChart(); // 새로운 차트 생성
    };

    // 컴포넌트가 처음 렌더링될 때 차트 초기화
    initializeChart();

    // 컴포넌트가 unmount될 때 차트 파괴
    return () => {
      destroyChart();
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default LineChart2;
