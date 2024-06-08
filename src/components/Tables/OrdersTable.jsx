import CustomTable from "./CustomTable";
import { $api } from "../../client";
import { useEffect, useState } from "react";
import useModal from "../../store/useModal";
import useOrderModal from "../../store/modals/OrderModal";
const OrdersTable = ({ changeTitle, showMorButton }) => {
  const { toggle, changeName } = useModal();
  const { changeOrder } = useOrderModal();

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await $api.get("wp-json/products/v1/orders");
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const confirmDelete = window.confirm(
      "هل أنت متأكد أنك تريد حذف هذا الطلب؟"
    );

    if (confirmDelete) {
      try {
        const response = await $api.post(
          `wp-json/products/v1/delete-order/${orderId}`
        );

        if (response.status !== 200) {
          throw new Error("Network response was not ok" + response.statusText);
        }

        alert(response.data.message);
        let newData = orders.filter((item) => item.id != orderId);
        setOrders(newData);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        alert("Failed to delete the order. Please try again.");
      }
    }
  };

  const handlerStatusOrder = (order) => {
    changeOrder(order);
    openModal();
  };

  function openModal() {
    changeName("order");
    toggle();
  }
  const Headers = ["رقم الطلب", "العميل", "الحالة", "الإجمالي", "تاريخ الطلب"];

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      try {
        const ordersData = await fetchOrders();
        setOrders(ordersData);
      } catch (error) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <CustomTable
        data={orders}
        title={changeTitle ?? "الطلبات"}
        CustomHeader={Headers}
        to={showMorButton ? "/orders" : null}
        deleteHandler={handleDeleteOrder}
        editHandler={handlerStatusOrder}       
      />
    </div>
  );
};

export default OrdersTable;
