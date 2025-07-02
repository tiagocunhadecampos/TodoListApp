import { generateRandomTodos } from "../../utils/GenerateTodos";

describe("GenerateTodos", () => {
  describe("generateRandomTodos", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("deve gerar o número correto de todos", () => {
      const count = 5;
      const userId = "test-user-id";
      const todos = generateRandomTodos(count, userId);

      expect(todos).toHaveLength(count);
    });

    it("deve gerar todos com propriedades corretas", () => {
      const count = 1;
      const userId = "test-user-id";
      const todos = generateRandomTodos(count, userId);
      const todo = todos[0];

      expect(todo).toHaveProperty("id");
      expect(todo).toHaveProperty("title");
      expect(todo).toHaveProperty("description");
      expect(todo).toHaveProperty("completed");
      expect(todo).toHaveProperty("createdAt");
      expect(todo).toHaveProperty("userId");

      expect(typeof todo.id).toBe("string");
      expect(typeof todo.title).toBe("string");
      expect(typeof todo.description).toBe("string");
      expect(typeof todo.completed).toBe("boolean");
      expect(todo.createdAt).toBeInstanceOf(Date);
      expect(todo.userId).toBe(userId);
    });

    it("deve gerar todos com status completed aleatório", () => {
      const count = 20;
      const userId = "test-user-id";
      const todos = generateRandomTodos(count, userId);

      const completedTodos = todos.filter((todo) => todo.completed);
      const pendingTodos = todos.filter((todo) => !todo.completed);

      // Com 20 todos, é estatisticamente improvável que todos tenham o mesmo status
      expect(completedTodos.length).toBeGreaterThan(0);
      expect(pendingTodos.length).toBeGreaterThan(0);
    });

    it("deve gerar todos com IDs únicos", () => {
      // Mockando uuid para retornar IDs únicos
      const mockUuid = require("react-native-uuid");
      let counter = 0;
      mockUuid.v4.mockImplementation(() => `mock-uuid-${counter++}`);

      const count = 10;
      const userId = "test-user-id";
      const todos = generateRandomTodos(count, userId);

      const ids = todos.map((todo) => todo.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(count);
    });

    it("deve gerar array vazio quando count é 0", () => {
      const count = 0;
      const userId = "test-user-id";
      const todos = generateRandomTodos(count, userId);

      expect(todos).toHaveLength(0);
    });
  });
});
