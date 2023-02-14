import { ToastAndroid, View } from "react-native";
import React from "react";
import { Pressable } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "./CustomText";
import {
  SAVE_TO_READ_LATER,
  SET_LAST_READ_SURAH,
} from "../store/constants/constant";
import { useDispatch, useSelector } from "react-redux";
import vibrate from "../utils/vibratie";

const SaveToReadLater = ({ surahNumber, ayahNumber }) => {
  const dispatch = useDispatch();
  const { color, readLater, isShowSaveButton } = useSelector(
    (state) => state.nobleQuran
  );
  const showToast = (title) => {
    ToastAndroid.showWithGravityAndOffset(
      title,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };
  const saveToReadlater = async (surah, ayah) => {
    vibrate();
    if (!readLater) {
      await AsyncStorage.setItem("nobleQuran", JSON.stringify({}));
    }
    const nobleQuranLocal = JSON.parse(
      await AsyncStorage.getItem("nobleQuran")
    );

    if (
      nobleQuranLocal.readLater &&
      nobleQuranLocal.readLater[surah] &&
      nobleQuranLocal.readLater[surah] == ayah
    ) {
      delete nobleQuranLocal.readLater[surah];
      nobleQuranLocal.lastRead =
        Object.keys(nobleQuranLocal.readLater)[
          Object.keys(nobleQuranLocal.readLater).length - 1
        ] || null;

      showToast("Removed From Read Later");
    } else {
      nobleQuranLocal.readLater = {
        ...nobleQuranLocal.readLater,
        [surah]: ayah,
      };
      nobleQuranLocal.lastRead = surah;
      showToast("Saved to Read Later");
    }

    await AsyncStorage.setItem("nobleQuran", JSON.stringify(nobleQuranLocal));

    dispatch({
      type: SAVE_TO_READ_LATER,
      payload: { ...nobleQuranLocal.readLater },
    });

    dispatch({
      type: SET_LAST_READ_SURAH,
      payload: nobleQuranLocal.lastRead,
    });
  };
  return (
    <>
      {isShowSaveButton && (
        <Pressable
          style={{
            fontSize: 11,
            color: color.txtColor,
            borderWidth: 0.3,
            borderColor: color.txtColor,
            borderRadius: 2,
            paddingVertical: 2,
            paddingHorizontal: 5,
            backgroundColor: color.bgColor1,
          }}
          onPress={() => saveToReadlater(surahNumber, ayahNumber)}
        >
          <View className="mb-0.5">
            <CustomText className="" style={[{ fontSize: 11 }]}>
              {readLater[surahNumber] && readLater[surahNumber] == ayahNumber
                ? "Remove"
                : "Save"}
            </CustomText>
          </View>
        </Pressable>
      )}
    </>
  );
};

export default SaveToReadLater;
