// Row of single-select chips. items: strings or [value, label] pairs.
export default function ChipRow({ items, value, onChange }) {
  return (
    <div className="chips">
      {items.map((it) => {
        const [v, l] = Array.isArray(it) ? it : [it, it];
        return <button key={v} className={'chip' + (value === v ? ' on' : '')} onClick={() => onChange(v)}>{l}</button>;
      })}
    </div>
  );
}
