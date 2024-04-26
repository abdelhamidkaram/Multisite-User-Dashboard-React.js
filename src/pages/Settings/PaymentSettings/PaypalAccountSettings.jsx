import { useForm } from "react-hook-form";
import  * as Yup from "yup";
 import { yupResolver } from "@hookform/resolvers/yup";
import TextField from '../../../components/UIElements/Form/TextField';
import { useState } from 'react';
import CheckBoxField from "../../../components/UIElements/Form/CheckBoxField";
import MainButton from '../../../components/UIElements/MainButton';
import Paypal from '../../../assets/images/paypal.png'

const PaypalAccountSettings = () => {
    const [paypalEnable, setBankEnable] = useState(false);
 
  const Schema = Yup.object({
    paypal_title: Yup.string().required("حقل مطلوب"),
    paypal_description: Yup.string().required("حقل مطلوب"),
    paypal_account_email: Yup.string().email("تاكد من صحة البريد الإلكتروني").required("حقل مطلوب"),
    paypal_account_number: Yup.string().required("حقل مطلوب"),
    
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver:yupResolver(Schema)
  });
  const onSubmit = (data) => {
    alert('d')
    console.log({ paypalEnable: paypalEnable, ...data });
  };
  return (
    <div>
    <form  onSubmit={handleSubmit(onSubmit)}>
    <div className=" border-2 border-slate-100 p-4 rounded-md shadow-md ">
      <div className="flex items-center gap-4 w-full pb-4 ">
        <img
          src={Paypal}
          className="w-24"
        />

        <CheckBoxField
          name={"Enable_paypal_account"}
          endLabel={ "تفعيل "}
          label={"بيبال"}
          value={paypalEnable}
          handleChange ={()=>{
            setBankEnable(!paypalEnable);
          }}
        />
      </div>
      <hr />
      <div>
      <div className="flex flex-wrap">
      <TextField
        name={"paypal_title"}
        label={"العنوان"}
        register={{ ...register("paypal_title") }}
        error={errors.paypal_title?.message}
      />

      <TextField
        name={"paypal_description"}
        label={"الوصف"}
        register={{ ...register("paypal_description"  ) }}
        error={errors.paypal_description?.message}
        isTextArea={true}
      />

      <TextField
        name={"paypal_account_email"}
        label={"البريد الالكتروني "}
        register={{ ...register("paypal_account_email"  ) }}
        error={errors.paypal_account_email?.message}
      />

      <TextField
        name={"paypal_account_number"}
        label={"رقم الحساب"}
        register={{ ...register("paypal_account_number"  ) }}
        error={errors.paypal_account_number?.message}
      />
    
    </div>
    <MainButton text={" حفظ "} />
      </div>
    </div>

    
  </form>
    </div>
  )
}

export default PaypalAccountSettings


