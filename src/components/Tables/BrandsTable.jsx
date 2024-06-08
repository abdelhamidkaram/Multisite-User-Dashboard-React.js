import CustomTable from "./CustomTable";
import { $api } from "../../client";
import { useEffect, useState } from "react";
import useModal from "../../store/useModal";
import useBrandModal from "../../store/modals/brandModal.js";

const BrandsTable = ({ changeTitle, showMorButton }) => {
  const { toggle, changeName } = useModal();
  const { changeBrand } = useBrandModal();

  const fetchBrands = async () => {
    try {
      const response = await $api.get("wp-json/brands/v1/all-brands");
      return response.data;
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  };

  const handleDeleteBrand = async (brandId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this brand?"
    );

    if (confirmDelete) {
      try {
        const response = await $api.delete(
          `wp-json/brands/v1/delete-brand/${brandId}`
        );

        if (response.status !== 200) {
          throw new Error(
            "Network response was not ok" + response.data.message
          );
        }

        alert(response.data.message);
        let newData = brands.filter((item) => item.id !== brandId);
        setBrands(newData);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        alert("Failed to delete the brand. Please try again.");
      }
    }
  };

  const handleEditBrand = (brand) => {
    changeBrand(brand);
    openModal();
  };

  function openModal() {
    changeName("brand");
    toggle();
  }

  function openAddBrandModal() {
    changeName("addBrand");
    toggle();
  }

  const Headers = ["رقم العلامة", "اسم العلامة", "الوصف", "المعرف الفريد"];

  const [brands, setBrands] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBrands = async () => {
      setLoading(true);
      try {
        const brandsData = await fetchBrands();
        setResponseData(brandsData);
        const newData = brandsData.map((item) => {
          return { id: item.id, name: item.name, description: item.description, slug: item.slug };
        });
        setBrands(newData);
      } catch (error) {
        setError("Failed to fetch brands");
      } finally {
        setLoading(false);
      }
    };

    getBrands();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <CustomTable
        data={brands}
        title={changeTitle ?? "Brands"}
        responseData={responseData}
        CustomHeader={Headers}
        to={showMorButton ? "/brands" : null}
        deleteHandler={handleDeleteBrand}
        editHandler={handleEditBrand}
        addBTNClickHandler={openAddBrandModal}
        addBTNTitle={'إضافة علامة تجارية جديدة'}
      />
    </div>
  );
};

export default BrandsTable;
