import {
  FULL_SURAH_GET_SUCCESS,
  SET_FULL_SURAH_LOADING,
} from "../constants/constant";

const initialState = {
  loading: true,
  fullSurahWithDetails: "",
  tafsir: "",
};

export const fullSurahReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_FULL_SURAH_LOADING:
      return {
        loading: true,
        fullSurahWithDetails: "",
        tafsir: "",
      };

    case FULL_SURAH_GET_SUCCESS:
      return {
        loading: false,
        fullSurahWithDetails: payload.surah,
        tafsir: payload.tafsir,
      };

    default:
      return state;
  }
};
