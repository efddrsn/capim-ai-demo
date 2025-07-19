import React from 'react';

interface TypingIndicatorProps {
  isVisible: boolean;
  className?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ 
  isVisible, 
  className = "" 
}) => {
  if (!isVisible) return null;

  return (
    <div className={`flex items-center gap-2 px-4 py-2 ${className}`}>
      <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-2">
        <span className="text-xs text-gray-500 mr-2">IA digitando</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-typing-dots"></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-typing-dots"></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-typing-dots"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;