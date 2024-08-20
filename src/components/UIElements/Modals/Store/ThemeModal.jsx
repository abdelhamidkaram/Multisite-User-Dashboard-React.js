import useThemeModal from '../../../../store/modals/ThemeModal'

const ThemeModal = () => {
    const {theme} = useThemeModal();
  return (
    <div>
    <h2>{theme.title}</h2>
      <div className='overflow-y-scroll m-6 h-[80vh]'>
      <img  src={`${theme.previewUrl}`}/>
      </div>
    </div>
  )
}
 
export default ThemeModal
