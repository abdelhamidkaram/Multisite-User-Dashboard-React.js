import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import TextField from "../../../components/UIElements/Form/TextField";
import CheckBoxField from "../../../components/UIElements/Form/CheckBoxField";
import MainButton from "../../../components/UIElements/MainButton";
import UPaymentsLogo from "../../../assets/images/upayments.png"; 
import { $api, useData } from "../../../client"; // استخدام useData لجلب البيانات
import PromiseToast from "../../../components/UIElements/Toasts/PromiseToast";
import FormLoading from "../../../components/UIElements/Form/FormLoading";

const UPaymentsAccountSettings = () => {
  const [uPaymentsEnable, setUPaymentsEnable] = useState(false);
  const [uPaymentsTestMode, setUPaymentsTestMode] = useState(false);

  const { data, error, isLoading , mutate } = useData("wp-json/uPayments/v1/settings/");

  const schema = Yup.object().shape({
    uPayments_title: Yup.string().required("حقل مطلوب"),
    uPayments_description: Yup.string().required("حقل مطلوب"),
    uPayments_api_key: Yup.string().required("حقل مطلوب"),

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
      setValue('uPayments_title', data.data.title || "");
      setValue('uPayments_description', data.data.description || "");
      setValue('uPayments_api_key', data.data.api_key || "");

      setUPaymentsEnable(data.data.enable === "0");
      setUPaymentsTestMode(data.data.test_mod === "0");
    }

    if (error) {
      console.error("Error fetching UPayments data:", error);
    }
  }, [data, error, setValue]);

  const onSubmit = async (formData) => {
    try {
      const res =  $api.post("wp-json/uPayments/v1/settings/", {
        uPayments_enable: uPaymentsEnable,
        uPayments_test_mode: uPaymentsTestMode,
        order_status: "processing",
        path: localStorage.getItem("path"),
        ...formData,
      });
      PromiseToast(res, "جاري إرسال البيانات" , "فشل في إرسال البيانات", "تم إرسال البيانات بنجاح", ()=>{mutate();});
    } catch (error) {
      console.error("Error submitting UPayments form:", error);
    }
  };

  return (
    <div className="relative">
      <FormLoading Loading={isLoading} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`border-2 p-4 rounded-md shadow-md ${
            uPaymentsEnable ? "border-green-500 shadow-green-500" : "border-slate-100"
          }`}
        >
          <div className="flex items-center gap-4 w-full pb-4">
            <img src={UPaymentsLogo} className="w-24" alt="UPayments Logo" />
            <CheckBoxField
              name="Enable_uPayments_account"
              endLabel="تفعيل"
              label="بوابة الدفع : يوبيمنتس "
              value={uPaymentsEnable}
              handleChange={() => setUPaymentsEnable(!uPaymentsEnable)}
            />
          </div>
          <hr />
          <CheckBoxField
            name="Enable_uPayments_test_mode"
            endLabel="تفعيل وضع الاختبار"
            label="وضع الاختبار"
            value={uPaymentsTestMode}
            handleChange={() => setUPaymentsTestMode(!uPaymentsTestMode)}
          />
          <div className="flex flex-wrap">
            <TextField
              name="uPayments_title"
              label="العنوان"
              register={register("uPayments_title")}
              error={errors.uPayments_title?.message}
            />
            <TextField
              name="uPayments_description"
              label="الوصف"
              register={register("uPayments_description")}
              error={errors.uPayments_description?.message}
              isTextArea
            />
            <TextField
              name="uPayments_api_key"
              label="مفتاح العميل"
              register={register("uPayments_api_key")}
              error={errors.uPayments_api_key?.message}
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

export default UPaymentsAccountSettings;
