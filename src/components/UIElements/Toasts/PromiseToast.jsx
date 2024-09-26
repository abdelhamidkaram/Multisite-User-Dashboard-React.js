import toast from "react-hot-toast";
const PromiseToast = (promiseFunction, loadingMSG, errorMSG, successMSG , successFunctions , reloadAfterSuccess) => {
  toast.promise(
    promiseFunction,
    {
      loading: loadingMSG ?? "جاري التحميل ",
      error: errorMSG ?? 'خطأ ما ',
      success: ()=>{
        reloadAfterSuccess ? window.location.reload() : null
        successFunctions ? successFunctions() : null
        return successMSG ?? "تم بنجاح" ; 
      },
    },
  );
};

export default PromiseToast;
