import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from '../../../components/UIElements/Form/TextField';
import CheckBoxField from "../../../components/UIElements/Form/CheckBoxField";
import MainButton from '../../../components/UIElements/MainButton';
import { $api } from '../../../client';
import PromiseToast from '../../../components/UIElements/Toasts/PromiseToast';

const BankAccountSettings = () => {
    const [bankEnable, setBankEnable] = useState(false);
    const [initialSettings, setInitialSettings] = useState({
        bank_title: '',
        bank_description: '',
        bank_account_name: '',
        bank_account_number: '',
        bank_account_bank_name: '',
        bank_account_iban: '',
        bank_account_swift: ''
    });

    const bank_schema = Yup.object({
        bank_title: Yup.string().required("حقل مطلوب"),
        bank_description: Yup.string().required("حقل مطلوب"),
        bank_account_name: Yup.string().required("حقل مطلوب"),
        bank_account_number: Yup.string().required("حقل مطلوب"),
        bank_account_bank_name: Yup.string().required("حقل مطلوب"),
        bank_account_iban: Yup.string().required("حقل مطلوب"),
        bank_account_swift: Yup.string().required("حقل مطلوب"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(bank_schema),
    });

    useEffect(() => {
        const fetchBacsSettings = async () => {
            try {
                const response = await $api.get('wp-json/settings/v1/bacs-method-status/');
                const data = await response.data;
                setBankEnable(data.enabled);
                setInitialSettings({
                    bank_title: data.settings.title || '',
                    bank_description: data.settings.description || '',
                    bank_account_name: data.settings.account_name || '',
                    bank_account_number: data.settings.account_number || '',
                    bank_account_bank_name: data.settings.bank_name || '',
                    bank_account_iban: data.settings.iban || '',
                    bank_account_swift: data.settings.swift || ''
                });
            } catch (error) {
                console.error('Error fetching BACS settings:', error);
            }
        };

        fetchBacsSettings();
    }, []);

    const onSubmit = async (data) => {
        try {
            const callApi = $api.post('wp-json/settings/v1/bacs-method-toggle', {
                enable: bankEnable, 
                ...data
            });
            PromiseToast(callApi);
        } catch (error) {
            console.error('Error updating BACS settings:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="border-2 border-slate-100 p-4 rounded-md shadow-md">
                    <div className="flex items-center gap-4 w-full pb-4">
                        <img src="https://storeino.b-cdn.net/assets/others/banktransfer.png" className="w-24" alt="Bank Transfer" />

                        <CheckBoxField
                            name={"Enable_bank_account"}
                            endLabel={"تفعيل "}
                            label={"تحويل بنكي "}
                            value={bankEnable}
                            handleChange={() => setBankEnable(!bankEnable)}
                        />
                    </div>
                    <hr />
                    <div>
                        <div className="flex flex-wrap">
                            <TextField
                                name={"bank_title"}
                                label={"العنوان"}
                                defaultValue={initialSettings.bank_title}
                                register={{ ...register("bank_title") }}
                                error={errors.bank_title?.message}
                            />
                            <TextField
                                name={"bank_description"}
                                label={"الوصف"}
                                defaultValue={initialSettings.bank_description}
                                register={{ ...register("bank_description") }}
                                error={errors.bank_description?.message}
                                isTextArea={true}
                            />
                            <TextField
                                name={"bank_account_name"}
                                label={"اسم الحساب"}
                                defaultValue={initialSettings.bank_account_name}
                                register={{ ...register("bank_account_name") }}
                                error={errors.bank_account_name?.message}
                            />
                            <TextField
                                name={"bank_account_number"}
                                label={"رقم الحساب"}
                                defaultValue={initialSettings.bank_account_number}
                                register={{ ...register("bank_account_number") }}
                                error={errors.bank_account_number?.message}
                            />
                            <TextField
                                name={"bank_account_bank_name"}
                                label={"اسم المصرف"}
                                defaultValue={initialSettings.bank_account_bank_name}
                                register={{ ...register("bank_account_bank_name") }}
                                error={errors.bank_account_bank_name?.message}
                            />
                            <TextField
                                name={"bank_account_iban"}
                                label={"IBAN رقم الآيبان"}
                                defaultValue={initialSettings.bank_account_iban}
                                register={{ ...register("bank_account_iban") }}
                                error={errors.bank_account_iban?.message}
                            />
                            <TextField
                                name={"bank_account_swift"}
                                label={"رمز Swift / BIC"}
                                defaultValue={initialSettings.bank_account_swift}
                                register={{ ...register("bank_account_swift") }}
                                error={errors.bank_account_swift?.message}
                            />
                        </div>
                        <MainButton text={"حفظ"} />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BankAccountSettings;
