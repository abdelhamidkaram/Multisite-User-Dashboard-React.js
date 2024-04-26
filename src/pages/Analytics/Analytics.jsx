import LineCharts from '../../components/charts/LineCharts'
import AnalyticsCard from '../../components/AnalyticsCard/AnalyticsCard'
import OrdersTable from '../../components/Tables/OrdersTable'
import ProductsTable from '../../components/Tables/ProductsTable'

const Analytics = () => {
    const AnalyticsItems = [
        { id: 1, name: "عدد الطلبيات", num:15 },
        { id: 2, name: "عدد الزوار" , num:52},
        { id: 3, name: "عدد المنتجات" , num:650 },
        { id: 4, name: "اجمالي الارباح" , num:1500 },
        { id: 5, name: "عدد الطلبيات", num:15 },
        { id: 6, name: "عدد الزوار" , num:52},
        { id: 7, name: "عدد المنتجات" , num:650 },
        { id: 8, name: "اجمالي الارباح" , num:1500 },
        { id: 9, name: "عدد الطلبيات", num:15 },
        { id: 10, name: "عدد الزوار" , num:52},
        { id: 11, name: "عدد المنتجات" , num:650 },
        { id: 12, name: "اجمالي الارباح" , num:1500 },
      ];

  return (
    <div className="grid gap-6">
      <AnalyticsCard 
      itemsList={ AnalyticsItems}
       showMore={false}
      />
      <LineCharts/>

     <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
     <ProductsTable changeTitle={'اخر المنتجات'} showMorButton={true} />
     <OrdersTable changeTitle={'اخر الطلبات'} />
     </div>
    </div>

  )
}

export default Analytics
