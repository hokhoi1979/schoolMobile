import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
  Pressable,
} from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchVaccine } from "../../redux/vaccineNurse/vaccine/vaccineSlice";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import Entypo from "@expo/vector-icons/Entypo";

import logo from "../../../assets/logo.png";
import { logout } from "../../../redux/auth/authSlice";
import { FlatList } from "react-native-gesture-handler";
import { fetchVaccine } from "../../../redux/nurse/vaccine/fetchVaccine/fetchVaccineSlice";
import bg from "../../../assets/bgheader.jpg";
const VaccineNurse = () => {
  const [store, setStore] = useState([]);
  const dispatch = useDispatch();
  const nav = useNavigation();
  const screenWidth = Dimensions.get("window").width;

  const handleLogout = () => {
    dispatch(logout());
    nav.navigate("Login");
  };

  const {
    vaccine = [],
    loading,
    error,
  } = useSelector((state) => state.vaccine);

  const fetchData = () => {
    dispatch(fetchVaccine());
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const formatData = () => {
    if (
      vaccine?.data?.vaccinationEvents &&
      Array.isArray(vaccine.data.vaccinationEvents)
    ) {
      const formatted = vaccine.data.vaccinationEvents.map((event) => ({
        id: event.id,
        name: event.name,
        description: event.description,
        date: new Date(event.scheduledAt).toLocaleDateString("en-GB"),
        status: event.status,
        customMailTitle: event.customMailTitle,
        customMailBody: event.customMailBody,
        totalStudent: event.studentResponseCount?.totalStudent ?? "Unknown",
        studentsAcceptCount:
          event.studentResponseCount?.studentsAcceptCount ?? "Unknown",
        studentsDeclinedCount:
          event.studentResponseCount?.studentsDeclinedCount ?? "Unknown",
        studentPendingCount:
          event.studentResponseCount?.studentPendingCount ?? "Unknown",
        targets: event.targets,
      }));
      setStore(formatted);
    }
  };

  useEffect(() => {
    formatData();
  }, [vaccine]);

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "25%",
          }}
        >
          <Image source={logo} style={{ width: 40, height: 40 }} />
          <Text style={{ fontSize: 12, fontWeight: "600" }}>School Health</Text>
        </View>
        <Text style={styles.header}>Vaccination</Text>
        <Pressable
          onPress={handleLogout}
          style={{ width: "25%", alignItems: "flex-end", paddingRight: 10 }}
        >
          <View>
            <MaterialIcons name="logout" size={24} color="black" />
          </View>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={bg}
          style={{
            width: "100%",
            height: 200,
            marginTop: 5,
            resizeMode: "cover", // hoặc "contain" tùy mục đích
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            paddingRight: 15,
          }}
        />

        <FlatList
          data={store}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                width: screenWidth / 2 - 24,
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
                height: 250,
              }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <Text style={{ fontSize: 13, color: "#666" }}>
                    📌 Status:{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      paddingHorizontal: 4,
                      paddingVertical: 4,
                      backgroundColor:
                        item.status === "SUCCESSED" ? "orange" : "#2eab13",
                      color: "white",
                      borderRadius: 6,
                      overflow: "hidden",
                    }}
                  >
                    {item.status}
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom: 4,
                    color: "#333",
                  }}
                >
                  {item.name}
                </Text>

                <Text style={{ fontSize: 13, color: "#888", marginBottom: 10 }}>
                  📅 Date: <Text style={{ color: "#444" }}>{item.date}</Text>
                </Text>

                <Text style={{ fontSize: 13, color: "#444", marginBottom: 4 }}>
                  👨‍👩‍👧 Students :{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {item.studentsAcceptCount} / {item.totalStudent}
                  </Text>
                </Text>

                <Text
                  style={{
                    fontSize: 13,
                    color: "#555",
                    fontWeight: "bold",
                    marginTop: 8,
                    marginBottom: 4,
                  }}
                >
                  🎯 Target Classes:
                </Text>
                {item.targets?.length > 0 ? (
                  item.targets.map((target, index) => (
                    <Text
                      key={index}
                      style={{ fontSize: 13, color: "#555", marginLeft: 6 }}
                    >
                      • {target.className} (Grade {target.grade})
                    </Text>
                  ))
                ) : (
                  <Text
                    style={{
                      fontSize: 13,
                      color: "#aaa",
                      marginLeft: 6,
                    }}
                  >
                    <Text
                      style={{ fontSize: 13, color: "#555", marginLeft: 6 }}
                    >
                      • School
                    </Text>
                  </Text>
                )}
              </View>

              <Pressable
                onPress={() => {
                  nav.navigate("NurseStudent", { id: item.id });
                }}
                style={({ pressed }) => ({
                  marginTop: 10,
                  backgroundColor: pressed ? "gray" : "black",
                  paddingVertical: 6,
                  borderRadius: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 5,
                })}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  View Detail
                </Text>
                <Entypo name="direction" size={18} color="white" />
              </Pressable>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    paddingLeft: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: "System",
  },
  statBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F3F3",
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  tabButtonActive: {
    backgroundColor: "#fff",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
  },
  tabTextActive: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default VaccineNurse;
