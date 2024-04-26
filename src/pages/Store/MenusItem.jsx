import EditIcon from "../../assets/icons/setting.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import useModal from "../../store/useModal";

function MenusItem({ menuObj }) {
  const { name, items } = menuObj;
  const { isOpen ,toggle , changeName } = useModal();
  
  return (
    <div className="flex justify-between gap-10 items-center bg-white rounded-lg mt-8 p-5 min-h-12 shadow-md">
      <div className="flex justify-between w-full">
        <div>
          <h4>{name}</h4>
        </div>
        <div className="flex ">
          {items.map((item, i) => (
            <p key={i} className=" px-3">
              {item.name}
            </p>
          ))}
        </div>
      </div>

      <div className=" flex gap-4 ">
        <button 
        onClick={()=>{
          changeName('menus');
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
  );
}

export default MenusItem;
