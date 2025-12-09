// mobile/screens/HomeScreen.js
import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>HealthLink AI Network</Text>
      <Text style={styles.subtitle}>Caregiver Dashboard (Preview)</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today</Text>
        <Text style={styles.cardItem}>• 0 assigned shifts</Text>
        <Text style={styles.cardItem}>• 0 new notifications</Text>
        <Text style={styles.cardItem}>• Rating: 0.0 (0 reviews)</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Shortcuts</Text>
        <Text style={styles.cardItem}>• Browse open jobs</Text>
        <Text style={styles.cardItem}>• View alerts & announcements</Text>
        <Text style={styles.cardItem}>• Update your profile</Text>
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
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
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
    marginBottom: 8,
  },
  cardItem: {
    fontSize: 14,
    marginBottom: 4,
  },
});
