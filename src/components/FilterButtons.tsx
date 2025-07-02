import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TodoFilter } from "../types";
import { FilterButtonsStyles } from "../styles";

interface FilterButtonsProps {
  currentFilter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  pendingCount: number;
  completedCount: number;
  totalCount: number;
}

export function FilterButtons({
  currentFilter,
  onFilterChange,
  pendingCount,
  completedCount,
  totalCount,
}: FilterButtonsProps) {
  const filters: { key: TodoFilter; label: string; count: number }[] = [
    { key: "pending", label: "Pendentes", count: pendingCount },
    { key: "completed", label: "Concluídas", count: completedCount },
    { key: "all", label: "Todas", count: totalCount },
  ];

  return (
    <View style={FilterButtonsStyles.container}>
      {filters.map((filter) => {
        const isActive = currentFilter === filter.key;
        return (
          <TouchableOpacity
            key={filter.key}
            style={[
              FilterButtonsStyles.filterButton,
              isActive && FilterButtonsStyles.filterButtonActive,
            ]}
            onPress={() => onFilterChange(filter.key)}
          >
            <Text
              style={[
                FilterButtonsStyles.filterText,
                isActive && FilterButtonsStyles.filterTextActive,
              ]}
            >
              {filter.label}
            </Text>
            <View
              style={[
                FilterButtonsStyles.countBadge,
                isActive && FilterButtonsStyles.countBadgeActive,
              ]}
            >
              <Text
                style={[
                  FilterButtonsStyles.countText,
                  isActive && FilterButtonsStyles.countTextActive,
                ]}
              >
                {filter.count}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
