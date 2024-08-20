import EditIcon from "../../assets/icons/setting.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import useModal from "../../store/useModal";
import useMenuModal from "../../store/modals/MenuModal";
import { ShimmerDiv, ShimmerTitle } from "shimmer-effects-react";

function MenusItem({ menuObj, deleteHandler, loading }) {
  const { changeMenu } = useMenuModal();
  const { name, items } = menuObj;
  const { isOpen, toggle, changeName } = useModal();

  return (
    <div className="flex justify-between gap-10 items-center bg-white rounded-lg mt-8 p-5 min-h-12 shadow-md">
      <div className="flex justify-between w-full">
        <div>
        {loading?<ShimmerTitle className="md:w-80 w-10" mode="light" line={1} width={50}/> :  <h4 className="text-blue-light">{name}</h4>}
        </div>
        {!loading ? (
          <div className="md:flex">
            {items.map((item, i) => (
              <p key={i} className=" px-3">
                {item.title}
              </p>
            ))}
          </div>
        ) : (
          <div className="md:flex">
          <ShimmerTitle className="w-24" mode="light" line={1} width={50}/>
          <ShimmerTitle className="w-24" mode="light" line={1} width={50}/>
          <ShimmerTitle className="w-24" mode="light" line={1} width={50}/>
          </div>
        )}
      </div>

      {loading ? (
        <div className=" flex gap-4 ">
          <ShimmerDiv rounded={50} width={30} height={30} mode="light" />
          <ShimmerDiv rounded={50} width={30} height={30} mode="light" />
          <ShimmerDiv rounded={50} width={30} height={30} mode="light" />
        </div>
      ) : (
        <div className=" flex gap-4 ">
          <button
            onClick={() => {
              changeMenu(menuObj);
              changeName("menus");
              toggle(!isOpen);
            }}
            className=" w-8 bg-blue-light  p-1 rounded-full"
          >
            <img src={EditIcon} />
          </button>
          <button className=" w-8  p-1" onClick={deleteHandler}>
            <img src={DeleteIcon} />
          </button>
        </div>
      )}
    </div>
  );
}

export default MenusItem;
