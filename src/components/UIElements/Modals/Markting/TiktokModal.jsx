import { useForm } from "react-hook-form";
import TextField from "../../Form/TextField";
import MainButton from "../../MainButton";
import useModal from "../../../../store/useModal";
import PromiseToast from "../../Toasts/PromiseToast";
import { $api } from "../../../../client";

const TikTokPixelModal = () => {
  const { toggle } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const sendData = $api.post("wp-json/pixels/v1/add-tiktok-code", {
      pixel_id: data.pixelId,
    });
    toggle();
    PromiseToast(sendData, "جاري إرسال بيانات TikTok Pixel");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label={"ادخل Pixel ID هنا"}
          register={{
            ...register("pixelId", { required: "This is required." }),
          }}
          error={errors.pixelId?.message ?? ""}
        />

        <MainButton text={"حفظ"} />
      </form>
    </div>
  );
};

export default TikTokPixelModal;
