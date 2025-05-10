import { LoadScriptNext } from "@react-google-maps/api";
import { GOOGLE_API_KEY, GOOGLE_MAP_LIBRARIES } from "../../constant/common";
import "./GoogleMapsLoader.css";
import Spinner from "../../component/common/Spinner";

const GoogleMapsLoader = ({ children }) => {
  return (
    <>
      <LoadScriptNext
        googleMapsApiKey={GOOGLE_API_KEY}
        libraries={GOOGLE_MAP_LIBRARIES}
        loadingElement={<Spinner />}
      >
        {children}
      </LoadScriptNext>
    </>
  );
};

export default GoogleMapsLoader;
