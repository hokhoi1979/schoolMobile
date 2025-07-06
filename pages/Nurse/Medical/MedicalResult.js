import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Modal,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckupJoin } from "../../../redux/nurse/checkup/checkupJoin/checkupJoinSlice";
import { fetchCheckupDetailResult } from "../../../redux/nurse/checkup/checkupDetailResult/checkupDetailResultSlice";
import { postCheckupDetailResult } from "../../../redux/nurse/checkup/sendCheckupDetailResult/sendCheckupDetailResultSlice";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Picker } from "@react-native-picker/picker";

export default function MedicalResult({ idCheckup }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [note, setNote] = useState("");
  const [summary, setSummary] = useState("");
  const [specialCase, setSpecialCase] = useState(false);

  const { studentJoin = [] } = useSelector((state) => state.checkupJoin);
  const { checkDetail = [] } = useSelector(
    (state) => state.fetchCheckupDetailResult
  );

  useEffect(() => {
    dispatch(fetchCheckupJoin(idCheckup));
  }, [dispatch, idCheckup]);

  const openForm = (student) => {
    setSelectedStudent(student);
    dispatch(fetchCheckupDetailResult(idCheckup));
    setOpen(true);
    setInputValues({});
    setNote("");
    setSummary("");
    setSpecialCase(false);
  };

  useEffect(() => {
    if (checkDetail?.data?.length > 0) {
      const initial = {};
      checkDetail.data.forEach((item) => {
        initial[item.id] = "";
      });
      setInputValues(initial);
    }
  }, [checkDetail]);

  const closeForm = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  const handleChangeInput = (id, value) => {
    setInputValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    if (!summary || !["GOOD", "BAD", "NOT_EVALUATED"].includes(summary)) {
      Alert.alert("Lỗi", "Kết luận phải là GOOD, BAD hoặc NOT_EVALUATED");
      return;
    }

    const resultsArray = checkDetail.data
      .filter((item) => inputValues[item.id]?.trim() !== "")
      .map((item) => ({
        contentID: Number(item.id),
        value: inputValues[item.id].toString().trim(),
        note: "Không có ghi chú",
      }));

    if (resultsArray.length === 0) {
      Alert.alert("Thiếu dữ liệu", "Bạn cần nhập ít nhất một kết quả.");
      return;
    }

    const payload = {
      studentID: Number(selectedStudent?.studentID),
      results: resultsArray,
      isMeeting: specialCase,
      status: "SUCCESS",
      overallNotes: note?.trim() || "Không có phản ứng phụ",
      overallResult: summary,
    };

    dispatch(postCheckupDetailResult({ id: idCheckup, body: payload }));
    dispatch(fetchCheckupJoin(idCheckup));
    closeForm();
  };

  const getStatusColor = (status) => {
    if (status === true) return "#4CAF50";
    if (status === false) return "#F44336";
    return "#9E9E9E";
  };

  const getStatusText = (status) => {
    if (status === true) return "Sent";
    if (status === false) return "Not sent";
    return "Unknown";
  };

  return (
    <>
      <ScrollView>
        <View style={styles.tableContainer}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.headerText, { flex: 3 }]}>
              Student ID
            </Text>
            <Text style={[styles.tableCell, styles.headerText, { flex: 4 }]}>
              Fullname
            </Text>
            <Text style={[styles.tableCell, styles.headerText, { flex: 2 }]}>
              Class
            </Text>
            <Text style={[styles.tableCell, styles.headerText, { flex: 3 }]}>
              Result
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.headerText,
                { flex: 2, textAlign: "center" },
              ]}
            >
              Action
            </Text>
          </View>

          {studentJoin?.data?.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>
                {item.studentID}
              </Text>
              <Text style={[styles.tableCell, { flex: 4 }]}>
                {item.fullName}
              </Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>
                {item.className}
              </Text>
              <View style={[styles.tableCell, { flex: 3 }]}>
                <View
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    backgroundColor: getStatusColor(item.hasResult),
                    borderRadius: 12,
                    alignSelf: "flex-start",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 11 }}>
                    {getStatusText(item.hasResult)}
                  </Text>
                </View>
              </View>
              <View
                style={[styles.tableCell, { flex: 2, alignItems: "center" }]}
              >
                <Pressable onPress={() => openForm(item)}>
                  <Fontisto name="eye" size={16} color="gray" />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal visible={open} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Send Checkup Result</Text>

            {checkDetail?.data?.map((item) => (
              <View key={item.id} style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                {item.description ? (
                  <Text style={{ fontSize: 12, color: "gray" }}>
                    {item.description}
                  </Text>
                ) : null}
                <TextInput
                  placeholder="Nhập kết quả"
                  keyboardType={
                    item.inputType === "NUMBER" ? "numeric" : "default"
                  }
                  style={styles.input}
                  value={inputValues[item.id]}
                  onChangeText={(text) => handleChangeInput(item.id, text)}
                />
              </View>
            ))}

            <Text style={{ fontWeight: "600", marginTop: 8 }}>Kết luận</Text>
            <Picker
              selectedValue={summary}
              onValueChange={(val) => setSummary(val)}
              style={styles.input}
            >
              <Picker.Item label="Chọn kết luận" value="" />
              <Picker.Item label="GOOD" value="GOOD" />
              <Picker.Item label="BAD" value="BAD" />
              <Picker.Item label="NOT_EVALUATED" value="NOT_EVALUATED" />
            </Picker>

            <Text style={{ fontWeight: "600", marginTop: 8 }}>Ghi chú</Text>
            <TextInput
              placeholder="Ghi chú tổng quát"
              style={[styles.input, { height: 80 }]}
              value={note}
              onChangeText={setNote}
              multiline
            />

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ flex: 1 }}>Trường hợp đặc biệt?</Text>
              <Switch value={specialCase} onValueChange={setSpecialCase} />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={closeForm}>
                <Text style={{ color: "white" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={{ color: "white" }}>Send Result</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    marginTop: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 6,
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
  },
  tableCell: {
    paddingHorizontal: 8,
    fontSize: 13,
    color: "#333",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginVertical: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  cancelBtn: {
    backgroundColor: "#F44336",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    marginRight: 10,
  },
  submitBtn: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
});
