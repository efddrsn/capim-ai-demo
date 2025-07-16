import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const AgendaPage: React.FC = () => {
  const appointments = [
    { id: 1, time: '09:00', patient: 'Maria Silva', procedure: 'Limpeza', doctor: 'Dr. João' },
    { id: 2, time: '10:30', patient: 'Pedro Santos', procedure: 'Canal', doctor: 'Dr. João' },
    { id: 3, time: '14:00', patient: 'Ana Costa', procedure: 'Ortodontia', doctor: 'Dra. Maria' },
    { id: 4, time: '15:30', patient: 'Carlos Lima', procedure: 'Extração', doctor: 'Dr. João' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Nova Consulta
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <Calendar className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Hoje - {new Date().toLocaleDateString('pt-BR')}</h2>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{appointment.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{appointment.patient}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {appointment.procedure}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {appointment.doctor}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaPage;