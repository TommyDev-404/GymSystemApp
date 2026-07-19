import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Users, Copy, CheckCircle, Share2 } from "lucide-react-native";
import { useState } from "react";

export default function ReferralHero({
  code,
  link,
  activeReferrals,
  points,
}: any) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.iconBox}>
          <Users size={22} color="#10b981" />
        </View>

        <View>
          <Text style={styles.small}>Total Referrals</Text>
          <Text style={styles.big}>
            {activeReferrals} active
          </Text>
        </View>

        <View style={{ marginLeft: "auto" }}>
          <Text style={styles.small}>Points</Text>
          <Text style={styles.points}>{points}</Text>
        </View>
      </View>

      {/* CODE */}
      <View style={styles.codeBox}>
        <Text style={styles.label}>YOUR CODE</Text>

        <View style={styles.row}>
          <Text style={styles.code}>{code}</Text>

          <TouchableOpacity onPress={copy} style={styles.btn}>
            {copied ? (
              <CheckCircle size={14} color="white" />
            ) : (
              <Copy size={14} color="white" />
            )}
            <Text style={styles.btnText}>
              {copied ? "Copied" : "Copy"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* LINK */}
      <View style={styles.linkBox}>
        <Text style={styles.link}>{link}</Text>

        <TouchableOpacity style={styles.shareBtn}>
          <Share2 size={14} color="white" />
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#0f172a",
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(16,185,129,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  small: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
  },
  big: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  points: {
    fontSize: 16,
    fontWeight: "800",
    color: "#10b981",
  },
  codeBox: {
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  label: {
    fontSize: 10,
    color: "rgba(255,255,255,0.5)",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  code: {
    fontSize: 20,
    fontWeight: "800",
    color: "#10b981",
    letterSpacing: 2,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 6,
    borderRadius: 8,
  },
  btnText: {
    color: "white",
    fontSize: 11,
  },
  linkBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  link: {
    fontSize: 10,
    color: "rgba(255,255,255,0.6)",
  },
  shareBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10b981",
    padding: 6,
    borderRadius: 8,
    gap: 6,
  },
  shareText: {
    color: "white",
    fontSize: 11,
  },
});