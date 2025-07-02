import { StyleSheet, Dimensions } from "react-native";
import { theme } from "./theme";

const { width, height } = Dimensions.get("window");

export const LoginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  background: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    padding: 40,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    marginTop: 60,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  loginSection: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
  },
  securityInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(79, 70, 229, 0.1)",
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  // Typography
  loadingText: {
    marginTop: 10,
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
  },
  title: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    lineHeight: 24,
  },
  loginTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  loginButtonText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.primary,
    marginLeft: 8,
  },
  securityText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    marginLeft: 8,
    fontWeight: theme.fontWeight.medium,
  },
  // Buttons
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xxl,
    marginBottom: theme.spacing.xxl,
    ...theme.shadows.md,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    width: "100%",
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
});
