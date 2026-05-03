import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Loader2, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import {
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  WEB3FORMS_KEY,
} from '../data/products';
import ProductIcon from '../components/ProductIcon';
import Reveal from '../components/Reveal';

/**
 * Generate a unique order reference. Uses crypto.randomUUID when
 * available, falling back to timestamp + random suffix. This replaces
 * the old localStorage counter that produced duplicate refs across
 * customers.
 */
function generateOrderRef() {
  const stamp = Date.now().toString(36).toUpperCase();
  let rand;
  try {
    rand = crypto.randomUUID().split('-')[0].toUpperCase();
  } catch {
    rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  return `TO-${stamp}-${rand}`;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [status, setStatus] = useState('idle'); // idle | sending | error
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: '',
    payment: 'cash',
  });

  const freeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = items.length === 0 ? 0 : freeDelivery ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const handle = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const orderSummary = useMemo(
    () =>
      items
        .map(
          (i) =>
            `${i.qty}× ${i.name}${
              [i.size, i.scent].filter(Boolean).length
                ? ` (${[i.size, i.scent].filter(Boolean).join(' / ')})`
                : ''
            } — $${(i.price * i.qty).toFixed(2)}`
        )
        .join('\n'),
    [items]
  );

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.city) {
      setStatus('error');
      return;
    }
    setStatus('sending');

    const orderRef = generateOrderRef();
    const message = `ORDER ${orderRef}

Customer: ${form.name}
Phone: ${form.phone}
Email: ${form.email}
Address: ${form.address}
City: ${form.city}
Payment: ${form.payment === 'cash' ? 'Cash on delivery' : 'Bank transfer'}

ITEMS
${orderSummary}

Subtotal: $${subtotal.toFixed(2)}
Delivery: ${freeDelivery ? 'Free' : `$${deliveryFee.toFixed(2)}`}
TOTAL: $${total.toFixed(2)}

Notes:
${form.notes || '—'}`;

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Order — ${orderRef}`,
          from_name: form.name,
          message,
        }),
      });
      const r = await res.json();
      if (r.success) {
        const order = {
          ref: orderRef,
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          items,
          subtotal,
          deliveryFee,
          total,
          payment: form.payment,
          createdAt: new Date().toISOString(),
        };
        try {
          sessionStorage.setItem('to_last_order', JSON.stringify(order));
        } catch {
          /* ignore */
        }
        clearCart();
        navigate('/order-confirmed');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (items.length === 0) {
    return (
      <main className="pt-32 md:pt-40 pb-32 px-6 max-w-3xl mx-auto text-center">
        <p className="eyebrow mb-5">Checkout</p>
        <h1
          className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tightest mb-10"
          style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
        >
          Your cart is{' '}
          <span className="font-display-italic text-cypress">empty.</span>
        </h1>
        <Link to="/shop" className="btn-primary">
          Browse the shop <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-28 md:pt-32 pb-32">
      <div className="max-w-8xl mx-auto px-6 md:px-10 mb-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Back to cart
        </Link>
      </div>

      <div className="max-w-8xl mx-auto px-6 md:px-10">
        <Reveal>
          <p className="eyebrow mb-5">Checkout</p>
          <h1
            className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tightest mb-12"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            Almost yours.
          </h1>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Form */}
          <Reveal className="lg:col-span-7">
            <form onSubmit={submit} className="space-y-8">
              <div>
                <p className="eyebrow mb-5">Delivery details</p>
                <div className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) => handle('name', e.target.value)}
                      className="input-field"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone (e.g. +961 …)"
                      value={form.phone}
                      onChange={(e) => handle('phone', e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email (optional, for order updates)"
                    value={form.email}
                    onChange={(e) => handle('email', e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Address — building, street, floor"
                    value={form.address}
                    onChange={(e) => handle('address', e.target.value)}
                    className="input-field"
                    required
                  />
                  <input
                    type="text"
                    placeholder="City / region"
                    value={form.city}
                    onChange={(e) => handle('city', e.target.value)}
                    className="input-field"
                    required
                  />
                  <textarea
                    placeholder="Notes (optional — gate code, delivery preferences)"
                    value={form.notes}
                    onChange={(e) => handle('notes', e.target.value)}
                    className="input-field h-24 resize-none"
                  />
                </div>
              </div>

              <div>
                <p className="eyebrow mb-5">Payment</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { id: 'cash', label: 'Cash on delivery', sub: 'Pay when your order arrives.' },
                    { id: 'transfer', label: 'Bank transfer', sub: 'We send details after confirmation.' },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => handle('payment', opt.id)}
                      className={`text-left surface-card p-5 transition-all ${
                        form.payment === opt.id
                          ? 'border-ink bg-bone'
                          : 'border-sand hover:border-ink/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-medium tracking-tight">{opt.label}</span>
                        <span
                          className={`w-4 h-4 rounded-full border ${
                            form.payment === opt.id
                              ? 'border-ink bg-ink'
                              : 'border-ink/30'
                          }`}
                        />
                      </div>
                      <p className="text-sm text-ink-soft">{opt.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {status === 'error' && (
                <p className="text-clay text-sm">
                  Please fill the required fields and try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full md:w-auto"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.75} />
                    Placing order…
                  </>
                ) : (
                  <>
                    Place order — ${total.toFixed(2)}
                    <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                  </>
                )}
              </button>
            </form>
          </Reveal>

          {/* Summary */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="surface-card bg-bone p-7 md:p-8 sticky top-24">
              <p className="eyebrow mb-6">Your order</p>

              <div className="space-y-4 mb-6 max-h-72 overflow-auto pr-2">
                {items.map((i) => (
                  <div key={i.key} className="flex gap-4">
                    <div className="w-14 h-14 rounded-lg bg-linen flex items-center justify-center overflow-hidden shrink-0">
                      {i.image ? (
                        <img
                          src={i.image}
                          alt={i.name}
                          className="w-full h-full object-contain p-1.5 mix-blend-multiply"
                        />
                      ) : (
                        <ProductIcon name={i.iconName} className={`w-6 h-6 ${i.iconColor}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-display text-base leading-snug"
                        style={{ fontVariationSettings: "'opsz' 60, 'SOFT' 50" }}
                      >
                        {i.name}
                      </p>
                      <p className="text-xs font-mono text-ink-mute mt-0.5 tracking-wider">
                        {[i.size, i.scent, `× ${i.qty}`].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                    <span className="font-mono text-sm shrink-0">
                      ${(i.price * i.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-5 border-t border-sand text-sm">
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

              <div className="flex justify-between items-baseline mt-5 pt-5 border-t border-sand">
                <span
                  className="font-display text-2xl"
                  style={{ fontVariationSettings: "'opsz' 100, 'SOFT' 50" }}
                >
                  Total
                </span>
                <span
                  className="font-display text-3xl"
                  style={{ fontVariationSettings: "'opsz' 144" }}
                >
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="mt-6 pt-5 border-t border-sand flex items-start gap-2.5">
                <Check
                  className="w-4 h-4 text-cypress mt-0.5 shrink-0"
                  strokeWidth={1.75}
                />
                <p className="text-xs text-ink-soft leading-relaxed">
                  Order confirmed via WhatsApp · Lebanon-wide delivery · Cruelty-free
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
