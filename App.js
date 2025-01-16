import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";


import { Provider } from "react-redux";
import store from "./store.js";

import { View, TouchableOpacity } from "react-native";
import Home from "./screens/Home.js";
import Search from "./screens/SearchNews.js";
import Saved from "./screens/SavedArticles.js";
import DetailScreen from "./screens/DetailScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import SignScreen from "./screens/SignScreen.js";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  color: {
    ...DefaultTheme.colors,
    primary: "#1C6E8C",
    secondary: "#28587B",
  },
};

// HomeStack manages screens within the Home section
const HomeStack = () => (
  <Stack.Navigator initialRouteName="HomeScreen">
    <Stack.Screen
      name="HomeScreen"
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="DetailScreen" component={DetailScreen} />
    
  </Stack.Navigator>
);

const SavedStack = () => (
  <Stack.Navigator initialRouteName="Saved Articles">
    <Stack.Screen
      name="Saved Articles"
      component={Saved}
      options={{ headerShown:true}}
    />
    <Stack.Screen name="DetailScreen" component={DetailScreen} />
    
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator initialRouteName="Searched Articles">
    <Stack.Screen
      name="Searched Articles"
      component={Search}
      options={{ headerShown:true}}
    />
    <Stack.Screen name="DetailScreen" component={DetailScreen} />
    
  </Stack.Navigator>
);

// HomeTabs wraps the Tab.Navigator and includes the HomeStack
const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: true,
      tabBarLabelPosition: "below-icon",
      headerTitle: "NewsApp",
      tabBarInactiveTintColor: "black",
      tabBarActiveTintColor: "green",
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={({ navigation }) => ({
        tabBarIcon: ({ color }) => (
          <Ionicons name="home" size={20} color={color} />
        ),
        headerRight: () => (
          <View style={{ flexDirection: "row", marginRight: 15 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignScreen")}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="log-in-outline" size={23} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("ProfileScreen")}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="person" size={20} />
            </TouchableOpacity>
          </View>
        ),
      })}
    />
    <Tab.Screen
      name="Search"
      component={SearchStack}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="search" size={20} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Saved"
      component={SavedStack}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="bookmark" size={20} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

// AppStack includes the HomeTabs and ProfileScreen for stack navigation
const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeTabs"
      component={HomeTabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="SignScreen" component={SignScreen} />
  </Stack.Navigator>
);

// Main App component
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
}
