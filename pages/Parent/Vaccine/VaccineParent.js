import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { fetchVaccineParent } from "../../../redux/parent/vaccine/getVaccineParentSlice";
import { fetchVaccineParentResult } from "../../../redux/parent/vaccine/getVaccineParentResultSlice";
import { fetchAcceptVaccine } from "../../../redux/parent/vaccine/getVaccineParentAcceptSlice";
import { fetchDeclineVaccine } from "../../../redux/parent/vaccine/getVaccineParentDeclineSlice";

function VaccineParent() {
  const dispatch = useDispatch();

  const { vaccine, loading, error } = useSelector(
    (state) => state.vaccineParent
  );
  const { vaccine: resultList, error: resultError } = useSelector(
    (state) => state.vaccineParentResult
  );

  useEffect(() => {
    dispatch(fetchVaccineParent());
    dispatch(fetchVaccineParentResult());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error("❌ Error loading vaccination data:", error);
    }
    if (resultError) {
      console.error("❌ Error loading result data:", resultError);
    }
  }, [error, resultError]);

  const handleAccept = async (item) => {
    const payload = {
      studentID: item.studentID,
      vaccinationEventID: item.vaccinationEventID,
    };

    try {
      const res = await dispatch(fetchAcceptVaccine(payload));
      console.log("✅ Accept success:", res);
      dispatch(fetchVaccineParent());
    } catch (err) {
      console.error("❌ Accept error:", err);
      Alert.alert("Error", "Failed to accept vaccination.");
    }
  };

  const handleDecline = (item) => {
    Alert.prompt(
      "Decline Vaccination",
      "Please provide a reason for declining:",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Submit",
          onPress: async (reason) => {
            if (!reason?.trim()) return;
            const payload = {
              studentID: item.studentID,
              vaccinationEventID: item.vaccinationEventID,
              note: reason,
            };
            try {
              const res = await dispatch(fetchDeclineVaccine(payload));
              console.log("✅ Decline success:", res);
              dispatch(fetchVaccineParent());
            } catch (err) {
              console.error("❌ Decline error:", err);
              Alert.alert("Error", "Failed to decline vaccination.");
            }
          },
        },
      ],
      "plain-text"
    );
  };

  const mapStatusLabel = (status) => {
    switch (status?.toUpperCase()) {
      case "ACCEPTED":
        return { label: "Accepted", color: "#16a34a" };
      case "DECLINED":
        return { label: "Declined", color: "#dc2626" };
      case "PENDING":
      default:
        return { label: "Pending", color: "#f59e0b" };
    }
  };

  const items = vaccine?.data || [];

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Vaccination Notifications</Text>

      {error && (
        <Text style={styles.error}>
          ❌ Error loading vaccine data: {JSON.stringify(error)}
        </Text>
      )}
      {resultError && (
        <Text style={styles.error}>
          ❌ Error loading result data: {JSON.stringify(resultError)}
        </Text>
      )}

      {items.map((item) => {
        const statusInfo = mapStatusLabel(item.status);
        return (
          <View
            key={item.id}
            style={[styles.card, { borderLeftColor: statusInfo.color }]}
          >
            <View style={styles.row}>
              <FontAwesome5 name="syringe" size={16} color={statusInfo.color} />
              <Text style={styles.title}>
                {item.vaccinationEvent?.name || "Vaccination"}
              </Text>
              <Text style={[styles.status, { color: statusInfo.color }]}>
                {statusInfo.label}
              </Text>
            </View>

            <Text style={styles.description}>
              {item.vaccinationEvent?.description}
            </Text>
            <Text style={styles.student}>
              👤 {item.student.account.fullname} ({item.student.student_code})
            </Text>
            <Text style={styles.date}>
              📅{" "}
              {new Date(item.vaccinationEvent?.scheduledAt).toLocaleDateString(
                "vi-VN"
              )}
            </Text>

            {item.status === "PENDING" && (
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.rejectBtn}
                  onPress={() => handleDecline(item)}
                >
                  <Text style={styles.rejectText}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.acceptBtn}
                  onPress={() => handleAccept(item)}
                >
                  <Text style={styles.acceptText}>Accept</Text>
                </TouchableOpacity>
              </View>
            )}

            {item.status === "DECLINED" && item.note && (
              <Text style={styles.note}>
                ❌ Reason:{" "}
                <Text style={{ fontStyle: "italic" }}>{item.note}</Text>
              </Text>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

export default VaccineParent;

const styles = StyleSheet.create({
  container: { padding: 10, paddingBottom: 30 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3b82f6",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 16, fontWeight: "bold" },
  status: { fontWeight: "bold" },
  description: { marginTop: 8, color: "#4b5563" },
  student: { marginTop: 6, color: "#2563eb" },
  date: { color: "#6b7280", marginTop: 4 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 12,
  },
  rejectBtn: { backgroundColor: "#f87171", padding: 10, borderRadius: 8 },
  acceptBtn: { backgroundColor: "#34d399", padding: 10, borderRadius: 8 },
  rejectText: { color: "#fff", fontWeight: "bold" },
  acceptText: { color: "#fff", fontWeight: "bold" },
  note: { marginTop: 8, color: "#dc2626", fontSize: 13 },
  error: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
