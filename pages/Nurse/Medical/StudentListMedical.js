import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import bg from "../../../assets/bgheader.jpg";
import { fetchStudentCheckup } from "../../../redux/nurse/checkup/fetchCheckupDetail/checkupDetailSlice";
import MedicalResult from "./MedicalResult";

export default function StudentListMedical({ route }) {
  const { idCheckup } = route.params;
  const [store, setStore] = useState({
    medicineUsage: [],
    studentResponses: [],
  });

  const dispatch = useDispatch();
  const nav = useNavigation();

  const { listStudentCheckup = {} } = useSelector(
    (state) => state.studentCheckup
  );

  const [selectedTab, setSelectedTab] = useState("StudentList");

  const fetchData = () => {
    dispatch(fetchStudentCheckup(idCheckup));
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (listStudentCheckup?.data) {
      const medicineUsage =
        listStudentCheckup.data.vaccineEventStock?.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          quantityPlanned: item.quantityPlanned,
          quantityUsed: item.quantityUsed,
          notes: item.notes,
          isMedicine: item.type === "medicine",
        })) || [];

      const studentResponses =
        listStudentCheckup.data.studentResponseEntity?.map((item) => {
          const studentInfo = item.student;
          return {
            status: item.status,
            fullname: studentInfo?.account?.fullname || "Unknown",
            studentCode: studentInfo?.student_code || "N/A",
            className: studentInfo?.classAssignments?.[0]?.class?.name || "N/A",
          };
        }) || [];
      const checkupContents =
        listStudentCheckup.data?.content?.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          date: new Date(item.createdAt).toLocaleDateString("en-GB"),
        })) || [];

      setStore({
        medicineUsage,
        studentResponses,
        checkupContents,
      });
    }
  }, [listStudentCheckup]);

  console.log("STORE", store);

  return (
    <SafeAreaView>
      <View>
        <View style={{ position: "relative" }}>
          <Text style={styles.header}>Checkup Detail</Text>
        </View>

        <Pressable onPress={() => nav.goBack()} style={styles.backButton}>
          <AntDesign name="back" size={24} color="black" />
        </Pressable>

        <Image source={bg} style={styles.image} />
      </View>

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

      <ScrollView
        contentContainerStyle={{
          minHeight: Dimensions.get("window").height,
        }}
      >
        {selectedTab === "StudentList" && (
          <>
            <View style={styles.usageContainer}>
              <View style={styles.usageHeader}>
                <AntDesign name="medicinebox" size={24} color="#49d7e3" />
                <Text style={styles.usageTitle}>Medicine Usage</Text>
              </View>

              {store.medicineUsage?.map((item, index) => (
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
                        backgroundColor: item.isMedicine
                          ? "#d0e8ff"
                          : "#ffe6cc",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: item.isMedicine ? "#007bff" : "#ff6600",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      {item.isMedicine ? "Medicine" : "Supply"}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.checkupContentContainer}>
              <Text style={styles.sectionTitle}>📝 Checkup Content</Text>
              {store.checkupContents?.map((item) => (
                <View key={item.id} style={styles.contentCard}>
                  <Text style={styles.contentTitle}>{item.name}</Text>
                  <Text style={styles.contentDescription}>
                    {item.description}
                  </Text>
                  <Text style={styles.contentDate}>🕒 {item.date}</Text>
                </View>
              ))}
            </View>

            <View style={styles.tableContainer}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text
                  style={[styles.tableCell, styles.headerText, { flex: 1 }]}
                >
                  Number
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

              {store.studentResponses?.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <View style={[styles.tableCell, { flex: 1 }]}>
                    <Text>{index}</Text>
                  </View>
                  <View style={[styles.tableCell, { flex: 2 }]}>
                    <Text>{item.fullname}</Text>
                  </View>
                  <View style={[styles.tableCell, { flex: 2 }]}>
                    <View
                      style={{
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        backgroundColor:
                          item.status === "ACCEPTED"
                            ? "#4aba32"
                            : item.status === "PENDING"
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
                        {item.status}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.tableCell, { flex: 1 }]}>
                    <Text>{item.className}</Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        {selectedTab === "Record" && (
          <>
            <MedicalResult idCheckup={idCheckup} />
          </>
        )}

        {selectedTab === "Send" && <></>}
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
  checkupContentContainer: {
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    color: "#222",
  },
  contentCard: {
    backgroundColor: "#fefefe",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  contentTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  contentDescription: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  contentDate: {
    fontSize: 12,
    color: "#888",
  },
});
