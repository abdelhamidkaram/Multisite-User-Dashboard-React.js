import CustomTable from "./CustomTable";
import { $api } from "../../client";
import { useEffect, useState } from "react";
import useModal from "../../store/useModal";
import useCategoryModal from "../../store/modals/CategoryModal";

const CategoriesTable = ({ changeTitle }) => {
  const { toggle, changeName } = useModal();
  const { changeCategory } = useCategoryModal();

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await $api.get("wp-json/categories/v1/all-categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm(
      "هل انت متأكد من حذف التصنيف ؟"
    );

    if (confirmDelete) {
      try {
        const response = await $api.post(
          `wp-json/categories/v1/delete-category/${categoryId}`
        );

        if (response.status !== 200) {
          throw new Error(
            "Network response was not ok" + response.data.message
          );
        }

        alert("تم الحذف");
        let newData = categories.filter((item) => item.id !== categoryId);
        setCategories(newData);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        alert("Failed to delete the category. Please try again.");
      }
    }
  };

  const handleEditCategory = (category) => {
    changeCategory(category);
    openModal();
  };

  function openModal() {
    changeName("category");
    toggle();
  }

  function openAddCategoryModal() {
    changeName("addCategory");
    toggle();
  }

  const Headers = ["معرف التصنيف", "الاسم", "الوصف", "الرابط"];

  const [categories, setCategories] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const categoriesData = await fetchCategories();
        setResponseData(categoriesData);
        const newData = categoriesData.map((item) => {
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            slug: item.slug,
          };
        });
        setCategories(newData);
      } catch (error) {
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <CustomTable
        data={categories}
        title={changeTitle ?? "التصنيفات"}
        responseData={responseData}
        CustomHeader={Headers}
        deleteHandler={handleDeleteCategory}
        editHandler={handleEditCategory}
        addBTNClickHandler={openAddCategoryModal}
        addBTNTitle={"اضافة تصنيف جديد"}
      />
    </div>
  );
};

export default CategoriesTable;
