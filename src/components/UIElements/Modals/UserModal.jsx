import useUserModal from "../../../store/modals/UserModals"

const UserModal = () => {
    const {user} = useUserModal();

  return (
    
    <div>
      {user.id}
    </div>
  )
}

export default UserModal ;
