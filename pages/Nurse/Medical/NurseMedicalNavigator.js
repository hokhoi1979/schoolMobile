import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MedicalNurse from "./MedicalNurse";
// import các màn hình khác nếu có

const Drawer = createDrawerNavigator();

export default function NurseMedicalNavigator() {
  return (
    <Drawer.Navigator initialRouteName="DashboardNurse">
      <Drawer.Screen
        name="MedicalNurse"
        component={MedicalNurse}
        options={{ title: "Vaccine" }}
      />
      {/* Thêm các màn hình khác ở đây, ví dụ:
      <Drawer.Screen name="Materials" component={MaterialsScreen} />
      <Drawer.Screen name="StudentProfile" component={StudentProfileScreen} />
      <Drawer.Screen name="MedicalEvent" component={MedicalEventScreen} />
      <Drawer.Screen name="VaccineDay" component={VaccineDayScreen} />
      <Drawer.Screen name="MedicalDay" component={MedicalDayScreen} />
      */}
    </Drawer.Navigator>
  );
}
