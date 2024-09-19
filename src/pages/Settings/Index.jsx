import { useState } from "react";
import TabsHeader from "../../components/UIElements/TabsHeader";
import { GeneralSettings } from "./GeneralSettings";
import UserSettings from "./UserSettings";
import PaymentSettings from "./PaymentSettings/index";
import { AddDomain } from "./AddDomainSettings";
import { useSearchParams } from "react-router-dom";
import ShippingSettings from "./ShippingSettings";

const Settings = () => {
  const [searchParams] = useSearchParams();
  const paramValue = searchParams.get('p');
  const [tabNumber, setTabNumber] = useState(paramValue ?? 1);

  const handelClick = (num) => {
    setTabNumber(num);
  };

  const tabs = [
    {
      name: "الإعدادات العامة",
      icon: null,
    },
    {
      name: "النطاق",
      icon: null,
    },
    {
      name: "العملاء",
      icon: null,
    },
    {
      name: "طرق الدفع",
      icon: null,
    },
    {
      name: "الشحن",
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

      <div className="bg-white mt-10 md:m-10 p-3 md:p-8 overflow-hidden rounded-md ">
        <div className={tabNumber == 1 ? "block " : "hidden"}>
          <GeneralSettings />
        </div>

        <div className={tabNumber == 2 ? "block " : "hidden"}>
          <AddDomain />
        </div>

        <div className={tabNumber == 3 ? "block " : "hidden"}>
          <UserSettings />
        </div>

        <div className={tabNumber == 4 ? "block" : "hidden"}>
         <PaymentSettings />
        </div>

        <div className={tabNumber == 5 ? "block" : "hidden"}>
        <ShippingSettings />
        </div>

      </div>
    </div>
  );
};

export default Settings;
