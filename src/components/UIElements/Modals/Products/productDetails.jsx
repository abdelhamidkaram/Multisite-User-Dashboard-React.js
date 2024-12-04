import useProductModal from "../../../../store/modals/ProductModal";
import useModal from "../../../../store/useModal";

const ProductDetailsModal = () => {
  const { product } = useProductModal();
  const { toggle } = useModal();

  return (
    <div className="relative p-4 md:min-w-96">
      <h1 className="text-2xl mb-5">{"عرض تفاصيل المنتج"}</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {"الاسم"}
        </label>
        <p className="text-gray-900">{product.name || "غير متوفر"}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {"الوصف"}
        </label>
        <p className="text-gray-900">{product.short_description || "غير متوفر"}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {"السعر"}
        </label>
        <p className="text-gray-900">{product.regular_price || "غير متوفر"}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {"السعر بعد التخفيض"}
        </label>
        <p className="text-gray-900">{product.sale_price || "غير متوفر"}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {"الحالة"}
        </label>
        <p className="text-gray-900">{product.stock_status === 'instock' ? "متوفر" : "غير متوفر"}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {"التصنيفات"}
        </label>
        <p className="text-gray-900">
          {product.categories?.join(", ") || "غير متوفر"}
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {"الصورة"}
        </label>
        {product.image ? (
          <img
            src={product.image}
            alt="Product"
            className="max-w-full h-auto rounded"
          />
        ) : (
          <p className="text-gray-900">{"لا توجد صورة"}</p>
        )}
      </div>

      <button
        onClick={toggle}
        className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {"إغلاق"}
      </button>
    </div>
  );
};

export default ProductDetailsModal;
