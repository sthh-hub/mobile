import React, { useState } from "react";
import { View, Button, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImageManager = ({ imageUriHandler }) => {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState("");

  function handleImageuri(imageUri) {
    imageUriHandler(imageUri);
  }

  async function verifyPermissions() {
    if (status?.granted) {
      return true;
    }
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  }

  const takeImageHandler = async () => {
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        Alert.alert("You need to give permission to use the camera");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      console.log(result);
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (err) {
      console.error("take image ", err);
    }
  };

  return (
    <View>
      <Button title="Take an Image" onPress={takeImageHandler} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
      )}
    </View>
  );
};

export default ImageManager;
