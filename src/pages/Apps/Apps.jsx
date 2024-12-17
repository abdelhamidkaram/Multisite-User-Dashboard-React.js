import { $api, useData } from "../../client";
import SectionTitle from "../../components/UIElements/SectionTitle";
import AppItem from "./AppItem";
import PromiseToast from "../../components/UIElements/Toasts/PromiseToast";
import { ShimmerButton, ShimmerDiv, ShimmerTitle } from "shimmer-effects-react";
import NoteBox from "../../components/UIElements/NoteBox";
import { useEffect, useState } from "react";

const Apps = () => {
  const {
    data: apps,
    error,
    isLoading,
    mutate,
  } = useData("wp-json/store/v1/apps");
  const [IsAllowed, setIsAllowed] = useState(null);
  useEffect(() => {
    $api
      .post("wp-json/api/v1/get-my-plan")
      .then((res) => {
        setIsAllowed(res.data.subscription_id >=2);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const actionHandler = async (app) => {
    let callApi = $api.post("wp-json/store/v1/apps/action", {
      action: app.isActive ? "deactivate" : "activate",
      plugin: app.plugin_slug,
    });

    PromiseToast(
      callApi,
      "جاري إكمال العملية",
      "لم تكتمل العملية، حاول لاحقًا",
      "تم بنجاح"
    );

    try {
      await callApi;
      mutate();
    } catch (error) {
      console.log("Failed to perform action:", error);
    }
  };

  if (error) {
    return (
      <NoteBox type="info">
        <p>حدث خطأ في جلب بيانات التطبيقات أو أن اشتراكك غير صالح </p>
      </NoteBox>
    );
  }

  
  return (
    <div className="flex flex-col gap-14">
      <div className="px-5 flex justify-center items-center h-96 rounded-lg bg-blend-overlay bg-black bg-opacity-60 overflow-hidden bg-[url('https://www.tatbiqati.com/images/news/1687743315.webp')]">
        <h1 className="text-7xl font-bold text-white">متجر التطبيقات</h1>
      </div>

      <div>
        <SectionTitle title={"التطبيقات المثبتة"} />
        <div className="px-2 p-5 lg:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 bg-white rounded-md">
          {!isLoading
            ? apps.map((item, i) => (
                <AppItem
                  key={i}
                  app={{
                    danger: item.isActive,
                    title: item.name,
                    des: item.description,
                    image: item.image,
                    pluginSlug: item.plugin_slug,
                  }}
                  isAllowed = {IsAllowed}
                  actionHandler={() => actionHandler(item)}
                />
              ))
            : [1, 2, 3].map((i) => (
                <div key={i}>
                  <ShimmerDiv className="h-56 mb-4" key={i} mode="light" />
                  <ShimmerTitle line={1} key={i} mode="light" />
                  <ShimmerButton mode="light" size="sm" />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Apps;
