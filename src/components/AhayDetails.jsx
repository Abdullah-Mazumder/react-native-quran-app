import { useSelector } from "react-redux";
import CustomButton from "./CustomButton";
import convertToBanglaNumber from "engnumber-to-banglanumber";

const AhayDetails = ({ page, juz, ruku, manzil }) => {
  const { isShowAyahDetails } = useSelector((state) => state.nobleQuran);
  return (
    <>
      {isShowAyahDetails && (
        <>
          <CustomButton
            title={`পৃষ্ঠা-${convertToBanglaNumber(page.toString())}`}
          />
          <CustomButton
            title={`পারা-${convertToBanglaNumber(juz.toString())}`}
          />
          <CustomButton
            title={`রুকু-${convertToBanglaNumber(ruku.toString())}`}
          />
          <CustomButton
            title={`মঞ্জিল-${convertToBanglaNumber(manzil.toString())}`}
          />
        </>
      )}
    </>
  );
};

export default AhayDetails;
