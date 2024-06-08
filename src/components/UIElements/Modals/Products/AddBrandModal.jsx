import { useForm } from 'react-hook-form';
import { $api } from '../../../../client';
import MainButton from '../../MainButton';
import PromiseToast from '../../Toasts/PromiseToast';
import TextField from '../../Form/TextField';
import useModal from '../../../../store/useModal';

const AddBrandModal = () => {
  const { toggle } = useModal();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      description: '',
      slug: ''
    }
  });

  const onSubmit = async (data) => {
    let apiCall;
    apiCall = $api.post('wp-json/brands/v1/add-brand', data);
    PromiseToast(
      apiCall,
      "جاري إضافة العلامة التجارية...",
      "فشلت العملية حاول لاحقًا",
      "تم إضافة العلامة التجارية بنجاح!"
    );

    toggle();
    reset();
  };

  return (
    <div>
      <h1 className="text-2xl mb-5">
        {"إضافة علامة تجارية جديدة"}
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

        <MainButton text="إضافة" />
      </form>
    </div>
  );
};

export default AddBrandModal;
