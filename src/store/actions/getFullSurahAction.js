import {
  SET_FULL_SURAH_LOADING,
  FULL_SURAH_GET_SUCCESS,
} from "../constants/constant";

export const getFullSurah = (n) => async (dispatch) => {
  dispatch({ type: SET_FULL_SURAH_LOADING });
  let surahData;
  let tafsirData;
  setTimeout(async () => {
    try {
      if (n === 1) {
        surahData = await import("../../../assets/data/allSurah/1.json");
        tafsirData = await import("../../../assets/data/tafsir/1.json");
      } else if (n === 2) {
        surahData = await import("../../../assets/data/allSurah/2.json");
        tafsirData = await import("../../../assets/data/tafsir/2.json");
      } else if (n === 3) {
        surahData = await import("../../../assets/data/allSurah/3.json");
        tafsirData = await import("../../../assets/data/tafsir/3.json");
      } else if (n === 4) {
        surahData = await import("../../../assets/data/allSurah/4.json");
        tafsirData = await import("../../../assets/data/tafsir/4.json");
      } else if (n === 5) {
        surahData = await import("../../../assets/data/allSurah/5.json");
        tafsirData = await import("../../../assets/data/tafsir/5.json");
      } else if (n === 6) {
        surahData = await import("../../../assets/data/allSurah/6.json");
        tafsirData = await import("../../../assets/data/tafsir/6.json");
      } else if (n === 7) {
        surahData = await import("../../../assets/data/allSurah/7.json");
        tafsirData = await import("../../../assets/data/tafsir/7.json");
      } else if (n === 8) {
        surahData = await import("../../../assets/data/allSurah/8.json");
        tafsirData = await import("../../../assets/data/tafsir/8.json");
      } else if (n === 9) {
        surahData = await import("../../../assets/data/allSurah/9.json");
        tafsirData = await import("../../../assets/data/tafsir/9.json");
      } else if (n === 10) {
        surahData = await import("../../../assets/data/allSurah/10.json");
        tafsirData = await import("../../../assets/data/tafsir/10.json");
      } else if (n === 11) {
        surahData = await import("../../../assets/data/allSurah/11.json");
        tafsirData = await import("../../../assets/data/tafsir/11.json");
      } else if (n === 12) {
        surahData = await import("../../../assets/data/allSurah/12.json");
        tafsirData = await import("../../../assets/data/tafsir/12.json");
      } else if (n === 13) {
        surahData = await import("../../../assets/data/allSurah/13.json");
        tafsirData = await import("../../../assets/data/tafsir/13.json");
      } else if (n === 14) {
        surahData = await import("../../../assets/data/allSurah/14.json");
        tafsirData = await import("../../../assets/data/tafsir/14.json");
      } else if (n === 15) {
        surahData = await import("../../../assets/data/allSurah/15.json");
        tafsirData = await import("../../../assets/data/tafsir/15.json");
      } else if (n === 16) {
        surahData = await import("../../../assets/data/allSurah/16.json");
        tafsirData = await import("../../../assets/data/tafsir/16.json");
      } else if (n === 17) {
        surahData = await import("../../../assets/data/allSurah/17.json");
        tafsirData = await import("../../../assets/data/tafsir/17.json");
      } else if (n === 18) {
        surahData = await import("../../../assets/data/allSurah/18.json");
        tafsirData = await import("../../../assets/data/tafsir/18.json");
      } else if (n === 19) {
        surahData = await import("../../../assets/data/allSurah/19.json");
        tafsirData = await import("../../../assets/data/tafsir/19.json");
      } else if (n === 20) {
        surahData = await import("../../../assets/data/allSurah/20.json");
        tafsirData = await import("../../../assets/data/tafsir/20.json");
      } else if (n === 21) {
        surahData = await import("../../../assets/data/allSurah/21.json");
        tafsirData = await import("../../../assets/data/tafsir/21.json");
      } else if (n === 22) {
        surahData = await import("../../../assets/data/allSurah/22.json");
        tafsirData = await import("../../../assets/data/tafsir/22.json");
      } else if (n === 23) {
        surahData = await import("../../../assets/data/allSurah/23.json");
        tafsirData = await import("../../../assets/data/tafsir/23.json");
      } else if (n === 24) {
        surahData = await import("../../../assets/data/allSurah/24.json");
        tafsirData = await import("../../../assets/data/tafsir/24.json");
      } else if (n === 25) {
        surahData = await import("../../../assets/data/allSurah/25.json");
        tafsirData = await import("../../../assets/data/tafsir/25.json");
      } else if (n === 26) {
        surahData = await import("../../../assets/data/allSurah/26.json");
        tafsirData = await import("../../../assets/data/tafsir/26.json");
      } else if (n === 27) {
        surahData = await import("../../../assets/data/allSurah/27.json");
        tafsirData = await import("../../../assets/data/tafsir/27.json");
      } else if (n === 28) {
        surahData = await import("../../../assets/data/allSurah/28.json");
        tafsirData = await import("../../../assets/data/tafsir/28.json");
      } else if (n === 29) {
        surahData = await import("../../../assets/data/allSurah/29.json");
        tafsirData = await import("../../../assets/data/tafsir/29.json");
      } else if (n === 30) {
        surahData = await import("../../../assets/data/allSurah/30.json");
        tafsirData = await import("../../../assets/data/tafsir/30.json");
      } else if (n === 31) {
        surahData = await import("../../../assets/data/allSurah/31.json");
        tafsirData = await import("../../../assets/data/tafsir/31.json");
      } else if (n === 32) {
        surahData = await import("../../../assets/data/allSurah/32.json");
        tafsirData = await import("../../../assets/data/tafsir/32.json");
      } else if (n === 33) {
        surahData = await import("../../../assets/data/allSurah/33.json");
        tafsirData = await import("../../../assets/data/tafsir/33.json");
      } else if (n === 34) {
        surahData = await import("../../../assets/data/allSurah/34.json");
        tafsirData = await import("../../../assets/data/tafsir/34.json");
      } else if (n === 35) {
        surahData = await import("../../../assets/data/allSurah/35.json");
        tafsirData = await import("../../../assets/data/tafsir/35.json");
      } else if (n === 36) {
        surahData = await import("../../../assets/data/allSurah/36.json");
        tafsirData = await import("../../../assets/data/tafsir/36.json");
      } else if (n === 37) {
        surahData = await import("../../../assets/data/allSurah/37.json");
        tafsirData = await import("../../../assets/data/tafsir/37.json");
      } else if (n === 38) {
        surahData = await import("../../../assets/data/allSurah/38.json");
        tafsirData = await import("../../../assets/data/tafsir/38.json");
      } else if (n === 39) {
        surahData = await import("../../../assets/data/allSurah/39.json");
        tafsirData = await import("../../../assets/data/tafsir/39.json");
      } else if (n === 40) {
        surahData = await import("../../../assets/data/allSurah/40.json");
        tafsirData = await import("../../../assets/data/tafsir/40.json");
      } else if (n === 41) {
        surahData = await import("../../../assets/data/allSurah/41.json");
        tafsirData = await import("../../../assets/data/tafsir/41.json");
      } else if (n === 42) {
        surahData = await import("../../../assets/data/allSurah/42.json");
        tafsirData = await import("../../../assets/data/tafsir/42.json");
      } else if (n === 43) {
        surahData = await import("../../../assets/data/allSurah/43.json");
        tafsirData = await import("../../../assets/data/tafsir/43.json");
      } else if (n === 44) {
        surahData = await import("../../../assets/data/allSurah/44.json");
        tafsirData = await import("../../../assets/data/tafsir/44.json");
      } else if (n === 45) {
        surahData = await import("../../../assets/data/allSurah/45.json");
        tafsirData = await import("../../../assets/data/tafsir/45.json");
      } else if (n === 46) {
        surahData = await import("../../../assets/data/allSurah/46.json");
        tafsirData = await import("../../../assets/data/tafsir/46.json");
      } else if (n === 47) {
        surahData = await import("../../../assets/data/allSurah/47.json");
        tafsirData = await import("../../../assets/data/tafsir/47.json");
      } else if (n === 48) {
        surahData = await import("../../../assets/data/allSurah/48.json");
        tafsirData = await import("../../../assets/data/tafsir/48.json");
      } else if (n === 49) {
        surahData = await import("../../../assets/data/allSurah/49.json");
        tafsirData = await import("../../../assets/data/tafsir/49.json");
      } else if (n === 50) {
        surahData = await import("../../../assets/data/allSurah/50.json");
        tafsirData = await import("../../../assets/data/tafsir/50.json");
      } else if (n === 51) {
        surahData = await import("../../../assets/data/allSurah/51.json");
        tafsirData = await import("../../../assets/data/tafsir/51.json");
      } else if (n === 52) {
        surahData = await import("../../../assets/data/allSurah/52.json");
        tafsirData = await import("../../../assets/data/tafsir/52.json");
      } else if (n === 53) {
        surahData = await import("../../../assets/data/allSurah/53.json");
        tafsirData = await import("../../../assets/data/tafsir/53.json");
      } else if (n === 54) {
        surahData = await import("../../../assets/data/allSurah/54.json");
        tafsirData = await import("../../../assets/data/tafsir/54.json");
      } else if (n === 55) {
        surahData = await import("../../../assets/data/allSurah/55.json");
        tafsirData = await import("../../../assets/data/tafsir/55.json");
      } else if (n === 56) {
        surahData = await import("../../../assets/data/allSurah/56.json");
        tafsirData = await import("../../../assets/data/tafsir/56.json");
      } else if (n === 57) {
        surahData = await import("../../../assets/data/allSurah/57.json");
        tafsirData = await import("../../../assets/data/tafsir/57.json");
      } else if (n === 58) {
        surahData = await import("../../../assets/data/allSurah/58.json");
        tafsirData = await import("../../../assets/data/tafsir/58.json");
      } else if (n === 59) {
        surahData = await import("../../../assets/data/allSurah/59.json");
        tafsirData = await import("../../../assets/data/tafsir/59.json");
      } else if (n === 60) {
        surahData = await import("../../../assets/data/allSurah/60.json");
        tafsirData = await import("../../../assets/data/tafsir/60.json");
      } else if (n === 61) {
        surahData = await import("../../../assets/data/allSurah/61.json");
        tafsirData = await import("../../../assets/data/tafsir/61.json");
      } else if (n === 62) {
        surahData = await import("../../../assets/data/allSurah/62.json");
        tafsirData = await import("../../../assets/data/tafsir/62.json");
      } else if (n === 63) {
        surahData = await import("../../../assets/data/allSurah/63.json");
        tafsirData = await import("../../../assets/data/tafsir/63.json");
      } else if (n === 64) {
        surahData = await import("../../../assets/data/allSurah/64.json");
        tafsirData = await import("../../../assets/data/tafsir/64.json");
      } else if (n === 65) {
        surahData = await import("../../../assets/data/allSurah/65.json");
        tafsirData = await import("../../../assets/data/tafsir/65.json");
      } else if (n === 66) {
        surahData = await import("../../../assets/data/allSurah/66.json");
        tafsirData = await import("../../../assets/data/tafsir/66.json");
      } else if (n === 67) {
        surahData = await import("../../../assets/data/allSurah/67.json");
        tafsirData = await import("../../../assets/data/tafsir/67.json");
      } else if (n === 68) {
        surahData = await import("../../../assets/data/allSurah/68.json");
        tafsirData = await import("../../../assets/data/tafsir/68.json");
      } else if (n === 69) {
        surahData = await import("../../../assets/data/allSurah/69.json");
        tafsirData = await import("../../../assets/data/tafsir/69.json");
      } else if (n === 70) {
        surahData = await import("../../../assets/data/allSurah/70.json");
        tafsirData = await import("../../../assets/data/tafsir/70.json");
      } else if (n === 71) {
        surahData = await import("../../../assets/data/allSurah/71.json");
        tafsirData = await import("../../../assets/data/tafsir/71.json");
      } else if (n === 72) {
        surahData = await import("../../../assets/data/allSurah/72.json");
        tafsirData = await import("../../../assets/data/tafsir/72.json");
      } else if (n === 73) {
        surahData = await import("../../../assets/data/allSurah/73.json");
        tafsirData = await import("../../../assets/data/tafsir/73.json");
      } else if (n === 74) {
        surahData = await import("../../../assets/data/allSurah/74.json");
        tafsirData = await import("../../../assets/data/tafsir/74.json");
      } else if (n === 75) {
        surahData = await import("../../../assets/data/allSurah/75.json");
        tafsirData = await import("../../../assets/data/tafsir/75.json");
      } else if (n === 76) {
        surahData = await import("../../../assets/data/allSurah/76.json");
        tafsirData = await import("../../../assets/data/tafsir/76.json");
      } else if (n === 77) {
        surahData = await import("../../../assets/data/allSurah/77.json");
        tafsirData = await import("../../../assets/data/tafsir/77.json");
      } else if (n === 78) {
        surahData = await import("../../../assets/data/allSurah/78.json");
        tafsirData = await import("../../../assets/data/tafsir/78.json");
      } else if (n === 79) {
        surahData = await import("../../../assets/data/allSurah/79.json");
        tafsirData = await import("../../../assets/data/tafsir/79.json");
      } else if (n === 80) {
        surahData = await import("../../../assets/data/allSurah/80.json");
        tafsirData = await import("../../../assets/data/tafsir/80.json");
      } else if (n === 81) {
        surahData = await import("../../../assets/data/allSurah/81.json");
        tafsirData = await import("../../../assets/data/tafsir/81.json");
      } else if (n === 82) {
        surahData = await import("../../../assets/data/allSurah/82.json");
        tafsirData = await import("../../../assets/data/tafsir/82.json");
      } else if (n === 83) {
        surahData = await import("../../../assets/data/allSurah/83.json");
        tafsirData = await import("../../../assets/data/tafsir/83.json");
      } else if (n === 84) {
        surahData = await import("../../../assets/data/allSurah/84.json");
        tafsirData = await import("../../../assets/data/tafsir/84.json");
      } else if (n === 85) {
        surahData = await import("../../../assets/data/allSurah/85.json");
        tafsirData = await import("../../../assets/data/tafsir/85.json");
      } else if (n === 86) {
        surahData = await import("../../../assets/data/allSurah/86.json");
        tafsirData = await import("../../../assets/data/tafsir/86.json");
      } else if (n === 87) {
        surahData = await import("../../../assets/data/allSurah/87.json");
        tafsirData = await import("../../../assets/data/tafsir/87.json");
      } else if (n === 88) {
        surahData = await import("../../../assets/data/allSurah/88.json");
        tafsirData = await import("../../../assets/data/tafsir/88.json");
      } else if (n === 89) {
        surahData = await import("../../../assets/data/allSurah/89.json");
        tafsirData = await import("../../../assets/data/tafsir/89.json");
      } else if (n === 90) {
        surahData = await import("../../../assets/data/allSurah/90.json");
        tafsirData = await import("../../../assets/data/tafsir/90.json");
      } else if (n === 91) {
        surahData = await import("../../../assets/data/allSurah/91.json");
        tafsirData = await import("../../../assets/data/tafsir/91.json");
      } else if (n === 92) {
        surahData = await import("../../../assets/data/allSurah/92.json");
        tafsirData = await import("../../../assets/data/tafsir/92.json");
      } else if (n === 93) {
        surahData = await import("../../../assets/data/allSurah/93.json");
        tafsirData = await import("../../../assets/data/tafsir/93.json");
      } else if (n === 94) {
        surahData = await import("../../../assets/data/allSurah/94.json");
        tafsirData = await import("../../../assets/data/tafsir/94.json");
      } else if (n === 95) {
        surahData = await import("../../../assets/data/allSurah/95.json");
        tafsirData = await import("../../../assets/data/tafsir/95.json");
      } else if (n === 96) {
        surahData = await import("../../../assets/data/allSurah/96.json");
        tafsirData = await import("../../../assets/data/tafsir/96.json");
      } else if (n === 97) {
        surahData = await import("../../../assets/data/allSurah/97.json");
        tafsirData = await import("../../../assets/data/tafsir/97.json");
      } else if (n === 98) {
        surahData = await import("../../../assets/data/allSurah/98.json");
        tafsirData = await import("../../../assets/data/tafsir/98.json");
      } else if (n === 99) {
        surahData = await import("../../../assets/data/allSurah/99.json");
        tafsirData = await import("../../../assets/data/tafsir/99.json");
      } else if (n === 100) {
        surahData = await import("../../../assets/data/allSurah/100.json");
        tafsirData = await import("../../../assets/data/tafsir/100.json");
      } else if (n === 101) {
        surahData = await import("../../../assets/data/allSurah/101.json");
        tafsirData = await import("../../../assets/data/tafsir/101.json");
      } else if (n === 102) {
        surahData = await import("../../../assets/data/allSurah/102.json");
        tafsirData = await import("../../../assets/data/tafsir/102.json");
      } else if (n === 103) {
        surahData = await import("../../../assets/data/allSurah/103.json");
        tafsirData = await import("../../../assets/data/tafsir/103.json");
      } else if (n === 104) {
        surahData = await import("../../../assets/data/allSurah/104.json");
        tafsirData = await import("../../../assets/data/tafsir/104.json");
      } else if (n === 105) {
        surahData = await import("../../../assets/data/allSurah/105.json");
        tafsirData = await import("../../../assets/data/tafsir/105.json");
      } else if (n === 106) {
        surahData = await import("../../../assets/data/allSurah/106.json");
        tafsirData = await import("../../../assets/data/tafsir/106.json");
      } else if (n === 107) {
        surahData = await import("../../../assets/data/allSurah/107.json");
        tafsirData = await import("../../../assets/data/tafsir/107.json");
      } else if (n === 108) {
        surahData = await import("../../../assets/data/allSurah/108.json");
        tafsirData = await import("../../../assets/data/tafsir/108.json");
      } else if (n === 109) {
        surahData = await import("../../../assets/data/allSurah/109.json");
        tafsirData = await import("../../../assets/data/tafsir/109.json");
      } else if (n === 110) {
        surahData = await import("../../../assets/data/allSurah/110.json");
        tafsirData = await import("../../../assets/data/tafsir/110.json");
      } else if (n === 111) {
        surahData = await import("../../../assets/data/allSurah/111.json");
        tafsirData = await import("../../../assets/data/tafsir/111.json");
      } else if (n === 112) {
        surahData = await import("../../../assets/data/allSurah/112.json");
        tafsirData = await import("../../../assets/data/tafsir/112.json");
      } else if (n === 113) {
        surahData = await import("../../../assets/data/allSurah/113.json");
        tafsirData = await import("../../../assets/data/tafsir/113.json");
      } else if (n === 114) {
        surahData = await import("../../../assets/data/allSurah/114.json");
        tafsirData = await import("../../../assets/data/tafsir/114.json");
      } else {
        surahData = await import("../../../assets/data/allSurah/1.json");
        tafsirData = await import("../../../assets/data/tafsir/1.json");
      }

      dispatch({
        type: FULL_SURAH_GET_SUCCESS,
        payload: { surah: surahData.default, tafsir: tafsirData },
      });
    } catch (error) {
      console.error(error);
    }
  }, 200);
};
