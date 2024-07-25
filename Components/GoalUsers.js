import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { FlatList } from "react-native";
import { writeToDB, readAllDocs } from "../Firebase/firestoreHelper";

const GoalUsers = ({ id }) => {
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
        data.forEach((userData) => {
          userData.name;
          writeToDB(userData, `goals/${id}/users`);
        });
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const dataFromFirestore = await readAllDocs(`goals/${id}/users`);
        if (!dataFromFirestore.length) {
          fetchUserData();
        } else {
          setUsers(dataFromFirestore);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchAllData();
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
