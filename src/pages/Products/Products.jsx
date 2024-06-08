import { useState } from 'react';
import ProductsIcons from '../../assets/icons/broduct.svg';
import CatsIcon from '../../assets/icons/step-2.svg';
//import BrandIcon from '../../assets/icons/sale.svg';
import ProductsTable from '../../components/Tables/ProductsTable';
import CategoriesTables from '../../components/Tables/CategoriesTable';
//import BrandsTable from '../../components/Tables/BrandsTable';
import TabsHeader from '../../components/UIElements/TabsHeader';
const Products = () => {
    
    const [tabNumber, setTabNumber] = useState(1);
    const handelClick = (num)=>{
        setTabNumber(num)
    }
     
    const tabs = [
      {
       name:'المنتجات',
       icon:<img className='bg-blue-light size-6 p-1 rounded-full' src={ProductsIcons} />,
      },
      {
       name:'الفئات',
       icon:<img  className='bg-blue-light size-6 p-1 rounded-full' src={CatsIcon} />,
      },
      // {
      //  name:'العلامات التجارية',
      //  icon:<img className='bg-blue-light size-6 p-1 rounded-full' src={BrandIcon} />,
      // },
   ];


  return (
    <div>
       
       <div className='flex justify-center  mb-8'>
        
          <TabsHeader tabs={tabs} handelClick={handelClick} tabNumber={tabNumber} />
          
       </div>
       
       <div className={tabNumber == 1 ? 'block ' :'hidden' } >
        <ProductsTable showMorButton={false}  />
       </div>

       <div className={tabNumber == 2 ? 'block' :'hidden' } >
         <CategoriesTables />
       </div>
       
      {/*  <div className={tabNumber == 3 ? 'block' :'hidden' } >
        <BrandsTable/>
       </div> */}


    </div>
  )
}

export default Products
