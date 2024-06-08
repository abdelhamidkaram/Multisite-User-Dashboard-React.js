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
    }
  });

  const onSubmit = async (data) => {
    data['categories'] = [data['categories']];
    let apiCall;
    apiCall = $api.post('wp-json/products/v1/add-product', data);
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
         items={['instock ', 'outofstock']}
         error={errors.stock_status?.message}
         value={'instock'}
        />
        <TextField
          label="التصنيف"
          register={{...register('categories', { required: true })}}
          error={errors.categories?.message}
        />

        <MainButton text="إضافة" />
      </form>
    </div>
  );
};

export default AddProductModal;
