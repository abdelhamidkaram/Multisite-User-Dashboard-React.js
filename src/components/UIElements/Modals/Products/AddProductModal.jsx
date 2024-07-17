import { useForm } from 'react-hook-form';
import { $api } from '../../../../client';
import MainButton from '../../MainButton';
import PromiseToast from '../../Toasts/PromiseToast';
import TextField from '../../Form/TextField';
import useModal from '../../../../store/useModal';
import SelectField from '../../Form/SelectField';

const AddProductModal = () => {
  const { toggle } = useModal();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      regular_price: '',
      sale_price: '',
      stock_status: '',
      short_description: '',
      categories: '',
      images: null,
    }
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('regular_price', data.regular_price);
    formData.append('sale_price', data.sale_price);
    formData.append('stock_status', data.stock_status);
    formData.append('short_description', data.short_description);
    formData.append('categories', JSON.stringify([data.categories]));

    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append(`images[${i}]`, data.images[i]);
      }
    }

    let apiCall;
    apiCall = $api.post('wp-json/products/v1/add-product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    PromiseToast(
      apiCall,
      "جاري إضافة المنتج...",
      "فشلت العملية حاول لاحقًا",
      "تم إضافة المنتج بنجاح!"
    );

    toggle();
    reset();
  };

  return (
    <div>
      <h1 className="text-2xl mb-5">
        {"إضافة منتج جديد"}
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
          register={{...register('short_description', { required: true })}}
          error={errors.short_description?.message}
        />
        <TextField
          label="السعر"
          type="number"
          register={{...register('regular_price', { required: true })}}
          error={errors.regular_price?.message}
        />
        <TextField
          label="السعر بعد التخفيض"
          type="number"
          register={{...register('sale_price')}}
          error={errors.sale_price?.message}
        />
        <SelectField 
          label="الحالة"
          register={{...register('stock_status', { required: true })}}
          items={['instock', 'outofstock']}
          error={errors.stock_status?.message}
          value={'instock'}
        />
        <TextField
          label="التصنيف"
          register={{...register('categories', { required: true })}}
          error={errors.categories?.message}
        />
        <input
          type="file"
          multiple
          {...register('images', { required: true })}
        />
        <MainButton text="إضافة" />
      </form>
    </div>
  );
};

export default AddProductModal;
