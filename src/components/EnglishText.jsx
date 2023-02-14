import { useSelector } from "react-redux";
import { englishFont } from "../utils/fonts";
import CustomText from "./CustomText";

const EnglishText = ({ text }) => {
  const { englishTextSize, isShowEnglishText } = useSelector(
    (state) => state.nobleQuran
  );
  return (
    <>
      {isShowEnglishText && (
        <CustomText
          style={[englishFont.englishR, { fontSize: englishTextSize }]}
          className="mt-1"
        >
          {text}
        </CustomText>
      )}
    </>
  );
};

export default EnglishText;
