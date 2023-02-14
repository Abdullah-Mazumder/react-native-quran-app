import { useSelector } from "react-redux";
import { banglaFont } from "../utils/fonts";
import CustomText from "./CustomText";

const BanglaText = ({ text }) => {
  const { banglaTextSize, isShowBanglaText } = useSelector(
    (state) => state.nobleQuran
  );
  return (
    <>
      {isShowBanglaText && (
        <CustomText
          style={[banglaFont.banglaR, { fontSize: banglaTextSize }]}
          className="mt-1"
        >
          {text}
        </CustomText>
      )}
    </>
  );
};

export default BanglaText;
