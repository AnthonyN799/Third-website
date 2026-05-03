import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Plus, Quote } from 'lucide-react';
import {
  shopItems,
  testimonials,
  COLLECTIONS,
  heroIngredients,
  getStartingPrice,
} from '../data/products';
import ProductIcon from '../components/ProductIcon';
import Reveal from '../components/Reveal';

/* ════════════════════════════════════════════════════
   HOMEPAGE
   The strategic frame:  physios = proof, you = protagonist.
   Aspirational lifestyle leads. Clinical credibility threads.
   ════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Marquee />
      <Hero />
      <CredibilityLine />
      <Collections />
      <Spotlight />
      <Botany />
      <ClinicVoices />
      <Ritual />
      <TradeCard />
      <ClosingCTA />
    </main>
  );
}

/* ──────────────────────────────────────────────────
   MARQUEE — top-of-page editorial strip
   ────────────────────────────────────────────────── */
function Marquee() {
  const items = [
    'Made in Lebanon',
    'Cosmetic-grade botanicals',
    'Trusted in 40+ clinics',
    'Free delivery over $50',
    'Cruelty-free',
    'Paraben-free',
  ];
  const stream = [...items, ...items, ...items];
  return (
    <div className="bg-cypress text-bone/85 py-2.5 overflow-hidden border-b border-cypress/40">
      <div className="marquee-track gap-12 whitespace-nowrap">
        {stream.map((it, i) => (
          <span key={i} className="eyebrow text-bone/70 flex items-center gap-12">
            {it} <span className="text-bone/30">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────
   HERO — Aspirational. Editorial. Personal-care led.
   The hero protagonist is the body lotion (Home Ritual)
   not the clinical gel. The clinical line lives in the
   eyebrow as credentials.
   ────────────────────────────────────────────────── */
function Hero() {
  return (
    <header className="relative pt-28 md:pt-36 pb-20 md:pb-32">
      {/* Soft cypress wash, low and behind product */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-1/3 -right-1/4 w-[900px] h-[900px] rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(44,61,51,0.10), transparent 60%)' }} />
        <div className="absolute -bottom-1/3 -left-1/4 w-[700px] h-[700px] rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(184,85,61,0.08), transparent 60%)' }} />
      </div>

      <div className="max-w-8xl mx-auto px-6 md:px-10 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* COPY · 7 columns */}
          <div className="lg:col-span-7 lg:pr-8">
            <Reveal>
              <p className="eyebrow mb-8">
                <span className="inline-block w-1.5 h-1.5 bg-cypress rounded-full mr-2 align-middle" />
                Used in clinics across Lebanon · Now on your shelf
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1
                className="font-display tracking-tightest leading-[0.92]
                           text-[clamp(3.4rem,8.5vw,8.5rem)] text-balance"
                style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'WONK' 0" }}
              >
                Clinical hands.
                <br />
                <span
                  className="font-display-italic text-cypress"
                  style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}
                >
                  Daily rituals.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-8 text-lg md:text-xl text-ink-soft max-w-xl leading-[1.55] text-pretty">
                Botanical formulas born in the physiotherapy clinic,
                refined for daily ritual. The lotions, oils, and candles
                that professionals trust — now part of your everyday.
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link to="/shop" className="btn-primary group">
                  Shop the Collection
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
                </Link>
                <Link to="/science" className="btn-ghost">
                  The Ingredients
                </Link>
              </div>
            </Reveal>
          </div>

          {/* HERO IMAGE · 5 columns */}
          <Reveal delay={0.15} className="lg:col-span-5">
            <HeroProduct />
          </Reveal>
        </div>
      </div>
    </header>
  );
}

function HeroProduct() {
  const product = shopItems.find((p) => p.slug === 'hydrating-body-lotion');
  return (
    <div className="relative">
      <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-linen border border-sand/70 shadow-card">
        {/* Soft warm vignette */}
        <div className="absolute inset-0"
             style={{ background: 'radial-gradient(at 30% 30%, rgba(251,248,242,0.9), rgba(229,220,203,0.4))' }} />
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-12 md:p-16 mix-blend-multiply"
        />
        {/* Floating product card */}
        <Link
          to={`/product/${product.slug}`}
          className="absolute bottom-5 left-5 right-5 md:left-6 md:right-auto md:max-w-[14rem] bg-bone/90 backdrop-blur-md rounded-2xl p-4 border border-sand/60 hover:bg-bone transition-all group"
        >
          <p className="eyebrow mb-1.5">{COLLECTIONS.ritual.name}</p>
          <p className="font-display text-xl leading-tight tracking-tight"
             style={{ fontVariationSettings: "'opsz' 60, 'SOFT' 40" }}>
            {product.name}
          </p>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-sand/60">
            <span className="text-sm font-mono">${product.price}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-12" strokeWidth={1.5} />
          </div>
        </Link>
      </div>

      {/* Decorative caption */}
      <p className="mt-6 text-xs font-mono text-ink-mute tracking-wider md:max-w-xs">
        N° 07 · HYDRATING BODY LOTION · 500 ML · ALOE BASE
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────
   CREDIBILITY LINE — single editorial proof line
   ────────────────────────────────────────────────── */
function CredibilityLine() {
  return (
    <section className="border-y border-sand/60 bg-bone/60">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-10 md:py-14">
        <Reveal>
          <p className="font-display text-2xl md:text-4xl leading-snug text-balance text-center max-w-5xl mx-auto"
             style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 60" }}>
            Built for the hands that work twelve-hour days.
            {' '}
            <span className="font-display-italic text-cypress">Refined for the hands that hold a coffee.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────
   COLLECTIONS — the new IA in three doors.
   This is the keystone strategic move: rather than
   one undifferentiated product list, the customer
   chooses the room they want to enter.
   ────────────────────────────────────────────────── */
function Collections() {
  const order = ['ritual', 'active', 'refine'];
  return (
    <section className="py-24 md:py-36">
      <div className="max-w-8xl mx-auto px-6 md:px-10">
        <Reveal className="max-w-3xl mb-16 md:mb-24">
          <p className="eyebrow mb-5">The collections</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tightest"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
            Three rooms.
            <br />
            <span className="font-display-italic text-cypress">One philosophy.</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-3 md:gap-4">
          {order.map((id, i) => {
            const c = COLLECTIONS[id];
            const items = shopItems.filter((p) => p.collection === id);
            const cover = items.find((p) => p.image) || items[0];
            return (
              <Reveal key={id} delay={i * 0.08}>
                <Link
                  to={`/collections#${id}`}
                  className="group block surface-card p-7 md:p-9 h-full transition-all duration-500 hover:bg-ink hover:text-bone hover:border-ink"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-10 md:mb-14">
                    <p className="eyebrow group-hover:text-bone/60 transition-colors">
                      {String(i + 1).padStart(2, '0')} / {String(order.length).padStart(2, '0')}
                    </p>
                    <Plus className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.5} />
                  </div>

                  {/* Cover image */}
                  <div className="aspect-[1/1] rounded-2xl bg-linen group-hover:bg-ink-soft/40 transition-colors mb-7 md:mb-10 overflow-hidden flex items-center justify-center p-8">
                    {cover.image ? (
                      <img
                        src={cover.image}
                        alt=""
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <ProductIcon name={cover.iconName} className="w-20 h-20 text-cypress group-hover:text-bone" />
                    )}
                  </div>

                  {/* Title block */}
                  <p className="text-xs tracking-wider uppercase font-mono group-hover:text-bone/60 mb-3">
                    {c.eyebrow}
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl tracking-tight leading-tight mb-4"
                      style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
                    {c.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-soft group-hover:text-bone/70 mb-6 max-w-sm">
                    {c.tagline}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-medium tracking-tight pt-5 border-t border-sand/80 group-hover:border-bone/20 w-full">
                    Enter
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────
   SPOTLIGHT — Apple-style hero on a single product.
   Right now: Premium Massage Candle (the most
   sensorial, giftable item — leans into ritual).
   ────────────────────────────────────────────────── */
function Spotlight() {
  const product = shopItems.find((p) => p.slug === 'premium-massage-candle');
  const startPrice = getStartingPrice(product);

  return (
    <section className="bg-ink text-bone py-24 md:py-36 relative overflow-hidden">
      {/* Subtle clay glow, far corner */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(184,85,61,0.18), transparent 60%)' }} />

      <div className="max-w-8xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center relative">
        <Reveal className="lg:col-span-5 lg:order-1 order-2">
          <p className="eyebrow text-bone/50 mb-6">Spotlight · {COLLECTIONS.ritual.name}</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tightest mb-8"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
            Light it.
            <br />
            <span className="font-display-italic text-clay">Pour it.</span>
            <br />
            Wear it.
          </h2>
          <p className="text-bone/70 leading-relaxed text-lg max-w-md mb-10">
            A candle, until it isn&rsquo;t. The soy-shea blend melts at body
            temperature — wax becomes massage oil, ritual becomes practice.
          </p>
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-xs text-bone/50 tracking-wider">FROM</span>
            <span className="font-display text-4xl"
                  style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
              ${startPrice}
            </span>
          </div>
          <Link to={`/product/${product.slug}`} className="btn-clay group">
            Discover the candle
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7 lg:order-2 order-1">
          <div className="relative aspect-[5/4] rounded-3xl bg-bone/5 border border-bone/10 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-contain p-10 md:p-20 mix-blend-screen opacity-95"
            />
          </div>
          <div className="mt-5 flex items-center justify-between text-bone/40 font-mono text-xs tracking-widest">
            <span>N° 01</span>
            <span>SOY · SHEA · ESSENTIAL OILS</span>
            <span>POUR @ 38°C</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────
   BOTANY — credibility through ingredient story.
   Every world-class personal care brand has a
   "named ingredient" moment (La Mer's Miracle Broth,
   Aesop's botanicals). This is ours.
   ────────────────────────────────────────────────── */
function Botany() {
  return (
    <section className="py-24 md:py-36">
      <div className="max-w-8xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5">The botany</p>
            <h2 className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tightest"
                style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
              Four plants do
              <br />
              <span className="font-display-italic text-cypress">most of the work.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-lg leading-relaxed text-ink-soft max-w-xl text-pretty">
              No synthetic fragrance. No proprietary marketing names. Just botanical
              actives at concentrations that do something — selected for the same
              reason a physiotherapist would: they earn their place on the bottle.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {heroIngredients.map((ing, i) => (
            <Reveal key={ing.name} delay={i * 0.06}>
              <div className="surface-card p-7 h-full hover:bg-bone hover:shadow-card transition-all group">
                <div className="flex items-start justify-between mb-8">
                  <span className="eyebrow">N° {String(i + 1).padStart(2, '0')}</span>
                  <span className="text-xs font-mono text-cypress tracking-wider">{ing.note}</span>
                </div>
                <h3 className="font-display text-3xl tracking-tightest leading-tight mb-1"
                    style={{ fontVariationSettings: "'opsz' 100, 'SOFT' 50" }}>
                  {ing.name}
                </h3>
                <p className="font-display-italic text-sm text-ink-mute mb-5">
                  {ing.latin}
                </p>
                <p className="text-sm leading-relaxed text-ink-soft mb-6">
                  {ing.description}
                </p>
                <div className="pt-5 border-t border-sand/80">
                  <p className="eyebrow mb-2">Found in</p>
                  <p className="text-sm leading-snug">{ing.in.join(' · ')}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-12 text-center">
          <Link to="/science" className="btn-link text-base">
            Read the full ingredient story
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────
   CLINIC VOICES — physios as third-party validators.
   Critical reframe: this section is "what the experts
   say about the products you buy" — not "we sell to
   experts."
   ────────────────────────────────────────────────── */
function ClinicVoices() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];
  return (
    <section className="bg-cypress text-bone py-24 md:py-36 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-bone/50 mb-6">From the clinic</p>
        </Reveal>

        <Reveal delay={0.1}>
          <Quote className="w-10 h-10 text-bone/30 mb-8" strokeWidth={1.25} />
          <blockquote
            key={active}
            className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tightest text-balance animate-fade-up"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 60" }}
          >
            “{t.quote}”
          </blockquote>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 pt-8 border-t border-bone/15 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="font-display text-xl mb-1"
                 style={{ fontVariationSettings: "'opsz' 60" }}>
                {t.author}
              </p>
              <p className="text-sm text-bone/60">{t.role}</p>
              <p className="text-xs text-bone/50 font-mono tracking-wider mt-3">
                ON · {t.product.toUpperCase()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-[2px] transition-all duration-300 ${
                    i === active ? 'w-12 bg-bone' : 'w-6 bg-bone/30 hover:bg-bone/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────
   RITUAL — editorial how-to. The "lifestyle" moment
   ────────────────────────────────────────────────── */
function Ritual() {
  const steps = [
    {
      n: 'I',
      title: 'Set the room',
      copy:
        'Light the candle. Wait fifteen minutes. The wax becomes warm massage oil at body-comfortable temperature.',
    },
    {
      n: 'II',
      title: 'Pour, then warm',
      copy:
        'Cup the heated oil between your palms. Apply with broad, slow strokes — shoulders first, then forearms.',
    },
    {
      n: 'III',
      title: 'Lock it in',
      copy:
        'Finish with the body lotion on dry zones. The aloe base seals the oil without the heaviness.',
    },
  ];
  return (
    <section className="py-24 md:py-36">
      <div className="max-w-8xl mx-auto px-6 md:px-10">
        <Reveal className="max-w-3xl mb-16">
          <p className="eyebrow mb-5">The ritual</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tightest"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
            How professionals
            <br />
            <span className="font-display-italic text-cypress">use the line at home.</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="border-t-2 border-ink pt-6">
                <div className="flex items-baseline justify-between mb-8">
                  <span className="font-display text-7xl tracking-tightest text-cypress"
                        style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'WONK' 1" }}>
                    {s.n}
                  </span>
                  <span className="eyebrow">Step</span>
                </div>
                <h3 className="font-display text-2xl tracking-tight mb-3"
                    style={{ fontVariationSettings: "'opsz' 60, 'SOFT' 50" }}>
                  {s.title}
                </h3>
                <p className="text-ink-soft leading-relaxed text-pretty">
                  {s.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────
   TRADE — small, refined. The B2B door, no longer
   competing with consumer for visual weight.
   ────────────────────────────────────────────────── */
function TradeCard() {
  return (
    <section className="pb-24 md:pb-36">
      <div className="max-w-8xl mx-auto px-6 md:px-10">
        <Reveal>
          <Link
            to="/trade"
            className="group flex flex-col md:flex-row md:items-center md:justify-between gap-6 surface-card px-8 py-10 md:px-12 md:py-14 hover:bg-bone hover:shadow-card transition-all"
          >
            <div className="max-w-2xl">
              <p className="eyebrow mb-4">For clinics, gyms & spas</p>
              <p className="font-display text-3xl md:text-5xl leading-tight tracking-tightest text-balance"
                 style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
                Trade & wholesale.
                {' '}
                <span className="font-display-italic text-cypress">
                  The clinic side of our business.
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2 text-ink font-medium tracking-tight whitespace-nowrap">
              <span>Trade inquiry</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────
   CLOSING CTA
   ────────────────────────────────────────────────── */
function ClosingCTA() {
  return (
    <section className="pb-32 md:pb-40">
      <div className="max-w-8xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="surface-card p-10 md:p-20 text-center bg-bone">
            <p className="eyebrow mb-6">Begin</p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tightest mb-10 text-balance"
                style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
              Your hands.
              <br />
              <span className="font-display-italic text-cypress">Tonight, after the shower.</span>
            </h2>
            <Link to="/shop" className="btn-primary">
              Shop the Collection
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
