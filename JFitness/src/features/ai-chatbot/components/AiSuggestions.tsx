import {
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";
import {
  Dumbbell,
  Apple,
  Heart,
  Lightbulb,
} from "lucide-react-native";
import { theme } from "@/utils/theme";

const suggestions = [
  {
    icon: Dumbbell,
    text: "Create a 5-day workout plan",
  },
  {
    icon: Apple,
    text: "Diet tips for muscle gain",
  },
  {
    icon: Heart,
    text: "Best cardio for fat loss",
  },
  {
    icon: Lightbulb,
    text: "How to improve bench press",
  },
];

interface Props {
  visible: boolean;
}

export default function AiSuggestions({
  visible,
}: Props) {
  if (!visible) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.content}
    >
      {suggestions.map((suggestion) => {
        const Icon = suggestion.icon;

        return (
          <Pressable
            key={suggestion.text}
            style={({ pressed }) => [
              styles.chip,
              pressed && styles.pressed,
            ]}
          >
            <Icon
              size={13}
              color={theme.primaryLight}
              strokeWidth={2.2}
            />

            <Text style={styles.text}>
              {suggestion.text}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    maxHeight: 52,
  },

  content: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    gap: 8,
    alignItems: "center",
  },

  chip: {
    height: 38,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 11,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  text: {
    marginLeft: 7,
    fontSize: 11,
    fontWeight: "600",
    color: theme.textSub,
  },

  pressed: {
    opacity: 0.65,
    transform: [{ scale: 0.98 }],
  },
});