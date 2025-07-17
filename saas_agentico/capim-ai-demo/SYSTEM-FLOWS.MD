# SYSTEM-FLOWS.MD

## Fluxos do Sistema - Demo Capim AI

### Última Atualização: 16/01/2025

---

## 📋 Resumo das Alterações Recentes

### ✅ Implementação de Overlay Bubble para Chat

**Data:** 16/01/2025  
**Objetivo:** Melhorar a UX do chat removendo a expansão que empurrava o conteúdo para baixo, substituindo por um overlay bubble flutuante.

#### 🎯 Funcionalidades Implementadas:

1. **Novo Comportamento do Chat**
   - Arquivo: `src/components/ChatOverlay.tsx`
   - Pills de sugestão desaparecem quando usuário envia mensagem
   - Overlay bubble flutuante aparece ao invés de expandir a caixa
   - Backdrop semi-transparente com click-to-close
   - Barra de chat principal permanece fixa e não empurra conteúdo

2. **Design do Overlay com Backdrop**
   - Posicionamento: `fixed` centralizado horizontalmente na tela
   - Container: `w-[600px]` (600px) com altura máxima de 75vh
   - Backdrop escuro com blur (`bg-black bg-opacity-20 backdrop-blur-sm`)
   - Mensagens mais largas: `max-w-[480px]` para melhor legibilidade
   - Elementos semi-transparentes com blur (`bg-white/90 backdrop-blur-sm`)
   - Caixa de entrada reduzida para tamanho médio (`w-96`)

3. **Interações Melhoradas:**
   - **Fechar conversa:** Click no backdrop, botão X flutuante ou botão "Limpar"
   - **Voltar às sugestões:** Automaticamente ao fechar conversa
   - **Backdrop inteligente:** Escurece e desfoca o fundo para foco na conversa
   - **Mensagens expandidas:** Largura maior (480px) para melhor leitura
   - **Input otimizado:** Caixa de entrada em tamanho médio, não ocupa toda largura
   - **Efeitos visuais:** Semi-transparência e blur em todos os elementos

### ✅ Novo Módulo de Orçamentos

**Data:** 16/01/2025  
**Objetivo:** Implementar módulo de gestão do funil de vendas através de orçamentos odontológicos.

#### 🎯 Funcionalidades Implementadas:

1. **Página de Orçamentos**
   - Arquivo: `src/pages/OrcamentosPage.tsx`
   - Dashboard com KPIs: Total de orçamentos, valor total, aprovados, taxa de conversão
   - Tabela com lista de orçamentos e status visual (aguardando, aprovado, rejeitado, em negociação)
   - Barra de probabilidade de conversão para cada orçamento
   - Controles de busca e filtros

2. **Integração na Sidebar**
   - Arquivo: `src/components/Sidebar.tsx`
   - Adicionado "Orçamentos" na seção **👩‍⚕️ Atendimento**
   - Ícone: FileText (lucide-react)
   - Rota: `/orcamentos`

3. **Roteamento**
   - Arquivo: `src/App.tsx`
   - Nova rota configurada para OrcamentosPage
   - Integração com React Router

4. **Funcionalidades da Interface:**
   - **KPIs visuais:** Cards com métricas de performance do funil
   - **Status coloridos:** Indicadores visuais para cada status de orçamento
   - **Ações rápidas:** Botões para editar, aprovar e rejeitar orçamentos
   - **Busca e filtros:** Ferramentas para gestão eficiente da lista
   - **Dados mockados:** Exemplos realistas de orçamentos odontológicos

### ✅ Reorganização da Sidebar por Jornadas de Trabalho

**Data:** 16/01/2025  
**Objetivo:** Separar ferramentas de atendimento das de gestão/backoffice para melhor organização do fluxo de trabalho.

#### 🎯 Funcionalidades Implementadas:

1. **Nova Estrutura da Sidebar**
   - Arquivo: `src/components/Sidebar.tsx`
   - Separação em duas seções distintas: **Atendimento** e **Gestão**
   - Mantido apenas o botão "Iniciar Nova Consulta" (sem adicionar Modo Consulta)
   - Renomeação: "Comunicação" → "CRM"

2. **Novo Módulo Contábil**
   - Arquivo: `src/pages/ContabilPage.tsx`
   - Dashboard com DAS, documentos pendentes e calendário de obrigações
   - Integração com roteamento em `App.tsx`

3. **Organização por Contexto de Uso:**
   - **👩‍⚕️ Atendimento:** Início, Agenda, Pacientes, Orçamentos
   - **⚙️ Gestão:** Financeiro, Estoque, CRM, Relatórios, Contábil

### ✅ Implementação de Sugestões Contextuais por Módulo

**Data:** 16/01/2025  
**Objetivo:** Implementar sugestões de queries contextuais específicas para cada módulo, seguindo as diretrizes do PRD.

#### 🎯 Funcionalidades Implementadas:

1. **Sistema Centralizado de Sugestões**
   - Arquivo: `src/data/contextualSuggestions.ts`
   - Sugestões específicas para cada módulo/página
   - Priorização automática (alta, média, baixa)
   - Categorização por tipo (ação, pergunta, análise)

2. **ChatOverlay Aprimorado**
   - Arquivo: `src/components/ChatOverlay.tsx`
   - Exibição de sugestões contextuais acima da barra de chat
   - Ícones e cores diferenciadas por categoria
   - Integração com sistema de prioridades

3. **Páginas Completas Implementadas:**
   - `PacientesPage.tsx` - Gestão de pacientes com dados mockados
   - `FinanceiroPage.tsx` - Dashboard financeiro com métricas
   - `EstoquePage.tsx` - Controle de estoque com alertas
   - `ComunicacaoPage.tsx` - CRM e automação de mensagens
   - `RelatoriosPage.tsx` - Análises e insights

### ✅ Implementação de Animações Leves para Novas Mensagens

**Data:** 16/01/2025  
**Objetivo:** Adicionar feedback visual suave para novas mensagens no chat, melhorando a experiência do usuário com animações leves.

#### 🎯 Funcionalidades Implementadas:

1. **Animação Fade-in + Slide-up**
   - Arquivos: `src/components/ChatOverlay.tsx`, `src/components/AIChatPanel.tsx`, `src/index.css`
   - Animação sutil de 0.4s com easing suave (`ease-out`)
   - Movimento vertical de 12px para cima com fade-in simultâneo
   - Aplicada tanto para mensagens do usuário quanto do assistente

2. **Sistema de Controle de Animação**
   - Estado `newMessageIds` para rastrear mensagens recém-criadas
   - `useEffect` com timer de 600ms para remover classes de animação
   - Propriedade `isNew` adicionada ao tipo `Message`
   - Animação ativada apenas para mensagens novas

3. **Implementação CSS Customizada**
   - Keyframes `fade-slide-up` com transformações suaves
   - Classe utilitária `.animate-fade-slide-up` para aplicação
   - Integração com Tailwind CSS mantendo performance

4. **Experiência do Usuário:**
   - **Feedback imediato:** Usuário vê sua mensagem aparecer suavemente
   - **Resposta da IA:** Animação indica quando nova resposta chega
   - **Não-intrusivo:** Animação leve que não distrai da leitura
   - **Consistência:** Mesmo comportamento em ambos os modos de chat (overlay e panel)

#### 🎨 Detalhes Técnicos da Animação:

```css
@keyframes fade-slide-up {
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-slide-up {
  animation: fade-slide-up 0.4s ease-out;
}
```

#### 🔄 Fluxo da Animação:

```
Usuário envia mensagem
    ↓
Mensagem criada com isNew: true
    ↓
newMessageIds atualizado com ID da mensagem
    ↓
Classe 'animate-fade-slide-up' aplicada
    ↓
Animação executa por 400ms
    ↓
Após 600ms, useEffect limpa newMessageIds
    ↓
Classe de animação removida
```

### ✅ Sistema de Chat Conversacional na HomePage

**Data:** 16/01/2025  
**Objetivo:** Implementar sistema de conversação com overlay flutuante e blur na página inicial, mantendo conteúdo fixo e experiência similar ao ChatOverlay.

#### 🎯 Funcionalidades Implementadas:

1. **Sistema de Conversação com Overlay**
   - Arquivo: `src/pages/HomePage.tsx`
   - Estados de chat: `suggestions` (padrão) e `conversation`
   - Overlay flutuante com backdrop blur quando em conversação
   - Conteúdo da página permanece fixo (não é empurrado para baixo)

### ✅ Contagem de Tempo Dinâmica nos Cards de Status

**Data:** 16/01/2025  
**Objetivo:** Implementar contagem de tempo real nos cards de pacientes para melhorar o acompanhamento do fluxo de atendimento.

#### 🎯 Funcionalidades Implementadas:

1. **Tempo Dinâmico para Check-in Realizado**
   - Arquivo: `src/pages/HomePage.tsx`
   - Para pacientes na clínica com check-in realizado: mostra tempo decorrido desde a chegada
   - Função `calcularTempoDesdeCheckIn()` calcula minutos desde o check-in
   - Formato: "15 min na clínica", "1 min na clínica", "chegou agora"

2. **Tempo Dinâmico para Consultas em Andamento**
   - Para consultas no consultório: mostra tempo decorrido desde início da consulta
   - Função `calcularTempoDesdeInicioConsulta()` calcula minutos desde o início
   - Formato: "45 min em andamento", "1 min em andamento", "iniciando"

3. **Sistema de Atualização Automática**
   - `useEffect` com intervalo de 30 segundos para atualização dos tempos
   - Estados tipados com interfaces `PacienteNaClinica` e `ConsultaNoConsultorio`
   - Propriedades adicionadas: `checkInTime` e `consultaIniciada` (Date | null)

4. **Integração com Check-in**
   - Função `handleCheckIn()` atualizada para registrar timestamp do check-in
   - Timestamp automático quando paciente faz check-in
   - Transição automática de tempo estático para dinâmico

#### 🔄 Fluxo do Sistema:

```
Paciente na clínica (sem check-in)
    ↓
Exibe tempo estático (ex: "5 min")
    ↓
Usuário clica "Check-in"
    ↓
checkInTime = new Date()
    ↓
Exibe tempo dinâmico: calcularTempoDesdeCheckIn()
    ↓
Atualização automática a cada 30s
```

#### 📊 Benefícios Implementados:

- **Monitoramento real:** Acompanhamento preciso do tempo de espera
- **Gestão de fluxo:** Identificação de gargalos no atendimento
- **Experiência do paciente:** Controle visual do tempo de permanência
- **Automação:** Sem necessidade de input manual de tempos

2. **Animações de Mensagens**
   - Mesma animação `fade-slide-up` dos outros componentes
   - Controle de animação com `newMessageIds` e `useEffect`
   - Animação aplicada tanto para mensagens do usuário quanto da IA
   - Duração de 400ms with cleanup automático após 600ms

3. **Interface com Overlay e Blur**
   - **Modo Sugestões:** Pills de ações e perguntas (estado padrão)
   - **Modo Conversa:** Overlay flutuante centralizado na tela
   - **Backdrop:** Escuro com blur (`bg-black bg-opacity-20 backdrop-blur-sm`)
   - **Mensagens:** Semi-transparentes com blur (`bg-white/95 backdrop-blur-sm`)

4. **Compatibilidade com Modais Generativos**
   - Detecção de palavras-chave (`agendar`, `cadastrar paciente`)
   - Prioridade para modais generativos sobre sistema de chat
   - Mantém funcionalidade existente intacta

5. **Experiência do Usuário:**
   - **Overlay centralizado:** 600px de largura, 70vh de altura máxima
   - **Header flutuante:** Título da conversa + botão fechar
   - **Mensagens do usuário:** Estilo indigo semi-transparente, alinhadas à direita
   - **Mensagens da IA:** Estilo branco semi-transparente, alinhadas à esquerda
   - **Action cards:** Botões clicáveis em mensagens da IA
   - **Click-to-close:** Clique no backdrop para fechar conversa

#### 🎨 Layout do Overlay com Backdrop:

```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ← Backdrop escuro + blur
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░┌─────────────────┐░░░░░
░░░░░░░░░░░░░░░░░│ Mensagem user   │░░░░░
░░░░░░░░░░░░░░░░░└─────────────────┘░░░░░
░░░░░░░┌─────────────────────────┐░░░░░░░
░░░░░░░│ Resposta da IA          │░░░░░░░
░░░░░░░│ [📊 Action] [👥 Card]   │░░░░░░░
░░░░░░░└─────────────────────────┘░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

#### 🔄 Fluxo de Interação na HomePage:

```
Estado inicial: Modo 'suggestions' com pills visíveis
    ↓
Usuário digita mensagem
    ↓
Se mensagem = "agendar*" → Modal Generativo de Agendamento
Se mensagem = "cadastrar paciente*" → Modal Generativo de Paciente
Senão → Overlay de Chat Conversacional
    ↓
Backdrop blur aparece + overlay centralizado
    ↓
Mensagem do usuário aparece com animação
    ↓
Após 1s: Resposta da IA com action cards
    ↓
Usuário pode: continuar conversa, clicar backdrop ou [X] para fechar
    ↓
Overlay desaparece + volta ao modo 'suggestions'
```

---

## 🏗️ Estrutura da Sidebar

### Organização por Jornadas de Trabalho

```
┌─────────────────────────────────────┐
│ CAPIM                               │
├─────────────────────────────────────┤
│ [🩺 Iniciar Nova Consulta]          │
├─────────────────────────────────────┤
│ 👩‍⚕️ ATENDIMENTO                     │
│ • Início                            │
│ • Agenda                            │
│ • Pacientes                         │
├─────────────────────────────────────┤
│ ⚙️ GESTÃO                           │
│ • Financeiro                        │
│ • Estoque                           │
│ • CRM                               │
│ • Relatórios                        │
│ • Contábil                          │
└─────────────────────────────────────┘
```

### Benefícios da Nova Organização:

- **Clareza no Fluxo:** Separação entre atividades clínicas e administrativas
- **Redução da Sobrecarga Cognitiva:** Agrupamento lógico por contexto de uso
- **Preparação para IA:** Estrutura alinhada com os agentes definidos no MVP
- **Eficiência Operacional:** Acesso rápido às ferramentas mais usadas em cada contexto

---

## 🗺️ Fluxos Principais

### 1. Fluxo de Chat com Overlay Bubble

```
Estado inicial: Pills de sugestão visíveis
    ↓
Usuário digita mensagem ou clica em sugestão
    ↓
Usuário pressiona Enter ou clica em Send
    ↓
Pills desaparecem + Overlay bubble aparece (fixed position)
    ↓
IA responde após 1s delay + Action cards aparecem
    ↓
Usuário pode: continuar conversa, clicar actions, ou fechar
    ↓
Fechar: click backdrop/X/Limpar → volta ao estado inicial
```

### 2. Fluxo de Sugestões Contextuais

```
Usuário navega para um módulo
    ↓
ChatOverlay detecta rota atual via useLocation
    ↓
getPrioritizedSuggestions() busca sugestões específicas
    ↓
Exibe até 3 sugestões priorizadas acima da barra de chat
    ↓
Usuário clica em sugestão → preenche campo de texto automaticamente
```

### 3. Mapeamento de Sugestões por Módulo

| Módulo | Qtd. Sugestões | Exemplos Principais |
|--------|---------------|-------------------|
| **Agenda** | 5 | "Remarque a consulta de Maria para próxima semana" |
| **Pacientes** | 5 | "Quem não voltou desde abril?" |
| **Financeiro** | 5 | "Conciliar transações bancárias do dia" |
| **Estoque** | 5 | "Repor anestésicos - estoque baixo" |
| **CRM** | 5 | "Enviar WhatsApp para confirmar consultas de amanhã" |
| **Relatórios** | 5 | "Explicar por que o faturamento caiu 15% este mês" |
| **Contábil** | 5 | "Gerar DAS de dezembro e lembrar vencimento" |

### 4. Sistema de Priorização

```typescript
priority: 'alta' | 'media' | 'baixa'
category: 'acao' | 'pergunta' | 'analise'
```

- **Prioridade Alta**: Exibida primeiro, ações críticas do dia
- **Prioridade Média**: Tarefas importantes mas não urgentes  
- **Prioridade Baixa**: Ações de otimização e melhoria

---

## 🎨 UI/UX Patterns

### Código Visual das Categorias:

- **🟢 Ações** (`bg-green-100 text-green-700`) + ícone Zap
- **🔵 Perguntas** (`bg-blue-100 text-blue-700`) + ícone MessageCircle  
- **🟣 Análises** (`bg-purple-100 text-purple-700`) + ícone BarChart3

### Layout do ChatOverlay (Estado Inicial):

```
┌─────────────────────────────────────────────────────┐
│ Sugestões para [Módulo]:                            │
│ [🟢 Ação 1] [🔵 Pergunta 1] [🟣 Análise 1]          │
├─────────────────────────────────────────────────────┤
│ Contexto: [Módulo] │ [Input Field] │ [Send Button]  │
└─────────────────────────────────────────────────────┘
```

### Layout do Overlay com Backdrop (Estado Conversa):

```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ← Backdrop escuro + blur
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░┌─────────────────┐░░░░░
░░░░░░░░░░░░░░░░░│ Mensagem user   │░░░░░
░░░░░░░░░░░░░░░░░└─────────────────┘░░░░░
░░░░░░░┌─────────────────────────┐░░░░░░░
░░░░░░░│ Resposta da IA          │░░░░░░░
░░░░░░░│ [📊 Action] [👥 Card]   │░░░░░░░
░░░░░░░└─────────────────────────┘░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

#### 🔧 Detalhes Técnicos:

- **Z-index hierarchy:** Input/buttons (z-50) > Overlay messages (z-40) > Backdrop (z-40)
- **Positioning:** Container ajustado para área sem sidebar (`left-64 right-0`)
- **Centralização:** Flex justify-center no container principal
- **Padding:** `pt-8` no container para espaçamento superior
- **Responsividade:** Max-height 70vh com scroll automático
- **Click-to-close:** Apenas clique no backdrop (sem botão X)

---

## 🔧 Arquitetura Técnica

### Componentes Modificados:

1. **`ChatOverlay.tsx`**
   - Adicionado import de sugestões contextuais
   - Implementado sistema de priorização visual
   - Integração com useLocation para detecção de contexto

2. **`contextualSuggestions.ts`**
   - Sistema centralizado de sugestões
   - Funções utilitárias para busca e priorização
   - Mapeamento completo por rota

3. **Páginas Implementadas:**
   - Todas as páginas agora têm dados mockados realistas
   - UI consistente com cards de métricas
   - Integração com ChatOverlay

### Dependency Tree:

```
App.tsx
├── Layout.tsx
│   ├── Sidebar.tsx
│   ├── [PageComponents]
│   └── ChatOverlay.tsx
│       └── contextualSuggestions.ts
└── pages/
    ├── HomePage.tsx
    ├── AgendaPage.tsx (já existente)
    ├── PacientesPage.tsx (novo)
    ├── FinanceiroPage.tsx (novo)
    ├── EstoquePage.tsx (novo)
    ├── ComunicacaoPage.tsx (novo)
    └── RelatoriosPage.tsx (novo)
```

---

## 🚀 Como Testar

1. **Executar o projeto:**
   ```bash
   cd projetos/saas_agentico/capim-ai-demo
   npm run dev
   ```

2. **Testar sugestões contextuais:**
   - Navegar para cada módulo (Agenda, Pacientes, Financeiro, etc.)
   - Verificar se as sugestões específicas aparecem no ChatOverlay
   - Clicar nas sugestões para preencher o campo de texto

3. **Verificar priorização:**
   - Sugestões de alta prioridade devem aparecer primeiro
   - Cores e ícones devem estar corretos por categoria

---

## 📝 Próximas Melhorias Sugeridas

1. **Sugestões Dinâmicas:** Basear sugestões no contexto atual da tela (ex: se há paciente selecionado)
2. **Histórico de Sugestões:** Lembrança das sugestões mais utilizadas por usuário
3. **A/B Testing:** Testar diferentes formatos de sugestões
4. **Integração com IA:** Gerar sugestões baseadas em padrões de uso

---

## 🐛 Issues Conhecidos

- ✅ Erro de import do tipo `ContextualSuggestion` - **Resolvido** com type-only import
- ✅ Conflito entre placeholders e componentes reais - **Resolvido** removendo placeholders
- ⚠️ Sugestões ainda não são funcionais (apenas preenchem o campo de texto)

---

## 📊 Métricas de Implementação

- **Linhas de código adicionadas:** ~800 linhas
- **Novos arquivos criados:** 6 (5 páginas + 1 arquivo de dados)
- **Componentes modificados:** 2 (ChatOverlay + App)
- **Tempo de implementação:** ~2 horas
- **Cobertura de módulos:** 100% (todos os 6 módulos implementados)

---

*Documento atualizado automaticamente após cada mudança significativa no sistema.* 