import { useEffect, useState } from "react";
import { $api, useData } from "../../../../client";
import MainButton from "../../MainButton";
import NoteBox from "../../NoteBox";
import { CgClose } from "react-icons/cg";
import PromiseToast from "../../Toasts/PromiseToast";
import useModal from "../../../../store/useModal";

const SubscriptionModal = () => {
  const [TimerResponse, setTimerResponse] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openChosePlan, setOpenChoosePlan] = useState(false);
  const [changePlanMSG, setChangePlanMSG] = useState(null);
  const { toggle } = useModal();
  const { data: plans } = useData(
    import.meta.env.VITE_Main_Site_URL + "/wp-json/wp/v2/plans/all"
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await $api.get("/wp-json/subscription/v1/time_diff");
      setTimerResponse(response.data);
    };
    fetchData();
  }, []);

  const changePlan = async (plane_id) => {
    const response = await $api.post(
      "/wp-json/subscription/v1/change_subscription",
      {
        subscription_id: plane_id,
      }
    );
    setChangePlanMSG(response.data.message);
    const response2 = await $api.get("/wp-json/subscription/v1/time_diff");
    setTimerResponse(response2.data);
  };
  return TimerResponse != null ? (
    <div className="flex flex-col  gap-4 justify-center m-4 border border-white p-4 md:w-[800px] w-full ">
      <p>
        <strong>{"الباقة الحالية  : "}</strong> {TimerResponse.package}{" "}
        <span className="bg-blue-300 rounded-lg px-1 font-light text-blue-dark text-[10px]">
          {TimerResponse.subscription_status}
        </span>
      </p>
      <div className="text-sm text-blue-dark">
        {TimerResponse.time_diff.days != 0 ? (
          <div>
            {TimerResponse.subscription_status != "غير مفعلة" ? (
              <NoteBox>
                باقي {TimerResponse.time_diff.days} يوم على انتهاء اشتراكك
              </NoteBox>
            ) : (
              <NoteBox type={"error"}>
                {" "}
                الباقة غير مفعلة اضغط زر التجديد للدفع والتفعيل{" "}
              </NoteBox>
            )}
          </div>
        ) : (
          <NoteBox type={"error"}> انتهاء اشتراكك يمكنك تجديد الباقة</NoteBox>
        )}
      </div>

      <div className="flex gap-2 items-center justify-center flex-wrap ">
        <MainButton
          text="تجديد الباقة"
          ClickHandler={() => {
            const response = $api.post("/wp-json/plans/v1/payment");
            toggle();
            PromiseToast(
              response,
              "جاري التحميل",
              "لم تتم العملية، حاول لاحقًا",
              "تم انشاء الفاتورة بنجاح ",
              (data) => {
                if (data.data.payment_url != null) {
                  window.location.href = data.data.payment_url;
                }
              }
            );
          }}
        />
        {!openChosePlan ? (
          <MainButton
            text="ترقية الباقة"
            ClickHandler={() => setOpenChoosePlan(true)}
          />
        ) : (
          <CgClose
            size={30}
            onClick={() => setOpenChoosePlan(false)}
            className="cursor-pointer"
          />
        )}
      </div>

      {openChosePlan && (
        <div>
          {changePlanMSG ? (
            <NoteBox type={"success"}>
              {selectedPlan != 1 ? (
                <div className="flex-col gap-2 items-center justify-center flex-wrap ">
                  <p className="text-xl  mb-4 " >{changePlanMSG}</p>
                  <MainButton
                    text=" الدفع وتفعيل الاشتراك "
                    ClickHandler={() => {
                      const response = $api.post("/wp-json/plans/v1/payment");
                      toggle();
                      PromiseToast(
                        response,
                        "جاري التحميل",
                        "لم تتم العملية، حاول لاحقًا",
                        "تم انشاء الفاتورة بنجاح ",
                        (data) => {
                          if (data.data.payment_url != null) {
                            window.location.href = data.data.payment_url;
                          }
                        }
                      );
                    }}
                  />
                </div>
              ) : (
                <div>{"تم الاشتراك بالباقة المجانية"}</div>
              )}
            </NoteBox>
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center flex-wrap ">
              <div className="flex gap-2 items-center justify-center flex-wrap ">
                {plans &&
                  plans.map((plan) => (
                    <div
                      className="flex flex-col gap-4 items-center justify-center flex-wrap shadow-md rounded-md p-2 border border-light-gray"
                      key={plan.plane_id}
                    >
                      <p className="text-blue-dark font-bold">
                        {plan.plan_name}
                      </p>
                      <div className=" p-4 h-52 overflow-y-scroll overflow-x-hidden">
                        {plan.plan_features.map((feature) => (
                          <p
                            className="overflow-ellipsis text-sm"
                            key={feature}
                          >
                            <span className="text-green-500"> ✓ </span>
                            {feature}
                          </p>
                        ))}
                      </div>
                      {plan.plane_id != TimerResponse.package ? (
                        <MainButton
                          key={plan.plane_id}
                          text={" ترقية - " + plan.plan_price + " دينار"}
                          ClickHandler={() => {
                            setSelectedPlan(plan.plane_id);
                            changePlan(plan.plane_id);
                          }}
                        />
                      ) : plan.plane_id == 1 ? (
                        <MainButton
                          key={plan.plane_id}
                          text={" تجديد - " + plan.plan_price + " دينار"}
                          ClickHandler={() => {
                            setSelectedPlan(plan.plane_id);
                            changePlan(plan.plane_id);
                          }}
                        />
                      ) : (
                        <MainButton
                          key={plan.plane_id}
                          text={" مجانا "}
                          ClickHandler={() => {}}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  ) : null;
};

export default SubscriptionModal;
