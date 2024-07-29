import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { markAsWarning } from "../Firebase/firestoreHelper";
import GoalUsers from "./GoalUsers";

const GoalDetails = ({ navigation, route }) => {
  console.log(route.params);
  const { goalObj } = route.params || {};
  const [textColor, setTextColor] = useState("black");

    // const handleMoveToGoalUser = () => {
    //     navigation.navigate('GoalUsers');
    // }

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

  return (
    <View>
      {route.params ? (
        <View>
          <Text style={{ ...styles.goalText, color: textColor }}>
            You are seeing the details of the goal with text :
            {route.params.goalObj.text} and id: {route.params.goalObj.id}
          </Text>
          <GoalUsers id={route.params.goalObj.id}/>
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
