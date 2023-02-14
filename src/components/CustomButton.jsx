import { Text, View } from "react-native";
import { useSelector } from "react-redux";

const CustomButton = ({ title }) => {
  const { color } = useSelector((state) => state.nobleQuran);
  return (
    <>
      <View className="mx-0.5">
        <Text
          style={{
            fontSize: 11,
            color: color.txtColor,
            borderWidth: 0.3,
            borderColor: color.txtColor,
            paddingHorizontal: 7,
            paddingVertical: 1,
            paddingBottom: 2,
            borderRadius: 10,
          }}
        >
          {title}
        </Text>
      </View>
    </>
  );
};

export default CustomButton;
