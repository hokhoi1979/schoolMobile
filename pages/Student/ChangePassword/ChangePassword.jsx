import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import studentApi from "../../../apis/student/studentApi";
import Header from "../../../components/header";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword) {
      Alert.alert("Thông báo", "Vui lòng nhập mật khẩu hiện tại");
      return;
    }
    if (!newPassword) {
      Alert.alert("Thông báo", "Vui lòng nhập mật khẩu mới");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Thông báo", "Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }
    if (!confirmPassword) {
      Alert.alert("Thông báo", "Vui lòng nhập xác nhận mật khẩu");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Thông báo", "Mật khẩu mới không khớp");
      return;
    }
    const payload = {
      oldPassword: currentPassword,
      newPassword,
      confirmPassword: confirmPassword,
    };
    try {
      const res = await studentApi.changePassword(payload);
      if (res.statusCode === 200) {
        Alert.alert("Thành công", "Đổi mật khẩu thành công!");
      } else {
        Alert.alert("Thất bại", res.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      const errRes = error?.response?.data;

      if (errRes?.message) {
        Alert.alert("Thất bại", errRes.message);
      } else {
        Alert.alert("Lỗi", "Không thể đổi mật khẩu, vui lòng thử lại");
      }

      console.error("Lỗi đổi mật khẩu:", errRes);
    }
    // Gọi API đổi mật khẩu tại đây
    // Alert.alert("Thành công", "Đổi mật khẩu thành công!");
  };

  const handleReset = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <SafeAreaView>
      <Header title={"Change Password"} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🔐 Đổi mật khẩu</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>ℹ️ Thông tin quan trọng</Text>
          <Text style={styles.infoText}>
            Sau khi đổi mật khẩu thành công, bạn cần dùng mật khẩu mới để đăng
            nhập lần sau.
          </Text>
        </View>

        {/* Current password */}
        <Text style={styles.label}>
          <Text style={styles.required}>* </Text>Mật khẩu hiện tại
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry={!showCurrent}
            placeholder="Nhập mật khẩu hiện tại"
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
            <Ionicons
              name={showCurrent ? "eye-off" : "eye"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* New password */}
        <Text style={styles.label}>Mật khẩu mới</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNew}
            placeholder="Nhập mật khẩu mới"
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowNew(!showNew)}>
            <Ionicons
              name={showNew ? "eye-off" : "eye"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm password */}
        <Text style={styles.label}>Xác nhận mật khẩu</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirm}
            placeholder="Nhập lại mật khẩu mới"
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            <Ionicons
              name={showConfirm ? "eye-off" : "eye"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
            <Text style={styles.resetText}>Làm mới</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.changeBtn}
            onPress={handleChangePassword}
          >
            <Text style={styles.changeText}>Đổi mật khẩu</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F7F9FC",
    flexGrow: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: "#e6f0ff",
    borderLeftWidth: 4,
    borderLeftColor: "#1e90ff",
    padding: 12,
    marginBottom: 20,
    borderRadius: 6,
  },
  infoTitle: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#007bff",
  },
  infoText: {
    color: "#333",
  },
  label: {
    marginBottom: 6,
    fontWeight: "500",
  },
  required: {
    color: "red",
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },
  resetBtn: {
    flex: 1,
    backgroundColor: "#333",
    padding: 12,
    alignItems: "center",
    borderRadius: 6,
  },
  resetText: {
    color: "#ffff",
    fontWeight: "500",
  },
  changeBtn: {
    flex: 1,
    backgroundColor: "#007bff",
    padding: 12,
    alignItems: "center",
    borderRadius: 6,
  },
  changeText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default ChangePassword;
