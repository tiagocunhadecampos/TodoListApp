import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "./src/stores";
import { LoginScreen } from "./src/screens/LoginScreen";
import { TodoListScreen } from "./src/screens/TodoListScreen";

function AppContent() {
  const { isAuthenticated, isLoading, checkStoredAuth } = useAuthStore();

  useEffect(() => {
    checkStoredAuth();
  }, [checkStoredAuth]);

  if (isLoading) {
    return null; // ou um componente de loading
  }

  return (
    <>
      <StatusBar style="auto" />
      {isAuthenticated ? <TodoListScreen /> : <LoginScreen />}
    </>
  );
}

export default function App() {
  return <AppContent />;
}
