// Classes.jsx — "Coming soon" section with waitlist form.
function Classes() {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [interest, setInterest] = React.useState([]);

  const toggle = (id) => setInterest(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    // demo only — persists in localStorage so user sees it "worked"
    const list = JSON.parse(localStorage.getItem('mi-waitlist') || '[]');
    list.push({ email, interest, ts: Date.now() });
    localStorage.setItem('mi-waitlist', JSON.stringify(list));
    setSubmitted(true);
  };

  const classes = [
    { id: 'liderazgo', es: 'Liderazgo con propósito', en: 'Purposeful leadership',
      desc: { es: 'Herramientas para sostener equipos sin sostener el caos.',
              en: 'Tools to sustain teams without sustaining chaos.' } },
    { id: 'fundraising', es: 'Fundraising con claridad', en: 'Fundraising with clarity',
      desc: { es: 'De la propuesta al seguimiento: cómo construir relaciones con financiadores.',
              en: 'From proposal to follow-up: how to build funder relationships.' } },
    { id: 'estrategia', es: 'Estrategia para ONGs', en: 'Strategy for nonprofits',
      desc: { es: 'Pensar, priorizar y decidir cuando todo parece urgente.',
              en: 'Think, prioritize and decide when everything feels urgent.' } },
  ];

  return (
    <div style={{ background: 'var(--blanco)', position: 'relative', overflow: 'hidden' }}>
      <Orbs palette={['var(--menta)', 'var(--lila)', 'rgba(246,108,57,.25)']} opacity={0.45} />

      <section id="clases" style={{
        maxWidth: 1100, margin: '0 auto',
        padding: '7rem 3rem 6rem',
        position: 'relative', zIndex: 2,
      }}>
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
          <Eyebrow>
            <Sparkle size={11} />
            <span style={{ marginLeft: 6 }}>
              <T es="Próximamente · Lista de espera abierta"
                 en="Coming soon · Waitlist open" />
            </span>
          </Eyebrow>
          <SectionTitle color="var(--violeta)" style={{ fontStyle: 'italic' }}>
            <T es="Clases online" en="Online classes" />
          </SectionTitle>
          <p style={{ fontSize: '1.05rem', color: 'var(--ink-light)', lineHeight: 1.75, marginTop: '.5rem' }}>
            <T es="Liderazgo y fundraising para organizaciones sociales. Clases en vivo, cohortes pequeñas, herramientas prácticas."
               en="Leadership and fundraising for social organizations. Live sessions, small cohorts, practical tools." />
          </p>
        </div>

        {/* Preview cards with locked overlay */}
        <div className="reveal stagger" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.2rem', marginTop: '3rem',
        }}>
          {classes.map((c, i) => <ClassCard key={i} cls={c} tone={i} />)}
        </div>

        {/* Waitlist form */}
        <div className="reveal" style={{
          marginTop: '4rem',
          background: 'var(--violeta)',
          borderRadius: 24,
          padding: '3rem',
          color: 'white',
          position: 'relative', overflow: 'hidden',
        }}>
          <Orbs palette={['var(--naranja)', 'var(--lila)', 'var(--menta)']} opacity={0.25} />
          <div style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.6rem, 2.6vw, 2rem)',
                fontWeight: 700, lineHeight: 1.2, marginBottom: '.8rem',
              }}>
                <T es="Sumate a la lista de espera" en="Join the waitlist" />
              </h3>
              <p style={{ fontSize: '.95rem', opacity: .88, lineHeight: 1.7, maxWidth: 420 }}>
                <T es="Te aviso apenas abran las inscripciones y recibís acceso preferencial a las primeras cohortes."
                   en="I'll let you know when enrollment opens, with early access to the first cohorts." />
              </p>
            </div>
            <div>
              {submitted ? (
                <div style={{
                  padding: '2rem', background: 'rgba(255,255,255,.08)',
                  borderRadius: 16, border: '1px solid rgba(255,255,255,.15)',
                  textAlign: 'center',
                  animation: 'pop-in .5s var(--ease-soft) both',
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'var(--menta)', color: 'var(--violeta)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '.8rem',
                  }}><Check size={22} /></div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, marginBottom: '.3rem' }}>
                    <T es="¡Listo!" en="You're in!" />
                  </div>
                  <p style={{ fontSize: '.88rem', opacity: .85 }}>
                    <T es="Te escribo cuando abramos la primera cohorte."
                       en="I'll write when the first cohort opens." />
                  </p>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <label style={{ fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.12em', fontWeight: 700, opacity: .75, display: 'block', marginBottom: '.6rem' }}>
                    <T es="Me interesa" en="I'm interested in" />
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '1.2rem' }}>
                    {classes.map(c => (
                      <button key={c.id} type="button"
                        onClick={() => toggle(c.id)}
                        className={'chip ' + (interest.includes(c.id) ? 'active' : '')}
                        style={{ fontSize: '.65rem' }}>
                        <T es={c.es} en={c.en} />
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '.5rem' }}>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      placeholder={useLang().lang === 'es' ? 'tu@email.com' : 'you@email.com'}
                      style={{
                        flex: 1, padding: '.85rem 1rem',
                        background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.25)',
                        borderRadius: 10, color: 'white', fontFamily: 'inherit', fontSize: '.9rem',
                        outline: 'none',
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = 'var(--menta)'}
                      onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.25)'}
                    />
                    <button type="submit" style={{
                      background: 'var(--naranja)', color: 'white', border: 'none',
                      padding: '.85rem 1.3rem', borderRadius: 10,
                      fontFamily: 'inherit', fontWeight: 700, fontSize: '.75rem',
                      letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer',
                      transition: 'all .25s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--menta)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--naranja)'}>
                      <T es="Avisame" en="Notify me" />
                    </button>
                  </div>
                  <p style={{ fontSize: '.7rem', opacity: .6, marginTop: '.7rem' }}>
                    <T es="Sin spam. Solo el aviso cuando abran inscripciones."
                       en="No spam — just a heads-up when enrollment opens." />
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function ClassCard({ cls, tone }) {
  const [hover, setHover] = React.useState(false);
  const tones = [
    { bg: 'var(--lila)', fg: 'var(--ink)' },
    { bg: 'var(--menta)', fg: 'var(--ink)' },
    { bg: 'var(--crema)', fg: 'var(--ink)' },
  ];
  const t = tones[tone % tones.length];
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', padding: '2rem 1.6rem',
        background: t.bg, color: t.fg, borderRadius: 20,
        minHeight: 200,
        transition: 'transform .35s var(--ease-soft)',
        transform: hover ? 'translateY(-4px)' : 'none',
        overflow: 'hidden',
      }}>
      <div style={{ filter: hover ? 'blur(0px)' : 'blur(2px)', transition: 'filter .3s' }}>
        <span style={{
          fontSize: '.62rem', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '.12em', color: 'var(--violeta)',
        }}><T es="Curso" en="Course" /></span>
        <h4 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.25rem', fontWeight: 700, marginTop: '.4rem', marginBottom: '.6rem',
          lineHeight: 1.25,
        }}><T es={cls.es} en={cls.en} /></h4>
        <p style={{ fontSize: '.82rem', lineHeight: 1.6, opacity: .75 }}>
          <T es={cls.desc.es} en={cls.desc.en} />
        </p>
      </div>
      {/* Coming-soon lock badge */}
      <div style={{
        position: 'absolute', top: 14, right: 14,
        display: 'inline-flex', alignItems: 'center', gap: '.35rem',
        padding: '.35rem .7rem', background: 'rgba(30,22,57,.88)', color: 'white',
        borderRadius: 999, fontSize: '.6rem', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '.1em',
      }}>
        <Lock size={10} />
        <T es="Próximamente" en="Coming soon" />
      </div>
    </div>
  );
}

Object.assign(window, { Classes, ClassCard });
