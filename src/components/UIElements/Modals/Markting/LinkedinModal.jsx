import { useForm } from "react-hook-form";
import TextField from "../../Form/TextField";
import MainButton from "../../MainButton";
import useModal from "../../../../store/useModal";
import PromiseToast from "../../Toasts/PromiseToast";
import { $api } from "../../../../client";
const LinkedinModal = () => {
  const { toggle } = useModal();
  const { register, handleSubmit , 
    formState: { errors },
   } = useForm();

  const onSubmit = (data) => {
   
   
    console.log(data);
    const sendData = $api.post('wp-json/pixels/v1/add-linkedin-code' , {
      code:data.code
    });
    toggle();
    PromiseToast(sendData , 'جاري ارسال البيكسل')
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          isTextArea={true}
          label={"ادخل كود البيكسل هنا "}
          register={{ ...register("code" , { required: "This is required." } ) }}
          error={errors.code?.message ?? ''}
        />
        
        <MainButton text={"حفظ"} />
      </form>
    </div>
  );
};

export default LinkedinModal;
