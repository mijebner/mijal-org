// CTA.jsx — violet "Hablemos" band, and footer.
function CallToAction() {
  return (
    <div style={{ background: 'var(--violeta)', position: 'relative', overflow: 'hidden' }} id="contacto">
      <Orbs palette={['var(--naranja)', 'var(--lila)', 'var(--menta)']} opacity={0.3} />
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '3rem', alignItems: 'center',
        maxWidth: 1100, margin: '0 auto',
        padding: '5rem 3rem', color: 'white',
        position: 'relative', zIndex: 2,
      }}>
        <div className="reveal-left">
          <Eyebrow color="var(--menta)"><T es="Hablemos" en="Let's talk" /></Eyebrow>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
            fontWeight: 700, lineHeight: 1.15,
            color: 'white', marginBottom: '.8rem',
          }}>
            <T es={<>¿Necesitás orden,<br/><em>estrategia</em> o <em>foco</em>?</>}
               en={<>Need order,<br/><em>strategy</em>, or <em>focus</em>?</>} />
          </h2>
          <p style={{
            fontSize: '1rem', opacity: .88, maxWidth: 440,
            lineHeight: 1.75, marginBottom: '2rem',
          }}><T es="Agendá una llamada exploratoria de 30 minutos. Sin compromiso."
                en="Book a 30-min exploratory call. No strings attached." /></p>
          <a href="https://calendar.app.google/f3bcinMYo1Ro5Q5V6" target="_blank" rel="noopener" className="cta-primary" style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            textDecoration: 'none', fontSize: '.8rem', fontWeight: 700,
            padding: '.95rem 1.8rem', borderRadius: 8,
            textTransform: 'uppercase', letterSpacing: '.06em',
            transition: 'all .3s',
            background: 'var(--naranja)', color: 'white',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--violeta)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--naranja)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <T es="Agendá una llamada" en="Book a call" />
            <ArrowRight />
          </a>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href="https://www.linkedin.com/in/mijebner/" target="_blank" rel="noopener"
               style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none', fontSize: '.82rem', fontWeight: 700 }}>LinkedIn</a>
            <span style={{ opacity: .3 }}>·</span>
            <a href="mailto:mijebner@gmail.com"
               style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none', fontSize: '.82rem', fontWeight: 700 }}>mijebner@gmail.com</a>
          </div>
        </div>
        <div className="reveal-right" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '100%', maxWidth: 380, borderRadius: 20, overflow: 'hidden',
            transform: 'rotate(2deg)',
            boxShadow: '0 30px 60px rgba(0,0,0,.25)',
          }}>
            <img src="assets/portrait-phone.png" alt="Mijal Iastrebner"
                 style={{ width: '100%', display: 'block' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const linkCss = {
    color: 'var(--ink-muted)', textDecoration: 'none',
    fontSize: '.82rem', fontWeight: 700, transition: 'color .3s',
  };
  const hover = e => e.currentTarget.style.color = 'var(--naranja)';
  const unhover = e => e.currentTarget.style.color = 'var(--ink-muted)';
  return (
    <footer style={{
      background: 'var(--ink)', color: 'var(--ink-muted)',
      padding: '2rem 3rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderTop: '1px solid rgba(255,255,255,.06)',
      flexWrap: 'wrap', gap: '1rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
        <img src="assets/logo-menta-small.png" alt="MI" style={{ height: 28, opacity: .7 }} />
        <span style={{ fontSize: '.72rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
          © 2025 Mijal Iastrebner
        </span>
      </div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <a href="https://www.linkedin.com/in/mijebner/" target="_blank" rel="noopener"
           style={linkCss} onMouseEnter={hover} onMouseLeave={unhover}>LinkedIn</a>
        <a href="mailto:mijebner@gmail.com"
           style={linkCss} onMouseEnter={hover} onMouseLeave={unhover}>Email</a>
      </div>
    </footer>
  );
}

Object.assign(window, { CallToAction, Footer });
