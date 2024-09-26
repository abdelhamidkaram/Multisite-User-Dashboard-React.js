import useModal from "../../store/useModal";
import useUserModal from "../../store/modals/UserModals";
import CustomTable from "./CustomTable";
import {useData} from "../../client";

const UsersTable = ({ changeTitle }) => {
  const headers = ["المعرف", "الاسم", "البريد الالكتروني"];
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


  const { data: customers, error, isLoading, mutate } = useData("wp-json/products/v1/get-customers");


  function deleteHandler(user) {
    const newData = customers.filter((item) => item.id !== user.id);
    mutate(newData, false);
  }

  if (error) return <p>Failed to fetch customers</p>;

  return (
    <div>
      <CustomTable
        isLoading={isLoading}
        data={customers}
        title={changeTitle ?? "العملاء"}
        CustomHeader={headers}
        deleteHandler={deleteHandler}
        editHandler={editHandler}
      />
    </div>
  );
};

export default UsersTable;
