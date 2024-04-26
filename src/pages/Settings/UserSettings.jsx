import { users } from "../../assets/data";
import UsersTable from "../../components/Tables/UsersTable";

const UserSettings = () => {
  return (
    <div >
      <UsersTable users={users} />
    </div>
  );

};

export default UserSettings;
