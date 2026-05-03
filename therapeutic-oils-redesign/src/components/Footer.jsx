import React from 'react';
import { Link } from 'react-router-dom';
import { WHATSAPP_NUMBER } from '../data/products';

export default function Footer() {
  return (
    <footer className="bg-ink text-bone/80 mt-32">
      {/* Editorial closing line */}
      <div className="max-w-8xl mx-auto px-6 md:px-10 pt-20 pb-16">
        <p
          className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tightest text-bone max-w-4xl"
          style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 60" }}
        >
          Clinical hands.
          <br />
          <span className="font-display-italic text-bone/50">Daily rituals.</span>
        </p>
      </div>

      <div className="border-t border-bone/10">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <p className="eyebrow text-bone/50 mb-4">Therapeutic Oils</p>
            <p className="text-sm leading-relaxed text-bone/60 max-w-[16rem]">
              Botanical formulas, born in the physiotherapy clinic, refined for daily ritual.
              Made in Lebanon.
            </p>
          </div>

          <div>
            <p className="eyebrow text-bone/50 mb-4">Shop</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/shop" className="link-underline">All Products</Link></li>
              <li><Link to="/collections" className="link-underline">Collections</Link></li>
              <li><Link to="/science" className="link-underline">Ingredients</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-bone/50 mb-4">Brand</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="link-underline">Our Story</Link></li>
              <li><Link to="/trade" className="link-underline">Trade · Clinics & Spas</Link></li>
              <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="link-underline">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-bone/50 mb-4">Connect</p>
            <ul className="space-y-2.5 text-sm">
              <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="link-underline">WhatsApp</a></li>
              <li><a href="#" className="link-underline">Instagram</a></li>
              <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="link-underline">+961 3 203 567</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-bone/10">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-bone/40 font-mono tracking-wide">
            © {new Date().getFullYear()} THERAPEUTIC OILS · MADE IN LEBANON
          </p>
          <p className="text-xs text-bone/40 font-mono tracking-wide">
            CRUELTY FREE · PARABEN FREE · SILICONE FREE
          </p>
        </div>
      </div>
    </footer>
  );
}
