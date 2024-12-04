import DeleteIcon from "../../../../assets/icons/delete.svg";
import { $api, useData } from "../../../../client";
import PromiseToast from "../../Toasts/PromiseToast";
import { ShimmerCategoryItems } from "shimmer-effects-react";
import useModal from "../../../../store/useModal";
import NoteBox from "../../NoteBox";

const ReviewsModal = () => {
  const { toggle } = useModal();


  const { data: Reviews, error, isLoading, mutate } = useData("wp-json/markting/v1/reviews");


    if (error){
      
      return <div className="p-4" > <NoteBox type="error" > <h3 className="text-center w-80"> حدث خطأ ما , أو أن اشتراكك الحالى لايدعم تلك الميزة </h3> </NoteBox> </div>;
  
    }

  return !isLoading ? (
    <div>
      <div className="min-w-[300px] max-h-[500px] mt-4 p-2">
        {Reviews. length === 0 ? <h3>لا يوجد مراجعات</h3> : Reviews.map((item) => (
          <ReviewItem
            key={item.comment_ID}
            name={item.comment_author}
            content={item.comment_content}
            id={item.comment_ID}
            product={item.comment_post_ID}
            toggle={toggle}
            mutate={mutate}
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
      mutate(); 
      toggle(); 
    });
  }

  return (
    <div
      className="
        md700:max-w-[1000px]
        flex justify-between flex-wrap  flex-col
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
      <div className=" ">
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
