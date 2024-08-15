import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  FlatList,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { writeToDB, deleteFromDB } from "../Firebase/firestoreHelper";
import { auth, database } from "../Firebase/firebaseSetup";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { storage } from "../Firebase/firebaseSetup";
import { ref, uploadBytesResumable } from "firebase/storage";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export default function Home({ navigation }) {
  const appName = "Summer 2024 class";

  const [receivedText, setReceivedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const [pushToken, setPushToken] = useState("");
  const collectionName = "goals";

  useEffect(() => {
    async function getToken() {
      try {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
          Alert.alert(
            "You need to give permission to use notification services"
          );
          return;
        }
        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
          });
        }
        const tokenData = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        });
        console.log("tokenData: ", tokenData);
        setPushToken(tokenData.data);
      } catch (error) {
        console.error("Error getting token: ", error);
      }
    }
    getToken();
  }, []);

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

  // Push Notifications Permissions
  const [response, requestPermission] = Notifications.usePermissions();

  async function verifyPermission() {
    if (response?.granted) {
      return true;
    }
    // Request permission if not granted
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  }

  async function handleInputData(data) {
    console.log("callback fn called with ", data);
    let imageUri = null;

    if (data.imageUri) {
      try {
        const response = await fetch(data.imageUri);
        const blob = await response.blob();
        const imageName = data.imageUri.substring(
          data.imageUri.lastIndexOf("/") + 1
        );
        const imageRef = ref(storage, `images/${imageName}`);
        const uploadResult = await uploadBytesResumable(imageRef, blob);
        imageUri = uploadResult.metadata.fullPath;
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }

    const newGoal = {
      text: data.text,
      owner: auth.currentUser.uid,
      imageUri: imageUri,
    };

    writeToDB(newGoal, "goals");
    setModalVisible(false);
  }

  function handleInputCancel(isVisible) {
    setModalVisible(isVisible);
  }

  function handleDeleteGoal(deletedId) {
    deleteFromDB(deletedId, "goals");
  }

  function pushNotificationHandler() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        to: pushToken,
        title: "Push Notification",
        body: "This is a push notification",
      }),
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Button title="Push Notification" onPress={pushNotificationHandler} />

        <Header name={appName} theme="dark">
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
        )}
        <View style={styles.textContainer}>
          <Input
            inputHandler={handleInputData}
            inputCanceler={handleInputCancel}
            isModalVisible={modalVisible}
          />
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
    marginTop: 30,
    alignItems: "center",
  },
  bottomContainer: {
    flex: 3,
    backgroundColor: "lightyellow",
    width: "100%",
    alignItems: "center",
  },
  goalButtonStyle: {
    backgroundColor: "lightblue",
    padding: 7,
    margin: 7,
    borderRadius: 5,
  },
});
