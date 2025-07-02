import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo } from "../types";

// Configuração de storage a partir das variáveis de ambiente
const TODOS_STORAGE_KEY =
  process.env.EXPO_PUBLIC_TODOS_STORAGE_KEY || "todos_storage";

export class StorageService {
  private static instance: StorageService;

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  async saveTodos(userId: string, todos: Todo[]): Promise<void> {
    try {
      const key = `${TODOS_STORAGE_KEY}_${userId}`;
      await AsyncStorage.setItem(key, JSON.stringify(todos));
    } catch (error) {
      console.error("Erro ao salvar todos:", error);
      throw error;
    }
  }

  async loadTodos(userId: string): Promise<Todo[]> {
    try {
      const key = `${TODOS_STORAGE_KEY}_${userId}`;
      const data = await AsyncStorage.getItem(key);

      if (data) {
        const todos = JSON.parse(data);
        // Converter strings de data de volta para objetos Date
        return todos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }));
      }

      return [];
    } catch (error) {
      console.error("Erro ao carregar todos:", error);
      return [];
    }
  }

  async clearTodos(userId: string): Promise<void> {
    try {
      const key = `${TODOS_STORAGE_KEY}_${userId}`;
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Erro ao limpar todos:", error);
      throw error;
    }
  }
}
