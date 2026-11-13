const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default function Highlight({ text, terms }) {
  const keys = Object.keys(terms).sort((a, b) => b.length - a.length);
  if (!keys.length) return text;
  const re = new RegExp(`(?<![\\w])(${keys.map(escape).join("|")})(?![\\w])`, "g");
  return text.split(re).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className={terms[part]}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}
