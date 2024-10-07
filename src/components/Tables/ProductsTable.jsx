import CustomTable from "./CustomTable";
import { $api, useData } from "../../client";
import {useState } from "react";
import useModal from "../../store/useModal";
import useProductModal from "../../store/modals/ProductModal";
import PromiseToast from "../UIElements/Toasts/PromiseToast";

/**
 * @function ProductsTable
 * 
 * @param {Object} props The props to the component
 * @param {string} props.changeTitle The title of the table
 * @param {boolean} props.showMorButton Whether to show the "More" button
 * @param {boolean} props.showAddBTN Whether to show the "Add" button
 * 
 * @description
 * This component renders a table with a list of products, their names, prices, and
 * the number of sales. It also allows the user to delete a product, edit a product,
 * and add a new product.
 * 
 * @returns {ReactElement} The rendered component
 */
const ProductsTable = ({ changeTitle, showMorButton, showAddBTN }) => {
  const { toggle, changeName } = useModal();
  const { changeProduct } = useProductModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const {
    data: productsData,
    error,
    isLoading,
    mutate,
  } = useData(
    `wp-json/products/v1/all-products?page=${currentPage}&per_page=${itemsPerPage}`
  );
  const totalPages = productsData
    ? Math.ceil(productsData.total_products / itemsPerPage)
    : 1;
 /**
   * Handles the page change event
   * @param {Object} data The data from the page change event
   */
 const handlePageClick = (data) => {
  setCurrentPage(data.selected + 1);
};

  /**
   * Handles the deletion of a product
   * @param {number} productId The id of the product to delete
   */
  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      try {
        let response;

        response = $api.post(`wp-json/products/v1/delete-product/${productId}`);

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

  /**
   * Handles the editing of a product
   * @param {Object} product The product to edit
   */
  const handleEditProduct = (product) => {  
    changeProduct(product);
    openModal();
  };

  /**
   * Opens the modal for adding a new product
   */
  function openAddProductModal() {
    changeName("addProduct");
    toggle();
  }

  /**
   * Opens the modal for editing a product
   */
  function openModal() {
    changeName("product");
    toggle();
  }

  const Headers = [
    "رقم المنتج",
    "اسم المنتج",
    "السعر",
    "عدد المبيعات",
    "الحالة",
  ];



  if (error) return <p>{error}</p>;
  
   if(productsData){
    var products = productsData.data.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      totalSales: item.total_sales,
      status: item.stock_status,
    }));
   }
  return (
    <div>
      <CustomTable
        totalPages={totalPages}
        handlePageClick={handlePageClick}
        CustomHeader={Headers}
        isLoading={isLoading}
        data={products}
        title={changeTitle ?? "المنتجات"}
        responseData={productsData}
        to={showMorButton ? "/products" : null}
        deleteHandler={handleDeleteProduct}
        editHandler={handleEditProduct}
        addBTNClickHandler={openAddProductModal}
        addBTNTitle={showAddBTN ? "اضافة منتج جديد" : null}
      />
    </div>
  );
};


export default ProductsTable;
