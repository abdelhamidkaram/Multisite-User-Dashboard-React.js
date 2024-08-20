import  { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ShimmerBarChart } from "shimmer-effects-react";

const LineCharts = ({ months, orders , isLoading } ) => {
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
        {isLoading ?

          <div className="h-[350px]" ><ShimmerBarChart  chartType="random" mode="light" barWidth={'5%'} /></div>
          
          
          : <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />}
      </div>
    </div>
  );
};

export default LineCharts;
