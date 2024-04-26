import { useState } from "react";
import TabsHeader from "../../components/UIElements/TabsHeader";
import { GeneralSettings } from "./GeneralSettings";
import UserSettings from "./UserSettings";
import PaymentSettings from "./PaymentSettings/index";
import ShippingSettings from "./ShippingSettings";

const Settings = () => {
  const [tabNumber, setTabNumber] = useState(1);

  const handelClick = (num) => {
    setTabNumber(num);
  };

  const tabs = [
    {
      name: "الإعدادات العامة",
      icon: null,
    },
    {
      name: "المستخدمون والأدوار",
      icon: null,
    },
    {
      name: "طرق الدفع",
      icon: null,
    },
    {
      name: "التوصيل",
      icon: null,
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

      <div className="bg-white m-10 p-8 overflow-hidden rounded-md ">
        <div className={tabNumber == 1 ? "block " : "hidden"}>
          <GeneralSettings />
        </div>

        <div className={tabNumber == 2 ? "block " : "hidden"}>
          <UserSettings />
        </div>

        <div className={tabNumber == 3 ? "block" : "hidden"}>
         <PaymentSettings />
        </div>

        <div className={tabNumber == 4 ? "block" : "hidden"}>
        <ShippingSettings />
        </div>

      </div>
    </div>
  );
};

export default Settings;
