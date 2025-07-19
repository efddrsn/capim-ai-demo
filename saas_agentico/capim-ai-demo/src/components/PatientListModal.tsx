import React, { useState } from 'react';
import { X, Download, Users, Check } from 'lucide-react';

interface Patient {
  id: number;
  name: string;
  lastVisit: string;
  phone: string;
  email: string;
}

interface PatientListModalProps {
  isOpen: boolean;
  onClose: () => void;
  patients: Patient[];
}

const PatientListModal: React.FC<PatientListModalProps> = ({ isOpen, onClose, patients }) => {
  const [selectedPatients, setSelectedPatients] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handlePatientToggle = (patientId: number) => {
    setSelectedPatients(prev => 
      prev.includes(patientId) 
        ? prev.filter(id => id !== patientId)
        : [...prev, patientId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPatients([]);
    } else {
      setSelectedPatients(patients.map(p => p.id));
    }
    setSelectAll(!selectAll);
  };

  const handleDownload = () => {
    const selectedData = patients.filter(p => selectedPatients.includes(p.id));
    const csvContent = [
      'Nome,Última Visita,Telefone,Email',
      ...selectedData.map(p => `${p.name},${p.lastVisit},${p.phone},${p.email}`)
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pacientes_inativos.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCreateCampaign = () => {
    console.log('Criando campanha para pacientes:', selectedPatients);
    // Aqui seria a lógica para criar uma campanha
    alert(`Campanha criada para ${selectedPatients.length} pacientes!`);
  };

  const handleClose = () => {
    setSelectedPatients([]);
    setSelectAll(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Pacientes que não retornaram desde abril</h2>
            <p className="text-sm text-gray-600 mt-1">{patients.length} pacientes encontrados</p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Controls */}
        <div className="p-6 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Selecionar todos ({patients.length})
                </span>
              </label>
              <span className="text-sm text-gray-500">
                {selectedPatients.length} selecionados
              </span>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                disabled={selectedPatients.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="w-4 h-4" />
                Download CSV
              </button>
              <button
                onClick={handleCreateCampaign}
                disabled={selectedPatients.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Users className="w-4 h-4" />
                Criar Campanha
              </button>
            </div>
          </div>
        </div>

        {/* Patient List */}
        <div className="p-6 overflow-y-auto max-h-96">
          <div className="space-y-3">
            {patients.map((patient) => (
              <div key={patient.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedPatients.includes(patient.id)}
                  onChange={() => handlePatientToggle(patient.id)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-600">Última visita: {patient.lastVisit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{patient.phone}</p>
                      <p className="text-sm text-gray-500">{patient.email}</p>
                    </div>
                  </div>
                </div>
                {selectedPatients.includes(patient.id) && (
                  <Check className="w-5 h-5 text-green-600" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-end gap-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientListModal;