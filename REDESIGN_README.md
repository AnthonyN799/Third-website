# Therapeutic Oils — Site Redesign

A full rebuild of the storefront under a new positioning and design language.

---

## Strategic frame

**Old:** A site that split its weight evenly between physiotherapists and consumers, with the most clinical product (Pure Ice Gel) leading the hero.

**New:** *Clinical hands. Daily rituals.*
Physios become the **proof**, not the audience. The consumer line is the protagonist; the trade business lives one click below the surface — confident, but not competing for attention.

This single reframe drove every other decision in the redesign.

---

## Information architecture

Replaced the flat product list with three named **collections** — the customer enters the room they came for instead of wading through everything.

| Collection         | What it is                                       | Products                                            |
| ------------------ | ------------------------------------------------ | --------------------------------------------------- |
| **Home Ritual**    | Sensorial, lifestyle, giftable                   | Hydrating Body Lotion · Massage Candle · Massage Oil |
| **Active Care**    | Cooling, warming, recovery — clinic-grade        | Pure Ice Gel · Actiflam Cream · Massage Oil          |
| **Body Refinement**| Targeted skin conditioning with cypress          | Firmessence Cream · Firmessence Oil                  |

Routes reflect this:

```
/                  Home
/shop              All products + filter
/collections       The three collections, with #ritual #active #refine anchors
/product/:slug     PDP
/science           Ingredient story, formulation principles, FAQ
/about             Brand story (renamed "Story" in nav)
/trade             B2B portal (replaces /b2b — old route redirects)
/cart, /checkout, /order-confirmed
```

---

## Design language: "Apothecary modernism"

Choices made deliberately *against* CeraVe's clinical-blue look — that aesthetic would actively work against the personal-care pivot. The vocabulary here borrows from Aesop, Le Labo, and La Mer instead.

**Palette**

| Token        | Hex       | Use                                              |
| ------------ | --------- | ------------------------------------------------ |
| `bg`         | `#F5EFE6` | Warm cream paper background                      |
| `bone`       | `#FBF8F2` | Elevated card surfaces                           |
| `linen`      | `#EDE5D6` | Subtle product backgrounds                       |
| `sand`       | `#E5DCCB` | Dividers, borders                                |
| `ink`        | `#1B1B1A` | Warm near-black, primary text & buttons          |
| `ink-soft`   | `#3A3733` | Body copy                                        |
| `ink-mute`   | `#7E7A74` | Captions, eyebrows                               |
| `cypress`    | `#2C3D33` | The brand color — used on italic emphasis & CTAs |
| `clay`       | `#B8553D` | Single energy accent — used sparingly            |

**Typography**

- **Display:** Fraunces — high optical size (144), soft contrast (50). The italic uses WONK 1 for editorial flourish on emphasized phrases.
- **Body:** Outfit — modern neo-grotesque, slightly humanist.
- **Accent:** JetBrains Mono — used only for eyebrow labels, captions, and numbers ("N° 01", "01 / 03"). This is what gives the site its "specimen sheet" feeling.

**Texture**

A low-opacity SVG noise overlay sits on `body::before` so the cream background reads as paper, not flat color. Mix-blend-mode multiplies it into the page subtly.

**Motion**

- One staggered hero load on each page (eyebrow → headline → body → CTA, ~80ms apart).
- A `Reveal` component using IntersectionObserver fades sections in on scroll.
- Cards transition to dark ink on hover, mimicking print magazine spreads.
- A horizontal marquee strip at the top of the homepage (cypress green) for trust signals.

---

## What changed file-by-file

### New files
- `src/pages/CollectionsPage.jsx` — three-collection editorial page with anchor links
- `src/pages/SciencePage.jsx` — ingredient story, four formulation principles, FAQ
- `src/pages/TradePage.jsx` — refined B2B portal (replaces `B2BPortalPage`)
- `src/components/Reveal.jsx` — shared scroll-reveal helper
- `src/components/ProductIcon.jsx` — fallback for products without images

### Rebuilt
- `src/pages/HomePage.jsx` — full ground-up rebuild around new positioning
- `src/pages/ShopPage.jsx` — collection-aware filtering, editorial product cards
- `src/pages/ProductPage.jsx` — editorial PDP with ingredient deep-dive
- `src/pages/AboutPage.jsx` — long-form brand story, "four convictions" philosophy
- `src/pages/CartPage.jsx` — refined surfaces with free-shipping progress bar
- `src/pages/CheckoutPage.jsx` — same flow, new design language, **fixed order-ref bug**
- `src/pages/OrderConfirmedPage.jsx` — editorial confirmation
- `src/components/Navbar.jsx` — Fraunces wordmark, Trade tucked into a small link
- `src/components/Footer.jsx` — editorial closing line on dark ink, four-column links
- `src/components/Toast.jsx` & `WhatsAppButton.jsx` — restyled
- `src/context/CartContext.jsx` — **switched from `sessionStorage` to `localStorage`** so carts survive tab close
- `src/data/products.js` — added `COLLECTIONS`, refined product copy with `tagline` and `story`, added `heroIngredients`, `testimonials`, `faqs`
- `src/App.jsx` — new routes; `/b2b` redirects to `/trade`
- `src/index.css` — full design system: tokens, paper grain, typography helpers, components
- `tailwind.config.js` — full theme with brand tokens, custom shadows, marquee animation
- `index.html` — preconnects + the variable Fraunces / Outfit / JetBrains Mono fonts

### Bugs fixed along the way
1. **Carts no longer evaporate on tab close** (`sessionStorage` → `localStorage`).
2. **Order references are unique per customer.** The old localStorage counter generated duplicate refs across customers (every visitor started at the same number on their device). Now uses `crypto.randomUUID` with a timestamp prefix: `TO-LX2K9P-A7F3B2`.
3. **Unrendered first testimonial removed**, and testimonials are now genuinely cycled through on the homepage with pagination dots.
4. **404s redirect explicitly** to `/` via `<Navigate>` instead of silently mounting `<HomePage>`.
5. **`text-slate-400` weak-contrast body text** replaced everywhere with `text-ink-soft` (`#3A3733`) which clears WCAG AA comfortably.

---

## Integration

This drops directly into the existing repo — same dependencies, same Vite/React/Tailwind setup, no new packages required.

```bash
# 1. From your repo root, copy the files in.
#    (Or unzip the bundle on top of your /src directory.)

# 2. Replace your tailwind.config.js and index.html with the versions in this bundle.

# 3. Replace the entire /src directory with the new one.

# 4. No new dependencies. Just:
npm install
npm run dev
```

Fonts are loaded via Google Fonts in `index.html` — no font files to ship.

The Web3Forms key is still in `src/data/products.js` (`WEB3FORMS_KEY`) — same key as before, since rotating it is your call. Worth knowing: it's spammable from the client side. If that becomes a problem, move the form submission behind a tiny serverless function with the key in env vars.

---

## What I'd build next

A few things I deliberately didn't ship in this pass, in order of leverage:

1. **Real photography for the candle, lotion, and Firmessence products.** The product pages are designed assuming professional product photography on warm cream backgrounds (mix-blend-multiply already set up). Right now Firmessence falls back to icons; that's a placeholder.
2. **A `/journal` or `/notes` route** — short editorial content (ingredient deep-dives, ritual guides). Once you have it, link from the homepage Botany section. Brands like Aesop and Le Labo do this enormously well; it doubles as SEO.
3. **Variant-level inventory.** Right now sizes are presentational. If you start running out of the 160g candle, the site can't represent that yet.
4. **Email capture.** The current site has none. A single quiet email field in the footer ("Notes from the studio — once a month") would be worth adding.
5. **Server-side checkout.** Web3Forms is fine while volume is low. Once you start losing orders to spam or duplicate submissions, switch to Stripe + a serverless function.

— end —
