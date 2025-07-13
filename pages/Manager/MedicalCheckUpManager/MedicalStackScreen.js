// 🔁 navigation/MedicalStack.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CheckupManager from "../MedicalManager";
import CreateMedicalScreen from "./CreateMedicalScreen";

const Stack = createNativeStackNavigator();

export default function MedicalStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CheckupManager" component={CheckupManager} />
      <Stack.Screen name="createCheckup" component={CreateMedicalScreen} />
    </Stack.Navigator>
  );
}
