import React from 'react';

const Loader = ({ label = 'Loading…', full = false }) => {
  const spinner = (
    <div className="flex flex-col items-center gap-3" role="status">
      <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-slate-200 border-t-brand-500" />
      <span className="text-sm text-slate-400">{label}</span>
    </div>
  );

  if (full) {
    return <div className="flex min-h-[50vh] items-center justify-center">{spinner}</div>;
  }
  return <div className="flex justify-center py-12">{spinner}</div>;
};

export default Loader;
