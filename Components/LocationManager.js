import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Button, Alert } from "react-native";
import * as Location from "expo-location";
import { mapsApiKey } from "@env";

const LocationManager = () => {
  const [response, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);

  async function verifyPermission() {
    console.log("response: ", response);
    if (response.granted) {
      return true;
    }
    // Request permission if not granted
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  }

  async function locateUserHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert("You need to give permission to access location");
      return;
    }
    try {
      const result = await Location.getCurrentPositionAsync();
      console.log("result: ", result);
      setLocation({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Locate Me" onPress={locateUserHandler} />
      {location ? (
        <Image
          style={styles.image}
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`,
          }}
        />
      ) : (
        <Text>No location yet.</Text>
      )}
    </View>
  );
};

export default LocationManager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 400,
    height: 400,
  },
});
