import React, { useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { WEB3FORMS_KEY, shopItems } from '../data/products';
import Reveal from '../components/Reveal';

export default function TradePage() {
  const [form, setForm] = useState({
    name: '',
    business: '',
    role: '',
    email: '',
    phone: '',
    interest: 'Full Catalogue',
    notes: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handle = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.business || !form.email) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    const message = `TRADE INQUIRY\n\nName: ${form.name}\nBusiness: ${form.business}\nRole: ${form.role}\nEmail: ${form.email}\nPhone: ${form.phone}\nInterest: ${form.interest}\n\nNotes:\n${form.notes}`;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'Trade Inquiry — Therapeutic Oils',
          from_name: form.name,
          message,
        }),
      });
      const r = await res.json();
      setStatus(r.success ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="pt-32 md:pt-40 pb-32">
      {/* HERO */}
      <section className="max-w-8xl mx-auto px-6 md:px-10 mb-24">
        <Reveal>
          <p className="eyebrow mb-5">Trade programme</p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] tracking-tightest text-balance max-w-6xl"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
            For the hands
            <br />
            that{' '}
            <span className="font-display-italic text-cypress">make a living.</span>
          </h1>
          <p className="text-lg md:text-xl text-ink-soft mt-10 max-w-2xl leading-relaxed text-pretty">
            Wholesale pricing, partnership support, and professional-supply
            terms for physiotherapy clinics, sports clubs, gyms, and spas
            across Lebanon. The same products, sized for daily clinic life.
          </p>
        </Reveal>
      </section>

      {/* WHO IT'S FOR */}
      <section className="bg-bone border-y border-sand py-24 md:py-32">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <Reveal className="max-w-3xl mb-16">
            <p className="eyebrow mb-5">Who we supply</p>
            <h2 className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tightest"
                style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
              Built for repeat use.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-x-12 gap-y-12">
            {[
              {
                t: 'Physiotherapy clinics',
                d: 'Cooling and warming creams, professional massage oils, and conditioning formulas at clinic-volume sizes and pricing.',
              },
              {
                t: 'Gyms & sports clubs',
                d: 'Pre-and-post training topical care for member use, branded packs, and locker-room display options.',
              },
              {
                t: 'Spas & wellness centers',
                d: 'Massage candles, lotions, and oils in scent-coordinated programmes designed for treatment menus.',
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.06}>
                <div className="border-t-2 border-ink pt-6">
                  <p className="font-mono text-xs tracking-widest text-ink-mute mb-5">
                    N° {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-display text-3xl tracking-tightest leading-tight mb-4"
                      style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
                    {c.t}
                  </h3>
                  <p className="text-ink-soft leading-relaxed">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="py-24 md:py-32">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <Reveal>
              <p className="eyebrow mb-5">Trade benefits</p>
              <h2 className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tightest mb-12"
                  style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
                What you get.
              </h2>
              <ul className="space-y-6">
                {[
                  'Tiered wholesale pricing from your first order',
                  'Professional-volume sizing on bestsellers',
                  'Co-branded packaging options for clinics',
                  'Priority restocking and account management',
                  'Direct line to the formulator for custom requests',
                  'Free delivery on qualifying trade orders',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-cypress mt-1 shrink-0" strokeWidth={1.75} />
                    <span className="text-ink-soft text-lg leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Inquiry form */}
            <Reveal delay={0.1}>
              <div id="inquiry" className="surface-card bg-bone p-8 md:p-10">
                <p className="eyebrow mb-3">Trade inquiry</p>
                <h3 className="font-display text-3xl md:text-4xl tracking-tightest leading-tight mb-8"
                    style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
                  Request our wholesale price list.
                </h3>

                {status === 'sent' ? (
                  <div className="py-12 text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-cypress/15 flex items-center justify-center mb-5">
                      <Check className="w-7 h-7 text-cypress" strokeWidth={1.75} />
                    </div>
                    <p className="font-display text-2xl mb-3"
                       style={{ fontVariationSettings: "'opsz' 60, 'SOFT' 50" }}>
                      Thank you.
                    </p>
                    <p className="text-ink-soft">
                      Your inquiry is in. We&rsquo;ll respond within one business day.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => handle('name', e.target.value)}
                        className="input-field"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Role"
                        value={form.role}
                        onChange={(e) => handle('role', e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Business / clinic name"
                      value={form.business}
                      onChange={(e) => handle('business', e.target.value)}
                      className="input-field"
                      required
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => handle('email', e.target.value)}
                        className="input-field"
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={(e) => handle('phone', e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <select
                      value={form.interest}
                      onChange={(e) => handle('interest', e.target.value)}
                      className="input-field"
                    >
                      <option>Full Catalogue</option>
                      <option>Active Care line only</option>
                      <option>Home Ritual line only</option>
                      <option>Body Refinement line only</option>
                      <option>Custom programme</option>
                    </select>
                    <textarea
                      placeholder="Tell us about your business"
                      value={form.notes}
                      onChange={(e) => handle('notes', e.target.value)}
                      className="input-field h-28 resize-none"
                    />
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-primary w-full mt-2"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.75} />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send inquiry
                          <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                        </>
                      )}
                    </button>
                    {status === 'error' && (
                      <p className="text-clay text-sm">
                        Something went wrong. Please fill the required fields and try again.
                      </p>
                    )}
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CATALOGUE STRIP */}
      <section className="py-24 md:py-32 bg-cypress text-bone">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <Reveal className="mb-12">
            <p className="eyebrow text-bone/60 mb-5">The catalogue</p>
            <h2 className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tightest text-bone"
                style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
              The full line, available for trade.
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {shopItems.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 0.05}>
                <div>
                  <div className="aspect-square bg-bone/5 rounded-2xl border border-bone/10 overflow-hidden mb-4 flex items-center justify-center p-6">
                    {p.image ? (
                      <img src={p.image} alt={p.name}
                           className="w-full h-full object-contain mix-blend-screen opacity-90" />
                    ) : (
                      <div className="text-bone/40 text-xs font-mono tracking-wider">
                        {p.name.toUpperCase()}
                      </div>
                    )}
                  </div>
                  <p className="font-display text-lg tracking-tight text-bone leading-tight"
                     style={{ fontVariationSettings: "'opsz' 60, 'SOFT' 50" }}>
                    {p.name}
                  </p>
                  <p className="text-xs font-mono text-bone/50 mt-1 tracking-wider">
                    {p.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
