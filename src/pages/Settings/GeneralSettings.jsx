import { useEffect, useState } from 'react';
import TextField from "../../components/UIElements/Form/TextField";
import CheckBoxField from "../../components/UIElements/Form/CheckBoxField";
import MainButton from "../../components/UIElements/MainButton";
import SelectField from "../../components/UIElements/Form/SelectField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { $api } from '../../client';
import PromiseToast from '../../components/UIElements/Toasts/PromiseToast';
import { ShimmerDiv } from 'shimmer-effects-react';

export const GeneralSettings = () => {
    const [generalSetting, setGeneralSetting] = useState({
        siteName: "",
        site_description: "",
        email: "",
        currency: "",
        allCurrencies: [],
        enable_coupons: false
    });
   const [Loading, setLoading] = useState(true)

  
    useEffect(() => {
      // Fetch default settings from the custom API endpoint
      const fetchDefaultSettings = async () => {
          try {
             const res =  await $api.get('wp-json/settings/v1/settings');
             const data = res.data;
             setGeneralSetting({
              siteName: data.site_name,
              site_description: data.site_description,
              email: data.email,
              currency: data.currency,
              allCurrencies: data.allCurrencies,
              enable_coupons: data.enable_coupons
          });  
          } catch (error) {
              console.error('Error fetching default settings:', error);
          }finally{
            setLoading(false)
          }
      };

      fetchDefaultSettings();
  }, []);

    const Schema = Yup.object({
        site_name: Yup.string().required('لايمكن ترك هذا الحقل فارغاً').min(2, 'لايمكن أن يكون الاسم أقل من حرفين'),
        site_description: Yup.string().required("لايمكن ترك هذا الحقل فارغاً"),
        email: Yup.string().email('ادخل بريد الكتروني صحيح').required('لايمكن ترك هذا الحقل فارغاً'),
        currency: Yup.string().required('لايمكن ترك هذا الحقل فارغاً ')
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(Schema)
    });

    const onSubmit =  (data) => {
      let callData ;
      callData = $api.post('wp-json/settings/v1/update-settings' , data);
      PromiseToast(callData);
    };

    const handleChange = () => {
        setGeneralSetting({ ...generalSetting, enable_coupons: !generalSetting.enable_coupons });
    };


    if (Loading) {
        return <div>
         <ShimmerDiv className='w-full h-14 m-4' mode='light'  />
         <ShimmerDiv className='w-full h-14 m-4' mode='light'  />
         <ShimmerDiv className='w-full h-14 m-4' mode='light'  />
         <ShimmerDiv className='w-full h-14 m-4' mode='light'  />
        </div>
    }
    return (
        <div>
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
                    register={{ ...register('email') }}
                    error={errors.email?.message}
                />

                <SelectField
                    value={generalSetting.currency}
                    register={{ ...register('currency') }}
                    error={errors.currency?.message}
                    label={'عملة الموقع'}
                    items={generalSetting.allCurrencies}
                    name={'currency'}
                />

                <CheckBoxField
                    register={{ ...register('enable_coupons') }}
                    label={"تمكين قسائم الشراء"} value={generalSetting.enable_coupons} name='enable_coupons' handleChange={handleChange} />

                <div className="pt-11">
                    <MainButton text={'حفظ التعديلات'} />
                </div>

            </form>
        </div>
    )
}
