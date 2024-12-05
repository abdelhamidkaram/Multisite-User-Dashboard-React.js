import LineCharts from '../../components/charts/LineCharts'
import AnalyticsCard from '../../components/AnalyticsCard/AnalyticsCard';
import OrdersTable from '../../components/Tables/OrdersTable';
import ProductsTable from '../../components/Tables/ProductsTable';
import { useData } from '../../client';
import NoteBox from '../../components/UIElements/NoteBox';

const Analytics = () => {
 
  const { data: analyticsData, error, isLoading } = 
  useData('wp-json/analytics/v1/summary'); 

  const { data: monthlyResponse, isLoading: isLoadingMonthly } = useData("wp-json/analytics/v1/monthly");

  if (isLoading || isLoadingMonthly) {
    return (
      <div className="grid gap-6">
        <AnalyticsCard itemsList={[1, 2, 3, 4, 5]} showMore={false} isLoading={true} />
        <LineCharts months={[]} orders={[]} isLoading={true} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ProductsTable changeTitle={'اخر المنتجات'} showMorButton={true} />
          <OrdersTable changeTitle={'اخر الطلبات'} />
        </div>
      </div>
    );
  }

  if (error) {
    return <NoteBox type="info"><p>اشتراكك الحالي لا يدعم التحليلات</p></NoteBox>;
  }


  const { total_orders, total_products, total_sales, total_customers, average_order_value, total_refunds } = analyticsData;
  const orders = monthlyResponse.map((item) => item.total_orders);
  const months = monthlyResponse.map((item) => item.month);

  const AnalyticsItems = [
    { id: 1, name: "عدد الطلبيات", num: total_orders },
    { id: 2, name: "عدد المنتجات", num: total_products },
    { id: 3, name: "اجمالي المبيعات", num: total_sales },
    { id: 4, name: "اجمالي الارباح", num: total_sales - total_refunds },
    { id: 5, name: "عدد العملاء", num: total_customers },
    { id: 6, name: "متوسط قيمة الطلب", num: average_order_value },
    { id: 7, name: "اجمالي المسترجعات", num: total_refunds },
  ];

  return (
    <div className="grid gap-6">
      <AnalyticsCard itemsList={AnalyticsItems} showMore={false} />
      <LineCharts months={months} orders={orders} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ProductsTable changeTitle={'اخر المنتجات'} showMorButton={true} />
        <OrdersTable changeTitle={'اخر الطلبات'} showMorButton={true} />
      </div>
    </div>
  );
};

export default Analytics;
