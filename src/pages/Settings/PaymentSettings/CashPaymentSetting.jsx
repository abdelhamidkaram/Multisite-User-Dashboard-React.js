import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from '../../../components/UIElements/Form/TextField';
import CheckBoxField from "../../../components/UIElements/Form/CheckBoxField";
import MainButton from '../../../components/UIElements/MainButton';
import Myfatora from '../../../assets/images/CashPayment.png';
import { $api } from '../../../client';
import PromiseToast from '../../../components/UIElements/Toasts/PromiseToast';
import { BounceLoader } from 'react-spinners';

const CashPaymentSetting = () => {
    const [CashPaymentEnable, setCashPaymentEnable] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [initialTitle, setInitialTitle] = useState('');
    const [initialDescription, setInitialDescription] = useState('');

    // Schema for form validation using Yup
    const Schema = Yup.object({
        CashPayment_title: Yup.string().required("حقل مطلوب"),
        CashPayment_description: Yup.string().required("حقل مطلوب"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(Schema)
    });

    // Fetch COD status, title, and description on component mount
    useEffect(() => {
        
        const fetchCodSettings = async () => {
            setLoading(true);
            try {
                const response = await $api.get('wp-json/settings/v1/cash-method-status/');
                const data = await response.data;
                setCashPaymentEnable(data.enabled);
                setInitialTitle(data.title);
                setInitialDescription(data.description);
            } catch (error) {
                console.error('Error fetching COD settings:', error);
            }finally{
                setLoading(false)
            }
        };

        fetchCodSettings();
    }, []);

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            // Submit form data
            const callApi = $api.post('wp-json/settings/v1/cash-method-toggle', { 
                enable: CashPaymentEnable, 
                CashPayment_title: data.CashPayment_title,
                CashPayment_description: data.CashPayment_description 
            });
            PromiseToast(callApi);
        } catch (error) {
            console.error('Error updating settings:', error);
        }
    };

    return (
        <div className='relative'>
        {Loading ? <div className='absolute top-0 bottom-0 w-full bg-blue-dark bg-opacity-60 rounded-md content-center ' >
              
            <BounceLoader className='m-auto' />
           
         </div> : null }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="border-2 border-slate-100 p-4 rounded-md shadow-md">
                    <div className="flex items-center gap-4 w-full pb-4">
                        <img src={Myfatora} className="w-24" alt="Cash Payment" />

                        <CheckBoxField
                            name={"Enable_CashPayment_account"}
                            endLabel={"تفعيل "}
                            label={" الدفع عند الإستلام"}
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
                                value={initialTitle}
                                register={{ ...register("CashPayment_title") }}
                                error={errors.CashPayment_title?.message}
                            />
                            <TextField
                                name={"CashPayment_description"}
                                label={"الوصف"}
                                value={initialDescription}
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
