import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

import VaccineNurse from "../pages/Nurse/Vaccine/VaccineNurse";
import MedicalNurse from "../pages/Nurse/Medical/MedicalNurse";

//👨‍👩‍👧‍👦 Parent
import VaccineParent from "../pages/Parent/Vaccine/VaccineParent";
import CheckUpParent from "../pages/Parent/CheckUp/CheckUpParent";
import VaccineResultDetail from "../pages/Parent/Vaccine/VaccineResultDetail";
import CheckUpDetailScreen from "../pages/Parent/CheckUp/CheckUpDetailScreen";
import CheckUpResultScreen from "../pages/Parent/CheckUp/CheckUpResultScreen";

// 🧑‍🎓 Student Screens
import Profile from "../pages/Student/Profile/Profile";
import ChangePassword from "../pages/Student/ChangePassword/ChangePassword";
// 👨‍💼 Manager, 👨‍👩‍👧‍👦 Parent, 🧑‍🎓 Student Screen

// import ManagerMain from "../pages/Manager/ManagerMain"; // Tạo file này
// import ParentMain from "../pages/Parent/ParentMain";   // Tạo file này
// import StudentMain from "../pages/Student/StudentMain"; // Tạo file này

//  Login screen
import Login from "../pages/Login/Login";
import StudentList from "../pages/Nurse/Vaccine/StudentList";
import CheckUp from "../pages/Parent/CheckUp/CheckUpParent";
import StudentListMedical from "../pages/Nurse/Medical/StudentListMedical";
import VaccineManager from "../pages/Manager/VaccineManager";
import CheckupManager from "../pages/Manager/MedicalManager";
import ManagerStack from "../pages/Manager/ManagerStack";
import MedicalStack from "../pages/Manager/MedicalCheckUpManager/MedicalStackScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// NURSE
const NurseTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        if (route.name === "Vaccine")
          return <MaterialIcons name="vaccines" size={size} color={color} />;
        else if (route.name === "Medical")
          return <Ionicons name="heart" size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Vaccine" component={VaccineNurse} />
    <Tab.Screen name="Medical" component={MedicalNurse} />
  </Tab.Navigator>
);

const ManagerTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        if (route.name === "Vaccine")
          return <MaterialIcons name="vaccines" size={size} color={color} />;
        else if (route.name === "Checkup")
          return <Ionicons name="medkit" size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Vaccine" component={ManagerStack} />
    <Tab.Screen name="Checkup" component={MedicalStack} />
  </Tab.Navigator>
);

const ParentTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        if (route.name === "Vaccine")
          return <MaterialIcons name="vaccines" size={size} color={color} />;
        else if (route.name === "CheckUp")
          return (
            <FontAwesome5 name="notes-medical" size={size} color={color} />
          );
      },
    })}
  >
    <Tab.Screen name="Vaccine" component={VaccineParent} />
    <Tab.Screen name="CheckUp" component={CheckUpParent} />
  </Tab.Navigator>
);

const StudentTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        if (route.name === "Profile")
          return <AntDesign name="profile" size={24} color="black" />;
        else if (route.name === "ChangePassword")
          return 
            <MaterialCommunityIcons
              name="lock-reset"
              size={24}
              color="#007bff"
            />
      },
    })}
  >
     <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="ChangePassword" component={ChangePassword} />

  </Tab.Navigator>
);

const AppNavigation = () => {
  const { user } = useSelector((state) => state.account);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Nếu chưa đăng nhập */}
          {!user?.roleID && <Stack.Screen name="Login" component={Login} />}

          {/* Sau khi đăng nhập sẽ điều hướng theo role */}
          {user?.roleID === 3 && (
            <>
              <Stack.Screen name="NurseMain" component={NurseTabs} />
              <Stack.Screen name="vaccineStudent" component={StudentList} />
              <Stack.Screen
                name="checkupStudent"
                component={StudentListMedical}
              />
            </>
          )}
          {user?.roleID === 2 && (
            <Stack.Screen name="ManagerMain" component={ManagerTabs} />
          )}

 {user?.roleID === 5 && (
            <Stack.Screen name="StudentMain" component={StudentTabs} />
          )}

          {user?.roleID === 4 && (
            <>
              <Stack.Screen name="ParentMain" component={ParentTabs} />
              <Stack.Screen name="ParentCheckUp" component={CheckUp} />
              <Stack.Screen
                name="VaccineResultDetail"
                component={VaccineResultDetail}
              />
              <Stack.Screen
                name="CheckUpDetailScreen"
                component={CheckUpDetailScreen}
              />
              <Stack.Screen
                name="CheckUpResultScreen"
                component={CheckUpResultScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export { AppNavigation };