import { View, Text, Image, BackHandler, ToastAndroid } from "react-native";
import SearchSection from "../components/SearchSection";
import ShortSurah from "../components/ShortSurah";
import { useSelector } from "react-redux";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const { color, lastReadSurah, favouriteSurahList } = useSelector(
    (state) => state.nobleQuran
  );
  const { list, loading } = useSelector((state) => state.shortSurahList);
  const [lastReadedSurah, setLastReadedSurah] = useState(0);

  useEffect(() => {
    if (isFocused) {
      let timer;
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          if (timer) {
            BackHandler.exitApp();
          } else {
            timer = setTimeout(() => {
              timer = null;
            }, 500);
            ToastAndroid.show("Double Press To Exit", ToastAndroid.SHORT);
          }
          return true;
        }
      );

      return () => {
        backHandler.remove();
      };
    }
  }, [isFocused]);

  useEffect(() => {
    if (lastReadSurah || lastReadSurah > -1) {
      setLastReadedSurah(lastReadSurah - 1);
    }
  }, [lastReadSurah]);

  return (
    <View
      className="w-full h-full"
      style={{
        backgroundColor: color.bgColor2,
      }}
    >
      <SearchSection />
      <View
        className="container mx-auto p-0.5 px-1 pb-0"
        style={{
          flex: 1,
        }}
      >
        {loading ? (
          <View
            className="flex flex-row items-center justify-center"
            style={{
              flex: 1,
            }}
            key={Object.keys(favouriteSurahList)}
          >
            <View className="w-8 h-8 flex flex-row items-center">
              <Image
                className="w-full h-full"
                source={require("../../assets/image/loading.gif")}
              />
            </View>
          </View>
        ) : (
          <>
            {list.length > 0 ? (
              <FlashList
                data={list}
                {...(lastReadedSurah > -1 && {
                  initialScrollIndex: lastReadedSurah,
                })}
                renderItem={({ item }) => {
                  return <ShortSurah surah={item} />;
                }}
                estimatedItemSize={97}
              />
            ) : (
              <View
                className="flex flex-row items-center justify-center"
                style={{
                  flex: 1,
                }}
              >
                <Text
                  className="text-lg font-semibold text-center"
                  style={{ color: color.txtColor }}
                >
                  Your Search Key is Wrong
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default Home;
