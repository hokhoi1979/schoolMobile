import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckupResult } from "../../../redux/nurse/checkup/fetchCheckupResult/resultCheckupSlice";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { sendCheckupParent } from "../../../redux/nurse/checkup/sendCheckupResult/sendCheckupParentSlice";

function SentParentsMedical({ idCheckup }) {
  const [student, setStudent] = useState([]);
  const { resultCheckup = [] } = useSelector((state) => state.checkupResult);
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(fetchCheckupResult(idCheckup));
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, idCheckup]);
  console.log(resultCheckup);

  useEffect(() => {
    if (resultCheckup && Array.isArray(resultCheckup.data)) {
      const data = resultCheckup.data.map((item, index) => ({
        id: item.studentID,
        studentID: item.student_code ?? `#${item.studentID}`,
        fullName: item.fullname ?? "Unknown",
        className: item.className ?? "",
        hasResult: item.results?.length > 0,
        isSend: item.isSend ?? false,
        fullItem: item,
      }));
      setStudent(data);
    }
  }, [resultCheckup]);
  const getStatusColor = (isSent) => {
    return isSent ? "#39de54" : "#de4839"; // ✅ Sent: xanh, Not sent: đỏ
  };

  const getStatusText = (isSent) => {
    return isSent ? "Sent" : "Not sent";
  };
  const handlePress = () => {
    Alert.alert(
      "Confirm",
      "Do you want to send to Parent?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            dispatch(sendCheckupParent(idCheckup));
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View></View>
          <Pressable onPress={handlePress}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Sent to Parent</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.tableContainer}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.headerText, { flex: 3 }]}>
              Student ID
            </Text>
            <Text style={[styles.tableCell, styles.headerText, { flex: 4 }]}>
              Fullname
            </Text>
            <Text style={[styles.tableCell, styles.headerText, { flex: 3 }]}>
              Class
            </Text>
            <Text style={[styles.tableCell, styles.headerText, { flex: 3 }]}>
              Result
            </Text>
          </View>

          {student?.map((item, index) => (
            <View key={item.id || index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>
                {item.studentID}
              </Text>
              <Text style={[styles.tableCell, { flex: 4 }]}>
                {item.fullName}
              </Text>
              <Text style={[styles.tableCell, { flex: 3 }]}>
                {item.className}
              </Text>
              <View style={[styles.tableCell, { flex: 3 }]}>
                <View
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    backgroundColor: getStatusColor(item.isSend),
                    borderRadius: 12,
                    alignSelf: "flex-start",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 11 }}>
                    {getStatusText(item.isSend)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

export default SentParentsMedical;

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

  submitBtn: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
