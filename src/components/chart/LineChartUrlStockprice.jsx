import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js/auto";
import priceRateService from "../../services/PriceRateService";

const LineChartUrlStockprice = () => {
  const { goods_code } = useParams(); // URL에서 goods_code를 가져옵니다.
  const chartRef = useRef(null);
  let chartInstance = null;
  const [chartData, setChartData] = useState({
    labels: [],
    trBasePrices: [],
  });

  useEffect(() => {
    console.log("use Effective 실행");
    initStockprice();
  }, [goods_code]); // goods_code가 변경될 때마다 실행

  const initStockprice = () => {
    priceRateService
      .getStockprice(`${goods_code}`)
      .then((response) => {
        // API 응답에서 데이터 추출
        const labels = response.data.map((item) => item.base_date); // x축 레이블 (날짜)
        const stockprice = response.data.map((item) => item.stock_price); // y축 값 (trbase_price)

        setChartData({ labels, stockprice }); // 상태에 데이터 저장
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (chartData.labels.length === 0) return; // 데이터가 없으면 차트 생성 안 함

    const ctx = chartRef.current.getContext("2d");

    // 차트가 생성될 때마다 차트를 초기화하고 데이터를 설정
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
          labels: chartData.labels, // x축 레이블
          datasets: [
            {
              label: "주가",
              data: chartData.stockprice, // y축 데이터 (trbase_price)
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              pointRadius: 5,
              pointBackgroundColor: "rgba(255,99,132,1)",
              pointBorderColor: "rgba(255,255,255,0.8)",
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(255,99,132,1)",
              pointHitRadius: 50,
              pointBorderWidth: 2,
              yAxisID: "y", // 왼쪽 y축 (trbase_price)
            },
          ],
        },
        options: {
          responsive: true, // 차트가 반응형
          maintainAspectRatio: false, // 비율을 유지하지 않고 크기 조정 가능
          aspectRatio: 2, // 차트의 가로 세로 비율 조정
          scales: {
            x: {
              type: "category",
              labels: chartData.labels, // x축 레이블 적용
              grid: {
                display: false,
              },
              ticks: {
                maxTicksLimit: 10, // 최대 눈금 표시
              },
            },
            y: {
              type: "linear",
              position: "left", // 왼쪽 y축
              ticks: {
                maxTicksLimit: 10,
              },
              grid: {
                color: "rgba(0, 0, 0, .125)", // y1 그리드 색상
              },
            },
          },
          legend: {
            display: true, // 범례 표시함
          },
        },
      });
    };

    //차트 파괴 함수
    const destroyChart = () => {
      if (chartInstance) {
        chartInstance.destroy(); // 기존 차트를 파괴
        chartInstance = null;
      }
    };

    //차트 초기화 함수
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
  }, [chartData]); // chartData가 변경될 때마다 차트를 새로 그립니다.

  return (
    <div style={{ width: "100%", height: "300px" }}>
      {/* 차트 컨테이너를 반응형으로 설정 */}
      <canvas ref={chartRef} /> {/* 차트가 그려질 캔버스 */}
    </div>
  );
};

export default LineChartUrlStockprice;
