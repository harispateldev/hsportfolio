import React from 'react';

interface HsSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
  className?: string;
}

const HsSwitch: React.FC<HsSwitchProps> = ({ 
  checked, 
  onChange, 
  iconOn, 
  iconOff,
  className = ''
}) => {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${
        checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
      } ${className}`}
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ease-in-out flex items-center justify-center ${
          checked ? 'translate-x-7' : 'translate-x-1'
        }`}
      >
        {checked ? iconOn : iconOff}
      </span>
    </button>
  );
};

export default HsSwitch;
