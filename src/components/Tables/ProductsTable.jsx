import CustomTable from "./CustomTable";
const Headers = [ 'رقم المنتج',"اسم المنتج ","السعر", "الحالة"];

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
  
];

const ProductsTable = ({changeTitle , showMorButton }) => {

  return (
    <div>
      <CustomTable
        data={data}
        title={changeTitle ?? " المنتجات "}
        CustomHeader={Headers}
        to={showMorButton ? '/products' : null }
      />
    </div>
  );


};

export default ProductsTable;
