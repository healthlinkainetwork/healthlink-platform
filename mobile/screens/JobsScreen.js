// mobile/screens/JobsScreen.js
import React from "react";
import { SafeAreaView, FlatList, Text, StyleSheet } from "react-native";

const MOCK_JOBS = [
  {
    id: "job_1",
    title: "Evening PCA shift",
    location: "Norfolk, VA",
    rate: "$32/hr • 5 hrs",
  },
  {
    id: "job_2",
    title: "Weekend CNA coverage",
    location: "Virginia Beach, VA",
    rate: "$30/hr • 8 hrs",
  },
];

export default function JobsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Available Jobs</Text>
      <FlatList
        data={MOCK_JOBS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.jobItem}>
            {item.title}{"\n"}
            <Text style={styles.jobSub}>{item.location}</Text>{"\n"}
            <Text style={styles.jobSub}>{item.rate}</Text>
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
  jobItem: {
    fontSize: 15,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e7ff",
    backgroundColor: "#f8f9ff",
  },
  jobSub: {
    fontSize: 13,
    color: "#555",
  },
  separator: {
    height: 10,
  },
});
