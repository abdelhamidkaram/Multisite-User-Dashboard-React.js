import { useForm } from "react-hook-form";
import TextField from "../../Form/TextField";
import MainButton from "../../MainButton";
import useModal from "../../../../store/useModal";
import PromiseToast from "../../Toasts/PromiseToast";
import { $api } from "../../../../client";

const GoogleAdsModal = () => {
  const { toggle } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const sendData = $api.post("wp-json/pixels/v1/add-google-code", {
      conversion_id: data.conversionId,
      conversion_label: data.conversionLabel,
    });
    toggle();
    PromiseToast(sendData, "جاري إرسال بيانات Google Ads");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label={"ادخل Conversion ID هنا"}
          register={{
            ...register("conversionId", { required: "This is required." }),
          }}
          error={errors.conversionId?.message ?? ""}
        />

        <TextField
          label={"ادخل Conversion Label هنا"}
          register={{
            ...register("conversionLabel", { required: "This is required." }),
          }}
          error={errors.conversionLabel?.message ?? ""}
        />

        <MainButton text={"حفظ"} />
      </form>
    </div>
  );
};

export default GoogleAdsModal;
