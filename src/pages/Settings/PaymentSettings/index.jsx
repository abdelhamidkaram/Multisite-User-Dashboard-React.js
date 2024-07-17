import BankAccountSettings from "./BankAccountSettings";
import CashPaymentSetting from "./CashPaymentSetting";
import MyfatoraAccountSettings from "./MyfatoraAccountSettings";
const PaymentSettings = () => {
  
  return (
    <div className="flex flex-col gap-10"  >
      <CashPaymentSetting />
      <BankAccountSettings />
      <MyfatoraAccountSettings /> 
    </div>
  );
};

export default PaymentSettings;
