import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const VaccineResultDetail = ({ route }) => {
  const { result } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Vaccination Result</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Student:</Text>
        <Text style={styles.value}>
          {result.student.account.fullname} ({result.student.student_code})
        </Text>

        <Text style={styles.label}>Class:</Text>
        <Text style={styles.value}>
          {result.student.classAssignments?.[0]?.class?.name || "N/A"}
        </Text>

        <Text style={styles.label}>Status:</Text>
        <Text style={[styles.status, { color: getStatusColor(result.status) }]}>
          {result.status}
        </Text>

        {result.status === "SUCCESS" && (
          <>
            <Text style={styles.label}>Result:</Text>
            <Text style={styles.value}>{result.result}</Text>

            <Text style={styles.label}>Note:</Text>
            <Text style={styles.note}>{result.note || "No note"}</Text>
          </>
        )}

        {result.status === "SKIPPED" && (
          <Text style={styles.note}>
            Student was absent, no result information available.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "SUCCESS":
      return "#16a34a";
    case "SKIPPED":
      return "#f59e0b";
    default:
      return "#6b7280";
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1f2937",
  },
  card: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontWeight: "bold",
    marginTop: 12,
    color: "#374151",
  },
  value: {
    color: "#1f2937",
    fontSize: 14,
    marginTop: 4,
  },
  note: {
    marginTop: 8,
    fontStyle: "italic",
    color: "#6b7280",
  },
  status: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 4,
  },
});

export default VaccineResultDetail;
