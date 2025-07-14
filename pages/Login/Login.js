import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import bg from "../../assets/background.jpg";
import logo from "../../assets/logo.png";
import bgBottom from "../../assets/bgBottom.jpg";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../../redux/auth/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [customError, setCustomError] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.account);

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    setEmailError("");
    setPasswordError("");
    setCustomError("");

    if (!email) {
      setEmailError("Email is not empty!");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Email format is invalid!");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is not empty!");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }

    return valid;
  };

  const handleLogin = () => {
    if (!validateInputs()) return;
    dispatch(
      fetchLogin({
        email,
        password,
        onSuccess: (res) => {
          console.log("Login SUCCESS from component!");
        },
      })
    );

    console.log("Email - pass", email, password);
  };

  useEffect(() => {
    if (error) {
      if (error.includes("Tài khoản không tồn tại")) {
        setCustomError("Account does not exist.");
      } else if (error.includes("Mật khẩu không đúng")) {
        setCustomError("Password is not correct.");
      } else {
        setCustomError("Login failed. Please try again.");
      }
    }
  }, [error]);

  return (
    <ImageBackground source={bg} style={styles.bg} resizeMode="cover">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ margin: "auto" }}>
          <Image source={logo} style={{ width: 100, height: 100 }} />
          <Text style={{ fontWeight: "600", margin: "auto" }}>
            School Health
          </Text>
        </View>

        <View style={styles.container}>
          {/* <Pressable
            style={styles.backButton}
            onPress={() => {
              if (navigation.canGoBack()) navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={18} color="black" />
          </Pressable> */}

          <Text style={styles.title}>Login Page</Text>
          <Text style={styles.subtitle}>
            School health is the care, prevention and health promotion of
            students in schools.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setCustomError("");
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError !== "" && <Text style={styles.error}>{emailError}</Text>}

          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0 }]}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setCustomError("");
              }}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#777"
              />
            </TouchableOpacity>
          </View>
          {passwordError !== "" && (
            <Text style={styles.error}>{passwordError}</Text>
          )}

          {customError !== "" && (
            <Text style={styles.error}>{customError}</Text>
          )}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "90%",
            height: 200,
            borderRadius: 20,
            shadowColor: "#000",
            shadowOpacity: 0.5,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 5,
            elevation: 5,
            bottom: 40,
            margin: "auto",
          }}
        >
          <Image
            source={bgBottom}
            style={{ width: "100%", height: 200, borderRadius: 20 }}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 10,
    left: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 10,
    zIndex: 10,
  },
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
    width: "95%",
    margin: "auto",
    marginBottom: 120,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "serif",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    color: "#777",
    fontStyle: "italic",
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontWeight: "600",
    backgroundColor: "#f9f9f9",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  eyeIcon: {
    paddingHorizontal: 10,
    position: "absolute",
    right: 0,
  },
  error: {
    color: "red",
    fontStyle: "italic",
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#34A0B5",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "serif",
  },
  registerText: {
    marginTop: 15,
    textAlign: "center",
    color: "#113d59",
    textDecorationLine: "underline",
    fontSize: 13,
  },
});
