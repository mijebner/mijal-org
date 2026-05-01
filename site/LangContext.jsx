// LangContext.jsx — ES/EN toggle.
const LangContext = React.createContext({ lang: 'es', toggle: () => {} });

function LangProvider({ children }) {
  // Spanish-only — toggle kept as a no-op for compatibility.
  const lang = 'es';
  const toggle = () => {};
  React.useEffect(() => {
    document.documentElement.lang = 'es';
    document.title = 'Mijal Iastrebner — Consultoría estratégica para organizaciones de impacto';
  }, []);
  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>;
}
function T({ es, en }) { const { lang } = React.useContext(LangContext); return <>{lang === 'es' ? es : en}</>; }
function useLang() { return React.useContext(LangContext); }

Object.assign(window, { LangContext, LangProvider, T, useLang });
