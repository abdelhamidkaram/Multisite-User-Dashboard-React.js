import useModal from "../../store/useModal";
import EditIcon from "../../assets/icons/setting.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import usePageModal from "../../store/modals/PageModal";
import { BiLink } from "react-icons/bi";
import { ShimmerDiv, ShimmerTitle } from "shimmer-effects-react";

const PageItem = ({ pageObj, deleteHandler, loading }) => {
  const defaultPagesSlug = ['my-account' , 'checkout' , 'cart' , 'shop' , '%d8%a5%d8%aa%d9%85%d8%a7%d9%85-%d8%a7%d9%84%d8%b7%d9%84%d8%a8' , '%d8%b3%d9%84%d8%a9-%d8%a7%d9%84%d9%85%d8%b4%d8%aa%d8%b1%d9%8a%d8%a7%d8%aa'];
  const { changePage } = usePageModal();
  const { name, url } = pageObj;
  const { isOpen, toggle, changeName } = useModal();
  return (
    <div className="w-full flex justify-between gap-10 items-center bg-white rounded-lg mt-8 p-5 min-h-12 shadow-md">
      <div className="flex md:justify-between w-full">
        <div>
          {loading ? (
            <ShimmerTitle className="w-20" mode="light" line={1} width={50} />
          ) : (
            <h4>{name}</h4>
          )}
        </div>
        <div className="flex gap-4">
          <a
            className="text-blue-light text-left "
            href={loading ? "" : url}
            target="_blank"
          >
            {loading ? (
              <ShimmerDiv mode="light" width={20} height={20} rounded={50} />
            ) : (
              <BiLink />
            )}
          </a>
        </div>
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
              changePage(pageObj);
              changeName("pages");
              toggle(!isOpen);
            }}
            className=" w-8 bg-blue-light  p-1 rounded-full"
          >
            <img src={EditIcon} />
          </button>
          { !defaultPagesSlug.includes(url.split("/")[url.split("/").length - 2]) && <button className=" w-8  p-1">
            <img src={DeleteIcon} onClick={deleteHandler} />
            
          </button>}
        </div>
      )}
    </div>
  );
};

export default PageItem;
