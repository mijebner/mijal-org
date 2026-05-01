// Nav.jsx — sticky nav with scroll-spy active indicator.
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState('inicio');
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // Scroll-spy: pick the section whose top is closest above the viewport center.
      const sections = ['inicio', 'sobre-mi', 'servicios', 'biblioteca', 'clases', 'contacto'];
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current = 'inicio';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'sobre-mi',  es: 'Sobre mí',   en: 'About' },
    { id: 'servicios', es: 'Servicios',  en: 'Services' },
    { id: 'biblioteca', es: 'Biblioteca', en: 'Resources' },
    { id: 'clases',    es: 'Clases',     en: 'Classes' },
  ];

  const navStyle = {
    position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100,
    background: scrolled ? 'rgba(255,252,249,.92)' : 'rgba(255,252,249,.55)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    padding: scrolled ? '.65rem 2.5rem' : '1rem 2.5rem',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    transition: 'all .4s var(--ease-soft)',
    boxShadow: scrolled ? '0 1px 20px rgba(30,22,57,.08)' : 'none',
  };

  const linkCss = {
    fontSize: '.78rem', fontWeight: 700, textDecoration: 'none',
    color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '.06em',
    transition: 'color .3s',
  };

  return (
    <nav style={navStyle}>
      <a href="#inicio" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
         onClick={() => setMobileOpen(false)}>
        <img src="assets/logo-violeta.png" alt="Mijal Iastrebner"
             style={{ height: scrolled ? 34 : 40, transition: 'height .4s var(--ease-soft)' }} />
      </a>
      <div className="nav-links">
        {links.map(l => (
          <span key={l.id} className={'nav-link-wrap ' + (active === l.id ? 'active' : '')}>
            <span className="nav-dot" />
            <a href={'#' + l.id} style={linkCss}>{l.es}</a>
          </span>
        ))}
        <a href="https://calendar.app.google/f3bcinMYo1Ro5Q5V6" target="_blank" rel="noopener" style={{
          ...linkCss, background: 'var(--naranja)', color: 'white',
          padding: '.55rem 1.1rem', borderRadius: 8, transition: 'all .3s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--violeta)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--naranja)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
          Hablemos
        </a>
      </div>
      <button className="nav-burger" aria-label="Menú"
        onClick={() => setMobileOpen(o => !o)}
        style={{
          display: 'none', background: 'transparent', border: 'none',
          cursor: 'pointer', padding: '.4rem', width: 38, height: 38,
        }}>
        <span style={{
          display: 'block', width: 22, height: 2, background: 'var(--violeta)',
          margin: '5px auto', transition: 'transform .3s',
          transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none',
        }} />
        <span style={{
          display: 'block', width: 22, height: 2, background: 'var(--violeta)',
          margin: '5px auto', opacity: mobileOpen ? 0 : 1, transition: 'opacity .2s',
        }} />
        <span style={{
          display: 'block', width: 22, height: 2, background: 'var(--violeta)',
          margin: '5px auto', transition: 'transform .3s',
          transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
        }} />
      </button>
      {mobileOpen && (
        <div className="nav-mobile-panel" onClick={() => setMobileOpen(false)}>
          {links.map(l => (
            <a key={l.id} href={'#' + l.id} className="nav-mobile-link">{l.es}</a>
          ))}
          <a href="https://calendar.app.google/f3bcinMYo1Ro5Q5V6" target="_blank" rel="noopener"
             className="nav-mobile-cta">Hablemos</a>
        </div>
      )}
    </nav>
  );
}

Object.assign(window, { Nav });
