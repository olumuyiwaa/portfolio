// Flat clip-art style scenes for the service cards. Pure SVG, no gradients.
// Each is drawn on a 400x240 canvas and scales to fill its panel. When a real
// image is supplied for a service, page.js shows that instead.
const C = {
  ink: "#101814",
  paper: "#FFFFFF",
  sage50: "#EEF5F0",
  sage100: "#DCEBE1",
  sage200: "#BCD8C6",
  sage300: "#8DBFA2",
  sage500: "#1F8A62",
  sage600: "#137352",
  sage700: "#0E5C42",
  amber50: "#FFF4E5",
  amber100: "#FFE3BD",
  amber300: "#FFC46B",
  amber500: "#F29B1D",
  stone200: "#E4E0D4",
};

function Mobile() {
  return (
    <>
      <rect width="400" height="240" fill={C.sage100} />
      <circle cx="320" cy="48" r="60" fill={C.sage200} />
      <circle cx="70" cy="210" r="48" fill={C.amber100} />
      {/* back phone */}
      <g transform="rotate(8 270 130)">
        <rect x="222" y="34" width="100" height="190" rx="18" fill={C.sage700} />
        <rect x="230" y="44" width="84" height="170" rx="12" fill={C.sage50} />
        <rect x="238" y="56" width="40" height="7" rx="3.5" fill={C.sage300} />
        <rect x="238" y="72" width="68" height="44" rx="8" fill={C.amber300} />
        <rect x="238" y="124" width="68" height="14" rx="6" fill={C.sage200} />
        <rect x="238" y="144" width="68" height="14" rx="6" fill={C.sage200} />
        <rect x="238" y="164" width="68" height="14" rx="6" fill={C.sage200} />
      </g>
      {/* front phone */}
      <rect x="112" y="22" width="108" height="206" rx="20" fill={C.ink} />
      <rect x="120" y="32" width="92" height="186" rx="14" fill={C.paper} />
      <rect x="154" y="37" width="24" height="6" rx="3" fill={C.ink} />
      <rect x="128" y="54" width="44" height="8" rx="4" fill={C.ink} />
      <rect x="128" y="68" width="30" height="6" rx="3" fill={C.stone200} />
      <rect x="128" y="86" width="76" height="52" rx="10" fill={C.sage600} />
      <rect x="136" y="96" width="32" height="6" rx="3" fill={C.sage200} />
      <rect x="136" y="110" width="48" height="10" rx="5" fill={C.paper} />
      <rect x="128" y="148" width="76" height="20" rx="8" fill={C.sage50} />
      <circle cx="140" cy="158" r="5" fill={C.amber500} />
      <rect x="150" y="155" width="36" height="6" rx="3" fill={C.sage300} />
      <rect x="128" y="174" width="76" height="20" rx="8" fill={C.sage50} />
      <circle cx="140" cy="184" r="5" fill={C.sage500} />
      <rect x="150" y="181" width="28" height="6" rx="3" fill={C.sage300} />
      <rect x="150" y="204" width="32" height="5" rx="2.5" fill={C.stone200} />
      {/* chips */}
      <rect x="40" y="70" width="62" height="26" rx="13" fill={C.amber300} />
      <rect x="52" y="80" width="38" height="6" rx="3" fill={C.ink} />
      <circle cx="338" cy="188" r="18" fill={C.sage600} />
      <path d="M330 188l6 6 11-12" stroke={C.paper} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function Web() {
  return (
    <>
      <rect width="400" height="240" fill={C.amber50} />
      <circle cx="350" cy="40" r="56" fill={C.amber100} />
      <circle cx="48" cy="206" r="50" fill={C.sage100} />
      <rect x="52" y="34" width="296" height="176" rx="14" fill={C.ink} />
      <rect x="56" y="38" width="288" height="168" rx="11" fill={C.paper} />
      <rect x="56" y="38" width="288" height="22" rx="11" fill={C.sage100} />
      <rect x="56" y="50" width="288" height="10" fill={C.sage100} />
      <circle cx="70" cy="49" r="3.5" fill={C.amber500} />
      <circle cx="82" cy="49" r="3.5" fill={C.sage500} />
      <circle cx="94" cy="49" r="3.5" fill={C.ink} />
      <rect x="56" y="60" width="62" height="146" fill={C.sage50} />
      <rect x="66" y="72" width="42" height="7" rx="3.5" fill={C.sage600} />
      <rect x="66" y="88" width="34" height="6" rx="3" fill={C.sage200} />
      <rect x="66" y="102" width="38" height="6" rx="3" fill={C.sage200} />
      <rect x="66" y="116" width="30" height="6" rx="3" fill={C.sage200} />
      {/* stat cards */}
      <rect x="130" y="72" width="64" height="38" rx="8" fill={C.sage600} />
      <rect x="138" y="80" width="26" height="5" rx="2.5" fill={C.sage200} />
      <rect x="138" y="92" width="38" height="9" rx="4.5" fill={C.paper} />
      <rect x="202" y="72" width="64" height="38" rx="8" fill={C.amber300} />
      <rect x="210" y="80" width="26" height="5" rx="2.5" fill={C.ink} />
      <rect x="210" y="92" width="36" height="9" rx="4.5" fill={C.ink} />
      <rect x="274" y="72" width="62" height="38" rx="8" fill={C.sage100} />
      <rect x="282" y="80" width="26" height="5" rx="2.5" fill={C.sage500} />
      <rect x="282" y="92" width="34" height="9" rx="4.5" fill={C.sage500} />
      {/* chart */}
      <rect x="130" y="120" width="206" height="76" rx="8" fill={C.sage50} />
      {[18, 32, 24, 46, 38, 56, 44].map((h, i) => (
        <rect key={i} x={142 + i * 28} y={188 - h} width="16" height={h} rx="3" fill={i % 2 ? C.sage500 : C.sage300} />
      ))}
      <rect x="150" y="212" width="100" height="10" rx="5" fill={C.ink} opacity="0" />
    </>
  );
}

function Backend() {
  return (
    <>
      <rect width="400" height="240" fill={C.sage200} />
      <circle cx="60" cy="40" r="52" fill={C.sage100} />
      <circle cx="350" cy="210" r="56" fill={C.sage300} />
      {/* connectors */}
      <path d="M262 82h40a14 14 0 0 1 14 14v10M262 124h54M262 166h40a14 14 0 0 0 14-14v-10" stroke={C.ink} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* servers */}
      {[52, 94, 136].map((y, i) => (
        <g key={y}>
          <rect x="84" y={y} width="178" height="36" rx="9" fill={i === 1 ? C.amber300 : C.ink} />
          <circle cx="104" cy={y + 18} r="5" fill={i === 1 ? C.ink : C.sage300} />
          <circle cx="122" cy={y + 18} r="5" fill={i === 1 ? C.ink : C.amber300} />
          <rect x="146" y={y + 14} width="84" height="8" rx="4" fill={i === 1 ? C.amber500 : "#2b3a33"} />
          <circle cx="246" cy={y + 18} r="4" fill={i === 1 ? C.ink : C.sage500} />
        </g>
      ))}
      <rect x="84" y="182" width="178" height="12" rx="6" fill={C.sage700} />
      {/* database */}
      <g>
        <rect x="316" y="104" width="52" height="56" fill={C.paper} />
        <ellipse cx="342" cy="160" rx="26" ry="9" fill={C.paper} />
        <ellipse cx="342" cy="104" rx="26" ry="9" fill={C.sage50} />
        <path d="M316 120c0 12 52 12 52 0M316 136c0 12 52 12 52 0" stroke={C.sage600} strokeWidth="3" fill="none" />
        <path d="M316 104v56M368 104v56" stroke={C.sage600} strokeWidth="3" />
        <ellipse cx="342" cy="104" rx="26" ry="9" fill="none" stroke={C.sage600} strokeWidth="3" />
        <path d="M316 160c0 12 52 12 52 0" stroke={C.sage600} strokeWidth="3" fill="none" />
      </g>
      {/* shield */}
      <path d="M338 38l22 8v16c0 14-9 22-22 28-13-6-22-14-22-28V46z" fill={C.sage600} />
      <path d="M328 64l7 7 12-14" stroke={C.paper} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function Team() {
  const person = (cx, skin, shirt, hair) => (
    <g>
      <path d={`M${cx - 38} 214a38 38 0 0 1 76 0z`} fill={shirt} />
      <circle cx={cx} cy="148" r="22" fill={skin} />
      <path d={`M${cx - 23} 146a23 23 0 0 1 46 0c-8-6-14-10-23-10s-15 4-23 10z`} fill={hair} />
    </g>
  );
  return (
    <>
      <rect width="400" height="240" fill={C.amber100} />
      <circle cx="46" cy="44" r="52" fill={C.amber50} />
      <circle cx="360" cy="190" r="58" fill={C.amber300} />
      {/* code window */}
      <rect x="112" y="24" width="176" height="92" rx="12" fill={C.ink} />
      <circle cx="128" cy="40" r="3.5" fill={C.amber500} />
      <circle cx="140" cy="40" r="3.5" fill={C.sage500} />
      <circle cx="152" cy="40" r="3.5" fill={C.paper} />
      <rect x="128" y="56" width="44" height="7" rx="3.5" fill={C.sage300} />
      <rect x="178" y="56" width="62" height="7" rx="3.5" fill={C.amber300} />
      <rect x="140" y="72" width="70" height="7" rx="3.5" fill={C.paper} opacity="0.85" />
      <rect x="216" y="72" width="40" height="7" rx="3.5" fill={C.sage500} />
      <rect x="140" y="88" width="34" height="7" rx="3.5" fill={C.amber300} />
      <rect x="180" y="88" width="64" height="7" rx="3.5" fill={C.sage300} />
      {/* people */}
      {person(86, "#E8B58F", C.sage600, C.ink)}
      {person(200, "#B97A57", C.ink, C.ink)}
      {person(314, "#F1C9A5", C.amber500, "#6b4a2b")}
      <rect x="0" y="214" width="400" height="26" fill={C.amber300} opacity="0" />
    </>
  );
}

const SCENES = { mobile: Mobile, web: Web, backend: Backend, team: Team };

export default function ServiceIllustration({ name, className = "" }) {
  const Scene = SCENES[name] || Web;
  return (
    <svg
      viewBox="0 0 400 240"
      className={`block h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <Scene />
    </svg>
  );
}
