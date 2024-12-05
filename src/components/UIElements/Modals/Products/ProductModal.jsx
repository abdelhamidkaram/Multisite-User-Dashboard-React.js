
import { useForm } from "react-hook-form";
import { $api } from "../../../../client";
import MainButton from "../../MainButton";
import PromiseToast from "../../Toasts/PromiseToast";
import useModal from "../../../../store/useModal";
import useProductModal from "../../../../store/modals/ProductModal";
import TextField from "../../Form/TextField";
import SelectField from "../../Form/SelectField";
import { useState, useEffect } from "react";

const ProductModal = () => {
  const { product } = useProductModal();
  const { toggle } = useModal();
  const [imageFile, setImageFile] = useState(null);
  const [cats, setCats] = useState([]); // التصنيفات
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product.name,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      stock_status: product.stock_status,
      short_description: product.short_description,
      categories: product.categories,
    },
  });

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await $api.get(
          "wp-json/categories/v1/all-categories?page=-1"
        );
        setCats(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle Image File Change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    data["categories"] = [data["categories"]];

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("regular_price", data.regular_price);
    formData.append("sale_price", data.sale_price);
    formData.append("stock_status", data.stock_status);
    formData.append("short_description", data.short_description);
    formData.append("categories", JSON.stringify(data.categories));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const apiCall = $api.post(
      `wp-json/products/v1/update-product/${product.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    PromiseToast(
      apiCall,
      "جاري تحديث البيانات...",
      "فشلت العملية حاول لاحقًا",
      "تم التحديث بنجاح!"
    );

    toggle();
    reset();
    setImageFile(null);
  };

  return (
    <div>
      <h1 className="text-2xl mb-5">{"تعديل المنتج "}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="الاسم"
          register={{ ...register("name", { required: true }) }}
          error={errors.name?.message}
        />
        <TextField
          label="الوصف"
          isTextArea={true}
          register={{ ...register("short_description", { required: true }) }}
          error={errors.short_description?.message}
        />
        <TextField
          label="السعر"
          type="number"
          register={{ ...register("regular_price", { required: true }) }}
          error={errors.regular_price?.message}
        />
        <TextField
          label="السعر بعد التخفيض"
          type="number"
          register={{ ...register("sale_price", { required: true }) }}
          error={errors.sale_price?.message}
        />
        <SelectField
          label="الحالة"
          register={{ ...register("stock_status", { required: true }) }}
          items={["instock", "outofstock"]}
          error={errors.stock_status?.message}
          value={product.stock_status}
        />
         <SelectField
          label="التصنيف"
          register={{ ...register("categories", { required: true }) }}
          items={["تصنيف1", "تصنيف2", "تصنيف3"]}
          error={errors.categories?.message}
          value={product.categories}
        />


        {/* Image Upload Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {"تغيير الصورة"}
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <MainButton text="حفظ" />
      </form>
    </div>
  );
};

export default ProductModal;
















// import { useForm } from "react-hook-form";
// import { $api } from "../../../../client";
// import MainButton from "../../MainButton";
// import PromiseToast from "../../Toasts/PromiseToast";
// import useModal from "../../../../store/useModal";
// import useProductModal from "../../../../store/modals/ProductModal";
// import TextField from "../../Form/TextField";
// import SelectField from "../../Form/SelectField";
// import { useState } from "react";

// const ProductModal = () => {
//   const { product } = useProductModal();
//   const { toggle } = useModal();
//   const [imageFile, setImageFile] = useState(null); // State to store selected image file
//   const { register, handleSubmit, reset, formState: { errors } } = useForm({
//     defaultValues: {
//       name: product.name,
//       regular_price: product.regular_price,
//       sale_price: product.sale_price,
//       stock_status: product.stock_status,
//       short_description: product.short_description,
//       categories: product.categories,
//     }
//   });

//   // Handle Image File Change
//   const handleImageChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const onSubmit = async (data) => {
//     data['categories'] = [data['categories']];
    
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("regular_price", data.regular_price);
//     formData.append("sale_price", data.sale_price);
//     formData.append("stock_status", data.stock_status);
//     formData.append("short_description", data.short_description);
//     formData.append("categories", JSON.stringify(data.categories));

//     if (imageFile) {
//       formData.append("image", imageFile); // Add image to the form data
//     }

//     let apiCall;
//     apiCall = $api.post(`wp-json/products/v1/update-product/${product.id}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       }
//     });

//     PromiseToast(
//       apiCall,
//       "جاري تحديث البيانات...",
//       "فشلت العملية حاول لاحقًا",
//       "تم التحديث بنجاح!"
//     );

//     toggle();
//     reset();
//     setImageFile(null); // Reset image file state
//   };

//   return (
//     <div>
//       <h1 className="text-2xl mb-5">{"تعديل المنتج "}</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <TextField
//           label="الاسم"
//           register={{...register('name', { required: true })}}
//           error={errors.name?.message}
//         />
//         <TextField
//           label="الوصف"
//           isTextArea={true}
//           register={{...register('short_description', { required: true })}}
//           error={errors.short_description?.message}
//         />
//         <TextField
//           label="السعر"
//           type="number"
//           register={{...register('regular_price', { required: true })}}
//           error={errors.regular_price?.message}
//         />
//         <TextField
//           label="السعر بعد التخفيض"
//           type="number"
//           register={{...register('sale_price', { required: true })}}
//           error={errors.sale_price?.message}
//         />
//         <SelectField 
//           label="الحالة"
//           register={{...register('stock_status', { required: true })}}
//           items={['instock', 'outofstock']}
//           error={errors.stock_status?.message}
//           value={product.stock_status}
//         />
//         <TextField
//           label="التصنيف"
//           register={{...register('categories', { required: true })}}
//           error={errors.categories?.message}
//         />
        
//         {/* Image Upload Field */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             {"تغيير الصورة"}
//           </label>
//           <input 
//             type="file" 
//             accept="image/*" 
//             onChange={handleImageChange} 
//           />
//         </div>

//         <MainButton text="Save" />
//       </form>
//     </div>
//   );
// };

// export default ProductModal;
