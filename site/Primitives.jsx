// Icons.jsx — inline SVGs.
function ArrowRight({ size = 16, stroke = 2 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={stroke}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
function ArrowOut({ size = 14, stroke = 2 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={stroke}>
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}
function ArrowDown({ size = 14, stroke = 2 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={stroke}>
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  );
}
function Lock({ size = 14 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>
    </svg>
  );
}
function Check({ size = 14 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
function Play({ size = 14 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M6 4l14 8-14 8V4z"/>
    </svg>
  );
}
function Sparkle({ size = 14 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"/>
    </svg>
  );
}

// Reusable section primitives
function Eyebrow({ children, color = 'var(--naranja)' }) {
  return (
    <p style={{
      fontSize: '.72rem', fontWeight: 700, letterSpacing: '.15em',
      textTransform: 'uppercase', color, marginBottom: '.6rem',
    }}>{children}</p>
  );
}
function SectionTitle({ children, color = 'var(--ink)', style }) {
  return (
    <h2 style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
      fontWeight: 700, lineHeight: 1.15,
      marginBottom: '1rem', color, ...style,
    }}>{children}</h2>
  );
}

// Floating orbs decoration
function Orbs({ palette = ['var(--lila)', 'var(--menta)', 'var(--naranja)'], opacity = 0.35 }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <div className="orb a" style={{ top: '-10%', left: '-8%', width: 340, height: 340, background: palette[0], opacity }} />
      <div className="orb b" style={{ top: '40%', right: '-10%', width: 280, height: 280, background: palette[1], opacity }} />
      <div className="orb c" style={{ bottom: '-15%', left: '30%', width: 260, height: 260, background: palette[2], opacity }} />
    </div>
  );
}

// Animated counter — ramps from 0 → target when scrolled into view
function Counter({ value, prefix = '', suffix = '', duration = 1600 }) {
  const ref = React.useRef(null);
  const [display, setDisplay] = React.useState(0);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) setStarted(true);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [started]);

  React.useEffect(() => {
    if (!started) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value, duration]);

  const formatted = Number.isInteger(value) ? Math.round(display).toLocaleString('es-AR') : display.toFixed(1);
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

Object.assign(window, { ArrowRight, ArrowOut, ArrowDown, Lock, Check, Play, Sparkle, Eyebrow, SectionTitle, Orbs, Counter });
