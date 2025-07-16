import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

type Message = {
  id: string;
  type: 'user' | 'assistant';
  text: string;
};

const AIChatPanel: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const location = useLocation();

  const getContextLabel = () => {
    const pathMap: { [key: string]: string } = {
      '/': 'Home',
      '/agenda': 'Agenda',
      '/pacientes': 'Pacientes', 
      '/financeiro': 'Financeiro',
      '/estoque': 'Estoque',
      '/comunicacao': 'Comunicação',
      '/relatorios': 'Relatórios',
    };
    
    const context = pathMap[location.pathname];
    return context ? context : 'CAPIM';
  };

  const handleSend = () => {
    if (message.trim()) {
      const userMsg: Message = {
        id: Date.now().toString(),
        type: 'user',
        text: message.trim()
      };
      
      setMessages(prev => [...prev, userMsg]);
      setMessage('');
      
      // Simular resposta da IA
      setTimeout(() => {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          text: 'Entendi sua solicitação. Como posso ajudar?'
        };
        setMessages(prev => [...prev, aiMsg]);
      }, 1000);
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-800">IA Assistant</h3>
          <p className="text-xs text-gray-500">Contexto: {getContextLabel()}</p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={handleClear}
            title="Limpar conversa"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 text-sm">
            Olá! Como posso ajudar você hoje?
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`${msg.type === 'user' ? 'ml-4' : 'mr-4'}`}>
                <div className={`p-3 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-purple-100 text-purple-800 ml-auto max-w-[80%]'
                    : 'bg-gray-100 text-gray-800 max-w-[90%]'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite sua pergunta..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
          <button
            onClick={handleSend}
            title="Enviar mensagem"
            className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatPanel;