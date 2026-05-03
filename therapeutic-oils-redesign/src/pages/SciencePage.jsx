import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { heroIngredients, faqs } from '../data/products';
import Reveal from '../components/Reveal';

export default function SciencePage() {
  return (
    <main className="pt-32 md:pt-40 pb-32">
      {/* HERO */}
      <section className="max-w-8xl mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow mb-5">The science</p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-[9.5rem] leading-[0.9] tracking-tightest text-balance"
                style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
              Botany,
              <br />
              <span className="font-display-italic text-cypress">earned.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-ink-soft text-pretty">
              Every ingredient on every label is there because it does work,
              not because it markets well. We hold formulations to the
              standard the clinic holds us to.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="border-y border-sand bg-bone py-24 md:py-32">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <Reveal className="max-w-3xl mb-16">
            <p className="eyebrow mb-5">Formulation principles</p>
            <h2 className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tightest"
                style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
              Four lines we
              <br />
              <span className="font-display-italic text-cypress">don&rsquo;t cross.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-14">
            {[
              {
                n: '01',
                t: 'No synthetic fragrance.',
                d: 'Scent comes from essential oils and botanical extracts. If a product smells like vanilla, the vanilla is in there.',
              },
              {
                n: '02',
                t: 'Concentrations that earn their place.',
                d: 'Every active is dosed at a level that does measurable work. We won&rsquo;t put a hero ingredient on the label if it&rsquo;s present in trace.',
              },
              {
                n: '03',
                t: 'Skin-safe for repeated daily contact.',
                d: 'Built first for therapists who apply product twenty times a day. If it&rsquo;s gentle enough for them, it&rsquo;s gentle enough for you.',
              },
              {
                n: '04',
                t: 'No occlusive silicones, no parabens.',
                d: 'Our base systems use plant butters, aloe, and food-grade emulsifiers. Skin should breathe between applications.',
              },
            ].map((p, i) => (
              <Reveal key={p.n} delay={i * 0.06}>
                <div className="border-t-2 border-ink pt-6">
                  <p className="font-mono text-xs tracking-widest text-ink-mute mb-5">N° {p.n}</p>
                  <h3 className="font-display text-3xl md:text-4xl tracking-tightest leading-tight mb-4"
                      style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
                    {p.t}
                  </h3>
                  <p className="text-ink-soft leading-relaxed text-pretty"
                     dangerouslySetInnerHTML={{ __html: p.d }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INGREDIENT DEEP DIVE */}
      <section className="py-24 md:py-36">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <Reveal className="max-w-3xl mb-16">
            <p className="eyebrow mb-5">The hero ingredients</p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tightest"
                style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
              Four plants,
              <br />
              <span className="font-display-italic text-cypress">in their own words.</span>
            </h2>
          </Reveal>

          <div className="space-y-3">
            {heroIngredients.map((ing, i) => (
              <Reveal key={ing.name} delay={i * 0.05}>
                <div className="surface-card p-8 md:p-12 grid lg:grid-cols-12 gap-8 items-start hover:bg-bone hover:shadow-card transition-all">
                  <div className="lg:col-span-3">
                    <p className="eyebrow mb-3">N° {String(i + 1).padStart(2, '0')}</p>
                    <h3 className="font-display text-5xl md:text-6xl tracking-tightest leading-none"
                        style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
                      {ing.name}
                    </h3>
                    <p className="font-display-italic text-cypress mt-2 text-lg">
                      {ing.latin}
                    </p>
                  </div>

                  <div className="lg:col-span-6">
                    <p className="text-ink-soft leading-relaxed text-lg text-pretty">
                      {ing.description}
                    </p>
                  </div>

                  <div className="lg:col-span-3 lg:border-l lg:border-sand lg:pl-8">
                    <p className="eyebrow mb-2">Note</p>
                    <p className="text-sm mb-5 text-cypress font-medium">{ing.note}</p>
                    <p className="eyebrow mb-2">Found in</p>
                    <ul className="space-y-1">
                      {ing.in.map((p) => (
                        <li key={p} className="text-sm">{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-bone border-y border-sand">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <Reveal className="mb-16">
            <p className="eyebrow mb-5">Common questions</p>
            <h2 className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tightest"
                style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
              Asked & answered.
            </h2>
          </Reveal>

          <div className="divide-y divide-sand">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <details className="group py-6">
                  <summary className="flex items-start justify-between cursor-pointer list-none gap-8">
                    <h3 className="font-display text-xl md:text-2xl tracking-tight leading-snug"
                        style={{ fontVariationSettings: "'opsz' 60, 'SOFT' 50" }}>
                      {f.q}
                    </h3>
                    <span className="shrink-0 w-8 h-8 rounded-full border border-ink/30 flex items-center justify-center text-ink transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="text-ink-soft leading-relaxed mt-4 max-w-3xl text-pretty">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-12 text-center">
            <Link to="/shop" className="btn-link text-base">
              Browse the full collection
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
