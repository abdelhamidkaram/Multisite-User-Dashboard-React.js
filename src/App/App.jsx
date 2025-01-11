import { useEffect, useState } from "react";
import AnalyticsCard from "../components/AnalyticsCard/AnalyticsCard";
import OrdersTable from "../components/Tables/OrdersTable";
import ProductsTable from "../components/Tables/ProductsTable";
import LineCharts from "../components/charts/LineCharts";
import StarterSteps from "./StarterSteps/StarterSteps";
import { useData } from "../client";
import useAnalytics from "../store/Analytics";
import NoteBox from "../components/UIElements/NoteBox";
import useModal from "../store/useModal";
import MainButton from "../components/UIElements/MainButton";

const App = () => {
  const { setMonths, setOrders } = useAnalytics();
  const [orders, setOrdersData] = useState([]);
  const [months, setMonthsData] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const { toggle, changeName } = useModal();
  const {
    data: monthlyResponse,
    error: monthlyError,
    isLoading: isLoadingMonthly,
  } = useData("wp-json/analytics/v1/monthly");
  const {
    data: summaryResponse,
    error: summaryError,
    isLoading: isLoadingSummary,
  } = useData("wp-json/analytics/v1/summary");

  useEffect(() => {

    if (
      !isLoadingMonthly &&
      !isLoadingSummary &&
      Array.isArray(monthlyResponse) &&
      summaryResponse
    ) {
      const newOrders = monthlyResponse.map((item) => item.total_orders);
      const newMonths = monthlyResponse.map((item) => item.month);
  
      setOrdersData(newOrders);
      setMonthsData(newMonths);
      setOrders(newOrders);
      setMonths(newMonths);
      setTotalOrders(summaryResponse.total_orders);
      setTotalProducts(summaryResponse.total_products);
    }
  }, [summaryResponse, monthlyResponse, isLoadingMonthly, isLoadingSummary]);
  
  return (
    <div className="lg:grid gap-6 w-full">
      <StarterSteps />
      {/* Show analytics card with fetched data */}
      {(monthlyError || summaryError) ? (        
        <div className="flex  w-full"> <NoteBox type="info"><p>اشتراكك الحالي لا يدعم التحليلات</p>
        <MainButton 
        ClickHandler={() => {
          changeName("subscription");
          toggle();
        }}
        text={"ترقية الباقة"}
      /></NoteBox></div>
      ) : (
        <div>
          <AnalyticsCard
            isLoading={isLoadingSummary}
            itemsList={[
              { id: 1, name: "عدد الطلبيات", num: totalOrders },
              { id: 2, name: "عدد المنتجات", num: totalProducts },
            ]}
            showTitle={true}
          />

          <LineCharts
            months={months}
            orders={orders}
            isLoading={isLoadingMonthly}
          />
        </div>
      )}
      <ProductsTable changeTitle={"اخر المنتجات"} showMorButton={true} />

      <OrdersTable changeTitle={"اخر الطلبات"} showMorButton={true} />
    </div>
  );
};

export default App;
