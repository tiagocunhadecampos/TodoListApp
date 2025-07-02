import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Todo } from "../types";
import { TodoItemStyles } from "../styles";

interface TodoItemProps {
  todo: Todo;
  isSelected: boolean;
  isMultiSelectMode: boolean;
  onPress: () => void;
  onLongPress: () => void;
  onToggleSelect: () => void;
}

export function TodoItem({
  todo,
  isSelected,
  isMultiSelectMode,
  onPress,
  onLongPress,
  onToggleSelect,
}: TodoItemProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const handlePress = () => {
    if (isMultiSelectMode) {
      onToggleSelect();
    } else {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[
        TodoItemStyles.container,
        isSelected && TodoItemStyles.containerSelected,
        todo.completed && TodoItemStyles.containerCompleted,
      ]}
      onPress={handlePress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      <View style={TodoItemStyles.content}>
        {isMultiSelectMode && (
          <TouchableOpacity
            style={TodoItemStyles.checkboxContainer}
            onPress={onToggleSelect}
          >
            <Ionicons
              name={isSelected ? "checkbox" : "square-outline"}
              size={24}
              color={isSelected ? "#4F46E5" : "#9CA3AF"}
            />
          </TouchableOpacity>
        )}

        <View style={TodoItemStyles.textContainer}>
          <Text
            style={[
              TodoItemStyles.title,
              todo.completed && TodoItemStyles.titleCompleted,
            ]}
            numberOfLines={2}
          >
            {todo.title}
          </Text>

          {todo.description && (
            <Text
              style={[
                TodoItemStyles.description,
                todo.completed && TodoItemStyles.descriptionCompleted,
              ]}
              numberOfLines={1}
            >
              {todo.description}
            </Text>
          )}

          <View style={TodoItemStyles.footer}>
            <View style={TodoItemStyles.dateContainer}>
              <Ionicons name="calendar" size={12} color="#9CA3AF" />
              <Text style={TodoItemStyles.dateText}>
                {formatDate(todo.createdAt)}
              </Text>
            </View>

            <View
              style={[
                TodoItemStyles.statusBadge,
                todo.completed
                  ? TodoItemStyles.statusBadgeCompleted
                  : TodoItemStyles.statusBadgePending,
              ]}
            >
              <Ionicons
                name={todo.completed ? "checkmark-circle" : "time"}
                size={12}
                color={todo.completed ? "#059669" : "#D97706"}
              />
              <Text
                style={[
                  TodoItemStyles.statusText,
                  todo.completed
                    ? TodoItemStyles.statusTextCompleted
                    : TodoItemStyles.statusTextPending,
                ]}
              >
                {todo.completed ? "Concluída" : "Pendente"}
              </Text>
            </View>
          </View>
        </View>

        {!isMultiSelectMode && (
          <TouchableOpacity style={TodoItemStyles.chevron} onPress={onPress}>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}
