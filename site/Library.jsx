// Library.jsx — featured UNESCO guide + filterable grid.
function Library() {
  const { lang } = useLang();
  const [filter, setFilter] = React.useState('todos');

  const [modalItem, setModalItem] = React.useState(null);

  const items = [
    { id: 'unesco', featured: true,
      type: { es: 'Guía', en: 'Guide' }, typeKey: 'guia',
      year: '2025', pages: '84',
      partner: 'UNESCO × SembraMedia',
      cover: 'assets/unesco-cover.png',
      name: { es: 'Emprendimientos periodísticos y viabilidad',
              en: 'Journalism entrepreneurship and viability' },
      sub:  { es: 'Guía para mujeres líderes de medios',
              en: 'A guide for women media leaders' },
      desc: { es: 'Herramientas prácticas para diseñar, sostener y hacer crecer proyectos periodísticos.',
              en: 'Practical tools to design, sustain and grow journalism projects.' },
      link: 'https://unesdoc.unesco.org/ark:/48223/pf0000397064',
    },
    { type: { es: 'Plantilla', en: 'Template' }, typeKey: 'plantilla',
      cover: 'assets/cover-propuesta.png',
      name: { es: 'Modelo de propuesta', en: 'Proposal template' },
      desc: { es: 'Plantilla editable para estructurar propuestas de financiamiento o alianzas con claridad estratégica.',
              en: 'Editable template to structure funding proposals or partnerships clearly and strategically.' } },
    { type: { es: 'Plantilla', en: 'Template' }, typeKey: 'plantilla',
      name: { es: 'Presupuesto modelo', en: 'Budget template' },
      desc: { es: 'Plantilla lista para usar, para presentar números de manera clara y profesional ante financiadores.',
              en: 'Ready-to-use template to present budgets clearly and professionally to funders.' } },
    { type: { es: 'Guía', en: 'Guide' }, typeKey: 'guia',
      cover: 'assets/cover-disenar-sin-drama.png',
      name: { es: 'Diseñar sin drama', en: 'Design without drama' },
      desc: { es: 'Planificar proyectos de forma estratégica y realista, evitando el caos operativo y el agotamiento.',
              en: 'Plan projects strategically, avoiding chaos and burnout.' } },
    { type: { es: 'Canvas', en: 'Canvas' }, typeKey: 'canvas',
      cover: 'assets/cover-mapeo-costos.png',
      name: { es: 'Mapeo de costos', en: 'Cost mapping' },
      desc: { es: 'Herramienta visual para identificar y ordenar los costos reales de un proyecto.',
              en: 'Visual tool to identify and organize real project costs.' } },
    { type: { es: 'Decálogo', en: 'Checklist' }, typeKey: 'decalogo',
      cover: 'assets/cover-decalogo.png',
      name: { es: 'Cómo relacionarte con financiadores', en: 'How to build funder relationships' },
      desc: { es: 'Decálogo práctico para construir relaciones sólidas con potenciales financiadores.',
              en: 'Practical checklist for building solid funder relationships.' } },
  ];

  const filters = [
    { key: 'todos',     es: 'Todos',     en: 'All' },
    { key: 'guia',      es: 'Guías',     en: 'Guides' },
    { key: 'plantilla', es: 'Plantillas', en: 'Templates' },
    { key: 'canvas',    es: 'Canvas',    en: 'Canvas' },
    { key: 'decalogo',  es: 'Decálogos', en: 'Checklists' },
  ];

  const featured = items.find(i => i.featured);
  const rest = items.filter(i => !i.featured);
  const visible = filter === 'todos' ? rest : rest.filter(i => i.typeKey === filter);

  return (
    <div style={{ background: 'var(--naranja)', position: 'relative', overflow: 'hidden' }}>
      <div className="curve-top-cream" />
      <Orbs palette={['rgba(255,255,255,.3)', 'var(--lila)', 'var(--violeta)']} opacity={0.4} />

      <section id="biblioteca" style={{
        maxWidth: 1180, margin: '0 auto',
        padding: '7rem 3rem 6rem', color: 'white',
        position: 'relative', zIndex: 2,
      }}>
        <div className="reveal" style={{ maxWidth: 720 }}>
          <Eyebrow color="rgba(255,255,255,.75)">
            <T es="Guías · Plantillas · Canvas · Decálogos"
               en="Guides · Templates · Canvas · Checklists" />
          </Eyebrow>
          <SectionTitle color="white">
            <T es="Biblioteca de recursos" en="Resource library" />
          </SectionTitle>
          <p style={{ fontSize: '1rem', opacity: .92, lineHeight: 1.75, maxWidth: 620, marginTop: '.5rem' }}>
            <T es="Años de acompañar organizaciones me dejaron herramientas prácticas que hoy comparto. Sin rodeos, sin jerga innecesaria."
               en="Years of supporting organizations left me with practical tools I now share openly. No jargon, no fluff." />
          </p>
        </div>

        {/* Featured UNESCO guide */}
        {featured && <FeaturedGuide item={featured} lang={lang} onOpen={() => setModalItem(featured)} />}

        {/* Filter chips */}
        <div className="reveal" style={{
          display: 'flex', gap: '.5rem', flexWrap: 'wrap',
          marginTop: '4rem', marginBottom: '1.8rem',
        }}>
          {filters.map(f => (
            <button key={f.key}
              onClick={() => setFilter(f.key)}
              className={'chip ' + (filter === f.key ? 'active' : '')}>
              <T es={f.es} en={f.en} />
            </button>
          ))}
        </div>

        {/* Grid — no re-mount on filter change */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1rem',
        }}>
          {visible.map((it, i) => <LibCard key={it.typeKey + '-' + i} item={it} onOpen={() => setModalItem(it)} />)}
        </div>

        <p style={{ marginTop: '2rem', fontSize: '.85rem', opacity: .85 }}>
          <T es={<><strong style={{ opacity: 1 }}>Muchos de estos recursos son gratuitos.</strong> Hacé clic para pedirlos.</>}
             en={<><strong style={{ opacity: 1 }}>Many of these resources are free.</strong> Click to request them.</>} />
        </p>
      </section>

      {modalItem && <ResourceModal item={modalItem} onClose={() => setModalItem(null)} />}
    </div>
  );
}

function FeaturedGuide({ item, lang, onOpen }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button type="button"
       onClick={onOpen}
       onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
       className="reveal featured-guide"
       style={{
         display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2.5rem',
         alignItems: 'center', marginTop: '3rem', padding: '2rem',
         background: 'rgba(255,255,255,.08)',
         border: '1px solid rgba(255,255,255,.18)',
         borderRadius: 24, color: 'white',
         backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
         transition: 'all .4s var(--ease-soft)',
         transform: hover ? 'translateY(-4px)' : 'none',
         boxShadow: hover ? '0 30px 60px rgba(30,22,57,.3)' : 'none',
         cursor: 'pointer', textAlign: 'left', font: 'inherit', width: '100%',
       }}>
      {/* Real UNESCO cover */}
      <div style={{
        aspectRatio: '3 / 4',
        width: '100%',
        borderRadius: 14, overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 25px 50px rgba(30,22,57,.35), inset 4px 0 8px rgba(0,0,0,.15)',
        transform: hover ? 'rotate(-2deg) scale(1.03)' : 'rotate(-1deg)',
        transition: 'transform .5s var(--ease-soft)',
        background: 'white',
      }}>
        {/* spine */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: 'rgba(0,0,0,.18)', zIndex: 2 }} />
        <img src="assets/unesco-cover.png" alt="Media Startups and Viability — A Guide for Women Leaders"
             style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>

      <div>
        <div style={{ display: 'flex', gap: '.6rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span style={{
            padding: '.3rem .7rem', borderRadius: 999,
            background: 'var(--menta)', color: 'var(--ink)',
            fontSize: '.65rem', fontWeight: 700, letterSpacing: '.12em',
            textTransform: 'uppercase',
          }}>
            <Sparkle size={10} /> <span style={{ marginLeft: 4 }}><T es="Novedad" en="New" /></span>
          </span>
          <span style={{ fontSize: '.7rem', letterSpacing: '.1em', textTransform: 'uppercase', opacity: .75 }}>
            {item.partner} · {item.year} · {item.pages} pp
          </span>
        </div>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)',
          fontWeight: 700, lineHeight: 1.15, color: 'white', marginBottom: '.5rem',
        }}>{item.name[lang]}</h3>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--violeta)',
          marginBottom: '1rem',
        }}>{item.sub[lang]}</p>
        <p style={{ fontSize: '.95rem', lineHeight: 1.7, opacity: .9, maxWidth: 560, marginBottom: '1.3rem' }}>
          {item.desc[lang]}
        </p>
        <span className="link-underline" style={{
          color: 'white', fontSize: '.78rem', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '.08em',
        }}>
          Pedir el recurso
          <ArrowOut />
        </span>
      </div>
    </button>
  );
}

function LibCard({ item, onOpen }) {
  const { type, name, desc } = item;
  const [hover, setHover] = React.useState(false);
  const { lang } = useLang();
  return (
    <button type="button"
       onClick={onOpen}
       onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
       style={{
         background: 'var(--violeta)', borderRadius: 16,
         padding: '1.5rem 1.3rem 1.3rem',
         position: 'relative', textDecoration: 'none', display: 'block',
         transition: 'all .35s var(--ease-soft)', color: 'white',
         transform: hover ? 'translateY(-4px)' : 'none',
         boxShadow: hover ? '0 16px 36px rgba(30,22,57,.28)' : 'none',
         overflow: 'hidden',
         border: 'none', cursor: 'pointer',
         font: 'inherit', textAlign: 'left', width: '100%',
       }}>
      {/* decorative corner */}
      <div style={{
        position: 'absolute', top: -50, right: -50, width: 140, height: 140,
        borderRadius: '50%', background: 'rgba(181,226,225,.12)',
        transform: hover ? 'scale(1.3)' : 'scale(1)',
        transition: 'transform .6s var(--ease-soft)',
      }} />
      <span style={{
        position: 'absolute', top: 14, right: 14,
        width: 26, height: 26, borderRadius: '50%',
        border: `1.5px solid ${hover ? 'white' : 'rgba(255,255,255,.35)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hover ? 'white' : 'rgba(255,255,255,.6)',
        fontSize: '1rem',
        transition: 'all .35s var(--ease-soft)',
        transform: hover ? 'rotate(90deg)' : 'rotate(0)',
        zIndex: 2,
      }}>+</span>
      <p style={{
        fontSize: '.6rem', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '.12em',
        color: 'var(--menta)', marginBottom: '.5rem',
        position: 'relative', zIndex: 2,
      }}>{type[lang]}</p>
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.05rem', fontWeight: 700,
        color: 'white', lineHeight: 1.25,
        position: 'relative', zIndex: 2,
      }}>{name[lang]}</p>
      <p style={{
        fontSize: '.78rem', color: 'rgba(255,255,255,.72)',
        lineHeight: 1.55, marginTop: '.5rem',
        position: 'relative', zIndex: 2,
      }}>{desc[lang]}</p>
    </button>
  );
}

function ResourceModal({ item, onClose }) {
  const { lang } = useLang();
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  const title = item.name[lang];
  const subject = encodeURIComponent(`Solicito recurso: ${title}`);
  const bodyText =
`Hola Mijal,

Me gustaría recibir el recurso "${title}".

Mi nombre:
Mi organización / rol:

¡Gracias!`;
  const body = encodeURIComponent(bodyText);
  const mailto = `mailto:mijebner@gmail.com?subject=${subject}&body=${body}`;

  return (
    <div onClick={onClose} className="resource-modal-backdrop" style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: 'rgba(30,22,57,.72)',
      backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem',
      animation: 'pop-in .25s var(--ease-soft)',
    }}>
      <div onClick={e => e.stopPropagation()} className="resource-modal" style={{
        background: 'var(--blanco)', borderRadius: 20, color: 'var(--ink)',
        width: '100%', maxWidth: 760, maxHeight: '90vh', overflowY: 'auto',
        display: 'grid', gridTemplateColumns: '260px 1fr',
        boxShadow: '0 30px 80px rgba(0,0,0,.4)',
        position: 'relative',
      }}>
        <button type="button" onClick={onClose} aria-label="Cerrar" style={{
          position: 'absolute', top: 12, right: 12, zIndex: 2,
          width: 34, height: 34, borderRadius: '50%',
          border: 'none', background: 'rgba(30,22,57,.08)',
          cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1, color: 'var(--ink)',
        }}>×</button>

        <div className="resource-modal-cover" style={{
          background: 'var(--lila)', padding: '2rem 1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: '100%', maxWidth: 240,
            borderRadius: 8, overflow: 'hidden',
            background: 'white', position: 'relative',
            boxShadow: '0 20px 40px rgba(30,22,57,.25), inset 4px 0 8px rgba(0,0,0,.12)',
            transform: 'rotate(-2deg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, background: 'rgba(0,0,0,.18)', zIndex: 2 }} />
            {item.cover ? (
              <img src={item.cover} alt={title}
                   onError={(e) => { e.currentTarget.style.display = 'none'; }}
                   style={{ width: '100%', height: 'auto', display: 'block', maxHeight: 320 }} />
            ) : (
              <div style={{
                width: '100%', aspectRatio: '3 / 4',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.4rem 1.2rem',
                background: 'var(--violeta)',
                color: 'var(--menta)',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* decorative orange blob */}
                <div style={{
                  position: 'absolute', bottom: -40, right: -30,
                  width: 140, height: 140, borderRadius: '50%',
                  background: 'var(--naranja)', opacity: .9,
                }} />
                {/* small mint dots */}
                <div style={{
                  position: 'absolute', top: 20, right: 18,
                  width: 14, height: 14, borderRadius: '50%',
                  background: 'var(--menta)',
                }} />
                <h4 style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  textTransform: 'uppercase',
                  letterSpacing: '-.01em',
                  color: 'var(--menta)',
                  position: 'relative', zIndex: 2,
                }}>{title}</h4>
                <div style={{
                  fontSize: '.55rem',
                  fontWeight: 700,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(181,226,225,.85)',
                  position: 'relative', zIndex: 2,
                }}>Por Mijal Iastrebner</div>
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: '2.2rem 2rem 2rem' }}>
          <p style={{
            fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '.14em', color: 'var(--naranja)', marginBottom: '.6rem',
          }}>{item.type[lang]}</p>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.2,
            color: 'var(--violeta)', marginBottom: '.7rem', paddingRight: '2rem',
          }}>{title}</h3>
          <p style={{ fontSize: '.92rem', color: 'var(--ink-light)', lineHeight: 1.7, marginBottom: '1.4rem' }}>
            {item.desc[lang]}
          </p>

          <div style={{
            background: 'var(--crema)', borderRadius: 12, padding: '1rem 1.1rem',
            marginBottom: '1.4rem', fontSize: '.82rem', color: 'var(--ink-light)', lineHeight: 1.6,
          }}>
            <strong style={{ color: 'var(--violeta)' }}>¿Cómo lo recibís?</strong> Hacé clic en el botón y se abre un correo. Cuando lo envías, recibís el recurso automáticamente en tu casilla.
          </div>

          <a href={mailto} style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            background: 'var(--naranja)', color: 'white',
            padding: '.85rem 1.4rem', borderRadius: 10,
            fontSize: '.78rem', fontWeight: 700, letterSpacing: '.06em',
            textTransform: 'uppercase', textDecoration: 'none',
            transition: 'all .25s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--violeta)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--naranja)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            Pedir el recurso por mail
            <ArrowOut />
          </a>
          <p style={{ fontSize: '.72rem', color: 'var(--ink-muted)', marginTop: '.7rem' }}>
            Te llega a <strong style={{ color: 'var(--ink)' }}>mijebner@gmail.com</strong>. Respondo con el recurso adjunto.
          </p>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Library, FeaturedGuide, LibCard, ResourceModal });
