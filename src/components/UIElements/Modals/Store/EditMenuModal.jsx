import { useForm, useFieldArray } from "react-hook-form";
import { $api, useData } from "../../../../client";
import MainButton from "../../MainButton";
import PromiseToast from "../../Toasts/PromiseToast";
import TextField from "../../Form/TextField";
import useModal from "../../../../store/useModal";
import useMenuModal from "../../../../store/modals/MenuModal";
import TextButton from "../../TextButton";
import SelectField from "../../Form/SelectField";

const EditMenuModal = () => {
  const { mutate: MenusMutate } = useData("wp-json/store/v1/menus");

  const { menu, locations } = useMenuModal();
  console.log(locations);
  const { toggle } = useModal();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: menu?.name ?? "",
      items: menu?.items ?? "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (data) => {
    try {
      let apiCall;
      apiCall = $api.post(`wp-json/store/v1/menus/${menu.id}/update`, data);
      PromiseToast(
        apiCall,
        "جاري تحديث القائمة",
        "فشل تحديث القائمة حاول لاحقا",
        "تم تحديث القائمة بنجاح!",
        () => {
          MenusMutate();
        }
      );

      toggle();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-5">{"تعديل القائمة"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="اسم القائمة"
          register={{ ...register("name", { required: true }) }}
          error={errors.name?.message}
        />
        <div>
          <h2 className="text-xl mt-5">موضع القائمة</h2>
          <SelectField
            items={locations}
            label={"اختر موضع القائمة"}
            register={{ ...register("location") }}
          />
          <h2 className="text-xl mt-5">عناصر القائمة</h2>
          {fields.map((item, index) => (
            <div key={item.id} className="mb-4">
              <TextField
                label="اسم العنصر"
                register={{
                  ...register(`items.${index}.title`, { required: true }),
                }}
                error={errors.items?.[index]?.title?.message}
              />
              <TextField
                label="رابط العنصر"
                register={{
                  ...register(`items.${index}.url`, { required: true }),
                }}
                error={errors.items?.[index]?.url?.message}
              />
              <button
                className="pb-5 text-red-500"
                type="button"
                onClick={() => remove(index)}
              >
                حذف العنصر
              </button>
            </div>
          ))}
        </div>
        <div className="ms-5 me-5 flex justify-between">
          <TextButton
            className="m-5"
            ClickHandler={() => append({ title: "", url: "" })}
            text={"اضافة عنصر"}
          />
          <MainButton text="تحديث" />
        </div>
      </form>
    </div>
  );
};

export default EditMenuModal;
