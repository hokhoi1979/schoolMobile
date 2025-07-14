import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Card,
  Divider,
  Text,
  ActivityIndicator,
  Surface,
  useTheme,
} from "react-native-paper";
import moment from "moment";
import studentApi from "../../../apis/student/studentApi";

// Icon
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import LichSuScreen from "../../../components/Student/LichSuScreen";
import Header from "../../../components/header";
import { SafeAreaView } from "react-native-safe-area-context";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await studentApi.getProfile();
        const studentID = res.data.id;
        const response = await studentApi.getDetailStudent(studentID);
        setProfile(response);
      } catch (err) {
        console.log("❌ Lỗi lấy profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator animating size="large" />
        <Text>Đang tải thông tin...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centered}>
        <Text>Không thể tải dữ liệu học sinh.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <Header title={"Student Profile"}/>
      <FlatList
        data={[]} // dummy data
        keyExtractor={() => "dummy"}
        renderItem={null}
        ListHeaderComponent={
          <>
            <Card style={styles.card}>
              <Card.Title
                title={profile.account.fullname}
                subtitle={`Lớp: ${profile.lastAcamedicYear.class.name}`}
                left={(props) => (
                  <Avatar.Image
                    {...props}
                    source={require("../../../assets/bgBottom.jpg")} // hoặc null nếu không có avatar
                    size={48}
                  />
                )}
              />
              <Card.Content>
                <Divider style={styles.divider} />
                <Text style={styles.sectionTitle}>🎓 Thông tin học sinh</Text>

                <InfoItem label="Họ tên" value={profile.account.fullname} />
                <InfoItem label="Email" value={profile.account.email} />
                <InfoItem
                  label="Ngày sinh"
                  value={moment(profile.dateOfBirth).format("DD/MM/YYYY")}
                />
                <InfoItem label="Giới tính" value={profile.gender} />
                <InfoItem label="Mã học sinh" value={profile.student_code} />
                <InfoItem
                  label="Đã tốt nghiệp"
                  value={profile.graduated ? "✅ Có" : "❌ Chưa"}
                />

                <Divider style={styles.divider} />
                <Text style={styles.sectionTitle}>👨‍👩‍👧 Phụ huynh</Text>

                <InfoItem
                  label="Họ tên phụ huynh"
                  value={profile.ParentInfo.fullname}
                />
                <InfoItem
                  label="Email phụ huynh"
                  value={profile.ParentInfo.email}
                />
                <InfoItem
                  label="SĐT phụ huynh"
                  value={profile.ParentInfo.phone}
                />

                <Divider style={styles.divider} />
              </Card.Content>
            </Card>
            <View
              style={{
                minHeight: 300,
              }}
            >
              <LichSuScreen profile={profile} />
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

const InfoItem = ({ label, value }) => (
  <Surface style={styles.surface}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </Surface>
);

const styles = StyleSheet.create({
  container: {
    // marginTop: 50,
    padding: 16,
    backgroundColor: "#F7F9FC",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginTop: 20,
    borderRadius: 16,
    paddingBottom: 20,
    elevation: 4,
  },
  divider: {
    marginVertical: 12,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center", // giúp icon và chữ canh giữa theo chiều dọc
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    // marginLeft: 8,
    color: "#333",
  },
  surface: {
    backgroundColor: "#FFF",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontWeight: "600",
    fontSize: 15,
    color: "#555",
  },
  value: {
    fontSize: 15,
    color: "#111",
    flexShrink: 1,
    textAlign: "right",
  },
});

export default StudentProfile;
