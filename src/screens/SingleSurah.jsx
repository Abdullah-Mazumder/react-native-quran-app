import {
  Image,
  ImageBackground,
  ScrollView,
  View,
  ToastAndroid,
  Text,
} from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { IconButton, Pressable } from "@react-native-material/core";
import Ionicon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import convertToBanglaNumber from "engnumber-to-banglanumber";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFullSurah } from "../store/actions/getFullSurahAction";
import CustomText from "../components/CustomText";
import { banglaFont, englishFont } from "../utils/fonts";
import { FlashList } from "@shopify/flash-list";
import CustomButton from "../components/CustomButton";
import { defaultSystemFonts } from "react-native-render-html";
import RenderHTML from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import TajweedVerse from "./../components/TajweedVerse";
import * as Clipboard from "expo-clipboard";
import vibrate from "../utils/vibratie";
import BanglaText from "../components/BanglaText";
import EnglishText from "../components/EnglishText";
import SavedAyahbutton from "../components/SavedAyahbutton";
import useGoToBackHandler from "../hooks/useGoToBackHandler";
import AhayDetails from "../components/AhayDetails";
import ButtonAction from "../components/ButtonAction";
import { useRef } from "react";
import Checkbox from "expo-checkbox";
import SettingBox from "../components/SettingBox";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import { Picker } from "@react-native-picker/picker";

const SingleSurah = () => {
  const isFocused = useIsFocused();
  const listRef = useRef(null);
  const pickerRef = useRef();
  const { width, height } = useWindowDimensions();
  const systemFonts = [...defaultSystemFonts, "banglas", "banglar"];
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  useGoToBackHandler(route?.params?.fromWhichScreen || "Home");
  const {
    color,
    isDark,
    uniqueKey,
    banglaTextSize,
    readLater,
    lastReadSurah,
    isShowAudioPlayer,
  } = useSelector((state) => state.nobleQuran);
  const { fullSurahWithDetails, loading, tafsir } = useSelector(
    (state) => state.fullSurah
  );
  const { surah, surahDetails } = fullSurahWithDetails;
  const [tafsirModal, setTafsirModal] = useState(false);
  const [settingBox, setSettingBox] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(false);
  let [currentAyah, setCurrentAyah] = useState(1);
  const [playFullSurah, setPlayFullSurah] = useState(true);
  const [downloadWarningModal, setDownloadWarningModal] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const [ayahInView, setAyahInView] = useState(1);
  const [isDownloadedSurah, setIsDownloadedSurah] = useState(false);
  let [numDownloadedFiles, setNumDownloadedFiles] = useState(1);
  const [isPlaySurah, setIsPlaySurah] = useState(false);
  const [soundObject, setSoundObject] = useState(null);
  const [repeatAyah, setRepeatAyah] = useState(1);

  const showToast = (title1 = "Something went wrong.") => {
    ToastAndroid.showWithGravityAndOffset(
      title1,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const copyToClipboard = async (ayah) => {
    vibrate();
    await Clipboard.setStringAsync(`
    ${surah.verses[ayah - 1].arabic_text} ${
      surah.verses[ayah - 1].bangl_text
    } ${surah.verses[ayah - 1].english_text} সূরা - ${
      surahDetails.enTranslatedName
    } আয়াত - ${convertToBanglaNumber(ayah.toString())}
    `);
    showToast("Copied To Clipboard - কপি করা হয়েছে।");
  };

  const downloadSurah = async () => {
    setDownloadModal(true);

    const folderName = `surah_${surah.id}`;
    const folderPath = `${FileSystem.documentDirectory}${folderName}`;

    let folderExists = false;
    try {
      const info = await FileSystem.getInfoAsync(folderPath);
      folderExists = info.exists;
    } catch (error) {
      showToast();
      setDownloadModal(false);
    }

    if (!folderExists) {
      try {
        await FileSystem.makeDirectoryAsync(folderPath, {
          intermediates: true,
        });
      } catch (error) {
        showToast();
        setDownloadModal(false);
      }
    }

    const length = surahDetails.totalAyah;
    const verses = surah.verses;

    for (let i = 0; i < length; i++) {
      const audioLink = verses[i].audio;
      const fileName = `ayah_${i + 1}.mp3`;
      const fileUri = `${folderPath}/${fileName}`;

      try {
        const { uri } = await FileSystem.downloadAsync(audioLink, fileUri);
        setNumDownloadedFiles(numDownloadedFiles++);
      } catch (error) {
        showToast();
        setDownloadModal(false);
      }
    }

    setIsDownloadedSurah(true);
    setDownloadModal(false);
  };

  const goToForward = () => {
    if (currentAyah < surahDetails.totalAyah) {
      setCurrentAyah(currentAyah + 1);
    }
  };

  useEffect(() => {
    if (!loading && isFocused && isPlaySurah) {
      if (soundObject) {
        soundObject.playAsync();
      } else {
        const fn = async () => {
          let count = repeatAyah - 1;
          const sound = new Audio.Sound();
          const filePath = `${FileSystem.documentDirectory}surah_${surah.id}/ayah_${currentAyah}.mp3`;

          try {
            await sound.loadAsync({ uri: filePath });
            setSoundObject(sound);
            sound.setOnPlaybackStatusUpdate(async (status) => {
              if (status.didJustFinish) {
                if (count) {
                  await sound.replayAsync();
                  count--;
                } else {
                  if (currentAyah == surahDetails.totalAyah) {
                    setIsPlaySurah(false);
                    setSoundObject(null);
                  } else {
                    if (playFullSurah) {
                      goToForward();
                    } else {
                      setIsPlaySurah(false);
                      setSoundObject(null);
                    }
                  }
                }
              }
            });
            await sound.playAsync();
          } catch (error) {
            showToast();
          }
        };
        fn();
      }
    }
  }, [isFocused, isPlaySurah, loading, currentAyah, soundObject]);

  useEffect(() => {
    if (!loading && isFocused) {
      const fn = async () => {
        const folderName = `surah_${surah.id}`;
        const folderPath = `${FileSystem.documentDirectory}${folderName}`;

        let folderExists = false;
        try {
          const info = await FileSystem.getInfoAsync(folderPath);
          folderExists = info.exists;
        } catch (error) {
          setIsDownloadedSurah(false);
          showToast();
        }

        let files = [];

        if (folderExists) {
          try {
            files = await FileSystem.readDirectoryAsync(folderPath);
          } catch (error) {
            setIsDownloadedSurah(false);
            showToast();
          }
        }

        if (folderExists && files.length === surahDetails.totalAyah) {
          setIsDownloadedSurah(true);
        } else if (folderExists && files.length !== surahDetails.totalAyah) {
          await FileSystem.deleteAsync(folderPath, { idempotent: true });
          setIsDownloadedSurah(false);
        }

        if (files.length < surahDetails.totalAyah) {
          setIsDownloadedSurah(false);
        }
      };
      fn();
    }
  }, [loading, isFocused]);

  useEffect(() => {
    if (!loading && readLater && readLater[surah.id]) {
      setCurrentAyah(readLater[surah.id]);
    }
  }, [loading, readLater]);

  useEffect(() => {
    if (route?.params?.surahNumber) {
      dispatch(getFullSurah(route.params.surahNumber));
    } else {
      dispatch(getFullSurah(lastReadSurah));
    }
  }, [route?.params?.surahNumber]);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
  }, []);

  useEffect(() => {
    if (!isFocused) {
      setCurrentAyah(1);
      setAudioPlayer(false);
      setDownloadWarningModal(false);
      setTafsirModal(false);
      setDownloadModal(false);
      setIsDownloadedSurah(false);
      setNumDownloadedFiles(1);
      setIsPlaySurah(false);
      if (isPlaySurah) {
        const fn = async () => {
          if (soundObject) {
            await soundObject.unloadAsync();
          }
        };
        fn();
      }
      setSoundObject(null);
    }
  }, [isFocused]);

  useEffect(() => {
    if (listRef && listRef.current) {
      listRef.current.scrollToIndex({ animated: true, index: currentAyah - 1 });
    }
  }, [currentAyah]);

  useEffect(() => {
    const fn = async () => {
      if (soundObject) {
        try {
          await soundObject.unloadAsync();
          setSoundObject(null);
        } catch (error) {
          setIsPlaySurah(false);
          setSoundObject(null);
        }
      }
    };
    fn();
  }, [currentAyah]);

  const onViewableItemsChanged = ({ viewableItems }) => {
    setAyahInView(viewableItems[0]?.item?.id);
  };

  const data = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <View style={{ flex: 1 }} className="relative" key={uniqueKey}>
      <View
        style={{ backgroundColor: color.bgColor1 }}
        className="flex flex-row items-center justify-between"
      >
        <View>
          <IconButton
            icon={(props) => (
              <Ionicon
                name="arrow-back-outline"
                {...props}
                size={30}
                color={color.txtColor}
              />
            )}
            onPress={() => {
              vibrate();
              navigation.navigate("Home");
            }}
          />
        </View>
        <View>
          {!loading && (
            <>
              <View className="flex flex-row items-start justify-center gap-1">
                <CustomText className="text-sm" style={englishFont.englishS}>
                  {surahDetails.enTranslatedName}
                </CustomText>
                <CustomText className="text-sm">
                  {surahDetails.banglaName}
                </CustomText>
              </View>
              <View className="flex items-center">
                <View className="flex flex-row gap-2">
                  <View className="flex flex-row items-center">
                    <CustomText className="text-xs">সূরা - </CustomText>
                    <CustomText className="text-xs">
                      {convertToBanglaNumber(surahDetails.id.toString())}
                    </CustomText>
                  </View>
                  <View className="flex flex-row items-center">
                    <CustomText className="text-xs">আয়াত - </CustomText>
                    <CustomText className="text-xs">
                      {convertToBanglaNumber(surahDetails.totalAyah.toString())}
                    </CustomText>
                  </View>
                  {readLater[surah.id] && (
                    <View className="flex flex-row items-center">
                      <CustomText
                        className="text-xs font-bold"
                        style={{ color: color.activeIconColor }}
                      >
                        সর্বশেষ পঠিত -{" "}
                      </CustomText>
                      <CustomText
                        className="text-xs font-bold"
                        style={{ color: color.activeIconColor }}
                      >
                        {convertToBanglaNumber(readLater[surah.id].toString())}
                      </CustomText>
                    </View>
                  )}
                </View>
              </View>
            </>
          )}
        </View>
        <View>
          <IconButton
            icon={(props) => (
              <Ionicon
                name="settings-outline"
                {...props}
                size={22}
                color={color.txtColor}
              />
            )}
            onPress={() => {
              vibrate();
              setSettingBox(true);
            }}
          />
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: color.bgColor2 }}>
        {loading ? (
          <View className="w-full h-full flex items-center justify-center">
            <View className="w-6 h-6 flex flex-row items-center">
              <Image
                className="w-full h-full"
                source={require("../../assets/image/loading.gif")}
              />
            </View>
          </View>
        ) : (
          <>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, width: "100%" }}>
                <FlashList
                  ref={listRef}
                  data={surah.verses}
                  initialScrollIndex={currentAyah - 1}
                  renderItem={({ item }) => {
                    const {
                      id,
                      bangl_text,
                      english_text,
                      page,
                      colorText,
                      is_sajdah_ayat,
                      juz,
                      ruku,
                      manzil,
                    } = item;
                    return (
                      <View
                        style={{
                          paddingBottom:
                            id === surahDetails.totalAyah ? height / 2 : 0,
                        }}
                      >
                        {surah.id !== 1 && id === 1 && (
                          <>
                            <View className="flex items-center my-1">
                              <View className="h-10 w-[60%]">
                                {isDark ? (
                                  <ImageBackground
                                    source={require("../../assets/image/bismillah-white.png")}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <ImageBackground
                                    source={require("../../assets/image/bismillah-black.png")}
                                    className="h-full w-full object-cover"
                                  />
                                )}
                              </View>
                            </View>
                          </>
                        )}

                        <View
                          style={{
                            backgroundColor: color.bgColor1,
                          }}
                          className="py-2"
                        >
                          <View className="flex flex-row justify-center">
                            <CustomButton
                              uniqueColor={true}
                              title={`আয়াত-${convertToBanglaNumber(
                                id.toString()
                              )}`}
                            />
                            <AhayDetails
                              page={page}
                              juz={juz}
                              ruku={ruku}
                              manzil={manzil}
                            />
                          </View>
                          <View className="flex flex-row items-center justify-center">
                            {is_sajdah_ayat && (
                              <View>
                                <View className="flex items-center justify-center mx-0.5">
                                  <View
                                    style={{
                                      borderWidth: 0.5,
                                      borderColor: color.activeIconColor,
                                      paddingHorizontal: 10,
                                      paddingVertical: 2,
                                      borderRadius: 10,
                                      backgroundColor: color.warnBg,
                                      marginTop: 5,
                                    }}
                                    className="flex flex-row items-center justify-center"
                                  >
                                    <Ionicon
                                      name="checkmark-circle"
                                      size={13}
                                      color={color.activeIconColor}
                                      className="mr-1"
                                    />

                                    <Text
                                      style={{
                                        fontSize: 11,
                                        color: color.activeIconColor,
                                        fontWeight: "bold",
                                        marginBottom: 0.5,
                                      }}
                                    >
                                      সিজদাহ আয়াত
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            )}
                            <SavedAyahbutton
                              surahNumber={surah.id}
                              ayahNumber={id}
                            />
                          </View>
                        </View>

                        <View className="p-3">
                          <CustomText className="mt-1">
                            <TajweedVerse
                              verse={colorText}
                              config={{
                                color: color.txtColor,
                              }}
                            />
                          </CustomText>
                          <View>
                            <BanglaText text={bangl_text} />
                          </View>
                          <View>
                            <EnglishText text={english_text} />
                          </View>
                        </View>

                        <ButtonAction
                          copyToClipboard={copyToClipboard}
                          id={id}
                          surahNumber={surah.id}
                          tafsir={tafsir}
                          setTafsirModal={setTafsirModal}
                        />
                      </View>
                    );
                  }}
                  estimatedItemSize={400}
                  onViewableItemsChanged={onViewableItemsChanged}
                />
              </View>
            </View>
          </>
        )}
      </View>
      <View
        className={`absolute z-30 top-0 right-0 w-full h-full flex items-center justify-center ${
          tafsirModal ? "block" : "hidden"
        }`}
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          className="w-[90%] h-[90%] p-2 rounded-lg"
          style={{ backgroundColor: color.bgColor2 }}
        >
          <CustomText
            className="text-lg"
            style={[
              {
                borderBottomWidth: 0.3,
                borderBottomColor: color.txtColor,
                marginBottom: 5,
              },
              banglaFont.banglaSemi,
            ]}
          >
            তাফসীর ইবনে কাছীর
          </CustomText>
          <View className="h-[87%]">
            <ScrollView>
              <RenderHTML
                contentWidth={width}
                source={{
                  html: tafsir[tafsirModal] ? tafsir[tafsirModal] : "",
                }}
                systemFonts={systemFonts}
                tagsStyles={{
                  p: {
                    color: color.txtColor,
                    fontFamily: "banglar",
                    lineHeight: banglaTextSize + 5,
                    marginTop: 0,
                    fontSize: banglaTextSize,
                  },
                  b: {
                    color: color.txtColor,
                    fontFamily: "banglar",
                    fontSize: banglaTextSize,
                    lineHeight: banglaTextSize + 5,
                  },
                }}
              />
            </ScrollView>
          </View>
          <View className="w-full absolute bottom-2 flex items-center justify-center">
            <Pressable
              style={{
                fontSize: 11,
                color: color.txtColor,
                borderWidth: 0.3,
                borderColor: color.txtColor,
                borderRadius: 2,
                paddingVertical: 3,
                paddingHorizontal: 15,
                backgroundColor: color.bgColor1,
              }}
              onPress={() => {
                setTafsirModal(false);
                vibrate();
              }}
            >
              <View className="flex justify-center items-center">
                <CustomText className="">Close</CustomText>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
      {settingBox && (
        <View
          className={`absolute top-0 right-0 w-full h-full flex items-center z-20`}
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            className="w-[90%] py-2 rounded-lg mt-2"
            style={{ backgroundColor: color.bgColor2 }}
          >
            <ScrollView
              style={{
                maxHeight: height / 3,
              }}
            >
              <SettingBox />
            </ScrollView>
            <View className="w-full flex items-center my-2 mt-5">
              <Pressable
                style={{
                  width: 70,
                  fontSize: 11,
                  color: color.txtColor,
                  borderWidth: 0.3,
                  borderColor: color.txtColor,
                  borderRadius: 2,
                  paddingVertical: 3,
                  paddingHorizontal: 15,
                  backgroundColor: color.bgColor1,
                }}
                onPress={() => {
                  vibrate();
                  setSettingBox(false);
                }}
              >
                <View className="flex justify-center items-center">
                  <CustomText className="">Close</CustomText>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      )}
      {!loading && (
        <>
          {isShowAudioPlayer && (
            <>
              <View
                className={`absolute ${
                  audioPlayer ? "bottom-[0]" : "bottom-[-175]"
                } right-0 w-full py-2`}
                style={{
                  backgroundColor: color.bgColor1,
                  borderTopWidth: 6,
                  borderColor: color.activeIconColor,
                  borderRadius: 10,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  borderRightWidth: 0.0001,
                  borderLeftWidth: 0.0001,
                  borderBottomWidth: 0.0001,
                }}
              >
                <View className="w-full absolute top-[-20] flex items-center justify-center z-10">
                  <View
                    className="w-8 h-8 rounded-full"
                    style={{
                      backgroundColor: color.bgColor2,
                      borderWidth: 2,
                      borderColor: color.activeIconColor,
                      overflow: "hidden",
                    }}
                  >
                    <Pressable
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className="flex items-center justify-center"
                      onPress={() => {
                        vibrate();
                        setAudioPlayer(!audioPlayer);
                      }}
                    >
                      <Ionicon
                        name="chevron-up-outline"
                        size={22}
                        color={color.activeIconColor}
                        className={`${audioPlayer ? "rotate-180" : "rotate-0"}`}
                      />
                    </Pressable>
                  </View>
                </View>
                <View className="w-full flex items-center mt-2">
                  <View className=" flex flex-row gap-3">
                    <View
                      className="rounded-full overflow-hidden"
                      style={{ width: 40, height: 40 }}
                    >
                      <Pressable
                        className=""
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onPress={() => {
                          if (currentAyah > 1) {
                            setCurrentAyah(currentAyah - 1);
                          }
                        }}
                      >
                        <Ionicon
                          name="play-back"
                          size={28}
                          color={color.activeIconColor}
                          className="mr-1"
                        />
                      </Pressable>
                    </View>
                    {isDownloadedSurah ? (
                      <View>
                        {isPlaySurah ? (
                          <View
                            className="rounded-full overflow-hidden"
                            style={{ width: 40, height: 40 }}
                          >
                            <Pressable
                              className=""
                              style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              onPress={async () => {
                                setIsPlaySurah(false);
                                if (soundObject) {
                                  await soundObject.pauseAsync();
                                }
                              }}
                            >
                              <Ionicon
                                name="pause"
                                size={28}
                                color={color.activeIconColor}
                              />
                            </Pressable>
                          </View>
                        ) : (
                          <View
                            className="rounded-full overflow-hidden"
                            style={{ width: 40, height: 40 }}
                          >
                            <Pressable
                              className=""
                              style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              onPress={() => {
                                setCurrentAyah(ayahInView);
                                listRef.current.scrollToIndex({
                                  animated: true,
                                  index: ayahInView - 1,
                                });
                                setIsPlaySurah(true);
                              }}
                            >
                              <Ionicon
                                name="play"
                                size={28}
                                color={color.activeIconColor}
                                className="ml-1"
                              />
                            </Pressable>
                          </View>
                        )}
                      </View>
                    ) : (
                      <View>
                        <View
                          className="rounded-full overflow-hidden"
                          style={{ width: 40, height: 40 }}
                        >
                          <Pressable
                            className=""
                            style={{
                              flex: 1,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onPress={() => {
                              setDownloadWarningModal(true);
                            }}
                          >
                            <FontAwesome
                              name="download"
                              size={23}
                              color={color.activeIconColor}
                            />
                          </Pressable>
                        </View>
                      </View>
                    )}
                    <View
                      className="rounded-full overflow-hidden"
                      style={{ width: 40, height: 40 }}
                    >
                      <Pressable
                        className=""
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onPress={() => {
                          goToForward();
                        }}
                      >
                        <Ionicon
                          name="play-forward"
                          size={28}
                          color={color.activeIconColor}
                          className="ml-1"
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
                <>
                  <View className="w-full flex flex-row items-center justify-between px-2">
                    <CustomText
                      className="font-bold"
                      style={[{ color: color.activeIconColor }]}
                    >
                      {convertToBanglaNumber(currentAyah.toString())}
                    </CustomText>
                    <CustomText
                      className="font-bold"
                      style={[{ color: color.activeIconColor }]}
                    >
                      {convertToBanglaNumber(surahDetails.totalAyah.toString())}
                    </CustomText>
                  </View>
                  <View className="px-2">
                    <Slider
                      value={currentAyah}
                      minimumValue={1}
                      maximumTrackTintColor={color.maximumTintColor}
                      minimumTrackTintColor={color.activeIconColor}
                      maximumValue={surahDetails.totalAyah}
                      thumbStyle={{ backgroundColor: color.activeIconColor }}
                      thumbTouchSize={{ width: 50, height: 50 }}
                      step={1}
                      trackStyle={{ height: 6 }}
                      onSlidingComplete={(value) => {
                        setCurrentAyah(value[0]);
                      }}
                    />
                  </View>
                </>
                <View className="px-0 mt-3">
                  <Pressable
                    style={{
                      width: "100%",
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                    }}
                    onPress={() => {
                      setPlayFullSurah(!playFullSurah);
                    }}
                  >
                    <View className="w-full flex flex-row items-center justify-between">
                      <CustomText
                        style={[banglaFont.banglaR, { fontWeight: "bold" }]}
                      >
                        সম্পূর্ণ সুরা শুনুন
                      </CustomText>
                      <Checkbox
                        style={{
                          borderColor: color.activeIconBorderColor,
                        }}
                        value={playFullSurah}
                        onValueChange={() => setPlayFullSurah(!playFullSurah)}
                        color={color.activeIconColor}
                      />
                    </View>
                  </Pressable>
                </View>
                <Pressable
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                  onPress={() => {
                    pickerRef.current.focus();
                  }}
                >
                  <CustomText
                    style={[banglaFont.banglaR, { fontWeight: "bold" }]}
                  >
                    আয়াত পুনরাবৃত্তি করুন
                  </CustomText>
                  <View>
                    <View
                      className="flex flex-row items-center justify-between"
                      style={{
                        borderWidth: 2,
                        borderColor: color.activeIconColor,
                        paddingRight: 7,
                        height: 30,
                        overflow: "hidden",
                        borderRadius: 7,
                        backgroundColor: color.bgColor1,
                      }}
                    >
                      <Picker
                        ref={pickerRef}
                        style={{
                          width: 40,
                        }}
                        selectedValue={repeatAyah}
                        onValueChange={(itemValue) => setRepeatAyah(+itemValue)}
                        dropdownIconColor={color.activeIconColor}
                      >
                        <Picker.Item
                          style={{
                            color: color.txtColor,
                            backgroundColor: color.bgColor2,
                          }}
                          label="একটা নির্বাচন করুন"
                        />
                        {data.map((item) => (
                          <Picker.Item
                            style={{
                              color: color.txtColor,
                              backgroundColor: color.bgColor2,
                            }}
                            label={item.toString()}
                            value={item.toString()}
                            key={item.toString()}
                          />
                        ))}
                      </Picker>
                      <CustomText
                        style={[
                          banglaFont.banglaR,
                          { fontWeight: "bold", color: color.activeIconColor },
                        ]}
                      >
                        {repeatAyah}
                      </CustomText>
                    </View>
                  </View>
                </Pressable>
              </View>

              <>
                <View
                  className={`absolute top-0 right-0 w-full h-full flex items-center justify-center ${
                    downloadWarningModal ? "block" : "hidden"
                  }`}
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <View
                    className="w-[90%] h-[30%] p-2 rounded-lg"
                    style={{ backgroundColor: color.bgColor2 }}
                  >
                    <CustomText
                      className="text-lg"
                      style={[
                        {
                          borderBottomWidth: 0.3,
                          borderBottomColor: color.txtColor,
                          marginBottom: 5,
                        },
                        banglaFont.banglaSemi,
                      ]}
                    >
                      ডাউনলোড নোটিশঃ
                    </CustomText>
                    <View className="">
                      <CustomText style={[banglaFont.banglaR]}>
                        আপনি যে সূরাটি শুনতে চাচ্ছেন সেটি হয়ত ডাউনলোড করা নেই।
                        সূরাটি শুনতে হলে আপনাকে প্রথমে সম্পূর্ণ সূরাটি ডাউনলোড
                        করতে হবে। আপনি কি সূরাটি ডাউনলোড করতে চান?
                      </CustomText>
                    </View>
                    <View className="w-full absolute bottom-2 flex items-center justify-end">
                      <View className="w-full flex flex-row items-center justify-end gap-2">
                        <Pressable
                          style={{
                            fontSize: 11,
                            color: color.txtColor,
                            borderWidth: 0.3,
                            borderColor: color.txtColor,
                            borderRadius: 2,
                            paddingVertical: 3,
                            paddingHorizontal: 15,
                            backgroundColor: color.bgColor1,
                          }}
                          onPress={() => {
                            setDownloadWarningModal(false);
                            vibrate();
                          }}
                        >
                          <View className="flex justify-center items-center">
                            <CustomText
                              className=""
                              style={[banglaFont.banglaSemi]}
                            >
                              না
                            </CustomText>
                          </View>
                        </Pressable>
                        <Pressable
                          style={{
                            fontSize: 11,
                            color: color.txtColor,
                            borderWidth: 0.3,
                            borderColor: color.txtColor,
                            borderRadius: 2,
                            paddingVertical: 3,
                            paddingHorizontal: 15,
                            backgroundColor: color.bgColor1,
                          }}
                          onPress={() => {
                            vibrate();
                            setDownloadWarningModal(false);
                            downloadSurah();
                          }}
                        >
                          <View className="flex justify-center items-center">
                            <CustomText
                              className=""
                              style={[banglaFont.banglaSemi]}
                            >
                              হ্যাঁ
                            </CustomText>
                          </View>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </View>
              </>

              <>
                <View
                  className={`absolute top-0 right-0 w-full h-full flex items-center justify-center ${
                    downloadModal ? "block" : "hidden"
                  }`}
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <View
                    className="w-[90%] h-[150] p-2 rounded-lg"
                    style={{ backgroundColor: color.bgColor2 }}
                  >
                    <CustomText
                      className="text-lg"
                      style={[
                        {
                          borderBottomWidth: 0.3,
                          borderBottomColor: color.txtColor,
                          marginBottom: 5,
                        },
                        banglaFont.banglaSemi,
                      ]}
                    >
                      ডাউনলোড হচ্ছেঃ
                    </CustomText>
                    <View className="">
                      <>
                        <View className="w-full flex flex-row items-center justify-between px-2">
                          <CustomText
                            className="font-bold"
                            style={[{ color: color.activeIconColor }]}
                          >
                            {convertToBanglaNumber(
                              numDownloadedFiles.toString()
                            )}
                          </CustomText>
                          <CustomText
                            className="font-bold"
                            style={[{ color: color.activeIconColor }]}
                          >
                            {convertToBanglaNumber(
                              surahDetails.totalAyah.toString()
                            )}
                          </CustomText>
                        </View>
                        <View className="px-2">
                          <Slider
                            value={numDownloadedFiles}
                            minimumValue={1}
                            maximumTrackTintColor={color.maximumTintColor}
                            minimumTrackTintColor={color.activeIconColor}
                            maximumValue={surahDetails.totalAyah}
                            thumbStyle={{
                              backgroundColor: color.activeIconColor,
                            }}
                            thumbTouchSize={{ width: 50, height: 50 }}
                            step={1}
                            trackStyle={{ height: 6 }}
                            disabled
                          />
                        </View>
                      </>
                      <CustomText
                        style={[banglaFont.banglaSemi]}
                        className="px-2"
                      >
                        দয়া করে ডাউনলোড হওয়া পর্যন্ত অপেক্ষা করুন।
                      </CustomText>
                    </View>
                  </View>
                </View>
              </>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default SingleSurah;
