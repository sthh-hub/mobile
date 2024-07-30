import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signupHandler = () => {
    console.log("Login");
  };
  const loginHandler = () => {
    navigation.replace("Signup");
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
      </View>
      <View>
        <Button title="Log in" onPress={signupHandler} />
        <Button title="New user? Create an account" onPress={loginHandler} />
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
