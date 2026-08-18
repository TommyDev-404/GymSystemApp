import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import {
  ChevronRight,
} from "lucide-react-native";

import type {
  LucideIcon,
} from "lucide-react-native";

import { router } from "expo-router";

import { theme } from "@/utils/theme";


type MenuItem = {
  label: string;
  icon: LucideIcon;
  screen: string;
};

type MenuSectionData = {
  title: string;
  items: MenuItem[];
};


export function ProfileMenuSection({
  section,
}: {
  section: MenuSectionData;
}) {

  return (
    <View style={styles.section}>

      {/* ================================================
          SECTION TITLE
      ================================================ */}

      <Text style={styles.sectionTitle}>
        {section.title}
      </Text>


      {/* ================================================
          MENU CONTAINER
      ================================================ */}

      <View style={styles.menuContainer}>

        {section.items.map((item, index) => {

          const Icon = item.icon;

          const isLast =
            index === section.items.length - 1;

          return (
            <Pressable
              key={item.label}
              onPress={() =>
                router.push(item.screen as any)
              }
              style={({ pressed }) => [
                styles.menuItem,

                pressed && styles.menuItemPressed,

                !isLast && styles.menuItemBorder,
              ]}
            >

              {/* ICON */}

              <View style={styles.iconContainer}>
                <Icon
                  size={16}
                  color={theme.primaryLight}
                  strokeWidth={2}
                />
              </View>


              {/* LABEL */}

              <Text style={styles.label}>
                {item.label}
              </Text>


              {/* CHEVRON */}

              <ChevronRight
                size={16}
                color={theme.textMuted}
                strokeWidth={2}
              />

            </Pressable>
          );
        })}

      </View>

    </View>
  );
}


/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({

  /* =======================================================
     SECTION
  ======================================================= */

  section: {
    marginTop: 22,

    paddingHorizontal: 16,
  },


  /* =======================================================
     SECTION TITLE
  ======================================================= */

  sectionTitle: {
    marginLeft: 4,

    marginBottom: 8,

    fontSize: 10.5,

    fontWeight: "700",

    color: theme.textMuted,

    textTransform: "uppercase",

    letterSpacing: 0.7,
  },


  /* =======================================================
     MENU CONTAINER
  ======================================================= */

  menuContainer: {
    overflow: "hidden",

    borderRadius: 16,

    backgroundColor: theme.card,

    borderWidth: 1,

    // Subtle teal outline
    borderColor: theme.borderAccent,
  },


  /* =======================================================
     MENU ITEM
  ======================================================= */

  menuItem: {
    flexDirection: "row",

    alignItems: "center",

    minHeight: 53,

    paddingVertical: 10,

    paddingHorizontal: 13,

    gap: 11,

    backgroundColor: theme.card,
  },


  /* =======================================================
     PRESSED
  ======================================================= */

  menuItemPressed: {
    backgroundColor: theme.surface,
  },


  /* =======================================================
     ITEM DIVIDER
  ======================================================= */

  menuItemBorder: {
    borderBottomWidth: 1,

    borderBottomColor: theme.border,
  },


  /* =======================================================
     ICON
  ======================================================= */

  iconContainer: {
    width: 32,
    height: 32,

    borderRadius: 10,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.surface,

    borderWidth: 1,

    borderColor: theme.borderAccent,
  },


  /* =======================================================
     LABEL
  ======================================================= */

  label: {
    flex: 1,

    fontSize: 13.5,

    fontWeight: "500",

    color: theme.text,
  },

});