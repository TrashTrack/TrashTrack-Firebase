import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { auth } from "../firebaseConfig"; // Import auth from firebaseConfig

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  // Fetch the authenticated user's information
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user data if logged in
      } else {
        // Navigate to login page if the user is not logged in
        navigation.navigate("LoginPage");
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      Alert.alert("Success", "You have been logged out.");
      navigation.navigate("LoginPage"); // Navigate to LoginPage after logout
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your Profile</Text>
      {user ? (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Email: {user.email}</Text>
        </View>
      ) : (
        <Text style={styles.infoText}>Loading user information...</Text>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  logoutButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF5722",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
