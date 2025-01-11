import { useEffect, useState } from "react";
import TextField from "../../components/UIElements/Form/TextField";
import CheckBoxField from "../../components/UIElements/Form/CheckBoxField";
import MainButton from "../../components/UIElements/MainButton";
import SelectField from "../../components/UIElements/Form/SelectField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { $api, useData } from "../../client";
import PromiseToast from "../../components/UIElements/Toasts/PromiseToast";
import { BounceLoader } from "react-spinners";
import NoteBox from "../../components/UIElements/NoteBox";

export const GeneralSettings = () => {
  const [generalSetting, setGeneralSetting] = useState({
    siteName: "",
    site_description: "",
    email: "",
    currency: "",
    allCurrencies: [],
    enable_coupons: false,
  });

  const [loading, setLoading] = useState(true);
  const {
    data,
    error,
    mutate: mutateSettings,
  } = useData("wp-json/settings/v1/settings");
  const Schema = Yup.object({
    site_name: Yup.string()
      .required("لايمكن ترك هذا الحقل فارغاً")
      .min(2, "لايمكن أن يكون الاسم أقل من حرفين"),
    site_description: Yup.string(),
    email: Yup.string()
      .email("ادخل بريد الكتروني صحيح")
      .required("لايمكن ترك هذا الحقل فارغاً"),
    currency: Yup.string().required("لايمكن ترك هذا الحقل فارغاً "),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(Schema),
  });

  useEffect(() => {
    if (data) {
      setGeneralSetting({
        siteName: data.site_name,
        site_description: data.site_description,
        email: data.email,
        currency: data.currency,
        allCurrencies: data.allCurrencies,
        enable_coupons: data.enable_coupons,
      });

      setValue("site_name", data.site_name);
      setValue("site_description", data.site_description);
      setValue("email", data.email);
      setValue("currency", data.currency);
      setValue("enable_coupons", data.enable_coupons);
      setLoading(false);
    }

    if (error) {
      console.error("Error fetching default settings:", error);
      setLoading(false);
    }
  }, [data, error]);

  const onSubmit = (data) => {
    const callData = $api.post("wp-json/settings/v1/update-settings", data);
    PromiseToast(
      callData,
      "جاري تحديث البيانات...",
      "فشلت العملية حاول لاحقًا",
      "تم تحديث البيانات بنجاح!",
      () => {
        mutateSettings();
      }
    );
  };

  const handleChange = () => {
    setGeneralSetting({
      ...generalSetting,
      enable_coupons: !generalSetting.enable_coupons,
    });
  };

  return (
    <div className="relative">
      {loading ? (
        <div className="absolute top-0 bottom-0 w-full bg-blue-dark bg-opacity-60 rounded-md content-center ">
          <BounceLoader className="m-auto" />
        </div>
      ) : null}
      <NoteBox >
        <h3 className="text-lg font-bold">اعدادات الهوية</h3>
        <p>
          {" "}
          اضغط على زر تحرير الهوية أدناه للإنتقال إلى محرر اللوجو والالوان
          والاعدادات الرئيسية لواجهة الموقع{" "}
        </p>
        <a
          href={localStorage.getItem("path") + "/support-login-admin-xrt4"}
          target="_blank"
        >
          <MainButton
            text={"تحرير الهوية"}
            ClickHandler={() => {
              localStorage.setItem("starterStep1", true);
            }}
          />
        </a>
      </NoteBox>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label={"اسم الموقع"}
          value={generalSetting.siteName}
          register={{ ...register("site_name") }}
          error={errors.site_name?.message}
        />

        <TextField
          label={"وصف الموقع"}
          value={generalSetting.site_description}
          defaultValue={generalSetting.site_description}
          isTextArea={true}
          register={{ ...register("site_description") }}
          error={errors.site_description?.message}
        />

        <TextField
          label={"عنوان البريد الإلكتروني"}
          value={generalSetting.email}
          type="email"
          register={{ ...register("email") }}
          error={errors.email?.message}
        />

        <SelectField
          value={generalSetting.currency}
          register={{ ...register("currency") }}
          error={errors.currency?.message}
          label={"عملة الموقع"}
          items={generalSetting.allCurrencies}
          name={"currency"}
        />

        <CheckBoxField
          register={{ ...register("enable_coupons") }}
          label={"تمكين قسائم الشراء"}
          value={generalSetting.enable_coupons}
          name="enable_coupons"
          handleChange={handleChange}
        />

        <div className="pt-11">
          <MainButton text={"حفظ التعديلات"} />
        </div>
      </form>
    </div>
  );
};

