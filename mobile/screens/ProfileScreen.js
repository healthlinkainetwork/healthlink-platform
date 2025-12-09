// mobile/screens/ProfileScreen.js
import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Your Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>Jane Caregiver (Sample)</Text>

        <Text style={styles.label}>Discipline</Text>
        <Text style={styles.value}>CNA</Text>

        <Text style={styles.label}>Average Rating</Text>
        <Text style={styles.value}>4.8 (sample)</Text>

        <Text style={styles.label}>Level</Text>
        <Text style={styles.value}>Level 2 • Rising Star</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Coming soon</Text>
        <Text style={styles.value}>• Edit profile</Text>
        <Text style={styles.value}>• Upload certifications</Text>
        <Text style={styles.value}>• View completed shifts</Text>
        <Text style={styles.value}>• Gamification & badges</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f9ff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#d0e2ff",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
  },
  value: {
    fontSize: 14,
    marginBottom: 4,
  },
});
