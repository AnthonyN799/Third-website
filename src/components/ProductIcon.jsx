import React from 'react';
import { Wind, Flame, Droplets, Sparkles, Leaf } from 'lucide-react';

const map = { Wind, Flame, Droplets, Sparkles, Leaf };

export default function ProductIcon({ name, className = 'w-6 h-6' }) {
  const Icon = map[name] || Leaf;
  return <Icon className={className} strokeWidth={1.5} />;
}
