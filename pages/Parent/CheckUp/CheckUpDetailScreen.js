import React from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const CheckUpDetailScreen = ({ route }) => {
  const { checkup, loading, error } = useSelector(
    (state) => state.detailCheckUpParent
  );
  const detail = checkup?.data?.data?.data;

  if (loading || !detail) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{detail.title}</Text>
        <Text style={styles.sub}>
          📅 {new Date(detail.scheduledAt).toLocaleString("vi-VN")}
        </Text>
        <Text style={styles.description}>
          {detail.description || "No description"}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Checkup Items</Text>
          {detail.content?.map((item) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.itemTitle}>🩺 {item.name}</Text>
              <Text style={styles.itemDesc}>
                {item.description || "No description"}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Targets</Text>
          {detail.targets?.map((t, idx) => (
            <Text key={idx} style={styles.target}>
              🎯 {t.school || t.className || `Grade ${t.grade}`}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckUpDetailScreen;

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", color: "#16a34a" },
  sub: { marginTop: 4, fontSize: 14, color: "#6b7280" },
  description: { marginTop: 12, fontSize: 14, lineHeight: 20 },
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  item: {
    backgroundColor: "#f0fdf4",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemTitle: { fontWeight: "bold", color: "#065f46" },
  itemDesc: { marginTop: 4, fontSize: 13, color: "#4b5563" },
  target: { fontSize: 14, marginBottom: 4, color: "#3b82f6" },
});
