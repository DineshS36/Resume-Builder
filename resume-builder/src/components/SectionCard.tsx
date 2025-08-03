import React from 'react';
import { motion } from 'framer-motion';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  children,
  icon,
  className = '',
  actions,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`
        backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 
        rounded-2xl border border-gray-200/50 dark:border-gray-700/50
        shadow-lg hover:shadow-xl transition-all duration-300
        p-6 ${className}
      `}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              {icon}
            </div>
          )}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>
        
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </div>
      
      {children}
    </motion.div>
  );
};