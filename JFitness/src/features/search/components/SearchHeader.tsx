import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  Search,
  X,
  ChevronLeft,
} from "lucide-react-native";
import { theme } from "@/utils/theme";

interface Props {
  query: string;
  setQuery: (value: string) => void;
  onBack: () => void;
  placeholder?: string;
}

export default function SearchHeader({
  query,
  setQuery,
  onBack,
  placeholder = "Search...",
}: Props) {
  return (
    <View style={styles.header}>

      {/* BACK BUTTON */}
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.7}
        style={styles.backButton}
      >
        <ChevronLeft
          size={21}
          color={theme.textSub}
          strokeWidth={2.2}
        />
      </TouchableOpacity>

      {/* SEARCH BOX */}
      <View style={styles.box}>

        <Search
          size={18}
          color={theme.textMuted}
          strokeWidth={2}
        />

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={theme.textMuted}
          value={query}
          onChangeText={setQuery}
          style={styles.input}
          selectionColor={theme.primaryLight}
          returnKeyType="search"
          autoCorrect={false}
        />

        {/* CLEAR */}
        {query.length > 0 && (
          <TouchableOpacity
            onPress={() => setQuery("")}
            activeOpacity={0.7}
            style={styles.clearButton}
          >
            <X
              size={17}
              color={theme.textMuted}
              strokeWidth={2.2}
            />
          </TouchableOpacity>
        )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 16,
    paddingVertical: 12,

    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },

  /* BACK */

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 13,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },

  /* SEARCH */

  box: {
    flex: 1,

    height: 44,

    marginLeft: 10,
    paddingHorizontal: 12,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: theme.card,

    borderRadius: 13,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  input: {
    flex: 1,

    marginLeft: 9,

    paddingVertical: 0,

    fontSize: 13,
    fontWeight: "500",

    color: theme.text,
  },

  clearButton: {
    width: 28,
    height: 28,

    borderRadius: 9,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.surface,
  },
});