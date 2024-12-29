import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

import { TouchableOpacity } from "react-native";
import Home from "./screens/Home.js";
import Search from "./screens/SearchNews.js";
import Saved from "./screens/SavedArticles.js";
import DetailScreen from "./screens/DetailScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";

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
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="person" size={20} />
          </TouchableOpacity>
        ),
      })}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="search" size={20} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Saved"
      component={Saved}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="save" size={20} color={color} />
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
  </Stack.Navigator>
);

// Main App component
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </PaperProvider>
  );
}
