import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CheckCircle, X } from 'lucide-react';

interface SchedulingData {
  patient: string;
  procedure: string;
  date: string;
  time: string;
  isRecurrent: boolean;
  recurrencePattern: string;
}

const AgendaPage: React.FC = () => {
  const location = useLocation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [newScheduling, setNewScheduling] = useState<SchedulingData | null>(null);
  const [events, setEvents] = useState([
    {
      title: 'Consulta Dr. João',
      start: new Date().toISOString().slice(0, 10) + 'T10:00:00',
      end: new Date().toISOString().slice(0, 10) + 'T11:00:00',
      backgroundColor: '#3B82F6',
    },
    {
      title: 'Retorno Maria Silva',
      start: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().slice(0, 10) + 'T14:30:00',
      end: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().slice(0, 10) + 'T15:30:00',
      backgroundColor: '#10B981',
    },
    {
      title: 'Limpeza - Carlos Santos',
      start: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10) + 'T09:00:00',
      end: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10) + 'T10:00:00',
      backgroundColor: '#8B5CF6',
    },
  ]);

  // Converte data DD/MM para YYYY-MM-DD
  const formatDateForCalendar = (dateStr: string): string => {
    if (!dateStr) return new Date().toISOString().slice(0, 10);
    
    // Se já está no formato correto
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return dateStr;
    
    // Se está no formato DD/MM
    if (dateStr.match(/^\d{1,2}\/\d{1,2}$/)) {
      const [day, month] = dateStr.split('/');
      const year = new Date().getFullYear();
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    
    return new Date().toISOString().slice(0, 10);
  };

  // Converte horário 14h30 para 14:30:00
  const formatTimeForCalendar = (timeStr: string): string => {
    if (!timeStr) return '09:00:00';
    
    // Se já está no formato correto
    if (timeStr.match(/^\d{2}:\d{2}:\d{2}$/)) return timeStr;
    
    // Se está no formato HH:MM
    if (timeStr.match(/^\d{1,2}:\d{2}$/)) return timeStr + ':00';
    
    // Se está no formato HHhMM ou HHh
    if (timeStr.includes('h')) {
      const [hours, minutes] = timeStr.replace('h', ':').split(':');
      return `${hours.padStart(2, '0')}:${(minutes || '00').padStart(2, '0')}:00`;
    }
    
    return '09:00:00';
  };

  // Verifica se há dados de agendamento do roteamento
  useEffect(() => {
    if (location.state?.newScheduling && location.state?.showConfirmation) {
      const scheduling = location.state.newScheduling as SchedulingData;
      setNewScheduling(scheduling);
      setShowConfirmation(true);
      
      // Adiciona o novo evento à agenda
      const newEvent = {
        title: `${scheduling.procedure} - ${scheduling.patient}`,
        start: formatDateForCalendar(scheduling.date) + 'T' + formatTimeForCalendar(scheduling.time),
        end: formatDateForCalendar(scheduling.date) + 'T' + formatTimeForCalendar(scheduling.time).replace(/(\d{2}):(\d{2}):(\d{2})/, (_, h, m, s) => {
          const endHour = parseInt(h) + 1;
          return `${endHour.toString().padStart(2, '0')}:${m}:${s}`;
        }),
        backgroundColor: '#10B981',
        borderColor: '#059669',
        extendedProps: {
          isNew: true,
          recurrent: scheduling.isRecurrent,
          recurrencePattern: scheduling.recurrencePattern
        }
      };
      
      setEvents(prev => [...prev, newEvent]);
      
      // Auto-fechar confirmação após 5 segundos
      setTimeout(() => {
        setShowConfirmation(false);
      }, 5000);
    }
  }, [location.state]);

  return (
    <div className="relative">
      {/* Confirmação de Agendamento */}
      {showConfirmation && newScheduling && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-green-800 font-semibold text-lg">Agendamento Confirmado!</h3>
              <div className="text-green-700 mt-2 space-y-1">
                <p><strong>Paciente:</strong> {newScheduling.patient}</p>
                <p><strong>Procedimento:</strong> {newScheduling.procedure}</p>
                <p><strong>Data:</strong> {newScheduling.date}</p>
                <p><strong>Horário:</strong> {newScheduling.time}</p>
                {newScheduling.isRecurrent && (
                  <p><strong>Recorrência:</strong> {newScheduling.recurrencePattern}</p>
                )}
              </div>
              <p className="text-green-600 text-sm mt-2">O evento foi adicionado à sua agenda automaticamente.</p>
            </div>
          </div>
          <button
            onClick={() => setShowConfirmation(false)}
            className="text-green-500 hover:text-green-700 transition-colors"
            title="Fechar confirmação"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          locale="pt-br"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          buttonText={{
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia'
          }}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={events}
          height="auto"
          slotMinTime="07:00:00"
          slotMaxTime="19:00:00"
          allDaySlot={false}
          weekends={true}
          eventClick={(info) => {
            console.log('Evento clicado:', info.event.title);
            if (info.event.extendedProps.isNew) {
              alert(`✨ Novo agendamento!\n${info.event.title}`);
            }
          }}
          select={(info) => {
            console.log('Período selecionado:', info.start, info.end);
          }}
        />
      </div>
    </div>
  );
};

export default AgendaPage; 