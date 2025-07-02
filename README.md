# TodoListApp

Um aplicativo de lista de tarefas desenvolvido em React Native com Expo, utilizando Zustand para gerenciamento de estado global e StyleSheet nativo do React Native para estilização. O app possui autenticação OAuth 2.0 integrada com Interfocus IAS.

## ✨ Funcionalidades

- **Autenticação OAuth 2.0**: Login seguro usando Interfocus IAS
- **Lista de Tarefas Personalizada**: Cada usuário tem sua própria lista de tarefas
- **Geração Automática**: 50 tarefas são criadas automaticamente no primeiro login
- **Filtros**: Visualize todas, pendentes ou concluídas
- **Ordenação Inteligente**: Itens ordenados por data de criação (mais antigos primeiro)
- **Detalhes**: Modal para visualizar e editar tarefas
- **Armazenamento Local**: Dados salvos localmente com AsyncStorage
- **Interface Moderna**: Design clean com StyleSheet nativo do React Native

## 🚀 Tecnologias

### Core

- **React Native**: 0.71.14
- **Expo SDK**: 48.0.18
- **TypeScript**: 4.9.4

### Gerenciamento de Estado

- **Zustand**: 5.0.6 (Estado global)

### Estilização

- **StyleSheet Nativo**: Usa StyleSheet do React Native para performance otimizada

### Autenticação

- **expo-auth-session**: 4.0.3
- **expo-web-browser**: 12.1.1
- **expo-crypto**: 12.2.1

### Armazenamento

- **@react-native-async-storage/async-storage**: 2.1.2

### Outras Dependências

- **expo-updates**: 0.16.4
- **expo-linking**: 4.0.1
- **expo-splash-screen**: 0.18.2
- **react-native-uuid**: 2.0.3

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── AddTodoModal.tsx
│   ├── FilterButtons.tsx
│   ├── TodoDetailModal.tsx
│   └── TodoItem.tsx
├── screens/             # Telas principais
│   ├── LoginScreen.tsx
│   └── TodoListScreen.tsx
├── services/            # Serviços externos
│   ├── AuthService.ts
│   └── StorageService.ts
├── stores/              # Stores Zustand
│   ├── AuthStore.ts
│   ├── TodoStore.ts
│   └── index.ts
├── styles/              # Estilos organizados
│   ├── AddTodoModalStyles.ts
│   ├── FilterButtonsStyles.ts
│   ├── LoginScreenStyles.ts
│   ├── TodoDetailModalStyles.ts
│   ├── TodoItemStyles.ts
│   ├── TodoListScreenStyles.ts
│   ├── index.ts
│   └── theme.ts
├── types/               # Definições de tipos
│   └── index.ts
└── utils/               # Utilitários
    └── GenerateTodos.ts
```

## 🛠️ Configuração e Instalação

### Pré-requisitos

- Node.js 16+
- npm ou yarn
- Expo CLI global: `npm install -g expo-cli`
- Expo Go app no celular (ou emulador)

### Instalação

1. **Clone o repositório**

   ```bash
   git clone <repository-url>
   cd TodoListApp
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   ```bash
   cp .env.example .env
   ```

   Edite o arquivo `.env` com suas credenciais OAuth 2.0:

   ```env
   EXPO_PUBLIC_CLIENT_ID=seu-client-id
   EXPO_PUBLIC_CLIENT_SECRET=seu-client-secret
   EXPO_PUBLIC_AUTHORIZE_URL=https://sua-url-ias/authorize
   EXPO_PUBLIC_TOKEN_URL=https://sua-url-ias/api/oauth/token
   EXPO_PUBLIC_REDIRECT_URI=sua-app://oauthredirect
   ```

4. **Inicie o servidor de desenvolvimento**

   ```bash
   npm start
   ```

   ou

   ```bash
   expo start
   ```

5. **Execute no dispositivo**
   - Escaneie o QR code com o Expo Go (Android)
   - Escaneie o QR code com a câmera (iOS)
   - Ou use os emuladores com `expo start --ios` / `expo start --android`

## 🔧 Scripts Disponíveis

- `npm start`: Inicia o servidor Expo
- `npm run android`: Abre no emulador Android
- `npm run ios`: Abre no simulador iOS
- `npm run web`: Abre no navegador web
- `npm test`: Executa os testes

## 🏗️ Arquitetura

### Gerenciamento de Estado (Zustand)

O app utiliza dois stores principais:

#### AuthStore

- Gerencia estado de autenticação
- Armazena tokens OAuth 2.0
- Controla informações do usuário

#### TodoStore

- Gerencia lista de tarefas por usuário
- Filtros (todas, pendentes, concluídas)
- Operações CRUD das tarefas

### Autenticação OAuth 2.0

1. **Authorization Code Flow**: Redirecionamento para Interfocus IAS
2. **Token Exchange**: Troca do código por access token
3. **Armazenamento Seguro**: Tokens salvos localmente
4. **Refresh Automático**: Renovação automática de tokens

### Estilização com StyleSheet Nativo

- Tema centralizado em `src/styles/theme.ts`
- Estilos organizados por funcionalidade usando StyleSheet.create()
- Tipagem TypeScript para tema e propriedades
- Performance otimizada com StyleSheet nativo
- Sistema responsivo

## 🔒 Configuração OAuth 2.0

O projeto utiliza variáveis de ambiente para configuração OAuth 2.0. Configure o arquivo `.env`:

```env
# OAuth 2.0 Configuration
EXPO_PUBLIC_CLIENT_ID=seu-client-id
EXPO_PUBLIC_CLIENT_SECRET=seu-client-secret
EXPO_PUBLIC_AUTHORIZE_URL=https://sua-url-ias/authorize
EXPO_PUBLIC_TOKEN_URL=https://sua-url-ias/api/oauth/token
EXPO_PUBLIC_REDIRECT_URI=sua-app://oauthredirect

# Storage Configuration
EXPO_PUBLIC_TODOS_STORAGE_KEY=todos_storage
```

## 🚀 Deploy

### Expo Application Services (EAS)

1. **Instale EAS CLI**

   ```bash
   npm install -g eas-cli
   ```

2. **Configure o projeto**

   ```bash
   eas init
   ```

3. **Build para produção**

   ```bash
   eas build --platform all
   ```

4. **Publish updates**
   ```bash
   eas update
   ```

## 📱 Compatibilidade

- **iOS**: 13.0+
- **Android**: API Level 21+ (Android 5.0+)
- **Expo Go**: Compatível
- **Hermes**: Suportado
- **New Architecture**: Habilitada

## 🐛 Resolução de Problemas

### Cache Issues

```bash
expo start --clear
```

### Dependências

```bash
npx expo install --fix
npm install
```

### TypeScript

```bash
npx tsc --noEmit
```

### Reset completo

```bash
rm -rf node_modules package-lock.json
npm install
expo start --clear
```

## 🧪 Testes

O projeto inclui testes automatizados para garantir a qualidade do código:

### Estrutura de Testes

```
src/__tests__/
├── stores/              # Testes dos stores Zustand
│   ├── AuthStore.test.ts
│   └── TodoStore.test.ts
├── types/               # Testes das tipagens
│   └── index.test.ts
└── utils/               # Testes dos utilitários
    └── GenerateTodos.test.ts
```

### Tecnologias de Teste

- **Jest**: Framework de testes
- **TypeScript**: Testes tipados
- **ts-jest**: Compilação TypeScript para Jest

### Comandos de Teste

```bash
# Executar todos os testes
npm test
```

### Cobertura de Testes

Os testes cobrem:

- ✅ **Stores Zustand**: AuthStore e TodoStore
- ✅ **Utilitários**: Geração de todos aleatórios
- ✅ **Tipos**: Validação de interfaces TypeScript
- ✅ **Lógica de negócio**: Filtros, autenticação, CRUD

### 🔄 Funcionalidades Implementadas

- 🔐 **Autenticação OAuth 2.0**: Sistema completo de login/logout
- 📝 **Gerenciamento de Tarefas**: CRUD completo de tarefas
- 🔍 **Filtros**: Visualização por status (todas/pendentes/concluídas)
- 💾 **Persistência**: Dados salvos localmente por usuário
- 🎨 **Interface**: Design moderno com StyleSheet nativo para performance otimizada
- 📱 **Responsividade**: Compatível com diferentes tamanhos de tela

## 🔐 Segurança e Melhores Práticas

### Variáveis de Ambiente

- ✅ **Credenciais OAuth**: Armazenadas em `.env` (não commitado)
- ✅ **Configuração flexível**: Diferentes ambientes (dev, staging, prod)
- ✅ **Validação**: Verificação automática de variáveis obrigatórias
- ✅ **Exemplo documentado**: `.env.example` para referência

### Práticas de Segurança

- 🔒 **Tokens seguros**: Armazenamento local com AsyncStorage
- 🔐 **OAuth 2.0**: Fluxo de autorização padrão da indústria
- 🚫 **Sem hardcode**: Credenciais não expostas no código
- 📝 **Gitignore**: `.env` adicionado ao controle de versão
