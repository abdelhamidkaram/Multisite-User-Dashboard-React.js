import { BeatLoader } from "react-spinners";
import { useData } from "../../../client";
import DHLShippingSettings from "./DHLShippingSettings";
import FixedShippingSettings from "./fixedShippingSettings";
import MainButton from "../../../components/UIElements/MainButton";
import NoteBox from "../../../components/UIElements/NoteBox";

export default function ShippingSettings() {

  const { data: apps, isLoading } = useData("wp-json/store/v1/apps");

  const dhlPlugin = apps?.find(
    (app) =>
      app.plugin_slug === "elex-woo-dhl-express-shipping/elex-woo-dhl-express-shipping.php" &&
      app.isActive
  );


  return (
    <div>
     
    <FixedShippingSettings />
    {isLoading && <BeatLoader color="#448ace" loading={isLoading} />}
    {dhlPlugin ? null : <NoteBox type="error">
      <h3 className="text-lg font-bold">لا يوجد شركات شحن</h3>
       <p> اذهب الى متجر التطبيقات لتفعيل شركة الشحن الخاص بك  </p>
       <MainButton text={' متجر التطبيقات '} to={'/app/apps'}/>
      </NoteBox>}
    {dhlPlugin && <DHLShippingSettings  />}
    </div>
  )
}
