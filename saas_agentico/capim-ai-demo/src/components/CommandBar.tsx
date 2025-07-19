import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Command } from 'cmdk';
import { 
  Search, 
  User, 
  Plus, 
  Navigation, 
  Settings,
  Calendar,
  Users,
  FileText,
  DollarSign,
  Package,
  ChevronRight
} from 'lucide-react';
import { searchPatients, getCommandActions, Patient, CommandAction } from '../data/mockData';

interface CommandBarProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CommandBar: React.FC<CommandBarProps> = ({ isOpen, onOpenChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputValue, setInputValue] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Debounce para busca de pacientes
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (isNameQuery(query)) {
        const results = searchPatients(query);
        setPatients(results);
      } else {
        setPatients([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  // Detecta se a query é um nome (contém apenas letras, espaços e acentos)
  const isNameQuery = (query: string): boolean => {
    return /^[a-záàâãéèêíïóôõöúçñü\s]+$/i.test(query) && query.length >= 2;
  };

  // Pega as ações disponíveis
  const actions = getCommandActions(navigate);

  // Função para navegar para o perfil do paciente
  const openPatientRecord = (patientId: string) => {
    // Por enquanto, navega para a página de pacientes
    // No futuro, pode abrir um modal específico do paciente
    navigate(`/pacientes?patient=${patientId}`);
    onOpenChange(false);
  };

  // Função para executar ação
  const executeAction = (action: CommandAction) => {
    action.action();
    onOpenChange(false);
  };

  // Ícones por grupo
  const getGroupIcon = (group: string) => {
    switch (group) {
      case 'Criar':
        return <Plus className="w-4 h-4" />;
      case 'Navegar':
        return <Navigation className="w-4 h-4" />;
      case 'Buscar':
        return <Search className="w-4 h-4" />;
      case 'Configurar':
        return <Settings className="w-4 h-4" />;
      default:
        return <ChevronRight className="w-4 h-4" />;
    }
  };

  // Ícones específicos para ações
  const getActionIcon = (actionId: string) => {
    if (actionId.includes('agenda')) return <Calendar className="w-4 h-4" />;
    if (actionId.includes('paciente')) return <Users className="w-4 h-4" />;
    if (actionId.includes('orcamento')) return <FileText className="w-4 h-4" />;
    if (actionId.includes('financeiro')) return <DollarSign className="w-4 h-4" />;
    if (actionId.includes('estoque')) return <Package className="w-4 h-4" />;
    return <ChevronRight className="w-4 h-4" />;
  };

  // Reset ao fechar
  useEffect(() => {
    if (!isOpen) {
      setInputValue('');
      setPatients([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard shortcuts internos do command bar
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC para fechar
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
      
      // Tab para preencher com a primeira sugestão
      if (e.key === 'Tab' && patients.length > 0) {
        e.preventDefault();
        const firstPatient = patients[0];
        setInputValue(firstPatient.name);
        setPatients([]);
      }
      
      // Enter para executar primeira ação
      if (e.key === 'Enter' && patients.length > 0) {
        e.preventDefault();
        const firstPatient = patients[0];
        openPatientRecord(firstPatient.id);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, patients, onOpenChange]);

  if (!isOpen) return null;

  return (
    <Command.Dialog 
      open={isOpen} 
      onOpenChange={onOpenChange}
      className="fixed inset-0 z-50"
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Command Palette */}
      <div className="fixed top-[15vh] left-1/2 -translate-x-1/2 w-full max-w-2xl mx-auto">
        <Command className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center border-b border-gray-200 px-4">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <Command.Input
              value={inputValue}
              onValueChange={setInputValue}
              placeholder="Digite um nome de paciente ou comando..."
              className="flex-1 py-4 text-lg bg-transparent border-0 outline-none placeholder-gray-400"
            />
            <div className="text-xs text-gray-400 ml-3">
              <kbd className="px-2 py-1 bg-gray-100 rounded">Tab</kbd> para preencher
            </div>
          </div>

          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-gray-500">
              Nenhum resultado encontrado.
            </Command.Empty>

            {/* Resultados de Pacientes */}
            {patients.length > 0 && (
              <Command.Group heading="Pacientes">
                {patients.map((patient, index) => (
                  <Command.Item
                    key={patient.id}
                    value={`patient-${patient.id}`}
                    onSelect={() => openPatientRecord(patient.id)}
                    className="flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer text-sm
                             data-[selected=true]:bg-blue-50 data-[selected=true]:text-blue-900
                             hover:bg-gray-50 transition-colors"
                  >
                    <User className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <div className="font-medium">{patient.name}</div>
                      {patient.email && (
                        <div className="text-xs text-gray-500">{patient.email}</div>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      {index === 0 && (
                        <>
                          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">↵</kbd>
                          abrir
                        </>
                      )}
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {/* Ações por Grupo */}
            {['Criar', 'Navegar', 'Buscar', 'Configurar'].map(group => {
              const groupActions = actions.filter(action => action.group === group);
              
              if (groupActions.length === 0) return null;
              
              return (
                <Command.Group key={group} heading={group}>
                  {groupActions.map(action => (
                    <Command.Item
                      key={action.id}
                      value={action.name}
                      onSelect={() => executeAction(action)}
                      keywords={action.keywords}
                      className="flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer text-sm
                               data-[selected=true]:bg-blue-50 data-[selected=true]:text-blue-900
                               hover:bg-gray-50 transition-colors"
                    >
                      {getActionIcon(action.id)}
                      <div className="flex-1">
                        <div className="font-medium">{action.name}</div>
                        {action.description && (
                          <div className="text-xs text-gray-500">{action.description}</div>
                        )}
                      </div>
                      {action.shortcut && (
                        <div className="text-xs text-gray-400">
                          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">
                            {action.shortcut}
                          </kbd>
                        </div>
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>
              );
            })}
          </Command.List>
        </Command>
      </div>
    </Command.Dialog>
  );
};

// Utility function for debouncing
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default CommandBar;