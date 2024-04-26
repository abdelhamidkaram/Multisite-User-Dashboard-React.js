import CustomTable from "./CustomTable";

const BrandsTable = ({changeTitle}) => {
  const Headers = [
    "رقم تعريفي ",
    "البراند" ,
    "عدد المنتجات",
  ];
  
  const data = [
    {
      id: 1,
      name: "1Beetlejuice",
      count: "50",
    },
    {
      id: 2,
      name: "pGhostbusters",
      count: "60",
  
    },
    {
      id: 3,
      name: "pGhostbusters",
      count: "60",
  
    },
    {
      id: 4,
      name: "pGhostbusters",
      count: "60",
  
    },
    {
      id: 5,
      name: "pGhostbusters",
      count: "60",
  
    },
    {
      id:6,
      name: "pGhostbusters",
      count: "60",
  
    },
  ];
 return (
      <div>
        <CustomTable  data={data} title={ changeTitle ?? "العلامات التجارية"}  CustomHeader={Headers}/>
      </div>
    );
}

export default BrandsTable
