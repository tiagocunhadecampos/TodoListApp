import React, { useState, useMemo, useEffect } from "react";
import {
  Alert,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore, useTodoStore } from "../stores";
import { TodoItem } from "../components/TodoItem";
import { FilterButtons } from "../components/FilterButtons";
import { AddTodoModal } from "../components/AddTodoModal";
import { TodoDetailModal } from "../components/TodoDetailModal";
import { Todo } from "../types";
import { TodoListScreenStyles } from "../styles";

export function TodoListScreen() {
  const { user, logout } = useAuthStore();
  const {
    todos,
    getFilteredTodos,
    filter,
    setFilter,
    toggleTodo,
    toggleMultipleTodos,
    deleteTodos,
    isDeleting,
    loadTodos,
  } = useTodoStore();

  const [selectedTodos, setSelectedTodos] = useState<string[]>([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  useEffect(() => {
    if (user) {
      loadTodos(user.id);
    }
  }, [user, loadTodos]);

  const filteredTodos = getFilteredTodos();

  const counts = useMemo(() => {
    const pending = todos.filter((todo) => !todo.completed).length;
    const completed = todos.filter((todo) => todo.completed).length;
    return {
      pending,
      completed,
      total: todos.length,
    };
  }, [todos]);

  const handleTodoPress = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsDetailModalVisible(true);
  };

  const handleTodoLongPress = (todoId: string) => {
    if (!isMultiSelectMode) {
      setIsMultiSelectMode(true);
      setSelectedTodos([todoId]);
    }
  };

  const handleToggleSelect = (todoId: string) => {
    setSelectedTodos((prev) => {
      if (prev.includes(todoId)) {
        const newSelected = prev.filter((id) => id !== todoId);
        if (newSelected.length === 0) {
          setIsMultiSelectMode(false);
        }
        return newSelected;
      } else {
        return [...prev, todoId];
      }
    });
  };

  const handleCancelMultiSelect = () => {
    setIsMultiSelectMode(false);
    setSelectedTodos([]);
  };

  const handleDeleteSelected = () => {
    const count = selectedTodos.length;
    Alert.alert(
      "Confirmar Exclusão",
      `Deseja excluir ${count} tarefa${count > 1 ? "s" : ""}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            if (user) {
              await deleteTodos(selectedTodos, user.id);
              setIsMultiSelectMode(false);
              setSelectedTodos([]);
            }
          },
        },
      ]
    );
  };

  const handleMarkSelectedAsCompleted = async () => {
    const selectedTodoItems = todos.filter((todo) =>
      selectedTodos.includes(todo.id)
    );
    const pendingTodos = selectedTodoItems.filter((todo) => !todo.completed);

    if (pendingTodos.length === 0) {
      Alert.alert(
        "Aviso",
        "Todas as tarefas selecionadas já estão concluídas."
      );
      return;
    }

    if (user) {
      // Usar a nova função otimizada para alternar múltiplos todos
      const pendingIds = pendingTodos.map((todo) => todo.id);
      await toggleMultipleTodos(pendingIds, user.id);
    }

    setIsMultiSelectMode(false);
    setSelectedTodos([]);
  };

  const handleLogout = () => {
    Alert.alert("Confirmar Logout", "Deseja sair do aplicativo?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: logout },
    ]);
  };

  const handleToggleTodoFromDetail = () => {
    if (selectedTodo && user) {
      toggleTodo(selectedTodo.id, user.id);
      setIsDetailModalVisible(false);
      setSelectedTodo(null);
    }
  };

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <TodoItem
      todo={item}
      isSelected={selectedTodos.includes(item.id)}
      isMultiSelectMode={isMultiSelectMode}
      onPress={() => handleTodoPress(item)}
      onLongPress={() => handleTodoLongPress(item.id)}
      onToggleSelect={() => handleToggleSelect(item.id)}
    />
  );

  const renderEmptyList = () => (
    <View style={TodoListScreenStyles.emptyContainer}>
      <Ionicons name="checkbox-outline" size={80} color="#E5E7EB" />
      <Text style={TodoListScreenStyles.emptyTitle}>
        Nenhuma tarefa encontrada
      </Text>
      <Text style={TodoListScreenStyles.emptySubtitle}>
        {filter === "pending" && "Você não tem tarefas pendentes"}
        {filter === "completed" && "Você não tem tarefas concluídas"}
        {filter === "all" && "Comece adicionando uma nova tarefa"}
      </Text>
    </View>
  );

  if (isDeleting) {
    return (
      <View style={TodoListScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={TodoListScreenStyles.loadingText}>
          Excluindo tarefas...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={TodoListScreenStyles.container}>
      <View style={TodoListScreenStyles.header}>
        <View style={TodoListScreenStyles.headerLeft}>
          <Text style={TodoListScreenStyles.greeting}>
            Olá, {user?.name || "Usuário"}!
          </Text>
          <Text style={TodoListScreenStyles.subtitle}>
            {counts.total} tarefa{counts.total !== 1 ? "s" : ""} no total
          </Text>
        </View>
        <TouchableOpacity
          style={TodoListScreenStyles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <FilterButtons
        currentFilter={filter}
        onFilterChange={setFilter}
        pendingCount={counts.pending}
        completedCount={counts.completed}
        totalCount={counts.total}
      />

      {isMultiSelectMode && (
        <View style={TodoListScreenStyles.multiSelectHeader}>
          <TouchableOpacity
            style={TodoListScreenStyles.cancelButton}
            onPress={handleCancelMultiSelect}
          >
            <Ionicons name="close" size={20} color="#6B7280" />
            <Text style={TodoListScreenStyles.cancelText}>Cancelar</Text>
          </TouchableOpacity>

          <Text style={TodoListScreenStyles.selectedCount}>
            {selectedTodos.length} selecionada
            {selectedTodos.length !== 1 ? "s" : ""}
          </Text>

          <View style={TodoListScreenStyles.actionButtons}>
            <TouchableOpacity
              style={TodoListScreenStyles.actionButton}
              onPress={handleMarkSelectedAsCompleted}
            >
              <Ionicons name="checkmark" size={18} color="#059669" />
            </TouchableOpacity>

            <TouchableOpacity
              style={TodoListScreenStyles.actionButton}
              onPress={handleDeleteSelected}
            >
              <Ionicons name="trash" size={18} color="#DC2626" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        style={TodoListScreenStyles.list}
        data={filteredTodos}
        renderItem={renderTodoItem}
        keyExtractor={(item: Todo) => item.id}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={true}
      />

      {!isMultiSelectMode && (
        <TouchableOpacity
          style={TodoListScreenStyles.fab}
          onPress={() => setIsAddModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      )}

      <AddTodoModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      />

      <TodoDetailModal
        todo={selectedTodo}
        visible={isDetailModalVisible}
        onClose={() => {
          setIsDetailModalVisible(false);
          setSelectedTodo(null);
        }}
      />
    </SafeAreaView>
  );
}
