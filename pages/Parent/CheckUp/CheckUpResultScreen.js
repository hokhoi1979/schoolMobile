import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

const CheckUpResultScreen = () => {
  const {
    checkup: resultData,
    loading,
    error,
  } = useSelector((state) => state.resultCheckUpParent);

  const student = resultData?.data?.data;

  useEffect(() => {
    console.log("✅ Result Data:", resultData);
  }, [resultData]);

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.alertBoxError}>
          <Text style={styles.alertText}>
            ❌ Failed to load health check result. Please try again later.
          </Text>
        </View>
      );
    }

    if (!student) {
      return (
        <View style={styles.alertBoxWarning}>
          <Text style={styles.alertText}>
            ⚠️ Student information not found.
          </Text>
        </View>
      );
    }

    if (student.status === "SKIPPED") {
      return (
        <View style={styles.center}>
          <AntDesign name="closecircle" size={48} color="#dc2626" />
          <Text style={styles.skippedText}>
            Student was absent. No result available.
          </Text>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.content}>
        {/* Student Info */}
        <View style={styles.boxBlue}>
          <Text style={styles.boxTitleBlue}>📘 Student Information</Text>
          <Text style={styles.boxText}>
            <Text style={styles.bold}>Full Name:</Text> {student.fullname}
          </Text>
          <Text style={styles.boxText}>
            <Text style={styles.bold}>Student Code:</Text>{" "}
            {student.student_code}
          </Text>
          <Text style={styles.boxText}>
            <Text style={styles.bold}>Class:</Text> {student.className}
          </Text>
          <Text style={styles.boxText}>
            <Text style={styles.bold}>General Note:</Text>{" "}
            {student.overallNotes || "None"}
          </Text>
        </View>

        {/* Result Info */}
        <View style={styles.boxGreen}>
          <Text style={styles.boxTitleGreen}>🩺 Health Check Results</Text>
          {student.results?.length > 0 ? (
            student.results.map((res) => (
              <Text key={res.contentID} style={styles.boxText}>
                <Text style={styles.bold}>{res.contentTitle}:</Text>{" "}
                {res.value || "No data"}
                {res.note ? ` (${res.note})` : ""}
              </Text>
            ))
          ) : (
            <Text style={styles.boxText}>No detailed results available.</Text>
          )}
        </View>
      </ScrollView>
    );
  };

  return <SafeAreaView style={{ flex: 1 }}>{renderContent()}</SafeAreaView>;
};

export default CheckUpResultScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  skippedText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#dc2626",
    textAlign: "center",
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  boxBlue: {
    backgroundColor: "#eff6ff",
    borderColor: "#93c5fd",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  boxGreen: {
    backgroundColor: "#ecfdf5",
    borderColor: "#6ee7b7",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  boxTitleBlue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 10,
  },
  boxTitleGreen: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#059669",
    marginBottom: 10,
  },
  boxText: {
    fontSize: 14,
    marginBottom: 6,
    color: "#374151",
  },
  bold: {
    fontWeight: "600",
  },
  alertBoxError: {
    backgroundColor: "#fef2f2",
    padding: 16,
    margin: 20,
    borderRadius: 12,
    borderColor: "#fecaca",
    borderWidth: 1,
  },
  alertBoxWarning: {
    backgroundColor: "#fef9c3",
    padding: 16,
    margin: 20,
    borderRadius: 12,
    borderColor: "#fde68a",
    borderWidth: 1,
  },
  alertText: {
    color: "#b91c1c",
    fontSize: 14,
    fontWeight: "500",
  },
});
