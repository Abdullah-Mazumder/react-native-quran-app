import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicon from "react-native-vector-icons/Ionicons";
import Splash from "./screens/Splash";
import Home from "./screens/Home";
import SingleSurah from "./screens/SingleSurah";
import Favourites from "./screens/Favourites";

import Icon from "./components/Icon";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AboutUs from "./screens/AboutUs";
import Settings from "./screens/Settings";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const NobleQuranTab = () => {
  const { color } = useSelector((state) => state.nobleQuran);
  useEffect(() => {}, []);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 50,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: color.bgColor1,
        },
      }}
    >
      <Tab.Screen
        name="SingleSurah"
        component={SingleSurah}
        options={{
          tabBarIcon: ({ _color, focused }) => {
            return <Icon name="book-open" focused={focused} />;
          },
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ _color, focused }) => {
            return <Icon name="home" focused={focused} />;
          },
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          tabBarIcon: ({ _color, focused }) => {
            return <Icon name="heart" solid focused={focused} />;
          },
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ _color, focused }) => {
            return (
              <Ionicon
                name="settings"
                size={20}
                color={focused ? color.activeIconColor : color.txtColor}
              />
            );
          },
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

const MainApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="NobleQuran" component={NobleQuranTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainApp;
