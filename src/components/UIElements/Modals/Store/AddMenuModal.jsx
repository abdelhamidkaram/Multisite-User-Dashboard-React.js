import { useForm, useFieldArray } from 'react-hook-form';
import { $api } from '../../../../client';
import MainButton from '../../MainButton';
import PromiseToast from '../../Toasts/PromiseToast';
import TextField from '../../Form/TextField';
import useModal from '../../../../store/useModal';

const AddMenuModal = () => {
  const { toggle } = useModal();
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      items: [{ title: '', url: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  const onSubmit = async (data) => {
    let apiCall;
    apiCall = $api.post('wp-json/store/v1/menus', data);
    PromiseToast(
      apiCall,
      "جاري إضافة القائمة...",
      "فشلت العملية حاول لاحقًا",
      "تم إضافة القائمة بنجاح!"
    );

    toggle();
    reset();
  };

  return (
    <div>
      <h1 className="text-2xl mb-5">
        إضافة قائمة جديدة
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="الاسم"
          {...register('name', { required: true })}
          error={errors.name?.message}
        />

        <h2 className="text-xl mb-3">
          عناصر القائمة
        </h2>
        {fields.map((item, index) => (
          <div key={item.id} className="mb-4">
            <TextField
              label="عنوان العنصر"
              {...register('title', { required: true })}
              error={errors.items?.[index]?.title?.message}
            />
            <TextField
              label="رابط العنصر"
              {...register(`items.${index}.url`, { required: true })}
              error={errors.items?.[index]?.url?.message}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            >
              إزالة العنصر
            </button>
          </div>
        ))}
        <div className='flex justify-between ps-3 pe-3'>
          <button
            type="button"
            onClick={() => append({ title: '', url: '' })}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
          >
            إضافة عنصر جديد
          </button>

          <MainButton text="إضافة" />
        </div>
      </form>
    </div>
  );
};

export default AddMenuModal;
