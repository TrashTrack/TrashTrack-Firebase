import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen() {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    // Request location permission and fetch the location
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      // Get current location of the user
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922, // Controls zoom level of the map
        longitudeDelta: 0.0421,
      });
    };

    getLocation();
  }, []);

  if (!region) {
    return (
      <Image source={require("../Loading.gif")} style={styles.loading}></Image>
    ); // Display loading message while fetching location
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map} // Apply the style to the map to control its size
        region={region} // Set region to user's current location
        showsUserLocation={true} // Display the user's location on the map
        followUserLocation={true} // Keep following user's location
        provider="google" // Default provider (can use OpenStreetMap as well if configured)
      >
        <Marker
          coordinate={region} // Marker at user's current location
          title="Your Location"
          description="You are here"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
  },
  map: {
    position: "absolute",
    top: 0,
    width: "100%", // Set the map width to 100% of the screen width
    height: Dimensions.get("window").height * 0.98, // Set the height to 70% of the screen height
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
