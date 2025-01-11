import { useForm } from "react-hook-form";
import { $api, useData } from "../../../../client";
import MainButton from "../../MainButton";
import PromiseToast from "../../Toasts/PromiseToast";
import useModal from "../../../../store/useModal";
import useCategoryModal from "../../../../store/modals/CategoryModal";
import TextField from "../../Form/TextField";
import { useState } from "react";

const CategoryModal = () => {
  const { mutate: mutate } = useData(
    `wp-json/categories/v1/all-categories?page=1&per_page=7`
  );
  const [imageFile, setImageFile] = useState(null); // State to store selected image file

  const { category } = useCategoryModal();
  const { toggle } = useModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: category.name,
      description: category.description,
      slug: category.slug,
      parent: category.parent || 0,
    },
  });
  // Handle Image File Change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("slug", data.slug);
    formData.append("parent", data.parent);

    if (imageFile) {
      formData.append("image", imageFile); // Add image to the form data
    }

    let apiCall;
    if (category.id) {
      apiCall = $api.post(
        `wp-json/categories/v1/update-category/${category.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } else {
      apiCall = $api.post(`wp-json/categories/v1/add-category`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
    PromiseToast(
      apiCall,
      "جاري تحديث البيانات...",
      "فشلت العملية حاول لاحقًا",
      category.id ? "تم التحديث بنجاح!" : "تمت الإضافة بنجاح!",
      () => {
        mutate();
      }
    );

    toggle();
    reset();
  };

  return (
    <div>
      <h1 className="text-2xl mb-5">
        {category.id ? "تعديل التصنيف" : "إضافة تصنيف جديد"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="الاسم"
          register={{ ...register("name", { required: true }) }}
          error={errors.name?.message}
        />
        <TextField
          label="الوصف"
          isTextArea={true}
          register={{ ...register("description", { required: false }) }}
          error={errors.description?.message}
        />
        <TextField
          label="المعرف الفريد (Slug)"
          register={{ ...register("slug", { required: false }) }}
          error={errors.slug?.message}
        />
        <TextField
          label="التصنيف الأب"
          type="number"
          register={{ ...register("parent", { required: false }) }}
          error={errors.parent?.message}
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {"تغيير الصورة"}
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <MainButton text="Save" />
      </form>
    </div>
  );
};

export default CategoryModal;
