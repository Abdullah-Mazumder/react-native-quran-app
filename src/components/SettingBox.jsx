import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slider } from "@miblanchard/react-native-slider";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_ARABIC_TEXT_SIZE,
  SET_AYAH_DETAILS,
  SET_BANLGA_TEXT_SIZE,
  SET_ENGLIS_TEXT_SIZE,
  SET_HAFEZI_FONT,
  SET_IS_SHOW_AUDIO_PLAYER,
  SET_IS_SHOW_BANGLA_TEXT,
  SET_IS_SHOW_COPY_BUTTON,
  SET_IS_SHOW_ENGLISH_TEXT,
  SET_IS_SHOW_SAVE_BUTTON,
  SET_IS_SHOW_TAFSIR,
  SET_TAJWEED,
} from "../store/constants/constant";
import { englishFont } from "../utils/fonts";
import CustomText from "./CustomText";
import { Pressable } from "@react-native-material/core";
import Checkbox from "expo-checkbox";

const SettingBox = () => {
  const dispatch = useDispatch();
  const {
    color,
    banglaTextSize,
    englishTextSize,
    arabicTextSize,
    isEnableTajweed,
    hafeziFont,
    isShowAyahDetails,
    isShowTafsir,
    isShowBanglaText,
    isShowEnglishText,
    isShowCopyButton,
    isShowSaveButton,
    isShowAudioPlayer,
  } = useSelector((state) => state.nobleQuran);
  return (
    <>
      <View className="">
        <View className="flex items-center">
          <CustomText
            className="text-center text-lg font-bold"
            style={[
              {
                borderBottomWidth: 2,
                borderBottomColor: color.txtColor,
                marginBottom: 5,
                width: 100,
              },
              englishFont.englishR,
            ]}
          >
            Font Size
          </CustomText>
        </View>
        <View className="px-3">
          <View className="flex flex-row items-center justify-between">
            <CustomText className="font-bold">Arabic Text </CustomText>
            <View className="w-[150]">
              <Slider
                minimumValue={20}
                maximumValue={50}
                step={1}
                minimumTrackTintColor={color.activeIconColor}
                maximumTrackTintColor={color.maximumTintColor}
                thumbStyle={{ backgroundColor: color.activeIconColor }}
                trackStyle={{ height: 6 }}
                value={arabicTextSize}
                onSlidingComplete={async (value) => {
                  dispatch({
                    type: SET_ARABIC_TEXT_SIZE,
                    payload: value[0],
                  });
                  await AsyncStorage.setItem(
                    "arabicTextSize",
                    JSON.stringify(value[0])
                  );
                }}
              />
            </View>
            <CustomText className="font-bold">{arabicTextSize}</CustomText>
          </View>
          <View className="flex flex-row items-center justify-between">
            <CustomText className="font-bold">Bangla Text </CustomText>
            <View className="w-[150]">
              <Slider
                minimumValue={14}
                maximumValue={30}
                step={1}
                minimumTrackTintColor={color.activeIconColor}
                maximumTrackTintColor={color.maximumTintColor}
                thumbStyle={{ backgroundColor: color.activeIconColor }}
                trackStyle={{ height: 6 }}
                value={banglaTextSize}
                onSlidingComplete={async (value) => {
                  dispatch({
                    type: SET_BANLGA_TEXT_SIZE,
                    payload: value[0],
                  });
                  await AsyncStorage.setItem(
                    "banglaTextSize",
                    JSON.stringify(value[0])
                  );
                }}
              />
            </View>
            <CustomText className="font-bold">{banglaTextSize}</CustomText>
          </View>
          <View className="flex flex-row items-center justify-between">
            <CustomText className="font-bold">English Text </CustomText>
            <View className="w-[150]">
              <Slider
                minimumValue={14}
                maximumValue={30}
                step={1}
                minimumTrackTintColor={color.activeIconColor}
                maximumTrackTintColor={color.maximumTintColor}
                thumbStyle={{ backgroundColor: color.activeIconColor }}
                trackStyle={{ height: 6 }}
                value={englishTextSize}
                onSlidingComplete={async (value) => {
                  dispatch({
                    type: SET_ENGLIS_TEXT_SIZE,
                    payload: value[0],
                  });
                  await AsyncStorage.setItem(
                    "englishTextSize",
                    JSON.stringify(value[0])
                  );
                }}
              />
            </View>
            <CustomText className="font-bold">{englishTextSize}</CustomText>
          </View>
          <View className="flex items-center my-2">
            <CustomText
              className="text-center text-lg font-bold"
              style={[
                {
                  borderBottomWidth: 2,
                  borderBottomColor: color.txtColor,
                  marginBottom: 5,
                  width: 150,
                },
                englishFont.englishR,
              ]}
            >
              Font & Tajweed
            </CustomText>
          </View>
        </View>
        <View className="">
          <Pressable
            style={{
              width: "100%",
              padding: 10,
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={async () => {
              dispatch({
                type: SET_TAJWEED,
                payload: !isEnableTajweed,
              });
              await AsyncStorage.setItem(
                "tajweed",
                JSON.stringify(!isEnableTajweed)
              );
            }}
          >
            <CustomText className="font-bold">Tajweed </CustomText>
            <Checkbox
              style={{
                borderColor: color.activeIconBorderColor,
              }}
              value={isEnableTajweed}
              color={color.activeIconColor}
            />
          </Pressable>
          <Pressable
            style={{
              width: "100%",
              padding: 10,
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={async () => {
              dispatch({
                type: SET_HAFEZI_FONT,
                payload: !hafeziFont,
              });
              await AsyncStorage.setItem(
                "hafeziFont",
                JSON.stringify(!hafeziFont)
              );
            }}
          >
            <CustomText className="font-bold">Hafezi Font </CustomText>
            <Checkbox
              style={{
                borderColor: color.activeIconBorderColor,
              }}
              value={hafeziFont}
              color={color.activeIconColor}
            />
          </Pressable>
        </View>

        <View className="flex items-center my-2">
          <CustomText
            className="text-center text-lg font-bold"
            style={[
              {
                borderBottomWidth: 2,
                borderBottomColor: color.txtColor,
                marginBottom: 5,
                width: 80,
              },
              englishFont.englishR,
            ]}
          >
            Others
          </CustomText>
        </View>

        <View className="">
          <Pressable
            style={{
              width: "100%",
              padding: 10,
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={async () => {
              await AsyncStorage.setItem(
                "isShowAudioPlayer",
                JSON.stringify(!isShowAudioPlayer)
              );
              dispatch({
                type: SET_IS_SHOW_AUDIO_PLAYER,
                payload: !isShowAudioPlayer,
              });
            }}
          >
            <CustomText className="font-bold">Audio Player </CustomText>
            <Checkbox
              style={{
                borderColor: color.activeIconBorderColor,
              }}
              value={isShowAudioPlayer}
              color={color.activeIconColor}
            />
          </Pressable>
          <Pressable
            style={{
              width: "100%",
              padding: 10,
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={async () => {
              await AsyncStorage.setItem(
                "isShowBanglaText",
                JSON.stringify(!isShowBanglaText)
              );
              dispatch({
                type: SET_IS_SHOW_BANGLA_TEXT,
                payload: !isShowBanglaText,
              });
            }}
          >
            <CustomText className="font-bold">Bangla </CustomText>
            <Checkbox
              style={{
                borderColor: color.activeIconBorderColor,
              }}
              value={isShowBanglaText}
              color={color.activeIconColor}
            />
          </Pressable>
          <Pressable
            style={{
              width: "100%",
              padding: 10,
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={async () => {
              await AsyncStorage.setItem(
                "isShowEnglishText",
                JSON.stringify(!isShowEnglishText)
              );
              dispatch({
                type: SET_IS_SHOW_ENGLISH_TEXT,
                payload: !isShowEnglishText,
              });
            }}
          >
            <CustomText className="font-bold">English </CustomText>
            <Checkbox
              style={{
                borderColor: color.activeIconBorderColor,
              }}
              value={isShowEnglishText}
              color={color.activeIconColor}
            />
          </Pressable>
          <Pressable
            style={{
              width: "100%",
              padding: 10,
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={async () => {
              await AsyncStorage.setItem(
                "isShowTafsir",
                JSON.stringify(!isShowTafsir)
              );
              dispatch({
                type: SET_IS_SHOW_TAFSIR,
                payload: !isShowTafsir,
              });
            }}
          >
            <CustomText className="font-bold">Tafsir </CustomText>
            <Checkbox
              style={{
                borderColor: color.activeIconBorderColor,
              }}
              value={isShowTafsir}
              color={color.activeIconColor}
            />
          </Pressable>
          <Pressable
            style={{
              width: "100%",
              padding: 10,
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={async () => {
              await AsyncStorage.setItem(
                "isShowAyahDetails",
                JSON.stringify(!isShowAyahDetails)
              );
              dispatch({
                type: SET_AYAH_DETAILS,
                payload: !isShowAyahDetails,
              });
            }}
          >
            <CustomText className="font-bold">Ayah Details </CustomText>
            <Checkbox
              style={{
                borderColor: color.activeIconBorderColor,
              }}
              value={isShowAyahDetails}
              color={color.activeIconColor}
            />
          </Pressable>
          <Pressable
            style={{
              width: "100%",
              padding: 10,
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={async () => {
              await AsyncStorage.setItem(
                "isShowCopyButton",
                JSON.stringify(!isShowCopyButton)
              );
              dispatch({
                type: SET_IS_SHOW_COPY_BUTTON,
                payload: !isShowCopyButton,
              });
            }}
          >
            <CustomText className="font-bold">Copy </CustomText>
            <Checkbox
              style={{
                borderColor: color.activeIconBorderColor,
              }}
              value={isShowCopyButton}
              color={color.activeIconColor}
            />
          </Pressable>
          <Pressable
            style={{
              width: "100%",
              padding: 10,
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={async () => {
              await AsyncStorage.setItem(
                "isShowSaveButton",
                JSON.stringify(!isShowSaveButton)
              );
              dispatch({
                type: SET_IS_SHOW_SAVE_BUTTON,
                payload: !isShowSaveButton,
              });
            }}
          >
            <CustomText className="font-bold">Save </CustomText>
            <Checkbox
              style={{
                borderColor: color.activeIconBorderColor,
              }}
              value={isShowSaveButton}
              color={color.activeIconColor}
            />
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default SettingBox;
