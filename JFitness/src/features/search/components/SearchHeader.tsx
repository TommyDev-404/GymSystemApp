import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Search, X, ChevronLeft } from "lucide-react-native";

export default function SearchHeader({ query, setQuery, onBack, placeholder }: any) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <ChevronLeft size={28} color="#111827" />
      </TouchableOpacity>

      <View style={styles.box}>
        <Search size={18} color="#6B7280" />

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={'#515259'}
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />

        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <X size={18} color="#6B7280" />
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
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  box: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    marginLeft: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    height: 44,
  },
  input: {
    flex: 1,
    marginLeft: 8,
  },
});