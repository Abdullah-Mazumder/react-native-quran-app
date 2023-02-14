import { View } from "react-native";
import { useSelector } from "react-redux";
import CustomText from "../components/CustomText";
import useGoToBackHandler from "../hooks/useGoToBackHandler";
import { banglaFont, englishFont } from "../utils/fonts";

const AboutUs = ({ route }) => {
  useGoToBackHandler(route.params.fromWhichScreen);
  const { color } = useSelector((state) => state.nobleQuran);
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
            About Us
          </CustomText>
        </View>
      </View>
      <View
        style={{ flex: 1, backgroundColor: color.bgColor2 }}
        className="flex items-center justify-center"
      >
        <View>
          <View className="flex flex-row items-center justify-center gap-1">
            <CustomText
              style={[banglaFont.banglaSemi, { color: color.activeIconColor }]}
              className="text-sm"
            >
              নামঃ
            </CustomText>
            <CustomText style={[banglaFont.banglaSemi]} className="text-sm">
              আব্দুল্লাহ মজুমদার
            </CustomText>
          </View>
          <View className="flex flex-row items-center justify-center gap-1">
            <CustomText
              style={[banglaFont.banglaSemi, { color: color.activeIconColor }]}
              className="text-sm"
            >
              ঠিকানাঃ
            </CustomText>
            <CustomText style={[banglaFont.banglaSemi]} className="text-sm">
              লালমাই, কুমিল্লা
            </CustomText>
          </View>
          <View className="flex flex-row items-center justify-center gap-1">
            <CustomText
              style={[banglaFont.banglaSemi, { color: color.activeIconColor }]}
              className="text-sm"
            >
              পড়াশুনা স্নাতকঃ
            </CustomText>
            <CustomText style={[banglaFont.banglaSemi]} className="text-sm">
              কুমিল্লা ভিক্টোরিয়া সরকারি কলেজ
            </CustomText>
          </View>
          <View className="flex flex-row items-center justify-center gap-1">
            <CustomText
              style={[banglaFont.banglaSemi, { color: color.activeIconColor }]}
              className="text-sm"
            >
              বিভাগঃ
            </CustomText>
            <CustomText style={[banglaFont.banglaSemi]} className="text-sm">
              গণিত (২৫ তম ব্যাচ)
            </CustomText>
          </View>
        </View>
      </View>
    </>
  );
};

export default AboutUs;
