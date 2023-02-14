import {
  SET_SHORT_SURAH_LOADING,
  SHORT_SURAH_GET_SUCCESS,
} from "../constants/constant";

export const getShortSurahList =
  (searchTerm = "") =>
  async (dispatch) => {
    dispatch({ type: SET_SHORT_SURAH_LOADING });

    setTimeout(async () => {
      const data = await import("../../../assets/data/allSurah.json");
      let filteredData = [];

      if (searchTerm) {
        const regex = new RegExp(searchTerm, "i");
        filteredData = data.default.filter(
          (surah) =>
            regex.test(surah.englishName) ||
            regex.test(surah.enTranslatedName) ||
            regex.test(surah.banglaName) ||
            regex.test(surah.arabicName)
        );
      }

      dispatch({
        type: SHORT_SURAH_GET_SUCCESS,
        payload: searchTerm ? filteredData : data.default,
      });
    }, 500);
  };
