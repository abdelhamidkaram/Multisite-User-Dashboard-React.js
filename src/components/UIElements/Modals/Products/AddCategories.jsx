import { useForm } from 'react-hook-form';
import { $api, useData } from '../../../../client';
import MainButton from '../../MainButton';
import PromiseToast from '../../Toasts/PromiseToast';
import TextField from '../../Form/TextField';
import useModal from '../../../../store/useModal';

const AddCategoryModal = () => {
  const { toggle } = useModal();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      description: '',
      slug: '',
      parent: 0
    }
  });
  const {mutate:mutate} =useData('wp-json/categories/v1/all-categories');

  const onSubmit = async (data) => {
    let apiCall;
    apiCall = $api.post('wp-json/categories/v1/add-category', data);
    PromiseToast(
      apiCall,
      "جاري إضافة التصنيف...",
      "فشلت العملية حاول لاحقًا",
      "تم إضافة التصنيف بنجاح!",
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
        {"إضافة تصنيف جديد"}
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

        <MainButton text="إضافة" />
      </form>
    </div>
  );
};

export default AddCategoryModal;

