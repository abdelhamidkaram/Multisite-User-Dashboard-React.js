import useImageModal from "../../store/modals/ImageModal";
import useModal from "../../store/useModal";

const MediaItem = ({imgObj}) => {
    const {changeImage} = useImageModal(); 
    const {isOPen , changeName  , toggle} = useModal();
    const {url  } = imgObj;
  return (
    <div onClick={
        ()=>{
          changeImage(imgObj);  
          changeName('mediaView') ; 

            toggle(!isOPen);
        }
    } className="md:w-44 bg-black  rounded-md overflow-hidden shadow-md border ">
     <img  className="md:w-44 h-52 object-cover hover:opacity-65  duration-1000  hover:transition-opacity cursor-pointer" src={url} />
    </div>
  );
};

export default MediaItem;
