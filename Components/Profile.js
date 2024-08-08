import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { auth } from "../Firebase/firebaseSetup";
import { signOut } from "firebase/auth";
import LocationManager from "./LocationManager";

const Profile = ({ navigation }) => {
  return (
    <View>
      <Button title="Log out" onPress={() => signOut(auth)} />
      <Text>Profile of user with id: {auth.currentUser.uid}</Text>
      <LocationManager />
    </View>
  );
};

export default Profile;
