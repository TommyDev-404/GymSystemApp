import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { EaseView } from "react-native-ease";
import { AppBackground } from "./AppBackground";
import { theme } from "@/utils/theme";

interface TabScreenProps {
  children: ReactNode;
  loading?: boolean;
  loadingMinHeight?: number;
  contentStyle?: StyleProp<ViewStyle>;
  scrollEnabled?: boolean;
  showsVerticalScrollIndicator?: boolean;
  horizontalPadding?: number;
  paddingTop?: number;
  paddingBottom?: number;
  gap?: number;
  useScrollView?: boolean;
}

export function TabWrapper({
  children,
  loading = false,
  loadingMinHeight = 400,
  contentStyle,
  scrollEnabled = true,
  showsVerticalScrollIndicator = false,
  horizontalPadding = 15,
  paddingTop = 0,
  paddingBottom = 30,
  gap = 20,
  useScrollView = true,
}: TabScreenProps) {
  
  const content = loading ? (
    <View
      style={[
        styles.loaderContainer,
        {
          minHeight: loadingMinHeight,
          paddingHorizontal: horizontalPadding,
        },
      ]}
    >
      <ActivityIndicator size="small" color={theme.primary} />
    </View>
  ) : (
    <EaseView
      initialAnimate={{
        opacity: 0,
        translateY: 14,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      transition={{
        type: "timing",
        duration: 380,
        easing: "easeOut",
      }}
      style={[
        styles.childrenContainer,
        {
          gap,
          paddingHorizontal: horizontalPadding,
          paddingTop,
          paddingBottom,
        },
        contentStyle,
      ]}
    >
      {children}
    </EaseView>
  );

  return (
    <AppBackground>
      {useScrollView ? (
        <ScrollView
          scrollEnabled={scrollEnabled}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          contentContainerStyle={styles.scrollContent}
        >
          {content}
        </ScrollView>
      ) : (
        <View style={styles.listContainer}>{content}</View>
      )}
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  listContainer: {
    flex: 1,
  },
  childrenContainer: {
    flex: 1,
    width: "100%",
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});