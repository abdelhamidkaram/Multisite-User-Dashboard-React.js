import { useForm } from 'react-hook-form';
import { $api } from '../../../../client';
import MainButton from '../../MainButton';
import PromiseToast from '../../Toasts/PromiseToast';
import TextField from '../../Form/TextField';
import useModal from '../../../../store/useModal';

const AddPageModal = () => {
  const { toggle } = useModal();
  const { register, handleSubmit, reset} = useForm({
    defaultValues: {
      name: '',
      content: '',
      
    }
  });

  const onSubmit = async (data) => {
    let apiCall;
    apiCall = $api.post('wp-json/store/v1/pages', data);
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
        إضافة صفحة جديدة
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField register={{...register('name' , {required:true})}} label={'عنوان'} />
        <TextField register={{...register('content' , {required:true})}} label={'المحتوي'} isTextArea={true} />
        <MainButton text="إضافة" />
      </form>
    </div>
  );
};

export default AddPageModal;
