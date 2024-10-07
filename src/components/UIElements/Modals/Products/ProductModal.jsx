import { useForm } from "react-hook-form";
import { $api } from "../../../../client";
import MainButton from "../../MainButton";
import PromiseToast from "../../Toasts/PromiseToast";
import useModal from "../../../../store/useModal";
import useProductModal from "../../../../store/modals/ProductModal"; 
import TextField from "../../Form/TextField";
import SelectField from "../../Form/SelectField";

const ProductModal = () => {
  const { product } = useProductModal(); 
  const { toggle } = useModal();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: product.name,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      stock_status: product.stock_status,
      short_description: product.short_description,
      categories: product.categories,
    }
  });

  const onSubmit = async (data) => {
    data['categories'] = [data['categories']];
    let apiCall;
    apiCall = $api.post(`wp-json/products/v1/update-product/${product.id}`, data);
    PromiseToast(
      apiCall,
      "جاري تحديث البيانات...",
      "فشلت العملية حاول لاحقًا",
      "تم التحديث بنجاح!"
    );

    toggle();
    reset();
  };

  return (
    <div>
      <h1 className="text-2xl mb-5">
        {"تعديل المنتج "}
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
          error={errors.name?.message}
        />
        <TextField
          label="السعر"
          type="number"
          register={{...register('regular_price', { required: true })}}
          error={errors.price?.message}
        />
        <TextField
          label="السعر بعد التخفيض"
          type="number"
          register={{...register('sale_price', { required: true })}}
          error={errors.price?.message}
        />
        <SelectField 
        label="الحالة"
        register={{...register('stock_status', { required: true })}}
         items={['instock ', 'outofstock']}
         error={errors.stock_status?.message}
         value={ product.stock_status}
        />

        <TextField
          label="التصنيف"
          register={{...register('categories', { required: true })}}
          error={errors.category?.message}
        />

        <MainButton text="Save" />
      </form>
    </div>
  );
};

export default ProductModal;
