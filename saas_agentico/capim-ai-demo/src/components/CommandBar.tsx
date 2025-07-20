import React, { useEffect, useMemo } from 'react';
import { Command } from 'cmdk';
import { Search, User, Plus, ArrowRight, Settings, Clock } from 'lucide-react';
import { useCommandBar } from '../hooks/useCommandBar';

interface CommandBarProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CommandBar: React.FC<CommandBarProps> = ({ isOpen, onOpenChange }) => {
  const { value, setValue, searchResults, actions, isLoading, handleSelect } = useCommandBar();

  // Filtrar pills baseado no texto digitado
  const filteredPills = useMemo(() => {
    if (!value.trim()) {
      // Quando não há texto, mostrar todas as ações
      return actions;
    }

    const query = value.toLowerCase();
    
    // Combinar pacientes e ações em um array unificado para filtragem
    const allItems = [
      ...searchResults.map(patient => ({
        id: `patient-${patient.id}`,
        name: patient.name,
        description: `Paciente • ${patient.phone}`,
        group: 'Pacientes',
        icon: User,
        keywords: [patient.name.toLowerCase(), patient.phone],
      })),
      ...actions.map(action => ({
        id: action.id,
        name: action.name,
        description: action.description,
        group: action.group,
        icon: getActionIcon(action.group),
        keywords: [action.name.toLowerCase(), ...(action.keywords || [])],
      }))
    ];

    // Filtrar baseado no texto digitado
    return allItems.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.keywords.some(keyword => keyword?.includes(query))
    );
  }, [value, searchResults, actions]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onOpenChange(false);
      setValue('');
    }
  };

  const onSelect = (selectedValue: string) => {
    handleSelect(selectedValue);
    onOpenChange(false);
    setValue('');
  };

  // Resetar quando fechar
  useEffect(() => {
    if (!isOpen) {
      setValue('');
    }
  }, [isOpen, setValue]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Command Bar */}
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl border border-gray-200">
        <Command onKeyDown={handleKeyDown} shouldFilter={false}>
          {/* Search Input */}
          <div className="flex items-center border-b border-gray-200 px-4">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <Command.Input
              value={value}
              onValueChange={setValue}
              placeholder="Digite para buscar pacientes ou ações..."
              className="flex-1 py-4 text-lg bg-transparent border-none outline-none placeholder:text-gray-400"
              autoFocus
            />
            {isLoading && (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mr-2" />
            )}
          </div>

          {/* Pills Container - Horizontal Scroll */}
          <div className="p-4 max-h-96 overflow-y-auto">
            {filteredPills.length > 0 ? (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {filteredPills.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelect(item.id)}
                      className="flex-shrink-0 min-w-[200px] max-w-[250px] p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors">
                          {Icon && <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate group-hover:text-blue-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 truncate mt-1">
                            {item.description}
                          </p>
                          <span className="inline-block px-2 py-1 mt-2 text-xs bg-gray-100 text-gray-600 rounded-full">
                            {item.group}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100" />
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : value.trim() ? (
              <div className="text-center py-8 text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
                <p>Nenhum resultado encontrado para "{value}"</p>
                <p className="text-sm mt-1">Tente outro termo ou verifique a ortografia</p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
                <p>Digite para buscar pacientes ou ações</p>
                <p className="text-sm mt-1">Use Ctrl/Cmd + K para abrir rapidamente</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 rounded-b-lg">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <div className="flex gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">↵</kbd>
                  para selecionar
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">Esc</kbd>
                  para fechar
                </span>
              </div>
              <span>{filteredPills.length} resultado(s)</span>
            </div>
          </div>
        </Command>
      </div>
    </div>
  );
};

// Helper para ícones baseado no grupo
const getActionIcon = (group: string): React.ComponentType<any> => {
  switch (group) {
    case 'Criar':
      return Plus;
    case 'Navegar':
      return ArrowRight;
    case 'Buscar':
      return Search;
    case 'Configurar':
      return Settings;
    case 'Pacientes':
      return User;
    default:
      return Clock;
  }
};

export default CommandBar;