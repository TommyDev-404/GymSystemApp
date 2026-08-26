import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/utils/theme";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.85}
      style={[
        styles.primaryBtn,
        isDisabled && styles.primaryBtnDisabled,
      ]}
    >
      <LinearGradient
        colors={
          isDisabled
            ? [theme.primaryLight, theme.primaryLight]
            : [theme.primaryDark, theme.primary]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.primaryBtnGradient}
      >
        {loading ? (
          <>
            <ActivityIndicator
              color={theme.loader}
              size="small"
            />

            <Text style={styles.primaryBtnTextDisabled}>
              {title}
            </Text>
          </>
        ) : (
          <Text style={styles.primaryBtnText}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryBtn: {
    borderRadius: 40,
    overflow: "hidden",
    marginTop: 8,

    shadowColor: theme.primary,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.22,
    shadowRadius: 12,

    elevation: 6,
  },

  primaryBtnDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },

  primaryBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 17,
    paddingHorizontal: 24,
  },

  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  primaryBtnTextDisabled: {
    color: theme.pending,
    fontSize: 16,
    fontWeight: "700",
  },

  loaderColor: {
    color: "#ebe9e9",
  }
});