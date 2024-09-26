import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import TextField from "../../../components/UIElements/Form/TextField";
import CheckBoxField from "../../../components/UIElements/Form/CheckBoxField";
import MainButton from "../../../components/UIElements/MainButton";
import Myfatora from "../../../assets/images/myfatora.svg";
import { $api, useData } from "../../../client"; // استخدام useData
import PromiseToast from "../../../components/UIElements/Toasts/PromiseToast";
import FormLoading from "../../../components/UIElements/Form/FormLoading";

const MyfatoraAccountSettings = () => {
  // State variables for enabling features
  const [myfatoraEnable, setMyfatoraEnable] = useState(false);
  const [myfatoraTestMod, setMyfatoraTestMod] = useState(false);

  // Validation schema using Yup
  const schema = Yup.object().shape({
    myfatoorah_title: Yup.string().required("حقل مطلوب"),
    myfatoorah_description: Yup.string().required("حقل مطلوب"),
    myfatoorah_api_Key: Yup.string().required("حقل مطلوب"),
    myfatoorah_account_number: Yup.string().required("حقل مطلوب"),
  });

  // Hook form setup with validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schema),
  });

  // استخدام useData لجلب بيانات الإعدادات
  const { data:data,error: error, mutate:mutate, isLoading: loading } = useData("https://www.motkaml.online/wp-json/myfatoorah/v1/settings/");

  // تحديث الحقول بناءً على البيانات المحملة
  useEffect(() => {
    if (data) {
      console.log(data);
      
      setValue("myfatoorah_title", data.data.title || "");
      setValue("myfatoorah_description", data.data.description || "");
      setValue("myfatoorah_api_Key", data.data.api_key || "");
      setValue("myfatoorah_account_number", data.data.account_number || "");

      setMyfatoraEnable(data.enable === "0");
      setMyfatoraTestMod(data.test_mod === "0");
    }

    if (error) {
      console.error("Error fetching data:", error);
    }
  }, [data, error , setValue]);

  // Form submission handler
  const onSubmit = async (formData) => {
    try {
      const res = $api.post("https://www.motkaml.online/wp-json/myfatoorah/v1/settings/", {
        myfatoorah_enable: myfatoraEnable,
        myfatoorah_test_mode: myfatoraTestMod,
        path: localStorage.getItem("path"),
        ...formData,
      });

      PromiseToast(
        res, 
        "جاري ارسال البيانات", 
        "فشل في ارسال البيانات", 
        "تم إرسال البيانات بنجاح",
        () => mutate() 
      );
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="relative">
      <FormLoading Loading={loading} /> 
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`border-2 p-4 rounded-md shadow-md ${
            myfatoraEnable ? "border-green-500 shadow-green-500" : "border-slate-100"
          }`}
        >
          <div className="flex items-center gap-4 w-full pb-4">
            <img src={Myfatora} className="w-24" alt="Myfatora Logo" />
            <CheckBoxField
              name="Enable_myfatora_account"
              endLabel="تفعيل"
              label="بوابة الدفع : ماي فاتورة"
              value={myfatoraEnable}
              handleChange={() => setMyfatoraEnable(!myfatoraEnable)}
            />
          </div>
          <hr />
          <CheckBoxField
            name="Enable_myfatora_test_mode"
            endLabel="تفعيل وضع الاختبار"
            label="الاختبار"
            value={myfatoraTestMod}
            handleChange={() => setMyfatoraTestMod(!myfatoraTestMod)}
          />
          <div className="flex flex-wrap">
            <TextField
              name="myfatoorah_title"
              label="العنوان"
              register={register("myfatoorah_title")}
              error={errors.myfatoorah_title?.message}
            />
            <TextField
              name="myfatoorah_description"
              label="الوصف"
              register={register("myfatoorah_description")}
              error={errors.myfatoorah_description?.message}
              isTextArea
            />
            <TextField
              name="myfatoorah_api_Key"
              label="(API Key)رمز التكامل"
              register={register("myfatoorah_api_Key")}
              error={errors.myfatoorah_api_Key?.message}
            />
            <TextField
              name="myfatoorah_account_number"
              label="رقم الحساب"
              register={register("myfatoorah_account_number")}
              error={errors.myfatoorah_account_number?.message}
            />
          </div>
          <MainButton text="حفظ" />
          <p>
            * يتم تفعيل بوابة الدفع في متجرك خلال ساعات قليلة بعد إرسال طلبك *
          </p>
        </div>
      </form>
    </div>
  );
};

export default MyfatoraAccountSettings;
