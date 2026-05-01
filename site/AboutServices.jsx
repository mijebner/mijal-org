// Custom service icons — hand-drawn style SVGs matching brand.
function IconCompass({ size = 40, stroke = 1.5 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="18" />
      <path d="M30 18 L22 22 L18 30 L26 26 Z" fill="currentColor" fillOpacity=".15" />
      <circle cx="24" cy="24" r="1.5" fill="currentColor" />
      <path d="M24 4 L24 8 M24 40 L24 44 M4 24 L8 24 M40 24 L44 24" />
    </svg>
  );
}
function IconSpark({ size = 40, stroke = 1.5 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 8 C16 8 10 14 10 22 C10 27 13 31 17 33 L17 38 L31 38 L31 33 C35 31 38 27 38 22 C38 14 32 8 24 8 Z" />
      <path d="M17 42 L31 42" />
      <path d="M20 22 L24 26 L28 22 M24 14 L24 26" strokeOpacity=".5" />
    </svg>
  );
}
function IconCircles({ size = 40, stroke = 1.5 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round">
      <circle cx="16" cy="20" r="8" />
      <circle cx="32" cy="20" r="8" />
      <circle cx="24" cy="32" r="8" />
      <circle cx="24" cy="24" r="3" fill="currentColor" fillOpacity=".2" stroke="none" />
    </svg>
  );
}

Object.assign(window, { IconCompass, IconSpark, IconCircles });

// About.jsx — cream section, prose + orbs, linked-in link-out.
function About() {
  const p = { color: 'var(--ink-light)', fontSize: '1.02rem', marginBottom: '1.1rem', lineHeight: 1.8 };
  const strong = { color: 'var(--violeta)' };
  return (
    <div style={{ background: 'var(--crema)', position: 'relative', overflow: 'hidden' }}>
      <Orbs palette={['var(--lila)', 'rgba(76,58,181,.12)', 'var(--menta)']} opacity={0.35} />
      <section id="sobre-mi" style={{
        maxWidth: 720, margin: '0 auto', padding: '6rem 3rem',
        position: 'relative', zIndex: 2,
      }}>
        <div className="reveal">
          <Eyebrow><T es="Sobre mí" en="About me" /></Eyebrow>
          <SectionTitle color="var(--violeta)">
            <T es="Estrategia, empatía y sistemas prácticos"
               en="Strategy, empathy, and practical systems" />
          </SectionTitle>
        </div>
        <div className="reveal stagger" style={{ marginTop: '1.5rem' }}>
          <p style={p}><T
            es={<>Cofundé y dirigí <strong style={strong}>SembraMedia</strong> (2015–2024) y movilizamos +USD 8M para medios y organizaciones en América Latina.</>}
            en={<>I co-founded and led <strong style={strong}>SembraMedia</strong> (2015–2024), where we raised over USD 8M for media organizations across Latin America.</>} />
          </p>
          <p style={p}><T
            es={<>Diseñé y facilité programas con <strong style={strong}>Google News Initiative, Meta, UNESCO, DW Akademie</strong> y la oficina del <strong style={strong}>Alto Comisionado de Naciones Unidas para los Derechos Humanos</strong>.</>}
            en={<>I've designed programs with <strong style={strong}>Google News Initiative, Meta, UNESCO, DW Akademie</strong>, and the <strong style={strong}>UN Office of the High Commissioner for Human Rights</strong>.</>} />
          </p>
          <p style={p}><T
            es="Combino estrategia, empatía y sistemas prácticos para sostener el crecimiento de los equipos."
            en="I combine strategy, empathy, and practical systems to sustain team growth." />
          </p>
          <a href="https://www.linkedin.com/in/mijebner/" target="_blank" rel="noopener"
             className="link-underline"
             style={{
               color: 'var(--violeta)', fontWeight: 700, fontSize: '.9rem',
               textDecoration: 'none', marginTop: '.5rem', display: 'inline-flex',
             }}>
            <T es="Encontrame en LinkedIn" en="Find me on LinkedIn" />
            <ArrowOut />
          </a>
        </div>
      </section>
    </div>
  );
}

// Services.jsx — 3 filled cards with richer hover (image swap of orb, CTA arrow push).
function Services() {
  const items = [
    {
      Icon: IconCompass,
      name: { es: 'Consultoría estratégica para organizaciones', en: 'Strategic consulting for organizations' },
      desc: { es: 'Diseño y ordeno estrategias de financiamiento, liderazgo y gestión para proyectos de impacto.',
              en: 'I design and organize fundraising, leadership, and management strategies for impact projects.' },
      forWho: { es: 'Para equipos que necesitan claridad para decidir, priorizar y sostener su trabajo en el tiempo.',
                en: 'For teams that need clarity to decide, prioritize, and sustain their work.' },
      bg: 'var(--violeta)', fg: 'white', accent: 'var(--menta)',
    },
    {
      Icon: IconSpark,
      name: { es: 'Mentorías individuales', en: '1:1 Mentoring' },
      desc: { es: 'Espacios uno a uno para pensar decisiones profesionales y de liderazgo.',
              en: 'One-on-one spaces to think through professional and leadership decisions.' },
      forWho: { es: 'Para líderes que quieren ordenar ideas, destrabar dilemas y definir próximos pasos.',
                en: 'For leaders who want to organize ideas, unblock dilemmas, and define next steps.' },
      bg: 'var(--menta)', fg: 'var(--ink)', accent: 'var(--violeta)',
    },
    {
      Icon: IconCircles,
      name: { es: 'Talleres y mentorías grupales', en: 'Group workshops' },
      desc: { es: 'Procesos colectivos sobre liderazgo, fundraising y trabajo con equipos.',
              en: 'Collective processes on leadership, fundraising, and teamwork.' },
      forWho: { es: 'Para organizaciones y cohortes que buscan fortalecer capacidades estratégicas.',
                en: 'For organizations and cohorts looking to strengthen strategic capabilities.' },
      bg: 'var(--lila)', fg: 'var(--ink)', accent: 'var(--violeta)',
    },
  ];

  return (
    <div style={{ background: 'var(--blanco)', position: 'relative' }}>
      <section id="servicios" style={{ maxWidth: 1100, margin: '0 auto', padding: '6rem 3rem' }}>
        <div className="reveal">
          <Eyebrow><T es="Servicios" en="Services" /></Eyebrow>
          <SectionTitle><T es="Cómo puedo ayudarte" en="How I can help" /></SectionTitle>
        </div>
        <div className="reveal stagger" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem', marginTop: '2.5rem',
        }}>
          {items.map((it, i) => <ServiceCard key={i} {...it} />)}
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ Icon, name, desc, forWho, bg, fg, accent }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        padding: '2rem 1.8rem', borderRadius: 20,
        background: bg, color: fg,
        display: 'flex', flexDirection: 'column',
        transition: 'all .4s var(--ease-soft)',
        transform: hover ? 'translateY(-6px)' : 'none',
        boxShadow: hover ? '0 20px 40px rgba(30,22,57,.15)' : 'none',
        position: 'relative', overflow: 'hidden',
      }}>
      {/* Decorative ring that scales on hover */}
      <div style={{
        position: 'absolute',
        top: -80, right: -80, width: 200, height: 200, borderRadius: '50%',
        border: `1.5px solid ${accent}`, opacity: .3,
        transform: hover ? 'scale(1.2)' : 'scale(1)',
        transition: 'transform .6s var(--ease-soft)',
        pointerEvents: 'none',
      }} />
      <span style={{
        color: accent, marginBottom: '1rem',
        transform: hover ? 'rotate(-8deg) scale(1.08)' : 'none',
        transition: 'transform .45s var(--ease-soft)',
        display: 'inline-flex', transformOrigin: 'left',
      }}><Icon size={40} /></span>
      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.3rem', fontWeight: 700, marginBottom: '.8rem',
        lineHeight: 1.25, color: 'inherit',
      }}><T es={name.es} en={name.en} /></h3>
      <p style={{ fontSize: '.9rem', lineHeight: 1.7, opacity: .88, marginBottom: '.7rem' }}>
        <T es={desc.es} en={desc.en} />
      </p>
      <p style={{ fontSize: '.78rem', fontStyle: 'italic', opacity: .65, lineHeight: 1.55, flexGrow: 1 }}>
        <T es={forWho.es} en={forWho.en} />
      </p>
      <a href="#contacto" className="link-underline" style={{
        marginTop: '1.2rem', color: accent, fontSize: '.75rem', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '.08em', textDecoration: 'none',
        width: 'fit-content',
      }}>
        <T es="Quiero saber más" en="Learn more" />
        <ArrowRight size={13} />
      </a>
    </div>
  );
}

Object.assign(window, { About, Services, ServiceCard });
