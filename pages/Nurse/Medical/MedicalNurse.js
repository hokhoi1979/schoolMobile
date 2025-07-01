import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchVaccine } from "../../redux/vaccineNurse/vaccine/vaccineSlice";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const MedicalNurse = () => {
  const [selectedTab, setSelectedTab] = useState("vaccineDay");
  const [eventCount, setEventCount] = useState(0);
  //   const dispatch = useDispatch();
  //   const navigation = useNavigation();
  //   const {
  //     vaccine = [],
  //     loading,
  //     error,
  //   } = useSelector((state) => state.vaccine);

  //   useEffect(() => {
  //     dispatch(fetchVaccine());
  //   }, [dispatch]);

  //   useEffect(() => {
  //     if (
  //       vaccine?.data?.vaccinationEvents &&
  //       Array.isArray(vaccine?.data?.vaccinationEvents)
  //     ) {
  //       setEventCount(vaccine.data.vaccinationEvents.length);
  //     }
  //   }, [vaccine]);

  //   const handleTabPress = (tab) => {
  //     setSelectedTab(tab);
  //     if (tab === "vaccineHistory") {
  //       navigation.navigate("VaccineHistoryScreen");
  //     } else {
  //       navigation.navigate("VaccineDayScreen");
  //     }
  //   };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Medical Management</Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "vaccineDay" && styles.tabButtonActive,
            ]}
            //   onPress={() => handleTabPress("vaccineDay")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "vaccineDay" && styles.tabTextActive,
              ]}
            >
              Medical Day
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "vaccineHistory" && styles.tabButtonActive,
            ]}
            //   onPress={() => handleTabPress("vaccineHistory")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "vaccineHistory" && styles.tabTextActive,
              ]}
            >
              Vaccination History
            </Text>
          </TouchableOpacity>
        </View>

        {/* {loading && <ActivityIndicator size="large" color="#007AFF" />} */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: "System",
    textAlign: "center",
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

export default MedicalNurse;
