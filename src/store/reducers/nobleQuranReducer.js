import { darkColors, lightColors } from "../../utils/color";
import {
  SAVE_TO_READ_LATER,
  SET_ARABIC_TEXT_SIZE,
  SET_AYAH_DETAILS,
  SET_BANLGA_TEXT_SIZE,
  SET_DARK_MODE,
  SET_ENGLIS_TEXT_SIZE,
  SET_FAVOURITE_SURAH_LIST,
  SET_FULL_SHORT_SURAH_LIST,
  SET_HAFEZI_FONT,
  SET_IS_SHOW_AUDIO_PLAYER,
  SET_IS_SHOW_BANGLA_TEXT,
  SET_IS_SHOW_COPY_BUTTON,
  SET_IS_SHOW_ENGLISH_TEXT,
  SET_IS_SHOW_SAVE_BUTTON,
  SET_IS_SHOW_TAFSIR,
  SET_LAST_READ_AYAH,
  SET_LAST_READ_SURAH,
  SET_SEARCH_TERM,
  SET_TAJWEED,
} from "../constants/constant";

const initialState = {
  isDark: true,
  color: darkColors,
  uniqueKey: Date.now(),
  listUniqueKey: Date.now(),
  searchTerm: "",
  arabicTextSize: 30,
  banglaTextSize: 16,
  englishTextSize: 16,
  isEnableTajweed: true,
  hafeziFont: true,
  readLater: "",
  lastReadSurah: "",
  lastReadedAyah: "",
  isShowAyahDetails: true,
  isShowBanglaText: true,
  isShowEnglishText: true,
  isShowTafsir: true,
  isShowCopyButton: true,
  isShowSaveButton: true,
  isShowAudioPlayer: true,
  favouriteSurahList: {},
  fullShortSurahList: "",
};

export const nobleQuranReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_DARK_MODE:
      return {
        ...state,
        isDark: payload,
        color: payload ? darkColors : lightColors,
        uniqueKey: Date.now(),
      };

    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: payload,
        lastReadSurah: 0,
      };

    case SET_ARABIC_TEXT_SIZE:
      return {
        ...state,
        arabicTextSize: payload,
      };

    case SET_BANLGA_TEXT_SIZE:
      return {
        ...state,
        banglaTextSize: payload,
      };

    case SET_ENGLIS_TEXT_SIZE:
      return {
        ...state,
        englishTextSize: payload,
      };

    case SET_TAJWEED:
      return {
        ...state,
        isEnableTajweed: payload,
      };

    case SET_HAFEZI_FONT:
      return {
        ...state,
        hafeziFont: payload,
      };

    case SAVE_TO_READ_LATER:
      return {
        ...state,
        readLater: payload,
        listUniqueKey: Date.now(),
      };

    case SET_LAST_READ_AYAH:
      return {
        ...state,
        lastReadedAyah: payload,
      };

    case SET_LAST_READ_SURAH:
      return {
        ...state,
        lastReadSurah: payload,
      };

    case SET_AYAH_DETAILS:
      return {
        ...state,
        isShowAyahDetails: payload,
      };

    case SET_IS_SHOW_BANGLA_TEXT:
      return {
        ...state,
        isShowBanglaText: payload,
      };

    case SET_IS_SHOW_ENGLISH_TEXT:
      return {
        ...state,
        isShowEnglishText: payload,
      };

    case SET_IS_SHOW_TAFSIR:
      return {
        ...state,
        isShowTafsir: payload,
      };

    case SET_IS_SHOW_COPY_BUTTON:
      return {
        ...state,
        isShowCopyButton: payload,
      };

    case SET_IS_SHOW_SAVE_BUTTON:
      return {
        ...state,
        isShowSaveButton: payload,
      };

    case SET_FAVOURITE_SURAH_LIST:
      return {
        ...state,
        favouriteSurahList: payload,
        listUniqueKey: Date.now(),
      };

    case SET_FULL_SHORT_SURAH_LIST:
      return {
        ...state,
        fullShortSurahList: payload,
      };

    case SET_IS_SHOW_AUDIO_PLAYER:
      return {
        ...state,
        isShowAudioPlayer: payload,
      };

    default:
      return state;
  }
};
