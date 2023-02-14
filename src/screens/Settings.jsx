import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import CustomText from "../components/CustomText";
import { englishFont } from "../utils/fonts";
import Ionicon from "react-native-vector-icons/Ionicons";
import SettingBox from "../components/SettingBox";
import useGoToBackHandler from "../hooks/useGoToBackHandler";
import { Pressable } from "@react-native-material/core";
import vibrate from "../utils/vibratie";

const Settings = ({ navigation }) => {
  const { color } = useSelector((state) => state.nobleQuran);
  useGoToBackHandler("Home");
  return (
    <>
      <View
        style={{ backgroundColor: color.bgColor1 }}
        className="py-2 flex justify-center items-center"
      >
        <View className="flex flex-row items-center justify-center">
          <CustomText
            style={[{ color: color.activeIconColor }, englishFont.englishR]}
            className="text-lg font-bold"
          >
            Settings
          </CustomText>
          <Ionicon
            name="settings"
            solid
            size={17}
            className="mt-1 ml-2"
            color={color.activeIconColor}
          />
        </View>
      </View>
      <View
        style={{ flex: 1, backgroundColor: color.bgColor2 }}
        className="container mx-auto p-0.5 px-1 pb-0"
      >
        <ScrollView>
          <SettingBox />
          <View className="my-5">
            <Pressable
              style={{
                paddingVertical: 15,
                paddingHorizontal: 8,
              }}
              onPress={() => {
                vibrate();
                navigation.navigate("AboutUs", {
                  fromWhichScreen: "Settings",
                });
              }}
            >
              <View className="flex flex-row items-center justify-between">
                <CustomText
                  className="text-lg font-bold"
                  style={[{ color: color.activeIconColor }]}
                >
                  About The Author
                </CustomText>
                <Ionicon
                  name="person"
                  color={color.activeIconColor}
                  size={23}
                />
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Settings;
