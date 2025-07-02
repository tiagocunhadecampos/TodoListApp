import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const TodoDetailModalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xxxl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  closeButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.gray[100],
  },
  headerTitle: {
    color: theme.colors.text.primary,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
  },
  emptySpace: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  statusContainer: {
    alignItems: "flex-start",
    marginBottom: theme.spacing.lg,
  },
  statusBadge: {
    padding: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
  },
  statusBadgeCompleted: {
    backgroundColor: theme.colors.successBg,
    borderColor: theme.colors.success,
  },
  statusBadgePending: {
    backgroundColor: theme.colors.warningBg,
    borderColor: theme.colors.warning,
  },
  statusText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    textTransform: "uppercase",
  },
  statusTextCompleted: {
    color: theme.colors.success,
  },
  statusTextPending: {
    color: theme.colors.warning,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    color: theme.colors.text.secondary,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    marginBottom: theme.spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    color: theme.colors.text.primary,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    lineHeight: theme.fontSize.lg * theme.lineHeight.normal,
  },
  description: {
    color: theme.colors.text.secondary,
    fontSize: theme.fontSize.md,
    lineHeight: theme.fontSize.md * theme.lineHeight.relaxed,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    color: theme.colors.text.secondary,
    fontSize: theme.fontSize.md,
    marginLeft: theme.spacing.sm,
  },
  toggleButton: {
    padding: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    marginTop: theme.spacing.xl,
    flexDirection: "row",
    justifyContent: "center",
  },
  toggleButtonCompleted: {
    backgroundColor: theme.colors.success,
  },
  toggleButtonPending: {
    backgroundColor: theme.colors.primary,
  },
  toggleButtonText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    marginLeft: theme.spacing.sm,
  },
});
