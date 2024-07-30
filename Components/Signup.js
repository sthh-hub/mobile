import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";
import { auth, createUser } from "../Firebase/firebaseSetup";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const signupHandler = () => {
    if (!email.length) {
        Alert.alert("Email should not be empty");
        return;
    }
    if (password !== confirmPassword) {
        Alert.alert("Passwords do not match");
        return;
    }
    createUser(auth, email, password);
  };
  const loginHandler = () => {
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Email Address</Text>
        <TextInput
          style={styles.inputStyle}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <Text>password</Text>
        <TextInput
          style={styles.inputStyle}
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
          placeholder="Password"
        />
        <Text>confirmed password</Text>
        <TextInput
          style={styles.inputStyle}
          value={confirmPassword}
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
          placeholder="Password"
        />
      </View>
      <View>
        <Button title="Register" onPress={signupHandler} />
        <Button title="Already Registered? Login" onPress={loginHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "purple",
    backgroundColor: "lightgrey",
    margin: 10,
    padding: 10,
    width: 260,
  },
});
