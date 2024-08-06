import React, { useState } from "react";
import { View, Button, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImageManager = ({ imageUriHandler }) => {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState("");

  async function verifyPermission() {
    console.log('response: ', response);
    if (response.granted) {
      return true;
    }
    // what if i don't have permission? let's ask for permission
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  }

  async function takeImageHandler() {
    // call launchcameraasync and console log the result
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give permission to launch camera");
        return;
      }
      // we will only get to this line if we have permission
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      setImageUri(result.assets[0].uri);
      imageUriHandler(result.assets[0].uri);
      // store the uri from the first item in the assets array
    } catch (err) {
      console.log("take image ", err);
    }
  }

  return (
    <View>
      <Button title="Take an Image" onPress={takeImageHandler} />
      {imageUri && (
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.image}
        />
      )}
    </View>
  );
};

export default ImageManager;
