import { View, ImageBackground, ToastAndroid } from "react-native";
import { Pressable } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { arabicFont, banglaFont, englishFont } from "../utils/fonts";
import CustomText from "./CustomText";
import { useDispatch, useSelector } from "react-redux";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import vibrate from "../utils/vibratie";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SET_FAVOURITE_SURAH_LIST } from "../store/constants/constant";

const ShortSurah = ({ surah }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { color, readLater, favouriteSurahList } = useSelector(
    (state) => state.nobleQuran
  );
  const {
    id,
    arabicName,
    englishName,
    banglaName,
    enTranslatedName,
    enLocation,
    arLocation,
    totalAyah,
  } = surah;

  const singleSurah = () => {
    navigation.navigate("SingleSurah", {
      surahNumber: id,
      fromWhichScreen: "Home",
    });
  };

  const showToast = (title) => {
    ToastAndroid.showWithGravityAndOffset(
      title,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const setFavouriteSurah = async (surahNumber) => {
    vibrate();

    if (!(await AsyncStorage.getItem("favouriteSurahList"))) {
      await AsyncStorage.setItem("favouriteSurahList", JSON.stringify({}));
    }
    let localFavouriteSurahList = JSON.parse(
      await AsyncStorage.getItem("favouriteSurahList")
    );
    if (localFavouriteSurahList[surahNumber]) {
      delete localFavouriteSurahList[surahNumber];
      showToast("Removed From Favourite List");
    } else {
      localFavouriteSurahList = {
        ...localFavouriteSurahList,
        [surahNumber]: true,
      };

      showToast("Added To Favourite List");
    }

    await AsyncStorage.setItem(
      "favouriteSurahList",
      JSON.stringify(localFavouriteSurahList)
    );

    dispatch({
      type: SET_FAVOURITE_SURAH_LIST,
      payload: localFavouriteSurahList,
    });
  };

  return (
    <Pressable
      style={{
        backgroundColor: color.bgColor1,
        overflow: "hidden",
        padding: 10,
        paddingRight: 15,
        borderRadius: 3,
        marginBottom: 2,
      }}
      onPress={() => {
        vibrate();
        singleSurah();
      }}
    >
      <View className="flex flex-row items-center justify-between w-[100%] mx-auto">
        <View className="w-12 h-12">
          <ImageBackground
            source={require("../../assets/image/surahLogo.png")}
            className="w-full h-full flex flex-row items-center justify-center"
          >
            <CustomText>{id}</CustomText>
          </ImageBackground>
        </View>
        <View className="w-[60%] mr-auto ml-5">
          <View className="flex flex-row items-center gap-2">
            <CustomText
              className="text-xl text-left"
              style={arabicFont.arabicHafezi}
            >
              {arabicName}
            </CustomText>
            <CustomText
              style={[banglaFont.banglaR]}
              className="text-sm font-semibold"
            >
              {banglaName}
            </CustomText>
          </View>
          <View className="flex flex-row items-end gap-0">
            <CustomText
              style={[englishFont.englishR, { fontSize: 15 }]}
              className=""
            >
              {enTranslatedName} -
            </CustomText>
            <CustomText style={[englishFont.englishR]} className="text-sm">
              {englishName.length > 17
                ? englishName.substr(0, 16) + "..."
                : englishName}
            </CustomText>
          </View>
          <View className="flex flex-row items-center gap-2">
            <CustomText
              style={[
                {
                  fontSize: 18,
                },
                arabicFont.arabicHafezi,
              ]}
            >
              {arLocation}
            </CustomText>
            <CustomText style={[englishFont.englishR]} className="text-[14px]">
              ({enLocation})
            </CustomText>
            <CustomText style={[englishFont.englishR]}>
              Ayah: {totalAyah}
            </CustomText>
          </View>
        </View>
        {readLater[id] && (
          <View className="mr-auto">
            <FontAwesomeIcon
              name="history"
              size={15}
              style={{
                color: color.activeIconColor,
              }}
            />
          </View>
        )}
        <View
          style={{ width: 30, height: 30, overflow: "hidden" }}
          className="rounded-full ml-2"
        >
          <Pressable onPress={() => setFavouriteSurah(id)}>
            <View className="flex items-center justify-center h-full w-full">
              <FontAwesomeIcon
                name="heart"
                solid={favouriteSurahList[id] ? true : false}
                size={15}
                style={{
                  color: color.activeIconColor,
                }}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default ShortSurah;
