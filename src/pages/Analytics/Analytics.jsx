import  { useState, useEffect } from 'react';
import LineCharts from '../../components/charts/LineCharts';
import AnalyticsCard from '../../components/AnalyticsCard/AnalyticsCard';
import OrdersTable from '../../components/Tables/OrdersTable';
import ProductsTable from '../../components/Tables/ProductsTable';
import useAnalytics from '../../store/Analytics';
import { $api } from '../../client';

const Analytics = () => {
  const { months, orders } = useAnalytics();
  const [analyticsData, setAnalyticsData] = useState(null);
  
  const fetchAnalyticsData = ()=>{
try {
      return $api.get('wp-json/analytics/v1/summary');
  
} catch (error) {
  throw new Error(error) ;
}  }
  useEffect(() => {
    const getAnalyticsData = async () => {
      try {
        const data = await fetchAnalyticsData();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    getAnalyticsData();
  }, []);

  if (!analyticsData) {
    return (
      <div className="grid gap-6">
        <AnalyticsCard itemsList={[1,2,3,4,5]} showMore={false} isLoading={true} />
        <LineCharts months={months} orders={orders} isLoading={true}/>
  
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <ProductsTable changeTitle={'اخر المنتجات'} showMorButton={true} />
          <OrdersTable changeTitle={'اخر الطلبات'} />
        </div>
      </div>
    );
  }

  const { total_orders, total_products, total_sales, total_customers, average_order_value, total_refunds } = analyticsData.data;
  console.log(analyticsData);
  const AnalyticsItems = [
    { id: 1, name: "عدد الطلبيات", num: total_orders },
    { id: 2, name: "عدد المنتجات", num: total_products },
    { id: 3, name: "اجمالي المبيعات", num: total_sales },
    { id: 4, name: "اجمالي الارباح", num: total_sales - total_refunds }, // assuming profits is sales - refunds
    { id: 5, name: "عدد العملاء", num: total_customers },
    { id: 6, name: "متوسط قيمة الطلب", num: average_order_value },
    { id: 7, name: "اجمالي المسترجعات", num:  total_refunds }, 
  ];

  return (
    <div className="grid gap-6">
      <AnalyticsCard itemsList={AnalyticsItems} showMore={false} />
      <LineCharts months={months} orders={orders} />

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <ProductsTable changeTitle={'اخر المنتجات'} showMorButton={true} />
        <OrdersTable changeTitle={'اخر الطلبات'} showMorButton={true} />
      </div>
    </div>
  );
};

export default Analytics;
