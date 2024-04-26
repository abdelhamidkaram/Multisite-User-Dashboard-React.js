import { NavLink } from "react-router-dom"

const SectionTitle = ({title , to}) => {
  return (
    <div className="flex flex-row justify-between items-center">
    <h2 className="my-4 mx-2 font-bold text-xl "> {title} </h2>
    { to ? <NavLink  className='text-blue-light' to={to} >{ 'عرض المزيد'} </NavLink> : null }
    </div>
  )
}

export default SectionTitle
