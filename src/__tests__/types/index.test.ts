import { Todo, User, TodoFilter } from "../../types";

describe("Types", () => {
  describe("Todo interface", () => {
    it("deve validar estrutura do Todo", () => {
      const todo: Todo = {
        id: "test-id",
        title: "Test Title",
        description: "Test Description",
        completed: false,
        createdAt: new Date(),
        userId: "user-id",
      };

      expect(todo.id).toBe("test-id");
      expect(todo.title).toBe("Test Title");
      expect(todo.description).toBe("Test Description");
      expect(todo.completed).toBe(false);
      expect(todo.createdAt).toBeInstanceOf(Date);
      expect(todo.userId).toBe("user-id");
    });
  });

  describe("User interface", () => {
    it("deve validar estrutura do User com todos os campos", () => {
      const user: User = {
        id: "user-id",
        name: "Test User",
        email: "test@example.com",
      };

      expect(user.id).toBe("user-id");
      expect(user.name).toBe("Test User");
      expect(user.email).toBe("test@example.com");
    });

    it("deve validar estrutura do User com campos opcionais", () => {
      const user: User = {
        id: "user-id",
      };

      expect(user.id).toBe("user-id");
      expect(user.name).toBeUndefined();
      expect(user.email).toBeUndefined();
    });
  });

  describe("TodoFilter type", () => {
    it("deve aceitar valores válidos para TodoFilter", () => {
      const filters: TodoFilter[] = ["all", "pending", "completed"];

      filters.forEach((filter) => {
        expect(["all", "pending", "completed"]).toContain(filter);
      });
    });

    it("deve validar cada valor de filtro individualmente", () => {
      const allFilter: TodoFilter = "all";
      const pendingFilter: TodoFilter = "pending";
      const completedFilter: TodoFilter = "completed";

      expect(allFilter).toBe("all");
      expect(pendingFilter).toBe("pending");
      expect(completedFilter).toBe("completed");
    });
  });

  describe("Data validation", () => {
    it("deve criar Todo com data atual", () => {
      const now = new Date();
      const todo: Todo = {
        id: "test-id",
        title: "Test",
        description: "Description",
        completed: false,
        createdAt: now,
        userId: "user-id",
      };

      expect(todo.createdAt.getTime()).toBe(now.getTime());
    });

    it("deve permitir Todo com completed true", () => {
      const todo: Todo = {
        id: "test-id",
        title: "Test",
        description: "Description",
        completed: true,
        createdAt: new Date(),
        userId: "user-id",
      };

      expect(todo.completed).toBe(true);
    });
  });
});
