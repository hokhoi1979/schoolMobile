import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { postManagerCheckup } from "../../../redux/manager/PostCheckUpManager/postCheckUpManagerSlice";
import { RadioButton } from "react-native-paper";
import { fetchClassManager } from "../../../redux/manager/ClassManager/getAllClassManagerSlice";
import { fetchMedicineSupplyManager } from "../../../redux/manager/GetMedicineAndSupplyManager/getMedicineAndSupplyManagerSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import { fetchTotalStudent } from "../../../redux/manager/GetTotalStudent/getTotalStudentSlice";

const CreateMedicalScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [checkupDate, setCheckupDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [checkupContents, setCheckupContents] = useState([]);
  const [items, setItems] = useState([]);
  const [targetType, setTargetType] = useState("school");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);

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

  const handleAddContent = () => {
    setCheckupContents([
      ...checkupContents,
      { name: "", description: "", inputType: "TEXT" },
    ]);
  };

  const handleChangeContent = (index, field, value) => {
    const updated = [...checkupContents];
    updated[index][field] = value;
    setCheckupContents(updated);
  };

  const handleRemoveContent = (index) => {
    const updated = [...checkupContents];
    updated.splice(index, 1);
    setCheckupContents(updated);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        medicineID: null,
        medicineSupplyID: null,
        quantityPlanned: 1,
        notes: "",
      },
    ]);
  };

  const handleChangeItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleRemoveItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

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

  const availableGrades = [10, 11, 12];

  const handleSubmit = () => {
    if (!title.trim() || !checkupDate || checkupContents.length === 0) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

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

    const payload = {
      title,
      description,
      scheduledAt: dayjs(checkupDate).toISOString(),
      targetType: targetType.toUpperCase(),
      targetIds,
      items,
      checkupContents,
    };

    dispatch(postManagerCheckup(payload));
    Alert.alert("Success", "Checkup created successfully.");
    navigation.goBack();
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

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Create Medical Checkup
      </Text>

      <Text>Checkup Title *</Text>
      <TextInput
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
        style={{ borderBottomWidth: 1, marginBottom: 12 }}
      />

      <Text>Description</Text>
      <TextInput
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        style={{ borderBottomWidth: 1, marginBottom: 12 }}
      />

      <Text>Date *</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={{ borderBottomWidth: 1, paddingVertical: 8, marginBottom: 12 }}
      >
        <Text>{dayjs(checkupDate).format("YYYY-MM-DD")}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={checkupDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setCheckupDate(selectedDate);
            }
          }}
        />
      )}

      <Text style={{ marginTop: 16, fontWeight: "bold" }}>
        Checkup Contents *
      </Text>
      {checkupContents.map((item, index) => (
        <View key={index} style={{ marginBottom: 12 }}>
          <TextInput
            placeholder="Name"
            value={item.name}
            onChangeText={(text) => handleChangeContent(index, "name", text)}
            style={{ borderBottomWidth: 1, marginBottom: 4 }}
          />
          <TextInput
            placeholder="Description"
            value={item.description}
            onChangeText={(text) =>
              handleChangeContent(index, "description", text)
            }
            style={{ borderBottomWidth: 1, marginBottom: 4 }}
          />
          <TextInput
            placeholder="Input Type (TEXT, NUMBER, BOOLEAN)"
            value={item.inputType}
            onChangeText={(text) =>
              handleChangeContent(index, "inputType", text)
            }
            style={{ borderBottomWidth: 1, marginBottom: 4 }}
          />
          <Button
            title="Remove"
            color="red"
            onPress={() => handleRemoveContent(index)}
          />
        </View>
      ))}

      <Button title="+ Add Content" onPress={handleAddContent} />

      <Text style={{ marginTop: 24, fontWeight: "bold" }}>Target</Text>
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
        <Text style={{ marginBottom: 12, fontStyle: "italic", color: "green" }}>
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
                  color: selectedClasses.includes(cls.name) ? "blue" : "black",
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

      <Text style={{ marginTop: 24, fontWeight: "bold" }}>
        Items (Medicine / Supplies)
      </Text>
      {items.map((item, index) => (
        <View key={index} style={{ marginBottom: 12 }}>
          <Text>Medicine</Text>
          <ScrollView horizontal>
            {medicineSupply
              .filter((m) => m.type === "medicine")
              .map((med) => (
                <TouchableOpacity
                  key={`med-${med.id}`}
                  onPress={() => {
                    const updated = [...items];
                    updated[index].medicineID = med.id;
                    updated[index].medicineSupplyID = null;
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
                    updated[index].medicineSupplyID = med.id;
                    updated[index].medicineID = null;
                    setItems(updated);
                  }}
                  style={{
                    padding: 6,
                    marginRight: 6,
                    backgroundColor:
                      med.id === item.medicineSupplyID ? "#52c41a" : "#f5f5f5",
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      color:
                        med.id === item.medicineSupplyID ? "white" : "black",
                    }}
                  >
                    {med.name}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>

          <Text>Quantity</Text>
          <TextInput
            placeholder="Quantity"
            value={String(item.quantityPlanned)}
            onChangeText={(text) =>
              handleChangeItem(index, "quantityPlanned", parseInt(text) || 1)
            }
            keyboardType="numeric"
            style={{ borderBottomWidth: 1, marginBottom: 4 }}
          />
          <Text>Note</Text>
          <TextInput
            placeholder="Note"
            value={item.notes}
            onChangeText={(text) => handleChangeItem(index, "notes", text)}
            style={{ borderBottomWidth: 1, marginBottom: 4 }}
          />
          <Button
            title="Remove"
            color="red"
            onPress={() => handleRemoveItem(index)}
          />
        </View>
      ))}

      <Button title="+ Add Item" onPress={handleAddItem} />

      <View style={{ marginTop: 24 }}>
        <Button title="Create Checkup" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default CreateMedicalScreen;
