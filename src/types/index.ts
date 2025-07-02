export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  userId: string;
}

export interface User {
  id: string;
  name?: string;
  email?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export type TodoFilter = "all" | "pending" | "completed";

export interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string, description: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodos: (ids: string[]) => Promise<void>;
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
  filteredTodos: Todo[];
  isDeleting: boolean;
}

export interface AuthContextType extends AuthState {
  login: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}
