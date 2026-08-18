import { View, Text, StyleSheet } from "react-native";

import {
  Trophy,
} from "lucide-react-native";

import {
  LinearGradient,
} from "expo-linear-gradient";

import { theme } from "@/utils/theme";

interface PointsCardProps {
  points: number;
}

export default function PointsCard({
  points,
}: PointsCardProps) {

  const MAX_POINTS = 1000;

  const progress =
    Math.min(
      (points / MAX_POINTS) * 100,
      100
    );

  const remaining =
    Math.max(
      MAX_POINTS - points,
      0
    );

  return (
    <View style={styles.card}>

      {/* ================= ACCENT GLOW ================= */}

      <View
        style={styles.glow}
        pointerEvents="none"
      />

      <LinearGradient
        colors={[
          theme.card,
          "#111a19",
          theme.card,
        ]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.gradient}
      >

        {/* ================= HEADER ================= */}

        <View style={styles.header}>

          <View style={styles.headerLeft}>

            <View style={styles.iconBox}>

              <Trophy
                size={18}
                color={theme.primaryLight}
                strokeWidth={2}
              />

            </View>

            <View>

              <Text
                style={styles.eyebrow}
              >
                REWARD POINTS
              </Text>

              <Text
                style={styles.points}
              >
                {points.toLocaleString()}
              </Text>

            </View>

          </View>


          {/* POINT STATUS */}

          <View style={styles.status}>

            <View
              style={styles.statusDot}
            />

            <Text
              style={styles.statusText}
            >
              {points >= MAX_POINTS
                ? "Unlocked"
                : "Active"}
            </Text>

          </View>

        </View>


        {/* ================= POINTS INFO ================= */}

        <View
          style={styles.pointsInfo}
        >

          <View>

            <Text
              style={styles.label}
            >
              CURRENT POINTS
            </Text>

            <Text
              style={styles.currentPoints}
            >
              {points.toLocaleString()}
              <Text
                style={styles.maxPoints}
              >
                {" / "}
                {MAX_POINTS.toLocaleString()}
              </Text>
            </Text>

          </View>

          <Text
            style={styles.percent}
          >
            {Math.round(progress)}%
          </Text>

        </View>


        {/* ================= PROGRESS ================= */}

        <View
          style={styles.progressTrack}
        >

          <LinearGradient
            colors={[
              theme.primaryDark,
              theme.primary,
              theme.primaryLight,
            ]}
            start={{
              x: 0,
              y: 0,
            }}
            end={{
              x: 1,
              y: 0,
            }}
            style={[
              styles.progressFill,
              {
                width: `${progress}%`,
              },
            ]}
          />

        </View>


        {/* ================= FOOTER ================= */}

        <View
          style={styles.footer}
        >

          <Text
            style={styles.footerText}
          >
            {remaining > 0
              ? `${remaining.toLocaleString()} points until next reward`
              : "Next reward unlocked"}
          </Text>

          <Text
            style={styles.footerPoints}
          >
            {points.toLocaleString()} pts
          </Text>

        </View>

      </LinearGradient>

    </View>
  );
}


const styles = StyleSheet.create({

  /* ================= CARD ================= */

  card: {
    marginHorizontal: 20,

    borderRadius: 20,

    overflow: "hidden",

    backgroundColor:
      theme.card,

    borderWidth: 1,

    borderColor:
      theme.borderAccent,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.25,

    shadowRadius: 20,

    elevation: 8,
  },

  gradient: {
    padding: 18,
  },

  glow: {
    position: "absolute",

    width: 170,

    height: 170,

    borderRadius: 999,

    right: -85,

    top: -85,

    backgroundColor:
      theme.primary,

    opacity: 0.07,
  },


  /* ================= HEADER ================= */

  header: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    gap: 10,
  },

  headerLeft: {
    flexDirection: "row",

    alignItems: "center",

    gap: 11,

    flex: 1,
  },

  iconBox: {
    width: 40,

    height: 40,

    borderRadius: 12,

    alignItems: "center",

    justifyContent: "center",

    backgroundColor:
      theme.accentWash,

    borderWidth: 1,

    borderColor:
      theme.borderAccent,
  },

  eyebrow: {
    fontSize: 9,

    fontWeight: "700",

    letterSpacing: 1,

    color:
      theme.textMuted,
  },

  points: {
    marginTop: 1,

    fontSize: 25,

    lineHeight: 29,

    fontWeight: "800",

    color:
      theme.text,

    letterSpacing: -0.5,
  },


  /* ================= STATUS ================= */

  status: {
    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 9,

    paddingVertical: 6,

    borderRadius: 999,

    backgroundColor:
      theme.accentWash,

    borderWidth: 1,

    borderColor:
      theme.borderAccent,
  },

  statusDot: {
    width: 6,

    height: 6,

    borderRadius: 999,

    backgroundColor:
      theme.primaryLight,

    marginRight: 6,
  },

  statusText: {
    fontSize: 9.5,

    fontWeight: "700",

    color:
      theme.primaryLight,
  },


  /* ================= POINTS INFO ================= */

  pointsInfo: {
    marginTop: 20,

    flexDirection: "row",

    alignItems: "flex-end",

    justifyContent:
      "space-between",
  },

  label: {
    fontSize: 8,

    fontWeight: "700",

    letterSpacing: 0.8,

    color:
      theme.textMuted,
  },

  currentPoints: {
    marginTop: 3,

    fontSize: 14,

    fontWeight: "800",

    color:
      theme.primaryLight,
  },

  maxPoints: {
    fontSize: 10,

    fontWeight: "500",

    color:
      theme.textMuted,
  },

  percent: {
    fontSize: 11,

    fontWeight: "800",

    color:
      theme.textSub,
  },


  /* ================= PROGRESS ================= */

  progressTrack: {
    height: 7,

    marginTop: 12,

    borderRadius: 999,

    backgroundColor:
      theme.surface3,

    overflow: "hidden",
  },

  progressFill: {
    height: "100%",

    borderRadius: 999,
  },


  /* ================= FOOTER ================= */

  footer: {
    marginTop: 9,

    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",
  },

  footerText: {
    flex: 1,

    fontSize: 9.5,

    color:
      theme.textMuted,
  },

  footerPoints: {
    marginLeft: 10,

    fontSize: 9.5,

    fontWeight: "700",

    color:
      theme.textSub,
  },

});