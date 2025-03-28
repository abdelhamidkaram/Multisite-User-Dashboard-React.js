import useStarterSteps from "../../store/StarterStep";
import Step1 from "../../assets/icons/step-1.svg"
import Step2 from "../../assets/icons/step-2.svg"
import Step3 from "../../assets/icons/step-3.svg"
import { Link } from "react-router-dom";
const StarterSteps = () => {
  return (
    <div className="md700:flex md700:gap-2 lg:grid lg:grid-flow-row lg:grid-cols-3 lg:gap-2  ">
      <StepsItem
        to={'/app/settings'}
        number={1}
        title={"أضف الوجو والهوية"}
        des={
          "الرجاء إضافة منتجات إلى متجرك لبدء البيع ، يمكنك إضافة متغيرات مختلفة: الألوان والأحجام ... شاهد هذا الفيديو للحصول على المساعدة:        "
        }
        icon={Step1}
      />
      <StepsItem
        to={'/app/products'}
        number={2}
        title={"اضف المنتجات والأسعار "}
        des={
          "يمكنك إضافة الفئات لإظهار المنتجات المختلفة الموجودة في متجرك ... شاهد هذا الفيديو للحصول على المساعدة:"
        
        }
        icon={Step2}
      />
      <StepsItem
        to={'/app/settings/?p=4'}
        number={3}
        title={"اربط بوابة الدفع والشحن"}
        des={
          "يمكنك تخصيص القالب العام لمتجرك وتعديل الألوان الكتابة والأقسام والمزيد. شاهد هذا الفيديو للمساعدة:"
        }
        icon={Step3}
      />
    </div>
  );
};

export default StarterSteps;

const StepsItem = ({ title, des, number, icon , to }) => {
  const isCompleted = localStorage.getItem('starterStep'+number) ?? false;
  return (
    <Link to={to} className=" cursor-pointer  " >
      <div
        className={`p-3 mb-3 lg:m-0 min-h-52 md700:min-h-60 lg:min-h-52 flex flex-col items-start justify-around  border-solid ${
          isCompleted ? "  border-green-500" : "border-blue-light"
        } border-blue-light border-2 rounded-lg shadow-md hover:to-blue-50 hover:-mt-1 hover:mb-1 duration-300`}
      >
        <h3 className="py-2 text-lg text-blue-dark font-bold">{title}</h3>
        <p className="py-2">{des}</p>
        <div className="flex justify-between  w-full">
          <div className="flex gap-2 ">
            <div
              className={`size-7 rounded-full border text-center leading-normal font-bold ${
                isCompleted ? "bg-green-500 text-white leading-normal " : ""
              }`}
            >
              {number}
            </div>
            {isCompleted ? (
              <span className="text-green-500 font-semibold  "> مكتمل </span>
            ) : (
              <span className="text-gray-400 font-semibold "> غير مكتمل </span>
            )}
          </div>
          <div className=" w-9 bg-blue-light rounded-full p-2 " >
            <img src={icon} />
          </div>
        </div>
      </div>
    </Link>
  );
};
