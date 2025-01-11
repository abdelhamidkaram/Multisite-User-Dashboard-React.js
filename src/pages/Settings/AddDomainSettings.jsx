import TextField from "../../components/UIElements/Form/TextField";
import MainButton from "../../components/UIElements/MainButton";
import {useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { $api } from "../../client";
import { useState } from "react";
import {
  BiArrowBack,
  BiCheck,

  BiPlus,
  BiSearch,

  BiSolidServer,
  BiVideo,
} from "react-icons/bi";
import { BounceLoader } from "react-spinners";

/**
 * This component is responsible for rendering a form to add a domain to the
 * settings page. The form has only one input field which is the domain name.
 * The form is validated using Yup, and the validation rules are as follows:
 *
 * - The domain name is required and must not be empty.
 * - The domain name must match the regular expression /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
 *   which checks if the domain name is valid or not.
 *
 * When the form is submitted, a POST request is sent to the server to add the
 * domain to the settings.
 *
 * @returns {JSX.Element}
 */
export const AddDomain = () => {
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [linkError, setLinkError] = useState(null);
  
  const domainStep = localStorage.getItem("domainStep");
  const [step, setStep] = useState(domainStep ?? 0);
  // Schema validation with Yup
  const Schema = Yup.object({
    domain: Yup.string()
      .required("لايمكن ترك هذا الحقل فارغاً")
      .matches(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "الرجاء إدخال نطاق صحيح"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const callData = await $api.post("wp-json/settings/v1/add-domain", data);
      if (callData.data.status == true) {
        localStorage.setItem("old_domain", localStorage.getItem("path"));
        if (callData.data.message.includes("API failure")) {
          setError(callData.data.message);
        } else {
          setSuccess(callData.data.message);
          setError(null);
          setStep(2);
          localStorage.setItem("domainStep", 2);
          localStorage.setItem("domain", data.domain);
        }
      }
    } catch (error) {
        setError(error.response.data.message );

    } finally {
      setLoading(false);
    }
  };
  const LinkDomainHandler = async () => {
    try {
        setLoading(true);
        const callData = await $api.post("wp-json/settings/v1/link-domain" , {domain : localStorage.getItem('domain') , old_domain : localStorage.getItem('old_domain')});
        if (callData.data.status == true) {
            localStorage.setItem("path",  localStorage.getItem('domain'));
            localStorage.setItem("token", callData.data.new_token);
            localStorage.setItem("domainStep", 3);
            localStorage.setItem("token", callData.data.new_token);
            setStep(3);
            window.location.href = 'https://dash.motkaml.com/?t='+ localStorage.getItem('token') + '&old_domain=' + localStorage.getItem('old_domain') +'&step=3';

        }
      } catch (error) {
          setLinkError( error.response.data.message ||'حدث خطأ ما .. اعد المحاولة مرة أخرى او تواصل مع الدعم الفني ' );
  
      } finally {
        setLoading(false);
      }
  };
  return (
    <diV className="">
          {step > 0 && <div className=" cursor-pointer flex items-center justify-end gap-2" 
           onClick={() => {
             setStep((prv) => prv - 1)
             localStorage.setItem("domainStep", step - 1);
          }}
          >
            <p className=" font-bold" >تراجع</p>
          <BiArrowBack   />
          </div>}

   <div className="relative m-9">
   {step < 3 && <div className="flex  items-center w-full ">
        <HeaderStep num={1} isDone={step > 0} isCurrent={step == 0} />
        <Divider isCurrent={step >= 1} />
        <HeaderStep num={2} isDone={step > 1}isCurrent={step == 1}  />
        <Divider isCurrent={step >= 2} />
        <HeaderStep num={3} isDone={step >2} isCurrent={step == 2}  />
      </div>}    
      {step == 0 && <StepOneContent step={step} setStep={setStep}/>}
      {step == 1 && <StepTwoContent error={error} errors={errors} success={success} Loading={Loading} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}/>}
      {step == 2 && <StepThreeContent LinkDomainHandler={LinkDomainHandler} error={linkError}/>}
      {step > 2 && <ChangeDomainIsDone ClickHandler={() => setStep(0) } />}
   
      
    </div></diV>
  );
};

const ChangeDomainIsDone = ({ClickHandler}) => {
  return (
    <div className="flex justify-center items-center flex-col text-center">
    <BiCheck size={100} className="text-green-500 my-11 border-2 border-dotted border-green-500 rounded-full "/>
      <h1 className="text-3xl font-bold mb-5">
        {" "}
        تم تغيير النطاق
      </h1>
      <p className="mb-11">
        {" "}
        تم تغيير النطاق بنجاح، يمكنك الدخول الي موقع التحقق من الخوادم والتأكيد من النطاق الخاص بك
        {""}
        <p className="text-red-500">اذا تم فقدان البينات او عدم الربط الربط مع الدومين بشكل جيد فيمكنك <button 
        onClick={async () => {
         try {
             const callApi = await $api.post( "https://www.motkaml.com/wp-json/settings/v1/restore-old-domain");

             if (callApi.data.status == true) {
                 localStorage.setItem("path",  localStorage.getItem('old_domain'));
                 localStorage.setItem("token", callApi.data.new_token);
                 localStorage.setItem("domainStep", 3);
                 window.location.href = 'https://dash.motkaml.com/?t='+ localStorage.getItem('token') + '&old_domain=' + localStorage.getItem('old_domain') +'&step=0';
             }
         } catch (error) {
             console.log(
               "Error happened when restoring old domain: " + error
             );
             
         }
        }}
       className="text-blue-500" href="#"> الضغط هنا لاستعادة النطاق الفرعى الأساسي </button> </p>
        </p>
     
      <MainButton text={'تغيير الي نطاق اخر '} ClickHandler={ClickHandler}/>
    </div>
  );
}


const StepThreeContent = ({LinkDomainHandler , error}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">
        {" "}
        التحقق والتأكيد
      </h1>

      <p>
        {" "}
        الآن يجب عليك الدخول الي موقع التحقق من الخوادم والتأكد من النطاق الخاص بك يشير الي خوادمنا قبل تأكيد التغيير 
        <a className="text-blue-500" href="#">
          {" "}
          <div className="flex items-center">
            <BiVideo /> <span>اضغط هنا لمشاهدة شرح بالفيديو</span>
          </div>
        </a>
      </p>
      <p className="text-red-500">         *يرجى العلم أنه في حال تأكيد تغيير النطاق قبل التحقق من اكتمال الربط قد يؤدي الي توقف موقعك مؤقتا لحين اكتمال الاعداد من مضيف النطاقات الخاص بك *      </p>
      <p>موقع التحقق : </p>
     <p className="mb-11"> <a className="text-blue-500" href={'https://dnschecker.org/#A/'+localStorage.getItem('domain')}> dnschecker.org </a>
</p>

<MainButton   text={" لقد تم التحقق وأريد تغيير النطاق الان" }  ClickHandler={LinkDomainHandler} />
 {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

const StepTwoContent = ({error , success , Loading , handleSubmit ,onSubmit , errors , register}) => {
  return (
    <div className="relative">
        {Loading ? (
          <div className="absolute top-0 bottom-0 w-full bg-blue-dark bg-opacity-60 rounded-md content-center ">
            <BounceLoader className="m-auto" />
          </div>
        ) : null}
    <div>
    <h1 className="text-3xl font-bold mb-5">
    {" "}
    ادخل النطاق الخاص بك
  </h1>


   <form onSubmit={handleSubmit(onSubmit)}>
     
   <div className="mb-11">
   <TextField
   
     label={"اسم النطاق"}
     type="text"
     register={{ ...register("domain") }}
     error={errors.domain?.message}
   />
   
   </div>

   <MainButton  text={'حفظ النطاق'}  />
   {error ? <p className="text-red-500">{error}</p> : null}
   {success ? <p className="text-green-500">{success}</p> : null}
   </form>

    </div> 
    
    </div>
  );
}

const StepOneContent = ({   setStep }) => {
  return (
    
    <div>
    <div className={'mb-11'}>
    <h1 className="text-3xl font-bold mb-5">
      {" "}
      اضافة اسماء خوادمنا الي نطاقك
    </h1>

    <p>
      {" "}
      لإعداد النطاق بشكل صحيح يجب عليك ادخال ip متكامل  في
      اعدادات نطاقك علي جودادي او نيمشيب او مستضيف النطاقات الذي تتعامل معه{" "}
      <a className="text-blue-500" href="#">
        {" "}
        <div className="flex items-center">
          <BiVideo /> <span>اضغط هنا لمشاهدة شرح بالفيديو</span>
        </div>
      </a>
    </p>
    <b> motkaml-ip : </b> <p>145.223.21.159</p>
  </div>
  <MainButton text={'تمت الإضافة'} ClickHandler={() =>{
    localStorage.setItem("domainStep",  1)
    setStep(1)
  }}/>
    </div>
  );
}

const HeaderStep = ({ num, isCurrent , isDone}) => {
  if (isDone) {
    return (
      <div className=" p-5 bg-green-500 rounded-full ">
        {" "}
        <BiCheck size={30} />{" "}
      </div>
    );
  }
  return (
    <div className={`${
          isCurrent ? " border-dashed border-green-500 border-4 rounded-full" : ""
        } `}>
      <div
        className={`p-5 m-1 bg-blue-500 rounded-full  `}
      >
        {num == 1 ? (
          <BiSolidServer size={30} color="white" />
        ) : num == 2 ? (
          <BiPlus size={30} color="white" />
        ) : (
          <BiSearch size={30} color="white" />
        )}
      </div>
    </div>
  );
};

const Divider = ({ isCurrent }) => {
  return (
    <div
      className={`${isCurrent ? "bg-green-500" : "bg-slate-300"} w-full h-1`}
    ></div>
  );
};
