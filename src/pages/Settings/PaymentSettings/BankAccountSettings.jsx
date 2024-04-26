import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '../../../components/UIElements/Form/TextField';
import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CheckBoxField from "../../../components/UIElements/Form/CheckBoxField";
import MainButton from '../../../components/UIElements/MainButton';


const BankAccountSettings = () => {
    const [bankEnable, setBankEnable] = useState(false);

  const bank_schema = Yup.object({
    bank_title: Yup.string().required("حقل مطلوب"),
    bank_description: Yup.string().required("حقل مطلوب"),
    bank_account_name: Yup.string().required("حقل مطلوب"),
    bank_account_number: Yup.string().required("حقل مطلوب"),
    bank_account_bank_name: Yup.string().required("حقل مطلوب"),
    bank_account_iban: Yup.string().required("حقل مطلوب"),
    bank_account_swift: Yup.string().required("حقل مطلوب"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bank_schema),
  });
  const onSubmit = (data) => {
    console.log({ bankEnable: bankEnable, ...data });
  };
  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className=" border-2 border-slate-100 p-4 rounded-md shadow-md ">
      <div className="flex items-center gap-4 w-full pb-4 ">
        <img
          src={"https://storeino.b-cdn.net/assets/others/banktransfer.png"}
          className="w-24"
        />

        <CheckBoxField
          name={"Enable_bank_account"}
          endLabel={ "تفعيل "}
          label={"تحويل بنكي "}
          value={bankEnable}
          handleChange ={()=>{
            setBankEnable(!bankEnable);
          }}
        />
      </div>
      <hr />
      <div>
      <div className="flex flex-wrap">
      <TextField
        name={"bank_title"}
        label={"العنوان"}
        register={{ ...register("bank_title") }}
        error={errors.bank_title?.message}
      />

      <TextField
        name={"bank_description"}
        label={"الوصف"}
        register={{ ...register("bank_description") }}
        error={errors.bank_description?.message}
        isTextArea={true}
      />

      <TextField
        name={"bank_account_name"}
        label={"اسم الحساب"}
        register={{ ...register("bank_account_name") }}
        error={errors.bank_account_name?.message}
      />

      <TextField
        name={"bank_account_number"}
        label={"رقم الحساب"}
        register={{ ...register("bank_account_number") }}
        error={errors.bank_account_number?.message}
      />
      <TextField
        name={"bank_account_bank_name"}
        label={" اسم المصرف	 "}
        register={{ ...register("bank_account_bank_name") }}
        error={errors.bank_account_bank_name?.message}
      />
      <TextField
        name={"bank_account_iban"}
        label={" IBAN رقم الآيبان "}
        register={{ ...register("bank_account_iban") }}
        error={errors.bank_account_iban?.message}
      />
      <TextField
        name={"bank_account_swift"}
        label={" رمز Swift / BIC"}
        register={{ ...register("bank_account_swift") }}
        error={errors.bank_account_swift?.message}
      />
    </div>

    <MainButton text={" حفظ "} />
      </div>
    </div>

    
  </form>
    </div>
  )
}

export default BankAccountSettings
