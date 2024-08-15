import  { useEffect, useState } from "react";
import AnalyticsCard from "../components/AnalyticsCard/AnalyticsCard";
import OrdersTable from "../components/Tables/OrdersTable";
import ProductsTable from "../components/Tables/ProductsTable";
import LineCharts from "../components/charts/LineCharts";
import StarterSteps from "./StarterSteps/StarterSteps";
import { $api } from "../client";
import useAnalytics from "../store/Analytics";

const App = () => {
  const { setMonths, setOrders } = useAnalytics();
  const [orders, setOrdersData] = useState([]);
  const [months, setMonthsData] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch monthly data and summary data in parallel
        const [monthlyResponse, summaryResponse] = await Promise.all([
          $api.get("wp-json/analytics/v1/monthly"),
          $api.get("wp-json/analytics/v1/summary"),
        ]);

        // Extract data from responses
        const monthlyData = monthlyResponse.data;
        const summaryData = summaryResponse.data;

        // Process monthly data
        const newOrders = monthlyData.map((item) => item.total_orders);
        const newMonths = monthlyData.map((item) => item.month);

        // Update state with fetched data
        setOrdersData(newOrders);
        setMonthsData(newMonths);
        setOrders(newOrders);
        setMonths(newMonths);
        setTotalOrders(summaryData.total_orders);
        setTotalProducts(summaryData.total_products);

      
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors (e.g., show error message)
      }
    };

    // Call fetchData function on component mount
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

 
  return (
    <div className="lg:grid gap-6 w-full  ">
      <StarterSteps />
      {/* Show analytics card with fetched data */}
      <AnalyticsCard itemsList={[{ id: 1, name: "عدد الطلبيات", num: totalOrders },
      { id: 2, name: "عدد المنتجات", num: totalProducts },]} showTitle={true} />

     
      <LineCharts months={months} orders={orders} />

      <ProductsTable changeTitle={"اخر المنتجات"} showMorButton={true}  />

      <OrdersTable changeTitle={"اخر الطلبات"} showMorButton={true} />
    </div>
  );
};

export default App;
