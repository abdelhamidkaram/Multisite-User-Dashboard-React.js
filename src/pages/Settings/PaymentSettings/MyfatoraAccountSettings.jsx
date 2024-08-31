import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import TextField from "../../../components/UIElements/Form/TextField";
import CheckBoxField from "../../../components/UIElements/Form/CheckBoxField";
import MainButton from "../../../components/UIElements/MainButton";
import Myfatora from "../../../assets/images/myfatora.svg";
import { $api } from "../../../client";
import PromiseToast from "../../../components/UIElements/Toasts/PromiseToast";
import { BounceLoader } from "react-spinners";

const MyfatoraAccountSettings = () => {
  // State variables for loading, enabling features, and data management
  const [myfatoraEnable, setMyfatoraEnable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myfatoraTestMod, setMyfatoraTestMod] = useState(false);
  const [data, setData] = useState({});
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

  // Fetch initial data on component mount
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await $api.get("wp-json/myfatoorah/v1/settings/");
        if (res.status) {
          const fetchedData = res.data.data;
          setData(fetchedData);
          setValue("myfatoorah_title", fetchedData.title || "");
          setValue("myfatoorah_description", fetchedData.description || "");
          setValue("myfatoorah_api_Key", fetchedData.api_key || "");
          setValue("myfatoorah_account_number", fetchedData.account_number || "");

          setMyfatoraEnable(fetchedData.enable === "0");
          setMyfatoraTestMod(fetchedData.test_mod === "0");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);


  // Form submission handler
  const onSubmit = async (formData) => {
    try {
      const res = $api.post("wp-json/myfatoorah/v1/settings/", {
        myfatoorah_enable: myfatoraEnable,
        myfatoorah_test_mode: myfatoraTestMod,
        path: localStorage.getItem("path"),
        ...formData,
      });
      PromiseToast(res, "جاري ارسال البيانات");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute top-0 bottom-0 w-full bg-blue-dark bg-opacity-60 rounded-md flex items-center justify-center">
          <BounceLoader />
        </div>
      )}
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
              value={data.title || ""}
              error={errors.myfatora_title?.message}
            />
            <TextField
              name="myfatoorah_description"
              label="الوصف"
              register={register("myfatoorah_description")}
              value={data.description || ""}
              error={errors.myfatora_description?.message}
              isTextArea
            />
            <TextField
              name="myfatoorah_api_Key"
              label="(API Key)رمز التكامل"
              register={register("myfatoorah_api_Key")}
              value={data.api_key || ""}
              error={errors.myfatora_api_Key?.message}
            />
            <TextField
              name="myfatoorah_account_number"
              label="رقم الحساب"
              register={register("myfatoorah_account_number")}
              value={data.account_number || ""}
              error={errors.myfatora_account_number?.message}
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
