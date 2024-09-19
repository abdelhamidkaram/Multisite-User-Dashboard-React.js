import { BeatLoader } from "react-spinners";
import { useData } from "../../../client";
import DHLShippingSettings from "./DHLShippingSettings";
import FixedShippingSettings from "./fixedShippingSettings";

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
    {dhlPlugin && <DHLShippingSettings  />}
    </div>
  )
}
