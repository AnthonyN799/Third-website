import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { shopItems, COLLECTIONS, getStartingPrice } from '../data/products';
import ProductIcon from '../components/ProductIcon';
import Reveal from '../components/Reveal';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'ritual', label: COLLECTIONS.ritual.name },
  { id: 'active', label: COLLECTIONS.active.name },
  { id: 'refine', label: COLLECTIONS.refine.name },
];

export default function ShopPage() {
  const [active, setActive] = useState('all');

  const items = useMemo(() => {
    if (active === 'all') return shopItems;
    return shopItems.filter((p) => p.collection === active);
  }, [active]);

  return (
    <main className="pt-32 md:pt-40 pb-32">
      {/* Header */}
      <div className="max-w-8xl mx-auto px-6 md:px-10 mb-16 md:mb-20">
        <Reveal>
          <p className="eyebrow mb-5">The shop</p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.92] tracking-tightest text-balance"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
            Every product,
            <br />
            <span className="font-display-italic text-cypress">in one room.</span>
          </h1>
        </Reveal>
      </div>

      {/* Filter strip */}
      <div className="max-w-8xl mx-auto px-6 md:px-10 mb-12 border-y border-sand">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-5">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium tracking-tight transition-all ${
                active === f.id
                  ? 'bg-ink text-bone'
                  : 'text-ink-soft hover:text-ink hover:bg-bone/60'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto eyebrow text-ink-mute">
            {String(items.length).padStart(2, '0')} items
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-8xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-y-16">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 0.06}>
              <ProductCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}

function ProductCard({ item }) {
  const startPrice = getStartingPrice(item);
  const collection = COLLECTIONS[item.collection];
  return (
    <Link to={`/product/${item.slug}`} className="group block">
      <div className="aspect-[4/5] bg-linen rounded-2xl border border-sand/50 overflow-hidden mb-5 relative">
        <div className="absolute inset-0 flex items-center justify-center p-10">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-32 h-32 rounded-2xl bg-bone shadow-soft flex items-center justify-center">
              <ProductIcon name={item.iconName} className={`w-14 h-14 ${item.iconColor}`} />
            </div>
          )}
        </div>
        <div className="absolute top-4 left-4">
          <span className="eyebrow text-ink-mute">{collection?.eyebrow}</span>
        </div>
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-bone/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
        </div>
      </div>

      <div className="flex items-start justify-between gap-4 px-1">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-2xl tracking-tightest leading-tight mb-1"
              style={{ fontVariationSettings: "'opsz' 60, 'SOFT' 50" }}>
            {item.name}
          </h3>
          <p className="text-sm text-ink-soft mb-1">{item.tagline}</p>
          <p className="text-xs font-mono text-ink-mute tracking-wider">
            {item.description}
          </p>
        </div>
        <div className="text-right shrink-0">
          {item.sizes ? (
            <span className="text-xs font-mono text-ink-mute block mb-0.5">FROM</span>
          ) : null}
          <span className="font-display text-xl"
                style={{ fontVariationSettings: "'opsz' 60" }}>
            ${startPrice}
          </span>
        </div>
      </div>
    </Link>
  );
}
