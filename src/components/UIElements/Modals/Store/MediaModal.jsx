import { $api } from '../../../../client';
import useImageModal from '../../../../store/modals/ImageModal'
import TextButton from '../../TextButton';
import PromiseToast from '../../Toasts/PromiseToast';

const MediaModal = () => {
    const {image} = useImageModal();
    const onDelete = ()=>{
        let res  ;
        res = $api.post(`wp-json/Store/v1/media/delete/${image.id}`)
        PromiseToast(
            res,
        )
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
