import React from 'react';
import { motion } from 'framer-motion';

interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
  rows = 4,
  maxLength,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {maxLength && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        className={`
          w-full px-3 py-3 rounded-xl border transition-all duration-200
          backdrop-blur-sm bg-white/70 dark:bg-gray-800/70
          border-gray-200 dark:border-gray-700
          focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
          placeholder-gray-400 dark:placeholder-gray-500
          text-gray-900 dark:text-white
          disabled:opacity-50 disabled:cursor-not-allowed
          resize-vertical min-h-[100px]
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
        `}
      />
      
      {error && (
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};