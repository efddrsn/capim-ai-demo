import React from 'react';
import { Users, UserPlus, Search, Phone } from 'lucide-react';

const PacientesPage: React.FC = () => {
  // Dados de exemplo para pacientes
  const pacientes = [
    {
      id: 1,
      nome: "Maria Silva",
      telefone: "(11) 98765-4321",
      email: "maria.silva@email.com",
      ultimaConsulta: "15/12/2024",
      status: "ativo",
      proximaConsulta: "22/01/2025"
    },
    {
      id: 2,
      nome: "João Santos",
      telefone: "(11) 99876-5432",
      email: "joao.santos@email.com",
      ultimaConsulta: "28/08/2024",
      status: "inativo",
      proximaConsulta: null
    },
    {
      id: 3,
      nome: "Ana Costa",
      telefone: "(11) 95555-1234",
      email: "ana.costa@email.com",
      ultimaConsulta: "10/12/2024",
      status: "ativo",
      proximaConsulta: "18/01/2025"
    },
    {
      id: 4,
      nome: "Pedro Lima",
      telefone: "(11) 94444-5678",
      email: "pedro.lima@email.com",
      ultimaConsulta: "05/11/2024",
      status: "ativo",
      proximaConsulta: null
    }
  ];

  const pacientesAtivos = pacientes.filter(p => p.status === 'ativo').length;
  const pacientesInativos = pacientes.filter(p => p.status === 'inativo').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <UserPlus className="w-4 h-4" />
          Novo Paciente
        </button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de Pacientes</p>
              <p className="text-2xl font-bold text-gray-800">{pacientes.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pacientes Ativos</p>
              <p className="text-2xl font-bold text-green-600">{pacientesAtivos}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pacientes Inativos</p>
              <p className="text-2xl font-bold text-orange-600">{pacientesInativos}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Busca */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar paciente por nome, telefone ou email..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Filtros
          </button>
        </div>
      </div>

      {/* Lista de Pacientes */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Lista de Pacientes</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {pacientes.map((paciente) => (
            <div key={paciente.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {paciente.nome.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{paciente.nome}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {paciente.telefone}
                        </span>
                        <span>{paciente.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      paciente.status === 'ativo' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {paciente.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Última: {paciente.ultimaConsulta}</p>
                    {paciente.proximaConsulta && (
                      <p className="text-blue-600">Próxima: {paciente.proximaConsulta}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PacientesPage; 