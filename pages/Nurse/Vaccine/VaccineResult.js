import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { updateVaccineResult } from "../../../redux/nurse/vaccine/updateVaccineResult/updateVaccineResultSlice";

const VaccineResult = ({ studentList, idVaccine }) => {
  const [dataRecord, setDataRecord] = useState([]);
  const [initialState, setInitialState] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (studentList && Array.isArray(studentList)) {
      const filtered = studentList.filter(
        (item) => item.status?.toUpperCase() === "ACCEPTED"
      );
      const formatted = filtered.map((item, index) => {
        const student = item.student;
        return {
          key: index.toString(),
          idStudent: student?.student_code || "N/A",
          idVaccine,
          id: student?.id,
          name: student?.account?.fullname || "Unknown",
          grade: student?.classAssignments?.[0]?.class?.name || "Chưa phân lớp",
          vaccinated: false,
          result: "GOOD",
          note: "",
        };
      });
      setDataRecord(formatted);
      setInitialState(formatted);
    }
  }, [studentList]);

  console.log(dataRecord);

  const handleCheckboxChange = (key, value) => {
    setDataRecord((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, vaccinated: value } : item
      )
    );
  };

  const handleNoteChange = (key, value) => {
    setDataRecord((prev) =>
      prev.map((item) => (item.key === key ? { ...item, note: value } : item))
    );
  };

  const handleResultChange = (key, value) => {
    setDataRecord((prev) =>
      prev.map((item) => (item.key === key ? { ...item, result: value } : item))
    );
  };

  const handleSendResult = () => {
    if (dataRecord.length === 0) {
      Alert.alert("Lỗi", "Không có dữ liệu để gửi");
      return;
    }
    const idVaccine = dataRecord[0]?.idVaccine;
    if (!idVaccine) {
      Alert.alert("Lỗi", "Không tìm thấy ID vaccine");
      return;
    }
    const format = dataRecord.map((item) => ({
      studentID: item.id,
      status: item.vaccinated ? "SUCCESS" : "SKIPPED",
      note: item.note,
      result: item.result,
    }));
    const total = { result: format };
    dispatch(updateVaccineResult({ IdVaccine: idVaccine, bodyVaccine: total }));
    setDataRecord(initialState);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Vaccination results</Text>
      <Text style={styles.subtitle}>
        Update on injection results and post-injection reactions
      </Text>

      {dataRecord.map((record) => (
        <View key={record.key} style={styles.card}>
          <Text style={styles.itemText}>Student Code: {record.idStudent}</Text>
          <Text style={styles.itemText}>Fullname: {record.name}</Text>
          <Text style={styles.itemText}>Grade: {record.grade}</Text>

          <View style={styles.switchRow}>
            <Text style={styles.label}>Injected:</Text>
            <Switch
              value={record.vaccinated}
              onValueChange={(value) => handleCheckboxChange(record.key, value)}
              thumbColor={record.vaccinated ? "#4CAF50" : "#ccc"}
              trackColor={{ false: "#999", true: "#A5D6A7" }}
            />
          </View>

          <View style={styles.resultRow}>
            <Text style={styles.label}>Result:</Text>
            <View style={styles.resultButtons}>
              <TouchableOpacity
                style={[
                  styles.resultButton,
                  record.result === "GOOD" && styles.selectedResultButton,
                ]}
                onPress={() => handleResultChange(record.key, "GOOD")}
              >
                <Text
                  style={[
                    styles.resultButtonText,
                    record.result === "GOOD" && styles.selectedText,
                  ]}
                >
                  Tốt
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.resultButton,
                  record.result === "BAD" && styles.selectedResultButton,
                ]}
                onPress={() => handleResultChange(record.key, "BAD")}
              >
                <Text
                  style={[
                    styles.resultButtonText,
                    record.result === "BAD" && styles.selectedText,
                  ]}
                >
                  Nặng
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Ghi chú sau tiêm..."
            value={record.note}
            onChangeText={(value) => handleNoteChange(record.key, value)}
            multiline
          />
        </View>
      ))}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendResult}>
          <Text style={styles.buttonText}>Update result</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default VaccineResult;
const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 10,
    backgroundColor: "#F9F9F9",
    paddingBottom: 200,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    marginBottom: 4,
    fontSize: 14,
    color: "#333",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },
  resultButtons: {
    flexDirection: "row",
    gap: 10,
  },
  resultButton: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "#f0f0f0",
  },
  selectedResultButton: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  resultButtonText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },
  selectedText: {
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
    fontSize: 13,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 30,
    gap: 16,
    paddingBottom: 50,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#E26666",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  sendButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
