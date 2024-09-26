import { useForm } from "react-hook-form";
import { $api } from "../../../../client/index.js";
import useModal from "../../../../store/useModal";
import PromiseToast from "../../../UIElements/Toasts/PromiseToast.jsx"
import TextField from "../../../UIElements/Form/TextField.jsx"
import MainButton from "../../../UIElements/MainButton.jsx"
const FacebookModal = () => {
  const { toggle } = useModal();
  const { register, handleSubmit , 
    formState: { errors },
   } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const sendData = $api.post('wp-json/pixels/v1/add-fc-code' , {
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

export default FacebookModal;
