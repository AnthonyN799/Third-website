import React, { useEffect } from 'react';
import { Check } from 'lucide-react';

export default function Toast({ message, show, onHide }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onHide, 2400);
    return () => clearTimeout(t);
  }, [show, onHide]);

  return (
    <div
      className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-3 bg-ink text-bone px-5 py-3 rounded-full shadow-deep">
        <Check className="w-4 h-4 text-cypress-soft" strokeWidth={2} />
        <span className="text-sm font-medium tracking-tight">{message}</span>
      </div>
    </div>
  );
}
