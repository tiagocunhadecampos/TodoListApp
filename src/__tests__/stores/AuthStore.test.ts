import { useAuthStore } from "../../stores/AuthStore";

// Mock do AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock do AuthService
const mockAuthenticate = jest.fn().mockResolvedValue({
  user: { id: "test-user", name: "Test User", email: "test@test.com" },
  token: "test-token",
});
const mockLogout = jest.fn().mockResolvedValue(void 0);
const mockGetStoredAuth = jest.fn().mockResolvedValue(null);

jest.mock("../../services/AuthService", () => ({
  AuthService: {
    getInstance: jest.fn(() => ({
      authenticate: mockAuthenticate,
      logout: mockLogout,
      getStoredAuth: mockGetStoredAuth,
    })),
  },
}));

describe("AuthStore", () => {
  beforeEach(() => {
    // Reset do store antes de cada teste
    useAuthStore.setState({
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: true,
    });

    // Reset dos mocks
    jest.clearAllMocks();
    mockAuthenticate.mockResolvedValue({
      user: { id: "test-user", name: "Test User", email: "test@test.com" },
      token: "test-token",
    });
    mockLogout.mockResolvedValue(void 0);
    mockGetStoredAuth.mockResolvedValue(null);
  });

  it("deve ter estado inicial correto", () => {
    const store = useAuthStore.getState();

    expect(store.isAuthenticated).toBe(false);
    expect(store.user).toBe(null);
    expect(store.token).toBe(null);
    expect(store.isLoading).toBe(true);
  });

  it("deve alterar estado de loading", () => {
    const store = useAuthStore.getState();

    store.setLoading(false);
    expect(useAuthStore.getState().isLoading).toBe(false);

    store.setLoading(true);
    expect(useAuthStore.getState().isLoading).toBe(true);
  });

  it("deve fazer login com sucesso", async () => {
    const store = useAuthStore.getState();

    await store.login();

    const updatedStore = useAuthStore.getState();
    expect(updatedStore.isAuthenticated).toBe(true);
    expect(updatedStore.user).toEqual({
      id: "test-user",
      name: "Test User",
      email: "test@test.com",
    });
    expect(updatedStore.token).toBe("test-token");
    expect(updatedStore.isLoading).toBe(false);
  });

  it("deve fazer logout corretamente", async () => {
    // Simula usuário logado
    useAuthStore.setState({
      isAuthenticated: true,
      user: { id: "test-user", name: "Test User" },
      token: "test-token",
      isLoading: false,
    });

    const store = useAuthStore.getState();
    await store.logout();

    const updatedStore = useAuthStore.getState();
    expect(updatedStore.isAuthenticated).toBe(false);
    expect(updatedStore.user).toBe(null);
    expect(updatedStore.token).toBe(null);
  });

  it("deve verificar autenticação armazenada quando não há dados", async () => {
    const store = useAuthStore.getState();

    await store.checkStoredAuth();

    const updatedStore = useAuthStore.getState();
    expect(updatedStore.isAuthenticated).toBe(false);
    expect(updatedStore.user).toBe(null);
    expect(updatedStore.token).toBe(null);
    expect(updatedStore.isLoading).toBe(false);
  });

  it("deve verificar autenticação armazenada quando há dados", async () => {
    // Mock retornando dados armazenados
    mockGetStoredAuth.mockResolvedValueOnce({
      user: { id: "stored-user", name: "Stored User" },
      token: "stored-token",
    });

    const store = useAuthStore.getState();
    await store.checkStoredAuth();

    const updatedStore = useAuthStore.getState();
    expect(updatedStore.isAuthenticated).toBe(true);
    expect(updatedStore.user).toEqual({
      id: "stored-user",
      name: "Stored User",
    });
    expect(updatedStore.token).toBe("stored-token");
    expect(updatedStore.isLoading).toBe(false);
  });

  it("deve tratar erro no login", async () => {
    // Mock erro no AuthService
    mockAuthenticate.mockRejectedValueOnce(new Error("Login failed"));

    const store = useAuthStore.getState();

    await expect(store.login()).rejects.toThrow("Login failed");

    const updatedStore = useAuthStore.getState();
    expect(updatedStore.isAuthenticated).toBe(false);
    expect(updatedStore.isLoading).toBe(false);
  });
});
