import { View, Text } from "react-native";

export function StatsRow({ stats }: any) {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 20,
        gap: 10,
      }}
    >
      {stats.map((s: any, i: number) => {
        const Icon = s.icon;

        return (
          <View
            key={i}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 14,
              backgroundColor: s.bg, // ✅ keep original bg
              alignItems: "center",

              // iOS shadow
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 3 },

              // Android shadow
              elevation: 3,
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: s.color + "22",
              }}
            >
              <Icon size={16} color={s.color} />
            </View>

            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#0f172a",
                marginTop: 6,
              }}
            >
              {s.value}
            </Text>

            <Text style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>
              {s.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}