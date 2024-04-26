import useModal from "../../store/useModal";
import EditIcon from "../../assets/icons/setting.svg";
import DeleteIcon from "../../assets/icons/delete.svg";

const PageItem = ({pageObj}) => {
  
  const {name , url } = pageObj ;
  const {isOpen ,toggle ,  changeName } = useModal();
    return (
    <div className="w-96 flex justify-between gap-10 items-center bg-white rounded-lg mt-8 p-5 min-h-12 shadow-md">
      <div className="flex justify-between w-full">
        <div>
          <h4>{name}</h4>
        </div>
        <div className="flex ">
         <h4>{url}</h4>
        </div>
      </div>

      <div className=" flex gap-4 ">
        <button 
        onClick={()=>{
          changeName('pages');
          toggle(!isOpen);

        }}
        className=" w-8 bg-blue-light  p-1 rounded-full">
          <img src={EditIcon}  /> 
        </button>
        <button className=" w-8  p-1">
          <img src={DeleteIcon} />
        </button>
      </div>
    </div>
  )
}

export default PageItem
