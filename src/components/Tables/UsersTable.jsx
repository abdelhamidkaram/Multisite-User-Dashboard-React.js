
import { useState } from "react";
import useModal from "../../store/useModal";
import useUserModal from "../../store/modals/UserModals";
import CustomTable from "./CustomTable";

const UsersTable = ({ users , changeTitle }) => {
  const headers = [
    "المعرف",
    "الاسم الاول",
    "الاسم الاخير",
    "البريد الالكتروني",
  ]; 
  const newData = users.map((item) => {
    return {
      id: item.id,
      first_name: item.first_name,
      last_name: item.last_name,
      email: item.email,
    };
  });

  const [Users, setUsers] = useState(newData);
  const { toggle, changeName } = useModal();
  const { changeUser } = useUserModal();

  function editHandler(user) {
    changeUser(user);
    openModal();
  }

  function openModal() {
    changeName("user");
    toggle();
  }

  function deleteHandler(user) {
    const newData = Users.filter((item) => item.id != user.id);
    setUsers(newData);
  }

  return (
    <div>
      <CustomTable
        data={Users}
        title={ changeTitle ?? "العملاء"}
        CustomHeader={headers}
        deleteHandler={deleteHandler}
        editHandler={editHandler}
      />
    </div>
  );
};

export default UsersTable;
