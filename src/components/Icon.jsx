import { View } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";

const Icon = ({ focused, ...props }) => {
  const { color } = useSelector((state) => state.nobleQuran);
  return (
    <View className="">
      <FontAwesomeIcon
        {...props}
        size={20}
        color={focused ? color.activeIconColor : color.txtColor}
      />
    </View>
  );
};

export default Icon;
