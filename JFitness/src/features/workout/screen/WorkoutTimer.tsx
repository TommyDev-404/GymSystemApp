import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Timer,
} from "lucide-react-native";

import { router } from "expo-router";

import { AppBackground } from "@/components/shared/AppBackground";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { theme } from "@/utils/theme";

export function WorkoutTimerScreen() {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);

  const [timeLeft, setTimeLeft] = useState(
    minutes * 60 + seconds
  );

  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  const reset = () => {
    setRunning(false);
    setTimeLeft(minutes * 60 + seconds);
  };

  const updateTime = (
    newMinutes: number,
    newSeconds: number
  ) => {
    if (running) return;

    setMinutes(newMinutes);
    setSeconds(newSeconds);
    setTimeLeft(newMinutes * 60 + newSeconds);
  };

  const formatTime = (value: number) => {
    const min = Math.floor(value / 60);
    const sec = value % 60;

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <AppBackground>
      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <ScreenHeader
          title="Workout Timer"
          subtitle="Set your workout duration"
        />

        <View style={styles.contentWrapper}>
          {/* TIMER CARD */}
          <View style={styles.timerCard}>
            <View style={styles.timerIcon}>
              <Timer
                size={18}
                color={theme.primaryLight}
                strokeWidth={2.2}
              />
            </View>

            <Text style={styles.timerLabel}>
              TIME REMAINING
            </Text>

            <Text style={styles.time}>
              {formatTime(timeLeft)}
            </Text>

            <View style={styles.statusBadge}>
              <View
                style={[
                  styles.statusDot,
                  running && styles.statusDotActive,
                ]}
              />

              <Text style={styles.statusText}>
                {running ? "Timer running" : "Ready"}
              </Text>
            </View>
          </View>

          {/* CONTROLS */}
          <View style={styles.controls}>
            <Pressable
              onPress={reset}
              style={({ pressed }) => [
                styles.resetButton,
                pressed && styles.pressed,
              ]}
            >
              <RotateCcw
                size={20}
                color={theme.textSub}
                strokeWidth={2.2}
              />
            </Pressable>

            <Pressable
              onPress={() => setRunning((prev) => !prev)}
              disabled={timeLeft === 0}
              style={({ pressed }) => [
                styles.playButton,
                timeLeft === 0 && styles.disabledButton,
                pressed && styles.playPressed,
              ]}
            >
              {running ? (
                <Pause
                  size={28}
                  color="#fff"
                  fill="#fff"
                />
              ) : (
                <Play
                  size={28}
                  color="#fff"
                  fill="#fff"
                />
              )}
            </Pressable>
          </View>

          {/* SETTINGS */}
          <View style={styles.settingsCard}>
            <View style={styles.settingsHeader}>
              <View>
                <Text style={styles.settingTitle}>
                  Set Timer
                </Text>

                <Text style={styles.settingSubtitle}>
                  Adjust your workout duration
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <TimeAdjust
              label="Minutes"
              value={minutes}
              disabled={running}
              minus={() =>
                updateTime(
                  Math.max(0, minutes - 1),
                  seconds
                )
              }
              plus={() =>
                updateTime(
                  minutes + 1,
                  seconds
                )
              }
            />

            <TimeAdjust
              label="Seconds"
              value={seconds}
              disabled={running}
              minus={() =>
                updateTime(
                  minutes,
                  Math.max(0, seconds - 5)
                )
              }
              plus={() =>
                updateTime(
                  minutes,
                  Math.min(55, seconds + 5)
                )
              }
            />
          </View>

          {running && (
            <Text style={styles.runningHint}>
              Pause the timer to adjust the duration.
            </Text>
            )}
        </View>
      </SafeAreaView>
    </AppBackground>
  );
}

function TimeAdjust({
  label,
  value,
  minus,
  plus,
  disabled,
}: {
  label: string;
  value: number;
  minus: () => void;
  plus: () => void;
  disabled?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>
        {label}
      </Text>

      <View style={styles.adjust}>
        <Pressable
          style={({ pressed }) => [
            styles.smallButton,
            disabled && styles.disabledSmallButton,
            pressed && !disabled && styles.pressed,
          ]}
          onPress={minus}
          disabled={disabled}
        >
          <Minus
            size={15}
            color={
              disabled
                ? theme.textMuted
                : theme.textSub
            }
          />
        </Pressable>

        <Text style={styles.number}>
          {String(value).padStart(2, "0")}
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.smallButton,
            styles.plusButton,
            disabled && styles.disabledPlusButton,
            pressed && !disabled && styles.pressed,
          ]}
          onPress={plus}
          disabled={disabled}
        >
          <Plus
            size={15}
            color="#fff"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    paddingHorizontal: 20,
  },

  /* TIMER */

  timerCard: {
    marginTop: 12,
    height: 290,
    borderRadius: 24,

    backgroundColor: theme.card,

    borderWidth: 1,
    borderColor: theme.borderAccent,

    alignItems: "center",
    justifyContent: "center",

    overflow: "hidden",
  },

  timerIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,

    marginBottom: 18,
  },

  timerLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: theme.textMuted,
  },

  time: {
    marginTop: 8,

    fontSize: 60,
    fontWeight: "800",
    letterSpacing: -2,

    color: theme.text,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,

    marginTop: 14,

    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 10,

    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.textMuted,
  },

  statusDotActive: {
    backgroundColor: theme.primaryLight,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "600",
    color: theme.textMuted,
  },

  /* CONTROLS */

  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,

    marginTop: 24,
  },

  resetButton: {
    width: 52,
    height: 52,
    borderRadius: 17,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.borderStrong,
  },

  playButton: {
    width: 72,
    height: 72,
    borderRadius: 24,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.primary,

    shadowColor: theme.primary,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 6,
  },

  disabledButton: {
    opacity: 0.45,
  },

  pressed: {
    opacity: 0.7,
  },

  playPressed: {
    transform: [{ scale: 0.96 }],
  },

  /* SETTINGS */

  settingsCard: {
    marginTop: 24,

    backgroundColor: theme.card,

    borderRadius: 20,

    borderWidth: 1,
    borderColor: theme.border,

    padding: 18,
  },

  settingsHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  settingTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: theme.text,
  },

  settingSubtitle: {
    marginTop: 3,
    fontSize: 10,
    color: theme.textMuted,
  },

  divider: {
    height: 1,
    backgroundColor: theme.border,
    marginVertical: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 14,
  },

  rowLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.textSub,
  },

  adjust: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  smallButton: {
    width: 34,
    height: 34,
    borderRadius: 11,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.borderStrong,
  },

  plusButton: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },

  disabledSmallButton: {
    opacity: 0.4,
  },

  disabledPlusButton: {
    opacity: 0.35,
  },

  number: {
    width: 42,

    textAlign: "center",

    fontSize: 16,
    fontWeight: "800",

    color: theme.text,
  },

  runningHint: {
    marginTop: 12,

    textAlign: "center",

    fontSize: 10,
    fontWeight: "500",

    color: theme.textMuted,
  },
});