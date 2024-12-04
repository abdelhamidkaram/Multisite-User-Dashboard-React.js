import useModal from "../../store/useModal";
import useUserModal from "../../store/modals/UserModals";
import CustomTable from "./CustomTable";
import {$api, useData} from "../../client";
import { useState } from "react";
import PromiseToast from "../UIElements/Toasts/PromiseToast";

const UsersTable = ({ changeTitle }) => {
  const headers = ["المعرف", "الاسم", "البريد الالكتروني" , "رقم الهاتف"];
  const { toggle, changeName } = useModal();
  const { changeUser } = useUserModal();

  function editHandler(user) {
    changeUser(user);
    openModal();
  }

  function openModal() {
    changeName("user");
    toggle();
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const {
    data: customers,
    error,
    isLoading,
    mutate,
  } = useData(
    `wp-json/products/v1/get-customers?page=${currentPage}&per_page=${itemsPerPage}`
  );
  const totalPages = customers
    ? Math.ceil(customers.total_products / itemsPerPage)
    : 1;
 /**
   * Handles the page change event
   * @param {Object} data The data from the page change event
   */
 const handlePageClick = (data) => {
  setCurrentPage(data.selected + 1);
};



const handleDeleteUser = async (userId) => {
  const confirmDelete = window.confirm(
    "هل أنت متأكد أنك تريد حذف هذالعميل؟"
  );

  if (confirmDelete) {
    try {
      let response ;

      response =  $api.post(
        `wp-json/products/v1/delete-user/${userId}`
      );

      PromiseToast(
        response,
        "جاري تحديث البيانات...",
        "فشلت العملية حاول لاحقًا",
        "تم الحذف بنجاح!",
        () => {
          mutate();
        }
      );
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }
};

  if (error) return <p>Failed to fetch customers</p>;

  return (
    <div>
      <CustomTable
        handlePageClick={handlePageClick}
        totalPages={totalPages}
        isLoading={isLoading}
        data={customers?.data}
        title={changeTitle ?? "العملاء"}
        CustomHeader={headers}
        deleteHandler={handleDeleteUser}
        editHandler={editHandler}
      />
    </div>
  );
};

export default UsersTable;
