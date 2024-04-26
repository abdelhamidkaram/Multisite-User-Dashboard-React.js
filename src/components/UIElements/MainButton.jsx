
const MainButton = ({ isActive , text , ClickHandler  , danger}) => {

  return (
    <button
    onClick={()=>{
     
      ClickHandler ?ClickHandler():null }}
    className={`${
      isActive ? "bg-green-500" :  "bg-blue-light"
    } ${danger ? 'bg-red-600' : null} py-2 px-4 rounded-md text-white font-bold `}
    disabled={isActive}
  >
    {text}
  </button>
  )
}

export default MainButton
