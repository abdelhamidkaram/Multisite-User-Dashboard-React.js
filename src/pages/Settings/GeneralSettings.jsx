import TextField from "../../components/UIElements/Form/TextField";
import CheckBoxField from "../../components/UIElements/Form/CheckBoxField";
import MainButton from "../../components/UIElements/MainButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import  * as Yup from "yup";
import SelectField from "../../components/UIElements/Form/SelectField";
import { useState } from "react";


export const GeneralSettings  = () => {
  const [generalSetting] = useState({
    siteName: "متجر المتجر ",
    site_description:
      "متجر المتجر متجر المتجر متجر المتجر متجر المتجر متجر المتجر متجر المتجر ",
    email: "midosok123@gmail.com",
    currency:"USD",
    allCurrencies:[
      'KWD',
      'RSA',
      'EGP',
      'USD'
    ],
    enable_coupons: true
  });
 
  const Schema = Yup.object({
    site_name: Yup.string().required('لايمكن ترك هذا الحقل فارغاً').min(2 , 'لايمكن أن يكون الاسم أقل من حرفين'),
    site_description: Yup.string().required("لايمكن ترك هذا الحقل فارغاً").min(150, 'يجب ان يحتوي الوصف على اكثر من 150 حرف'),
    email: Yup.string().email('ادخل بريد الكتروني صحيح').required('لايمكن ترك هذا الحقل فارغاً'),
    currency:Yup.string().required('لايمكن ترك هذا الحقل فارغاً ')
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver:yupResolver(Schema)
  });
  
  const onSubmit = (data) => console.log(data);
  
  const [checked, setChecked] = useState(generalSetting.enable_coupons || false);

  const handleChange = () => {
    setChecked(!checked);
    console.log(checked)
  };

   return (
    <div >
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
        isTextArea={true}
        register={{ ...register("site_description") }}
        error={errors.site_description?.message} />

      <TextField
      label={"عنوان البريد الإلكتروني"}
      value={generalSetting.email}
      type="email"
      register={{...register('email')}}
      error={errors.email?.message}
      />

      <SelectField 
       value={generalSetting.currency}
       register={{...register('currency')}}
       error={errors.currency?.message}
       label={'عملة الموقع'}
       items={generalSetting.allCurrencies}
       name={'currency'}
      />

      <CheckBoxField
      register={{...register('enable_coupons')}}
      label={"تمكين قسائم الشراء"} value={generalSetting.enable_coupons} name='enable_coupons'  handleChange={handleChange} />
      
      <div className="pt-11">
      <MainButton ClickHandler={()=>{}} text={'حفظ التعديلات'} />
      </div>
     
    </form>


  </div>
  )
}

