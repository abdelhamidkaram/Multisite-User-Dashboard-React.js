import CustomTable from "./CustomTable";

const OrdersTable = ({ changeTitle, showMorButton}) => {
  const Headers = ["رقم الطلب", "العميل", "الحالة", "الإجمالي"];

  const data = [
    {
      id: 1,
      clint: "1Beetlejuice",
      total: "50",
      status: "متاح",
    },
    {
      id: 2,
      clint: "pGhostbusters",
      total: "60",
      status: "متاح",
    },
    {
      id: 3,
      clint: "pGhostbusters",
      total: "60",
      status: "متاح",
    },
    {
      id: 4,
      clint: "pGhostbusters",
      total: "60",
      status: "متاح",
    },
    {
      id: 5,
      clint: "pGhostbusters",
      total: "60",
      status: "غير متاح",
    },
    {
      id: 5,
      clint: "pGhostbusters",
      total: "60",
      status: "متاح",
    },
  ];

  return (
    <div>
      <CustomTable
        data={data}
        title={changeTitle ?? "العلامات التجارية"}
        CustomHeader={Headers}
        to={showMorButton ? '/orders' : null }
      />
    </div>
  );
};

export default OrdersTable;
