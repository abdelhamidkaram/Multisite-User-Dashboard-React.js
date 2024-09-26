import DeleteIcon from "../../../../assets/icons/delete.svg";
import { $api, useData } from "../../../../client";
import PromiseToast from "../../Toasts/PromiseToast";
import { ShimmerCategoryItems } from "shimmer-effects-react";
import useModal from "../../../../store/useModal";

const ReviewsModal = () => {
  const { toggle } = useModal();

  // استخدام useData لجلب المراجعات
  const { data: Reviews, error, isLoading, mutate } = useData("wp-json/markting/v1/reviews");

  if (error) return <p>Failed to fetch reviews</p>;

  return !isLoading ? (
    <div>
      <div className="min-w-[300px] max-h-[500px] mt-4 p-2">
        {Reviews.map((item) => (
          <ReviewItem
            key={item.comment_ID}
            name={item.comment_author}
            content={item.comment_content}
            id={item.comment_ID}
            product={item.comment_post_ID}
            toggle={toggle}
            mutate={mutate} // تمرير mutate لتحديث البيانات بعد الحذف
          />
        ))}
      </div>
    </div>
  ) : (
    <div>
      <div className="min-w-[300px] max-h-[500px] mt-4 p-2">
        <ShimmerCategoryItems items={3} mode="light" hasImage={false} />
      </div>
    </div>
  );
};

export default ReviewsModal;

function ReviewItem({ id, content, name, product, toggle, mutate }) {
  function deleteHandler() {
    const deleteFun = $api.post("wp-json/markting/v1/reviews/delete/" + id);
    PromiseToast(deleteFun, "جاري حذف العنصر", null, "تم الحذف بنجاح");
    deleteFun.then(() => {
      mutate(); // تحديث البيانات بعد الحذف
      toggle(); // إغلاق المودال بعد الحذف
    });
  }

  return (
    <div
      className="
        md700:max-w-[1000px]
        flex justify-between flex-wrap 
        mb-2
        shadow-sm min-h-12 w-full border-2 border-gray-300 rounded-md p-1"
    >
      <div>
        <b>الاسم </b>
        <p>{name}</p>
      </div>
      <div>
        <b>المراجعة</b>
        <p>{content}</p>
      </div>
      <div>
        <b>رقم المنتج</b>
        <p>{product}</p>
      </div>
      <div className="flex gap-1 justify-around items-center ">
        <div
          onClick={deleteHandler}
          className="p-1 rounded-full w-8 h-8 cursor-pointer"
        >
          <img src={DeleteIcon} alt="حذف" />
        </div>
      </div>
    </div>
  );
}
