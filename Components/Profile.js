import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { auth } from "../Firebase/firebaseSetup";
import { signOut } from "firebase/auth";

const Profile = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.inputStyle}>Profile {auth.currentUser.uid}</Text>
      <Button title="Log out" onPress={() => signOut(auth)} />
    </View>
  );
};

export default Profile;
