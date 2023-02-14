import { SET_FULL_SHORT_SURAH_LIST } from "../constants/constant";

export const getFullShortSurahList = () => async (dispatch) => {
  const data = await import("../../../assets/data/allSurah.json");
  dispatch({ type: SET_FULL_SHORT_SURAH_LIST, payload: data.default });
};
