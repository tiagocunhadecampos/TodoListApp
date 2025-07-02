import uuid from "react-native-uuid";
import { Todo } from "../types";

const SAMPLE_TITLES = [
  "Comprar ingredientes para o jantar",
  "Revisar relatório mensal",
  "Agendar consulta médica",
  "Organizar documentos importantes",
  "Estudar para a certificação",
  "Limpar a casa",
  "Fazer exercícios físicos",
  "Ligar para um amigo",
  "Atualizar currículo",
  "Planejar viagem de férias",
  "Consertar torneira quebrada",
  "Ler livro pendente",
  "Organizar fotos no celular",
  "Fazer backup dos arquivos",
  "Comprar presente de aniversário",
  "Renovar documentos",
  "Marcar horário no dentista",
  "Lavar o carro",
  "Pagar contas em atraso",
  "Organizar armário",
  "Fazer compras no supermercado",
  "Estudar novo idioma",
  "Configurar novo smartphone",
  "Visitar família",
  "Finalizar projeto pessoal",
  "Cancelar assinatura não utilizada",
  "Doar roupas antigas",
  "Pesquisar novo curso online",
  "Atualizar senhas importantes",
  "Fazer check-up médico completo",
  "Organizar mesa de trabalho",
  "Verificar seguros pessoais",
  "Instalar aplicativo de produtividade",
  "Criar lista de objetivos anuais",
  "Configurar sistema de backup",
  "Pesquisar receitas saudáveis",
  "Organizar biblioteca pessoal",
  "Verificar extrato bancário",
  "Limpar caixa de entrada do email",
  "Atualizar perfil profissional no LinkedIn",
  "Fazer manutenção do computador",
  "Pesquisar opções de investimento",
  "Organizar agenda da semana",
  "Fazer lista de compras mensais",
  "Verificar garantias de produtos",
  "Agendar manutenção do carro",
  "Pesquisar novos hobbies",
  "Organizar arquivos digitais",
  "Fazer limpeza geral no celular",
  "Verificar seguros de casa e carro",
];

const SAMPLE_DESCRIPTIONS = [
  "Importante não esquecer desta tarefa",
  "Precisa ser feito até o final da semana",
  "Tarefa de alta prioridade",
  "Lembrar de fazer quando tiver tempo livre",
  "Não deixar para a última hora",
  "Verificar disponibilidade de horário",
  "Importante para organização pessoal",
  "Pode ser feito nos próximos dias",
  "Precisa de atenção especial",
  "Tarefa de rotina semanal",
  "Não esquecer de verificar detalhes",
  "Importante para produtividade",
  "Pode ser dividido em subtarefas",
  "Verificar se há pendências",
  "Importante para bem-estar pessoal",
  "Lembrar de comparar opções",
  "Verificar se há descontos disponíveis",
  "Importante para saúde",
  "Pode ser feito no fim de semana",
  "Verificar prazos importantes",
];

export function generateRandomTodos(count: number, userId: string): Todo[] {
  const todos: Todo[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const titleIndex = Math.floor(Math.random() * SAMPLE_TITLES.length);
    const descriptionIndex = Math.floor(
      Math.random() * SAMPLE_DESCRIPTIONS.length
    );

    // Gerar data aleatória nos últimos 30 dias
    const randomDaysAgo = Math.floor(Math.random() * 30);
    const createdAt = new Date(
      now.getTime() - randomDaysAgo * 24 * 60 * 60 * 1000
    );

    const todo: Todo = {
      id: uuid.v4() as string,
      title: SAMPLE_TITLES[titleIndex],
      description: SAMPLE_DESCRIPTIONS[descriptionIndex],
      completed: Math.random() < 0.3, // 30% chance de estar concluída
      createdAt,
      userId,
    };

    todos.push(todo);
  }

  // Ordenar por data de criação (mais antigas primeiro)
  return todos.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}
