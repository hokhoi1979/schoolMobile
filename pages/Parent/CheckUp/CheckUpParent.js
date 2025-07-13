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
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "../../../components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchCheckUpParent } from "../../../redux/parent/checkup/getCheckUpParentSlice";
import { fetchAcceptCheckUp } from "../../../redux/parent/checkup/getCheckUpParentAcceptSlice";
import { fetchDeclineCheckUp } from "../../../redux/parent/checkup/getCheckUpParentDeclineSlice";
import { fetchDetailCheckUpParent } from "../../../redux/parent/checkup/getDetailCheckUpParentSlice";
import { fetchResultCheckUpParent } from "../../../redux/parent/checkup/getResultCheckUpParentSlice";
import DeclineModal from "../Vaccine/DeclineModal";
import bg from "../../../assets/bgheader.jpg";

const screenWidth = Dimensions.get("window").width;

const CheckUpParent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const { checkup, loading } = useSelector((state) => state.checkupParent);
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [declineReason, setDeclineReason] = useState("");

  useEffect(() => {
    dispatch(fetchCheckUpParent());
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchCheckUpParent());
    setRefreshing(false);
  };

  const handleAccept = async (item) => {
    const payload = {
      studentID: item.studentID,
      healthCheckUpID: item.healthCheckUpID,
    };
    try {
      await dispatch(fetchAcceptCheckUp(payload));
      dispatch(fetchCheckUpParent());
    } catch (err) {
      Alert.alert("Error", "Failed to accept checkup.");
    }
  };

  const handleDecline = (item) => {
    setSelectedItem(item);
    setDeclineReason("");
    setDeclineModalVisible(true);
  };

  const confirmDecline = async () => {
    if (!declineReason?.trim()) return;
    const payload = {
      studentID: selectedItem.student?.id ?? selectedItem.studentID,
      healthCheckUpID: selectedItem.healthCheckUpID,
      note: declineReason,
    };
    try {
      await dispatch(fetchDeclineCheckUp(payload));
      dispatch(fetchCheckUpParent());
    } catch (err) {
      Alert.alert("Error", "Failed to decline checkup.");
    } finally {
      setDeclineModalVisible(false);
      setSelectedItem(null);
      setDeclineReason("");
    }
  };

  const handleViewDetail = (item) => {
    dispatch(fetchDetailCheckUpParent({ id: item.healthCheckUpID }));
    navigation.navigate("CheckUpDetailScreen", {
      healthCheckUpID: item.healthCheckUpID,
    });
  };

  const handleViewResult = (item) => {
    dispatch(
      fetchResultCheckUpParent({
        id: item.healthCheckUpID,
        studentID: item.studentID,
      })
    );
    navigation.navigate("CheckUpResultScreen", {
      healthCheckUpID: item.healthCheckUpID,
    });
  };

  const mapStatus = (status) => {
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

  const items = checkup?.data || [];

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
        <Header title="CheckUpParent" />
        <Image source={bg} style={styles.bgImage} />

        <View style={styles.grid}>
          {items.map((item) => {
            const statusInfo = mapStatus(item.status);
            return (
              <View
                key={item.id}
                style={[styles.card, { borderLeftColor: statusInfo.color }]}
              >
                <View style={styles.rowHeader}>
                  <FontAwesome5
                    name="heartbeat"
                    size={16}
                    color={statusInfo.color}
                  />
                  <Text style={styles.title}>
                    {item.healthCheckup?.title || "Health Check"}
                  </Text>
                </View>

                <Text style={styles.student}>
                  👤{" "}
                  <Text style={{ color: "#2563eb", fontWeight: "bold" }}>
                    {item.student.account.fullname}
                  </Text>{" "}
                  ({item.student.student_code})
                </Text>
                <Text style={styles.date}>
                  📅{" "}
                  {new Date(item.healthCheckup?.scheduledAt).toLocaleDateString(
                    "vi-VN"
                  )}
                </Text>

                <View
                  style={[
                    styles.statusBox,
                    { backgroundColor: statusInfo.color },
                  ]}
                >
                  <Text style={styles.statusText}>📌 {statusInfo.label}</Text>
                </View>

                {item.status === "DECLINED" && item.note && (
                  <Text style={styles.note}>
                    ❌ Reason:{" "}
                    <Text style={{ fontStyle: "italic" }}>{item.note}</Text>
                  </Text>
                )}

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
                      style={styles.acceptBtn}
                      onPress={() => handleAccept(item)}
                    >
                      <View style={styles.btnContent}>
                        <FontAwesome5
                          name="shield-alt"
                          size={12}
                          color="#fff"
                          style={{ marginRight: 4 }}
                        />
                        <Text style={styles.acceptText}>Accept</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

                {item.status === "ACCEPTED" && (
                  <View style={{ marginTop: 10 }}>
                    <TouchableOpacity
                      style={[styles.detailBtn, styles.btnContent]}
                      onPress={() => handleViewDetail(item)}
                    >
                      <FontAwesome5
                        name="info-circle"
                        size={13}
                        color="#fff"
                        style={{ marginRight: 6 }}
                      />
                      <Text style={styles.detailText}>View Detail</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.detailBtn,
                        styles.btnContent,
                        { marginTop: 6 },
                      ]}
                      onPress={() => handleViewResult(item)}
                    >
                      <FontAwesome5
                        name="file-medical"
                        size={13}
                        color="#fff"
                        style={{ marginRight: 6 }}
                      />
                      <Text style={styles.detailText}>View Result</Text>
                    </TouchableOpacity>
                  </View>
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
};

export default CheckUpParent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingBottom: 30,
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
  rowHeader: {
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
  rejectText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  acceptText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  detailBtn: {
    backgroundColor: "#0ea5e9",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  detailText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  btnContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
