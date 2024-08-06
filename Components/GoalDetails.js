import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { markAsWarning } from "../Firebase/firestoreHelper";
import GoalUsers from "./GoalUsers";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Firebase/firebaseSetup";

const GoalDetails = ({ navigation, route }) => {
  console.log(route.params);
  const { goalObj } = route.params || {};
  const [textColor, setTextColor] = useState("black");
  const [url, setUrl] = useState("");

  useEffect(() => {
    async function getImageUrl() {
      if (route.params) {
        const url = await getDownloadURL(
          ref(storage, route.params.goalObj.imageUri)
        );
      }
    }
    getImageUrl();
    setUrl(url);
  }, []);

  const handleWarningPress = () => {
    markAsWarning(goalObj.id, "goals");
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={handleWarningPress}
          title="Warning"
          style={styles.warningButton}
        />
      ),
    });
  }, [navigation]);

  console.log("id: ", route.params.goalObj.id);

  return (
    <View>
      {route.params ? (
        <View>
          <Text style={{ ...styles.goalText, color: textColor }}>
            You are seeing the details of the goal with text :
            {route.params.goalObj.text} and id: {route.params.goalObj.id}
            and imageUrl: {route.params.goalObj.imageUri}
          </Text>
          <GoalUsers id={route.params.goalObj.id} />
        </View>
      ) : (
        <Text> More Details </Text>
      )}
    </View>
  );
};

export default GoalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  goalText: {
    fontSize: 18,
  },
  warningButton: {
    color: "grey",
  },
});
