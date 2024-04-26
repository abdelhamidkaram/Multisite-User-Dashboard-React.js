import OrdersTable from "../../components/Tables/OrdersTable";
import { useState } from "react";
import ordersIcons from "../../assets/icons/bag.svg";
import ClintIcons from "../../assets/icons/profile.svg";
import refundIcons from "../../assets/icons/arrow.svg";
import UsersTable from "../../components/Tables/UsersTable";
import RefundTable from "../../components/Tables/RefundTable";
import TabsHeader from "../../components/UIElements/TabsHeader";
import { users } from "../../assets/data";
const Orders = () => {
  const [tabNumber, setTabNumber] = useState(1);
  const handelClick = (num) => {
    setTabNumber(num);
  };

  const tabs = [
    {
      name: "الطلبات",
      icon: (
        <img
          className="bg-blue-light size-6 p-1 rounded-full"
          src={ordersIcons}
        />
      ),
    },
    {
      name: "العملاء",
      icon: (
        <img
          className="bg-blue-light size-6 p-1 rounded-full"
          src={ClintIcons}
        />
      ),
    },
    {
      name: "المرتجعات",
      icon: (
        <img
          className="bg-blue-light size-6 p-1 rounded-full"
          src={refundIcons}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-center ">
        <TabsHeader
          tabs={tabs}
          handelClick={handelClick}
          tabNumber={tabNumber}
        />
      </div>

      <div className={tabNumber == 1 ? " block " : "hidden"}>
        <OrdersTable showMorButton={false} />
      </div>

      <div className={tabNumber == 2 ? " block" : "hidden"}>
        <UsersTable  users={users} />
      </div>

      <div className={tabNumber == 3 ? " block" : "hidden"}>
        <RefundTable />
      </div>
    </div>
  );
};

export default Orders;
