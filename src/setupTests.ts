// Mock do AsyncStorage
const mockAsyncStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Mock do expo-web-browser
jest.mock("expo-web-browser", () => ({
  openAuthSessionAsync: jest.fn(),
}));

// Mock do expo-crypto
jest.mock("expo-crypto", () => ({
  randomUUID: jest.fn(() => "mock-uuid"),
}));

// Mock do @react-native-async-storage/async-storage
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

// Mock do react-native-uuid
jest.mock("react-native-uuid", () => ({
  v4: jest.fn(() => "mock-uuid-v4"),
}));

// Mock global do fetch
global.fetch = jest.fn();

// Suprimir console.error durante os testes para não poluir a saída
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
});

// Global para testes - com tipagem
declare global {
  var mockAsyncStorage: any;
}

(global as any).mockAsyncStorage = mockAsyncStorage;
