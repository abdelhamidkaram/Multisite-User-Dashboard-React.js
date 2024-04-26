import { useState } from "react";
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

const Store = () => {
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

  const themes = [
    {
      imgUrl: "https://storeno.b-cdn.net/themes/argan.jpg",
      isActive: true,
      title: "أرغان - قالب التجارة الإلكترونية سريع الاستجابة متعدد الأغراض",
      description:
        "description description description description description description description description description ",
    },
    {
      imgUrl: "https://storeno.b-cdn.net/themes/argan.jpg",
      isActive: false,
      title: "أرغان - قالب التجارة الإلكترونية سريع الاستجابة متعدد الأغراض",
      description:
        "description description description description description description description description description ",
    },
    {
      imgUrl: "https://storeno.b-cdn.net/themes/argan.jpg",
      isActive: false,
      title: "أرغان - قالب التجارة الإلكترونية سريع الاستجابة متعدد الأغراض",
      description:
        "description description description description description description description description description ",
    },
  ];

  const menus = [
    {
      name: "القائمة العلوية",
      items: [
        { name: "الرئيسية", url: "/" },
        { name: "من نحن", url: "/about" },
        { name: "اتصل بنا", url: "/contact" },
      ],
    },
    {
      name: "القائمة في الأسفل",
      items: [
        { name: "الرئيسية", url: "/" },
        { name: "من نحن", url: "/about" },
        { name: "اتصل بنا", url: "/contact" },
      ],
    },
  ];
  const images = [
    {
      url: "https://mediaphic.com/wp-content/uploads/2021/02/%D9%86%D9%85%D9%88%D8%B0%D8%AC-%D8%B5%D9%88%D8%B1%D8%A9-%D9%85%D9%86%D8%AA%D8%AC-2.jpg",
    },
    {
      url: "https://png.pngtree.com/png-vector/20210602/ourlarge/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323.jpg",
    },
    {
      url: "https://mediaphic.com/wp-content/uploads/2021/02/%D9%86%D9%85%D9%88%D8%B0%D8%AC-%D8%B5%D9%88%D8%B1%D8%A9-%D9%85%D9%86%D8%AA%D8%AC-2.jpg",
    },
    {
      url: "https://png.pngtree.com/png-vector/20210602/ourlarge/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323.jpg",
    },
    {
      url: "https://mediaphic.com/wp-content/uploads/2021/02/%D9%86%D9%85%D9%88%D8%B0%D8%AC-%D8%B5%D9%88%D8%B1%D8%A9-%D9%85%D9%86%D8%AA%D8%AC-2.jpg",
    },
    {
      url: "https://png.pngtree.com/png-vector/20210602/ourlarge/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323.jpg",
    },
    {
      url: "https://mediaphic.com/wp-content/uploads/2021/02/%D9%86%D9%85%D9%88%D8%B0%D8%AC-%D8%B5%D9%88%D8%B1%D8%A9-%D9%85%D9%86%D8%AA%D8%AC-2.jpg",
    },
    {
      url: "https://png.pngtree.com/png-vector/20210602/ourlarge/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323.jpg",
    },
    {
      url: "https://mediaphic.com/wp-content/uploads/2021/02/%D9%86%D9%85%D9%88%D8%B0%D8%AC-%D8%B5%D9%88%D8%B1%D8%A9-%D9%85%D9%86%D8%AA%D8%AC-2.jpg",
    },
    {
      url: "https://png.pngtree.com/png-vector/20210602/ourlarge/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323.jpg",
    },
  ];

  const pages = [{
    id:1,
    name:'الرئيسية',
    url:'/'
  },{
    id:2,
    name:'المتجر',
    url:'/store'
  },{
    id:3,
    name:'اتصل بنا',
    url:'/contact'
  },{
    id:4,
    name:'من نحن ',
    url:'/about'
  },]

  return (
    <div >
      <TabsHeader tabs={tabs} handelClick={handelClick} tabNumber={tabNumber} />
      <main className="my-10  ">
      <div className={tabNumber == 1 ? "block " : "hidden"}>
      {themes.map((themeObj, i) => {
        return <ThemesItem themeObj={themeObj} key={i} />;
      })}
    </div>

    <div className={tabNumber == 2 ? "block" : "hidden"}>
      {menus.map((item, i) => (
        <Menus menuObj={item} key={i} />
      ))}
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
    <div className={tabNumber == 5 ? "flex  items-center gap-8 flex-wrap" : "hidden"}>
      {pages.map(page=><PageItem key={page.id} pageObj={page}/> )}
    </div>
      </main>
    </div>
  );
};

export default Store;
