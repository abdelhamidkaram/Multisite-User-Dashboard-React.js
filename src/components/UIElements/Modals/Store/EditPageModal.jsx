import { useForm } from 'react-hook-form';
import { $api, useData } from '../../../../client';
import MainButton from '../../MainButton';
import PromiseToast from '../../Toasts/PromiseToast';
import TextField from '../../Form/TextField';
import useModal from '../../../../store/useModal';
import usePageModal from '../../../../store/modals/PageModal'; // Adjust the import path as per your store structure


const EditPageModal = () => {
  function removeHtmlTags(input) {
    return input.replace(/<[^>]*>/g, '');
}

  const {mutate: pagesMutate } = useData("wp-json/store/v1/pages");
  const defaultPagesSlug = ['my-account' , 'checkout' , 'cart' , 'shop'];
  const { page } = usePageModal(); 
  console.log(page);
  const { toggle } = useModal();
  const { register, handleSubmit,reset } = useForm({
    defaultValues: {
      name: page?.name ?? '',
      content: removeHtmlTags(page?.content ?? '')
    }
  });


  const onSubmit = (data) => {
    let apiCall;
    apiCall=  $api.post(`wp-json/store/v1/pages/${page.id}`, data);
    PromiseToast(
        apiCall,
      "جاري تحديث الصفحة",
      "فشل تحديث الصفحة حاول لاحقا",
      "تم تحديث الصفحة بنجاح!",
      () => {
        pagesMutate();
      }
    );

    toggle();
    reset();
  };

  return (
    <div>
      <h1 className="text-2xl mb-5">{"تعديل الصفحة"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="اسم الصفحة"
          register={{...register('name', { required: true })}}
          
        />

        {!defaultPagesSlug.includes(page.url.split("/")[page.url.split("/").length - 2]) && <TextField
          label="المحتوى"
          register={{...register('content', { required: true })}}
          isTextArea={true}
        />}

        <MainButton text="تحديث" />
      </form>
    </div>
  );
};

export default EditPageModal;
