import useUserModal from "../../../../store/modals/UserModals";
import { useForm } from "react-hook-form";
import { $api } from "../../../../client";
import TextField from "../../Form/TextField";
import MainButton from "../../MainButton";
import PromiseToast from "../../Toasts/PromiseToast";
import useModal from "../../../../store/useModal";

const UserModal = () => {
  const { user } = useUserModal();
  const {toggle} = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    PromiseToast(
      $api.post(`wp-json/products/v1/change-password/${user.id}`, {
        new_password: data.newPassword,
      }),
      "جاري تعديل كلمة المرور",
      "لم تتغير كلمة المرور حاول لاحقا",
      "تم تغيير كلمة المرور بنجاح"
    );
    toggle();
  };

  return (
    <div>
      <h1 className="text-2xl mb-5">
        تغيير كلمة المرور لـ : {user.user_login}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            type="password"
            name="newPassword"
            register={{ ...register("newPassword", { required: true }) }}
            label={"كلمة المرور الجديدة"}
          />
          {errors.newPassword && <span>This field is required</span>}
        </div>
        <div className="mt-7">
          <MainButton text={"حفظ"} />
        </div>
      </form>
    </div>
  );
};

export default UserModal;
