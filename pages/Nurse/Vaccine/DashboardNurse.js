import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const stats = [
  { label: "Today's Medical Events", value: 7 },
  { label: "Vaccination Rate", value: "72%" },
  { label: "Health Check", value: "28/6" },
  { label: "Examination Participation Rate", value: "95%" },
];

const menu = [
  { key: "event", label: "Medical Events" },
  { key: "vaccine", label: "Vaccination" },
  { key: "checkup", label: "Medical Checkup" },
  { key: "trend", label: "Trend" },
];

export default function DashboardNurse() {
  const [selected, setSelected] = useState("event");
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn header mặc định
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.customHeader}>
        <Text style={styles.customHeaderTitle}>Dashboard</Text>
      </View>

      <View style={styles.statsRow}>
        {stats.map((item, idx) => (
          <View key={idx} style={styles.statCard}>
            <Text style={styles.statLabel}>{item.label}</Text>
            <Text style={styles.statValue}>{item.value}</Text>
          </View>
        ))}
      </View>
      <View style={styles.menuRow}>
        {menu.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.menuItem,
              selected === item.key && styles.menuItemSelected,
            ]}
            onPress={() => setSelected(item.key)}
          >
            <Text
              style={[
                styles.menuText,
                selected === item.key && styles.menuTextSelected,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.contentBox}>
        <Text style={{ textAlign: "center", color: "#888" }}>
          {menu.find((m) => m.key === selected)?.label} content here.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    textAlign: "center",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2a7",
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 8,
  },
  menuItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  menuItemSelected: {
    backgroundColor: "#fff",
  },
  menuText: {
    color: "#555",
    fontWeight: "500",
  },
  menuTextSelected: {
    color: "#2a7",
    fontWeight: "bold",
  },
  contentBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 24,
    minHeight: 120,
    justifyContent: "center",
    marginBottom: 40,
  },
  customHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50, // để tránh bị che bởi notch/status bar
    paddingHorizontal: 16,
    paddingBottom: 12,
    marginBottom: 16,
  },

  customHeaderTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 12,
  },
});
