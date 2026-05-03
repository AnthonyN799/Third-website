import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

/* The wordmark — Fraunces small caps with the letter T styled
   as a delicate cypress-green accent. Replaces the stock leaf icon. */
function Wordmark({ className = '' }) {
  return (
    <Link to="/" className={`inline-flex items-baseline gap-[0.4rem] group ${className}`}>
      <span
        className="font-display text-[1.45rem] leading-none tracking-tightest"
        style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
      >
        Therapeutic
      </span>
      <span
        className="font-display-italic text-[1.45rem] leading-none text-cypress -ml-1"
        style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}
      >
        Oils
      </span>
    </Link>
  );
}

const NAV_LINKS = [
  { to: '/shop',        label: 'Shop' },
  { to: '/collections', label: 'Collections' },
  { to: '/science',     label: 'Science' },
  { to: '/about',       label: 'Story' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const transparent = isHome && !scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          transparent
            ? 'bg-transparent border-b border-transparent'
            : 'bg-bg/85 backdrop-blur-xl border-b border-sand/50'
        }`}
      >
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className={`flex items-center justify-between transition-all duration-500 ${
            transparent ? 'h-20' : 'h-16'
          }`}>
            <Wordmark />

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-[13.5px] tracking-tight transition-colors ${
                      isActive ? 'text-ink font-medium' : 'text-ink-soft hover:text-ink'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-2 md:gap-5">
              <Link
                to="/trade"
                className="hidden md:inline-flex eyebrow text-ink-mute hover:text-cypress transition-colors"
              >
                Trade →
              </Link>

              <Link
                to="/cart"
                className="relative p-2 -m-2 group"
                aria-label="Cart"
              >
                <ShoppingBag className="w-[18px] h-[18px] text-ink" strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-clay text-bone text-[10px] font-medium leading-none w-[18px] h-[18px] flex items-center justify-center rounded-full font-mono">
                    {totalItems}
                  </span>
                )}
              </Link>

              <button
                className="md:hidden p-2 -mr-2"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-bg/95 backdrop-blur-xl" />
        <div className="relative pt-24 px-8">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-display text-4xl py-3 tracking-tightest"
                style={{
                  fontVariationSettings: "'opsz' 144, 'SOFT' 50",
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.4s ${0.05 * i + 0.1}s, transform 0.4s ${0.05 * i + 0.1}s`,
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/trade"
              className="eyebrow text-ink-mute mt-8"
              style={{
                opacity: mobileOpen ? 1 : 0,
                transition: 'opacity 0.4s 0.35s',
              }}
            >
              Trade · For clinics & spas →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
