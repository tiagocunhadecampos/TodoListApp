import React, { useState } from "react";
import {
  Modal,
  Alert,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore, useTodoStore } from "../stores";
import { AddTodoModalStyles } from "../styles";

interface AddTodoModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AddTodoModal({ visible, onClose }: AddTodoModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuthStore();
  const { addTodo } = useTodoStore();

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Erro", "O título é obrigatório");
      return;
    }

    if (!user) {
      Alert.alert("Erro", "Usuário não encontrado");
      return;
    }

    try {
      await addTodo(title.trim(), description.trim(), user.id);
      setTitle("");
      setDescription("");
      onClose();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar a tarefa");
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleCancel}
    >
      <View style={AddTodoModalStyles.container}>
        <View style={AddTodoModalStyles.header}>
          <TouchableOpacity
            style={AddTodoModalStyles.cancelButton}
            onPress={handleCancel}
          >
            <Text style={AddTodoModalStyles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
          <Text style={AddTodoModalStyles.title}>Nova Tarefa</Text>
          <TouchableOpacity
            style={[
              AddTodoModalStyles.saveButton,
              !title.trim() && AddTodoModalStyles.saveButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!title.trim()}
          >
            <Text style={AddTodoModalStyles.saveText}>Salvar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={AddTodoModalStyles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={AddTodoModalStyles.inputGroup}>
            <Text style={AddTodoModalStyles.label}>Título *</Text>
            <TextInput
              style={AddTodoModalStyles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Digite o título da tarefa"
              placeholderTextColor="#9CA3AF"
              autoFocus
            />
          </View>

          <View style={AddTodoModalStyles.inputGroup}>
            <Text style={AddTodoModalStyles.label}>Descrição</Text>
            <TextInput
              style={[AddTodoModalStyles.input, AddTodoModalStyles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Digite uma descrição para a tarefa"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={AddTodoModalStyles.infoContainer}>
            <Ionicons name="information-circle" size={16} color="#6B7280" />
            <Text style={AddTodoModalStyles.infoText}>
              A tarefa será criada com a data atual e ficará pendente por
              padrão.
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
