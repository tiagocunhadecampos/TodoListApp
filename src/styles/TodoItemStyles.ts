import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const TodoItemStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.xs,
    marginHorizontal: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  containerSelected: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: "#EEF2FF",
  },
  containerCompleted: {
    opacity: 0.7,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  textContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.xs,
  },
  checkboxContainer: {
    marginRight: theme.spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  selectButton: {
    padding: theme.spacing.xs,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  statusBadgeCompleted: {
    backgroundColor: theme.colors.successBg,
  },
  statusBadgePending: {
    backgroundColor: theme.colors.warningBg,
  },
  chevron: {
    marginLeft: 8,
  },

  // Typography
  title: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: 4,
    lineHeight: 22,
  },
  titleCompleted: {
    color: theme.colors.text.disabled,
    textDecorationLine: "line-through",
  },
  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  descriptionCompleted: {
    color: theme.colors.text.disabled,
    textDecorationLine: "line-through",
  },
  dateText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.disabled,
    marginLeft: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: theme.fontWeight.medium,
    marginLeft: 3,
  },
  statusTextCompleted: {
    color: theme.colors.success,
  },
  statusTextPending: {
    color: theme.colors.warning,
  },
});
