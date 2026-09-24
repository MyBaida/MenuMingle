import React from 'react';

const variants = {
  danger: 'bg-rose-50 text-rose-700 ring-rose-200',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  warning: 'bg-amber-50 text-amber-700 ring-amber-200',
  info: 'bg-sky-50 text-sky-700 ring-sky-200',
};

const Message = ({ variant = 'info', children }) => {
  if (!children) return null;
  return (
    <div className={`rounded-xl px-4 py-3 text-sm font-medium ring-1 ring-inset ${variants[variant] || variants.info}`}>
      {children}
    </div>
  );
};

export default Message;
