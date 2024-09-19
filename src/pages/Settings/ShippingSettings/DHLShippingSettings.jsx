import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import TextField from "../../../components/UIElements/Form/TextField";
import CheckBoxField from "../../../components/UIElements/Form/CheckBoxField";
import MainButton from "../../../components/UIElements/MainButton";
import Dhl from "../../../assets/images/dhl.png";
import { $api } from "../../../client";
import PromiseToast from "../../../components/UIElements/Toasts/PromiseToast";
import FormLoading from "../../../components/UIElements/Form/FormLoading";

const DHLShippingSettings = () => {
  // State variables for loading, enabling features, and data management
  const [dhlEnable, setDhlEnable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dhlTestMod, setDhlTestMod] = useState(false);
  const [data, setData] = useState({});
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  // Validation schema using Yup
  const schema = Yup.object().shape({
    dhl_title: Yup.string().required("حقل مطلوب"),
    dhl_description: Yup.string().required("حقل مطلوب"),
    dhl_account_number: Yup.string().required("حقل مطلوب"),
    dhl_api_key: Yup.string().required("حقل مطلوب"),
    dhl_api_secret: Yup.string().required("حقل مطلوب"),
    dhl_conversion_rate: Yup.number().required("حقل مطلوب"),
    dhl_shipper_name: Yup.string().required("حقل مطلوب"),
    dhl_company_name: Yup.string().required("حقل مطلوب"),
    dhl_phone_number: Yup.string().matches(phoneRegExp, 'الرقم غير صحيح').required('حقل مطلوب'),
    dhl_address_line1: Yup.string().required("حقل مطلوب"),
    dhl_address_line2: Yup.string(),
    dhl_city: Yup.string().required("حقل مطلوب"),
    dhl_state: Yup.string().required("حقل مطلوب"),
    dhl_country: Yup.string().required("حقل مطلوب"),
    dhl_payment_country: Yup.string().required("حقل مطلوب"),
    dhl_postal_code: Yup.string().required("حقل مطلوب") ,
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
        const res = await $api.get("wp-json/dhl/v1/settings/");
        if (res.status) {
          const fetchedData = res.data.data;
          setData(fetchedData);
          setValue("dhl_title", fetchedData.dhl_title || "");
          setValue("dhl_description", fetchedData.dhl_description || "");
          setValue("dhl_account_number", fetchedData.dhl_account_number || "");
          setValue("dhl_api_key", fetchedData.dhl_api_key || "");
          setValue("dhl_api_secret", fetchedData.dhl_api_secret || "");
          setValue("dhl_conversion_rate", fetchedData.dhl_conversion_rate || "");
          setValue("dhl_shipper_name", fetchedData.dhl_shipper_name || "");
          setValue("dhl_company_name", fetchedData.dhl_company_name || "");
          setValue("dhl_phone_number", fetchedData.dhl_phone_number || "");
          setValue("dhl_address_line1", fetchedData.dhl_address_line1 || "");
          setValue("dhl_address_line2", fetchedData.dhl_address_line2 || "");
          setValue("dhl_city", fetchedData.dhl_city || "");
          setValue("dhl_state", fetchedData.dhl_state || "");
          setValue("dhl_country", fetchedData.dhl_country || "");
          setValue("dhl_payment_country", fetchedData.dhl_payment_country || "");
          setValue("dhl_postal_code", fetchedData.dhl_postal_code || "");



          setDhlEnable(fetchedData.enable_dhl_account === "0");
          setDhlTestMod(fetchedData.enable_dhl_test_mode === "0");
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
    console.log(formData);
    
    try {
      const res = $api.post("wp-json/dhl/v1/settings/", {
        dhl_enable: dhlEnable,
        dhl_test_mode: dhlTestMod,
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
      <FormLoading Loading={loading} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`border-2 p-4 rounded-md shadow-md ${
            dhlEnable ? "border-green-500 shadow-green-500" : "border-slate-100"
          }`}
        >
          <div className="flex items-center gap-4 w-full pb-4">
            <img src={Dhl} className="w-24" alt="Dhl Logo" />
            <CheckBoxField
              name="Enable_dhl_account"
              endLabel="تفعيل"
              label="شركة الشحن : DHL"
              value={dhlEnable}
              handleChange={() => setDhlEnable(!dhlEnable)}
            />
          </div>
          <hr />
          <CheckBoxField
            name="Enable_dhl_test_mode"
            endLabel="تفعيل وضع الاختبار"
            label="الاختبار"
            value={dhlTestMod}
            handleChange={() => setDhlTestMod(!dhlTestMod)}
          />
          <div className="flex flex-wrap">
            <TextField
              name="dhl_title"
              label="العنوان"
              register={register("dhl_title")}
              value={data.title || ""}
              error={errors.dhl_title?.message}
            />
            <TextField
              name="dhl_description"
              label="الوصف"
              register={register("dhl_description")}
              value={data.description || ""}
              error={errors.dhl_description?.message}
              isTextArea
            />
            <TextField
              name="dhl_api_Key"
              label="(API Key)رمز التكامل"
              register={register("dhl_api_key")}
              value={data.dhl_api_key || ""}
              error={errors.dhl_api_key?.message}
            />
            <TextField 
            name="dhl_api_secret"
              label="API Secret رمز التكامل السري"
              register={register("dhl_api_secret")}
              value={data.dhl_api_secret || ""}
              error={errors.dhl_api_secret?.message}
            
            />
            <TextField
              name="dhl_account_number"
              label="رقم الحساب"
              register={register("dhl_account_number")}
              value={data.account_number || ""}
              error={errors.dhl_account_number?.message}
            />
            <TextField
             name="dhl_conversion_rate"
              label="سعر التحويل"
              register={register("dhl_conversion_rate")}
              value={data.conversion_rate || ""}
              error={errors.dhl_conversion_rate?.message}
            
            />
            <TextField 
            name="dhl_shipper_name"
              label="اسم مسئول الشحن"
              register={register("dhl_shipper_name")}
              value={data.shipper_name || ""}
              error={errors.dhl_shipper_name?.message}
            />

            <TextField 
             name="dhl_company_name"
              label="اسم الشركة"
              register={register("dhl_company_name")}
              value={data.company_name || ""}
              error={errors.dhl_company_name?.message}
            />
            <TextField 
             name="dhl_phone_number"
              label="رقم الهاتف"
              register={register("dhl_phone_number")}
              value={data.phone_number || ""}
              error={errors.dhl_phone_number?.message}
            />
            <TextField 
             name="dhl_address_line1"
              label="عنوان الشارع"
              register={register("dhl_address_line1")}
              value={data.dhl_address_line1 || ""}
              error={errors.dhl_address_line1?.message}
            />
            <TextField
             name="dhl_address_line2"
              label=" 2 عنوان الشارع"
              register={register("dhl_address_line2")}
              value={data.address_line_2 || ""}
              error={errors.dhl_address_line2?.message}
            />

            <TextField 
             
             name="dhl_city"
              label="المدينة"
              register={register("dhl_city")}
              value={data.city || ""}
              error={errors.dhl_city?.message}
             
            />

            <TextField
             name="dhl_state"
              label="الولاية"
              register={register("dhl_state")}
              value={data.state || ""}
              error={errors.dhl_state?.message}
              />

            

            <TextField
              name="dhl_country"
              label="البلد"
              register={register("dhl_country")}
              value={data.country || ""}
              error={errors.dhl_country?.message}
            
            />
            
             <TextField
              
              name="dhl_payment_country"
              label="بلد الدفع"
              register={register("dhl_payment_country")}
              value={data.payment_country || ""}
              error={errors.dhl_payment_country?.message}
             />

            <TextField
             name="dhl_postal_code"
              label="الرمز البريدي"
              register={register("dhl_postal_code")}
              value={data.postal_code || ""}
              error={errors.dhl_postal_code?.message}
            />
           
          </div>
          <MainButton text="حفظ" />
          <p>
            * يتم تفعيل شركة الشحن في متجرك خلال ساعات قليلة بعد إرسال طلبك *
          </p>
        </div>
      </form>
    </div>
  );
};

export default DHLShippingSettings;
