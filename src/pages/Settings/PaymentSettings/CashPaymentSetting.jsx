import { useForm } from "react-hook-form";
import  * as Yup from "yup";
 import { yupResolver } from "@hookform/resolvers/yup";
import TextField from '../../../components/UIElements/Form/TextField';
import { useState } from 'react';
import CheckBoxField from "../../../components/UIElements/Form/CheckBoxField";
import MainButton from '../../../components/UIElements/MainButton';
import Myfatora from '../../../assets/images/CashPayment.png'

const CashPaymentSetting = () => {
    const [CashPaymentEnable, setBankEnable] = useState(false);
 
  const Schema = Yup.object({
    CashPayment_title: Yup.string().required("حقل مطلوب"),
    CashPayment_description: Yup.string().required("حقل مطلوب"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver:yupResolver(Schema)
  });
  const onSubmit = (data) => {
    console.log({ CashPaymentEnable: CashPaymentEnable , ...data });
  };
  return (
    <div>
    <form  onSubmit={handleSubmit(onSubmit)}>
    <div className=" border-2 border-slate-100 p-4 rounded-md shadow-md ">
      <div className="flex items-center gap-4 w-full pb-4 ">
        <img
          src={Myfatora}
          className="w-24"
        />

        <CheckBoxField
          name={"Enable_CashPayment_account"}
          endLabel={ "تفعيل "}
          label={" الدفع عند الإستلام"}
          value={CashPaymentEnable}
          handleChange ={()=>{
            setBankEnable(!CashPaymentEnable);
          }}
        />
      </div>
      <hr />
      <div>
    
      <div className="flex flex-wrap">
      
      <TextField
      
        name={"CashPayment_title"}
        label={"العنوان"}
        register={{ ...register("CashPayment_title") }}
        error={errors.CashPayment_title?.message}
      />

      <TextField
        name={"CashPayment_description"}
        label={"الوصف"}
        register={{ ...register("CashPayment_description"  ) }}
        error={errors.CashPayment_description?.message}
        isTextArea={true}
      />

     </div>
    <MainButton text={" حفظ "} />
      </div>
    </div>

    
  </form>
    </div>
  )
}

export default CashPaymentSetting


