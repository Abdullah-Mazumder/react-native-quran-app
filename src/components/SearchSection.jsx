import { View, TextInput, Image } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import IonicIcon from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { getShortSurahList } from "../store/actions/shortSurahListAction";
import { Pressable } from "@react-native-material/core";
import { useSelector } from "react-redux";
import { SET_DARK_MODE, SET_SEARCH_TERM } from "../store/constants/constant";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import vibrate from "../utils/vibratie";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchSection = () => {
  const dispatch = useDispatch();
  const { color, isDark, searchTerm } = useSelector(
    (state) => state.nobleQuran
  );

  let t;

  const search = (key) => {
    dispatch({ type: SET_SEARCH_TERM, payload: key });
    if (t) {
      clearTimeout(t);
    }
    t = setTimeout(() => {
      dispatch(getShortSurahList(key));
    }, 800);
  };

  const toggleTheme = async () => {
    if (isDark) {
      dispatch({ type: SET_DARK_MODE, payload: false });
      await AsyncStorage.setItem("quranApptheme", JSON.stringify(false));
    } else {
      dispatch({ type: SET_DARK_MODE, payload: true });
      await AsyncStorage.setItem("quranApptheme", JSON.stringify(true));
    }
  };

  useEffect(() => {
    const fn = async () => {
      await NavigationBar.setBackgroundColorAsync(color.bgColor1);
    };
    fn();
  }, [color]);
  return (
    <View
      style={{
        backgroundColor: color.bgColor1,
      }}
      className="p-2 w-full pr-0"
    >
      <View className="flex flex-row items-center justify-between gap-2 w-full">
        <View className="w-9 h-9">
          <Image
            source={require("../../assets/image/brand.png")}
            className="w-full h-full"
          />
        </View>
        <View className="relative w-[250px]">
          <TextInput
            style={{
              backgroundColor: color.bgColor2,
              color: color.txtColor,
              fontSize: 14,
            }}
            className="rounded-lg p-1 pl-3"
            placeholder="Search Surah..."
            multiline={false}
            value={searchTerm}
            placeholderTextColor={color.txtColor}
            onChangeText={(value) => search(value)}
          ></TextInput>
          <View className="absolute top-2 right-3">
            <IonicIcon name="search" size={20} color={color.txtColor} />
          </View>
        </View>
        <View>
          <Pressable>
            {isDark ? (
              <View>
                <IonicIcon
                  name="moon-sharp"
                  solid
                  size={30}
                  style={{ color: color.activeIconColor }}
                  onPress={() => {
                    vibrate();
                    toggleTheme();
                  }}
                />
              </View>
            ) : (
              <View>
                <IonicIcon
                  name="sunny"
                  solid
                  size={30}
                  style={{ color: color.activeIconColor }}
                  onPress={() => {
                    vibrate();
                    toggleTheme();
                  }}
                />
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SearchSection;
