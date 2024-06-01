import DeleteIcon from "../../../../assets/icons/delete.svg";
import { $api } from "../../../../client";
import PromiseToast from "../../Toasts/PromiseToast";
import { useEffect, useState } from "react";
import useModal from "../../../../store/useModal";

const ReviewsModal = () => {
  const [Reviews, setReviews] = useState([]);
  const [Loading, setLoading] = useState(true);
  const { toggle } = useModal();

  function callReviewsData() {
    const coupons = $api.get("wp-json/markting/v1/reviews");
    coupons.then((value) => {
      console.log(value.data);
      setReviews(value.data);
      setLoading(false);
    });
  }

  useEffect(() => {
    try {
      callReviewsData();
    } catch (error) {
      setLoading(false);
    }
  }, []);

  if (Loading) {
    return <p>Loading ... </p>;
  }
  return (
    <div>
      <div className=" min-w-[600px] max-h-[500px] overflow-y-scroll mt-4 p-2">
        {Reviews.map((item) => (
          <ReviewItem
            key={item.comment_ID}
            name={item.comment_author}
            content={item.comment_content}
            id={item.comment_ID}
            product={item.comment_post_ID}
            toggle={toggle}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewsModal;

function ReviewItem({
  id,
  content,
  name,
  product,
  toggle
}) {
  function deleteHandler() {
    const deleteFun = $api.post("wp-json/markting/v1/reviews/delete/" + id);
    PromiseToast(deleteFun, "جاري حذف العنصر", null, "تم الحذف بنجاح");
    toggle();
  }
  return (
    <div
      className="flex justify-between flex-wrap 
        mb-2
        shadow-sm min-h-12 w-full border-2 border-gray-300 rounded-md p-1"
    >
      <div>
        <b>الاسم </b>
        <p>{name}</p>
      </div>
      <div>
        <b> المراجعة </b>
        <p>{content}</p>
      </div>
      <div>
        <b> رقم المنتج </b>
        <p>{product}</p>
      </div>
      <div className="flex gap-1 justify-around items-center ">
        <div
          onClick={() => {
            deleteHandler()          }}
          className=" p-1 rounded-full  w-8 h-8 cursor-pointer "
        >
          <img src={DeleteIcon} alt="حذف" />
        </div>
        {/**
        
             <div className="bg-blue-light p-1 rounded-full w-8 h-8 cursor-pointer">
              <img src={EditIcon} alt="تعديل" />
            </div>
    
        */}
      </div>
    </div>
  );
}
