import  { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineCharts = ({ months, orders }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Total Orders",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [],
      },
    },
  });

  useEffect(() => {
    if (months.length && orders.length>0) {
      setChartData((prevState) => ({
        ...prevState,
        series: [{ name: "Total Orders", data: orders }],
        options: {
          ...prevState.options,
          xaxis: { categories: months },
        },
      }));
    }
  }, [months, orders]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default LineCharts;
