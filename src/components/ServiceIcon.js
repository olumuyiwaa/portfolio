// Simple line icons used as the stand-in for service images.
const PATHS = {
  mobile: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  web: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="M2.5 9h19M6 6.5h.01M9 6.5h.01" />
    </>
  ),
  backend: (
    <>
      <rect x="3" y="3.5" width="18" height="7" rx="2" />
      <rect x="3" y="13.5" width="18" height="7" rx="2" />
      <path d="M7 7h.01M7 17h.01" />
    </>
  ),
  ops: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="2.5" />
      <path d="M3 9.5h18M7 13.5h3M9 21h6M12 17v4" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.8 20c.4-3.4 3-5.5 6.2-5.5s5.8 2.1 6.2 5.5" />
      <path d="M16 5.2a3 3 0 0 1 0 5.6M18.2 14.8c1.7.7 2.8 2.3 3 4.7" />
    </>
  ),
};

export default function ServiceIcon({ name }) {
  return (
    <div className="absolute inset-0 grid place-items-center text-sage-600">
      <svg
        viewBox="0 0 24 24"
        className="h-16 w-16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {PATHS[name] || PATHS.web}
      </svg>
    </div>
  );
}
