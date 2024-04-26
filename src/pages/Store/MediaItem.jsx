import useModal from "../../store/useModal";

const MediaItem = ({imgObj}) => {
    const {isOPen , changeName  , toggle} = useModal();
    const {url  } = imgObj;
  return (
    <div onClick={
        ()=>{
            changeName('mediaView') ; 
            toggle(!isOPen);
        }
    } className="w-44 bg-black  rounded-md overflow-hidden shadow-md border ">
     <img  className="w-44 h-52 object-cover hover:opacity-65  duration-1000  hover:transition-opacity cursor-pointer" src={url} />
    </div>
  );
};

export default MediaItem;
