import { useForm, useFieldArray } from "react-hook-form";
import { $api, useData } from "../../../../client";
import MainButton from "../../MainButton";
import PromiseToast from "../../Toasts/PromiseToast";
import useModal from "../../../../store/useModal";

const AddMenuModal = () => {
  const { mutate: MenusMutate } = useData("wp-json/store/v1/menus");

  const { toggle } = useModal();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      items: [{ title: "", url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (data) => {
    try {
      const apiCall = $api.post("wp-json/store/v1/menus", data);
      PromiseToast(
        apiCall,
        "جاري إضافة القائمة...",
        "فشلت العملية حاول لاحقًا",
        "تم إضافة القائمة بنجاح!",
        () => {
          MenusMutate();
        }
      );

      reset();
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" p-5 md:min-w-[500px] ">
      <h1 className="text-2xl mb-5">إضافة قائمة جديدة</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 ">
          <label className="block mb-2" htmlFor="name">
            الاسم
          </label>
          <input
            id="name"
            {...register("name", { required: "اسم القائمة مطلوب" })}
            className={`border p-2 w-full ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <h2 className="text-xl mb-3">عناصر القائمة</h2>
        {fields.map((item, index) => (
          <div key={item.id} className="mb-4 shadow p-3 border">
            <div className="mb-2">
              <label className="block" htmlFor={`items.${index}.title`}>
                عنوان العنصر
              </label>
              <input
                id={`items.${index}.title`}
                {...register(`items.${index}.title`, {
                  required: "عنوان العنصر مطلوب",
                })}
                className={`border p-2 w-full ${
                  errors.items?.[index]?.title
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.items?.[index]?.title && (
                <span className="text-red-500">
                  {errors.items[index].title.message}
                </span>
              )}
            </div>
            <div className="mb-2">
              <label className="block" htmlFor={`items.${index}.url`}>
                رابط العنصر
              </label>
              <input
                id={`items.${index}.url`}
                {...register(`items.${index}.url`, {
                  required: "رابط العنصر مطلوب",
                })}
                className={`border p-2 w-full ${
                  errors.items?.[index]?.url
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.items?.[index]?.url && (
                <span className="text-red-500">
                  {errors.items[index].url.message}
                </span>
              )}
            </div>
            { fields.length > 1 && <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            >
              إزالة العنصر
            </button>}
          </div>
        ))}
        <div className="flex justify-between ps-3 pe-3">
          <button
            type="button"
            onClick={() => append({ title: "", url: "" })}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
          >
            إضافة عنصر جديد
          </button>

          <MainButton text="حفظ القائمة" />
        </div>
      </form>
    </div>
  );
};

export default AddMenuModal;
