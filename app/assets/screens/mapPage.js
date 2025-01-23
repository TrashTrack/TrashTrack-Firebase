import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { database, ref, onValue } from "../firebaseConfig"; // Import the required Firebase methods

export default function MapScreen() {
  const [region, setRegion] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null); // State for driver location from Firebase

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

    // Set up Firebase listener for the driver location
    const driverLocationRef = ref(database, "driverLocation");

    // Listen for updates in real-time to the driver location
    onValue(driverLocationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDriverLocation({
          latitude: data.latitude,
          longitude: data.longitude,
        });
      }
    });

    // Clean up listener on component unmount
    return () => {
      // Firebase v9+ automatically cleans up the listener
    };
  }, []); // Empty dependency array to run only once when the component mounts

  if (!region || !driverLocation) {
    return <Image source={require("../Loading.gif")} style={styles.loading} />;
    // Display loading message while fetching location
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        followUserLocation={true}
        provider="google"
      >
        <Marker
          coordinate={region} // Marker at user's current location
          title="Your Location"
          description="You are here"
        />
        {driverLocation && (
          <Marker
            coordinate={driverLocation} // Marker for the driver location from Firebase
            title="Driver Location"
            description="Driver's current location"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: Dimensions.get("window").height * 0.98,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
