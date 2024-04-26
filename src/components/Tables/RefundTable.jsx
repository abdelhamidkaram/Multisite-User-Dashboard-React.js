import CustomTable from "./CustomTable";

const columns = ["اسم المنتج ","السعر","الحالة","الإجراءات" ];

const data = [
  {
    id: 1,
    title: "1Beetlejuice",
    year: "50",
    status:'متاح'
  },
  {
    id: 2,
    title: "pGhostbusters",
    year: "60",
    status:'متاح'

  },
  {
    id: 3,
    title: "iGhostbusters",
    year: "82",
    status:'متاح'

  },
  {
    id: 4,
    title: "tGhostbusters",
    year: "96",
    status:'متاح'

  },
  {
    id: 5,
    title: "aGhostbusters",
    year: "1500",
    status:'غير متاح'

  },
  {
    id: 5,
    title: "zGhostbusters",
    year: "98",
    status:'متاح'

  },
];

const RefundTable = ({changeTitle }) => {
    
  return (
    <div>
      <CustomTable data={data} CustomHeader={columns} title={changeTitle ?? ''} />
    </div>
  );
};

export default RefundTable;
