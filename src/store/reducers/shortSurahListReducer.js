import {
  SET_SHORT_SURAH_LOADING,
  SHORT_SURAH_GET_SUCCESS,
} from "../constants/constant";

const initialState = {
  loading: true,
  list: "",
};

export const shortSurahListReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SHORT_SURAH_LOADING:
      return {
        loading: true,
        list: "",
      };

    case SHORT_SURAH_GET_SUCCESS:
      return {
        loading: false,
        list: payload,
      };

    default:
      return state;
  }
};
