import { useForm } from "react-hook-form";
import { $api, useData } from "../../../../client";
import MainButton from "../../MainButton";
import PromiseToast from "../../Toasts/PromiseToast";
import useModal from "../../../../store/useModal";
import useCategoryModal from "../../../../store/modals/CategoryModal";
import TextField from "../../Form/TextField";

const CategoryModal = () => {
  const {mutate:mutate} =useData('wp-json/categories/v1/all-categories');

  const { category } = useCategoryModal();
  const { toggle } = useModal();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: category.name,
      description: category.description,
      slug: category.slug,
      parent: category.parent || 0
    }
  });

  const onSubmit = async (data) => {
    let apiCall;
    if (category.id) {
      apiCall = $api.post(`wp-json/categories/v1/update-category/${category.id}`, data);
    } else {
      apiCall = $api.post(`wp-json/categories/v1/add-category`, data);
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
          register={{...register('name', { required: true })}}
          error={errors.name?.message}
        />
        <TextField
          label="الوصف"
          isTextArea={true}
          register={{...register('description', { required: false })}}
          error={errors.description?.message}
        />
        <TextField
          label="المعرف الفريد (Slug)"
          register={{...register('slug', { required: false })}}
          error={errors.slug?.message}
        />
        <TextField
          label="التصنيف الأب"
          type="number"
          register={{...register('parent', { required: false })}}
          error={errors.parent?.message}
        />

        <MainButton text="Save" />
      </form>
    </div>
  );
};

export default CategoryModal;
