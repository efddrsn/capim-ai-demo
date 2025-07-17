import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, FileText, RefreshCw, X, ChevronDown } from 'lucide-react';

interface SchedulingData {
  patient: string;
  procedure: string;
  date: string;
  time: string;
  isRecurrent: boolean;
  recurrencePattern: string;
}

interface GenerativeSchedulingModalProps {
  isVisible: boolean;
  chatText: string;
  onChatTextChange: (text: string) => void;
  onClose: () => void;
  onSchedulingConfirmed?: (schedulingData: SchedulingData) => void;
}

// Dados mock para autocomplete
const MOCK_PATIENTS = [
  'Maria Silva',
  'João Santos',
  'Ana Costa',
  'Pedro Oliveira',
  'Carla Souza',
  'Roberto Lima',
  'Juliana Ferreira',
  'Marcos Pereira'
];

const MOCK_PROCEDURES = [
  'Limpeza',
  'Obturação',
  'Canal',
  'Extração',
  'Ortodontia',
  'Clareamento',
  'Implante',
  'Revisão',
  'Emergência'
];

const RECURRENCE_OPTIONS = [
  { value: '', label: 'Selecione o padrão' },
  { value: 'toda semana', label: 'Toda semana' },
  { value: 'quinzenal', label: 'Quinzenal (a cada 15 dias)' },
  { value: 'todo mês', label: 'Todo mês' },
  { value: 'toda primeira segunda do mês', label: 'Toda primeira segunda do mês' },
  { value: 'toda primeira terça do mês', label: 'Toda primeira terça do mês' },
  { value: 'toda primeira quarta do mês', label: 'Toda primeira quarta do mês' },
  { value: 'toda primeira quinta do mês', label: 'Toda primeira quinta do mês' },
  { value: 'toda primeira sexta do mês', label: 'Toda primeira sexta do mês' },
  { value: 'personalizado', label: 'Personalizado...' }
];

const GenerativeSchedulingModal: React.FC<GenerativeSchedulingModalProps> = ({
  isVisible,
  chatText,
  onChatTextChange,
  onClose,
  onSchedulingConfirmed,
}) => {
  const [schedulingData, setSchedulingData] = useState<SchedulingData>({
    patient: '',
    procedure: '',
    date: '',
    time: '',
    isRecurrent: false,
    recurrencePattern: '',
  });

  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [showProcedureDropdown, setShowProcedureDropdown] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState(MOCK_PATIENTS);
  const [filteredProcedures, setFilteredProcedures] = useState(MOCK_PROCEDURES);

  // Estados para animação
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Detecta padrões de texto e extrai dados
  const parseTextToData = (text: string): Partial<SchedulingData> => {
    const lowerText = text.toLowerCase();
    const data: Partial<SchedulingData> = {};

    // Detecta padrão de recorrência
    const recurrencePatterns = [
      'toda primeira sexta do mês',
      'toda primeira segunda do mês',
      'toda primeira terça do mês',
      'toda primeira quarta do mês',
      'toda primeira quinta do mês',
      'toda segunda feira',
      'toda semana',
      'todo mês',
      'quinzenal',
      'mensal'
    ];

    const hasRecurrence = recurrencePatterns.some(pattern => lowerText.includes(pattern));
    if (hasRecurrence) {
      data.isRecurrent = true;
      const pattern = recurrencePatterns.find(p => lowerText.includes(p));
      data.recurrencePattern = pattern || '';
    }

    // Extrai nome do paciente
    const patientMatch = text.match(/agendar\s+(?:com\s+)?([^,]+?)(?:\s+consulta|\s+procedimento|\s+no\s+dia|\s+para|\s+às?|\s+em)/i);
    if (patientMatch) {
      data.patient = patientMatch[1].trim();
    }

    // Extrai procedimento
    const procedureMatch = text.match(/consulta\s+de\s+([^,]+?)(?:\s+no\s+dia|\s+para|\s+às?|\s+em|$)/i) ||
                          text.match(/procedimento\s+de\s+([^,]+?)(?:\s+no\s+dia|\s+para|\s+às?|\s+em|$)/i);
    if (procedureMatch) {
      data.procedure = procedureMatch[1].trim();
    }

    // Extrai data
    const dateMatch = text.match(/(?:no\s+dia\s+|para\s+)(\d{1,2}\/\d{1,2}(?:\/\d{4})?|\w+\s+feira)/i);
    if (dateMatch) {
      data.date = dateMatch[1].trim();
    }

    // Extrai horário
    const timeMatch = text.match(/às?\s+(\d{1,2}h?\d{0,2}|\d{1,2}:\d{2})/i);
    if (timeMatch) {
      data.time = timeMatch[1].trim();
    }

    return data;
  };

  // Gera texto template completo ou a partir dos dados
  const generateTextFromData = (data: SchedulingData): string => {
    // Se todos os campos estão vazios, mostra template
    if (!data.patient && !data.procedure && !data.date && !data.time && !data.isRecurrent) {
      return 'Agendar com [paciente] consulta de [procedimento] no dia [data] às [horário]';
    }

    let text = 'Agendar';
    
    if (data.patient) {
      text += ` com ${data.patient}`;
    } else {
      text += ` com [paciente]`;
    }
    
    if (data.procedure) {
      text += ` consulta de ${data.procedure}`;
    } else {
      text += ` consulta de [procedimento]`;
    }
    
    if (data.date) {
      text += ` no dia ${data.date}`;
    } else {
      text += ` no dia [data]`;
    }
    
    if (data.time) {
      text += ` às ${data.time}`;
    } else {
      text += ` às [horário]`;
    }
    
    if (data.isRecurrent && data.recurrencePattern) {
      text += ` ${data.recurrencePattern}`;
    }
    
    return text;
  };

  // Atualiza dados quando o texto do chat muda
  useEffect(() => {
    if (chatText && chatText.toLowerCase().startsWith('agendar')) {
      const parsedData = parseTextToData(chatText);
      setSchedulingData(prev => ({
        ...prev,
        ...parsedData,
      }));
    }
  }, [chatText]);

  // Atualiza o texto do chat quando os dados do formulário mudam
  const handleDataChange = (field: keyof SchedulingData, value: string | boolean) => {
    const newData = { ...schedulingData, [field]: value };
    setSchedulingData(newData);
    
    // Gera novo texto e atualiza o chat
    const newText = generateTextFromData(newData);
    onChatTextChange(newText);
  };

  // Filtrar pacientes
  const handlePatientSearch = (value: string) => {
    const filtered = MOCK_PATIENTS.filter(patient => 
      patient.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPatients(filtered);
    handleDataChange('patient', value);
  };

  // Filtrar procedimentos
  const handleProcedureSearch = (value: string) => {
    const filtered = MOCK_PROCEDURES.filter(procedure => 
      procedure.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProcedures(filtered);
    handleDataChange('procedure', value);
  };

  // Formatar data para input date
  const formatDateForInput = (dateStr: string): string => {
    if (!dateStr) return '';
    
    // Se já está no formato YYYY-MM-DD, retorna como está
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return dateStr;
    
    // Se está no formato DD/MM, converte
    if (dateStr.match(/^\d{1,2}\/\d{1,2}$/)) {
      const [day, month] = dateStr.split('/');
      const year = new Date().getFullYear();
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    
    return '';
  };

  // Converter data do input para formato brasileiro
  const formatDateFromInput = (dateStr: string): string => {
    if (!dateStr) return '';
    const [, month, day] = dateStr.split('-');
    return `${day}/${month}`;
  };

  const handleSubmit = () => {
    console.log('Agendamento criado:', schedulingData);
    onClose();
    if (onSchedulingConfirmed) {
      onSchedulingConfirmed(schedulingData);
    }
  };

  // Controle de animação
  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setIsAnimating(false); // Começa invisível
      // Pequeno delay para trigger da animação de entrada
      const timer = setTimeout(() => setIsAnimating(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      // Remove do DOM após animação
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Inicializa template quando modal abre
  useEffect(() => {
    if (isVisible && chatText === 'agendar') {
      const templateText = generateTextFromData(schedulingData);
      onChatTextChange(templateText);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-20 transition-all duration-300 ease-out ${
      isAnimating 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-4'
    }`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Agendar Consulta
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Paciente - Autocomplete */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <User className="w-4 h-4" />
              Paciente
            </label>
            <div className="relative">
              <input
                type="text"
                value={schedulingData.patient}
                onChange={(e) => handlePatientSearch(e.target.value)}
                onFocus={() => setShowPatientDropdown(true)}
                onBlur={() => setTimeout(() => setShowPatientDropdown(false), 200)}
                placeholder="Digite o nome do paciente"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              
              {showPatientDropdown && filteredPatients.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto z-30">
                  {filteredPatients.map((patient, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleDataChange('patient', patient);
                        setShowPatientDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm border-b border-gray-100 last:border-b-0"
                    >
                      {patient}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Procedimento - Autocomplete */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <FileText className="w-4 h-4" />
              Procedimento
            </label>
            <div className="relative">
              <input
                type="text"
                value={schedulingData.procedure}
                onChange={(e) => handleProcedureSearch(e.target.value)}
                onFocus={() => setShowProcedureDropdown(true)}
                onBlur={() => setTimeout(() => setShowProcedureDropdown(false), 200)}
                placeholder="Tipo de consulta"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              
              {showProcedureDropdown && filteredProcedures.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto z-30">
                  {filteredProcedures.map((procedure, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleDataChange('procedure', procedure);
                        setShowProcedureDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm border-b border-gray-100 last:border-b-0"
                    >
                      {procedure}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Data - Date Picker */}
          <div>
            <label htmlFor="date-input" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Data
            </label>
            <input
              id="date-input"
              type="date"
              value={formatDateForInput(schedulingData.date)}
              onChange={(e) => handleDataChange('date', formatDateFromInput(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              title="Selecione a data da consulta"
            />
          </div>

          {/* Horário - Time Picker */}
          <div>
            <label htmlFor="time-input" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Horário
            </label>
            <input
              id="time-input"
              type="time"
              value={schedulingData.time.replace('h', ':').padEnd(5, '0') || ''}
              onChange={(e) => {
                const timeValue = e.target.value.replace(':', 'h');
                handleDataChange('time', timeValue);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              title="Selecione o horário da consulta"
            />
          </div>
        </div>

        {/* Recorrência */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="recurrent"
              checked={schedulingData.isRecurrent}
              onChange={(e) => handleDataChange('isRecurrent', e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="recurrent" className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <RefreshCw className="w-4 h-4" />
              Consulta recorrente
            </label>
          </div>

          {schedulingData.isRecurrent && (
            <div>
              <label htmlFor="recurrence-select" className="sr-only">Padrão de recorrência</label>
              <select
                id="recurrence-select"
                value={schedulingData.recurrencePattern}
                onChange={(e) => handleDataChange('recurrencePattern', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                title="Selecione o padrão de recorrência"
              >
                {RECURRENCE_OPTIONS.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            Confirmar Agendamento
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerativeSchedulingModal; 