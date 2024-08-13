import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { auth } from "../Firebase/firebaseSetup";
import { signOut } from "firebase/auth";
import LocationManager from "./LocationManager";
import NotificationManager from "./NotificationManager";

const Profile = ({ navigation }) => {
  return (
    <View>
      <Button title="Log out" onPress={() => signOut(auth)} />
      <Text>Profile of user with id: {auth.currentUser.uid}</Text>
      <LocationManager />
      <NotificationManager />
    </View>
  );
};

export default Profile;