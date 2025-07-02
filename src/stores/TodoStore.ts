import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import uuid from "react-native-uuid";
import { Todo, TodoFilter } from "../types";
import { StorageService } from "../services/StorageService";
import { generateRandomTodos } from "../utils/GenerateTodos";

export interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
  isDeleting: boolean;
  selectedTodos: string[];
  isMultiSelectMode: boolean;
}

export interface TodoActions {
  loadTodos: (userId: string) => Promise<void>;
  addTodo: (
    title: string,
    description: string,
    userId: string
  ) => Promise<void>;
  toggleTodo: (id: string, userId: string) => Promise<void>;
  deleteTodos: (ids: string[], userId: string) => Promise<void>;
  setFilter: (filter: TodoFilter) => void;
  setSelectedTodos: (ids: string[]) => void;
  setMultiSelectMode: (enabled: boolean) => void;
  toggleTodoSelection: (id: string) => void;
  clearTodos: () => void;
  toggleMultipleTodos: (ids: string[], userId: string) => Promise<void>;
}

export interface TodoComputed {
  getFilteredTodos: () => Todo[];
  getPendingCount: () => number;
  getCompletedCount: () => number;
  getTotalCount: () => number;
}

export type TodoStore = TodoState & TodoActions & TodoComputed;

export const useTodoStore = create<TodoStore>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // State
      todos: [],
      filter: "pending",
      isDeleting: false,
      selectedTodos: [],
      isMultiSelectMode: false,

      // Computed values
      getFilteredTodos: () => {
        const state = get();
        const { todos, filter } = state;

        let filtered: Todo[];
        switch (filter) {
          case "completed":
            filtered = todos.filter((todo) => todo.completed);
            break;
          case "pending":
            filtered = todos.filter((todo) => !todo.completed);
            break;
          case "all":
          default:
            filtered = todos;
            break;
        }

        // Ordenar por data de criação (crescente - mais antigos primeiro)
        return filtered.sort(
          (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
        );
      },

      getPendingCount: () => {
        return get().todos.filter((todo) => !todo.completed).length;
      },

      getCompletedCount: () => {
        return get().todos.filter((todo) => todo.completed).length;
      },

      getTotalCount: () => {
        return get().todos.length;
      },

      // Actions
      loadTodos: async (userId: string) => {
        try {
          const storageService = StorageService.getInstance();
          let userTodos = await storageService.loadTodos(userId);

          // Se é o primeiro login do usuário, gerar 50 todos aleatórios
          if (userTodos.length === 0) {
            userTodos = generateRandomTodos(50, userId);
            await storageService.saveTodos(userId, userTodos);
          }

          set({ todos: userTodos });
        } catch (error) {
          console.error("❌ Erro ao carregar todos:", error);
        }
      },

      addTodo: async (title: string, description: string, userId: string) => {
        try {
          const newTodo: Todo = {
            id: uuid.v4() as string,
            title,
            description,
            completed: false,
            createdAt: new Date(),
            userId,
          };

          const currentTodos = get().todos;
          const updatedTodos = [...currentTodos, newTodo];

          const storageService = StorageService.getInstance();
          await storageService.saveTodos(userId, updatedTodos);

          set({ todos: updatedTodos });
        } catch (error) {
          console.error("Erro ao adicionar todo:", error);
          throw error;
        }
      },

      toggleTodo: async (id: string, userId: string) => {
        try {
          const currentTodos = get().todos;
          const updatedTodos = currentTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          );

          const storageService = StorageService.getInstance();
          await storageService.saveTodos(userId, updatedTodos);

          set({ todos: updatedTodos });
        } catch (error) {
          console.error("Erro ao alternar todo:", error);
          throw error;
        }
      },

      toggleMultipleTodos: async (ids: string[], userId: string) => {
        try {
          const currentTodos = get().todos;
          const updatedTodos = currentTodos.map((todo) =>
            ids.includes(todo.id)
              ? { ...todo, completed: !todo.completed }
              : todo
          );

          const storageService = StorageService.getInstance();
          await storageService.saveTodos(userId, updatedTodos);

          set({ todos: updatedTodos });
        } catch (error) {
          console.error("Erro ao alternar múltiplos todos:", error);
          throw error;
        }
      },

      deleteTodos: async (ids: string[], userId: string) => {
        try {
          set({ isDeleting: true });

          // Simular delay de 1 segundo conforme especificado
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const currentTodos = get().todos;
          const updatedTodos = currentTodos.filter(
            (todo) => !ids.includes(todo.id)
          );

          const storageService = StorageService.getInstance();
          await storageService.saveTodos(userId, updatedTodos);

          set({
            todos: updatedTodos,
            isDeleting: false,
            selectedTodos: [],
            isMultiSelectMode: false,
          });
        } catch (error) {
          console.error("Erro ao deletar todos:", error);
          set({ isDeleting: false });
          throw error;
        }
      },

      setFilter: (filter: TodoFilter) => {
        set({ filter });
      },

      setSelectedTodos: (ids: string[]) => {
        set({ selectedTodos: ids });
      },

      setMultiSelectMode: (enabled: boolean) => {
        set({
          isMultiSelectMode: enabled,
          selectedTodos: enabled ? get().selectedTodos : [],
        });
      },

      toggleTodoSelection: (id: string) => {
        const currentSelected = get().selectedTodos;
        const newSelected = currentSelected.includes(id)
          ? currentSelected.filter((selectedId) => selectedId !== id)
          : [...currentSelected, id];

        set({
          selectedTodos: newSelected,
          isMultiSelectMode: newSelected.length > 0,
        });
      },

      clearTodos: () => {
        set({
          todos: [],
          selectedTodos: [],
          isMultiSelectMode: false,
          filter: "pending",
        });
      },
    })),
    {
      name: "todo-store",
    }
  )
);
