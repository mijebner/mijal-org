// Hero.jsx — orange hero with parallax portrait, stats counters, and keyword marquee.
function Hero() {
  const [offset, setOffset] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => setOffset(Math.min(120, window.scrollY * 0.25));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const wrap = {
    background: 'var(--naranja)',
    padding: '7rem 3rem 0',
    position: 'relative',
    overflow: 'hidden',
  };
  const inner = {
    maxWidth: 1100, margin: '0 auto', width: '100%',
    display: 'grid', gridTemplateColumns: '1.15fr .85fr',
    gap: '3rem', alignItems: 'center',
    minHeight: 'calc(100vh - 14rem)',
    position: 'relative', zIndex: 2,
  };
  return (
    <section id="inicio" style={wrap}>
      {/* Decorative floating orbs in the hero */}
      <Orbs palette={['rgba(255,255,255,.35)', 'var(--lila)', 'var(--menta)']} opacity={0.45} />

      <div style={inner}>
        <div style={{ color: 'white' }} className="reveal visible">
          <p style={{ fontSize: '1.05rem', opacity: .9, marginBottom: '.3rem' }}>
            <T es="Hola, soy" en="Hi, I'm" />
          </p>
          <h1 className="hero-name" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 5.4vw, 4.2rem)',
            fontWeight: 800, fontStyle: 'italic',
            lineHeight: 1.05, marginBottom: '1.3rem',
          }}>
            <span>Mijal</span>
            <span style={{ display: 'inline-block', width: '0.35em' }}> </span>
            <span>Iastrebner</span>
          </h1>
          <p style={{
            fontSize: '1.1rem', lineHeight: 1.75, opacity: .93,
            maxWidth: 480, marginBottom: '2rem',
          }}>
            <T
              es="Acompaño líderes y organizaciones a construir estructuras que sostengan su impacto."
              en="I help leaders and organizations build structures that sustain their impact." />
          </p>
          <div style={{ display: 'flex', gap: '.8rem', flexWrap: 'wrap' }}>
            <a href="https://calendar.app.google/f3bcinMYo1Ro5Q5V6" target="_blank" rel="noopener" style={{
              display: 'inline-flex', alignItems: 'center', gap: '.5rem',
              textDecoration: 'none', fontSize: '.8rem', fontWeight: 700,
              padding: '.95rem 1.8rem', borderRadius: 8,
              textTransform: 'uppercase', letterSpacing: '.06em',
              transition: 'all .3s',
              background: 'var(--violeta)', color: 'white',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--violeta)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <T es="Agendá una llamada" en="Book a call" />
              <ArrowRight />
            </a>
            <a href="#biblioteca" style={{
              display: 'inline-flex', alignItems: 'center', gap: '.5rem',
              textDecoration: 'none', fontSize: '.8rem', fontWeight: 700,
              padding: '.95rem 1.6rem', borderRadius: 8,
              textTransform: 'uppercase', letterSpacing: '.06em',
              transition: 'all .3s',
              background: 'transparent', color: 'white',
              border: '1.5px solid rgba(255,255,255,.6)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--naranja)'; e.currentTarget.style.borderColor = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.6)'; }}>
              <T es="Explorar biblioteca" en="Explore library" />
            </a>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="parallax-portrait" style={{
            width: 340, height: 420, borderRadius: 24, overflow: 'hidden',
            background: 'var(--violeta)',
            transform: `translateY(${-offset * 0.4}px) rotate(${offset * 0.04}deg)`,
            boxShadow: '0 30px 60px rgba(30,22,57,.25)',
          }}>
            <img src="assets/portrait-laptop.png" alt="Mijal Iastrebner"
                 style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </div>

      <HeroMarquee />
      <Stats />
    </section>
  );
}

function HeroMarquee() {
  const words = [
    'estrategia', 'empatía', 'sistemas', 'liderazgo',
    'fundraising', 'claridad', 'impacto', 'comunidad',
    'sostenibilidad', 'procesos', 'equipo', 'visión',
  ];
  const wordsEn = [
    'strategy', 'empathy', 'systems', 'leadership',
    'fundraising', 'clarity', 'impact', 'community',
    'sustainability', 'process', 'team', 'vision',
  ];
  const { lang } = useLang();
  const set = lang === 'es' ? words : wordsEn;
  const track = [...set, ...set]; // duplicate for seamless loop
  return (
    <div style={{ padding: '2rem 0 1rem', position: 'relative', zIndex: 2 }}>
      <div className="marquee">
        <div className="marquee-track">
          {track.map((w, i) => (
            <span key={i} style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 3.4vw, 2.8rem)',
              fontStyle: 'italic',
              fontWeight: 600,
              color: 'rgba(255,255,255,.55)',
              display: 'inline-flex', alignItems: 'center', gap: '3rem',
            }}>
              {w}
              <span style={{
                width: 10, height: 10, borderRadius: '50%',
                background: 'var(--menta)', display: 'inline-block',
              }} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stats() {
  const stats = [
    { val: 8, prefix: '+USD ', suffix: 'M', es: 'Movilizados', en: 'Raised' },
    { val: 1800, suffix: '+',   es: 'Organizaciones impactadas', en: 'Organizations impacted' },
    { val: 77, suffix: '',      es: 'Países', en: 'Countries' },
    { val: 10000, suffix: '+',   es: 'Personas formadas', en: 'People trained' },
  ];
  return (
    <div className="reveal stagger" style={{
      background: 'var(--violeta)', padding: '2rem 3rem',
      display: 'flex', justifyContent: 'center', gap: '3rem',
      flexWrap: 'wrap',
      borderRadius: '20px 20px 0 0',
      maxWidth: 900, margin: '3rem auto 0',
      position: 'relative', zIndex: 2,
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2rem', fontWeight: 800, color: 'white', lineHeight: 1,
          }}>
            <Counter value={s.val} prefix={s.prefix || ''} suffix={s.suffix || ''} />
          </div>
          <div style={{
            fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '.1em', color: 'var(--menta)', marginTop: '.4rem',
          }}><T es={s.es} en={s.en} /></div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { Hero, HeroMarquee, Stats });
