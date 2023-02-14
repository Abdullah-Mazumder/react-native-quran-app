import { View, Image } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomStatusBar from "../components/CustomStatusBar";
import { useDispatch, useSelector } from "react-redux";
import { getShortSurahList } from "../store/actions/shortSurahListAction";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SAVE_TO_READ_LATER,
  SET_ARABIC_TEXT_SIZE,
  SET_AYAH_DETAILS,
  SET_BANLGA_TEXT_SIZE,
  SET_DARK_MODE,
  SET_ENGLIS_TEXT_SIZE,
  SET_FAVOURITE_SURAH_LIST,
  SET_HAFEZI_FONT,
  SET_IS_SHOW_AUDIO_PLAYER,
  SET_IS_SHOW_BANGLA_TEXT,
  SET_IS_SHOW_COPY_BUTTON,
  SET_IS_SHOW_ENGLISH_TEXT,
  SET_IS_SHOW_SAVE_BUTTON,
  SET_IS_SHOW_TAFSIR,
  SET_LAST_READ_AYAH,
  SET_LAST_READ_SURAH,
  SET_TAJWEED,
} from "../store/constants/constant";
import { getFullShortSurahList } from "../store/actions/fullShortSurahListAction";

const Splash = () => {
  const dispatch = useDispatch();
  const { color } = useSelector((state) => state.nobleQuran);
  const navigation = useNavigation();
  const { loading } = useSelector((state) => state.shortSurahList);
  const [fontsLoaded] = useFonts({
    arabich: require("../../assets/fonts/arabich.ttf"),
    arabicn: require("../../assets/fonts/arabicn.ttf"),
    banglas: require("../../assets/fonts/banglas.ttf"),
    banglas: require("../../assets/fonts/banglas.ttf"),
    banglar: require("../../assets/fonts/banglar.ttf"),
    englishr: require("../../assets/fonts/englishr.ttf"),
  });

  useEffect(() => {
    const fn = async () => {
      try {
        let theme = await AsyncStorage.getItem("quranApptheme");
        theme = JSON.parse(theme);
        if (theme !== null) {
          dispatch({ type: SET_DARK_MODE, payload: theme });
        }
        let arabicTextSize = JSON.parse(
          await AsyncStorage.getItem("arabicTextSize")
        );
        if (arabicTextSize) {
          dispatch({ type: SET_ARABIC_TEXT_SIZE, payload: arabicTextSize });
        }
        let banglaTextSize = JSON.parse(
          await AsyncStorage.getItem("banglaTextSize")
        );
        if (banglaTextSize) {
          dispatch({ type: SET_BANLGA_TEXT_SIZE, payload: banglaTextSize });
        }
        let englishTextSize = JSON.parse(
          await AsyncStorage.getItem("englishTextSize")
        );
        if (englishTextSize) {
          dispatch({ type: SET_ENGLIS_TEXT_SIZE, payload: englishTextSize });
        }
        let tajweed = JSON.parse(await AsyncStorage.getItem("tajweed"));
        if (tajweed !== null) {
          dispatch({ type: SET_TAJWEED, payload: tajweed });
        }
        let hafeziFont = JSON.parse(await AsyncStorage.getItem("hafeziFont"));
        if (hafeziFont !== null) {
          dispatch({ type: SET_HAFEZI_FONT, payload: hafeziFont });
        }

        let isShowBanglaText = JSON.parse(
          await AsyncStorage.getItem("isShowBanglaText")
        );
        if (isShowBanglaText !== null) {
          dispatch({
            type: SET_IS_SHOW_BANGLA_TEXT,
            payload: isShowBanglaText,
          });
        }

        let isShowEnglishText = JSON.parse(
          await AsyncStorage.getItem("isShowEnglishText")
        );
        if (isShowEnglishText !== null) {
          dispatch({
            type: SET_IS_SHOW_ENGLISH_TEXT,
            payload: isShowEnglishText,
          });
        }

        let isShowTafsir = JSON.parse(
          await AsyncStorage.getItem("isShowTafsir")
        );
        if (isShowTafsir !== null) {
          dispatch({ type: SET_IS_SHOW_TAFSIR, payload: isShowTafsir });
        }

        let isShowAyahDetails = JSON.parse(
          await AsyncStorage.getItem("isShowAyahDetails")
        );
        if (isShowAyahDetails !== null) {
          dispatch({ type: SET_AYAH_DETAILS, payload: isShowAyahDetails });
        }

        let isShowCopyButton = JSON.parse(
          await AsyncStorage.getItem("isShowCopyButton")
        );
        if (isShowCopyButton !== null) {
          dispatch({
            type: SET_IS_SHOW_COPY_BUTTON,
            payload: isShowCopyButton,
          });
        }

        let isShowSaveButton = JSON.parse(
          await AsyncStorage.getItem("isShowSaveButton")
        );
        if (isShowSaveButton !== null) {
          dispatch({
            type: SET_IS_SHOW_SAVE_BUTTON,
            payload: isShowSaveButton,
          });
        }

        let favouriteSurahList = JSON.parse(
          await AsyncStorage.getItem("favouriteSurahList")
        );
        if (favouriteSurahList !== null) {
          dispatch({
            type: SET_FAVOURITE_SURAH_LIST,
            payload: favouriteSurahList,
          });
        }

        let isShowAudioPlayer = JSON.parse(
          await AsyncStorage.getItem("isShowAudioPlayer")
        );
        if (isShowAudioPlayer !== null) {
          dispatch({
            type: SET_IS_SHOW_AUDIO_PLAYER,
            payload: isShowAudioPlayer,
          });
        }

        let nobleQuran = JSON.parse(await AsyncStorage.getItem("nobleQuran"));
        if (nobleQuran) {
          dispatch({ type: SAVE_TO_READ_LATER, payload: nobleQuran.readLater });
          dispatch({ type: SET_LAST_READ_SURAH, payload: nobleQuran.lastRead });
          dispatch({
            type: SET_LAST_READ_AYAH,
            payload: nobleQuran.readLater[nobleQuran.lastRead],
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fn();
    dispatch(getFullShortSurahList());
    dispatch(getShortSurahList());
  }, []);

  useEffect(() => {
    const fn = async () => {
      await NavigationBar.setBackgroundColorAsync(color.bgColor1);
    };
    fn();
  }, [color]);

  useEffect(() => {
    if (!loading && fontsLoaded) {
      setTimeout(() => {
        navigation.replace("NobleQuran");
      }, 1000);
    }
  }, [loading, fontsLoaded]);
  return (
    <View
      className=""
      style={{
        backgroundColor: color.bgColor2,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CustomStatusBar />
      <Image
        className="w-48 h-48"
        source={require("../../assets/image/brand.png")}
      />
    </View>
  );
};

export default Splash;
