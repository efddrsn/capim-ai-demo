import React from 'react';
import { Search, X } from 'lucide-react';

interface MobileSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
}

const MobileSearchInput: React.FC<MobileSearchInputProps> = ({
  value,
  onChange,
  placeholder = "Pesquisar...",
  onClear,
  className = ""
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 lg:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-base lg:text-sm bg-white"
          style={{ fontSize: '16px' }} // Prevent zoom on iOS
        />
        {value && (
          <button
            onClick={() => {
              onChange('');
              if (onClear) onClear();
            }}
            className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 touch-manipulation"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileSearchInput;