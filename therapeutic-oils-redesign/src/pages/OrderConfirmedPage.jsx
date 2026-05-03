import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';
import Reveal from '../components/Reveal';

export default function OrderConfirmedPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('to_last_order');
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi — I just placed order ${order?.ref ?? ''} on your site.`
  )}`;

  return (
    <main className="pt-32 md:pt-40 pb-32">
      <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
        <Reveal>
          <div className="w-16 h-16 mx-auto rounded-full bg-cypress/12 flex items-center justify-center mb-8">
            <Check className="w-8 h-8 text-cypress" strokeWidth={1.5} />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="eyebrow mb-5">Order received</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            className="font-display text-6xl md:text-8xl leading-[0.92] tracking-tightest mb-8 text-balance"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            Thank you,{' '}
            <span className="font-display-italic text-cypress">
              {order?.name?.split(' ')[0] || 'truly'}.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="text-lg md:text-xl text-ink-soft leading-relaxed text-pretty mb-12 max-w-xl mx-auto">
            Your order is in. We&rsquo;ll WhatsApp you within a few hours
            to confirm delivery and answer any questions you have.
          </p>
        </Reveal>

        {order && (
          <Reveal delay={0.24}>
            <div className="surface-card bg-bone text-left p-7 md:p-8 mb-10">
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-sand">
                <div>
                  <p className="eyebrow mb-1">Reference</p>
                  <p
                    className="font-display text-xl"
                    style={{ fontVariationSettings: "'opsz' 60, 'SOFT' 50" }}
                  >
                    {order.ref}
                  </p>
                </div>
                <div className="text-right">
                  <p className="eyebrow mb-1">Total</p>
                  <p
                    className="font-display text-2xl"
                    style={{ fontVariationSettings: "'opsz' 144" }}
                  >
                    ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {order.items.map((i) => (
                  <div key={i.key} className="flex justify-between text-sm">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{i.name}</p>
                      <p className="text-xs font-mono text-ink-mute tracking-wider mt-0.5">
                        {[i.size, i.scent, `× ${i.qty}`].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                    <span className="font-mono shrink-0">
                      ${(i.price * i.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-5 border-t border-sand text-sm space-y-1.5 text-ink-soft">
                <p>
                  <span className="text-ink-mute">Delivery to:</span> {order.address},{' '}
                  {order.city}
                </p>
                <p>
                  <span className="text-ink-mute">Phone:</span> {order.phone}
                </p>
                <p>
                  <span className="text-ink-mute">Payment:</span>{' '}
                  {order.payment === 'cash'
                    ? 'Cash on delivery'
                    : 'Bank transfer (details to follow)'}
                </p>
              </div>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.32}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={wa} target="_blank" rel="noreferrer" className="btn-primary">
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
              Message us on WhatsApp
            </a>
            <Link to="/shop" className="btn-ghost">
              Continue browsing
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
