import { useEffect, useState } from "react";
import Palette from "../../assets/icons/palette.svg";
import Menu from "../../assets/icons/menu.svg";
import Gallery from "../../assets/icons/gallery.svg";
import Settings from "../../assets/icons/setting.svg";
import Pages from "../../assets/icons/pages.svg";
import TabsHeader from "../../components/UIElements/TabsHeader";
import ThemesItem from "./ThemesItem";
import Menus from "./MenusItem";
import MediaItem from "./MediaItem";
import UploadImage from "../../components/UIElements/UploadImage";
import PageItem from "./PageItem";
import { $api } from "../../client";
import SectionTitle from "../../components/UIElements/SectionTitle";
import useModal from "../../store/useModal";
import useMenuModal from "../../store/modals/MenuModal";

const Store = () => {
  const {toggle , changeName} = useModal();
  const {changeLocations} = useMenuModal();
  const [tabNumber, setTabNumber] = useState(1);
   
  const handelClick = (num) => {
    if(num == 4 ){
      open(`${localStorage.getItem('path')}/wp-admin/customize.php` , '_blank');
      return;
 }
    setTabNumber(num);

  };
  const tabs = [
    {
      name: "الثيمات",
      icon: (
        <img className="bg-blue-light size-6 p-1 rounded-full" src={Palette} />
      ),
    },
    {
      name: "القوائم",
      icon: (
        <img className="bg-blue-light size-6 p-1 rounded-full" src={Menu} />
      ),
    },
    {
      name: "الوسائط",
      icon: (
        <img className="bg-blue-light size-6 p-1 rounded-full" src={Gallery} />
      ),
    },
    {
      name: "اعدادات الواجهة",
      icon: (
        <img className="bg-blue-light size-6 p-1 rounded-full" src={Settings} />
      ),
    },
    {
      name: " الصفحات ",
      icon: (
        <img className="bg-blue-light size-6 p-1 rounded-full" src={Pages} />
      ),
    },
  ];
  const [themes, setThemes] = useState([]);
  const [menus, setMenus] = useState([]);
  const [pages, setPages] = useState([]);
  const [images, setImages] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(false);



  const fetchThemesData = async()=>{
    try {
      const response = await $api.get("wp-json/store/v1/themes");
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }
  
  const fetchMenusData = async()=>{
    try {
      const response = await $api.get("wp-json/store/v1/menus");
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }
  
  const fetchPagesData = async()=>{
    try {
      const response = await $api.get("wp-json/store/v1/pages");
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }
  const fetchImagesData = async()=>{
    try {
      const response = await $api.get("wp-json/store/v1/media");
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        //get themes data 
        const data = await fetchThemesData();
        setThemes(data);
        //get menus data 
        const menusData = await fetchMenusData();
        setMenus(menusData['menus']);
        changeLocations(menusData['locations']);
        //get pages data 
        const pagesData = await fetchPagesData();
        setPages(pagesData);
        //get all images 
        const imagesData = await fetchImagesData();
        setImages(imagesData);


      } catch (error) {
        setError("Failed to fetch data");
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);


  const handleDeleteMenu = async (menuId) => {
    const confirmDelete = window.confirm(
      "هل أنت متأكد من حذف القائمة؟"
    );
  
    if (confirmDelete) {
      try {
        const response = await $api.post(
          `wp-json/store/v1/delete-menu/${menuId}`
        );
  
        if (response.status !== 200) {
          throw new Error(
            "الاستجابة من الشبكة لم تكن على ما يرام: " + response.data.message
          );
        }
  
        alert("تم الحذف بنجاح");
        let newData = menus.filter((item) => item.id !== menuId);
        setMenus(newData);
      } catch (error) {
        console.error("كانت هناك مشكلة في عملية الجلب:", error);
        alert("فشل في حذف القائمة. يرجى المحاولة مرة أخرى.");
      }
    }
  };
    const handleDeletePage = async (id) => {
    const confirmDelete = window.confirm(
      "هل أنت متأكد من حذف الصفحة ؟"
    );
  
    if (confirmDelete) {
      try {
        const response = await $api.post(
          `wp-json/store/v1/pages/delete/${id}`
        );
  
        if (response.status !== 200) {
          throw new Error(
            "الاستجابة من الشبكة لم تكن على ما يرام: " + response.data.message
          );
        }
  
        alert("تم الحذف بنجاح");
        let newData = pages.filter((item) => item.id !== id);
        setPages(newData);
      } catch (error) {
        console.error("كانت هناك مشكلة في عملية الجلب:", error);
        alert("فشل في حذف القائمة. يرجى المحاولة مرة أخرى.");
      }
    }
  };
  

  if (Loading) {
    return "Loading ...";
  }
  if (error) {
    return "Error when get data";
  }
  
  
  return (
    <div>
      <TabsHeader tabs={tabs} handelClick={handelClick} tabNumber={tabNumber} />
      <main className="my-10  ">
        <div className={tabNumber == 1 ? "block " : "hidden"}>
          {themes.map((themeObj, i) => {
            return <ThemesItem themeObj={themeObj} key={i} />;
          })}
        </div>

        <div className={tabNumber == 2 ? "block" : "hidden"}>
        <SectionTitle title={'القوائم'} addBTNTitle={"اضافة قائمة جديدة"} addBTNClickHandler={()=>{
          changeName('addMenu');
          toggle();
        }}/>
          {menus.map((item, i) => {
            
           return <Menus menuObj={item} key={i} deleteHandler={()=>handleDeleteMenu(item.id)} />
          })}
        </div>
        <div
          className={
            tabNumber == 3
              ? " grid grid-flow-column  md:grid-cols-3 xl:grid-cols-6 gap-8  bg-white mt-10 p-10  "
              : "hidden"
          }
        >
          <div className="col-span-2 bg-red-50">
            <UploadImage />
          </div>
          {images.map((item, i) => (
            <MediaItem imgObj={item} key={i} />
          ))}
        </div>
        <div className={tabNumber == 4 ? "block" : "hidden"}>
          {" "}
          <h1> {tabNumber} </h1>
        </div>
        <div
          className={
            tabNumber == 5 ? "block" : "hidden"
          }
        >
        <SectionTitle title={'الصفحات'} addBTNTitle={"اضافة صفحة جديدة"} addBTNClickHandler={()=>{
          changeName('addPage');
          toggle();
        }}/>
          {pages.map((page) => (
            <PageItem key={page.id} pageObj={page} deleteHandler={()=>handleDeletePage(page.id)} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Store;
