import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.card}>
        <Text style={styles.title}>HealthLink AI Network</Text>
        <Text style={styles.subtitle}>
          Starter mobile app. Your dev will turn this into:
        </Text>
        <Text style={styles.bullet}>• Caregiver onboarding</Text>
        <Text style={styles.bullet}>• Job browsing & acceptance</Text>
        <Text style={styles.bullet}>• Ratings & gamification</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24
  },
  card: {
    width: "100%",
    borderRadius: 16,
    padding: 24,
    backgroundColor: "#f5f9ff",
    borderWidth: 1,
    borderColor: "#d0e2ff"
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 12
  },
  bullet: {
    fontSize: 14,
    marginBottom: 4
  }
});
