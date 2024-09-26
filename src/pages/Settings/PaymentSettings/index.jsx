import { BeatLoader } from "react-spinners";
import { useData } from "../../../client";
import BankAccountSettings from "./BankAccountSettings";
import CashPaymentSetting from "./CashPaymentSetting";
import MyfatoraAccountSettings from "./MyfatoraAccountSettings";
import SadadAccountSettings from "./SadadAccountSettings"; 
import SectionTitle from "../../../components/UIElements/SectionTitle";
import UPaymentsAccountSettings from "./UPaymentsAccountSettings";
import TapAccountSettings from "./TapAccountSettings";

const PaymentSettings = () => {
  const { data: apps, isLoading } = useData("wp-json/store/v1/apps");

  const myFatoorahPlugin = apps?.find(
    (app) =>
      app.plugin_slug === "myfatoorah-woocommerce/myfatoorah-woocommerce.php" &&
      app.isActive
  );

  const sadadPlugin = apps?.find(
    (app) =>
      app.plugin_slug === "sadad-payment/sadad-woocommerce.php" && app.isActive
  );

  const uPaymentsPlugin = apps?.find(
    (app) =>
      app.plugin_slug === "woocommerce-main/UPayments.php" && app.isActive
  );
  const tapPlugin = apps?.find(
    (app) =>
      app.plugin_slug === "Plugin-WooCommerce-All-in-one-master/tap.php" && app.isActive
  );

  return (
    <div className="flex flex-col gap-10">
      <CashPaymentSetting />
      <BankAccountSettings />
      <SectionTitle title=":بوابات الدفع الخارجية المفعلة" />
      <BeatLoader color="#448ace" loading={isLoading} />
      {tapPlugin && <TapAccountSettings />} 
      {myFatoorahPlugin && <MyfatoraAccountSettings />}
      {sadadPlugin && <SadadAccountSettings />} 
      {uPaymentsPlugin && <UPaymentsAccountSettings />} 
    </div>
  );
};

export default PaymentSettings;
