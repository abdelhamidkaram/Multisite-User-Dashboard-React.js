import CustomTable from "./CustomTable";
import { $api, useData } from "../../client";
import useModal from "../../store/useModal";
import useOrderModal from "../../store/modals/OrderModal";
import { useState } from "react";

const RefundTable = ({ changeTitle }) => {
  const { toggle, changeName } = useModal();
  const { changeOrder } = useOrderModal();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7); 

  const {
    data: ordersData,
    error,
    isLoading,
    mutate,
  } = useData(
    `wp-json/products/v1/refunded-orders?page=${currentPage}&per_page=${itemsPerPage}`
  );

  const totalPages = ordersData
    ? Math.ceil(ordersData.total_orders / itemsPerPage)
    : 1;

  /**
   * Handles the page change event
   * @param {Object} data The data from the page change event
   */
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
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
          throw new Error("Network response was not ok: " + response.statusText);
        }

        alert(response.data.message);
        mutate(); 
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
  const handlerShowOrderDetails = (order) => {    
    changeOrder(order);
    changeName('showOrder');
    toggle();
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
        totalPages={totalPages}
        handlePageClick={handlePageClick}
        isLoading={isLoading}
        data={ordersData?.data}
        title={changeTitle ?? "المرتجع"}
        CustomHeader={Headers}
        deleteHandler={handleDeleteOrder}
        editHandler={handlerStatusOrder}
        showHandler={handlerShowOrderDetails}
      />
    </div>
  );
};

export default RefundTable;
