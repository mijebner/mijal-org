// Tweaks.jsx — floating panel for toggling design variants when Tweaks mode is on.
function Tweaks({ config, setConfig }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = (e) => {
      const d = e.data;
      if (!d || typeof d !== 'object') return;
      if (d.type === '__activate_edit_mode') setOpen(true);
      if (d.type === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const setKey = (k, v) => {
    const next = { ...config, [k]: v };
    setConfig(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  const options = {
    heroAccent: [
      { v: 'naranja', label: 'Naranja' },
      { v: 'violeta', label: 'Violeta' },
      { v: 'ink',     label: 'Ink' },
    ],
    libraryLayout: [
      { v: 'featured-grid',  label: 'Featured + grid' },
      { v: 'grid-only',      label: 'Solo grid' },
    ],
    marqueeSpeed: [
      { v: 'slow',   label: 'Lento' },
      { v: 'normal', label: 'Normal' },
      { v: 'fast',   label: 'Rápido' },
    ],
    orbIntensity: [
      { v: 'subtle',  label: 'Sutil' },
      { v: 'medium',  label: 'Medio' },
      { v: 'vivid',   label: 'Vivo' },
    ],
    classesStyle: [
      { v: 'blur',    label: 'Blur lock' },
      { v: 'open',    label: 'Preview abierto' },
    ],
  };

  if (!open) return null;
  return (
    <div className="tweaks-panel open">
      <h4>Tweaks</h4>
      <p style={{ fontSize: '.72rem', color: 'var(--ink-muted)' }}>
        Probá variantes de la home.
      </p>
      {Object.entries(options).map(([key, opts]) => (
        <div key={key}>
          <label>{labelMap[key] || key}</label>
          <div className="tweak-options">
            {opts.map(o => (
              <button key={o.v}
                className={config[key] === o.v ? 'active' : ''}
                onClick={() => setKey(key, o.v)}>{o.label}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const labelMap = {
  heroAccent: 'Color del hero',
  libraryLayout: 'Layout biblioteca',
  marqueeSpeed: 'Velocidad marquee',
  orbIntensity: 'Intensidad de formas',
  classesStyle: 'Estilo de "Próximamente"',
};

Object.assign(window, { Tweaks });
