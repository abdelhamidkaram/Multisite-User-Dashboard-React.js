// import { useForm } from "react-hook-form";
// import { $api } from "../../../../client";
// import MainButton from "../../MainButton";
// import PromiseToast from "../../Toasts/PromiseToast";
// import useModal from "../../../../store/useModal";
// //import useBrandModal from "../../../../store/modals/BrandModal";
// import TextField from "../../Form/TextField";

// const BrandModal = () => {
//   const { brand } = useBrandModal();
//   const { toggle } = useModal();
//   const { register, handleSubmit, reset, formState: { errors } } = useForm({
//     defaultValues: {
//       name: brand.name,
//       description: brand.description,
//       slug: brand.slug,
//     }
//   });

//   const onSubmit = async (data) => {
//     let apiCall;
//     if (brand.id) {
//       apiCall = $api.post(`wp-json/brands/v1/update-brand/${brand.id}`, data);
//     } else {
//       apiCall = $api.post(`wp-json/brands/v1/add-brand`, data);
//     }
//     PromiseToast(
//       apiCall,
//       "جاري تحديث البيانات...",
//       "فشلت العملية حاول لاحقًا",
//       brand.id ? "تم التحديث بنجاح!" : "تمت الإضافة بنجاح!"
//     );

//     toggle();
//     reset();
//   };

//   return (
//     <div>
//       <h1 className="text-2xl mb-5">
//         {brand.id ? "تعديل العلامة التجارية" : "إضافة علامة تجارية جديدة"}
//       </h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <TextField
//           label="الاسم"
//           register={{...register('name', { required: true })}}
//           error={errors.name?.message}
//         />
//         <TextField
//           label="الوصف"
//           isTextArea={true}
//           register={{...register('description', { required: false })}}
//           error={errors.description?.message}
//         />
//         <TextField
//           label="المعرف الفريد (Slug)"
//           register={{...register('slug', { required: false })}}
//           error={errors.slug?.message}
//         />

//         <MainButton text="Save" />
//       </form>
//     </div>
//   );
// };

// export default BrandModal;
