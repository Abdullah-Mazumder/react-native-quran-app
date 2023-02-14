import { Text } from "react-native";
import { useSelector } from "react-redux";

const CustomText = ({ children, style, ...props }) => {
  const { color } = useSelector((state) => state.nobleQuran);
  let s;
  if (style) {
    s = [
      {
        color: color.txtColor,
      },
      ...style,
    ];
  } else {
    s = [
      {
        color: color.txtColor,
      },
    ];
  }
  return (
    <>
      <Text style={s} {...props}>
        {children}
      </Text>
    </>
  );
};

export default CustomText;
