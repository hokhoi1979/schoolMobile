import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import logo from "../assets/logo.png";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../redux/auth/authSlice";

export default function Header({ title }) {
  const dispatch = useDispatch();
  const nav = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Confirm logout",
      "Do you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            dispatch(logout());
            nav.navigate("Login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
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
      <Text style={styles.header}>{title}</Text>
      <Pressable
        onPress={handleLogout}
        style={{ width: "25%", alignItems: "flex-end", paddingRight: 10 }}
      >
        <View>
          <MaterialIcons name="logout" size={24} color="black" />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: "System",
  },
});
