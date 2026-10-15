import React from 'react';

const Input = ({
  icon: Icon,
  placeholder = 'Search...',
  value,
  onChange,
  className = '',
  type = 'text',
  ...props
}) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      {Icon && (
        <div className="absolute left-3.5 text-slate-400 pointer-events-none">
          <Icon className="w-4 h-4" />
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full py-2.5 text-sm bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none ${
          Icon ? 'pl-10' : 'pl-3'
        } pr-4`}
        {...props}
      />
    </div>
  );
};

export default Input;
