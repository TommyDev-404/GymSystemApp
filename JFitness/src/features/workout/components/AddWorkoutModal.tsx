import React, {
  useMemo,
  useState,
  useCallback,
} from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import {
  Dumbbell,
  Plus,
  Trash2,
  Clock3,
  ListChecks,
} from "lucide-react-native";
import { useForm } from "react-hook-form";
import { useAddPersonalWorkout } from "../hook/useWorkout";
import {
  CreateWorkoutInput,
  ExerciseInput,
} from "../types/WorkoutTypes";
import { theme } from "@/utils/theme";
import { useAuth } from "@/context/AuthContext";
import Toast from "react-native-toast-message";

interface Props {
  modalRef: React.RefObject<BottomSheetModal | null>;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export function AddWorkoutModal({
  modalRef,
  onClose,
}: Props) {
  const { memberIDs } = useAuth();
  const { mutate: addPersonalWorkout, isPending } = useAddPersonalWorkout();

  const snapPoints = useMemo(() => ["85%"], []);
  const [exercises, setExercises] = useState<ExerciseInput[]>([]);
  const [exName, setExName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const {
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
    },
  });

  const name = watch("name");
  const duration = watch("duration");

  const addExercise = () => {
    if (!exName.trim()) {
      setError("root", {
        type: "required",
        message: "Exercise name is required.",
      });
      return;
    }

    if (!sets.trim() || Number(sets) <= 0) {
      setError("root", {
        type: "required",
        message: "Sets must be greater than 0.",
      });
      return;
    }

    if (!reps.trim() || Number(reps) <= 0) {
      setError("root", {
        type: "required",
        message: "Reps must be greater than 0.",
      });
      return;
    }

    setExercises((prev) => [
      ...prev,
      {
        name: exName.trim(),
        sets: Number(sets),
        reps: Number(reps),
        weight: weight.trim()
          ? Number(weight)
          : 0,
      },
    ]);

    setExName("");
    setSets("");
    setReps("");
    setWeight("");
    clearErrors("root");
  };

  const removeExercise = (index: number) => {
    setExercises((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const closeModal = () => {
    modalRef.current?.dismiss();
    onClose();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.7}
      />
    ),
    []
  );

  const onSubmit = (
    data: Omit<CreateWorkoutInput, "exercises">
  ) => {
    if (!data.name.trim()) {
      setError("name", {
        type: "required",
        message: "Workout name is required.",
      });
      return;
    }

    if (!data.duration.trim()) {
      setError("duration", {
        type: "required",
        message: "Duration is required.",
      });
      return;
    }

    addPersonalWorkout(
      {
        member_id: memberIDs?.member_id!,
        data: {
          name: data.name.trim(),
          duration: data.duration,
          exercises,
        },
      },
      {
        onSuccess: (data) => {
          Toast.show({
            type: data.success ? "success" : "error",
            text1: data.success ? "Success" : "Unable to cancel",
            text2: data.message,
          });
          
          closeModal();
          setExercises([]);
          setValue("name", "");
          setValue("duration", "");
          setExName("");
          setSets("");
          setReps("");
          setWeight("");
        },
      }
    );
  };

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <Dumbbell
                size={18}
                color={theme.primaryLight}
                strokeWidth={2}
              />
            </View>

            <View>
              <Text style={styles.eyebrow}>
                WORKOUT TRACKER
              </Text>
              <Text style={styles.title}>
                Add Workout
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Workout Details
              </Text>
              <Text style={styles.sectionHint}>
                Record the workout you completed
              </Text>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>
              Workout Name
              <Text style={styles.required}> *</Text>
            </Text>

            <BottomSheetTextInput
              value={name}
              onChangeText={(value) => {
                setValue("name", value);
                clearErrors("name");
              }}
              placeholder="e.g. Chest Day"
              placeholderTextColor={theme.textMuted}
              style={styles.input}
              returnKeyType="next"
            />

            {errors.name && (
              <Text style={styles.errorText}>
                {errors.name.message}
              </Text>
            )}
          </View>

          <View style={styles.field}>
            <View style={styles.fieldLabelRow}>
              <Clock3
                size={13}
                color={theme.textMuted}
              />

              <Text style={styles.fieldLabel}>
                Duration
              </Text>

              <View style={styles.optionalBadge}>
                <Text style={styles.optionalText}>
                  Optional
                </Text>
              </View>
            </View>

            <BottomSheetTextInput
              value={duration}
              onChangeText={(value) => {
                setValue("duration", value);
                clearErrors("duration");
              }}
              placeholder="e.g. 45"
              placeholderTextColor={theme.textMuted}
              keyboardType="numeric"
              style={styles.input}
              returnKeyType="done"
            />

            <Text style={styles.inputHint}>
              Enter the duration in minutes.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.exerciseTitleContainer}>
              <View style={styles.sectionIcon}>
                <ListChecks
                  size={14}
                  color={theme.primaryLight}
                  strokeWidth={2}
                />
              </View>

              <View>
                <View style={styles.titleRow}>
                  <Text style={styles.sectionTitle}>
                    Exercises
                  </Text>

                  <View style={styles.optionalBadge}>
                    <Text style={styles.optionalText}>
                      Optional
                    </Text>
                  </View>
                </View>

                <Text style={styles.sectionHint}>
                  Add exercises, sets, reps and weight
                </Text>
              </View>
            </View>

            {exercises.length > 0 && (
              <View style={styles.countBadge}>
                <Text style={styles.countText}>
                  {exercises.length}
                </Text>
              </View>
            )}
          </View>

          <BottomSheetTextInput
            value={exName}
            onChangeText={(value) => {
              setExName(value);
              clearErrors("root");
            }}
            placeholder="Exercise name"
            placeholderTextColor={theme.textMuted}
            style={styles.input}
          />

          <View style={styles.row}>
            <BottomSheetTextInput
              value={sets}
              onChangeText={(value) => {
                setSets(value);
                clearErrors("root");
              }}
              placeholder="Sets"
              placeholderTextColor={theme.textMuted}
              keyboardType="numeric"
              style={[styles.input, styles.flex]}
            />

            <BottomSheetTextInput
              value={reps}
              onChangeText={(value) => {
                setReps(value);
                clearErrors("root");
              }}
              placeholder="Reps"
              placeholderTextColor={theme.textMuted}
              keyboardType="numeric"
              style={[styles.input, styles.flex]}
            />

            <BottomSheetTextInput
              value={weight}
              onChangeText={(value) => {
                setWeight(value);
                clearErrors("root");
              }}
              placeholder="Weight"
              placeholderTextColor={theme.textMuted}
              keyboardType="numeric"
              style={[styles.input, styles.flex]}
            />
          </View>

          <Text style={styles.inputHint}>
            Weight is optional for bodyweight exercises.
          </Text>

          <Pressable
            onPress={addExercise}
            style={({ pressed }) => [
              styles.addBtn,
              pressed && styles.pressed,
            ]}
          >
            <Plus
              size={16}
              color={theme.primaryLight}
              strokeWidth={2.5}
            />

            <Text style={styles.addBtnText}>
              Add Exercise
            </Text>
          </Pressable>

          {errors.root && (
            <Text style={styles.errorText}>
              {errors.root.message}
            </Text>
          )}

          {exercises.length > 0 && (
            <View style={styles.exerciseList}>
              {exercises.map((ex, i) => (
                <View
                  key={`${ex.name}-${i}`}
                  style={styles.previewCard}
                >
                  <View style={styles.previewIcon}>
                    <Dumbbell
                      size={14}
                      color={theme.primaryLight}
                    />
                  </View>

                  <View style={styles.previewContent}>
                    <Text
                      style={styles.previewTitle}
                      numberOfLines={1}
                    >
                      {ex.name}
                    </Text>

                    <Text style={styles.previewSub}>
                      {ex.sets} Sets • {ex.reps} Reps
                      {ex.weight && ex.weight > 0
                        ? ` • ${ex.weight} kg`
                        : ""}
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => removeExercise(i)}
                    style={styles.deleteBtn}
                  >
                    <Trash2
                      size={15}
                      color="#EF4444"
                    />
                  </Pressable>
                </View>
              ))}
            </View>
          )}
        </View>

        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          style={[
            styles.saveBtn,
            isPending && styles.disabledBtn,
          ]}
        >
          {isPending ? (
            <ActivityIndicator
              size="small"
              color="#FFFFFF"
            />
          ) : (
            <>
              <Dumbbell
                size={16}
                color="#FFFFFF"
              />

              <Text style={styles.saveBtnText}>
                Save Workout
              </Text>
            </>
          )}
        </Pressable>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: theme.card,
  },

  handleIndicator: {
    backgroundColor: theme.textMuted,
    width: 38,
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 35,
  },

  header: {
    marginBottom: 24,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },

  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  eyebrow: {
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 1,
    color: theme.textMuted,
  },

  title: {
    marginTop: 2,
    fontSize: 19,
    fontWeight: "800",
    color: theme.text,
  },

  section: {
    marginBottom: 22,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  exerciseTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    flex: 1,
  },

  sectionIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.text,
  },

  sectionHint: {
    marginTop: 3,
    fontSize: 9,
    color: theme.textMuted,
  },

  optionalBadge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },

  optionalText: {
    fontSize: 8,
    fontWeight: "700",
    color: theme.textMuted,
  },

  required: {
    color: "#EF4444",
  },

  field: {
    marginBottom: 5,
  },

  fieldLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 6,
  },

  fieldLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: theme.textMuted,
  },

  input: {
    minHeight: 46,
    paddingHorizontal: 13,
    borderRadius: 12,
    marginTop: 8,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    color: theme.text,
    fontSize: 13,
  },

  row: {
    flexDirection: "row",
    gap: 8,
  },

  flex: {
    flex: 1,
  },

  inputHint: {
    marginTop: 6,
    fontSize: 9,
    color: theme.textMuted,
  },

  addBtn: {
    marginTop: 11,
    minHeight: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  addBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: theme.primaryLight,
  },

  pressed: {
    opacity: 0.7,
  },

  countBadge: {
    minWidth: 25,
    height: 25,
    paddingHorizontal: 7,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  countText: {
    fontSize: 10,
    fontWeight: "800",
    color: theme.primaryLight,
  },

  exerciseList: {
    marginTop: 4,
    gap: 8,
  },

  previewCard: {
    minHeight: 54,
    padding: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },

  previewIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accentWash,
    marginRight: 10,
  },

  previewContent: {
    flex: 1,
  },

  previewTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: theme.text,
  },

  previewSub: {
    marginTop: 3,
    fontSize: 10,
    color: theme.textMuted,
  },

  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(239,68,68,0.10)",
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.15)",
  },

  saveBtn: {
    minHeight: 50,
    marginTop: 0,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
    backgroundColor: theme.primary,
  },

  saveBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  disabledBtn: {
    opacity: 0.65,
  },

  errorText: {
    marginTop: 7,
    color: "#F87171",
    fontSize: 10,
    textAlign: "center",
    fontWeight: "600",
  },
});