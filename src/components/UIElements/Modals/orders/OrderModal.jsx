import { useForm } from "react-hook-form";
import { $api, useData } from "../../../../client";
import SelectField from "../../Form/SelectField";
import MainButton from "../../MainButton";
import PromiseToast from "../../Toasts/PromiseToast";
import useModal from "../../../../store/useModal";
import useOrderModal from "../../../../store/modals/OrderModal";

const OrderModal = () => {
  const { order } = useOrderModal();
  const {toggle} = useModal();
  const {
    register,
    handleSubmit,
   
  } = useForm();
  const {mutate:mutate} =useData('wp-json/products/v1/orders');
  const {mutate:refundedMutate } = useData("wp-json/products/v1/refunded-orders");



  const onSubmit = async (data) => {
    PromiseToast(
      $api.post(`wp-json/products/v1/orders/${order.id}/change-status`, {
        new_status: data.new_status,
      }),
      "جاري تعديل الحالة",
      "لم تتغير الحالة حاول لاحقا",
      "تم تغيير الحالة بنجاح",
      ()=>{
        mutate();
        refundedMutate();
      }
    );
    toggle();
    
  };

  return (
    <div>
      <h1 className="text-2xl mb-5">
        
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectField register={{...register('new_status' , {'required':true})}}
        items={[
          "processing",
          "completed",
          "cancelled",
          "refunded",
          "failed"
        ]} 
        label={"تغيير حالة الطلب "}
        />
        <MainButton text={'حفظ'} />
      </form>
    </div>
  );
};

export default OrderModal;
