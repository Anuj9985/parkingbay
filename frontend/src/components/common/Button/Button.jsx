import React from 'react';

const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark'
  size = 'md',         // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-150 focus:outline-none select-none disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-xl gap-2',
    lg: 'text-base px-6 py-3 rounded-xl gap-2.5',
    pill: 'text-xs px-3.5 py-1.5 rounded-full gap-1.5',
  };

  const variantStyles = {
    // Exact bright yellow accent from the screenshot:
    primary: 'bg-[#f5b014] hover:bg-[#e29f0e] text-slate-900 shadow-sm hover:shadow active:scale-[0.98]',
    // Dark button used in "View Details" popup card:
    dark: 'bg-[#0f172a] hover:bg-[#1e293b] text-white active:scale-[0.98]',
    // Outline button used in "👤 Login" button:
    outline: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-sm active:scale-[0.98]',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 active:scale-[0.98]',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
};

export default Button;
