import { useTodoStore } from "../../stores/TodoStore";
import { Todo } from "../../types";

// Mock do StorageService
jest.mock("../../services/StorageService", () => ({
  StorageService: {
    getInstance: jest.fn(() => ({
      loadTodos: jest.fn().mockResolvedValue([]),
      saveTodos: jest.fn().mockResolvedValue(void 0),
    })),
  },
}));

// Mock do GenerateTodos
jest.mock("../../utils/GenerateTodos", () => ({
  generateRandomTodos: jest.fn(() => [
    {
      id: "test-id",
      title: "Test Todo",
      description: "Test Description",
      completed: false,
      createdAt: new Date(),
      userId: "test-user",
    },
  ]),
}));

describe("TodoStore", () => {
  beforeEach(() => {
    // Reset do store antes de cada teste
    useTodoStore.setState({
      todos: [],
      filter: "pending",
      isDeleting: false,
      selectedTodos: [],
      isMultiSelectMode: false,
    });
    jest.clearAllMocks();
  });

  it("deve ter estado inicial correto", () => {
    const store = useTodoStore.getState();

    expect(store.todos).toEqual([]);
    expect(store.filter).toBe("pending");
    expect(store.isDeleting).toBe(false);
    expect(store.selectedTodos).toEqual([]);
    expect(store.isMultiSelectMode).toBe(false);
  });

  it("deve alterar o filtro corretamente", () => {
    const store = useTodoStore.getState();

    store.setFilter("completed");
    expect(useTodoStore.getState().filter).toBe("completed");

    store.setFilter("all");
    expect(useTodoStore.getState().filter).toBe("all");

    store.setFilter("pending");
    expect(useTodoStore.getState().filter).toBe("pending");
  });

  it("deve calcular contadores corretamente", () => {
    // Simula alguns todos
    const mockTodos: Todo[] = [
      {
        id: "1",
        title: "Todo 1",
        description: "Desc 1",
        completed: false,
        createdAt: new Date(),
        userId: "test-user",
      },
      {
        id: "2",
        title: "Todo 2",
        description: "Desc 2",
        completed: true,
        createdAt: new Date(),
        userId: "test-user",
      },
      {
        id: "3",
        title: "Todo 3",
        description: "Desc 3",
        completed: false,
        createdAt: new Date(),
        userId: "test-user",
      },
    ];

    // Simula carregamento de todos diretamente no store
    useTodoStore.setState({ todos: mockTodos });

    const updatedStore = useTodoStore.getState();
    expect(updatedStore.getTotalCount()).toBe(3);
    expect(updatedStore.getPendingCount()).toBe(2);
    expect(updatedStore.getCompletedCount()).toBe(1);
  });

  it("deve filtrar todos corretamente", () => {
    const mockTodos: Todo[] = [
      {
        id: "1",
        title: "Todo 1",
        description: "Desc 1",
        completed: false,
        createdAt: new Date(),
        userId: "test-user",
      },
      {
        id: "2",
        title: "Todo 2",
        description: "Desc 2",
        completed: true,
        createdAt: new Date(),
        userId: "test-user",
      },
    ];

    useTodoStore.setState({ todos: mockTodos });

    // Filtro 'pending'
    useTodoStore.setState({ filter: "pending" });
    const pendingTodos = useTodoStore.getState().getFilteredTodos();
    expect(pendingTodos).toHaveLength(1);
    expect(pendingTodos[0].completed).toBe(false);

    // Filtro 'completed'
    useTodoStore.setState({ filter: "completed" });
    const completedTodos = useTodoStore.getState().getFilteredTodos();
    expect(completedTodos).toHaveLength(1);
    expect(completedTodos[0].completed).toBe(true);

    // Filtro 'all'
    useTodoStore.setState({ filter: "all" });
    const allTodos = useTodoStore.getState().getFilteredTodos();
    expect(allTodos).toHaveLength(2);
  });

  it("deve gerenciar modo de seleção múltipla", () => {
    const store = useTodoStore.getState();

    expect(store.isMultiSelectMode).toBe(false);
    expect(store.selectedTodos).toEqual([]);

    store.setMultiSelectMode(true);
    expect(useTodoStore.getState().isMultiSelectMode).toBe(true);

    store.setSelectedTodos(["id1", "id2"]);
    expect(useTodoStore.getState().selectedTodos).toEqual(["id1", "id2"]);
  });

  it("deve alternar seleção de todos", () => {
    const store = useTodoStore.getState();

    store.setSelectedTodos(["id1", "id2"]);

    // Adiciona um novo ID
    store.toggleTodoSelection("id3");
    expect(useTodoStore.getState().selectedTodos).toContain("id3");

    // Remove um ID existente
    store.toggleTodoSelection("id1");
    const currentSelected = useTodoStore.getState().selectedTodos;
    expect(currentSelected).not.toContain("id1");
    expect(currentSelected).toContain("id2");
    expect(currentSelected).toContain("id3");
  });

  it("deve ordenar todos por data de criação (crescente)", () => {
    const baseDate = new Date("2024-01-01T10:00:00Z");
    const mockTodos: Todo[] = [
      {
        id: "3",
        title: "Todo Recente",
        description: "Criado por último",
        completed: false,
        createdAt: new Date(baseDate.getTime() + 2 * 60 * 60 * 1000), // +2h
        userId: "test-user",
      },
      {
        id: "1",
        title: "Todo Antigo",
        description: "Criado primeiro",
        completed: false,
        createdAt: baseDate, // base
        userId: "test-user",
      },
      {
        id: "2",
        title: "Todo Meio",
        description: "Criado no meio",
        completed: true,
        createdAt: new Date(baseDate.getTime() + 1 * 60 * 60 * 1000), // +1h
        userId: "test-user",
      },
    ];

    useTodoStore.setState({ todos: mockTodos, filter: "all" });

    const filteredTodos = useTodoStore.getState().getFilteredTodos();

    // Verificar se estão ordenados por data de criação (crescente - mais antigos primeiro)
    expect(filteredTodos).toHaveLength(3);
    expect(filteredTodos[0].title).toBe("Todo Antigo"); // mais antigo primeiro
    expect(filteredTodos[1].title).toBe("Todo Meio");
    expect(filteredTodos[2].title).toBe("Todo Recente"); // mais recente por último

    // Verificar se as datas estão em ordem crescente
    expect(filteredTodos[0].createdAt.getTime()).toBeLessThan(
      filteredTodos[1].createdAt.getTime()
    );
    expect(filteredTodos[1].createdAt.getTime()).toBeLessThan(
      filteredTodos[2].createdAt.getTime()
    );
  });
});
