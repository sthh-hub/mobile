import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import Home from "./Components/Home";
import GoalDetails from "./Components/GoalDetails";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import PressableButton from "./Components/PressableButton";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "./Firebase/firebaseSetup";
import { onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return unsubscribe;
  }, []);

  const AuthStack = (
    <>
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
    </>
  );
  const AppStack = (
    <>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: "All Goals",
          headerRight: () => (
            <PressableButton
              pressedFunction={() => {
                navigation.navigate("Profile");
              }}
            >
              <Text>Profile</Text>
            </PressableButton>
          ),
        })}
      />
      <Stack.Screen
        name="Details"
        component={GoalDetails}
        options={({ route }) => {
          return {
            title: route.params.goalObj.text,
            headerRight: () => {
              return (
                <Button
                  title="Warning"
                  onPress={() => console.log("Warning")}
                />
              );
            },
          };
        }}
      />
      <Stack.Screen name="Profile" component={Profile} />
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signup"
        screenOptions={{
          headerStyle: { backgroundColor: "darkmagenta" },
          headerTintColor: "white",
        }}
      >
        {isAuthenticated ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
