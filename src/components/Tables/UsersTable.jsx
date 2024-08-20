import { useEffect, useState } from "react";
import useModal from "../../store/useModal";
import useUserModal from "../../store/modals/UserModals";
import CustomTable from "./CustomTable";
import { $api } from "../../client";
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

 

  const  fetchCustomers = async ()=>{ 
  try {
    const response = await $api.get('wp-json/products/v1/get-customers');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }

  }
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getCustomers = async () => {
      console.log(customers);
      setLoading(true);
      try {
        const customersData = await fetchCustomers();
        setCustomers(customersData);
      } catch (error) {
        setError("Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    };

    getCustomers();
  }, []);
  function deleteHandler(user) {
    const newData = customers.filter((item) => item.id != user.id);
    setCustomers(newData);
  }


  if (error) return <p>{error}</p>;

  return (
    <div>
      <CustomTable
      isLoading={loading}
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
