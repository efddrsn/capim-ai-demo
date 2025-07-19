import React from 'react';
import { X, Users, MessageSquare } from 'lucide-react';

interface ActionSuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActionSelect: (action: string) => void;
  title: string;
}

const ActionSuggestionsModal: React.FC<ActionSuggestionsModalProps> = ({ 
  isOpen, 
  onClose, 
  onActionSelect,
  title 
}) => {
  const actions = [
    {
      id: 'engagement',
      title: 'Criar campanha de engajamento',
      description: 'Envie mensagens personalizadas para reativar pacientes',
      icon: MessageSquare,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'patient-list',
      title: 'Criar lista de pacientes',
      description: 'Gere uma lista interativa para análise e ações específicas',
      icon: Users,
      color: 'bg-green-600 hover:bg-green-700'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Ações Sugeridas</h2>
            <p className="text-sm text-gray-600 mt-1">{title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Actions */}
        <div className="p-6 space-y-4">
          {actions.map((action) => {
            const IconComponent = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onActionSelect(action.id)}
                className={`w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all group ${action.color.replace('bg-', 'hover:bg-').replace('hover:bg-', 'hover:border-')}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${action.color} text-white group-hover:scale-105 transition-transform`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionSuggestionsModal;