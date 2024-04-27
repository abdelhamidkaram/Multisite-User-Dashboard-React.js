import MainButton from "../../components/UIElements/MainButton";
import useModal from "../../store/useModal";
const ShippingSettings = () => {
  const { toggle, changeName } = useModal();
  const handleDelete = (id) => {
    console.log(id);
    //TODO: handel method for delete zone

    /* ENDPOINT : 
       wp-json/wc/v3/shipping/zones/{id}
       */
  };

  const editHandler = () => {
    changeName("shippingZone");
    toggle();
  };

  const methodEditHandler = () => {
    changeName("method");
    toggle();
  };
  const saveEditHandler = () => {
    //TODO: call api for save
  };
  const places = [
    {
      id: 1,
      name: "الكويت",
      current_method: null,
    },
    {
      id: 2,
      name: "خارج الكويت",
      current_method: 2,
    },
  ];
  const methods = [
    {
      id: 1,
      name: "شحن مجاني ",
      option: {},
    },
    {
      id: 2,
      name: "شحن بسعر ثابت ",
      option: {
        price: "10 KWd",
      },
    },
  ];
  return (
    <div>
      <div className="shadow-md rounded-md p-4 pb-8 mb-14">
        <div>
          <h2 className="text-lg font-semibold">{"مناطق الشحن"}</h2>
        </div>
        {places.map((item, i) => (
          <PlaceItem
            key={i}
            item={item}
            editHandler={editHandler}
            handleDelete={handleDelete}
            methods={methods}
          />
        ))}

        <MainButton ClickHandler={saveEditHandler} text={"حفظ التغييرات"} />
      </div>

      <div className="shadow-md rounded-md p-4 pb-8 mb-8">
        <div>
          <h2 className="text-lg font-semibold">{"اسلوب الشحن"}</h2>
        </div>
        {methods.map((item, i) => (
          <MethodItem key={i} item={item} editHandler={methodEditHandler} />
        ))}
        <MainButton ClickHandler={saveEditHandler} text={"حفظ التغييرات"} />
      </div>
    </div>
  );
};

export default ShippingSettings;

function PlaceItem({ item, editHandler, handleDelete, methods }) {
  return (
    <div className="border-2 border-slate-100 p-5 m-5 rounded-md flex justify-between items-center">
      <p className="text-lg">{item.name} </p>
      <div className="flex gap-3">
        <div>
          <select>
            {item.current_method ? null : <option> اختر اسلوب الشحن </option>}
            {methods.map((item, i) => {
              return (
                <option key={i} value={item.id}>
                  {" "}
                  {item.name}{" "}
                </option>
              );
            })}
          </select>
        </div>
        <MainButton
          danger={true}
          text={"حذف"}
          ClickHandler={() => {
            handleDelete(item.id);
          }}
        />
        <MainButton text={"تعديل"} ClickHandler={editHandler} />
      </div>
    </div>
  );
}
function MethodItem({ item, editHandler }) {
  return (
    <div className="border-2 border-slate-100 p-5 m-5 rounded-md flex justify-between items-center">
      <p className="text-lg">{item.name} </p>
      <div className="flex gap-3">
        <MainButton text={"تعديل"} ClickHandler={editHandler} />
      </div>
    </div>
  );
}
