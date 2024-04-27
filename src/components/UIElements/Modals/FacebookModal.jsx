import { useForm } from "react-hook-form";
import TextField from "../Form/TextField";
import MainButton from "../MainButton";
import useModal from "../../../store/useModal";
import PromiseToast from "../Toasts/PromiseToast";
const FacebookModal = () => {
  const { toggle } = useModal();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
   
   
    console.log(data);
    //TODO: API CALL FOR SEND FB PIXEL
    const sendData = fetch('https:google.com');
    toggle();
    PromiseToast(sendData , 'جاري ارسال البيكسل')
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          isTextArea={true}
          label={"ادخل كود البيكسل هنا "}
          register={{ ...register("code") }}
        />
        <MainButton text={"حفظ"} />
      </form>
    </div>
  );
};

export default FacebookModal;
