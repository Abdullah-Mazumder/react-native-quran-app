import { StatusBar } from "react-native";
import { useSelector } from "react-redux";

const CustomStatusBar = () => {
  const { color } = useSelector((state) => state.nobleQuran);
  return (
    <>
      <StatusBar backgroundColor={color.bgColor1} hidden={false} />
    </>
  );
};

export default CustomStatusBar;
