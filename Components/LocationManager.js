import { Alert, Button, StyleSheet, Image, View } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { mapsApiKey } from "@env";
import { Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WriteWithIdToDB, getADoc } from "../Firebase/firestoreHelper";
import { auth } from "../Firebase/firebaseSetup";

const windowWidth = Dimensions.get("window").width;

const LocationManager = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [response, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (route.params?.selectedLocation) {
      setLocation(route.params.selectedLocation);
    }
  }, [route.params]);

  useEffect(() => {
    async function getUserData() {
      const userData = await getADoc("users", auth.currentUser.uid);
      if (userData) {
        setLocation(userData.location);
      }
    }
    getUserData();
  }, []);

  async function verifyPermission() {
    console.log(response);
    if (response.granted) {
      return true;
    }
    // what if i don't have permission? let's ask for permission
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  }

  async function locateUserHandler() {
    try {
      //verify permission before continuing
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give permission to use location services");
        return;
      }
      const result = await Location.getCurrentPositionAsync();

      setLocation({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
      });
    } catch (err) {
      console.log("get current position ", err);
    }
  }

  function handleSaveLocation() {
    console.log(location);
    WriteWithIdToDB({ location }, `users`, auth.currentUser.uid);
    navigation.navigate("Home");
  }

  return (
    <View>
      <Button title="Find my location" onPress={locateUserHandler} />
      <Button
        title="Interactive Map Button"
        onPress={() => {
          navigation.navigate("Map");
        }}
      />
      {location && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`,
          }}
          style={styles.image}
        />
      )}
      <Button title="Save location" onPress={handleSaveLocation} />
    </View>
  );
};

export default LocationManager;

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: windowWidth,
  },
});
