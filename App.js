import { View, Text, Button } from 'react-native';
import React from 'react';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
console.log(Stack);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'
        screenOptions={{
          headerStyle: { backgroundColor: 'darkmagenta' },
          headerTintColor: 'white',
        }}>
        <Stack.Screen name="Home" component={Home}
          options={{
            title: 'All Goals',
          }} />
        <Stack.Screen name="Details"
          component={GoalDetails}
          options={({ route }) => {
            return {
              title: route.params.goalObj.text,
              headerRight: () => {
                return <Button title="Warning"
                  onPress={() => (
                    console.log('Warning'))} />
              }
            }
          }} />
      </Stack.Navigator>
    </ NavigationContainer>
  );
}
