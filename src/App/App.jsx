import AnalyticsCard from "../components/AnalyticsCard/AnalyticsCard";
import OrdersTable from "../components/Tables/OrdersTable";
import ProductsTable from "../components/Tables/ProductsTable";
import LineCharts from "../components/charts/LineCharts";
import StarterSteps from "./StarterSteps/StarterSteps";

function App() {

  const AnalyticsItems = [
    { id: 1, name: "عدد الطلبيات", num:15 },
    { id: 2, name: "عدد الزوار" , num:52},
    { id: 3, name: "عدد المنتجات" , num:650 },
    { id: 4, name: "اجمالي الارباح" , num:1500 },
  ];

  return (
    <div className="grid gap-6">
      <StarterSteps />
      <AnalyticsCard 
      itemsList={AnalyticsItems}
       showTitle={true}
      />
      <LineCharts/>
      <ProductsTable changeTitle={'اخر المنتجات'}  showMorButton={true}/>
      <OrdersTable changeTitle={'اخر الطلبات'} showMorButton={true}/>
    </div>
  );
}

export default App;
