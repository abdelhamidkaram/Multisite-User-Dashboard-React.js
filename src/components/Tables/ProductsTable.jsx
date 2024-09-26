import CustomTable from "./CustomTable";
import { $api, useData } from "../../client"; // استبدال $api بـ useData
import { useEffect, useState } from "react";
import useModal from "../../store/useModal";
import useProductModal from "../../store/modals/ProductModal";
import PromiseToast from "../UIElements/Toasts/PromiseToast";

const ProductsTable = ({ changeTitle, showMorButton, showAddBTN }) => {
  const { toggle, changeName } = useModal();
  const { changeProduct } = useProductModal();

  const { data: productsData, error, isLoading , mutate } = useData("wp-json/products/v1/all-products");

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      try {
        let response ;
        
        response =  $api.post(
          `wp-json/products/v1/delete-product/${productId}`
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

  const handleEditProduct = (product) => {
    changeProduct(product);
    openModal();
  };

  function openModal() {
    changeName("product");
    toggle();
  }

  function openAddProductModal() {
    changeName("addProduct");
    toggle();
  }

  const Headers = ["رقم المنتج", "اسم المنتج", "السعر", "عدد المبيعات", "الحالة"];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (productsData) {
      const newData = productsData.map((item) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          totalSales: item.total_sales,
          status: item.stock_status,
        };
      });
      setProducts(newData);
    }
  }, [productsData]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <CustomTable
        isLoading={isLoading}
        data={products}
        title={changeTitle ?? "المنتجات"}
        responseData={productsData}
        CustomHeader={Headers}
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
