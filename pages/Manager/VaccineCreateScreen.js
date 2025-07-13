import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Picker,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { fetchClassManager } from "../../redux/manager/ClassManager/getAllClassManagerSlice";
import { fetchMedicineSupplyManager } from "../../redux/manager/GetMedicineAndSupplyManager/getMedicineAndSupplyManagerSlice";
import { postManagerVaccine } from "../../redux/manager/CreateVaccineManager/createVaccineManagerSlice";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { fetchTotalStudent } from "../../redux/manager/GetTotalStudent/getTotalStudentSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateVaccineScreen = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();

  const [vaccineName, setVaccineName] = useState("");
  const [vaccineDescription, setVaccineDescription] = useState("");
  const [vaccineDate, setVaccineDate] = useState(new Date());
  const [targetType, setTargetType] = useState("school");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [items, setItems] = useState([]);

  const classList = useSelector(
    (state) => state.getClassManager.classManager.data || []
  );

  const medicineSupply = useSelector(
    (state) => state.getMedicineSupplyManager.medicineSupply || []
  );

  useEffect(() => {
    dispatch(fetchClassManager());
    dispatch(fetchMedicineSupplyManager());
  }, []);

  const handleCreate = async () => {
    const classIdMap = {};
    classList.forEach((cls) => {
      classIdMap[cls.name] = cls.id;
    });

    let targetIds = [];
    if (targetType === "class") {
      targetIds = selectedClasses.map((name) => classIdMap[name]);
    } else if (targetType === "grade") {
      targetIds = selectedGrades;
    }

    const cleanedItems = items.map((item) => {
      const cleaned = {
        quantityPlanned: item.quantityPlanned,
      };
      if (item.medicineID != null) cleaned.medicineID = item.medicineID;
      if (item.medicineSupplyID != null)
        cleaned.medicineSupplyID = item.medicineSupplyID;
      if (item.notes?.trim()) cleaned.notes = item.notes.trim();
      return cleaned;
    });

    const payload = {
      name: vaccineName,
      description: vaccineDescription,
      scheduledAt: dayjs(vaccineDate).format("YYYY-MM-DD"),
      targetType: targetType.toUpperCase(),
      targetIds,
      items: cleanedItems,
    };

    try {
      await dispatch(postManagerVaccine(payload));
      nav.goBack();
    } catch (err) {
      Alert.alert("Error", "Failed to create vaccination event");
    }
  };

  const availableGrades = [10, 11, 12];

  const toggleClassSelection = (className) => {
    if (selectedClasses.includes(className)) {
      setSelectedClasses(selectedClasses.filter((c) => c !== className));
    } else {
      setSelectedClasses([...selectedClasses, className]);
    }
  };

  const toggleGradeSelection = (grade) => {
    if (selectedGrades.includes(grade)) {
      setSelectedGrades(selectedGrades.filter((g) => g !== grade));
    } else {
      setSelectedGrades([...selectedGrades, grade]);
    }
  };
  const totalStudents = useSelector(
    (state) => state.getTotalStudent?.totalStudents ?? 0
  );

  useEffect(() => {
    if (targetType === "school") {
      dispatch(fetchTotalStudent({ targetType: "SCHOOL", targetIds: [] }));
    } else if (targetType === "class" && selectedClasses.length > 0) {
      const classIds = classList
        .filter((cls) => selectedClasses.includes(cls.name))
        .map((cls) => String(cls.id));

      dispatch(fetchTotalStudent({ targetType: "CLASS", targetIds: classIds }));
    } else if (targetType === "grade" && selectedGrades.length > 0) {
      const gradeIds = selectedGrades.map(String);
      dispatch(fetchTotalStudent({ targetType: "GRADE", targetIds: gradeIds }));
    }
  }, [targetType, selectedClasses, selectedGrades]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>
          New Vaccine Event
        </Text>

        <Text>Name</Text>
        <TextInput
          value={vaccineName}
          onChangeText={setVaccineName}
          style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
        />

        <Text>Description</Text>
        <TextInput
          value={vaccineDescription}
          onChangeText={setVaccineDescription}
          multiline
          style={{ borderWidth: 1, padding: 8, marginBottom: 12, height: 80 }}
        />

        <Text>Date</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 6,
            marginBottom: 12,
            backgroundColor: "#fff",
          }}
        >
          <Text>{dayjs(vaccineDate).format("YYYY-MM-DD")}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={vaccineDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setVaccineDate(selectedDate);
              }
            }}
          />
        )}

        <Text>Target Type</Text>
        <RadioButton.Group onValueChange={setTargetType} value={targetType}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value="school" />
            <Text>School</Text>
            <RadioButton value="class" />
            <Text>Class</Text>
            <RadioButton value="grade" />
            <Text>Grade</Text>
          </View>
        </RadioButton.Group>
        {targetType === "school" && (
          <Text
            style={{ marginBottom: 12, fontStyle: "italic", color: "green" }}
          >
            Total students in school: {totalStudents}
          </Text>
        )}

        {targetType === "class" && (
          <View style={{ marginBottom: 12 }}>
            <Text>Select Classes:</Text>
            {classList.map((cls) => (
              <TouchableOpacity
                key={cls.id}
                onPress={() => toggleClassSelection(cls.name)}
                style={{ padding: 6 }}
              >
                <Text
                  style={{
                    color: selectedClasses.includes(cls.name)
                      ? "blue"
                      : "black",
                  }}
                >
                  {cls.name}
                </Text>
              </TouchableOpacity>
            ))}
            {selectedClasses.length > 0 && (
              <Text
                style={{
                  marginTop: 8,
                  fontStyle: "italic",
                  color: "green",
                }}
              >
                Total selected students: {totalStudents}
              </Text>
            )}
          </View>
        )}

        {targetType === "grade" && (
          <View style={{ marginBottom: 12 }}>
            <Text>Select Grades:</Text>
            {availableGrades.map((g) => (
              <TouchableOpacity
                key={g}
                onPress={() => toggleGradeSelection(g)}
                style={{ padding: 6 }}
              >
                <Text
                  style={{
                    color: selectedGrades.includes(g) ? "blue" : "black",
                  }}
                >
                  Grade {g}
                </Text>
              </TouchableOpacity>
            ))}
            {selectedGrades.length > 0 && (
              <Text
                style={{
                  marginTop: 8,
                  fontStyle: "italic",
                  color: "green",
                }}
              >
                Total selected students: {totalStudents}
              </Text>
            )}
          </View>
        )}

        <View style={{ marginTop: 16 }}>
          <Text style={{ fontWeight: "bold" }}>Medicine</Text>
          <TouchableOpacity
            onPress={() =>
              setItems([
                ...items,
                {
                  medicineID: null,
                  medicineSupplyID: null,
                  quantityPlanned: 1,
                  notes: "",
                },
              ])
            }
            style={{
              backgroundColor: "#eee",
              padding: 8,
              marginVertical: 8,
              borderRadius: 4,
            }}
          >
            <Text>Add Item</Text>
          </TouchableOpacity>

          {items.map((item, idx) => (
            <View
              key={idx}
              style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
            >
              <Text>#{idx + 1}</Text>
              <Text>Medicine</Text>
              <ScrollView horizontal>
                {medicineSupply
                  .filter((m) => m.type === "medicine")
                  .map((med) => (
                    <TouchableOpacity
                      key={`med-${med.id}`}
                      onPress={() => {
                        const updated = [...items];
                        updated[idx].medicineID = med.id;
                        updated[idx].medicineSupplyID = null;
                        setItems(updated);
                      }}
                      style={{
                        padding: 6,
                        marginRight: 6,
                        backgroundColor:
                          med.id === item.medicineID ? "#1890ff" : "#f5f5f5",
                        borderRadius: 4,
                      }}
                    >
                      <Text
                        style={{
                          color: med.id === item.medicineID ? "white" : "black",
                        }}
                      >
                        {med.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>

              <Text>Supply</Text>
              <ScrollView horizontal>
                {medicineSupply
                  .filter((m) => m.type === "supply")
                  .map((med) => (
                    <TouchableOpacity
                      key={`sup-${med.id}`}
                      onPress={() => {
                        const updated = [...items];
                        updated[idx].medicineSupplyID = med.id;
                        updated[idx].medicineID = null;
                        setItems(updated);
                      }}
                      style={{
                        padding: 6,
                        marginRight: 6,
                        backgroundColor:
                          med.id === item.medicineSupplyID
                            ? "#52c41a"
                            : "#f5f5f5",
                        borderRadius: 4,
                      }}
                    >
                      <Text
                        style={{
                          color:
                            med.id === item.medicineSupplyID
                              ? "white"
                              : "black",
                        }}
                      >
                        {med.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>

              <Text>Quantity</Text>
              <TextInput
                keyboardType="numeric"
                value={String(item.quantityPlanned)}
                onChangeText={(val) => {
                  const updated = [...items];
                  updated[idx].quantityPlanned = parseInt(val) || 1;
                  setItems(updated);
                }}
                style={{ borderWidth: 1, padding: 6, marginBottom: 6 }}
              />

              <Text>Notes</Text>
              <TextInput
                value={item.notes}
                onChangeText={(val) => {
                  const updated = [...items];
                  updated[idx].notes = val;
                  setItems(updated);
                }}
                style={{ borderWidth: 1, padding: 6 }}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleCreate}
          style={{
            marginTop: 24,
            backgroundColor: "#1890ff",
            padding: 16,
            borderRadius: 8,
          }}
        >
          <Text
            style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
          >
            Create
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: "600", marginTop: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "#add8e6",
  },
  itemBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
  },
});

export default CreateVaccineScreen;
