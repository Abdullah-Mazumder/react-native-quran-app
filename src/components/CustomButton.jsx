import { Text, View } from "react-native";
import { useSelector } from "react-redux";

const CustomButton = ({ title, uniqueColor }) => {
  const { color } = useSelector((state) => state.nobleQuran);
  return (
    <>
      <View className="mx-0.5">
        <Text
          style={{
            fontSize: uniqueColor ? 10 : 11,
            color: uniqueColor ? color.activeIconColor : color.txtColor,
            borderWidth: uniqueColor ? 0.7 : 0.3,
            borderColor: uniqueColor ? color.activeIconColor : color.txtColor,
            paddingHorizontal: 7,
            paddingVertical: 1,
            paddingBottom: 1,
            borderRadius: 10,
            fontWeight: uniqueColor ? "bold" : "",
          }}
        >
          {title}
        </Text>
      </View>
    </>
  );
};

export default CustomButton;
