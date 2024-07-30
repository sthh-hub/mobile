import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import createUserWithEmailAndPassword from "firebase/auth";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const signupHandler = () => {
    console.log("Signup");
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
          onChangeText={setPassword}
          placeholder="Email"
        />
        <Text>password</Text>
        <TextInput
          style={styles.inputStyle}
          value={password}
          secureTextEntry={true}
          onChangeText={setEmail}
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
