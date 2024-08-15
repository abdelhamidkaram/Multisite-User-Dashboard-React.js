import { Fragment } from "react";
import MainButton from "../../components/UIElements/MainButton";
import TextButton from "../../components/UIElements/TextButton";
import useModal from "../../store/useModal";
import useThemeModal from "../../store/modals/ThemeModal";
import { $api } from "../../client";
import PromiseToast from "../../components/UIElements/Toasts/PromiseToast";

const ThemesItem = ({ themeObj }) => {
  const { toggle, changeName } = useModal();
  const { changeTheme } = useThemeModal();
  const { imgUrl, title, description, is_active } = themeObj;
  return (
    <Fragment>
      <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-center bg-white rounded-lg mt-8 p-5 shadow-md border-solid  border-gray-200 ">
        <div className="md:w-2/5 shadow-md   rounded-lg overflow-hidden ">
          <img src={imgUrl} />
        </div>
        <div className="flex flex-col Theme-item-description md:w-3/5 gap-5 ">
          <h3 className="font-bold text-blue-dark text-2xl "> {title} </h3>
          <p className="line-clamp-3 min-h-24">{description}</p>
          <div className="flex items-center gap-4 ">
            <MainButton
              is_active={is_active}
              text={!is_active ? "تنشيط" : "مفعل"}
              ClickHandler={() => {
                let callApi;
                callApi = $api.post("wp-json/store/v1/switch-theme", {
                  action: is_active ? "deactivate" : "activate",
                  theme_slug: themeObj.theme_slug,
                });
                PromiseToast(callApi);
              }}
            />

            {is_active ? (
              <MainButton
                text={"تخصيص"}
                ClickHandler={() => {
                  open(
                    `${
                      import.meta.env.VITE_API_BASE_URL
                    }/wp-admin/customize.php`,
                    "_blank"
                  );
                }}
              />
            ) : null}
            <TextButton
              text={"معاينة"}
              ClickHandler={() => {
                changeName("theme");
                toggle();
                changeTheme(themeObj);
              }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ThemesItem;
