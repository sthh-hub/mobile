import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native";
import { writeToDB } from "../Firebase/firestoreHelper";

const GoalUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const users = data.forEach((userData) => {
          writeToDB(userData, 'goals/${id}/users');
        });
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserData();
  }, []);

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
};

export default GoalUsers;
