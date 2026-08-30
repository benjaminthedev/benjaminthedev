import { useState, useEffect, useRef, type ReactNode } from "react";

/* ────────────────────────────────────────────────────────── */
/*  CONTENT                                                   */
/* ────────────────────────────────────────────────────────── */

const PROFILE = {
  name: "Benjamin Dordoigne",
  handle: "benjaminthe.dev",
  email: "ben.dordoigne@gmail.com",
  website: "https://www.benjaminthe.dev",
  github: "https://github.com/benjaminthedev",
  linkedin: "https://www.linkedin.com/in/benjamin-dordoigne/",
  location: "Warwickshire · London · Remote",
  status: "Senior React & Frontend Developer · London / UK",
  tagline: "Senior React Developer.",
  sub: "Senior React Developer and Frontend Developer in London, UK. 15 years shipping high-performance interfaces for finance, media, and global brands. React · Next.js · TypeScript · React Native.",
};

const METRICS = [
  { value: "15", unit: "yrs", label: "shipping production" },
  { value: "300+", unit: "", label: "sites & apps built" },
];

const WORK = [
  {
    year: "Nov 2021 — Present",
    company: "The Corporate Action Company",
    place: "London",
    role: "Senior React Developer",
    blurb:
      "Solving complex challenges in real-time financial data processing — building intuitive, high-performance interfaces that translate intricate transaction workflows into a seamless user experience.",
    bullets: [
      "Architected a new risk management platform for a tier-1 investment bank that improved data processing efficiency by 40% and scaled to 1,000+ daily users.",
      "Reduced manual deployment time by 90% and accelerated feature delivery 3× by designing a full CI/CD pipeline with Jenkins.",
      "Decreased user error rates by 30% by leading UI/UX for a complex risk assessment interface.",
      "Engineered a real-time SWIFT message processing system handling 50,000+ MT/MX messages daily at 99.9% accuracy.",
      "Built a React Native app that streamlines critical approval workflows for senior managers with actionable alerts and high-level summaries.",
    ],
    stack: ["React", "React Native", "Next.js", "TypeScript", "Tailwind CSS", "Jenkins", "REST APIs"],
  },
  {
    year: "Jun 2021 — Sep 2021",
    company: "M&C Saatchi",
    place: "London",
    role: "React Developer · Contract",
    blurb:
      "High-impact contract to develop and launch performant web applications for the corporate brand and its high-profile clients — FIFA, Nando's, Coca-Cola.",
    bullets: [
      "Boosted the corporate website's Lighthouse score by 45 points by rebuilding from the ground up with Next.js and Strapi CMS.",
      "Developed high-traffic campaign microsites for FIFA and Nando's, handling peak traffic of 50,000+ users per hour.",
      "Engineered a mobile-first Coca-Cola marketing app that drove a 30% increase in active participation.",
      "Established a new Enzyme testing framework with 85% code coverage, ensuring a 99% bug-free launch.",
      "Led end-to-end development of an internal React Native time-tracking app deployed to 200+ company iOS and Android devices.",
    ],
    stack: ["React", "React Native", "Next.js", "TypeScript", "StrapiCMS", "Enzyme", "REST APIs"],
  },
  {
    year: "Apr 2018 — Jun 2021",
    company: "Board Agenda",
    place: "London",
    role: "Lead Front-end Developer",
    blurb:
      "Led the complete technical overhaul of the company's digital platform — modernising the architecture to significantly boost performance and readership.",
    bullets: [
      "Achieved a 90+ Lighthouse score and cut page load times by 77% with a headless React/WordPress front-end and advanced asset optimisation.",
      "Grew monthly readership by 25% by designing a new user-centric WordPress theme with custom Gutenberg blocks.",
      "Owned the entire front-end stack and workflow, introducing modern tooling (GulpJS) and establishing new code standards for the team.",
    ],
    stack: ["React", "WordPress", "PHP", "JavaScript", "SASS", "GulpJS"],
  },
  {
    year: "Apr 2009 — Jun 2021",
    company: "Freelance & Consulting",
    place: "London",
    role: "Web Developer & Consultant",
    blurb:
      "Designed, developed, and maintained a portfolio of 300+ websites and applications for clients from small businesses to tech startups — custom, high-performance solutions that drove growth and engagement.",
    bullets: [
      "Managed the full project lifecycle for 300+ clients — consultation through deployment and maintenance.",
      "Consistently delivered high-performance websites through modern front-end optimisation, minification, and server-side enhancements.",
      "Translated complex business requirements into bespoke applications: custom e-commerce stores, secure subscription systems, and more.",
    ],
    stack: ["HTML5", "CSS3", "SASS", "JavaScript", "jQuery", "React", "PHP", "GulpJS"],
  },
];

const SKILLS = {
  Languages: ["JavaScript", "TypeScript", "Java", "Python", "GraphQL", "SQL", "HTML", "CSS", "SASS/SCSS"],
  Technologies: [
    "React",
    "React Native",
    "Redux",
    "Jest",
    "Playwright",
    "Next.js",
    "Express.js",
    "Tailwind CSS",
    "Webpack",
    "Babel",
    "ESLint",
  ],
};

const EDUCATION = {
  school: "University of Brighton",
  degree: "BSc (Hons) Psychology & Sociology · 2:1",
  years: "2005 — 2009",
};

const SERVICES = [
  {
    n: "01",
    title: "Senior / Lead Frontend",
    who: "Scale-ups & product teams",
    what: "Embedded React leadership. Architecture, mentoring, code quality, shipping velocity. I unblock your team.",
  },
  {
    n: "02",
    title: "Performance Rescue",
    who: "Sites that need to be fast",
    what: "Lighthouse audits, Core Web Vitals, Next.js rebuilds. I've taken sites from failing to 90+ — multiple times.",
  },
  {
    n: "03",
    title: "React Native Delivery",
    who: "Teams needing mobile",
    what: "Native apps shipped to company fleets and production users. Alerts, approvals, internal tools that people actually use.",
  },
];

const HIGHLIGHTS = [
  { k: "40%", l: "faster data processing · tier-1 bank" },
  { k: "90%", l: "less deployment time · CI/CD" },
  { k: "3×", l: "feature delivery speed" },
  { k: "50k+", l: "SWIFT messages / day · 99.9%" },
  { k: "+45", l: "Lighthouse points · M&C Saatchi" },
  { k: "77%", l: "faster page loads · Board Agenda" },
];

/* ────────────────────────────────────────────────────────── */
/*  UI                                                        */
/* ────────────────────────────────────────────────────────── */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transition-all duration-700 ease-out ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      {children}
    </div>
  );
}

function Marquee() {
  const items = [
    ...SKILLS.Technologies,
    ...SKILLS.Languages.slice(0, 6),
  ];
  const row = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-black/15 bg-[#15120E] text-[#F5F1EA] py-5">
      <div className="flex gap-12 animate-[marquee_42s_linear_infinite] whitespace-nowrap will-change-transform">
        {row.map((it, i) => (
          <span key={i} className="font-serif italic text-2xl md:text-3xl opacity-90">
            {it} <span className="not-italic opacity-30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  APP                                                       */
/* ────────────────────────────────────────────────────────── */

export default function App() {
  const [time, setTime] = useState("");
  const [activeWork, setActiveWork] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(0);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/London",
        })
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F1EA] text-[#15120E] selection:bg-[#FF4D12] selection:text-white antialiased">
      <style>{`
        body { font-family: "Inter", system-ui, sans-serif; font-feature-settings: "ss01", "cv11"; }
        .font-serif { font-family: "Instrument Serif", Georgia, serif; font-weight: 400; letter-spacing: -0.02em; }
        .font-mono { font-family: "JetBrains Mono", ui-monospace, monospace; }
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }
        @keyframes blink { 0%, 50% { opacity: 1 } 51%, 100% { opacity: 0 } }
        .cursor-blink { animation: blink 1.1s step-end infinite; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#F5F1EA]/85 border-b border-black/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 h-[68px] flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-[#15120E] text-[#F5F1EA] grid place-items-center font-serif text-[20px] italic leading-none group-hover:bg-[#FF4D12] transition-colors">
              B
            </div>
            <div className="leading-none">
              <div className="text-[14px] font-medium tracking-tight">{PROFILE.name}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50 mt-1">
                {PROFILE.handle}
              </div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-[13px]">
            {[
              ["Work", "#work"],
              ["Impact", "#impact"],
              ["Skills", "#skills"],
              ["About", "#about"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="hover:text-[#FF4D12] transition">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="font-mono text-[11px] opacity-55 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Available · {time} UK
            </div>
            <a
              href={`mailto:${PROFILE.email}`}
              className="h-10 px-5 rounded-full bg-[#15120E] text-[#F5F1EA] text-[13px] font-medium hover:bg-[#FF4D12] transition flex items-center gap-2"
            >
              Email me <span className="opacity-50">→</span>
            </a>
          </div>

          <button
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-black/20 grid place-items-center"
          >
            <div className="w-4 flex flex-col gap-[5px]">
              <span className={`h-[1.5px] bg-current origin-center transition ${menuOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`h-[1.5px] bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`h-[1.5px] bg-current origin-center transition ${menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-black/10 px-5 py-5 flex flex-col gap-4 text-[15px] bg-[#F5F1EA]">
            {[
              ["Work", "#work"],
              ["Impact", "#impact"],
              ["Skills", "#skills"],
              ["About", "#about"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <a
              href={`mailto:${PROFILE.email}`}
              onClick={() => setMenuOpen(false)}
              className="text-[#FF4D12] font-medium"
            >
              Email me →
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="top" className="relative">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-14 md:pt-24 pb-16 md:pb-28">
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <div className="col-span-12 lg:col-span-8">
              <Reveal>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-black/15 bg-white/50 font-mono text-[10px] uppercase tracking-[0.2em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {PROFILE.status}
                </div>
              </Reveal>

              <Reveal delay={60}>
                <h1 className="mt-7 font-serif text-[52px] sm:text-[72px] md:text-[104px] lg:text-[128px] leading-[0.88] tracking-[-0.035em]">
                  Senior React
                  <br />
                  Developer.
                  <br />
                  <span className="italic text-[#FF4D12]">Who ships.</span>
                  <span className="cursor-blink text-[#FF4D12]">_</span>
                </h1>
              </Reveal>

              <Reveal delay={140}>
                <p className="mt-8 md:mt-10 max-w-[580px] text-[17px] md:text-[20px] leading-[1.5] text-[#15120E]/75">
                  {PROFILE.sub}
                </p>
              </Reveal>

              <Reveal delay={200}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a
                    href="#work"
                    className="h-12 px-6 rounded-full bg-[#15120E] text-[#F5F1EA] text-[14px] font-medium hover:bg-[#FF4D12] transition flex items-center gap-2"
                  >
                    See the work <span className="opacity-50">↓</span>
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:mt-10">
              <Reveal delay={260}>
                <div className="lg:sticky lg:top-[96px] rounded-[28px] bg-[#15120E] text-[#F5F1EA] p-7 md:p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-55">At a glance</span>
                    <div className="w-8 h-8 rounded-full bg-[#FF4D12] text-white grid place-items-center font-serif italic text-[16px]">
                      B
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-5">
                    {METRICS.map((m) => (
                      <div key={m.label} className="border-t border-white/10 pt-3">
                        <div className="font-serif text-[36px] leading-none">
                          {m.value}
                          <span className="text-[#FF4D12] text-[18px]">{m.unit}</span>
                        </div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.14em] opacity-55 mt-1.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-7 pt-5 border-t border-white/10 font-mono text-[11px] opacity-65 leading-relaxed">
                    {PROFILE.location}
                    <br />
                    {EDUCATION.school} · {EDUCATION.degree.split(" · ")[1] || "2:1"}
                  </div>
                  <div className="mt-5 flex gap-2">
                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-9 rounded-full border border-white/20 grid place-items-center font-mono text-[10px] uppercase tracking-wider hover:bg-white hover:text-[#15120E] transition"
                    >
                      GitHub
                    </a>
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-9 rounded-full border border-white/20 grid place-items-center font-mono text-[10px] uppercase tracking-wider hover:bg-white hover:text-[#15120E] transition"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
        <Marquee />
      </section>

      {/* ── IMPACT STRIP ── */}
      <section id="impact" className="border-b border-black/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-20">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-55 mb-8">
              § 01 — Proof in numbers
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.l} delay={i * 50}>
                <div className="rounded-2xl border border-black/10 bg-white/70 p-5 h-full hover:border-[#FF4D12]/40 transition">
                  <div className="font-serif text-[36px] md:text-[40px] leading-none text-[#FF4D12]">{h.k}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] opacity-60 mt-3 leading-snug">
                    {h.l}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK ── */}
      <section id="work" className="mx-auto max-w-[1400px] px-5 md:px-10 py-20 md:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-55 mb-4">
                § 02 — Experience
              </div>
              <h2 className="font-serif text-[42px] md:text-[68px] leading-[0.9] tracking-[-0.03em] max-w-[700px]">
                Where I've
                <br />
                <span className="italic text-[#FF4D12]">shipped.</span>
              </h2>
            </div>
            <p className="font-mono text-[11px] opacity-50 max-w-[240px] leading-relaxed">
              React &amp; Frontend Developer work across London and the UK — from tier-1 banks to FIFA campaign microsites.
            </p>
          </div>
        </Reveal>

        <div className="space-y-4">
          {WORK.map((w, i) => {
            const open = expanded === i;
            return (
              <Reveal key={w.company} delay={i * 40}>
                <article
                  className={`rounded-[24px] border transition-all duration-500 overflow-hidden ${
                    open
                      ? "bg-[#15120E] text-[#F5F1EA] border-[#15120E]"
                      : "bg-white border-black/10 hover:border-black/25"
                  }`}
                >
                  <button
                    onClick={() => setExpanded(open ? null : i)}
                    onMouseEnter={() => setActiveWork(i)}
                    className="w-full text-left p-6 md:p-8"
                  >
                    <div className="grid grid-cols-12 gap-4 md:gap-6 items-start">
                      <div className="col-span-12 md:col-span-5">
                        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] opacity-55">
                          <span>№0{i + 1}</span>
                          <span>·</span>
                          <span>{w.year}</span>
                        </div>
                        <h3 className="font-serif text-[28px] md:text-[36px] leading-[0.95] tracking-[-0.02em] mt-3">
                          {w.company}
                        </h3>
                        <div className="mt-2 text-[13px] opacity-70">
                          {w.place} · <span className="font-medium">{w.role}</span>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <p className={`text-[14px] md:text-[15px] leading-[1.55] ${open ? "opacity-85" : "opacity-70"}`}>
                          {w.blurb}
                        </p>
                      </div>
                      <div className="col-span-12 md:col-span-1 flex md:justify-end">
                        <div
                          className={`w-10 h-10 rounded-full grid place-items-center text-lg transition-all ${
                            open
                              ? "bg-[#FF4D12] text-white rotate-45"
                              : activeWork === i
                                ? "bg-[#15120E] text-white"
                                : "bg-black/5"
                          }`}
                        >
                          +
                        </div>
                      </div>
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 md:px-8 pb-8 md:pb-10">
                        <div className="border-t border-white/10 pt-6 grid md:grid-cols-12 gap-8">
                          <div className="md:col-span-8">
                            <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 mb-4">
                              Key results
                            </div>
                            <ul className="space-y-3">
                              {w.bullets.map((b) => (
                                <li key={b} className="flex gap-3 text-[14px] leading-[1.55]">
                                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#FF4D12] shrink-0" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="md:col-span-4">
                            <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 mb-4">
                              Stack
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {w.stack.map((s) => (
                                <span
                                  key={s}
                                  className="px-2.5 py-1 rounded-full font-mono text-[10px] bg-white/10 border border-white/10"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-[#15120E] text-[#F5F1EA] py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-55 mb-4">
                  § 03 — How I can help
                </div>
                <h2 className="font-serif text-[42px] md:text-[68px] leading-[0.9] tracking-[-0.03em]">
                  Three ways to
                  <br />
                  <span className="italic text-[#FF4D12]">work together.</span>
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={i * 70}>
                <div className="group h-full rounded-[24px] border border-white/10 p-7 md:p-8 bg-white/[0.02] hover:bg-[#FF4D12] hover:border-[#FF4D12] transition-colors duration-400">
                  <div className="font-mono text-[11px] opacity-55 group-hover:text-white/80">{s.n}</div>
                  <h3 className="font-serif text-[32px] md:text-[36px] leading-[0.95] tracking-[-0.02em] mt-6">
                    {s.title}
                  </h3>
                  <div className="font-mono text-[10px] uppercase tracking-wider opacity-60 mt-3 group-hover:text-white/80">
                    For: {s.who}
                  </div>
                  <p className="mt-5 text-[14px] leading-[1.6] opacity-80 group-hover:text-white">{s.what}</p>
                  <a
                    href={`mailto:${PROFILE.email}?subject=Interested in ${s.title}`}
                    className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium"
                  >
                    Discuss this <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="mx-auto max-w-[1400px] px-5 md:px-10 py-20 md:py-28">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-55 mb-4">
            § 04 — Skills
          </div>
          <h2 className="font-serif text-[42px] md:text-[68px] leading-[0.9] tracking-[-0.03em] mb-12 md:mb-16">
            The toolkit.
            <br />
            <span className="italic text-[#FF4D12]">Battle-tested.</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(SKILLS).map(([group, items], gi) => (
            <Reveal key={group} delay={gi * 80}>
              <div className="rounded-[24px] border border-black/10 bg-white p-7 md:p-8 h-full">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-50 mb-5">{group}</div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-3.5 py-2 rounded-full border border-black/10 bg-[#F5F1EA] text-[13px] font-medium hover:border-[#FF4D12] hover:text-[#FF4D12] transition"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="mx-auto max-w-[1400px] px-5 md:px-10 py-20 md:py-28 border-t border-black/10">
        <div className="grid grid-cols-12 gap-8 md:gap-14">
          <Reveal className="col-span-12 md:col-span-5">
            <div className="md:sticky md:top-[96px]">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-55 mb-4">
                § 05 — About
              </div>
              <h2 className="font-serif text-[42px] md:text-[56px] leading-[0.95] tracking-[-0.02em]">
                A human,
                <br />
                <span className="italic text-[#FF4D12]">not a resume.</span>
              </h2>
              <div className="mt-8 rounded-[28px] bg-[#FF4D12] text-white aspect-square max-w-[320px] grid place-items-center">
                <div className="font-serif text-[160px] italic leading-none">B</div>
              </div>
            </div>
          </Reveal>

          <div className="col-span-12 md:col-span-7 space-y-5 text-[16px] md:text-[17px] leading-[1.7]">
            <Reveal>
              <p>
                I'm Benjamin — a Senior React Developer and Frontend Developer based in London, UK,
                with 15 years of hands-on web development. I've spent the last several years deep in
                financial platforms, agency campaign work, and product rebuilds where performance and
                clarity actually matter.
              </p>
            </Reveal>
            <Reveal delay={60}>
              <p>
                At The Corporate Action Company I build real-time risk and SWIFT processing interfaces
                for tier-1 banks — systems that handle tens of thousands of messages a day. Before that,
                I shipped high-traffic campaign sites for FIFA, Nando's, and Coca-Cola at M&C Saatchi,
                and led the full front-end overhaul at Board Agenda.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p>
                Earlier in my career I freelanced for over a decade, building 300+ sites and apps.
                That taught me how to listen, estimate honestly, and ship without drama.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p>
                When I'm not coding I run, watch films, play games, and spend time with my kids.
                I work remotely from Warwickshire and travel to London when the work needs it.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 mb-3">Education</div>
                <div className="font-serif text-[24px] leading-tight">{EDUCATION.school}</div>
                <div className="mt-1 text-[14px] opacity-70">
                  {EDUCATION.degree} · {EDUCATION.years}
                </div>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                {[
                  ["Based", "Warwickshire, UK"],
                  ["Works", "Remote / London"],
                  ["Focus", "React / Next / TS"],
                  ["Since", "2009"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-45">{k}</div>
                    <div className="font-serif text-[18px] mt-1">{v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-[#FF4D12] text-[#15120E]">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-20 md:py-28">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-70 mb-5">
              § 06 — Contact
            </div>
            <h2 className="font-serif text-[48px] md:text-[96px] lg:text-[120px] leading-[0.88] tracking-[-0.035em]">
              Let's build
              <br />
              <span className="italic">something</span>
              <br />
              that ships.
            </h2>
          </Reveal>

          <div className="mt-12 md:mt-16 grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-6">
              <Reveal>
                <p className="text-[17px] md:text-[20px] leading-[1.5] max-w-[480px]">
                  Looking for a Senior React Developer or Frontend Developer in London who can own
                  architecture, ship clean interfaces, and raise the bar for the team? Drop me a line —
                  happy to talk.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-6 space-y-3">
              <Reveal delay={60}>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl bg-[#15120E] text-[#F5F1EA] px-6 py-5 hover:bg-white hover:text-[#15120E] transition"
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider opacity-55">Email</div>
                    <div className="font-serif text-[22px] md:text-[26px] mt-0.5 break-all">{PROFILE.email}</div>
                  </div>
                  <span className="text-2xl shrink-0 group-hover:translate-x-1 transition">→</span>
                </a>
              </Reveal>
              <Reveal delay={120}>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-[#15120E] px-6 py-5 hover:bg-[#15120E] hover:text-[#F5F1EA] transition"
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider opacity-70">LinkedIn</div>
                    <div className="font-serif text-[20px] md:text-[22px] mt-0.5">/in/benjamin-dordoigne</div>
                  </div>
                  <span className="text-2xl shrink-0 group-hover:translate-x-1 transition">→</span>
                </a>
              </Reveal>
              <Reveal delay={180}>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-[#15120E] px-6 py-5 hover:bg-[#15120E] hover:text-[#F5F1EA] transition"
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider opacity-70">GitHub</div>
                    <div className="font-serif text-[20px] md:text-[22px] mt-0.5">@benjaminthedev</div>
                  </div>
                  <span className="text-2xl shrink-0 group-hover:translate-x-1 transition">→</span>
                </a>
              </Reveal>
              <Reveal delay={240}>
                <a
                  href="https://www.benjaminthe.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-[#15120E] px-6 py-5 hover:bg-[#15120E] hover:text-[#F5F1EA] transition"
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider opacity-70">Website</div>
                    <div className="font-serif text-[20px] md:text-[22px] mt-0.5">benjaminthe.dev</div>
                  </div>
                  <span className="text-2xl shrink-0 group-hover:translate-x-1 transition">→</span>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#15120E] text-[#F5F1EA] py-10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 flex flex-wrap justify-between items-center gap-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F5F1EA] text-[#15120E] grid place-items-center font-serif italic text-[18px]">
              B
            </div>
            <div>
              <div className="text-[14px]">{PROFILE.name}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-45 mt-0.5">
                Senior React &amp; Frontend Developer · London, UK  © {new Date().getFullYear()} · {time} UK
              </div>
            </div>
          </div>
        
          <a href="#top" className="font-mono text-[11px] hover:text-[#FF4D12] transition">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
