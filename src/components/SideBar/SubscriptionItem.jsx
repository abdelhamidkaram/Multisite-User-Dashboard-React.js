import { useEffect, useState } from "react";
import { $api } from "../../client";
import { BiBoltCircle, BiDollarCircle } from "react-icons/bi";
import useModal from "../../store/useModal";

const SubscriptionItem = ({isOpen}) => {
 const [TimerResponse, setTimerResponse] = useState(null);
 const { toggle, changeName } = useModal();
 useEffect(() => {
    const fetchData = async () => {
      const response = await $api.get('/wp-json/subscription/v1/time_diff');
      setTimerResponse(response.data);     
    }
    fetchData();
  }, []); 

  return TimerResponse &&(<button onClick={() => { changeName('subscription') ; toggle() }} className="sub-icon w-full rounded-md">
      <div className="flex gap-2 items-center">
        <BiDollarCircle size={40} color="white"/>
        <div className="flex gap-4 items-center text-white"> {isOpen && 'الاشتراك'}  {TimerResponse.subscription_status != "غير مفعلة" ? <BiBoltCircle size={20} color="green" /> : <BiBoltCircle size={20} color="red" />}</div> 
       </div>
      
      </button>)
  
};

export default SubscriptionItem;
