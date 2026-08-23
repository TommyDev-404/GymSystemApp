import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { ChevronRight } from "lucide-react-native";
import { theme } from "@/utils/theme";

const programs = [
  {
    id: 1,
    name: "Absolute Beginner Starter",
    level: "Beginner",
    duration: "4 Weeks",
    color: "#10b981",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
  },
  {
    id: 2,
    name: "Weight Loss Kickstart",
    level: "Beginner",
    duration: "6 Weeks",
    color: "#ef4444",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b",
  },
  {
    id: 3,
    name: "Muscle Foundation",
    level: "Beginner",
    duration: "8 Weeks",
    color: "#3b82f6",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
  },
];

export function BeginnerGuide({
  onViewAll,
}: {
  onViewAll?: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Beginner Programs</Text>
          <Text style={styles.subtitle}>
            Start your fitness journey
          </Text>
        </View>

        <Pressable
          onPress={onViewAll}
          style={({ pressed }) => [
            styles.viewAllButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight
            size={15}
            color={theme.primaryLight}
            strokeWidth={2.5}
          />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {programs.map((program) => (
          <Pressable
            key={program.id}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: program.image }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.imageOverlay} />

              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>
                  {program.level}
                </Text>
              </View>
            </View>

            <View style={styles.content}>
              <Text
                numberOfLines={2}
                style={styles.programName}
              >
                {program.name}
              </Text>

              <Text style={styles.duration}>
                {program.duration}
              </Text>

              <View style={styles.footer}>
                <View style={styles.programType}>
                  <Text style={styles.programTypeText}>
                    Training Program
                  </Text>
                </View>

                <View style={styles.arrowBox}>
                  <ChevronRight
                    size={14}
                    color={theme.primaryLight}
                    strokeWidth={2.5}
                  />
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.text,
    letterSpacing: -0.2,
  },
  subtitle: {
    marginTop: 3,
    fontSize: 10.5,
    fontWeight: "500",
    color: theme.textMuted,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 9,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.14)",
  },
  viewAllText: {
    fontSize: 10.5,
    fontWeight: "700",
    color: theme.primaryLight,
  },
  list: {
    gap: 12,
    paddingVertical: 4,
  },
  card: {
    width: 220,
    overflow: "hidden",
    borderRadius: 17,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.14,
    shadowRadius: 9,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    height: 112,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 45,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  levelBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "rgba(15,23,42,0.78)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  levelText: {
    fontSize: 9.5,
    fontWeight: "700",
    color: "#fff",
  },
  content: {
    padding: 12,
  },
  programName: {
    fontSize: 13.5,
    fontWeight: "700",
    lineHeight: 18,
    color: theme.text,
  },
  duration: {
    marginTop: 4,
    fontSize: 10.5,
    fontWeight: "500",
    color: theme.textMuted,
  },
  footer: {
    marginTop: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  programType: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.12)",
  },
  programTypeText: {
    fontSize: 8.5,
    fontWeight: "700",
    color: theme.primaryLight,
  },
  arrowBox: {
    width: 27,
    height: 27,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },
  pressed: {
    opacity: 0.7,
  },
});