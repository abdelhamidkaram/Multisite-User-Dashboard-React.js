import useUserModal from "../../../../store/modals/UserModals";
import { useForm } from "react-hook-form";
import { $api } from "../../../../client";
import TextField from "../../Form/TextField";
import MainButton from "../../MainButton";
import PromiseToast from "../../Toasts/PromiseToast";
import useModal from "../../../../store/useModal";

const UserModal = () => {
  const { user } = useUserModal();
  const { toggle } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: '',
      phone: user.phone || '',
      email: user.email || '',
    },
  });

  const onSubmit = async (data) => {
    // API call to update user details
    const apiCall = $api.post(`wp-json/products/v1/update-user/${user.id}`, {
      new_password: data.newPassword,
      phone: data.phone,
      email: data.email,
      shipping_address: data.shippingAddress,
    });

    PromiseToast(
      apiCall,
      "جاري تحديث بيانات المستخدم",
      "فشل في تحديث البيانات حاول لاحقا",
      "تم تحديث البيانات بنجاح"
    );

    toggle();
  };

  return (
    <div>
      <h1 className="text-2xl mb-5">
        تعديل بيانات المستخدم : {user.user_login}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Password Field */}
        <div className="mb-4">
          <TextField
            type="password"
            name="newPassword"
            register={{ ...register("newPassword", { required: false }) }}
            label={"كلمة المرور الجديدة"}
          />
          {errors.newPassword && <span className="text-red-500">This field is required</span>}
        </div>

        {/* Phone Number Field */}
        <div className="mb-4">
          <TextField
            type="text"
            name="phone"
            register={{ ...register("phone", { required: true }) }}
            label={"رقم الهاتف"}
          />
          {errors.phone && <span className="text-red-500">Phone number is required</span>}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <TextField
            type="email"
            name="email"
            register={{ ...register("email", { required: true }) }}
            label={"البريد الإلكتروني"}
          />
          {errors.email && <span className="text-red-500">Email is required</span>}
        </div>


        {/* Submit Button */}
        <div className="mt-7">
          <MainButton text={"حفظ"} />
        </div>
      </form>
    </div>
  );
};

export default UserModal;
