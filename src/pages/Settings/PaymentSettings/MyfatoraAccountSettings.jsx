import { useForm } from "react-hook-form";
import  * as Yup from "yup";
 import { yupResolver } from "@hookform/resolvers/yup";
import TextField from '../../../components/UIElements/Form/TextField';
import { useState } from 'react';
import CheckBoxField from "../../../components/UIElements/Form/CheckBoxField";
import MainButton from '../../../components/UIElements/MainButton';
import Myfatora from '../../../assets/images/myfatora.svg'

const MyfatoraAccountSettings = () => {
    const [myfatoraEnable, setBankEnable] = useState(false);
    const [myfatoraTestMod, setBankTestMod] = useState(false);
 
  const Schema = Yup.object({
    myfatora_title: Yup.string().required("حقل مطلوب"),
    myfatora_description: Yup.string().required("حقل مطلوب"),
    myfatora_api_Key: Yup.string().required("حقل مطلوب"),
    myfatora_account_number: Yup.string().required("حقل مطلوب"),
    
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver:yupResolver(Schema)
  });
  const onSubmit = (data) => {
    console.log({ myfatoraEnable: myfatoraEnable , myfatoraTestMod: myfatoraTestMod, ...data });
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
          name={"Enable_myfatora_account"}
          endLabel={ "تفعيل "}
          label={"بوابة الدفع : ماي فاتورة "}
          value={myfatoraEnable}
          handleChange ={()=>{
            setBankEnable(!myfatoraEnable);
          }}
        />
      </div>
      <hr />
      <div>
      <CheckBoxField
          name={"Enable_myfatora_account"}
          endLabel={ " تفعيل وضع الاختبار "}
          label={"الاختبار"}
          value={myfatoraTestMod}
          handleChange ={()=>{
            setBankTestMod(!myfatoraTestMod);
          }}
        />
      <div className="flex flex-wrap">
      
      <TextField
      
        name={"myfatora_title"}
        label={"العنوان"}
        register={{ ...register("myfatora_title") }}
        error={errors.myfatora_title?.message}
      />

      <TextField
        name={"myfatora_description"}
        label={"الوصف"}
        register={{ ...register("myfatora_description"  ) }}
        error={errors.myfatora_description?.message}
        isTextArea={true}
      />

      <TextField
        name={"myfatora_api_Key"}
        label={"(API Key)رمز التكامل"}
        register={{ ...register("myfatora_api_Key"  ) }}
        error={errors.myfatora_api_Key?.message}
      />

      <TextField
        name={"myfatora_account_number"}
        label={"رقم الحساب"}
        register={{ ...register("myfatora_account_number"  ) }}
        error={errors.myfatora_account_number?.message}
      />
    
    </div>
    <MainButton text={" حفظ "} />
      </div>
    </div>

    
  </form>
    </div>
  )
}

export default MyfatoraAccountSettings


