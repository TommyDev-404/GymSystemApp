import React, { useMemo, useState, useCallback, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Keyboard, ActivityIndicator } from "react-native";
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { X, Dumbbell, Plus, Trash2 } from "lucide-react-native";
import { useAddPersonalWorkout } from "../hook/useWorkout";
import { useForm } from "react-hook-form";
import { CreateWorkoutInput, ExerciseInput } from "../types/WorkoutTypes";

interface Props {
  modalRef: React.RefObject<BottomSheetModal | null>;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export function AddWorkoutModal({ modalRef, onClose, onSave }: Props) {
  const { mutate: addPersonalWorkout, isPending } = useAddPersonalWorkout();
  
  const snapPoints = useMemo(() => ["75%"], []);

  const [exercises, setExercises] = useState<ExerciseInput[]>([]);
  const [exName, setExName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Omit<CreateWorkoutInput, "exercises">>({
    defaultValues: {
      name: "",
      duration: "",
      calories: "",
    },
  });
  
  const name = watch("name");
  const duration = watch("duration");
  const calories = watch("calories");

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidHide", () => {
      modalRef.current?.snapToIndex(0);
    });
  
    return () => showSub.remove();
  }, []);
 
  const addExercise = () => {
    if (!exName.trim()) {
      setError("root", {
        type: "required",
        message: "Exercise name is required",
      });
      return;
    }
  
    if (!sets.trim() || Number(sets) <= 0) {
      setError("root", {
        type: "required",
        message: "Sets must be greater than 0",
      });
      return;
    }
  
    if (!reps.trim() || Number(reps) <= 0) {
      setError("root", {
        type: "required",
        message: "Reps must be greater than 0",
      });
      return;
    }
  
    if (!weight.trim() || Number(weight) < 0) {
      setError("root", {
        type: "required",
        message: "Weight is required",
      });
      return;
    }
  
  
    setExercises((prev) => [
      ...prev,
      {
        name: exName.trim(),
        sets: Number(sets),
        reps: Number(reps),
        weight: Number(weight),
      },
    ]);
  
  
    setExName("");
    setSets("");
    setReps("");
    setWeight("");
  
    clearErrors("root");
  };

  const removeExercise = (index: number) => {
    setExercises((prev) => prev.filter((_, i) => i !== index));
  };

  const closeModal = () => {
    modalRef.current?.dismiss();
    onClose();
  };

  // BACKDROP
  const renderBackdrop = useCallback((props: any) => {
    return (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.6}
      />
    );
  }, []);

  const onSubmit = (data: Omit<CreateWorkoutInput, "exercises">) => {

    if (!data.name.trim()) {
      setError("name", {
        type: "required",
        message: "Workout name is required",
      });
      return;
    }
  
    if (!data.duration.trim()) {
      setError("duration", {
        type: "required",
        message: "Duration is required",
      });
      return;
    }
  
    if (!data.calories.trim()) {
      setError("calories", {
        type: "required",
        message: "Calories burned is required",
      });
      return;
    }
  
    if (exercises.length === 0) {
      setError("name", {
        type: "required",
        message: "Please add at least one exercise",
      });
      return;
    }
    console.log("DATA: ", data);
  
    addPersonalWorkout({
      member_id: 1,
      data: {
        name: data.name,
        duration: data.duration,
        calories: data.calories,
        exercises,
      },
    });
  
    closeModal();
  
    setExercises([]);
  
    setValue("name", "");
    setValue("duration", "");
    setValue("calories", "");
  };

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      keyboardBehavior="extend"
    >
      <BottomSheetScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Dumbbell size={18} color="#10b981" />
            <Text style={styles.title}>Add Workout</Text>
          </View>
        </View>

        {/* WORKOUT INPUTS */}
        <BottomSheetTextInput
          value={name}
          onChangeText={(value) => {
            setValue("name", value);
            clearErrors("name");
          }}
          placeholder="Workout Name"
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />

        {errors.name && (
          <Text style={styles.errorText}>
            {errors.name.message}
          </Text>
        )}

        <BottomSheetTextInput
          value={duration}
          onChangeText={(value) => {
            setValue("duration", value);
            clearErrors("duration");
          }}
          placeholder="Duration (minutes)"
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
          style={styles.input}
        />

        {errors.duration && (
          <Text style={styles.errorText}>
            {errors.duration.message}
          </Text>
        )}

        <BottomSheetTextInput
          value={calories}
          onChangeText={(value) => {
            setValue("calories", value);
            clearErrors("calories");
          }}
          placeholder="Calories Burned"
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
          style={styles.input}
        />

        {errors.calories && (
          <Text style={styles.errorText}>
            {errors.calories.message}
          </Text>
        )}

        {/* EXERCISE */}
        <Text style={styles.sectionTitle}>Add Exercise</Text>

        <BottomSheetTextInput
          value={exName}
          onChangeText={setExName}
          placeholder="Exercise Name"
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />

        <View style={styles.row}>
          <BottomSheetTextInput
            value={sets}
            onChangeText={setSets}
            placeholder="Sets"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            style={[styles.input, styles.flex]}
          />

          <BottomSheetTextInput
            value={reps}
            onChangeText={setReps}
            placeholder="Reps"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            style={[styles.input, styles.flex]}
          />

          <BottomSheetTextInput
            value={weight}
            onChangeText={setWeight}
            placeholder="Weight"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            style={[styles.input, styles.flex]}
          />
        </View>

        {/* ADD BUTTON */}
        <Pressable onPress={addExercise} style={styles.addBtn}>
          <Plus size={16} color="#0f172a" />
          <Text style={styles.addBtnText}>Add Exercise</Text>
        </Pressable>

        {/* PREVIEW */}
        {exercises.map((ex, i) => (
          <View key={i} style={styles.previewCard}>
            <View style={styles.previewHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.previewTitle}>{ex.name}</Text>
                <Text style={styles.previewSub}>
                  {ex.sets} Sets • {ex.reps} Reps • {ex.weight} kg
                </Text>
              </View>

              <Pressable
                onPress={() => removeExercise(i)}
                style={styles.deleteBtn}
              >
                <Trash2 size={18} color="#ef4444" />
              </Pressable>
            </View>
          </View>
        ))}

        {errors.name && (
          <Text style={styles.errorText}>
            {errors.name.message}
          </Text>
        )}

        {/* SAVE */}
        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          style={[
            styles.saveBtn,
            isPending && { opacity: 0.7 },
          ]}
        >
          {isPending ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.saveBtnText}>
              Save Workout
            </Text>
          )}
        </Pressable>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },

  sectionTitle: {
    marginTop: 16,
    fontWeight: "600",
    color: "#0f172a",
  },

  input: {
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    color: "#0f172a",
  },

  row: {
    flexDirection: "row",
    gap: 8,
  },

  flex: {
    flex: 1,
  },

  addBtn: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },

  addBtnText: {
    fontWeight: "600",
    color: "#0f172a",
  },

  previewCard: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 10,
  },

  previewTitle: {
    fontWeight: "600",
    color: "#0f172a",
  },

  previewSub: {
    fontSize: 12,
    color: "#64748b",
  },

  saveBtn: {
    marginTop: 20,
    backgroundColor: "#10b981",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  saveBtnText: {
    color: "white",
    fontWeight: "600",
  },
  
  previewHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  deleteBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#fee2e2",
    alignItems: "center",
    justifyContent: "center",
  },
  
  errorText: {
    marginTop: 12,
    color: "#ef4444",
    fontSize: 13,
    textAlign: "center",
    fontWeight: "500",
  },
});