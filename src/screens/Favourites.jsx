import { ImageBackground, Text, ToastAndroid, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomText from "../components/CustomText";
import { arabicFont, banglaFont, englishFont } from "../utils/fonts";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import { FlashList } from "@shopify/flash-list";
import { SET_FAVOURITE_SURAH_LIST } from "../store/constants/constant";
import { Pressable } from "@react-native-material/core";
import vibrate from "../utils/vibratie";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useGoToBackHandler from "../hooks/useGoToBackHandler";

const Favourites = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    color,
    favouriteSurahList,
    fullShortSurahList,
    readLater,
    listUniqueKey,
    uniqueKey,
  } = useSelector((state) => state.nobleQuran);
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
            Favourite Surah List
          </CustomText>
          <FontAwesomeIcon
            name="heart"
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
        key={listUniqueKey + uniqueKey}
      >
        {Object.keys(favouriteSurahList).length > 0 ? (
          <FlashList
            data={fullShortSurahList}
            renderItem={({ item }) => {
              const {
                id,
                arabicName,
                englishName,
                banglaName,
                enTranslatedName,
                enLocation,
                arLocation,
                totalAyah,
              } = item;

              const singleSurah = () => {
                navigation.navigate("SingleSurah", {
                  surahNumber: id,
                  fromWhichScreen: "Favourites",
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
                  await AsyncStorage.setItem(
                    "favouriteSurahList",
                    JSON.stringify({})
                  );
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
                <>
                  {favouriteSurahList[id] && (
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
                            <CustomText
                              style={[englishFont.englishR]}
                              className="text-sm"
                            >
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
                            <CustomText
                              style={[englishFont.englishR]}
                              className="text-[14px]"
                            >
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
                  )}
                </>
              );
            }}
            estimatedItemSize={97}
          />
        ) : (
          <View
            className="flex flex-row items-center justify-center"
            style={{
              flex: 1,
            }}
          >
            <Text
              className="text-lg font-semibold text-center"
              style={{ color: color.txtColor }}
            >
              Your Favourite List is Empty
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default Favourites;
