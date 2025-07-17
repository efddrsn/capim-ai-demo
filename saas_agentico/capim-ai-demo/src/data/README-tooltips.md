# Sistema de Tooltips Centralizados

Este arquivo explica como usar e editar os tooltips do demo da plataforma agêntica CAPIM.

## 📁 Estrutura

- **`tooltips.ts`** - Arquivo principal com todos os textos dos tooltips
- **`Tooltip.tsx`** - Componente reutilizável para exibir tooltips
- **Páginas** - Importam e usam os tooltips centralizados

## 🎯 Como Editar Tooltips

### 1. Editar textos existentes
Abra `tooltips.ts` e modifique diretamente o texto:

```typescript
export const tooltips = {
  chatInput: "SEU NOVO TEXTO AQUI",
  // ...
}
```

### 2. Adicionar novos tooltips
Adicione uma nova propriedade no objeto `tooltips`:

```typescript
export const tooltips = {
  // ... tooltips existentes
  meuNovoTooltip: "Explicação do novo elemento",
}
```

### 3. Usar o tooltip em um componente
Importe e use:

```tsx
import { tooltips } from '../data/tooltips';
import Tooltip from '../components/Tooltip';

// No JSX:
<Tooltip text={tooltips.meuNovoTooltip}>
  <button>Meu Botão</button>
</Tooltip>
```

## 📋 Referência de Tooltips Existentes

### Homepage - Chat Principal
- `chatInput` - Campo de entrada do chat principal

### Homepage - Suggestion Pills  
- `acoesSuggestions` - Label "Ações"
- `perguntasSuggestions` - Label "Perguntas"

### Homepage - Jornada de Profissionalização
- `proximosPassos` - Título "Próximos Passos"
- `etapa1Fundacoes` - Título da Etapa 1
- `etapa2Otimizacao` - Título da Etapa 2  
- `etapa3GestaoFinanceira` - Título da Etapa 3

### Action Cards com Princípios Agênticos
- `ativarAgenteAgendamento` - Princípio: Input Flexível
- `cadastrarNovoPaciente` - Princípio: Pré-Preenchimento por Contexto
- `confirmarConsultasDia` - Princípio: Sugestão Proativa
- `configurarReconciliacaoBancaria` - Princípio: Automação Contínua

### Outras Páginas (preparado para expansão)
- `agenda.*` - Tooltips da página de agenda
- `pacientes.*` - Tooltips da página de pacientes  
- `financeiro.*` - Tooltips da página financeiro

## 🎨 Estilo Visual dos Tooltips

Os tooltips aparecem:
- **Posição**: Acima do elemento (bottom-full)
- **Cor**: Fundo escuro (`bg-gray-800`) com texto branco
- **Animação**: Fade in/out suave (300ms)
- **Indicador**: Elementos com tooltip têm borda pontilhada e cursor help

## 💡 Dicas de Boas Práticas

1. **Seja conciso**: Tooltips devem explicar rapidamente o "porquê" 
2. **Use linguagem clara**: Evite jargões técnicos desnecessários
3. **Foque no valor**: Explique o benefício para o usuário
4. **Mantenha consistência**: Use o mesmo tom em todos os tooltips
5. **Teste a legibilidade**: Verifique se o texto cabe bem no tooltip

## 🔧 Troubleshooting

**Tooltip não aparece?**
- Verifique se importou `tooltips` corretamente
- Confirme se a propriedade existe no objeto `tooltips`
- Verifique se o componente `Tooltip` está envolvendo o elemento correto

**Layout quebrado?**
- Use a prop `className` no `Tooltip` para ajustar o layout
- Exemplo: `<Tooltip className="flex-1" text={...}>` 