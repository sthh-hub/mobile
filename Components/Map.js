// Map.js
import React, { useState } from "react";
import { StyleSheet, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(e) => {
          setSelectedLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
          // when the user presses the map, log the event (showing latitude and logitude)
        }}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      <Button
        title="Confirm Selected Location"
        onPress={() => {
          navigation.navigate("Profile", { selectedLocation });
        }}
        disabled={!selectedLocation}
      />
    </>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
