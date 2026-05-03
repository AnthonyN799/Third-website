import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from '../data/products';
import ProductIcon from '../components/ProductIcon';
import Reveal from '../components/Reveal';

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal, totalItems } = useCart();
  const freeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = items.length === 0 ? 0 : freeDelivery ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;
  const remaining = FREE_DELIVERY_THRESHOLD - subtotal;

  if (items.length === 0) {
    return (
      <main className="pt-32 md:pt-40 pb-32 px-6 max-w-3xl mx-auto text-center">
        <p className="eyebrow mb-5">Your cart</p>
        <h1 className="font-display text-6xl md:text-8xl leading-[0.95] tracking-tightest mb-10"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
          Empty,
          <br />
          <span className="font-display-italic text-cypress">for now.</span>
        </h1>
        <Link to="/shop" className="btn-primary">
          Begin <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-28 md:pt-32 pb-32">
      <div className="max-w-8xl mx-auto px-6 md:px-10">
        <Reveal>
          <p className="eyebrow mb-5">Your cart</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tightest mb-12"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
            {totalItems} item{totalItems !== 1 ? 's' : ''}
            <span className="text-ink-mute"> · </span>
            <span className="font-display-italic text-cypress">Ready when you are.</span>
          </h1>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Items */}
          <div className="lg:col-span-7 space-y-3">
            {items.map((item, i) => (
              <Reveal key={item.key} delay={i * 0.04}>
                <div className="surface-card p-5 md:p-6 flex gap-5 items-center bg-bone">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-linen flex items-center justify-center overflow-hidden shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name}
                           className="w-full h-full object-contain p-2 mix-blend-multiply" />
                    ) : (
                      <ProductIcon name={item.iconName} className={`w-10 h-10 ${item.iconColor}`} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl md:text-2xl tracking-tight leading-tight"
                        style={{ fontVariationSettings: "'opsz' 60, 'SOFT' 50" }}>
                      {item.name}
                    </h3>
                    <p className="text-xs font-mono text-ink-mute tracking-wider mt-1">
                      {[item.size, item.scent].filter(Boolean).join(' · ')}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center bg-bg border border-sand rounded-full">
                        <button
                          onClick={() => updateQty(item.key, item.qty - 1)}
                          className="px-3 py-1.5 hover:bg-sand/40 transition-colors rounded-l-full"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" strokeWidth={1.75} />
                        </button>
                        <span className="w-7 text-center font-mono text-xs">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.key, item.qty + 1)}
                          className="px-3 py-1.5 hover:bg-sand/40 transition-colors rounded-r-full"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" strokeWidth={1.75} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-xs text-ink-mute hover:text-clay transition-colors flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-display text-xl"
                          style={{ fontVariationSettings: "'opsz' 60" }}>
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                    <p className="text-xs font-mono text-ink-mute mt-1">
                      ${item.price} · {item.qty}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Summary */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="surface-card bg-bone p-7 md:p-8 sticky top-24">
              <p className="eyebrow mb-5">Summary</p>

              {/* Free shipping progress */}
              {!freeDelivery && remaining > 0 && (
                <div className="mb-6 pb-6 border-b border-sand">
                  <p className="text-sm text-ink-soft mb-3">
                    Add <span className="font-medium text-ink">${remaining.toFixed(2)}</span> for free delivery
                  </p>
                  <div className="h-1 bg-sand rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cypress rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-ink-soft">
                  <span>Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-ink-soft">
                  <span>Delivery</span>
                  <span className="font-mono">
                    {freeDelivery ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-5 border-t border-sand mb-7">
                <span className="font-display text-2xl"
                      style={{ fontVariationSettings: "'opsz' 100, 'SOFT' 50" }}>
                  Total
                </span>
                <span className="font-display text-3xl"
                      style={{ fontVariationSettings: "'opsz' 144" }}>
                  ${total.toFixed(2)}
                </span>
              </div>

              <Link to="/checkout" className="btn-primary w-full">
                Continue to checkout
                <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
              </Link>
              <Link to="/shop" className="btn-link text-sm mt-5 mx-auto block w-fit">
                Continue browsing
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
