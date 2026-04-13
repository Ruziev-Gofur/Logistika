import { useState, useEffect, useRef, useCallback } from 'react'

// ─── DATA ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Home', href: 'home' },
  { label: 'Services', href: 'services' },
  { label: 'About', href: 'about' },
  { label: 'Why Us', href: 'why-us' },
  { label: 'Contact', href: 'contact' },
]

const SERVICES = [
  {
    icon: '🚛',
    title: 'Full Truckload (FTL)',
    tag: 'Most Popular',
    desc:
      'Dedicated truck capacity for large shipments. One client, one truck — maximum speed and security from origin to destination.',
  },
  {
    icon: '📦',
    title: 'Less-Than-Truckload (LTL)',
    tag: null,
    desc:
      'Share trailer space with other shippers and reduce freight costs without sacrificing reliability or delivery windows.',
  },
  {
    icon: '🚚',
    title: 'Auto Transportation ',
    tag: null,
    desc:
      'Auto transportation refers to the movement of people and goods using motor vehicles such as cars, trucks, buses, and motorcycles.',
  },
  {
    icon: '❄️',
    title: 'Reefer / Temperature Control',
    tag: null,
    desc:
      'Specialized refrigerated freight services maintaining precise temperature conditions from pickup to final delivery.',
  },
  {
    icon: '🏗️',
    title: 'Flatbed & Oversized',
    tag: null,
    desc:
      'Heavy haul, oversized, and project cargo transported safely with specialized equipment and expert rigging.',
  },
  {
    icon: '⚡',
    title: 'Expedited Freight',
    tag: '24/7',
    desc:
      'When minutes matter. Time-critical freight handled with precision — your urgent cargo arrives safely and on schedule.',
  },
  {
    icon: '🏭',
    title: 'Warehousing & Storage',
    tag: null,
    desc:
      'Secure, strategically located facilities with flexible short- and long-term storage, cross-docking, and distribution.',
  },
  {
    icon: '📊',
    title: 'Inventory Management',
    tag: null,
    desc:
      'Real-time inventory tracking and management to streamline your supply chain, reduce errors, and boost efficiency.',
  },
]

const STATS = [
  { value: '15+', label: 'Years in Business' },
  { value: '48', label: 'States Served' },
  { value: '500+', label: 'Trusted Clients' },
  { value: '99%', label: 'On-Time Rate' },
]

const TESTIMONIALS = [
  {
    initials: 'MR',
    name: 'Michael R.',
    title: '',
    quote:
      'Very reasonable pricing and superb service. Staff was in constant communication throughout, making the entire process seamless. Delivered exactly on time.',
  },
  {
    initials: 'SK',
    name: 'Sarah K.',
    title: '',
    quote:
      'This company did excellent shipping my vehicle with communication throughout the shipment along with very competitive pricing. This company is top notch compared to many other shippers that I have used and I highly recommend!!',
  },
  {
    initials: 'DL',
    name: 'David L.',
    title: '',
    quote:
      'V REY TRANSPORTATION LLC is our go-to partner for all cross-border shipments. Transparent, reliable, and always one step ahead of potential issues.',
  },
]

const FEATURES = [
  {
    icon: '🔒',
    title: 'Fully Licensed & Insured',
    desc:
      'MC & DOT certified carrier operating across all 48 contiguous states.',
  },
  {
    icon: '📡',
    title: 'Real-Time Tracking',
    desc:
      'Live shipment visibility from pickup to proof of delivery, around the clock.',
  },
  {
    icon: '🤝',
    title: 'Dedicated Account Reps',
    desc: 'A single point of contact who knows your business inside and out.',
  },
  {
    icon: '💰',
    title: 'Competitive Pricing',
    desc:
      'Transparent quotes with no hidden fees. We earn your business every load.',
  },
]

// ─── HOOKS ──────────────────────────────────────────────────────────────────

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [threshold])
  return scrolled
}

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

// ─── PRIMITIVES────────────────────────────────────────────────────────

const FONT_DISPLAY = { fontFamily: "'Barlow Condensed', sans-serif" }
const FONT_BODY = { fontFamily: "'Barlow', sans-serif" }

function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
  const [ref, inView] = useInView()
  const dirs = {
    up: 'translateY(30px)',
    down: 'translateY(-30px)',
    left: 'translateX(-30px)',
    right: 'translateX(30px)',
  }
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate(0)' : dirs[direction],
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-px w-10 bg-amber-500 flex-shrink-0" />
      <span
        className="text-amber-400 text-xs tracking-[0.28em] uppercase font-semibold"
        style={FONT_BODY}
      >
        {children}
      </span>
    </div>
  )
}

function SectionHeading({ children }) {
  return (
    <h2
      className="text-white uppercase leading-[0.92] mb-5"
      style={{
        ...FONT_DISPLAY,
        fontSize: 'clamp(2.2rem,4.5vw,3.8rem)',
        fontWeight: 900,
      }}
    >
      {children}
    </h2>
  )
}

function GoldBtn({ children, onClick, full = false }) {
  return (
    <button
      onClick={onClick}
      className={`${
        full ? 'w-full' : ''
      } bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black uppercase tracking-widest px-8 py-4 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/30`}
      style={FONT_DISPLAY}
    >
      {children}
    </button>
  )
}

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const h = () => {
      const cur = NAV_LINKS.map((l) => document.getElementById(l.href))
        .filter(Boolean)
        .findLast((el) => el.getBoundingClientRect().top <= 120)
      if (cur) setActive(cur.id)
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const go = useCallback((id) => {
    scrollTo(id)
    setActive(id)
    setOpen(false)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-zinc-950/95 backdrop-blur-md border-b border-amber-500/20 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => go('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center text-xl shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow">
              🚛
            </div>
            <div className="text-left">
              <div
                className="font-black text-white text-[14px] tracking-[0.12em] leading-none"
                style={FONT_DISPLAY}
              >
                V REY TRANSPORTATION
              </div>
              <div
                className="text-amber-400 text-[10px] tracking-[0.35em] font-semibold leading-none mt-1"
                style={FONT_BODY}
              >
                LLC
              </div>
            </div>
          </button>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => go(href)}
                className={`text-[11px] tracking-[0.18em] uppercase font-semibold transition-colors duration-200 ${
                  active === href
                    ? 'text-amber-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
                style={FONT_BODY}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => go('contact')}
              className="ml-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-[11px] tracking-[0.18em] uppercase px-5 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/30"
              style={FONT_DISPLAY}
            >
              Get a Quote
            </button>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  i === 0 && open
                    ? 'rotate-45 translate-y-2'
                    : i === 1 && open
                    ? 'opacity-0'
                    : i === 2 && open
                    ? '-rotate-45 -translate-y-2'
                    : ''
                }`}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-xl lg:hidden flex flex-col items-center justify-center gap-8 transition-all duration-300 ${
          open
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <button
            key={href}
            onClick={() => go(href)}
            className="text-4xl font-black text-white hover:text-amber-400 transition-colors uppercase tracking-widest"
            style={FONT_DISPLAY}
          >
            {label}
          </button>
        ))}
        <GoldBtn onClick={() => go('contact')}>Get a Quote</GoldBtn>
      </div>
    </>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-zinc-950"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#f59e0b 1px,transparent 1px),linear-gradient(90deg,#f59e0b 1px,transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      {/* Diagonal hatching */}
      <div
        className="absolute right-0 inset-y-0 w-1/2 opacity-[0.07]"
        style={{
          background:
            'repeating-linear-gradient(-55deg,transparent,transparent 38px,rgba(245,158,11,0.4) 38px,rgba(245,158,11,0.4) 40px)',
        }}
      />
      {/* Amber glow blobs */}
      <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full bg-amber-600/6 blur-[100px] pointer-events-none" />
      {/* Left accent stripe */}
      <div className="absolute left-0 inset-y-0 w-1.5 bg-gradient-to-b from-transparent via-amber-500 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-36 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* ── Left copy ── */}
        <div>
          <div
            className="flex items-center gap-3 mb-8"
            style={{ animation: 'fadeUp .9s ease .05s both' }}
          >
            <div className="h-px w-10 bg-amber-500" />
            <span
              className="text-amber-400 text-[11px] tracking-[0.3em] uppercase font-semibold"
              style={FONT_BODY}
            >
              BROOKLYN, NY · Licensed & Insured
            </span>
          </div>

          <h1
            className="text-white leading-[0.9] mb-8"
            style={{
              ...FONT_DISPLAY,
              fontSize: 'clamp(3.4rem,8vw,6.5rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              animation: 'fadeUp .9s ease .18s both',
            }}
          >
            Moving <span className="text-amber-400">Cargo.</span>
            <br />
            Moving Business
            <br />
            <span
              style={{
                WebkitTextStroke: '2px rgba(245,158,11,.45)',
                color: 'transparent',
              }}
            >
              Forward.
            </span>
          </h1>

          <p
            className="text-zinc-400 leading-relaxed mb-10 max-w-lg"
            style={{
              ...FONT_BODY,
              fontSize: 'clamp(1rem,1.7vw,1.12rem)',
              animation: 'fadeUp .9s ease .34s both',
            }}
          >
            V REY TRANSPORTATION LLC is a full-service 3PL carrier delivering
            FTL, LTL, intermodal, reefer, and expedited freight solutions across
            all 48 contiguous states. We don't just move freight — we move your
            business forward.
          </p>

          <div
            className="flex flex-wrap gap-4 mb-12"
            style={{ animation: 'fadeUp .9s ease .5s both' }}
          >
            <GoldBtn onClick={() => scrollTo('contact')}>
              Get a Free Quote
            </GoldBtn>
            <button
              onClick={() => scrollTo('services')}
              className="border border-zinc-700 hover:border-amber-500/50 text-zinc-300 hover:text-white font-semibold uppercase tracking-widest px-8 py-4 rounded-xl text-sm transition-all duration-200"
              style={FONT_DISPLAY}
            >
              Our Services
            </button>
          </div>

          <div
            className="flex flex-wrap gap-6 pt-8 border-t border-zinc-800"
            style={{ animation: 'fadeUp .9s ease .65s both' }}
          >
            {[
              'DOT Certified',
              'MC Licensed',
              'Fully Insured',
              'US & Canada',
            ].map((b) => (
              <div key={b} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span
                  className="text-zinc-500 text-[11px] tracking-[0.18em] uppercase"
                  style={FONT_BODY}
                >
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right — mock tracking card ── */}
        <FadeIn direction="right" delay={250} className="hidden lg:block">
          <div className="relative">
            <div className="absolute top-6 left-6 right-0 bottom-0 rounded-2xl border border-amber-500/10 bg-amber-500/4" />
            <div className="absolute top-3 left-3 right-0 bottom-0 rounded-2xl border border-amber-500/8 bg-amber-500/3" />

            <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
              {/* Top bar */}
              <div className="h-1 -mx-8 -mt-8 mb-7 rounded-t-2xl bg-gradient-to-r from-amber-500 to-amber-400" />

              <div className="flex items-center justify-between mb-6">
                <div>
                  <div
                    className="text-zinc-500 text-[10px] tracking-widest uppercase mb-1"
                    style={FONT_BODY}
                  >
                    Shipment Status
                  </div>
                  <div
                    className="text-white font-bold text-lg"
                    style={FONT_DISPLAY}
                  >
                    V REY TRANSPORTATION LLC
                  </div>
                </div>
                <div
                  className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wider"
                  style={FONT_BODY}
                >
                  IN TRANSIT
                </div>
              </div>

              {/* Route */}
              <div className="flex items-center gap-3 mb-6 p-4 bg-zinc-800/50 rounded-xl">
                <div className="text-center">
                  <div
                    className="text-amber-400 font-black text-xl"
                    style={FONT_DISPLAY}
                  >
                    PIT
                  </div>
                  <div
                    className="text-zinc-500 text-[10px] tracking-widest"
                    style={FONT_BODY}
                  >
                    Pittsburgh
                  </div>
                </div>
                <div className="flex-1 flex items-center gap-1">
                  <div className="h-px flex-1 border-t border-dashed border-zinc-600" />
                  <span className="text-xl">🚛</span>
                  <div className="h-px flex-1 border-t border-dashed border-zinc-600" />
                </div>
                <div className="text-center">
                  <div
                    className="text-white font-black text-xl"
                    style={FONT_DISPLAY}
                  >
                    LAX
                  </div>
                  <div
                    className="text-zinc-500 text-[10px] tracking-widest"
                    style={FONT_BODY}
                  >
                    Los Angeles
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-zinc-500 text-xs" style={FONT_BODY}>
                    Delivery Progress
                  </span>
                  <span
                    className="text-amber-400 text-xs font-semibold"
                    style={FONT_BODY}
                  >
                    68%
                  </span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                    style={{ width: '68%' }}
                  />
                </div>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  ['Cargo Type', 'Full Truckload'],
                  ['Weight', '42,000 lbs'],
                  ['ETA', 'Apr 13, 2026'],
                  ['Status', 'On Schedule'],
                ].map(([k, v]) => (
                  <div key={k} className="bg-zinc-800/60 rounded-xl p-3">
                    <div
                      className="text-zinc-500 text-[10px] tracking-widest uppercase mb-1"
                      style={FONT_BODY}
                    >
                      {k}
                    </div>
                    <div
                      className="text-white text-sm font-semibold"
                      style={FONT_BODY}
                    >
                      {v}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollTo('contact')}
                className="w-full border border-amber-500/30 hover:border-amber-500 text-amber-400 hover:text-amber-300 text-xs font-bold tracking-widest uppercase py-3 rounded-xl transition-all duration-200"
                style={FONT_DISPLAY}
              >
                Track Your Shipment →
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          className="text-zinc-700 text-[10px] tracking-[0.3em] uppercase"
          style={FONT_BODY}
        >
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-amber-500/60 to-transparent" />
      </div>

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </section>
  )
}

// ─── STATS BAR ────────────────────────────────────────────────────────────────

function StatsBar() {
  return (
    <div className="bg-amber-500 py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {STATS.map((s, i) => (
          <FadeIn key={i} delay={i * 70}>
            <div
              className="font-black text-zinc-950 leading-none mb-2"
              style={{ ...FONT_DISPLAY, fontSize: 'clamp(2.4rem,5vw,3.5rem)' }}
            >
              {s.value}
            </div>
            <div
              className="text-zinc-800 text-[11px] tracking-[0.22em] uppercase font-semibold"
              style={FONT_BODY}
            >
              {s.label}
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section
      id="services"
      className="bg-zinc-950 py-28 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(#f59e0b 1px,transparent 1px),linear-gradient(90deg,#f59e0b 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <FadeIn className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-amber-500" />
            <span
              className="text-amber-400 text-[11px] tracking-[0.28em] uppercase font-semibold"
              style={FONT_BODY}
            >
              What We Offer
            </span>
            <div className="h-px w-10 bg-amber-500" />
          </div>
          <h2
            className="text-white uppercase mb-5"
            style={{
              ...FONT_DISPLAY,
              fontSize: 'clamp(2.4rem,5vw,4rem)',
              fontWeight: 900,
            }}
          >
            Our <span className="text-amber-400">Services</span>
          </h2>
          <p
            className="text-zinc-500 max-w-xl mx-auto leading-relaxed"
            style={FONT_BODY}
          >
            End-to-end logistics solutions engineered around your supply chain —
            from single loads to managed transportation programs.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <FadeIn key={i} delay={i * 55}>
              <div className="group relative bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-900 hover:shadow-xl hover:shadow-amber-500/5 h-full flex flex-col">
                {s.tag && (
                  <div
                    className="absolute top-4 right-4 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                    style={FONT_BODY}
                  >
                    {s.tag}
                  </div>
                )}
                <div className="text-4xl mb-5">{s.icon}</div>
                <h3
                  className="text-white font-bold text-lg mb-3 uppercase tracking-wide"
                  style={FONT_DISPLAY}
                >
                  {s.title}
                </h3>
                <p
                  className="text-zinc-500 text-sm leading-relaxed flex-1"
                  style={FONT_BODY}
                >
                  {s.desc}
                </p>
                <div className="mt-5 h-0.5 w-8 bg-amber-500 group-hover:w-full transition-all duration-500 rounded-full" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="bg-zinc-900 py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-20 items-center">
        <FadeIn direction="left">
          <Eyebrow>About V REY TRANSPORTATION LLC</Eyebrow>
          <SectionHeading>
            Your Strategic
            <br />
            <span className="text-amber-400">Logistics Partner</span>
          </SectionHeading>
          <p className="text-zinc-400 leading-relaxed mb-5" style={FONT_BODY}>
            V REY TRANSPORTATION LLC is a Brooklyn-based carrier and
            full-service logistics provider built on a bedrock of honesty,
            integrity, and an unwavering commitment to delivering on time, every
            time.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-8" style={FONT_BODY}>
            We don't just move freight — we become a strategic extension of your
            supply chain. From spot loads to long-term managed programs, every
            solution is tailored to your exact operational needs.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-10">
            {[
              {
                icon: '🎯',
                label: 'Mission-Driven',
                text:
                  'Every load treated with the same dedication as the last.',
              },
              {
                icon: '⚖️',
                label: 'Integrity First',
                text: 'Transparent pricing, honest timelines, no surprises.',
              },
              {
                icon: '🔧',
                label: 'Built for Scale',
                text: 'From single loads to complex multi-lane programs.',
              },
              {
                icon: '🌐',
                label: 'Nationwide Reach',
                text: 'Coverage across all 48 contiguous US states.',
              },
            ].map(({ icon, label, text }) => (
              <div
                key={label}
                className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4"
              >
                <div className="text-2xl mb-2">{icon}</div>
                <div
                  className="text-white font-bold text-sm mb-1 uppercase tracking-wide"
                  style={FONT_DISPLAY}
                >
                  {label}
                </div>
                <div
                  className="text-zinc-500 text-xs leading-relaxed"
                  style={FONT_BODY}
                >
                  {text}
                </div>
              </div>
            ))}
          </div>
          <GoldBtn onClick={() => scrollTo('contact')}>Work With Us</GoldBtn>
        </FadeIn>

        <FadeIn direction="right" delay={150}>
          <div className="relative">
            <div className="absolute -inset-4 bg-amber-500/5 rounded-3xl blur-2xl" />
            <div className="relative bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-1.5 bg-gradient-to-r from-amber-500 to-amber-400" />
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-zinc-800">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-amber-500/20">
                    🚛
                  </div>
                  <div>
                    <div
                      className="text-white font-black text-xl tracking-wider uppercase"
                      style={FONT_DISPLAY}
                    >
                      V REY TRANSPORTATION LLC
                    </div>
                    <div
                      className="text-amber-400 text-[11px] tracking-widest font-semibold mt-0.5"
                      style={FONT_BODY}
                    >
                      BROOKLYN, NY
                    </div>
                  </div>
                </div>

                <div className="space-y-5 mb-8">
                  {[
                    ['USDOT Number', '4051430'],
                    ['Phone', '347-853-2299'],
                    ['Address', '80 AVENUE P APT E10 BROOKLYN, NY 11204'],
                    ['Coverage', '48 Contiguous States'],
                    [
                      'Specialties',
                      'Auto Transport · Dry Van · Reefer · Flatbed',
                    ],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4"
                    >
                      <div
                        className="text-zinc-600 text-[10px] tracking-[0.2em] uppercase font-semibold min-w-[130px]"
                        style={FONT_BODY}
                      >
                        {k}
                      </div>
                      <div className="text-zinc-300 text-sm" style={FONT_BODY}>
                        {v}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {['MC Licensed', 'DOT Certified', 'Fully Insured'].map(
                    (b) => (
                      <div
                        key={b}
                        className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2.5 text-center"
                      >
                        <div
                          className="text-emerald-400 text-[10px] font-bold tracking-wide uppercase"
                          style={FONT_BODY}
                        >
                          ✓ {b}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── WHY US ───────────────────────────────────────────────────────────────────

function WhyUs() {
  return (
    <section id="why-us" className="bg-zinc-950 py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background:
            'repeating-linear-gradient(-55deg,transparent,transparent 58px,rgba(245,158,11,.3) 58px,rgba(245,158,11,.3) 60px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <FadeIn className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-amber-500" />
            <span
              className="text-amber-400 text-[11px] tracking-[0.28em] uppercase font-semibold"
              style={FONT_BODY}
            >
              V REY TRANSPORTATION LLC
            </span>
            <div className="h-px w-10 bg-amber-500" />
          </div>
          <h2
            className="text-white uppercase mb-5"
            style={{
              ...FONT_DISPLAY,
              fontSize: 'clamp(2.4rem,5vw,4rem)',
              fontWeight: 700,
            }}
          >
            The <span className="text-amber-400">V REY</span> TRANSPORTATION LLC
          </h2>
          <p
            className="text-zinc-500 max-w-xl mx-auto leading-relaxed"
            style={FONT_BODY}
          >
            Dozens of carriers can move your freight. Only one delivers the{' '}
            <br /> V REY TRANSPORTATION LLC experience.
          </p>
        </FadeIn>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {FEATURES.map((f, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-5 bg-amber-500/10 border border-amber-500/20 group-hover:border-amber-500/60 group-hover:bg-amber-500/15 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300">
                  {f.icon}
                </div>
                <h3
                  className="text-white font-bold text-lg uppercase mb-3"
                  style={{ ...FONT_DISPLAY, letterSpacing: '0.05em' }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-zinc-500 text-sm leading-relaxed"
                  style={FONT_BODY}
                >
                  {f.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Testimonials */}
        <FadeIn className="mb-10 text-center">
          <h3
            className="text-white text-3xl font-black uppercase tracking-wide"
            style={FONT_DISPLAY}
          >
            What Our Clients Say
          </h3>
        </FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={i} delay={i * 90}>
              <div className="bg-zinc-900 border border-zinc-800 hover:border-amber-500/20 rounded-2xl p-7 transition-colors duration-300 flex flex-col h-full">
                <div
                  className="text-amber-500 text-4xl font-black mb-4 leading-none"
                  style={FONT_DISPLAY}
                >
                  "
                </div>
                <p
                  className="text-zinc-400 text-sm leading-relaxed italic flex-1 mb-6"
                  style={FONT_BODY}
                >
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-zinc-800">
                  <div
                    className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xs font-black"
                    style={FONT_DISPLAY}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div
                      className="text-white font-bold text-sm"
                      style={FONT_BODY}
                    >
                      {t.name}
                    </div>
                    <div
                      className="text-amber-500 text-xs tracking-wide"
                      style={FONT_BODY}
                    >
                      {t.title}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const inputCls =
    'w-full bg-zinc-900 border border-zinc-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 transition-all duration-200 outline-none'

  return (
    <section
      id="contact"
      className="bg-zinc-900 py-28 relative overflow-hidden"
    >
      <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-20 items-start">
        {/* Left info */}
        <FadeIn direction="left">
          <Eyebrow>Get in Touch</Eyebrow>
          <SectionHeading>
            Let's Move
            <br />
            <span className="text-amber-400">Your VEHICLE</span>
          </SectionHeading>
          <p className="text-zinc-400 leading-relaxed mb-10" style={FONT_BODY}>
            Ready to get a quote or discuss your logistics needs? Our team
            responds within hours. No obligations — just straight answers and
            competitive pricing.
          </p>

          <div className="space-y-6">
            {[
              {
                icon: '📍',
                label: 'Address',
                value: '80 AVENUE P APT E10 BROOKLYN, NY 11204',
              },
              { icon: '📞', label: 'Phone', value: '347-853-2299' },
              {
                icon: '🕐',
                label: 'Hours',
                value: 'Mon–Sat: 7AM–7PM ET\nEmergency: 24/7',
              },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <div
                    className="text-amber-400 text-[10px] tracking-[0.22em] uppercase font-semibold mb-1"
                    style={FONT_BODY}
                  >
                    {label}
                  </div>
                  <div
                    className="text-zinc-300 text-sm whitespace-pre-line leading-relaxed"
                    style={FONT_BODY}
                  >
                    {value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Form */}
        <FadeIn direction="right" delay={150}>
          {sent ? (
            <div className="bg-zinc-950 border border-amber-500/30 rounded-2xl p-14 text-center">
              <div className="text-6xl mb-6">✅</div>
              <h3
                className="text-white text-3xl font-black uppercase mb-3"
                style={FONT_DISPLAY}
              >
                Message Sent!
              </h3>
              <p className="text-zinc-500" style={FONT_BODY}>
                We'll reach out within 24 hours with your custom quote.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
              className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="h-1.5 bg-gradient-to-r from-amber-500 to-amber-400" />
              <div className="p-8">
                {/* Name */}
                <div className="mb-5">
                  <label
                    className="block text-amber-400 text-[10px] tracking-[0.22em] uppercase font-semibold mb-2"
                    style={FONT_BODY}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Smith"
                    value={form.name}
                    onChange={set('name')}
                    className={inputCls}
                    style={FONT_BODY}
                  />
                </div>

                <div className="grid grid-cols-2 gap-5 mb-5">
                  <div>
                    <label
                      className="block text-amber-400 text-[10px] tracking-[0.22em] uppercase font-semibold mb-2"
                      style={FONT_BODY}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={set('email')}
                      className={inputCls}
                      style={FONT_BODY}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-amber-400 text-[10px] tracking-[0.22em] uppercase font-semibold mb-2"
                      style={FONT_BODY}
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="555-000-0000"
                      value={form.phone}
                      onChange={set('phone')}
                      className={inputCls}
                      style={FONT_BODY}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label
                    className="block text-amber-400 text-[10px] tracking-[0.22em] uppercase font-semibold mb-2"
                    style={FONT_BODY}
                  >
                    Service Needed
                  </label>
                  <select
                    value={form.service}
                    onChange={set('service')}
                    className={inputCls}
                    style={{ ...FONT_BODY, appearance: 'none' }}
                  >
                    <option value="">Select a service...</option>
                    {SERVICES.map((s) => (
                      <option key={s.title} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-7">
                  <label
                    className="block text-amber-400 text-[10px] tracking-[0.22em] uppercase font-semibold mb-2"
                    style={FONT_BODY}
                  >
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your freight — origin, destination, weight, timeline..."
                    value={form.message}
                    onChange={set('message')}
                    className={`${inputCls} resize-none`}
                    style={FONT_BODY}
                  />
                </div>

                <GoldBtn full>Send Message →</GoldBtn>
              </div>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center text-xl">
                🚛
              </div>
              <div>
                <div
                  className="font-black text-white text-xl tracking-widest uppercase leading-none"
                  style={FONT_DISPLAY}
                >
                  V REY TRANSPORTATION LLC
                </div>
                <div
                  className="text-amber-500 text-[10px] tracking-[0.28em] font-semibold mt-0.5"
                  style={FONT_BODY}
                >
                  Professional Logistics
                </div>
              </div>
            </div>
            <p
              className="text-zinc-600 text-sm leading-relaxed max-w-sm mb-3"
              style={FONT_BODY}
            >
              Brooklyn-based carrier serving all 48 contiguous states. Built on
              honesty, integrity, and on-time delivery.
            </p>
            <div className="text-zinc-700 text-xs" style={FONT_BODY}>
              USDOT #4051430 · <a href="tel:+347-853-2299">347-853-2299</a>
            </div>
          </div>

          <div>
            <div
              className="text-white font-black uppercase tracking-widest text-sm mb-4"
              style={FONT_DISPLAY}
            >
              Quick Links
            </div>
            <div className="space-y-2.5">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="block text-zinc-600 hover:text-amber-400 text-sm transition-colors"
                  style={FONT_BODY}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div
              className="text-white font-black uppercase tracking-widest text-sm mb-4"
              style={FONT_DISPLAY}
            >
              Services
            </div>
            <div className="space-y-2.5">
              {SERVICES.slice(0, 5).map((s) => (
                <div
                  key={s.title}
                  className="text-zinc-600 text-sm"
                  style={FONT_BODY}
                >
                  {s.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-zinc-700 text-xs" style={FONT_BODY}>
            © 2023-2026 by V REY TRANSPORTATION LLC
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-600 text-xs" style={FONT_BODY}>
              Dispatch available 24/7
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <style>{`* { scroll-behavior: smooth; } body { background: #09090b; } select option { background: #18181b; color: #fff; }`}</style>
      <Navbar />
      <Hero />
      <StatsBar />
      <Services />
      <About />
      <WhyUs />
      <Contact />
      <Footer />
    </>
  )
}
