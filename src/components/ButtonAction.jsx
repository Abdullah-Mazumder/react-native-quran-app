import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import vibrate from "../utils/vibratie";
import { banglaFont } from "../utils/fonts";
import { Pressable } from "@react-native-material/core";
import CustomText from "./CustomText";
import SaveToReadLater from "./SaveToReadLater";

const ButtonAction = ({
  copyToClipboard,
  id,
  surahNumber,
  tafsir,
  setTafsirModal,
}) => {
  const { color, isShowTafsir, isShowCopyButton, isShowSaveButton } =
    useSelector((state) => state.nobleQuran);
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    if (isShowCopyButton || isShowSaveButton || isShowTafsir) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, [isShowCopyButton, isShowTafsir, isShowSaveButton]);

  return (
    <>
      {isShow && (
        <View className="w-full flex items-center my-4">
          <View className="flex flex-row gap-2">
            {isShowCopyButton && (
              <Pressable
                style={{
                  fontSize: 11,
                  color: color.txtColor,
                  borderWidth: 0.3,
                  borderColor: color.txtColor,
                  borderRadius: 2,
                  paddingVertical: 1,
                  paddingHorizontal: 5,
                  backgroundColor: color.bgColor1,
                }}
                onPress={() => copyToClipboard(id)}
              >
                <View className="mb-0.5">
                  <CustomText className="" style={[{ fontSize: 11 }]}>
                    Copy
                  </CustomText>
                </View>
              </Pressable>
            )}
            {tafsir[id] && isShowTafsir && (
              <Pressable
                style={{
                  fontSize: 11,
                  color: color.txtColor,
                  borderWidth: 0.3,
                  borderColor: color.txtColor,
                  borderRadius: 2,
                  backgroundColor: color.bgColor1,
                  paddingHorizontal: 5,
                  paddingVertical: 1,
                  paddingTop: 2,
                }}
                onPress={() => {
                  setTafsirModal(id);
                  vibrate();
                }}
              >
                <View className="">
                  <CustomText
                    className=""
                    style={[{ fontSize: 12 }, banglaFont.banglaR]}
                  >
                    তাফসীর ইবনে কাছীর
                  </CustomText>
                </View>
              </Pressable>
            )}
            <View>
              <SaveToReadLater surahNumber={surahNumber} ayahNumber={id} />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default ButtonAction;
