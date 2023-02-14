import { View, Text } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

const SavedAyahbutton = ({ surahNumber, ayahNumber }) => {
  const { color, readLater } = useSelector((state) => state.nobleQuran);
  return (
    <>
      {readLater[surahNumber] && readLater[surahNumber] === ayahNumber && (
        <View>
          <View className="flex items-center justify-center mx-0.5">
            <View
              style={{
                borderWidth: 0.5,
                borderColor: color.activeIconColor,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 10,
                backgroundColor: color.warnBg,
                marginTop: 5,
              }}
              className="flex flex-row items-center justify-center"
            >
              <Ionicon
                name="checkmark-circle"
                size={12}
                color={color.activeIconColor}
                className="mr-0.5"
              />
              <Text
                style={{
                  fontSize: 11,
                  color: color.activeIconColor,
                  fontWeight: "bold",
                  marginBottom: 0.5,
                }}
              >
                Last Read - সর্বশেষ পঠিত
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default SavedAyahbutton;
