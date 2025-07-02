import { openAuthSessionAsync } from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types";

// Configurações OAuth 2.0 a partir das variáveis de ambiente
const CLIENT_ID = process.env.EXPO_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.EXPO_PUBLIC_CLIENT_SECRET;
const AUTHORIZE_URL = process.env.EXPO_PUBLIC_AUTHORIZE_URL;
const TOKEN_URL = process.env.EXPO_PUBLIC_TOKEN_URL;
const REDIRECT_URI = process.env.EXPO_PUBLIC_REDIRECT_URI;

// Validação das variáveis de ambiente obrigatórias
if (
  !CLIENT_ID ||
  !CLIENT_SECRET ||
  !AUTHORIZE_URL ||
  !TOKEN_URL ||
  !REDIRECT_URI
) {
  throw new Error(
    "❌ Variáveis de ambiente OAuth não configuradas. Verifique o arquivo .env"
  );
}

export class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async authenticate(): Promise<{ user: User; token: string }> {
    try {
      const authUrl = `${AUTHORIZE_URL}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
      )}&response_type=code`;

      console.log("🚀 Iniciando autenticação...");
      console.log("🔗 URL de autorização:", authUrl);

      const result = await openAuthSessionAsync(authUrl, REDIRECT_URI);

      console.log("📱 Resultado da autenticação:", result.type);

      if (result.type !== "success" || !result.url) {
        console.log("❌ Autenticação cancelada ou falhou:", result);
        throw new Error("Autenticação cancelada ou falhou");
      }

      console.log("✅ URL de retorno recebida:", result.url);

      const url = new URL(result.url);
      const code = url.searchParams.get("code");

      console.log("🔑 Código extraído:", code);

      if (!code) {
        throw new Error("Código de autorização não encontrado");
      }

      const { token, user } = await this.exchangeCodeForToken(code);

      await AsyncStorage.setItem("auth_token", token);
      await AsyncStorage.setItem("user_data", JSON.stringify(user));

      console.log("🎉 Autenticação concluída com sucesso!");

      return { user, token };
    } catch (error) {
      console.error("❌ Erro na autenticação:", error);
      throw error;
    }
  }

  private async exchangeCodeForToken(
    code: string
  ): Promise<{ token: string; user: User }> {
    try {
      const credentials = `${CLIENT_ID}:${CLIENT_SECRET}`;
      const encodedCredentials = btoa(credentials); // base64

      const response = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encodedCredentials}`,
        },
        body: JSON.stringify({
          grant_type: "authorization_code",
          code,
          redirect_uri: REDIRECT_URI,
        }),
      });

      console.log("📥 Status da resposta:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Erro ao obter token:", errorText);
        throw new Error("Falha ao obter token");
      }

      const data = await response.json();

      const token = data.access_token || data.token;

      if (!token) {
        throw new Error("Token não encontrado na resposta do servidor");
      }

      const user: User = {
        id: data.usuarioId?.toString(),
        name: data.usuarioNome,
        email: data.login,
      };

      return { token, user };
    } catch (error) {
      console.error("Erro ao trocar código por token:", error);
      throw error;
    }
  }

  async getStoredAuth(): Promise<{ user: User; token: string } | null> {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      const userData = await AsyncStorage.getItem("user_data");

      if (token && userData) {
        return {
          token,
          user: JSON.parse(userData),
        };
      }

      return null;
    } catch (error) {
      console.error("Erro ao recuperar autenticação armazenada:", error);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem("auth_token");
      await AsyncStorage.removeItem("user_data");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }
}
