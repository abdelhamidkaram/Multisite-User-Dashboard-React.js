import { Fragment } from "react";
import MainButton from "../../components/UIElements/MainButton";
import TextButton from "../../components/UIElements/TextButton";

const ThemesItem = ({ themeObj }) => {
    const {imgUrl, title, description, isActive} = themeObj ;
  return (
    <Fragment>

      <div className="flex gap-10 items-center bg-white rounded-lg mt-8 p-5 shadow-md border-solid  border-gray-200 ">

        <div className="w-2/5 shadow-md   rounded-lg overflow-hidden ">
          <img src={imgUrl} />
        </div>
        <div className="flex flex-col Theme-item-description w-3/5 gap-5 ">
          <h3 className="font-bold text-blue-dark text-2xl "> {title} </h3>
          <p className="line-clamp-3 min-h-24">{description}</p>
          <div className="flex items-center gap-4 ">
           <MainButton isActive={isActive} text={!isActive ? "تنشيط" : "مفعل"}/>

            {isActive ? (
              <MainButton text={'تخصيص'} /> 
            ) : null}
            <TextButton text={ 'معاينة'} />
          </div>
        </div>
      </div>

    </Fragment>
  );
};

export default ThemesItem;
