import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../stores";
import { LoginScreenStyles } from "../styles";

export function LoginScreen() {
  const { login, isLoading } = useAuthStore();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoggingIn(true);
      await login();
    } catch (error) {
      Alert.alert(
        "Erro na Autenticação",
        "Não foi possível fazer login. Tente novamente.",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (isLoading) {
    return (
      <View style={LoginScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={LoginScreenStyles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={LoginScreenStyles.container}>
      <View style={LoginScreenStyles.background}>
        <View style={LoginScreenStyles.content}>
          <View style={LoginScreenStyles.header}>
            <View style={LoginScreenStyles.iconContainer}>
              <Ionicons name="checkbox" size={60} color="white" />
            </View>
            <Text style={LoginScreenStyles.title}>TodoList</Text>
            <Text style={LoginScreenStyles.subtitle}>
              Organize suas tarefas de forma simples e eficiente
            </Text>
          </View>

          <View style={LoginScreenStyles.loginSection}>
            <Text style={LoginScreenStyles.loginTitle}>Bem-vindo!</Text>
            <Text style={LoginScreenStyles.loginSubtitle}>
              Para acessar suas tarefas, você precisa estar autenticado.
            </Text>

            <TouchableOpacity
              style={[
                LoginScreenStyles.loginButton,
                (isLoggingIn || isLoading) &&
                  LoginScreenStyles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isLoggingIn || isLoading}
            >
              {isLoggingIn ? (
                <ActivityIndicator size="small" color="#4F46E5" />
              ) : (
                <>
                  <Ionicons name="log-in" size={24} color="#4F46E5" />
                  <Text style={LoginScreenStyles.loginButtonText}>
                    Entrar com Interfocus IAS
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <View style={LoginScreenStyles.securityInfo}>
              <Ionicons
                name="shield-checkmark"
                size={20}
                color="rgba(79, 70, 229, 0.8)"
              />
              <Text style={LoginScreenStyles.securityText}>
                Autenticação segura via OAuth 2.0
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
