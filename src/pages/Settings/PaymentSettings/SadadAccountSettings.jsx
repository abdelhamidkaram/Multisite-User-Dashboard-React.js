import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import TextField from "../../../components/UIElements/Form/TextField";
import CheckBoxField from "../../../components/UIElements/Form/CheckBoxField";
import MainButton from "../../../components/UIElements/MainButton";
import SadadLogo from "../../../assets/images/sadad.png";
import { $api, useData } from "../../../client";
import PromiseToast from "../../../components/UIElements/Toasts/PromiseToast";
import FormLoading from "../../../components/UIElements/Form/FormLoading";

const SadadAccountSettings = () => {
  const [sadadEnable, setSadadEnable] = useState(false);
  const [sadadTestMode, setSadadTestMode] = useState(false);

  const {
    data: data,
    error: error,
    mutate: mutate,
    isLoading: loading,
  } = useData("https://www.motkaml.com/wp-json/sadad/v1/settings");

  const schema = Yup.object().shape({
    sadad_title: Yup.string().required("حقل مطلوب"),
    sadad_description: Yup.string().required("حقل مطلوب"),
    sadad_client_key: Yup.string().required("حقل مطلوب"),
    sadad_client_secret: Yup.string().required("حقل مطلوب"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data) {
      setValue("sadad_title", data.data.title || "");
      setValue("sadad_description", data.data.description || "");
      setValue("sadad_client_key", data.data.client_key || "");
      setValue("sadad_client_secret", data.data.client_secret || "");

      setSadadEnable(data.data.enable === "0");
      setSadadTestMode(data.data.test_mod === "0");
    }
    if (error) {
      console.error("Error fetching Sadad data:", error);
    }
  }, [data, error, setValue]);

  const onSubmit = async (formData) => {
    try {
      const res =  $api.post("https://www.motkaml.com/wp-json/sadad/v1/settings/", {
        sadad_enable: sadadEnable,
        sadad_test_mode: sadadTestMode,
        order_status: "processing",
        path: localStorage.getItem("path"),
        ...formData,
      });
      PromiseToast(
        res,
        "جاري إرسال البيانات إلى سداد",
        "فشل في إرسال البيانات",
        "تم إرسال البيانات بنجاح",
        () => {
          mutate();
        }
      );
    } catch (error) {
      console.error("Error submitting Sadad form:", error);
    }
  };

  return (
    <div className="relative">
      <FormLoading Loading={loading} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`border-2 p-4 rounded-md shadow-md ${
            sadadEnable
              ? "border-green-500 shadow-green-500"
              : "border-slate-100"
          }`}
        >
          <div className="flex items-center gap-4 w-full pb-4">
            <img src={SadadLogo} className="w-24" alt="Sadad Logo" />
            <CheckBoxField
              name="Enable_sadad_account"
              endLabel="تفعيل"
              label="بوابة الدفع : سداد"
              value={sadadEnable}
              handleChange={() => setSadadEnable(!sadadEnable)}
            />
          </div>
          <hr />
          <CheckBoxField
            name="Enable_sadad_test_mode"
            endLabel="تفعيل وضع الاختبار"
            label="وضع الاختبار"
            value={sadadTestMode}
            handleChange={() => setSadadTestMode(!sadadTestMode)}
          />
          <div className="flex flex-wrap">
            <TextField
              name="sadad_title"
              label="العنوان"
              register={register("sadad_title")}
              error={errors.sadad_title?.message}
            />
            <TextField
              name="sadad_description"
              label="الوصف"
              register={register("sadad_description")}
              error={errors.sadad_description?.message}
              isTextArea
            />
            <TextField
              name="sadad_client_key"
              label="مفتاح العميل"
              register={register("sadad_client_key")}
              error={errors.sadad_client_key?.message}
            />
            <TextField
              name="sadad_client_secret"
              label="سر العميل"
              register={register("sadad_client_secret")}
              error={errors.sadad_client_secret?.message}
            />
          </div>
          <MainButton text="حفظ" />
          <p>* سيتم تفعيل بوابة الدفع خلال ساعات قليلة بعد إرسال الطلب *</p>
        </div>
      </form>
    </div>
  );
};

export default SadadAccountSettings;
