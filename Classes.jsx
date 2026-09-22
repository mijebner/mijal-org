// Classes.jsx — "Coming soon" section. Invites people to share the topics
// they'd want to learn (no waitlist). Collects name + email + interests and
// delivers them to Mijal by email.
function Classes({ style = 'blur' }) {
  const { lang } = useLang();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [interest, setInterest] = React.useState([]);
  const [other, setOther] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const toggle = (id) => setInterest(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  // Showcased upcoming courses (preview cards).
  const courses = [
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

  // Broader list of topics people can express interest in.
  const topics = [
    { id: 'liderazgo',      es: 'Liderazgo con propósito',     en: 'Purposeful leadership' },
    { id: 'fundraising',    es: 'Fundraising con claridad',    en: 'Fundraising with clarity' },
    { id: 'estrategia',     es: 'Estrategia para ONGs',        en: 'Strategy for nonprofits' },
    { id: 'equipos',        es: 'Gestión de equipos',          en: 'Team management' },
    { id: 'proyectos',      es: 'Planificación de proyectos',  en: 'Project planning' },
    { id: 'financiadores',  es: 'Relación con financiadores',  en: 'Working with funders' },
    { id: 'sostenibilidad', es: 'Sostenibilidad financiera',   en: 'Financial sustainability' },
    { id: 'impacto',        es: 'Medición de impacto',         en: 'Impact measurement' },
  ];

  const submit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    const labels = interest.map(id => {
      const t = topics.find(x => x.id === id);
      return t ? t[lang] : id;
    });
    if (other.trim()) labels.push(other.trim());

    // Persist a local copy (demo) ...
    try {
      const list = JSON.parse(localStorage.getItem('mi-clases-intereses') || '[]');
      list.push({ name, email, topics: labels, ts: Date.now() });
      localStorage.setItem('mi-clases-intereses', JSON.stringify(list));
    } catch (err) {}

    // ... and open a pre-filled email so it actually reaches Mijal.
    const subject = lang === 'es'
      ? 'Me interesan las clases online'
      : "I'm interested in your online classes";
    const lines = lang === 'es'
      ? [
          'Hola Mijal,',
          '',
          'Me interesan tus clases online. Te dejo mis datos y los temas que más me interesan:',
          '',
          `Nombre: ${name}`,
          `Email: ${email}`,
          `Temas de interés: ${labels.length ? labels.join(', ') : '(sin especificar)'}`,
          '',
          '¡Gracias!',
        ]
      : [
          'Hi Mijal,',
          '',
          "I'm interested in your online classes. Here are my details and the topics I care about most:",
          '',
          `Name: ${name}`,
          `Email: ${email}`,
          `Topics of interest: ${labels.length ? labels.join(', ') : '(not specified)'}`,
          '',
          'Thank you!',
        ];
    const mailto = `mailto:mijebner@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  const fieldStyle = {
    width: '100%', padding: '.85rem 1rem',
    background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.25)',
    borderRadius: 10, color: 'white', fontFamily: 'inherit', fontSize: '.9rem',
    outline: 'none', boxSizing: 'border-box',
  };
  const labelStyle = {
    fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.12em',
    fontWeight: 700, opacity: .75, display: 'block', marginBottom: '.5rem',
  };
  const onFocus = e => e.currentTarget.style.borderColor = 'var(--menta)';
  const onBlur = e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.25)';

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
              <T es="Próximamente" en="Coming soon" />
            </span>
          </Eyebrow>
          <SectionTitle color="var(--violeta)" style={{ fontStyle: 'italic' }}>
            <T es="Clases online" en="Online classes" />
          </SectionTitle>
          <p style={{ fontSize: '1.05rem', color: 'var(--ink-light)', lineHeight: 1.75, marginTop: '.5rem' }}>
            <T es="Liderazgo y fundraising para organizaciones sociales. Clases en vivo, cohortes pequeñas, herramientas prácticas. Estoy diseñando el programa y tu voz me ayuda a definirlo."
               en="Leadership and fundraising for social organizations. Live sessions, small cohorts, practical tools. I'm shaping the program right now — your input helps define it." />
          </p>
        </div>

        {/* Preview cards */}
        <div className="reveal stagger" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.2rem', marginTop: '3rem',
        }}>
          {courses.map((c, i) => <ClassCard key={i} cls={c} tone={i} cardStyle={style} />)}
        </div>

        {/* Topics-of-interest form */}
        <div className="reveal" style={{
          marginTop: '4rem',
          background: 'var(--violeta)',
          borderRadius: 24,
          padding: '3rem',
          color: 'white',
          position: 'relative', overflow: 'hidden',
        }}>
          <Orbs palette={['var(--naranja)', 'var(--lila)', 'var(--menta)']} opacity={0.25} />
          <div style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '3rem', alignItems: 'start' }}>
            <div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.6rem, 2.6vw, 2rem)',
                fontWeight: 700, lineHeight: 1.2, marginBottom: '.8rem',
              }}>
                <T es="Contame qué querés aprender" en="Tell me what you want to learn" />
              </h3>
              <p style={{ fontSize: '.95rem', opacity: .88, lineHeight: 1.7, maxWidth: 420 }}>
                <T es="Todavía no abrí inscripciones: primero quiero escucharte. Dejame tu nombre, tu mail y marcá los temas que te interesan. Eso me ayuda a diseñar las clases y te escribo en cuanto tenga novedades."
                   en="Enrollment isn't open yet — first I want to hear from you. Leave your name and email and mark the topics that interest you. That shapes the classes, and I'll write to you as soon as there's news." />
              </p>
            </div>
            <div>
              {submitted ? (
                <div style={{
                  padding: '2.5rem 2rem', background: 'rgba(255,255,255,.08)',
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
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, marginBottom: '.4rem' }}>
                    <T es="¡Gracias!" en="Thank you!" />
                  </div>
                  <p style={{ fontSize: '.88rem', opacity: .85, lineHeight: 1.6 }}>
                    <T es="Se abrió tu correo con los datos cargados. Enviámelo y tengo en cuenta tus temas al armar el programa."
                       en="Your email just opened with everything filled in. Send it and I'll factor your topics into the program." />
                  </p>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.8rem', marginBottom: '1.1rem' }}>
                    <div>
                      <label style={labelStyle} htmlFor="cl-name">
                        <T es="Tu nombre" en="Your name" />
                      </label>
                      <input id="cl-name" type="text" required value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={lang === 'es' ? 'Nombre y apellido' : 'Full name'}
                        style={fieldStyle} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                    <div>
                      <label style={labelStyle} htmlFor="cl-email">
                        <T es="Tu email" en="Your email" />
                      </label>
                      <input id="cl-email" type="email" required value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder={lang === 'es' ? 'tu@email.com' : 'you@email.com'}
                        style={fieldStyle} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                  </div>

                  <label style={labelStyle}>
                    <T es="Temas que te interesan" en="Topics you're interested in" />
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '1.1rem' }}>
                    {topics.map(t => (
                      <button key={t.id} type="button"
                        onClick={() => toggle(t.id)}
                        className={'chip ' + (interest.includes(t.id) ? 'active' : '')}
                        style={{ fontSize: '.65rem' }}>
                        <T es={t.es} en={t.en} />
                      </button>
                    ))}
                  </div>

                  <label style={labelStyle} htmlFor="cl-other">
                    <T es="¿Otro tema en mente? (opcional)" en="Another topic in mind? (optional)" />
                  </label>
                  <input id="cl-other" type="text" value={other}
                    onChange={e => setOther(e.target.value)}
                    placeholder={lang === 'es' ? 'Contame qué te gustaría aprender' : 'Tell me what you’d like to learn'}
                    style={{ ...fieldStyle, marginBottom: '1.2rem' }} onFocus={onFocus} onBlur={onBlur} />

                  <button type="submit" style={{
                    width: '100%',
                    background: 'var(--naranja)', color: 'white', border: 'none',
                    padding: '.95rem 1.3rem', borderRadius: 10,
                    fontFamily: 'inherit', fontWeight: 700, fontSize: '.75rem',
                    letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer',
                    transition: 'all .25s',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--menta)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--naranja)'}>
                    <T es="Enviar mis temas" en="Send my topics" />
                    <ArrowRight size={14} />
                  </button>
                  <p style={{ fontSize: '.7rem', opacity: .6, marginTop: '.7rem' }}>
                    <T es="Sin compromiso. Uso tus datos solo para diseñar el programa y avisarte cuando abran las inscripciones."
                       en="No commitment. I only use your details to shape the program and let you know when enrollment opens." />
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

function ClassCard({ cls, tone, cardStyle = 'blur' }) {
  const [hover, setHover] = React.useState(false);
  const blurred = cardStyle === 'blur';
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
      <div style={{ filter: blurred && !hover ? 'blur(2px)' : 'blur(0px)', transition: 'filter .3s' }}>
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
      {/* Coming-soon badge */}
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
