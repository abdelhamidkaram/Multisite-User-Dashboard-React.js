import CustomTable from "./CustomTable";
import { $api, useData } from "../../client";
import useModal from "../../store/useModal";
import useOrderModal from "../../store/modals/OrderModal";

const RefundTable = ({ changeTitle }) => {
  const { toggle, changeName } = useModal();
  const { changeOrder } = useOrderModal();

  const { data: orders, error, isLoading, mutate } = useData("wp-json/products/v1/refunded-orders");

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
        mutate(orders.filter((item) => item.id !== orderId), false);
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

  if (error) return <p>Failed to fetch orders</p>;

  return (
    <div>
      <CustomTable
        isLoading={isLoading}
        data={orders}
        title={changeTitle ?? "المرتجع"}
        CustomHeader={Headers}
        deleteHandler={handleDeleteOrder}
        editHandler={handlerStatusOrder}
      />
    </div>
  );
};

export default RefundTable;
