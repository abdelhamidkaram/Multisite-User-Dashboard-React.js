import toast from "react-hot-toast";
const PromiseToast = (promiseFunction, loadingMSG, errorMSG, successMSG) => {
  toast.promise(
    promiseFunction,
    {
      loading: loadingMSG ?? "جاري التحميل ",
      error: errorMSG ?? 'خطأ ما ',
      success: successMSG ?? "تم بنجاح",
    },
  );
};

export default PromiseToast;
