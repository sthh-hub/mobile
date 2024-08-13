import React from "react";
import { View, Button, Alert } from "react-native";
import * as Notifications from "expo-notifications";

const NotificationManager = () => {
  const [response, requestPermission] = Notifications.usePermissions();

  async function scheduleNotificationHandler() {
    try {
      // Verify permission before continuing
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give permission to use notification services");
        return;
      }
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Goal Reminder",
          body: "Don't forget to add a goal!",
        },
        trigger: {
          seconds: 5,
        },
      });
      console.log("Notification scheduled");
    } catch (err) {
      console.log("Notification services error: ", err);
    }
  }

  async function verifyPermission() {
    if (response.granted) {
      return true;
    }
    // Request permission if not granted
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  }

  return (
    <View>
      <Button
        title="Remind me to add a goal"
        onPress={scheduleNotificationHandler}
      />
    </View>
  );
};

export default NotificationManager;
