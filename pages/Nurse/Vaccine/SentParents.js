import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVaccineResult } from "../../../redux/nurse/vaccine/vaccineResult/vaccineResultSlice";
import { postResultVaccine } from "../../../redux/nurse/vaccine/sendVaccineResult/sendResultSlice";

export default function SentParents({ idVaccine }) {
  const dispatch = useDispatch();
  const [store, setStore] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const { result = {} } = useSelector((state) => state.vaccineResult);

  const fetchData = async () => {
    await dispatch(fetchVaccineResult(idVaccine));
  };

  const formatData = () => {
    if (result?.data && Array.isArray(result.data)) {
      const formatted = result.data.map((item) => ({
        studentName: item.student?.account?.fullname || "N/A",
        parentName: item.student?.ParentInfo?.fullname || "N/A",
        grade: item?.student?.classAssignments?.[0]?.class?.name || "N/A",
        note: item.note || "Không có ghi chú",
        sent: item?.isSend,
      }));
      setStore(formatted);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idVaccine]);

  useEffect(() => {
    formatData();
  }, [result]);

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
            dispatch(postResultVaccine(idVaccine));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const onRefresh = () => {
    console.log("Pull-to-refresh triggered!");
    setRefreshing(true);
    fetchData().finally(() => {
      setRefreshing(false);
    });
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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

      <ScrollView horizontal style={{ flexGrow: 0 }}>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <View style={[styles.headerCell, styles.colStudent]}>
              <Text>Student Name</Text>
            </View>
            <View style={[styles.headerCell, styles.colParent]}>
              <Text>Parent Name</Text>
            </View>
            <View style={[styles.headerCell, styles.colGrade]}>
              <Text>Grade</Text>
            </View>
            <View style={[styles.headerCell, styles.colNote]}>
              <Text>Note</Text>
            </View>
            <View style={[styles.headerCell, styles.colStatus]}>
              <Text>Sent</Text>
            </View>
          </View>

          {store.map((item, index) => (
            <View key={index} style={styles.dataRow}>
              <View style={[styles.cell, styles.colStudent]}>
                <Text>{item.studentName}</Text>
              </View>
              <View style={[styles.cell, styles.colParent]}>
                <Text>{item.parentName}</Text>
              </View>
              <View style={[styles.cell, styles.colGrade]}>
                <Text>{item.grade}</Text>
              </View>
              <View style={[styles.cell, styles.colNote]}>
                <Text>{item.note}</Text>
              </View>
              <View style={[styles.cell, styles.colStatus]}>
                <View
                  style={[
                    styles.statusBadge,
                    item.sent === true ? styles.success : styles.error,
                  ]}
                >
                  <Text style={styles.statusText}>
                    {item.sent === true ? "Sent" : "Not send"}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  table: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    minWidth: 600,
    marginTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  headerCell: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  dataRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 10,
  },
  cell: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  colStudent: { width: 120 },
  colParent: { width: 120 },
  colGrade: { width: 80 },
  colNote: { width: 200 },
  colStatus: { width: 80 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  success: {
    backgroundColor: "#34D399",
  },
  error: {
    backgroundColor: "#f87171",
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
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
