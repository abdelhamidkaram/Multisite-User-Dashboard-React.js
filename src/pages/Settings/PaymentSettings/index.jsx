import BankAccountSettings from "./BankAccountSettings";
import CashPaymentSetting from "./CashPaymentSetting";
import MyfatoraAccountSettings from "./MyfatoraAccountSettings";
import PaypalAccountSettings from "./PaypalAccountSettings";
const PaymentSettings = () => {
  
  return (
    <div className="flex flex-col gap-10"  >
      <CashPaymentSetting />
      <BankAccountSettings />
      <PaypalAccountSettings /> 
      <MyfatoraAccountSettings /> 
    </div>
  );
};

export default PaymentSettings;
