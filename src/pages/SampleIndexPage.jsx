import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faChartArea,
  faChartBar,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import LineChart2 from "../components/chart/LineChart2";
import DataTable2 from "../components/table/DataTable2";
import BarChart2 from "../components/chart/BarChart2";

const SampleIndexPage = () => {
  return (
    <div className="container">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Dashboard</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div className="card bg-primary text-white mb-4">
                <div className="card-body">Primary Card</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white stretched-link" href="#">
                    View Details
                  </a>
                  <div className="small text-white">
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-warning text-white mb-4">
                <div className="card-body">Warning Card</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white stretched-link" href="#">
                    View Details
                  </a>
                  <div className="small text-white">
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-success text-white mb-4">
                <div className="card-body">Success Card</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white stretched-link" href="#">
                    View Details
                  </a>
                  <div className="small text-white">
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-danger text-white mb-4">
                <div className="card-body">Danger Card</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white stretched-link" href="#">
                    View Details
                  </a>
                  <div className="small text-white">
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6">
              <div className="card mb-4">
                <div className="card-header">
                  <FontAwesomeIcon icon={faChartArea} /> Area Chart Example
                </div>
                <div className="card-body">
                  <LineChart2></LineChart2>
                  <canvas id="myAreaChart" width="100%" height="40"></canvas>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="card mb-4">
                <div className="card-header">
                  <FontAwesomeIcon icon={faChartBar} /> Bar Chart Example
                </div>
                <div className="card-body">
                  <BarChart2></BarChart2>
                  <canvas id="myBarChart" width="100%" height="40"></canvas>
                </div>
              </div>
            </div>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header">
              <FontAwesomeIcon icon={faTable} /> DataTable Example
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <DataTable2></DataTable2>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SampleIndexPage;
