// ════════════════════════════════════════════════════
// PRODUCT & CONTENT DATA
// ════════════════════════════════════════════════════

/* ── COLLECTIONS ────────────────────────────────────
   The new IA. Three "rooms" the customer can enter,
   each speaking to a different mode of use. Physio
   credibility threads through all three.
   ─────────────────────────────────────────────────── */
export const COLLECTIONS = {
  ritual: {
    id: 'ritual',
    name: 'Home Ritual',
    eyebrow: 'For everyday',
    tagline: 'Lotions, candles, oils — for the hours that are yours.',
    description:
      'The sensorial line. Botanical lotions, soy massage candles, conditioning oils — designed for the bath, the bedside, the slow Sunday.',
  },
  active: {
    id: 'active',
    name: 'Active Care',
    eyebrow: 'For the body in motion',
    tagline: 'Cooling, warming, recovery — used in the clinic, made for home.',
    description:
      'The performance line. Cooling gels and warming creams that physiotherapists reach for between sessions. Now in your gym bag.',
  },
  refine: {
    id: 'refine',
    name: 'Body Refinement',
    eyebrow: 'For visible care',
    tagline: 'Cypress-based formulas for tone, texture, and skin condition.',
    description:
      'Targeted skin-conditioning creams and oils. Botanical actives, professional concentrations, daily use.',
  },
};

/* ── CATEGORIES (legacy filter on shop page) ──────── */
export const SHOP_CATEGORIES = [
  'All',
  'Home Ritual',
  'Active Care',
  'Body Refinement',
];

/* ── HERO TESTIMONIALS ────────────────────────────── */
export const testimonials = [
  {
    id: 1,
    quote:
      'The cooling lasts past fifty minutes from a single application. My patients ask for it by name.',
    author: 'Dr. Ralph J. Ghosn',
    role: 'Physiotherapist · Beirut',
    product: 'Pure Ice Gel',
  },
  {
    id: 2,
    quote:
      'Most of my patients ask to take a tube home after their session. It became part of their routine.',
    author: 'Marie-Joe Eid',
    role: 'Physiotherapist · Jounieh',
    product: 'Pure Ice Gel',
  },
  {
    id: 3,
    quote:
      'The glide is calibrated. No early drying, no greasy residue. After twenty years, that matters.',
    author: 'Karim Haddad',
    role: 'Sports Therapist · Achrafieh',
    product: 'Targeted Massage Oil',
  },
];

/* ── SHOP ITEMS ────────────────────────────────────
   Each product now belongs to a collection. Copy
   has been tightened — sensorial first, clinical second.
   ─────────────────────────────────────────────────── */
export const shopItems = [
  {
    id: 107,
    slug: 'hydrating-body-lotion',
    name: 'Hydrating Body Lotion',
    collection: 'ritual',
    price: 15,
    image: 'https://i.imgur.com/0uT5x4C.png',
    description: 'Aloe vera base · 500mL pump bottle',
    tagline: 'Velvet finish. Daily wear.',
    iconName: 'Sparkles',
    iconColor: 'text-cypress-soft',
    scents: ['Aloe Vera', 'Vanilla', 'Chamomile'],
    sizes: null,
    categories: ['Home Ritual'],
    details: {
      ingredients: ['Aloe Barbadensis Leaf', 'Vitamin E', 'Botanical extracts'],
      usage:
        'Apply generously to clean skin, morning or evening. The aloe base absorbs without residue, leaving skin conditioned and soft.',
      story:
        'Built to be the body lotion physiotherapists could recommend without hesitation. Then we realized it belonged at home.',
    },
  },
  {
    id: 101,
    slug: 'premium-massage-candle',
    name: 'Premium Massage Candle',
    collection: 'ritual',
    price: null,
    image: 'https://imgur.com/OJsrnB1.png',
    description: 'Natural soy wax · pour temperature 38°C',
    tagline: 'Light it. Pour it. Wear it.',
    iconName: 'Flame',
    iconColor: 'text-clay',
    scents: ['Vanilla', 'Chamomile', 'Oud', 'Musk', 'Unscented'],
    sizes: [
      { label: 'Standard · 80g', price: 12 },
      { label: 'Large · 160g', price: 17 },
    ],
    categories: ['Home Ritual'],
    details: {
      ingredients: ['Natural soy wax', 'Essential oils', 'Cotton wick', 'Shea butter'],
      usage:
        'Light the wick. After ten to fifteen minutes, blow out the flame and pour the warm oil directly onto the skin.',
      story:
        'A candle, until it isn\'t. The soy-shea blend melts at body-comfortable temperature — wax becomes massage oil, ritual becomes practice.',
    },
  },
  {
    id: 102,
    slug: 'targeted-massage-oil',
    name: 'Targeted Massage Oil',
    collection: 'ritual',
    price: 14,
    image: 'https://imgur.com/4D9PFvq.png',
    description: 'Deep tissue blend · 250mL',
    tagline: 'Glide. Warmth. Calibration.',
    iconName: 'Droplets',
    iconColor: 'text-cypress',
    scents: ['Vanilla', 'Chamomile', 'Oud', 'Musk', 'Unscented'],
    sizes: null,
    categories: ['Home Ritual', 'Active Care'],
    details: {
      ingredients: ['Wintergreen essential oil', 'Rosemary extract', 'Carrier oil blend'],
      usage:
        'Warm a small amount between palms. Apply with broad strokes, then circular pressure. Reapply as glide diminishes.',
      story:
        'Engineered for the hands of professionals, then quietly adopted at home by their clients.',
    },
  },
  {
    id: 103,
    slug: 'pure-ice-gel',
    name: 'Pure Ice Gel',
    collection: 'active',
    price: 12,
    image: 'https://i.imgur.com/XXfbpzI.png',
    description: 'Cooling formula · 100mL professional tube',
    tagline: 'Fifty minutes of cool.',
    iconName: 'Wind',
    iconColor: 'text-cypress-soft',
    scents: null,
    sizes: null,
    categories: ['Active Care'],
    details: {
      ingredients: ['Menthol', 'Eucalyptus globulus leaf oil', 'Cooling complex'],
      usage:
        'Apply a thin layer to the area. The cooling sensation begins immediately and sustains beyond fifty minutes.',
      story:
        'Our flagship clinic product. The reason most of our customers learned the brand existed.',
    },
  },
  {
    id: 104,
    slug: 'actiflam-cream',
    name: 'Actiflam Cream',
    collection: 'active',
    price: 12,
    image: 'https://imgur.com/YjGjz0G.png',
    description: 'Warming rosemary formula · 100mL',
    tagline: 'A botanical warmth, not a sting.',
    iconName: 'Flame',
    iconColor: 'text-clay',
    scents: null,
    sizes: null,
    categories: ['Active Care'],
    details: {
      ingredients: ['Wintergreen essential oil', 'Rosemary essential oil', 'Warming complex'],
      usage:
        'Massage a thin layer into the area before activity, or after, to encourage circulation and prepare tissue.',
      story:
        'Designed as a clinic-grade warming companion to Pure Ice. Used together, they bookend a session.',
    },
  },
  {
    id: 105,
    slug: 'firmessence-cream',
    name: 'Firmessence Cream',
    collection: 'refine',
    price: 14,
    image: null,
    description: 'Skin conditioning with cypress · 100mL',
    tagline: 'Cypress, distilled into daily care.',
    iconName: 'Leaf',
    iconColor: 'text-cypress',
    scents: null,
    sizes: null,
    categories: ['Body Refinement'],
    details: {
      ingredients: ['Cypress essential oil', 'Shea butter base', 'Skin conditioning complex'],
      usage:
        'Massage into target areas twice daily, in slow circular motions. Continue for at least four weeks for full conditioning effect.',
      story:
        'Cypress oil has been used for skin tone for centuries. We built a cream around it that feels modern.',
    },
  },
  {
    id: 106,
    slug: 'firmessence-oil',
    name: 'Firmessence Oil',
    collection: 'refine',
    price: 14,
    image: null,
    description: 'Vitamin E enriched · 250mL',
    tagline: 'A massage oil with a second job.',
    iconName: 'Droplets',
    iconColor: 'text-cypress-soft',
    scents: null,
    sizes: null,
    categories: ['Body Refinement'],
    details: {
      ingredients: ['Cypress essential oil', 'Vitamin E', 'Nourishing oil base'],
      usage:
        'Apply to slightly damp skin during massage for enhanced absorption. The oil conditions while it glides.',
      story:
        'The oil counterpart to Firmessence Cream. Built for the slower hand of a massage rather than a quick application.',
    },
  },
];

/* ── INGREDIENT STORY (used on Science page) ─────── */
export const heroIngredients = [
  {
    name: 'Cypress',
    latin: 'Cupressus sempervirens',
    note: 'Cell-conditioning · skin tone',
    in: ['Firmessence Cream', 'Firmessence Oil'],
    description:
      'Distilled from the needles. Traditionally used for skin tone and visible firmness; the woody backbone of our refinement line.',
  },
  {
    name: 'Eucalyptus',
    latin: 'Eucalyptus globulus',
    note: 'Cooling · respiratory',
    in: ['Pure Ice Gel'],
    description:
      'Pairs with menthol to extend the cooling window past forty minutes. Clean, sharp, unmistakable.',
  },
  {
    name: 'Rosemary',
    latin: 'Salvia rosmarinus',
    note: 'Warming · circulatory',
    in: ['Actiflam Cream', 'Targeted Massage Oil'],
    description:
      'The botanical engine of our warming formulas. Builds heat gradually, without the sting of synthetic counterirritants.',
  },
  {
    name: 'Aloe Vera',
    latin: 'Aloe barbadensis',
    note: 'Hydration · barrier support',
    in: ['Hydrating Body Lotion'],
    description:
      'Forms the velvet base of the body lotion. Carries actives without occluding the skin.',
  },
];

/* ── FAQ ───────────────────────────────────────────── */
export const faqs = [
  {
    q: 'Are these products professional-grade?',
    a: 'Every formula is developed for clinical use first. The same products are used by physiotherapists, osteopaths, and sports therapists across Lebanon — the consumer line is identical.',
  },
  {
    q: 'Are the products tested on animals?',
    a: 'No. Cruelty-free, formulated with cosmetic-grade botanical ingredients, and free from parabens and synthetic fragrance.',
  },
  {
    q: 'Are they safe for sensitive skin?',
    a: 'The formulations are designed to be non-sensitizing for therapists who apply product twenty or more times a day. Patch test if you have known sensitivities to essential oils.',
  },
  {
    q: 'Do you offer wholesale to clinics and spas?',
    a: 'Yes — our trade programme serves clinics, gyms, and spas across Lebanon. Visit the Trade page or use the inquiry form for our B2B price list.',
  },
  {
    q: 'Where are the products made?',
    a: 'Made in Lebanon. Botanical ingredients are sourced regionally where possible.',
  },
];

/* ── CONFIG ────────────────────────────────────────── */
export const DELIVERY_FEE = 3.0;
export const FREE_DELIVERY_THRESHOLD = 50.0;
export const WHATSAPP_NUMBER = '9613203567';
export const WEB3FORMS_KEY = 'f23546d0-7c35-4655-adee-b6af9841d1cd';

/* ── HELPERS ───────────────────────────────────────── */
export function getItemPrice(item, selectedSize) {
  if (item.sizes) {
    const size = item.sizes.find((s) => s.label === selectedSize) || item.sizes[0];
    return size.price;
  }
  return item.price;
}

export function getShopItemBySlug(slug) {
  return shopItems.find((item) => item.slug === slug) || null;
}

export function getItemsByCollection(collectionId) {
  return shopItems.filter((item) => item.collection === collectionId);
}

export function getStartingPrice(item) {
  if (item.price) return item.price;
  if (item.sizes && item.sizes.length) {
    return Math.min(...item.sizes.map((s) => s.price));
  }
  return 0;
}
