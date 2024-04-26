import MainButton from "../../components/UIElements/MainButton";
import Settings from "../../assets/icons/setting.svg";
import useModal from "../../store/useModal";

const AppItem = ({app }) => {
   const {isOpen , toggle , changeName } = useModal();
    return (
    <div className="pb-2 rounded-md border-2 border-gray-100 overflow-hidden shadow-md  ">
      <img  src="https://storeno.b-cdn.net/market/3-2022/1646671964322.png" />
      <h3 className="px-2 py-3 text-lg text-blue-dark font-bold ">{app.title}</h3>
      <p className="text-sm line-clamp-3 px-3 mb-3 "> {app.des}</p>

      <div className="flex justify-between px-4 cursor-pointer  ">
        <MainButton danger={app.danger} text={app.danger ? "الغاء التفعيل" : " تفعيل "} />

        {app.danger  ?<img 
            onClick={()=>{
               changeName('apps')
               toggle(!isOpen)
            }}
           className="w-12 rounded-full bg-blue-light p-1 " src={Settings} /> : null }
           
      </div>
    </div>
  );
};

export default AppItem;
