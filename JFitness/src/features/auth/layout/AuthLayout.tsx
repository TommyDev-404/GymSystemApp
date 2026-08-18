import React, { ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar as RNStatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Svg, { Rect, Path } from 'react-native-svg';
import { theme } from '@/utils/theme';
import { Dumbbell } from 'lucide-react-native';

type Props = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  showLogo?: boolean;
};

export function AuthLayout({
  title = 'Campus Stamping',
  subtitle = 'Your Digital Attendance Booklet',
  children,
  showLogo = true,
}: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.root}>
        <RNStatusBar barStyle="light-content" backgroundColor="transparent" translucent />

        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContent}
          bottomOffset={20}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Teal-tinted gradient header */}
          <LinearGradient
            colors={['#0a1210', '#0d1a17', '#10221d']}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={styles.header}
          >
            {/* Decorative circles */}
            <View style={[styles.decorCircle, styles.decor1]} />
            <View style={[styles.decorCircle, styles.decor2]} />
            <View style={[styles.decorCircle, styles.decor3]} />

            {showLogo && (
              <View style={styles.logoContainer}>
                <Dumbbell
                  size={42}
                  color="#2dd4bf"
                  strokeWidth={2.5}
                />
              </View>
            )}

            <Text style={styles.appTitle}>{title}</Text>
            {subtitle ? <Text style={styles.appSubtitle}>{subtitle}</Text> : null}
          </LinearGradient>

          {/* Card that overlaps the gradient */}
          <View style={styles.card}>{children}</View>

          <Text style={styles.footer}>
            © 2026 JFitness · Digital Gym Membership System
          </Text>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  root: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 12 : 24,
    paddingBottom: 56,
    paddingHorizontal: 24,
    alignItems: 'center',
    overflow: 'hidden',
  },
  decorCircle: {
    position: 'absolute',
    borderRadius: 999,
  },
  decor1: {
    top: -40,
    right: -40,
    width: 200,
    height: 200,
    backgroundColor: 'rgba(20,184,166,0.10)',
  },
  decor2: {
    bottom: -20,
    left: -30,
    width: 140,
    height: 140,
    backgroundColor: 'rgba(20,184,166,0.07)',
  },
  decor3: {
    top: 40,
    left: 16,
    width: 80,
    height: 80,
    backgroundColor: 'rgba(20,184,166,0.05)',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 28,
    backgroundColor: theme.accentWash,
    borderWidth: 1.5,
    borderColor: theme.borderAccent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  appTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  appSubtitle: {
    color: 'rgba(45,212,191,0.80)',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 6,
    textAlign: 'center',
  },
  card: {
    marginHorizontal: 16,
    marginTop: -32,
    backgroundColor: theme.card,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: theme.borderAccent,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.45,
    shadowRadius: 30,
    elevation: 16,
  },
  footer: {
    textAlign: 'center',
    color: theme.textMuted,
    fontSize: 11,
    marginTop: 24,
    paddingBottom: 8,
  },
});