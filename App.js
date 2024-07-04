import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from "./Header";

export default function App() {
  const appName = "Summer 2024 class";

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Header name = {appName} theme="dark">
        <Text> This is a child component</Text>
        <Text> This is another child component</Text>
      </Header>
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
