import { useEffect, useState } from "react";
import Palette from "../../assets/icons/palette.svg";
import Menu from "../../assets/icons/menu.svg";
import Gallery from "../../assets/icons/gallery.svg";
import Pages from "../../assets/icons/pages.svg";
import TabsHeader from "../../components/UIElements/TabsHeader";
import ThemesItem from "./ThemesItem";
import Menus from "./MenusItem";
import MediaItem from "./MediaItem";
import UploadImage from "../../components/UIElements/UploadImage";
import PageItem from "./PageItem";
import { $api, useData } from "../../client"; 
import SectionTitle from "../../components/UIElements/SectionTitle";
import useModal from "../../store/useModal";
import useMenuModal from "../../store/modals/MenuModal";
import { ShimmerCategoryItems, ShimmerDiv } from "shimmer-effects-react";

const Store = () => {
  const { toggle, changeName } = useModal();
  const { changeLocations } = useMenuModal();
  const [tabNumber, setTabNumber] = useState(1);

  const handelClick = (num) => {
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
      name: " الصفحات ",
      icon: (
        <img className="bg-blue-light size-6 p-1 rounded-full" src={Pages} />
      ),
    },
  ];

  const { data: themes, isLoading: themesLoading } = useData("wp-json/store/v1/themes");
  const { data: menusData, isLoading: menusLoading , mutate: MenusMutate } = useData("wp-json/store/v1/menus");
  const { data: pages, isLoading: pagesLoading , mutate: pagesMutate } = useData("wp-json/store/v1/pages");
  const { data: images, isLoading: imagesLoading} = useData("wp-json/store/v1/media");

  useEffect(() => {
    if (menusData) {
      changeLocations(menusData.locations);
    }
  }, [menusData, changeLocations]);

  const handleDeleteMenu = async (menuId) => {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف القائمة؟");
    if (confirmDelete) {
      try {
        const response = await $api.post(`wp-json/store/v1/delete-menu/${menuId}`);
        if (response.status !== 200) {
          throw new Error("فشل في حذف القائمة.");
        }
        alert("تم الحذف بنجاح");
        MenusMutate();
      } catch (error) {
        console.error("كانت هناك مشكلة في عملية الجلب:", error);
        alert("فشل في حذف القائمة. يرجى المحاولة مرة أخرى.");
      }
    }
  };

  const handleDeletePage = async (id) => {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف الصفحة ؟");
    if (confirmDelete) {
      try {
        const response = await $api.post(`wp-json/store/v1/pages/delete/${id}`);
        if (response.status !== 200) {
          throw new Error("فشل في حذف الصفحة.");
        }
        alert("تم الحذف بنجاح");
        pagesMutate();
      } catch (error) {
        console.error("كانت هناك مشكلة في عملية الجلب:", error);
        alert("فشل في حذف الصفحة. يرجى المحاولة مرة أخرى.");
      }
    }
  };


  return (
    <div>
      <TabsHeader tabs={tabs} handelClick={handelClick} tabNumber={tabNumber} />
       {
         
         <main className="my-10">
        <div className={tabNumber == 1 ? "block" : "hidden"}>
          { themesLoading ? <ShimmerCategoryItems mode="light" items={3} imageWidth={300} imageHeight={150} /> : themes.map((themeObj, i) => (
            <ThemesItem themeObj={themeObj} key={i} />
          ))}
        </div>

        <div className={tabNumber == 2 ? "block" : "hidden"}>
          <SectionTitle
            title={"القوائم"}
            addBTNTitle={"اضافة قائمة جديدة"}
            addBTNClickHandler={() => {
              changeName("addMenu");
              toggle();
            }}
          />
          {
            menusLoading ? [1, 2, 3].map((item, i) => <Menus menuObj={item} key={i} deleteHandler={() => {}} loading={true} />)
            : menusData.menus.map((item, i) => (
            <Menus
              menuObj={item}
              key={i}
              deleteHandler={() => handleDeleteMenu(item.id)}
              loading={false}
            />
          ))}
        </div>

        <div className={tabNumber == 3 ? "grid grid-flow-column md:grid-cols-3 xl:grid-cols-6 gap-8 bg-white mt-10 p-10" : "hidden"}>
          <div className="col-span-2 bg-red-50">
            <UploadImage />
          </div>
          {imagesLoading ? [1, 2, 3, 4].map((item, i) => <ShimmerDiv className="md:h-52 h-11" key={i} mode="light" />) :
          images.map((item, i) => <MediaItem imgObj={item} key={i} />)}
        </div>

        <div className={tabNumber == 4 ? "block" : "hidden"}>
          <SectionTitle
            title={"الصفحات"}
            addBTNTitle={"اضافة صفحة جديدة"}
            addBTNClickHandler={() => {
              changeName("addPage");
              toggle();
            }}
          />
          {pagesLoading ? [1, 2, 3].map((page, i) => <PageItem key={i} pageObj={page} deleteHandler={() => {}} loading={true} />) : pages.map((page) => (
            <PageItem
              key={page.id}
              pageObj={page}
              deleteHandler={() => handleDeletePage(page.id)}
              loading={false}
            />
          ))}
        </div>
      </main>
      }
    
      
    </div>
  );
};

export default Store;
