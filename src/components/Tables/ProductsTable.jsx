import CustomTable from "./CustomTable";
import { $api } from "../../client";
import { useEffect, useState } from "react";
import useModal from "../../store/useModal";
import useProductModal from "../../store/modals/ProductModal";
const ProductsTable = ({ changeTitle, showMorButton , showAddBTN}) => {
  const { toggle, changeName } = useModal();
  const { changeProduct } = useProductModal();

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await $api.get("wp-json/products/v1/all-products");
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      try {
        const response = await $api.post(
          `wp-json/products/v1/delete-product/${productId}`
        );

        if (response.status !== 200) {
          throw new Error(
            "Network response was not ok" + response.data.message
          );
        }

        alert("تم الحذف");
        let newData = products.filter((item) => item.id !== productId);
        setProducts(newData);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        alert("Failed to delete the product. Please try again.");
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

  const Headers = ["رقم المنتج", "اسم المنتج", "السعر","عدد المبيعات", "الحالة"];

  const [products, setProducts] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const productsData = await fetchProducts();
        setResponseData(productsData);
        const newData = productsData.map((item) => {
          return { id: item.id, name: item.name, price: item.price , totalSales:item.total_sales , status:item.stock_status };
        });
        setProducts(newData);
      } catch (error) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <CustomTable
        data={products}
        title={changeTitle ?? "المنتجات"}
        responseData={responseData}
        CustomHeader={Headers}
        to={showMorButton ? "/products" : null}
        deleteHandler={handleDeleteProduct}
        editHandler={handleEditProduct}
        addBTNClickHandler={openAddProductModal}
        addBTNTitle={showAddBTN ? 'اضافة منتج جديد' : null }
      />
    </div>
  );
};

export default ProductsTable;
