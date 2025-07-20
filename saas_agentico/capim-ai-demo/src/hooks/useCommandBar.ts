import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchPatients, getCommandActions } from '../data/mockData';
import type { Patient, CommandAction } from '../data/mockData';

export const useCommandBar = () => {
  const [value, setValue] = useState('');
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [actions, setActions] = useState<CommandAction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        setActions([]);
        return;
      }

      setIsLoading(true);
      
      // Simular delay de API
      setTimeout(() => {
        const patients = searchPatients(query);
        const commandActions = getCommandActions(navigate);
        
        setSearchResults(patients);
        setActions(commandActions);
        setIsLoading(false);
      }, 100);
    }, 300),
    [navigate]
  );

  useEffect(() => {
    debouncedSearch(value);
  }, [value, debouncedSearch]);

  const handleSelect = (selectedValue: string) => {
    // Se é um paciente (formato: patient-{id})
    if (selectedValue.startsWith('patient-')) {
      const patientId = selectedValue.replace('patient-', '');
      const patient = searchResults.find(p => p.id === patientId);
      if (patient) {
        navigate(`/pacientes/${patient.id}`);
      }
      return;
    }

    // Se é uma ação
    const action = actions.find(a => a.id === selectedValue);
    if (action) {
      action.action();
    }
  };

  return {
    value,
    setValue,
    searchResults,
    actions,
    isLoading,
    handleSelect,
  };
};

// Função helper para debounce
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), wait);
  };
}