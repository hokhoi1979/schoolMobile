import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
  RefreshControl,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { fetchVaccineParent } from "../../../redux/parent/vaccine/getVaccineParentSlice";
import { fetchVaccineParentResult } from "../../../redux/parent/vaccine/getVaccineParentResultSlice";
import { fetchAcceptVaccine } from "../../../redux/parent/vaccine/getVaccineParentAcceptSlice";
import { fetchDeclineVaccine } from "../../../redux/parent/vaccine/getVaccineParentDeclineSlice";
import Header from "../../../components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import DeclineModal from "./DeclineModal";
import bg from "../../../assets/bgheader.jpg";

const screenWidth = Dimensions.get("window").width;

function VaccineParent() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [declineReason, setDeclineReason] = useState("");

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

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchVaccineParent());
    await dispatch(fetchVaccineParentResult());
    setRefreshing(false);
  };

  const handleAccept = async (item) => {
    const payload = {
      studentID: item.studentID,
      vaccinationEventID: item.vaccinationEventID,
    };
    try {
      await dispatch(fetchAcceptVaccine(payload));
      dispatch(fetchVaccineParent());
    } catch (err) {
      Alert.alert("Error", "Failed to accept vaccination.");
    }
  };

  const handleDecline = (item) => {
    setSelectedItem(item);
    setDeclineReason("");
    setDeclineModalVisible(true);
  };

  const confirmDecline = async () => {
    if (!declineReason.trim() || !selectedItem) return;
    const payload = {
      studentID: selectedItem.student?.id ?? selectedItem.studentID,
      vaccinationEventID: selectedItem.vaccinationEventID,
      note: declineReason,
    };
    try {
      await dispatch(fetchDeclineVaccine(payload));
      dispatch(fetchVaccineParent());
    } catch (err) {
      Alert.alert("Error", "Failed to decline vaccination.");
    } finally {
      setDeclineModalVisible(false);
      setSelectedItem(null);
      setDeclineReason("");
    }
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
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header title={"VaccineParent"} />

        <Image source={bg} style={styles.bgImage} />

        <View style={styles.grid}>
          {items.map((item) => {
            const statusInfo = mapStatusLabel(item.status);
            return (
              <View
                key={item.id}
                style={[styles.card, { borderLeftColor: statusInfo.color }]}
              >
                <View style={styles.row}>
                  <FontAwesome5
                    name="syringe"
                    size={16}
                    color={statusInfo.color}
                  />
                  <Text style={styles.title}>
                    {item.vaccinationEvent?.name || "Vaccination"}
                  </Text>
                </View>
                <Text style={styles.description}>
                  {item.vaccinationEvent?.description}
                </Text>
                <Text style={styles.student}>
                  👤{" "}
                  <Text style={{ color: "#2563eb", fontWeight: "bold" }}>
                    {item.student?.account?.fullname}
                  </Text>{" "}
                  ({item.student?.student_code})
                </Text>
                <Text style={styles.date}>
                  📅{" "}
                  {new Date(
                    item.vaccinationEvent?.scheduledAt
                  ).toLocaleDateString("vi-VN")}
                </Text>
                <View
                  style={[
                    styles.statusBox,
                    { backgroundColor: statusInfo.color },
                  ]}
                >
                  <Text style={styles.statusText}>📌 {statusInfo.label}</Text>
                </View>

                {item.status === "PENDING" && (
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={styles.rejectBtn}
                      onPress={() => handleDecline(item)}
                    >
                      <View style={styles.btnContent}>
                        <FontAwesome5
                          name="ban"
                          size={12}
                          color="#fff"
                          style={{ marginRight: 4 }}
                        />
                        <Text style={styles.rejectText}>Decline</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.acceptBtn, styles.btnContent]}
                      onPress={() => handleAccept(item)}
                    >
                      <FontAwesome5
                        name="shield-alt"
                        size={12}
                        color="#fff"
                        style={{ marginRight: 4 }}
                      />
                      <Text style={styles.acceptText}>Accept</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {item.status === "ACCEPTED" && (
                  <TouchableOpacity
                    style={[styles.detailBtn, styles.btnContent]}
                    onPress={() => {
                      const matchedResult = resultList?.data?.find(
                        (r) =>
                          r.vaccinationEvent?.name ===
                            item.vaccinationEvent?.name &&
                          r.student?.student_code === item.student?.student_code
                      );
                      if (matchedResult) {
                        navigation.navigate("VaccineResultDetail", {
                          result: matchedResult,
                        });
                      } else {
                        Alert.alert(
                          "No result found",
                          "There is no vaccination result yet."
                        );
                      }
                    }}
                  >
                    <FontAwesome5
                      name="search"
                      size={13}
                      color="#fff"
                      style={{ marginRight: 6 }}
                    />
                    <Text style={styles.detailText}>View Detail Result</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        <DeclineModal
          visible={declineModalVisible}
          reason={declineReason}
          onChangeReason={setDeclineReason}
          onCancel={() => setDeclineModalVisible(false)}
          onConfirm={confirmDecline}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default VaccineParent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingBottom: 30,
    marginTop: 24,
  },
  bgImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    resizeMode: "cover",
    borderRadius: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 8,
    gap: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    width: (screenWidth - 32) / 2,
    minHeight: 260,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    flex: 1,
    color: "#111827",
  },
  description: {
    fontSize: 12,
    color: "#4b5563",
    marginVertical: 4,
  },
  student: {
    fontSize: 12,
    color: "#1e40af",
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  statusBox: {
    marginTop: 10,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  note: {
    fontSize: 12,
    marginTop: 8,
    color: "#b91c1c",
    fontStyle: "italic",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  rejectBtn: {
    backgroundColor: "#ef4444",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  acceptBtn: {
    backgroundColor: "#10b981",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  detailBtn: {
    marginTop: 10,
    backgroundColor: "#16a34a",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
  },

  btnContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  rejectText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  acceptText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  detailText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
});
