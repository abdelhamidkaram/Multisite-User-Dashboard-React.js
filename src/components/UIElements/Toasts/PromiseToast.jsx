import toast from "react-hot-toast";
const PromiseToast = (promiseFunction, loadingMSG, errorMSG, successMSG , successFunctions , reloadAfterSuccess) => {
  toast.promise(
    promiseFunction,
    {
      loading: loadingMSG ?? "جاري التحميل ",

      error: (data)=>{
        console.log('print error : '+data);
        
        if(data.response?.data !== null && data.response?.data !== undefined){
          return data.response.data;
         }else if (data.message !== undefined && data.message !== null){
          return data.message;
        }else if(errorMSG !== undefined && errorMSG !== null){
          return errorMSG;
        }

        return 'حدث خطأ ما' ; 
      
      },
      success: ()=>{
        reloadAfterSuccess ? window.location.reload() : null
        successFunctions ? successFunctions() : null
        return successMSG ?? "تم بنجاح" ; 
      },
    },
  );
};

export default PromiseToast;
