import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const FilterButtonsStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.colors.gray[100],
    margin: 16,
    borderRadius: 12,
    padding: 4,
  },
  filterButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  filterButtonActive: {
    backgroundColor: "white",
    ...theme.shadows.sm,
  },
  filterText: {
    fontSize: 14,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.secondary,
    marginRight: 6,
  },
  filterTextActive: {
    color: theme.colors.primary,
  },
  countBadge: {
    backgroundColor: theme.colors.border,
    borderRadius: 10,
    padding: 2,
    paddingHorizontal: 6,
    minWidth: 20,
    alignItems: "center",
  },
  countBadgeActive: {
    backgroundColor: theme.colors.primary,
  },
  countText: {
    fontSize: 12,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.secondary,
  },
  countTextActive: {
    color: "white",
  },
});
