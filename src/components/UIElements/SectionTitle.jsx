import { NavLink } from "react-router-dom"
import MainButton from "./MainButton"

const SectionTitle = ({title , to , addBTNTitle , addBTNClickHandler}) => {
  return (
    <div className="flex flex-row justify-between items-center">
    <h2 className="my-4 mx-2 font-bold text-xl "> {title} </h2>
    { to ? <NavLink  className='text-blue-light' to={'/app'+to} >{ 'عرض المزيد'} </NavLink> : null }
    {addBTNTitle ? <MainButton text={addBTNTitle} ClickHandler={addBTNClickHandler} />
    :null}
    </div>
  )
}

export default SectionTitle
