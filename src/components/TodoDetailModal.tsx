import React from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore, useTodoStore } from "../stores";
import { Todo } from "../types";
import { TodoDetailModalStyles } from "../styles";

interface TodoDetailModalProps {
  visible: boolean;
  todo: Todo | null;
  onClose: () => void;
}

export function TodoDetailModal({
  visible,
  todo,
  onClose,
}: TodoDetailModalProps) {
  const { user } = useAuthStore();
  const { toggleTodo, todos } = useTodoStore();

  // Buscar o todo atualizado do store para garantir dados frescos
  const currentTodo = todo ? todos.find((t) => t.id === todo.id) || todo : null;

  if (!currentTodo) return null;

  const handleToggle = async () => {
    if (!user || !currentTodo) return;

    try {
      await toggleTodo(currentTodo.id, user.id);
      // Fechar o modal após a alteração para forçar re-renderização
      onClose();
    } catch (error) {
      console.error("Erro ao alternar status da tarefa:", error);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={TodoDetailModalStyles.container}>
        <View style={TodoDetailModalStyles.header}>
          <TouchableOpacity
            style={TodoDetailModalStyles.closeButton}
            onPress={onClose}
          >
            <Ionicons name="close" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={TodoDetailModalStyles.headerTitle}>
            Detalhes da Tarefa
          </Text>
          <View style={TodoDetailModalStyles.emptySpace} />
        </View>

        <ScrollView style={TodoDetailModalStyles.content}>
          <View style={TodoDetailModalStyles.statusContainer}>
            <View
              style={[
                TodoDetailModalStyles.statusBadge,
                currentTodo.completed
                  ? TodoDetailModalStyles.statusBadgeCompleted
                  : TodoDetailModalStyles.statusBadgePending,
              ]}
            >
              <Text
                style={[
                  TodoDetailModalStyles.statusText,
                  currentTodo.completed
                    ? TodoDetailModalStyles.statusTextCompleted
                    : TodoDetailModalStyles.statusTextPending,
                ]}
              >
                {currentTodo.completed ? "Concluída" : "Pendente"}
              </Text>
            </View>
          </View>

          <View style={TodoDetailModalStyles.section}>
            <Text style={TodoDetailModalStyles.sectionTitle}>Título</Text>
            <Text style={TodoDetailModalStyles.title}>{currentTodo.title}</Text>
          </View>

          {currentTodo.description && (
            <View style={TodoDetailModalStyles.section}>
              <Text style={TodoDetailModalStyles.sectionTitle}>Descrição</Text>
              <Text style={TodoDetailModalStyles.description}>
                {currentTodo.description}
              </Text>
            </View>
          )}

          <View style={TodoDetailModalStyles.section}>
            <Text style={TodoDetailModalStyles.sectionTitle}>
              Data de Criação
            </Text>
            <View style={TodoDetailModalStyles.dateContainer}>
              <Ionicons name="calendar-outline" size={20} color="#6B7280" />
              <Text style={TodoDetailModalStyles.dateText}>
                {formatDate(currentTodo.createdAt)}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              TodoDetailModalStyles.toggleButton,
              currentTodo.completed
                ? TodoDetailModalStyles.toggleButtonCompleted
                : TodoDetailModalStyles.toggleButtonPending,
            ]}
            onPress={handleToggle}
          >
            <Ionicons
              name={
                currentTodo.completed ? "checkmark-circle" : "ellipse-outline"
              }
              size={20}
              color="white"
            />
            <Text style={TodoDetailModalStyles.toggleButtonText}>
              {currentTodo.completed
                ? "Marcar como Pendente"
                : "Marcar como Concluída"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}
