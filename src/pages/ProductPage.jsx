import React, { useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Plus, Minus } from 'lucide-react';
import {
  getShopItemBySlug,
  shopItems,
  COLLECTIONS,
  getItemPrice,
} from '../data/products';
import { useCart } from '../context/CartContext';
import ProductIcon from '../components/ProductIcon';
import Toast from '../components/Toast';
import Reveal from '../components/Reveal';

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getShopItemBySlug(slug);
  const { addItem } = useCart();

  const [size, setSize] = useState(product?.sizes?.[0]?.label ?? null);
  const [scent, setScent] = useState(product?.scents?.[0] ?? null);
  const [qty, setQty] = useState(1);
  const [toastShow, setToastShow] = useState(false);

  const price = useMemo(() => (product ? getItemPrice(product, size) : 0), [product, size]);

  if (!product) {
    return (
      <main className="min-h-screen pt-32 px-6 max-w-3xl mx-auto text-center">
        <h1 className="font-display text-5xl mb-4"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
          Not found.
        </h1>
        <p className="text-ink-soft mb-8">This product no longer exists or was renamed.</p>
        <Link to="/shop" className="btn-primary">Return to shop</Link>
      </main>
    );
  }

  const collection = COLLECTIONS[product.collection];
  const related = shopItems
    .filter((p) => p.id !== product.id && p.collection === product.collection)
    .slice(0, 3);

  const handleAdd = () => {
    addItem(product, { size, scent, price }, qty);
    setToastShow(true);
  };

  return (
    <main className="pt-28 md:pt-32 pb-32">
      <Toast message="Added to cart" show={toastShow} onHide={() => setToastShow(false)} />

      {/* Breadcrumb */}
      <div className="max-w-8xl mx-auto px-6 md:px-10 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Back
        </button>
      </div>

      <div className="max-w-8xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16">
        {/* IMAGE · 7 col */}
        <Reveal className="lg:col-span-7">
          <div className="sticky top-24">
            <div className="aspect-square lg:aspect-[4/5] rounded-3xl bg-linen border border-sand/60 overflow-hidden relative">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-contain p-12 md:p-20 mix-blend-multiply"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-3xl bg-bone shadow-soft flex items-center justify-center">
                    <ProductIcon name={product.iconName} className={`w-24 h-24 ${product.iconColor}`} />
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-mono text-ink-mute tracking-widest">
              <span>N° {String(product.id).padStart(3, '0')}</span>
              <span>{product.description.toUpperCase()}</span>
            </div>
          </div>
        </Reveal>

        {/* DETAILS · 5 col */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-4">
              <Link to={`/collections#${product.collection}`} className="link-underline">
                {collection?.name}
              </Link>
            </p>
            <h1 className="font-display text-5xl md:text-6xl tracking-tightest leading-[0.95] mb-3"
                style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
              {product.name}
            </h1>
            <p className="font-display-italic text-xl md:text-2xl text-cypress leading-snug mb-6">
              {product.tagline}
            </p>
            <p className="text-ink-soft leading-relaxed text-pretty">
              {product.details.story}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-display text-4xl"
                    style={{ fontVariationSettings: "'opsz' 144" }}>
                ${price}
              </span>
              <span className="text-sm font-mono text-ink-mute tracking-wider">
                FREE DELIVERY OVER $50
              </span>
            </div>

            {product.sizes && (
              <div className="mb-6">
                <p className="eyebrow mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setSize(s.label)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium tracking-tight transition-all border ${
                        size === s.label
                          ? 'bg-ink text-bone border-ink'
                          : 'bg-transparent border-sand hover:border-ink'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.scents && (
              <div className="mb-8">
                <p className="eyebrow mb-3">Scent</p>
                <div className="flex flex-wrap gap-2">
                  {product.scents.map((sc) => (
                    <button
                      key={sc}
                      onClick={() => setScent(sc)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium tracking-tight transition-all border ${
                        scent === sc
                          ? 'bg-ink text-bone border-ink'
                          : 'bg-transparent border-sand hover:border-ink'
                      }`}
                    >
                      {sc}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-stretch gap-3 mb-8">
              <div className="flex items-center bg-bone border border-sand rounded-full overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-3 hover:bg-sand/40 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" strokeWidth={1.75} />
                </button>
                <span className="w-8 text-center font-mono text-sm">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-3 hover:bg-sand/40 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" strokeWidth={1.75} />
                </button>
              </div>
              <button onClick={handleAdd} className="btn-primary flex-1">
                Add to cart
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 pt-10 border-t border-sand space-y-8">
            <div>
              <p className="eyebrow mb-3">Active ingredients</p>
              <ul className="space-y-2">
                {product.details.ingredients.map((ing) => (
                  <li key={ing} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-cypress mt-1 shrink-0" strokeWidth={1.75} />
                    <span className="text-ink-soft">{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-3">How to use</p>
              <p className="text-ink-soft leading-relaxed text-pretty">{product.details.usage}</p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="mt-32 max-w-8xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between mb-12">
            <Reveal>
              <p className="eyebrow mb-3">From the same collection</p>
              <h2 className="font-display text-4xl md:text-5xl tracking-tightest"
                  style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
                Pairs well with
              </h2>
            </Reveal>
            <Link to={`/collections#${product.collection}`} className="btn-link hidden md:inline-flex text-sm">
              All {collection?.name} <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
            {related.map((p) => (
              <Link key={p.id} to={`/product/${p.slug}`} className="group">
                <div className="aspect-[4/5] bg-linen rounded-2xl overflow-hidden mb-4 border border-sand/50 flex items-center justify-center p-10">
                  {p.image ? (
                    <img src={p.image} alt={p.name}
                         className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <ProductIcon name={p.iconName} className={`w-20 h-20 ${p.iconColor}`} />
                  )}
                </div>
                <div className="flex justify-between items-start gap-4 px-1">
                  <div>
                    <h3 className="font-display text-xl tracking-tightest"
                        style={{ fontVariationSettings: "'opsz' 60, 'SOFT' 50" }}>
                      {p.name}
                    </h3>
                    <p className="text-xs font-mono text-ink-mute mt-0.5">{p.description}</p>
                  </div>
                  <span className="font-display text-lg shrink-0"
                        style={{ fontVariationSettings: "'opsz' 60" }}>
                    ${p.price ?? p.sizes[0].price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
