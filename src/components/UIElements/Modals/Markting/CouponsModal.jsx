import DeleteIcon from "../../../../assets/icons/delete.svg";
import { $api } from "../../../../client";
import PromiseToast from "../../Toasts/PromiseToast";
import MainButton from "../../MainButton";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "../../Form/TextField";
import useModal from "../../../../store/useModal";
import {
  ShimmerDiv,
  ShimmerTitle,
} from "shimmer-effects-react";

const CouponsModal = () => {
  const [Coupons, setCoupons] = useState([]);
  const [Loading, setLoading] = useState(true);
  const { toggle } = useModal();

  function callCouponsData() {
    const coupons = $api.get("wp-json/markting/v1/coupons");
    coupons.then((value) => {
      console.log(value.data);
      setCoupons(value.data);
      setLoading(false);
    });
  }

  useEffect(() => {
    try {
      callCouponsData();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const sendData = $api.post("wp-json/markting/v1/coupons/create", {
      code: data.code,
      discount_type: "percent",
      amount: data.amount,
      individual_use: true,
      free_shipping: false,
      expiry_date: data.expiry_date,
      usage_limit: data.usage_limit,
      usage_limit_per_user: data.usage_limit_per_user,
    });
    PromiseToast(sendData, "جاري  اضافة الكوبون ");
    formShowHandler();
    toggle();
  };

  const [FormShow, setFormShow] = useState(false);
  const formShowHandler = () => {
    setFormShow(!FormShow);
    console.log(FormShow);
  };

  return (
    <div>
      <MainButton
        text={FormShow ? "عرض الكل" : "اضافة كوبون"}
        ClickHandler={formShowHandler}
      />
      <div className=" max-h-[500px] mt-4 p-2">
        {!FormShow ? (
          Coupons.length <1 ?
          [1 , 2 , 3 ].map((item) => (
            <CouponItem
              key={item.ID}
              code={item.code}
              expireDate={item.expiry_date ? item.expiry_date : "حتي النفاذ"}
              id={item.ID}
              amount={item.amount}
              refreshData={toggle}
              usageCount={item.usage_count}
              usageLimit={item.usage_limit}
              Loading={!Loading}
            />
          ))
          :
          Coupons.map((item) => (
            <CouponItem
              key={item.ID}
              code={item.code}
              expireDate={item.expiry_date ? item.expiry_date : "حتي النفاذ"}
              id={item.ID}
              amount={item.amount}
              refreshData={toggle}
              usageCount={item.usage_count}
              usageLimit={item.usage_limit}
              Loading={!Loading}
            />
          ))
        ) : (
          <div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label={" الكود"}
                  register={{
                    ...register("code", { required: "This is required." }),
                  }}
                  error={errors.code?.message ?? ""}
                />

                <TextField
                  type={"number"}
                  label={"نسبة الخصم % "}
                  register={{
                    ...register("amount", { required: "This is required." }),
                  }}
                  error={errors.amount?.message ?? ""}
                />
                <TextField
                  type={"datetime-local"}
                  label={"تاريخ الانتهاء"}
                  register={{
                    ...register("expiry_date", {
                      required: "This is required.",
                    }),
                  }}
                  error={errors.expiry_date?.message ?? ""}
                />

                <TextField
                  type={"number"}
                  label={"عدد مرات الاستخدام"}
                  register={{
                    ...register("usage_limit", {
                      required: "This is required.",
                    }),
                  }}
                  error={errors.usage_limit?.message ?? ""}
                />

                <TextField
                  type={"number"}
                  label={" مرات الاستخدام لكل عميل"}
                  register={{
                    ...register("usage_limit_per_user", {
                      required: "This is required.",
                    }),
                  }}
                  error={errors.usage_limit_per_user?.message ?? ""}
                />

                <MainButton text={"اضافة"} />
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponsModal;

function CouponItem({
  id,
  amount,
  code,
  expireDate,
  usageLimit,
  usageCount,
  refreshData,
  Loading,
}) {
  function deleteHandler() {
    const deleteFun = $api.post("wp-json/markting/v1/coupons/delete/" + id);
    PromiseToast(deleteFun, "جاري حذف العنصر", null, "تم الحذف بنجاح");
  }
  return (
    <div
      className=" w-64 md:w-[500px]
    mb-2
    shadow-sm min-h-12  border-2 border-gray-300 rounded-md p-1"
    >
      <div>
        <b>الكود</b>
        {Loading ? (
          <p>{code}</p>
        ) : (
          <ShimmerTitle line={1} mode="light" width={16} />
        )}
      </div>
      <div>
        <b>نسبة الخصم</b>
        {Loading ? (
          <p>{amount}</p>
        ) : (
          <ShimmerTitle line={1} mode="light" width={10} />
        )}
      </div>
      <div>
        <b>الاستخدام</b>
        {Loading ? (
          <p>
            {usageCount}/{usageLimit}
          </p>
        ) : (
          <ShimmerTitle line={1} mode="light" width={10} />
        )}
      </div>
      <div>
        <b>الانتهاء</b>
        {Loading ? (
          <p>{expireDate}</p>
        ) : (
          <ShimmerTitle line={1} mode="light" width={10} />
        )}
      </div>
      <div className=" mt-3 py-3 border-t-2 border-gray-200  ">
        <div
          onClick={
            !Loading
              ? null
              : () => {
                  deleteHandler();
                  refreshData();
                }
          }
          className=" p-1 rounded-full  w-8 h-8 cursor-pointer "
        >
          {Loading ? (
            <img src={DeleteIcon} alt="حذف" />
          ) : (
            <ShimmerDiv rounded={1} height={30} width={30} mode="light" />
          )}
        </div>
        {/**
    
         <div className="bg-blue-light p-1 rounded-full w-8 h-8 cursor-pointer">
          <img src={EditIcon} alt="تعديل" />
        </div>

    */}
      </div>
    </div>
  );
}
