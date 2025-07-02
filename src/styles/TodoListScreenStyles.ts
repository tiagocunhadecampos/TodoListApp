import { StyleSheet, Dimensions } from "react-native";
import { theme } from "./theme";

const { width, height } = Dimensions.get("window");

export const TodoListScreenStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.surface,
  },
  headerLeft: {
    flex: 1,
  },
  multiSelectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  actionButtons: {
    flexDirection: "row",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 64,
    paddingHorizontal: 32,
  },

  // Buttons
  logoutButton: {
    padding: 8,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.gray[100],
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.lg,
  },

  // Typography
  loadingText: {
    marginTop: 16,
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
  },
  greeting: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  cancelText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    marginLeft: 4,
  },
  selectedCount: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  emptyTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.disabled,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.disabled,
    textAlign: "center",
    lineHeight: 20,
  },

  // Lists
  list: {
    flex: 1,
    paddingVertical: 8,
  },
});
