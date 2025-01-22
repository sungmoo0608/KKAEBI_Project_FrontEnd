import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartArea,
  faChartBar,
  faChartPie,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import LineChart2 from "./../components/chart/LineChart2";
import PieChart from "./../components/chart/PieChart";
import LineChartBasepriceInput from "../components/chart/LineChartBasepriceInput";
import BarChart2 from "./../components/chart/BarChart2";

const ChartPage = () => {
  return (
    <div className="container">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Dashboard</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
          <div className="row">
            <div className="col-xl-6 col-md-12">
              <div className="card mb-4">
                <div className="card-header">
                  <FontAwesomeIcon icon={faChartArea} /> Area Chart Example
                </div>
                <div className="card-body">
                  <LineChart2></LineChart2>
                </div>
                <div className="card-footer small text-muted">
                  Updated yesterday at 11:59 PM
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-md-12">
              <div className="card mb-4">
                <div className="card-header">
                  <FontAwesomeIcon icon={faChartArea} /> 펀드 기준가 추이
                </div>
                <div className="card-body">
                  <LineChartBasepriceInput></LineChartBasepriceInput>
                </div>
                <div className="card-footer small text-muted">
                  Updated yesterday at 11:59 PM
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-md-12">
              <div className="card mb-4">
                <div className="card-header">
                  <FontAwesomeIcon icon={faChartBar} /> Bar Chart Example
                </div>
                <div className="card-body">
                  <BarChart2></BarChart2>
                </div>
                <div className="card-footer small text-muted">
                  Updated yesterday at 11:59 PM
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-md-12">
              <div className="card mb-4">
                <div className="card-header">
                  <FontAwesomeIcon icon={faChartPie} /> Pie Chart Example
                </div>
                <div className="card-body">
                  <PieChart></PieChart>
                </div>
                <div className="card-footer small text-muted">
                  Updated yesterday at 11:59 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChartPage;
