import { $api, useData } from '../../../../client';
import useImageModal from '../../../../store/modals/ImageModal'
import useModal from '../../../../store/useModal';
import TextButton from '../../TextButton';
import PromiseToast from '../../Toasts/PromiseToast';

const MediaModal = () => {
  const {mutate:mutate} = useData("wp-json/store/v1/media");
    const {image } = useImageModal();
    const {toggle} = useModal();
    const onDelete = ()=>{
        try {
          let res  ;
          res = $api.post(`wp-json/Store/v1/media/delete/${image.id}`)
          PromiseToast(
              res,
              "جاري حذف الصورة",
              "فشل حذف الصورة حاول لاحقا",
              "تم حذف الصورة بنجاح",
              ()=>{
                mutate();
                toggle();
              }
              
          );
          
        } catch (error) {
          console.log(error);
        }
        
    }
  return (
    <div className='flex flex-col gap-4 mt-5'>
      <div className='flex justify-between'>
      <h2>{image.title}</h2>
      <TextButton text={"حذف"} ClickHandler={onDelete} />
      </div>
      <img className=' max-w[300px] md:max-w-[800px] max-h-[600px]' src={`${image.url}`}/>
    </div>
  )
}

export default MediaModal
