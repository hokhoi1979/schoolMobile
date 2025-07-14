import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";

import { TabView, TabBar } from "react-native-tab-view";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Khambenh = ({ healthCheckupHistoryFormat }) => {
  const [selectedCheckup, setSelectedCheckup] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (checkup) => {
    setSelectedCheckup(checkup);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCheckup(null);
    setModalVisible(false);
  };

  const formatDate = (isoDate) => {
    const d = new Date(isoDate);
    return d.toLocaleDateString("vi-VN"); // format thành dd/mm/yyyy
  };
  if (!healthCheckupHistoryFormat || healthCheckupHistoryFormat.length === 0) {
    return (
      <View style={styles.scene}>
        <Text style={styles.contentText}>
          Không có lịch sử khám sức khỏe định kỳ
        </Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.scene}>
        <Text style={styles.title}>📋 Lịch sử khám bệnh</Text>

        {healthCheckupHistoryFormat.length === 0 ? (
          <Text style={styles.emptyText}>Không có lịch sử khám nào.</Text>
        ) : (
          healthCheckupHistoryFormat.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>
                  🗓 Ngày khám: {formatDate(item.scheduledAt)}
                </Text>
              </View>
              <TouchableOpacity onPress={() => openModal(item)}>
                <Ionicons name="eye-outline" size={24} color="#007bff" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedCheckup && (
              <>
                <Text style={styles.modalTitle}>📄 Chi tiết khám</Text>
                <Text>Sự kiện: {selectedCheckup.title}</Text>
                <Text>
                  Ngày khám: {selectedCheckup.scheduledAt.slice(0, 10)}
                </Text>
                <Text>Kết quả: {selectedCheckup.result?.overallResult}</Text>
                <Text>Ghi chú: {selectedCheckup.result?.overallNotes}</Text>

                <Text style={{ marginTop: 10, fontWeight: "bold" }}>
                  📌 Nội dung kiểm tra:
                </Text>
                {selectedCheckup.contents.map((c, idx) => (
                  <Text key={idx}>
                    - {c.name}: {c.value || "Chưa có"}{" "}
                    {c.note ? `(📝 ${c.note})` : ""}
                  </Text>
                ))}

                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

const Tiemchung = ({ vaccinationEventHistoryFormat }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setModalVisible(false);
  };

  const formatDate = (isoDate) => {
    const d = new Date(isoDate);
    return d.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scene}>
        <Text style={styles.title}>💉 Lịch sử tiêm chủng</Text>

        {vaccinationEventHistoryFormat.length === 0 ? (
          <Text style={styles.emptyText}>Không có dữ liệu tiêm chủng.</Text>
        ) : (
          vaccinationEventHistoryFormat.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>
                  🗓 Ngày tiêm: {formatDate(item.scheduledAt)}
                </Text>
              </View>
              <TouchableOpacity onPress={() => openModal(item)}>
                <Ionicons name="eye-outline" size={24} color="#007bff" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Modal Chi tiết */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedEvent && (
              <>
                <Text style={styles.modalTitle}>📄 Chi tiết tiêm chủng</Text>
                <Text style={styles.modalText}>
                  Sự kiện: {selectedEvent.title}
                </Text>
                <Text style={styles.modalText}>
                  Ngày tiêm: {formatDate(selectedEvent.scheduledAt)}
                </Text>
                <Text style={styles.modalText}>
                  Kết quả: {selectedEvent.result?.result}
                </Text>
                <Text style={styles.modalText}>
                  Ghi chú: {selectedEvent.result?.note || "Không có"}
                </Text>

                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

const Dungthuoc = ({ medicalEventHistoty }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const formatDate = (isoDate) => {
    const d = new Date(isoDate);
    return d.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scene}>
        <Text style={styles.title}>💊 Lịch sử sự kiện y tế</Text>

        {medicalEventHistoty.length === 0 ? (
          <Text style={styles.emptyText}>Không có sự kiện nào.</Text>
        ) : (
          medicalEventHistoty.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>🩺 {item.type}</Text>
                <Text style={styles.cardSubtitle}>
                  🗓 {formatDate(item.occurredAt)}
                </Text>
              </View>
              <TouchableOpacity onPress={() => openModal(item)}>
                <Ionicons name="eye-outline" size={24} color="#007bff" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Modal chi tiết */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedEvent && (
              <>
                <Text style={styles.modalTitle}>📝 Chi tiết sự kiện y tế</Text>
                <Text style={styles.modalText}>
                  🔹 Loại: {selectedEvent.type}
                </Text>
                <Text style={styles.modalText}>
                  🗓 Thời gian: {formatDate(selectedEvent.occurredAt)}
                </Text>
                <Text style={styles.modalText}>
                  📋 Mô tả: {selectedEvent.description}
                </Text>
                <Text style={styles.modalText}>
                  ⚠️ Mức độ: {selectedEvent.severity}
                </Text>

                {selectedEvent.HospitalTransfer && (
                  <>
                    <Text style={styles.modalText}>
                      🏥 Đã chuyển viện đến:{" "}
                      {selectedEvent.HospitalTransfer.hospitalName}
                    </Text>
                    <Text style={styles.modalText}>
                      🕒 Thời gian chuyển:{" "}
                      {formatDate(selectedEvent.HospitalTransfer.transferredAt)}
                    </Text>
                  </>
                )}

                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default function LichSuScreen(props) {
  const { profile } = props;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "kham", title: "Khám bệnh" },
    { key: "tiem", title: "Tiêm chủng" },
    { key: "thuoc", title: "Sự kiện y tế" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "kham":
        return (
          <Khambenh
            healthCheckupHistoryFormat={profile.healthCheckupHistoryFormat}
          />
        );
      case "tiem":
        return (
          <Tiemchung
            vaccinationEventHistoryFormat={
              profile.vaccinationEventHistoryFormat
            }
          />
        );
      case "thuoc":
        return <Dungthuoc medicalEventHistoty={profile.medicalEventHistoty} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <View style={styles.titleRow}>
        <MaterialIcons name="history" size={24} />
        <Text style={styles.title}>Lịch sử</Text>
      </View>

      <View style={{ flex: 1 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get("window").width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: "#BB86FC" }}
              style={{ backgroundColor: "#333", borderRadius: 8 }}
              labelStyle={{ color: "white", fontWeight: "600" }}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 16,
    padding: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 0,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
    color: "black",
  },
  scene: {
    padding: 16,
    backgroundColor: "#fff",
  },
  contentText: {
    fontSize: 16,
    marginBottom: 8,
    color: "black",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    height: 100,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "85%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});
