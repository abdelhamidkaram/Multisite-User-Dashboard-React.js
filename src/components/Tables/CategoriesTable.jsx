import CustomTable from "./CustomTable";
import { $api, useData } from "../../client"; // استبدال $api بـ useData
import useModal from "../../store/useModal";
import useCategoryModal from "../../store/modals/CategoryModal";
import { useEffect, useState } from "react";
import PromiseToast from "../UIElements/Toasts/PromiseToast";

const CategoriesTable = ({ changeTitle }) => {
  const { toggle, changeName } = useModal();
  const { changeCategory } = useCategoryModal();

  const { data: categoriesData, error, isLoading, mutate } = useData("wp-json/categories/v1/all-categories");

  const handleDeleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm("هل انت متأكد من حذف التصنيف؟");

    if (confirmDelete) {
      try {
        let response ; 
        response =  $api.post(
          `wp-json/categories/v1/delete-category/${categoryId}`
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

  useEffect(() => {
    if (categoriesData) {
      const newData = categoriesData.map((item) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          slug: item.slug,
        };
      });
      setCategories(newData);
    }
  }, [categoriesData]);

  if (error) return <p>Failed to fetch categories</p>;

  return (
    <div>
      <CustomTable
        isLoading={isLoading}
        data={categories}
        title={changeTitle ?? "التصنيفات"}
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
