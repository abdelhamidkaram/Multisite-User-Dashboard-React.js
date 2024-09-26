import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import TextField from "../../../components/UIElements/Form/TextField";
import CheckBoxField from "../../../components/UIElements/Form/CheckBoxField";
import MainButton from "../../../components/UIElements/MainButton";
import TapLogo from "../../../assets/images/tap.png";  
import { $api, useData } from "../../../client"; // استخدام useData لجلب البيانات
import PromiseToast from "../../../components/UIElements/Toasts/PromiseToast";
import FormLoading from "../../../components/UIElements/Form/FormLoading";

const TapAccountSettings = () => {
  const [tapEnable, setTapEnable] = useState(false);
  const [tapTestMode, setTapTestMode] = useState(false);
  const {
    data: data,
    error: error,
    mutate: mutate,
    isLoading: isLoading,
  } = useData("https://www.motkaml.online/wp-json/tap/v1/settings/");

  const schema = Yup.object().shape({
    title: Yup.string().required("حقل مطلوب"),
    description: Yup.string().required("حقل مطلوب"),
    test_secret_key: Yup.string().required("حقل مطلوب"),
    test_public_key: Yup.string().required("حقل مطلوب"),
    live_public_key: Yup.string().required("حقل مطلوب"),
    live_secret_key: Yup.string().required("حقل مطلوب"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data) {
      setValue('title', data.data.title || "");
      setValue('description', data.data.description || "");
      setValue('test_secret_key', data.data.test_secret_key || "");
      setValue('test_public_key', data.data.test_public_key || "");
      setValue('live_public_key', data.data.live_public_key || "");
      setValue('live_secret_key', data.data.live_secret_key || "");
      setTapEnable(data.data.enable === "0");
      setTapTestMode(data.data.test_mod === "0");

    }

    if (error) {
      console.error("Error fetching Tap data:", error);
    }
  }, [data, error, setValue]);

  const onSubmit = async (formData) => {
    try {
      const res =  $api.post("wp-json/tap/v1/settings/", {
        enable: tapEnable,
        test_mode: tapTestMode,
        path: localStorage.getItem('path'),
        ...formData,
      });
      PromiseToast(res, "جاري إرسال البيانات" , "فشل الارسال حاول لاحقا", "تم الارسال بنجاح", ()=>{mutate();});
    } catch (error) {
      console.error("Error submitting Tap form:", error);
    }
  };
     

  return (
    <div className="relative">
      <FormLoading Loading={isLoading} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`border-2 p-4 rounded-md shadow-md ${
            tapEnable ? "border-green-500 shadow-green-500" : "border-slate-100"
          }`}
        >
          <div className="flex items-center gap-4 w-full pb-4">
            <img src={TapLogo} className="w-24" alt="Tap Logo" />
            <CheckBoxField
              name="Enable_account"
              endLabel="تفعيل"
              label="بوابة الدفع : تاب"
              value={tapEnable}
              handleChange={() => setTapEnable(!tapEnable)}
            />
          </div>
          <hr />
          <CheckBoxField
            name="Enable_test_mode"
            endLabel="تفعيل وضع الاختبار"
            label="وضع الاختبار"
            value={tapTestMode}
            handleChange={() => setTapTestMode(!tapTestMode)}
          />
          <div className="flex flex-wrap">
            <TextField
              name="title"
              label="العنوان"
              register={register("title")}
              error={errors.title?.message}
            />
            <TextField
              name="description"
              label="الوصف"
              register={register("description")}
              error={errors.description?.message}
              isTextArea
            />
            <TextField
              name="test_secret_key"
              label="مفتاح الاختبار السري"
              register={register("test_secret_key")}
              error={errors.test_secret_key?.message}
            />
            <TextField
              name="test_public_key"
              label="مفتاح الاختبار العام"
              register={register("test_public_key")}
              error={errors.test_public_key?.message}
            />
            <TextField
              name="live_public_key"
              label="مفتاح الإنتاج العام"
              register={register("live_public_key")}
              error={errors.live_public_key?.message}
            />
            <TextField
              name="live_secret_key"
              label="مفتاح الإنتاج السري"
              register={register("live_secret_key")}
              error={errors.live_secret_key?.message}
            />
          </div>
          <MainButton text="حفظ" />
          <p>
            * سيتم تفعيل بوابة الدفع خلال ساعات قليلة بعد إرسال الطلب *
          </p>
        </div>
      </form>
    </div>
  );
};

export default TapAccountSettings;
