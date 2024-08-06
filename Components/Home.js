import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { writeToDB, deleteFromDB } from "../Firebase/firestoreHelper";
import { auth, database } from "../Firebase/firebaseSetup";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { Unsubscribe } from "firebase/app-check";

export default function Home({ navigation }) {
  const appName = "Summer 2024 class";

  const [receivedText, setReceivedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const collectionName = "goals";

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(database, collectionName),
        where("owner", "==", auth.currentUser.uid)
      ),
      (querysnapShot) => {
        let newArray = [];
        if (!querysnapShot.empty) {
          querysnapShot.forEach((docSnapshot) => {
            newArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
          });
        }
        setGoals(newArray);
      }
    );
    return () => unsubscribe();
  }, []);

  async function retrieveUploadImage(uri) {
    try {
      const response = await fetch(uri);
      console.log("response: ", response);
      const blob = await response.blob();

      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = await ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, imageBlob);
    } catch (error) {
      console.error(error);
    }
  }

  // To receive data add a parameter
  function handleInputData(data) {
    console.log("data: ", data);


    if (data.uri) {
      retrieveUploadImage(data.uri);
    }

    setReceivedText(data);
    setModalVisible(false);

    const newGoal = {
      text: data.text,
       owner: auth.currentUser.uid,
    };
    writeToDB(newGoal, "goals");
  }

  function handleInputCancel(isVisible) {
    setModalVisible(isVisible);
  }

  function handleDeleteGoal(deletedId) {
    deleteFromDB(deletedId, "goals");
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Header name={appName} theme="dark">
          {/* <Text> This is a child component</Text>
        <Text> This is another child component</Text> */}
        </Header>
        <View style={styles.buttonStyle}>
          <PressableButton
            pressedFunction={() => {
              setModalVisible(true);
            }}
            componentStyle={styles.goalButtonStyle}
          >
            <Text>Add a goal</Text>
          </PressableButton>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {/* set up a callback function */}
        {goals.length === 0 ? (
          <Text>Please Add a Goal</Text>
        ) : (
          <FlatList
            renderItem={({ item }) => {
              return <GoalItem goal={item} deleteHandler={handleDeleteGoal} />;
            }}
            data={goals}
          />
          // <ScrollView>
          //   {goals.map((goalObj) => {
          //     console.log(goalObj);
          //     return (
          //       <View key={goalObj.id} style={styles.textContainer}>
          //         <Text style={styles.textSytle}>{goalObj.text}</Text>
          //       </View>
          //     );
          //   })}
          // </ScrollView>
        )}
        <View style={styles.textContainer}>
          <Input
            inputHandler={handleInputData}
            inputCanceler={handleInputCancel}
            isModalVisible={modalVisible}
          />
          {/* use the state variable to render the received data */}
          {/* <Text>{receivedText}</Text> */}
        </View>
      </View>
      <StatusBar style="auto" />
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
  textContainer: {
    padding: 5,
    borderRadius: 5,
  },
  textSytle: {
    fontSize: 25,
    margin: 10,
    color: "purple",
  },
  buttonStyle: {
    width: "30%",
    fontSize: 12,
    backgroundColor: "lightblue",
    color: "white",
    borderRadius: 5,
    margin: 5,
  },
  topContainer: {
    flex: 1,
    marginTop: 70,
    alignItems: "center",
  },
  bottomContainer: {
    flex: 5,
    backgroundColor: "lightyellow",
    width: "100%",
    alignItems: "center",
  },
  buttonStyle: {
    marginLeft: 5,
  },
  goalButtonStyle: {
    backgroundColor: "lightblue",
    padding: 7,
    margin: 7,
    borderRadius: 5,
  },
});
