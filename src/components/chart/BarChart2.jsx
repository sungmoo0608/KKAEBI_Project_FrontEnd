import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

const BarChart2 = () => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const createChart = () => {
      Chart.register(...registerables);
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              label: "Revenue",
              backgroundColor: "rgba(2,117,216,1)",
              borderColor: "rgba(2,117,216,1)",
              data: [4215, 5312, 6251, 7841, 9821, 14984],
            },
          ],
        },
        options: {
          scales: {
            x: [
              {
                time: {
                  unit: "month",
                },
                gridLines: {
                  display: false,
                },
                ticks: {
                  maxTicksLimit: 6,
                },
              },
            ],
            y: [
              {
                ticks: {
                  min: 0,
                  max: 15000,
                  maxTicksLimit: 5,
                },
                gridLines: {
                  display: true,
                },
              },
            ],
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

    destroyChart(); // 기존 차트 파괴
    createChart(); // 새로운 차트 생성

    return () => {
      destroyChart(); // 컴포넌트가 unmount될 때 차트 파괴
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default BarChart2;
