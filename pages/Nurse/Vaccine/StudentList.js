import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { fetchVaccineStudent } from "../../../redux/nurse/vaccine/fetchVaccineDetail/fetchVaccineDetailSLice";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import bg from "../../../assets/bgheader.jpg";

export default function StudentList({ route }) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const nav = useNavigation();
  const { student = [] } = useSelector((state) => state.vaccineStudent);

  const [selectedTab, setSelectedTab] = useState("StudentList");

  const fetchData = () => {
    dispatch(fetchVaccineStudent(id));
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  return (
    <SafeAreaView>
      <View>
        <View style={{ position: "relative" }}>
          <Text style={styles.header}>Vaccination Detail</Text>
        </View>

        <Pressable onPress={() => nav.goBack()} style={styles.backButton}>
          <AntDesign name="back" size={24} color="black" />
        </Pressable>

        <Image source={bg} style={styles.image} />
      </View>
      <ScrollView>
        <View style={styles.tabContainer}>
          {["StudentList", "Record", "Send"].map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={[
                styles.tabButton,
                selectedTab === tab && styles.tabButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {selectedTab === "StudentList" && (
          <>
            <View style={styles.usageContainer}>
              <View style={styles.usageHeader}>
                <AntDesign name="medicinebox" size={24} color="#49d7e3" />
                <Text style={styles.usageTitle}>Medicine Usage</Text>
              </View>

              {student.data?.vaccineEventStock?.map((item, index) => {
                const isMedicine = item.medicineID != null;
                return (
                  <View key={index} style={styles.usageItem}>
                    <Image
                      source={{
                        uri:
                          item.image ||
                          "https://cdn-icons-png.flaticon.com/512/3209/3209265.png",
                      }}
                      style={styles.usageImage}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                      <Text style={{ color: "#333", fontSize: 12 }}>
                        Planned: {item.quantityPlanned} | Used:{" "}
                        {item.quantityUsed}
                      </Text>
                      {item.notes ? (
                        <Text style={styles.usageNote}>{item.notes}</Text>
                      ) : null}
                    </View>
                    <View
                      style={[
                        styles.tag,
                        {
                          backgroundColor: isMedicine ? "#d0e8ff" : "#ffe6cc",
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color: isMedicine ? "#007bff" : "#ff6600",
                          fontWeight: "bold",
                          fontSize: 12,
                        }}
                      >
                        {isMedicine ? "Medicine" : "Supply"}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <View style={styles.tableContainer}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text
                  style={[styles.tableCell, styles.headerText, { flex: 1 }]}
                >
                  Code
                </Text>
                <Text
                  style={[styles.tableCell, styles.headerText, { flex: 2 }]}
                >
                  Fullname
                </Text>
                <Text
                  style={[styles.tableCell, styles.headerText, { flex: 2 }]}
                >
                  Status
                </Text>
                <Text
                  style={[styles.tableCell, styles.headerText, { flex: 1 }]}
                >
                  Class
                </Text>
              </View>
              {student.data?.studentResponseEntity?.map((item, index) => {
                const studentInfo = item.student;
                const fullname = studentInfo?.account?.fullname || "Unknown";
                const studentCode = studentInfo?.student_code || "N/A";
                const status = item.status || "UNKNOWN";
                const className =
                  studentInfo?.classAssignments?.[0]?.class?.name || "N/A";

                return (
                  <View key={index} style={styles.tableRow}>
                    <View style={[styles.tableCell, { flex: 1 }]}>
                      <Text>{studentCode}</Text>
                    </View>
                    <View style={[styles.tableCell, { flex: 2 }]}>
                      <Text>{fullname}</Text>
                    </View>
                    <View style={[styles.tableCell, { flex: 2 }]}>
                      <View
                        style={{
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          backgroundColor:
                            status === "ACCEPTED"
                              ? "#4aba32"
                              : status === "PENDING"
                              ? "#28aaeb"
                              : "#e34949",
                          borderRadius: 12,
                          alignSelf: "flex-start",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 10,
                            fontWeight: "bold",
                          }}
                        >
                          {status}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.tableCell, { flex: 1 }]}>
                      <Text>{className}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        )}

        {selectedTab === "Record" && (
          <Text style={{ margin: 20, fontStyle: "italic" }}>
            Record content here...
          </Text>
        )}

        {selectedTab === "Send" && (
          <Text style={{ margin: 20, fontStyle: "italic" }}>
            Send content here...
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    padding: 7,
    backgroundColor: "#dcdcdc",
    borderRadius: 50,
    marginLeft: 10,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    padding: 10,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 10,
    gap: 8,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: "black",
  },
  tabText: {
    fontSize: 12,
    color: "#333",
  },
  tabTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  usageContainer: {
    padding: 10,
    backgroundColor: "white",
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  usageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  usageTitle: {
    fontWeight: "bold",
    marginLeft: 5,
  },
  usageItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  usageImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 10,
  },
  usageNote: {
    fontStyle: "italic",
    fontSize: 11,
    color: "#666",
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
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
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
  },
  tableCell: {
    padding: 10,
    fontSize: 13,
    color: "#333",
    textAlign: "left",
  },
  headerText: {
    fontWeight: "bold",
    color: "#000",
  },
});
