// CheckupManager.jsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { logout } from "../../redux/auth/authSlice";

import logo from "../../assets/logo.png";
import bg from "../../assets/bgheader.jpg";
import { fetchCheckupManager } from "../../redux/manager/GetAllMedicalCheckUpManager/getAllCheckUpManagerSlice";
import { useDispatch, useSelector } from "react-redux";
import { patchManagerConfirmCheckup } from "../../redux/manager/ConfirmMedicalCheckupManager/confirmMedicalCheckupManagerSlice";
import { fetchClassManager } from "../../redux/manager/ClassManager/getAllClassManagerSlice";
import { putManagerMedicalCheckup } from "../../redux/manager/UpdateMedicalCheckupManager/updateMedicalCheckupManagerSlice";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import dayjs from "dayjs";
import { Button } from "react-native-paper";
import { Modal } from "react-native";
import { deleteManagerMedicalCheckup } from "../../redux/manager/DeleteMedicalCheckupManager/deleteMedicalCheckupManagerSlice";
import { fetchTotalStudent } from "../../redux/manager/GetTotalStudent/getTotalStudentSlice";
import { patchManagerEndMedicalCheckup } from "../../redux/manager/EndEventMedicalCheckUpManager/endEventMedicalCheckUpManagerSlice";
const CheckupManager = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const screenWidth = Dimensions.get("window").width;

  const [store, setStore] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [checkupName, setCheckupName] = useState("");
  const [checkupDescription, setCheckupDescription] = useState("");
  const [checkupDate, setCheckupDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [targetType, setTargetType] = useState("school");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);

  const { checkupManagerList } = useSelector(
    (state) => state?.getAllCheckupManager
  );
  const classList = useSelector(
    (state) => state?.getClassManager?.classManager?.data || []
  );

  useEffect(() => {
    dispatch(fetchClassManager());
    dispatch(fetchCheckupManager());
  }, [dispatch]);

  useEffect(() => {
    const events = checkupManagerList?.data?.checkUpEntities ?? [];
    if (Array.isArray(events)) {
      const formatted = events.map((item) => ({
        id: item.id,
        name: item.title,
        description: item.description,
        date: new Date(item.scheduledAt).toLocaleDateString("en-GB"),
        status: item.status,
        totalStudent: item.studentResponseCount?.totalStudent ?? "Unknown",
        studentsAcceptCount:
          item.studentResponseCount?.studentsAcceptCount ?? "Unknown",
        studentsDeclinedCount:
          item.studentResponseCount?.studentsDeclinedCount ?? "Unknown",
        studentPendingCount:
          item.studentResponseCount?.studentPendingCount ?? "Unknown",
        targets: item.targets,
      }));
      setStore(formatted);
    }
  }, [checkupManagerList]);

  const handleLogout = () => {
    dispatch(logout());
    nav.navigate("Login");
  };

  const handleSendConfirm = (item) => {
    dispatch(
      patchManagerConfirmCheckup({
        id: item.id,
        customMailTitle: `Checkup Notice for ${item.name}`,
        customMailBody: `Dear Parents,\n\nOur school will organize the ${item.name.toLowerCase()} on ${
          item.date
        }.\n\nPlease confirm your participation.\n\nSincerely,`,
      })
    );
    Alert.alert("Sent", "Confirmation email has been sent.");
  };

  const handleDelete = (item) => {
    Alert.alert(
      "Confirm Delete",
      `Do you really want to delete the checkup '${item.name}'?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => dispatch(deleteManagerMedicalCheckup(item.id)),
        },
      ]
    );
  };

  const openEditForm = (item) => {
    setSelectedEvent(item);
    setIsEditing(true);
    setCheckupName(item.name);
    setCheckupDescription(item.description || "");
    setCheckupDate(new Date(item.date.split("/").reverse().join("-")));
    setTargetType(item.targets?.[0]?.grade ? "grade" : "school");
    setSelectedClasses([]);
    setSelectedGrades([]);
  };

  const handleUpdateSubmit = () => {
    if (!selectedEvent) return;
    if (!checkupName.trim()) {
      Alert.alert("Validation", "Please enter a name.");
      return;
    }

    const classIdMap = {};
    classList.forEach((cls) => {
      classIdMap[cls.name] = cls.id;
    });

    let updatedTargetIds = [];
    if (targetType === "class") {
      updatedTargetIds = selectedClasses.map((c) => classIdMap[c]);
    } else if (targetType === "grade") {
      updatedTargetIds = selectedGrades;
    }

    const payload = {
      id: selectedEvent.id,
      title: checkupName,
      description: checkupDescription || "No description",
      scheduledAt: dayjs(checkupDate).format("YYYY-MM-DD"),
      targetType: targetType.toUpperCase(),
      targetIds: updatedTargetIds,
    };

    dispatch(putManagerMedicalCheckup(payload));
    dispatch(fetchCheckupManager());
    setIsEditing(false);
  };
  const totalStudents = useSelector(
    (state) => state.getTotalStudent?.totalStudents ?? 0
  );

  useEffect(() => {
    if (targetType === "school") {
      dispatch(fetchTotalStudent({ targetType: "SCHOOL", targetIds: [] }));
    } else if (targetType === "class" && selectedClasses.length > 0) {
      const classIds = classList
        .filter((cls) => selectedClasses.includes(cls.name))
        .map((cls) => String(cls.id));

      dispatch(fetchTotalStudent({ targetType: "CLASS", targetIds: classIds }));
    } else if (targetType === "grade" && selectedGrades.length > 0) {
      const gradeIds = selectedGrades.map(String);
      dispatch(fetchTotalStudent({ targetType: "GRADE", targetIds: gradeIds }));
    }
  }, [targetType, selectedClasses, selectedGrades]);
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>📌 Status: </Text>
          <Text
            style={[
              styles.statusValue,
              {
                backgroundColor:
                  item.status === "SUCCESSED" ? "orange" : "#2eab13",
              },
            ]}
          >
            {item.status}
          </Text>
        </View>

        <Text style={styles.dateText}>📅 Date: {item.date}</Text>
        <Text style={styles.studentText}>
          👨‍👩‍👧 Students:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {item.studentsAcceptCount} / {item.totalStudent}
          </Text>
        </Text>
        <Text style={styles.targetTitle}>🎯 Target Classes:</Text>
        {item.targets?.length > 0 ? (
          item.targets.map((target, idx) => (
            <Text key={idx} style={styles.targetText}>
              •{" "}
              {target.className
                ? `Class ${target.className}`
                : `Grade ${target.grade}`}
            </Text>
          ))
        ) : (
          <Text style={styles.targetText}>• School</Text>
        )}
      </View>

      {item.status == "DRAFT" && (
        <>
          <Pressable
            onPress={() => openEditForm(item)}
            style={styles.buttonOrange}
          >
            <Text style={styles.buttonText}>Update</Text>
          </Pressable>
          <Pressable
            onPress={() => handleSendConfirm(item)}
            style={styles.buttonBlue}
          >
            <Text style={styles.buttonText}>Send Confirm</Text>
          </Pressable>
          <Pressable
            onPress={() => handleDelete(item)}
            style={styles.buttonGray}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        </>
      )}
      {item.status == "CONFIRMED" && (
        <Pressable
          onPress={() => dispatch(patchManagerEndMedicalCheckup(item.id))}
          style={styles.buttonRed}
        >
          <Text style={styles.buttonText}>End Event</Text>
        </Pressable>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Pressable
        onPress={() => nav.navigate("createCheckup")}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "#1890ff",
          padding: 16,
          borderRadius: 100,
          zIndex: 999,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          ＋
        </Text>
      </Pressable>

      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={{ width: 40, height: 40 }} />
          <Text style={{ fontSize: 12, fontWeight: "600" }}>School Health</Text>
        </View>
        <Text style={styles.header}>Checkup Manager</Text>
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <MaterialIcons name="logout" size={24} color="black" />
        </Pressable>
      </View>

      <Image source={bg} style={styles.banner} />

      <FlatList
        data={store}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
        renderItem={renderItem}
      />

      <Modal visible={isEditing} animationType="slide">
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ padding: 16 }}>
            <Text style={styles.modalTitle}>Update Checkup</Text>

            <TextInput
              placeholder="Checkup name"
              value={checkupName}
              onChangeText={setCheckupName}
              style={styles.input}
            />
            <TextInput
              placeholder="Description"
              value={checkupDescription}
              onChangeText={setCheckupDescription}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.input}
            >
              <Text>{dayjs(checkupDate).format("YYYY-MM-DD")}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={checkupDate}
                mode="date"
                display="default"
                onChange={(e, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setCheckupDate(selectedDate);
                }}
              />
            )}

            <Text style={{ fontWeight: "bold" }}>Target Type:</Text>
            <View style={{ flexDirection: "row", gap: 10, marginTop: 5 }}>
              {["school", "class", "grade"].map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => {
                    setTargetType(type);
                    setSelectedClasses([]);
                    setSelectedGrades([]);
                  }}
                  style={{
                    padding: 6,
                    borderWidth: 1,
                    borderColor: targetType === type ? "#1890ff" : "#ccc",
                    borderRadius: 6,
                    marginRight: 6,
                  }}
                >
                  <Text>{type.toUpperCase()}</Text>
                </TouchableOpacity>
              ))}
              {targetType === "school" && (
                <Text
                  style={{
                    marginBottom: 12,
                    fontStyle: "italic",
                    color: "green",
                  }}
                >
                  Total students in school: {totalStudents}
                </Text>
              )}
            </View>

            {targetType === "class" && (
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: "bold" }}>Select Classes:</Text>
                {classList.map((cls) => (
                  <TouchableOpacity
                    key={cls.id}
                    onPress={() =>
                      setSelectedClasses((prev) =>
                        prev.includes(cls.name)
                          ? prev.filter((c) => c !== cls.name)
                          : [...prev, cls.name]
                      )
                    }
                    style={{
                      padding: 6,
                      backgroundColor: selectedClasses.includes(cls.name)
                        ? "#cce5ff"
                        : "#f1f1f1",
                      marginVertical: 3,
                      borderRadius: 5,
                    }}
                  >
                    <Text>{cls.name}</Text>
                  </TouchableOpacity>
                ))}
                {selectedClasses.length > 0 && (
                  <Text
                    style={{
                      marginTop: 8,
                      fontStyle: "italic",
                      color: "green",
                    }}
                  >
                    Total selected students: {totalStudents}
                  </Text>
                )}
              </View>
            )}

            {targetType === "grade" && (
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: "bold" }}>Select Grades:</Text>
                {[10, 11, 12].map((grade) => (
                  <TouchableOpacity
                    key={grade}
                    onPress={() =>
                      setSelectedGrades((prev) =>
                        prev.includes(grade)
                          ? prev.filter((g) => g !== grade)
                          : [...prev, grade]
                      )
                    }
                    style={{
                      padding: 6,
                      backgroundColor: selectedGrades.includes(grade)
                        ? "#cce5ff"
                        : "#f1f1f1",
                      marginVertical: 3,
                      borderRadius: 5,
                    }}
                  >
                    <Text>Grade {grade}</Text>
                  </TouchableOpacity>
                ))}
                {selectedGrades.length > 0 && (
                  <Text
                    style={{
                      marginTop: 8,
                      fontStyle: "italic",
                      color: "green",
                    }}
                  >
                    Total selected students: {totalStudents}
                  </Text>
                )}
              </View>
            )}

            <View style={{ marginTop: 20 }}>
              <Button mode="contained" onPress={handleUpdateSubmit}>
                Update
              </Button>
              <Button
                mode="outlined"
                onPress={() => setIsEditing(false)}
                style={{ marginTop: 10 }}
              >
                Cancel
              </Button>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    paddingLeft: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  logoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "System",
  },
  logoutButton: {
    width: "25%",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  buttonRed: {
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#d32f2f",
  },
  banner: {
    width: "100%",
    height: 200,
    marginTop: 5,
    resizeMode: "cover",
    borderRadius: 10,
  },
  card: {
    width: Dimensions.get("window").width / 2 - 24,
    backgroundColor: "#ffffff",
    marginVertical: 8,
    padding: 14,
    marginHorizontal: 6,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "column",
    justifyContent: "space-between",
    // height: 250,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 13,
    color: "#666",
  },
  statusValue: {
    fontSize: 12,
    paddingHorizontal: 4,
    paddingVertical: 4,
    color: "white",
    borderRadius: 6,
    overflow: "hidden",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  dateText: {
    fontSize: 13,
    color: "#888",
    marginBottom: 10,
  },
  studentText: {
    fontSize: 13,
    color: "#444",
    marginBottom: 4,
  },
  targetTitle: {
    fontSize: 13,
    color: "#555",
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
  },
  targetText: {
    fontSize: 13,
    color: "#555",
    marginLeft: 6,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  buttonOrange: {
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#ff9800",
  },
  buttonBlue: {
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#1976d2",
  },
  buttonGray: {
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#616161",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
  },
});

export default CheckupManager;
