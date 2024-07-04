import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import Header from "./Header";

export default function App() {
  const appName = "Summer 2024 class";
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Header name = {appName} theme="dark">
        {/* <Text> This is a child component</Text>
        <Text> This is another child component</Text> */}
      </Header>
      <TextInput 
        value={text}
        onChangeText={function (changedText) 
          {
            console.log("changedText: ", changedText);
            setText(changedText);
            console.log("text: ", text);
          }}
        placeholder="Enter your name" 
        autoCapitalize={true}
        />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
