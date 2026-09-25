import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EaseView } from "react-native-ease";
import { AppBackground } from "./AppBackground";
import { ScreenHeader } from "./ScreenHeader";
import { theme } from "@/utils/theme";

interface StackWrapperProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  headerContent?: ReactNode;
  showDefaultHeader?: boolean;
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
  refreshing?: boolean;
  onRefresh?: () => void;
  refreshTintColor?: string;
}

export function StackWrapper({
  title,
  subtitle,
  children,
  headerContent,
  showDefaultHeader = true,
  loading = false,
  loadingMinHeight = 400,
  contentStyle,
  scrollEnabled = true,
  showsVerticalScrollIndicator = false,
  horizontalPadding = 15,
  paddingTop = 14,
  paddingBottom = 10,
  gap = 20,
  useScrollView = true,
  refreshing = false,
  onRefresh,
  refreshTintColor = theme.primary,
}: StackWrapperProps) {
  const insets = useSafeAreaInsets();

  const header = showDefaultHeader ? (
    <>
      <ScreenHeader title={title} subtitle={subtitle} />
      {headerContent}
    </>
  ) : (
    headerContent
  );

  return (
    <AppBackground>
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <StatusBar barStyle="dark-content" />

        {useScrollView ? (
          <>
            {header}

            <ScrollView
              scrollEnabled={scrollEnabled}
              showsVerticalScrollIndicator={showsVerticalScrollIndicator}
              refreshControl={
                onRefresh ? (
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={refreshTintColor}
                  />
                ) : undefined
              }
              contentContainerStyle={[
                styles.content,
                {
                  paddingHorizontal: horizontalPadding,
                  paddingTop,
                  paddingBottom,
                },
                contentStyle,
              ]}
            >
              {loading ? (
                <View
                  style={[
                    styles.loaderContainer,
                    { minHeight: loadingMinHeight },
                  ]}
                >
                  <ActivityIndicator
                    size="small"
                    color={theme.primary}
                  />
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
                    duration: 600,
                    easing: "easeOut",
                  }}
                  style={[styles.childrenContainer, { gap }]}
                >
                  {children}
                </EaseView>
              )}
            </ScrollView>
          </>
        ) : (
          <>
            {header}

            {loading ? (
              <View
                style={[
                  styles.loaderContainer,
                  { minHeight: loadingMinHeight },
                ]}
              >
                <ActivityIndicator
                  size="small"
                  color={theme.primary}
                />
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
                  duration: 600,
                  easing: "easeOut",
                }}
                style={[
                  styles.listContainer,
                  {
                    paddingHorizontal: horizontalPadding,
                    paddingTop,
                    paddingBottom,
                    gap,
                  },
                ]}
              >
                {children}
              </EaseView>
            )}
          </>
        )}
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  childrenContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});