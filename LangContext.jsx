// LangContext.jsx — ES/EN toggle with localStorage persistence.
const LangContext = React.createContext({ lang: 'es', setLang: () => {}, toggle: () => {} });

function LangProvider({ children }) {
  const [lang, setLang] = React.useState(() => {
    try { return localStorage.getItem('mi-lang') || 'es'; } catch (e) { return 'es'; }
  });
  const toggle = () => setLang(l => (l === 'es' ? 'en' : 'es'));

  React.useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === 'es'
      ? 'Mijal Iastrebner — Consultoría estratégica para organizaciones de impacto'
      : 'Mijal Iastrebner — Strategic consulting for impact organizations';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute('content', lang === 'es'
        ? 'Acompaño líderes y organizaciones a construir estructuras que sostengan su impacto. Biblioteca de recursos, clases online y consultoría estratégica.'
        : 'I help leaders and organizations build structures that sustain their impact. Resource library, online classes, and strategic consulting.');
    }
    try { localStorage.setItem('mi-lang', lang); } catch (e) {}
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang, toggle }}>{children}</LangContext.Provider>;
}
function T({ es, en }) { const { lang } = React.useContext(LangContext); return <>{lang === 'es' ? es : en}</>; }
function useLang() { return React.useContext(LangContext); }

Object.assign(window, { LangContext, LangProvider, T, useLang });
