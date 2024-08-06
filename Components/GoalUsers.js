import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { FlatList } from "react-native";
import { writeToDB, readAllDocs } from "../Firebase/firestoreHelper";
import LocationManager from "./LocationManager";

const GoalUsers = ({ id }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, [id]);

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
        writeToDB(userData, `goals/${id}/users`);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchAllData() {
    try {
      const dataFromFirestore = await readAllDocs(`goals/${id}/users`);
      if (!dataFromFirestore || dataFromFirestore.length === 0) {
        console.log("No data found in Firestore");
        fetchUserData();
      } else {
        console.log("Data found in Firestore");
        setUsers(dataFromFirestore);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View>
      <FlatList 
        data={users} 
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>} 
      />
    </View>
  );
};

export default GoalUsers;