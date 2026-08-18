import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { History, Zap, ChevronRight } from "lucide-react-native";
import { theme } from "@/utils/theme";

interface Props {
  recent: string[];
  quick?: string[];
}

export default function RecentSection({
  recent,
  quick,
}: Props) {
  return (
    <View style={styles.container}>

      {/* RECENT SEARCHES */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIcon}>
          <History
            size={15}
            color={theme.primaryLight}
            strokeWidth={2.2}
          />
        </View>

        <View>
          <Text style={styles.sectionTitle}>
            Recent Searches
          </Text>

          <Text style={styles.sectionSubtitle}>
            Quickly access features you searched before
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        {recent.map((item, index) => (
          <TouchableOpacity
            key={item}
            activeOpacity={0.7}
            style={[
              styles.item,
              index !== recent.length - 1 && styles.divider,
            ]}
          >
            <View style={styles.itemIcon}>
              <History
                size={17}
                color={theme.textMuted}
                strokeWidth={2}
              />
            </View>

            <Text style={styles.itemText}>
              {item}
            </Text>

            <ChevronRight
              size={17}
              color={theme.textMuted}
              strokeWidth={2}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* QUICK ACTIONS */}
      {quick && quick.length > 0 && (
        <>
          <View style={[styles.sectionHeader, styles.quickHeader]}>
            <View style={styles.sectionIcon}>
              <Zap
                size={15}
                color={theme.primaryLight}
                strokeWidth={2.2}
              />
            </View>

            <View>
              <Text style={styles.sectionTitle}>
                Quick Actions
              </Text>

              <Text style={styles.sectionSubtitle}>
                Jump directly into common actions
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            {quick.map((item, index) => (
              <TouchableOpacity
                key={item}
                activeOpacity={0.7}
                style={[
                  styles.item,
                  index !== quick.length - 1 && styles.divider,
                ]}
              >
                <View style={styles.quickIcon}>
                  <Zap
                    size={17}
                    color={theme.primaryLight}
                    strokeWidth={2.2}
                  />
                </View>

                <Text style={styles.itemText}>
                  {item}
                </Text>

                <ChevronRight
                  size={17}
                  color={theme.textMuted}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Search for a feature to get started
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 30,
  },

  /* SECTION HEADER */

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  quickHeader: {
    marginTop: 24,
  },

  sectionIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,

    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: theme.text,
    letterSpacing: -0.1,
  },

  sectionSubtitle: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: "500",
    color: theme.textMuted,
  },

  /* CARD */

  card: {
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    overflow: "hidden",
  },

  /* ITEM */

  item: {
    minHeight: 62,
    paddingHorizontal: 14,
    paddingVertical: 10,

    flexDirection: "row",
    alignItems: "center",
  },

  itemIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,

    marginRight: 12,
  },

  quickIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.accentWash,
    borderWidth: 1,
    borderColor: theme.borderAccent,

    marginRight: 12,
  },

  itemText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "700",
    color: theme.text,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },

  /* FOOTER */

  footer: {
    alignItems: "center",
    marginTop: 28,
  },

  footerText: {
    fontSize: 10,
    fontWeight: "500",
    color: theme.textMuted,
  },
});