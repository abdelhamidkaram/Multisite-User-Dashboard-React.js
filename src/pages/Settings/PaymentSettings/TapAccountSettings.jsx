import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import TextField from "../../../components/UIElements/Form/TextField";
import CheckBoxField from "../../../components/UIElements/Form/CheckBoxField";
import MainButton from "../../../components/UIElements/MainButton";
import TapLogo from "../../../assets/images/tap.png";  
import { $api } from "../../../client";
import PromiseToast from "../../../components/UIElements/Toasts/PromiseToast";
import FormLoading from "../../../components/UIElements/Form/FormLoading";

const TapAccountSettings = () => {
  const [tapEnable, setTapEnable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tapTestMode, setTapTestMode] = useState(false);
  const [data, setData] = useState({});
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
    const getData = async () => {
      try {
        setLoading(true);
        const res = await $api.get("wp-json/tap/v1/settings/");
        if (res.status) {
          const fetchedData = res.data.data;
          setData(fetchedData);
          setValue('title', fetchedData.title);
          setValue('description', fetchedData.description);
          setValue('test_secret_key', fetchedData.test_secret_key);
          setValue('test_public_key', fetchedData.test_public_key);
          setValue('live_public_key', fetchedData.live_public_key);
          setValue('live_secret_key', fetchedData.live_secret_key);

          setTapEnable(fetchedData.enable === "0");
          setTapTestMode(fetchedData.test_mode === "0");
        }
      } catch (error) {
        console.error("Error fetching Tap data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const res =  $api.post("wp-json/tap/v1/settings/", {
        enable: tapEnable,
        test_mode: tapTestMode,
        path:localStorage.getItem('path'),
        ...formData,
      });
      PromiseToast(res, "جاري إرسال البيانات");
    } catch (error) {
      console.error("Error submitting Tap form:", error);
    }
  };

  return (
    <div className="relative">
      <FormLoading loading={loading} />
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
              value={data.title || ""}
              error={errors.title?.message}
            />
            <TextField
              name="description"
              label="الوصف"
              register={register("description")}
              value={data.description || ""}
              error={errors.description?.message}
              isTextArea
            />
            <TextField
              name="test_secret_key"
              label="مفتاح الاختبار السري"
              register={register("test_secret_key")}
              value={data.test_secret_key || ""}
              error={errors.test_secret_key?.message}
            />
            <TextField
              name="test_public_key"
              label="مفتاح الاختبار العام"
              register={register("test_public_key")}
              value={data.test_public_key || ""}
              error={errors.test_public_key?.message}
            />
            <TextField
              name="live_public_key"
              label="مفتاح الإنتاج العام"
              register={register("live_public_key")}
              value={data.live_public_key || ""}
              error={errors.live_public_key?.message}
            />
            <TextField
              name="live_secret_key"
              label="مفتاح الإنتاج السري"
              register={register("live_secret_key")}
              value={data.live_secret_key || ""}
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
