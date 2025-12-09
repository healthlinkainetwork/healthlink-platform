// mobile/screens/NotificationsScreen.js
import React from "react";
import { SafeAreaView, FlatList, Text, StyleSheet } from "react-native";

const MOCK_NOTIFICATIONS = [
  {
    id: "ntf_1",
    title: "Welcome to HealthLink",
    body: "Thanks for joining the network. Complete your profile to unlock more jobs.",
  },
  {
    id: "ntf_2",
    title: "New shifts nearby",
    body: "There are 3 new open shifts posted in your area.",
  },
];

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Alerts & Announcements</Text>
      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            {"\n"}
            <Text style={styles.cardBody}>{item.body}</Text>
          </Text>
        )}
        ItemSeparatorComponent={() => <Text style={styles.separator} />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    fontSize: 14,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e7ff",
    backgroundColor: "#f5f9ff",
  },
  cardTitle: {
    fontWeight: "700",
  },
  cardBody: {
    color: "#444",
  },
  separator: {
    height: 10,
  },
});
