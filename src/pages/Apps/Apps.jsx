import { useEffect, useState } from "react";
import { $api } from "../../client";
import SectionTitle from "../../components/UIElements/SectionTitle";
import AppItem from "./AppItem";
import PromiseToast from "../../components/UIElements/Toasts/PromiseToast";

const Apps = () => {
  const [Apps, setApps] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await $api.get("wp-json/store/v1/apps");
      return response.data;
    } catch (error) {
      console.error("Error fetching Apps:", error);
      throw error;
    }
  };
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchData();
        setApps(data);
      } catch (error) {
        setError("Failed to fetch data");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);



  const actionHandler = async (app)=>{
    let callApi =  $api.post('wp-json/store/v1/apps/action' ,{
      'action' : app.isActive ? 'deactivate' : 'activate',
      'plugin':app.plugin_slug 
    } );

    PromiseToast(callApi , "جاري اكمال العملية" , "لم تكمل العملية حاول لاحقا " , "تم بنجاح") ; 
    try {
      const data = await fetchData();
      setApps(data);
    } catch (error) {
      setError("Failed to fetch data");
      console.log(error);
    }

  }


  if (Loading) {
    return <p>Loading ... </p>
  }
  if (error) {
    return <p>{'Error when get data '}</p>
  }


  return (
    <div className="flex flex-col gap-14">
      <div className=" flex justify-center items-center  h-96 rounded-lg bg-blend-overlay bg-black bg-opacity-60  overflow-hidden bg-[url('https://www.tatbiqati.com/images/news/1687743315.webp')]">
        <h1 className="text-7xl font-bold text-white"> متجر التطبيقات </h1>
      </div>

      <div>
        <SectionTitle title={"التطبيقات المثبتة"} />
        <div className="px-2 p-5 lg:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6  bg-white rounded-md ">
         {
          
            Apps.map((item , i )=><AppItem
            key={i}
            app={{
              danger: item.isActive,
              title: item.name,
              des: item.description,
              image:item.image,
              pluginSlug:item.plugin_slug  
            }}
            actionHandler={()=>actionHandler(item)}
          />)
          
         }

        </div>
      </div>
    </div>
  );
};

export default Apps;
