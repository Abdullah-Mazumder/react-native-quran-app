import { useEffect } from "react";
import { BackHandler } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const useGoToBackHandler = (screenName) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  useEffect(() => {
    if (isFocused) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          navigation.navigate(screenName || "Home");
          return true;
        }
      );

      return () => {
        backHandler.remove();
      };
    }
  }, [isFocused]);
  return <></>;
};

export default useGoToBackHandler;
