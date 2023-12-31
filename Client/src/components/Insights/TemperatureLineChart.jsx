import styled from "styled-components";

const StyledChartContainer = styled.div`
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #fff;
`;
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import {
  Chart as ChartJS,
  CategoryScale, //x axis
  LinearScale, //y axis
  PointElement,
  LineElement,
  TimeSeriesScale,
  // Title,
  // Tooltip,
  // Legend,
} from "chart.js";
import { getData } from "../../services/getData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeSeriesScale
  // Title,
  // Tooltip,
  // Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Temperature & Humidity",
    },
  },
  scales: {
    y: {},
    y1: {
      position: "right",
      // ticks: {
      //   stepSize: 2,
      // },
      // grid: {
      //   drawOnChartArea: false,
      // },
    },
    x: {
      type: "timeseries",
    },
  },
};
function LineChart() {
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getData("2022-12-31", "2022-12-31");
      setFetchedData(res);
    })();
  }, []);
  const data = {
    labels: fetchedData.map((item) => item?.timestamp),
    datasets: [
      {
        label: "Temperature",

        data: fetchedData.map((item) => item?.temperature),
        borderWidth: 3,
        pointRadius: 3,
        // backgroundColor: "#369FFF", //color of points
        borderColor: "#369FFF", //color of line
        pointBorderWidth: 0,
        yAxisID: "y",
        tension: 0.3,
        // pointBorderColor: "#369FFF",
      },
      {
        label: "Humidity",
        data: fetchedData.map((item) => item?.humidity),
        borderWidth: 3,
        pointRadius: 3,
        borderColor: "#8AC53E",
        pointBorderWidth: 0,
        yAxisID: "y1",
        tension: 0.3,
      },
    ],
  };
  return (
    <StyledChartContainer>
      <Line data={data} options={options} />
    </StyledChartContainer>
  );
}

export default LineChart;
