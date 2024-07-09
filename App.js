import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import Header from "./Header";
import Input from "./Input";

export default function App() {
  const appName = "Summer 2024 class";

  const [receivedText, setReceivedText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // To receive data add a parameter
  function handleInputData(data) {
    console.log("callback fn called from child component with data: ", data);
    setReceivedText(data);
    setModalVisible(false);
  }


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Header name={appName} theme="dark">
        {/* <Text> This is a child component</Text>
        <Text> This is another child component</Text> */}
      </Header>
      <Button title="Add a goal" onPress={() => {setModalVisible(true)}}></Button>
      {/* set up a callback function */}
      <Input inputHandler={handleInputData} isModalVisible={modalVisible}/> 
      {/* use the state variable to render the received data */}
      <Text>{receivedText}</Text>
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
