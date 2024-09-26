import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from '../../../components/UIElements/Form/TextField';
import CheckBoxField from "../../../components/UIElements/Form/CheckBoxField";
import MainButton from '../../../components/UIElements/MainButton';
import Myfatora from '../../../assets/images/CashPayment.png';
import { $api, useData } from '../../../client'; // استيراد هوك useData
import PromiseToast from '../../../components/UIElements/Toasts/PromiseToast';
import FormLoading from '../../../components/UIElements/Form/FormLoading';

const CashPaymentSetting = () => {
    const [CashPaymentEnable, setCashPaymentEnable] = useState(false);

    // Schema for form validation using Yup
    const Schema = Yup.object({
        CashPayment_title: Yup.string().required("حقل مطلوب"),
        CashPayment_description: Yup.string().required("حقل مطلوب"),
    });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(Schema)
    });

    const { data, error, mutate, isLoading: loading } = useData('wp-json/settings/v1/cash-method-status/');

    useEffect(() => {
        if (data) {
            setCashPaymentEnable(data.enabled);
            setValue('CashPayment_title', data.title);
            setValue('CashPayment_description', data.description);
        }

        if (error) {
            console.error('Error fetching COD settings:', error);
        }
    }, [data, error]);

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            const callApi = $api.post('wp-json/settings/v1/cash-method-toggle', {
                enable: CashPaymentEnable,
                CashPayment_title: data.CashPayment_title,
                CashPayment_description: data.CashPayment_description
            });

            PromiseToast(callApi, 
                "جاري تحديث الاعدادات",
                "فشل تحديث الاعدادات",
                "تم تحديث الاعدادات بنجاح",
                () => { mutate(); } 
            );
        } catch (error) {
            console.error('Error updating settings:', error);
        }
    };

    return (
        <div className='relative'>
            <FormLoading Loading={loading} /> 
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="border-2 border-slate-100 p-4 rounded-md shadow-md">
                    <div className="flex items-center gap-4 w-full pb-4">
                        <img src={Myfatora} className="w-24" alt="Cash Payment" />

                        <CheckBoxField
                            name={"Enable_CashPayment_account"}
                            endLabel={"تفعيل "}
                            label={"الدفع عند الإستلام"}
                            value={CashPaymentEnable}
                            handleChange={() => setCashPaymentEnable(!CashPaymentEnable)}
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
                                register={{ ...register("CashPayment_description") }}
                                error={errors.CashPayment_description?.message}
                                isTextArea={true}
                            />
                        </div>
                        <MainButton text={"حفظ"} />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CashPaymentSetting;
