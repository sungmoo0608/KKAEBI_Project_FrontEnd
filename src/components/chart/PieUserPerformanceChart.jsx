import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

const PieUserPerformanceChart = ({ data }) => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const createChart = () => {
      const labels = data.map((item) => item.goods_gubun_nm);
      const chartData = data.map((item) => item.cnt);

      Chart.register(...registerables);
      chartInstance = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "투자 건수",
              data: chartData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "상품 유형별 투자 건수",
          },
          animation: {
            animateScale: true,
            animateRotate: true,
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

    destroyChart(); // Destroy any existing chart
    createChart(); // Create the new chart with updated data

    return () => {
      destroyChart(); // Clean up when the component unmounts
    };
  }, [data]); // Re-run the effect if `data` changes

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <canvas ref={chartRef} style={{ maxWidth: "300px", width: "100%" }} />
    </div>
  );
};

export default PieUserPerformanceChart;
