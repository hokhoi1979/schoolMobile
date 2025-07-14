import React from "react";
import VaccineManager from "./VaccineManager";
import VaccineCreateScreen from "./VaccineCreateScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateMedicalScreen from "./MedicalCheckUpManager/CreateMedicalScreen";
import CheckupManager from "./MedicalManager";

const Stack = createNativeStackNavigator();

export default function ManagerStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="CheckupManager" component={CheckupManager} /> */}
      <Stack.Screen name="VaccineManager" component={VaccineManager} />
      <Stack.Screen name="createVaccine" component={VaccineCreateScreen} />
      {/* <Stack.Screen name="createCheckup" component={CreateMedicalScreen} /> */}
    </Stack.Navigator>
  );
}
