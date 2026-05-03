import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { COLLECTIONS, shopItems, getStartingPrice } from '../data/products';
import ProductIcon from '../components/ProductIcon';
import Reveal from '../components/Reveal';

export default function CollectionsPage() {
  const { hash } = useLocation();

  // Smooth-scroll to a collection if linked via #ritual etc.
  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    }
  }, [hash]);

  return (
    <main className="pt-32 md:pt-40 pb-32">
      <div className="max-w-8xl mx-auto px-6 md:px-10 mb-20 md:mb-32">
        <Reveal>
          <p className="eyebrow mb-5">Collections</p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.92] tracking-tightest text-balance"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
            Three collections.
            <br />
            <span className="font-display-italic text-cypress">A single hand.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-ink-soft max-w-2xl leading-relaxed text-pretty">
            Each line speaks to a different mode of use — the slow ritual,
            the body in motion, the visible result. Same formulary discipline,
            three different invitations.
          </p>
        </Reveal>
      </div>

      {Object.values(COLLECTIONS).map((c, i) => (
        <CollectionSection key={c.id} collection={c} index={i} />
      ))}
    </main>
  );
}

function CollectionSection({ collection, index }) {
  const items = shopItems.filter((p) => p.collection === collection.id);
  const flip = index % 2 === 1;

  return (
    <section
      id={collection.id}
      className={`py-20 md:py-28 ${
        index % 2 === 1 ? 'bg-bone border-y border-sand/60' : ''
      } scroll-mt-24`}
    >
      <div className="max-w-8xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-14 md:mb-20">
          <Reveal className={`lg:col-span-7 ${flip ? 'lg:order-2 lg:col-start-6' : ''}`}>
            <p className="eyebrow mb-5">
              N° {String(index + 1).padStart(2, '0')} · {collection.eyebrow}
            </p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tightest"
                style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
              {collection.name}
            </h2>
            <p className="font-display-italic text-2xl md:text-3xl text-cypress mt-6 leading-snug max-w-xl text-balance">
              {collection.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.1} className={`lg:col-span-5 self-end ${flip ? 'lg:order-1' : ''}`}>
            <p className="text-lg leading-relaxed text-ink-soft text-pretty max-w-md">
              {collection.description}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              <CollectionItemCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionItemCard({ item }) {
  const startPrice = getStartingPrice(item);
  return (
    <Link to={`/product/${item.slug}`} className="group block">
      <div className="aspect-[4/5] bg-linen rounded-2xl overflow-hidden mb-5 relative border border-sand/50">
        <div className="absolute inset-0 flex items-center justify-center p-10">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-32 h-32 rounded-2xl bg-bone shadow-soft flex items-center justify-center">
              <ProductIcon name={item.iconName} className={`w-14 h-14 ${item.iconColor}`} />
            </div>
          )}
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
          <p className="text-xs font-mono text-ink-mute tracking-wider">{item.description}</p>
        </div>
        <span className="font-display text-xl shrink-0"
              style={{ fontVariationSettings: "'opsz' 60" }}>
          ${startPrice}
        </span>
      </div>
    </Link>
  );
}
