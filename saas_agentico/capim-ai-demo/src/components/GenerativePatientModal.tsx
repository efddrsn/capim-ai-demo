import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, MapPin, Calendar, FileText, X, ChevronDown } from 'lucide-react';

interface PatientData {
  name: string;
  phone: string;
  email: string;
  address: string;
  birthDate: string;
  notes: string;
}

interface GenerativePatientModalProps {
  isVisible: boolean;
  chatText: string;
  onChatTextChange: (text: string) => void;
  onClose: () => void;
  onPatientCreated?: (patientData: PatientData) => void;
}

// Dados mock para autocomplete de endereços
const MOCK_NEIGHBORHOODS = [
  'Centro',
  'Copacabana',
  'Ipanema',
  'Leblon',
  'Barra da Tijuca',
  'Tijuca',
  'Vila Madalena',
  'Pinheiros',
  'Moema',
  'Jardim Paulista'
];

const GenerativePatientModal: React.FC<GenerativePatientModalProps> = ({
  isVisible,
  chatText,
  onChatTextChange,
  onClose,
  onPatientCreated,
}) => {
  // Estados para animação
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const [patientData, setPatientData] = useState<PatientData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    birthDate: '',
    notes: '',
  });

  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [filteredNeighborhoods, setFilteredNeighborhoods] = useState(MOCK_NEIGHBORHOODS);

  // Detecta padrões de texto e extrai dados
  const parseTextToData = (text: string): Partial<PatientData> => {
    const data: Partial<PatientData> = {};

    // Extrai nome do paciente (palavras após "cadastrar paciente")
    const nameMatch = text.match(/cadastrar\s+paciente\s+([^,]+?)(?:\s+fone|\s+telefone|\s+email|\s+endereço|\s+nascido|\s+obs|$)/i);
    if (nameMatch) {
      data.name = nameMatch[1].trim();
    }

    // Extrai telefone (vários formatos)
    const phoneMatch = text.match(/(?:fone|telefone)\s*:?\s*([0-9\s()\-+]+)/i);
    if (phoneMatch) {
      data.phone = phoneMatch[1].trim();
    }

    // Extrai email
    const emailMatch = text.match(/email\s*:?\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
    if (emailMatch) {
      data.email = emailMatch[1].trim();
    }

    // Extrai endereço
    const addressMatch = text.match(/(?:endereço|endereco|mora|reside)\s*:?\s*([^,]+?)(?:\s+email|\s+nascido|\s+obs|$)/i);
    if (addressMatch) {
      data.address = addressMatch[1].trim();
    }

    // Extrai data de nascimento
    const birthMatch = text.match(/(?:nascido|nascimento|nasc)\s*:?\s*(\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}\/\d{1,2})/i);
    if (birthMatch) {
      data.birthDate = birthMatch[1].trim();
    }

    // Extrai observações
    const notesMatch = text.match(/(?:obs|observação|observacao|nota)\s*:?\s*(.+)$/i);
    if (notesMatch) {
      data.notes = notesMatch[1].trim();
    }

    return data;
  };

  // Gera texto template completo ou a partir dos dados
  const generateTextFromData = (data: PatientData): string => {
    // Se todos os campos estão vazios, mostra template
    if (!data.name && !data.phone && !data.email && !data.address && !data.birthDate) {
      return 'Cadastrar paciente [nome] fone [telefone] email [email] endereço [endereço]';
    }

    let text = 'Cadastrar paciente';
    
    if (data.name) {
      text += ` ${data.name}`;
    } else {
      text += ` [nome]`;
    }
    
    if (data.phone) {
      text += ` fone ${data.phone}`;
    } else {
      text += ` fone [telefone]`;
    }
    
    if (data.email) {
      text += ` email ${data.email}`;
    } else {
      text += ` email [email]`;
    }
    
    if (data.address) {
      text += ` endereço ${data.address}`;
    } else {
      text += ` endereço [endereço]`;
    }
    
    if (data.birthDate) {
      text += ` nascido ${data.birthDate}`;
    }
    
    if (data.notes) {
      text += ` obs ${data.notes}`;
    }
    
    return text;
  };

  // Atualiza dados quando o texto do chat muda
  useEffect(() => {
    if (chatText && chatText.toLowerCase().startsWith('cadastrar paciente')) {
      const parsedData = parseTextToData(chatText);
      setPatientData(prev => ({
        ...prev,
        ...parsedData,
      }));
    }
  }, [chatText]);

  // Atualiza o texto do chat quando os dados do formulário mudam
  const handleDataChange = (field: keyof PatientData, value: string) => {
    const newData = { ...patientData, [field]: value };
    setPatientData(newData);
    
    // Gera novo texto e atualiza o chat
    const newText = generateTextFromData(newData);
    onChatTextChange(newText);
  };

  // Filtrar endereços/bairros
  const handleAddressSearch = (value: string) => {
    const filtered = MOCK_NEIGHBORHOODS.filter(neighborhood => 
      neighborhood.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredNeighborhoods(filtered);
    handleDataChange('address', value);
  };

  // Formatar data para input date
  const formatDateForInput = (dateStr: string): string => {
    if (!dateStr) return '';
    
    // Se já está no formato YYYY-MM-DD, retorna como está
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return dateStr;
    
    // Se está no formato DD/MM/YYYY
    if (dateStr.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    
    // Se está no formato DD/MM (assume ano atual)
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
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = () => {
    console.log('Paciente criado:', patientData);
    onClose();
    if (onPatientCreated) {
      onPatientCreated(patientData);
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
    if (isVisible && chatText === 'cadastrar paciente') {
      const templateText = generateTextFromData(patientData);
      onChatTextChange(templateText);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-60 transition-all duration-300 ease-out ${
      isAnimating 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-4'
    }`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Cadastrar Novo Paciente
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
          {/* Nome Completo */}
          <div className="md:col-span-2">
            <label htmlFor="patient-name" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <User className="w-4 h-4" />
              Nome Completo
            </label>
            <input
              id="patient-name"
              type="text"
              value={patientData.name}
              onChange={(e) => handleDataChange('name', e.target.value)}
              placeholder="Nome completo do paciente"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Telefone */}
          <div>
            <label htmlFor="patient-phone" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Phone className="w-4 h-4" />
              Telefone
            </label>
            <input
              id="patient-phone"
              type="tel"
              value={patientData.phone}
              onChange={(e) => handleDataChange('phone', e.target.value)}
              placeholder="(11) 99999-9999"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="patient-email" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <input
              id="patient-email"
              type="email"
              value={patientData.email}
              onChange={(e) => handleDataChange('email', e.target.value)}
              placeholder="email@exemplo.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Endereço - Autocomplete */}
          <div className="relative">
            <label htmlFor="patient-address" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Endereço
            </label>
            <div className="relative">
              <input
                id="patient-address"
                type="text"
                value={patientData.address}
                onChange={(e) => handleAddressSearch(e.target.value)}
                onFocus={() => setShowAddressDropdown(true)}
                onBlur={() => setTimeout(() => setShowAddressDropdown(false), 200)}
                placeholder="Rua, número, bairro"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              
              {showAddressDropdown && filteredNeighborhoods.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto z-70">
                  {filteredNeighborhoods.map((neighborhood, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleDataChange('address', `${patientData.address.split(',')[0] || ''}, ${neighborhood}`.trim().replace(/^,/, ''));
                        setShowAddressDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm border-b border-gray-100 last:border-b-0"
                    >
                      {neighborhood}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Data de Nascimento */}
          <div>
            <label htmlFor="patient-birth" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Data de Nascimento
            </label>
            <input
              id="patient-birth"
              type="date"
              value={formatDateForInput(patientData.birthDate)}
              onChange={(e) => handleDataChange('birthDate', formatDateFromInput(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              title="Selecione a data de nascimento"
            />
          </div>

          {/* Observações */}
          <div className="md:col-span-2">
            <label htmlFor="patient-notes" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <FileText className="w-4 h-4" />
              Observações
            </label>
            <textarea
              id="patient-notes"
              value={patientData.notes}
              onChange={(e) => handleDataChange('notes', e.target.value)}
              placeholder="Observações médicas, alergias, etc."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
            />
          </div>
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
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Cadastrar Paciente
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerativePatientModal; 