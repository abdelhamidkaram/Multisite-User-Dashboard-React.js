import { useData } from "../../../../client";
import useModal from "../../../../store/useModal";
import useOrderModal from "../../../../store/modals/OrderModal";
import MainButton from "../../MainButton";

const OrderDetailsModal = () => {
  const { order } = useOrderModal();
  const { toggle } = useModal();
  // Fetch order details using useData
  const { data: orderDetails, isLoading, error } = useData(
    `wp-json/products/v1/order/${order.id}`
  );

  if (isLoading) {
    return <div>{'جاري التحميل...  '}</div>;
  }

  if (error) {
    return <div>حدث خطأ أثناء جلب بيانات الطلب: {error.message}</div>;
  }

  if (!orderDetails) {
    return <div>لم يتم العثور على بيانات الطلب</div>;
  }

  const {
    id,
    status,
    date_created,
    total,
    currency,
    billing,
    shipping,
    items,
    payment_method_title,
  } = orderDetails;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-5">تفاصيل الطلب</h1>
      <div className="mb-4">
        <p>رقم الطلب: {id}</p>
        <p>الحالة: {status}</p>
        <p>تاريخ الإنشاء: {date_created}</p>
        <p>إجمالي السعر: {total} {currency}</p>
        <p>طريقة الدفع: {payment_method_title}</p>
      </div>

      <h2 className="text-xl mb-3">تفاصيل الفواتير</h2>
      <div className="mb-4">
        <p>الاسم: {billing.first_name} {billing.last_name}</p>
        <p>البريد الإلكتروني: {billing.email}</p>
        <p>الهاتف: {billing.phone}</p>
        <p>العنوان: {billing.address_1}, {billing.city}, {billing.state}, {billing.postcode}, {billing.country}</p>
      </div>

      <h2 className="text-xl mb-3">تفاصيل الشحن</h2>
      <div className="mb-4">
        <p>الاسم: {shipping.first_name} {shipping.last_name}</p>
        <p>العنوان: {shipping.address_1}, {shipping.city}, {shipping.state}, {shipping.postcode}, {shipping.country}</p>
      </div>

      <h2 className="text-xl mb-3">المنتجات</h2>
      <div className="mb-4">
        {items.map((item) => (
          <div key={item.id} className="border p-2 rounded mb-2">
            <p>الاسم: {item.name}</p>
            <p>الكمية: {item.quantity}</p>
            <p>السعر: {item.total} {currency}</p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <MainButton  text="إغلاق" ClickHandler={toggle} />
      </div>
    </div>
  );
};

export default OrderDetailsModal;
