import { BounceLoader } from 'react-spinners';

const FormLoading = ({Loading}) => {
  return (
    
    Loading ? <div className='absolute top-0 bottom-0 w-full bg-blue-dark bg-opacity-60 rounded-md content-center ' >
          
        <BounceLoader className='m-auto' />
       
     </div> : <div></div>
  )
}

export default FormLoading;
