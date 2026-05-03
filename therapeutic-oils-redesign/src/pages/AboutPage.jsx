import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';

export default function AboutPage() {
  return (
    <main className="pt-32 md:pt-40 pb-32">
      {/* HERO */}
      <section className="max-w-8xl mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <Reveal>
          <p className="eyebrow mb-5">Our story</p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tightest text-balance max-w-6xl"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
            We started in
            <br />
            the clinic.{' '}
            <span className="font-display-italic text-cypress">
              We grew up at home.
            </span>
          </h1>
        </Reveal>
      </section>

      {/* THE STORY · long-form editorial */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 mb-32">
        <Reveal>
          <p className="font-display text-2xl md:text-3xl leading-[1.4] tracking-editorial text-pretty mb-10"
             style={{ fontVariationSettings: "'opsz' 100, 'SOFT' 60" }}>
            For years, we made products for the hands that need them
            most: physiotherapists, osteopaths, sports therapists.
            Hands that work twelve-hour days. Hands that can&rsquo;t afford
            a formula that dries early or smells synthetic.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-ink-soft text-lg md:text-xl leading-[1.6] mb-8 text-pretty">
            That clinical discipline shaped everything: the glide of our
            massage oils, the precise fifty-minute window of Pure Ice gel,
            the warming curve of Actiflam. Therapists trusted us because
            we built for their reality, not their marketing.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="text-ink-soft text-lg md:text-xl leading-[1.6] mb-8 text-pretty">
            Then, slowly, the same products started ending up on
            bathroom counters. Patients asked to take tubes home.
            Clinics ordered candles for their reception areas. The
            line between professional care and daily ritual blurred —
            and we realized that line had been artificial all along.
          </p>
        </Reveal>
        <Reveal delay={0.26}>
          <p className="text-ink-soft text-lg md:text-xl leading-[1.6] text-pretty">
            Today we make two things, well: products that do measurable
            work in the hands of professionals, and products that turn
            ordinary moments into ritual at home. They&rsquo;re the same
            products. Just used differently.
          </p>
        </Reveal>
      </section>

      {/* PHILOSOPHY · two-column statements */}
      <section className="bg-bone border-y border-sand py-24 md:py-32">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <Reveal className="max-w-3xl mb-16">
            <p className="eyebrow mb-5">What we believe</p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tightest"
                style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
              Four convictions.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {[
              {
                k: 'Care is care',
                v: 'There is no honest difference between professional skin care and home skin care. There is only formulation discipline — or its absence.',
              },
              {
                k: 'Ritual builds trust',
                v: 'Products people use daily earn it. We design for the second bottle, not the first impression.',
              },
              {
                k: 'Botany over branding',
                v: 'Cypress works because cypress works. We&rsquo;d rather name the plant than invent a proprietary blend.',
              },
              {
                k: 'Local, made well',
                v: 'Made in Lebanon, sourced regionally where possible. Smaller footprint, shorter supply chain, the same standard.',
              },
            ].map((c, i) => (
              <Reveal key={c.k} delay={i * 0.06}>
                <div className="border-t-2 border-ink pt-6">
                  <h3 className="font-display text-3xl md:text-4xl tracking-tightest leading-tight mb-4"
                      style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
                    {c.k}
                  </h3>
                  <p className="text-ink-soft leading-relaxed text-pretty">
                    {c.v}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TWO INVITATIONS · final closing */}
      <section className="py-24 md:py-32">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <Reveal className="text-center mb-16">
            <p className="eyebrow mb-5">Two ways in</p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tightest text-balance"
                style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
              Whichever room
              <br />
              <span className="font-display-italic text-cypress">you came in through.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-3">
            <Reveal delay={0.08}>
              <Link
                to="/shop"
                className="group block surface-card bg-bone p-10 md:p-14 hover:shadow-card transition-all"
              >
                <p className="eyebrow mb-8">For you</p>
                <h3 className="font-display text-4xl md:text-5xl tracking-tightest leading-tight mb-6"
                    style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
                  Shop
                  <br />
                  <span className="font-display-italic text-cypress">the collection.</span>
                </h3>
                <p className="text-ink-soft mb-8 leading-relaxed">
                  Lotions, oils, candles and active care — delivered.
                </p>
                <span className="btn-link text-base">
                  Enter the shop <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </span>
              </Link>
            </Reveal>

            <Reveal delay={0.16}>
              <Link
                to="/trade"
                className="group block bg-ink text-bone rounded-3xl p-10 md:p-14 hover:bg-cypress transition-all"
              >
                <p className="eyebrow text-bone/50 mb-8">For clinics & spas</p>
                <h3 className="font-display text-4xl md:text-5xl tracking-tightest leading-tight mb-6"
                    style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
                  Trade
                  <br />
                  <span className="font-display-italic text-clay">programme.</span>
                </h3>
                <p className="text-bone/70 mb-8 leading-relaxed">
                  Wholesale pricing, partnership terms, professional supply.
                </p>
                <span className="inline-flex items-center gap-2 text-bone font-medium tracking-tight border-b border-bone pb-1">
                  Trade inquiry <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
