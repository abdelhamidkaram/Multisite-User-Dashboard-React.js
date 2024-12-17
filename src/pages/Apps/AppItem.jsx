import MainButton from "../../components/UIElements/MainButton";

const AppItem = ({ app, actionHandler, isAllowed }) => {
  return (
    <div className="flex flex-col justify-between pb-2 rounded-md border-2 border-gray-100 overflow-hidden shadow-lg">
      <div>
        <img
          className="md:h-[270px] object-cover"
          src={
            app.image ??
            "https://storeno.b-cdn.net/market/3-2022/1646671964322.png"
          }
        />
        <h3 className="px-2 py-3 text-lg text-blue-dark font-bold ">
          {app.title}
        </h3>
        <p className="text-sm line-clamp-3 px-3 mb-3 "> {app.des}</p>
      </div>
      {isAllowed ? (
        <div className="flex justify-between px-4 cursor-pointer  ">
          <MainButton
            danger={app.danger}
            text={app.danger ? "الغاء التفعيل" : " تفعيل "}
            ClickHandler={actionHandler}
          />
        </div>
      ) : (
        <div>
          <p className="text-sm line-clamp-3 px-3 mb-3 text-red-500 ">لا يمكنك تفعيل هذا التطبيق</p>
          <MainButton text={"ترقية الباقة"} to="https://www.motkaml.com/home/prices/" />
        </div>
      )}
    </div>
  );
};

export default AppItem;
