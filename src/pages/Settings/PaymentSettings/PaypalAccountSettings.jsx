import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from '../../../components/UIElements/Form/TextField';
import CheckBoxField from "../../../components/UIElements/Form/CheckBoxField";
import MainButton from '../../../components/UIElements/MainButton';
import Paypal from '../../../assets/images/paypal.png';
import { $api } from '../../../client';
import PromiseToast from '../../../components/UIElements/Toasts/PromiseToast';

const PaypalAccountSettings = () => {
    const [paypalEnable, setPaypalEnable] = useState(false);
    const [initialSettings, setInitialSettings] = useState({
        paypal_title: '',
        paypal_description: '',
        paypal_account_email: '',
        paypal_account_number: ''
    });

    const Schema = Yup.object({
        paypal_title: Yup.string().required("حقل مطلوب"),
        paypal_description: Yup.string().required("حقل مطلوب"),
        paypal_account_email: Yup.string().email("تاكد من صحة البريد الإلكتروني").required("حقل مطلوب"),
        paypal_account_number: Yup.string().required("حقل مطلوب"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(Schema),
    });

    useEffect(() => {
        const fetchPaypalSettings = async () => {
            try {
                const response = await $api.get('wp-json/settings/v1/paypal-method-status/');
                const data = await response.data;
                setPaypalEnable(data.enabled);
                setInitialSettings({
                    paypal_title: data.settings.title || '',
                    paypal_description: data.settings.description || '',
                    paypal_account_email: data.settings.email || '',
                    paypal_account_number: data.settings.account_number || ''
                });
            } catch (error) {
                console.error('Error fetching PayPal settings:', error);
            }
        };

        fetchPaypalSettings();
    }, []);

    const onSubmit = async (data) => {
        try {
            const callApi = $api.post('wp-json/settings/v1/paypal-method-toggle', {
                enable: paypalEnable, 
                ...data
            });
            PromiseToast(callApi);
        } catch (error) {
            console.error('Error updating PayPal settings:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="border-2 border-slate-100 p-4 rounded-md shadow-md">
                    <div className="flex items-center gap-4 w-full pb-4">
                        <img src={Paypal} className="w-24" alt="PayPal" />

                        <CheckBoxField
                            name={"Enable_paypal_account"}
                            endLabel={"تفعيل "}
                            label={"بيبال"}
                            value={paypalEnable}
                            handleChange={() => setPaypalEnable(!paypalEnable)}
                        />
                    </div>
                    <hr />
                    <div>
                        <div className="flex flex-wrap">
                            <TextField
                                name={"paypal_title"}
                                label={"العنوان"}
                                defaultValue={initialSettings.paypal_title}
                                register={{ ...register("paypal_title") }}
                                error={errors.paypal_title?.message}
                            />
                            <TextField
                                name={"paypal_description"}
                                label={"الوصف"}
                                defaultValue={initialSettings.paypal_description}
                                register={{ ...register("paypal_description") }}
                                error={errors.paypal_description?.message}
                                isTextArea={true}
                            />
                            <TextField
                                name={"paypal_account_email"}
                                label={"البريد الإلكتروني"}
                                defaultValue={initialSettings.paypal_account_email}
                                register={{ ...register("paypal_account_email") }}
                                error={errors.paypal_account_email?.message}
                            />
                            <TextField
                                name={"paypal_account_number"}
                                label={"رقم الحساب"}
                                defaultValue={initialSettings.paypal_account_number}
                                register={{ ...register("paypal_account_number") }}
                                error={errors.paypal_account_number?.message}
                            />
                        </div>
                        <MainButton text={"حفظ"} />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PaypalAccountSettings;
