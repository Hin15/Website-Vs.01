import React from "react";
import Marquee from "react-fast-marquee";

import Ptn1 from "../../store/partners/partner1.png";
import Ptn2 from "../../store/partners/partner2.png";
import Ptn3 from "../../store/partners/partner3.png";
import Ptn4 from "../../store/partners/partner4.png";
import Ptn5 from "../../store/partners/partner5.png";

const PARTNERS = [
  { src: Ptn1, alt: "Partner 1", href: "#" },
  { src: Ptn2, alt: "Partner 2", href: "#" },
  { src: Ptn3, alt: "Partner 3", href: "#" },
  { src: Ptn4, alt: "Partner 4", href: "#" },
  { src: Ptn5, alt: "Partner 5", href: "#" },
];

const Logo = ({ it }) => (
  <a href={it.href} className="mx-10 inline-flex items-center shrink-0" aria-label={it.alt}>
    <img
      src={it.src}
      alt={it.alt}
      className="h-10 sm:h-14 md:h-16 w-auto opacity-80 grayscale transition
                 hover:opacity-100 hover:grayscale-0"
      loading="lazy"
      draggable={false}
    />
  </a>
);

export default function SponsorsMarquee() {
  const row1 = [...PARTNERS, ...PARTNERS, ...PARTNERS];
  const base = [...PARTNERS].reverse();
  const row2 = [...base, ...base, ...base];

  return (
    <section className="relative w-full lg:w-screen lg:relative lg:left-1/2 lg:right-1/2 lg:-ml-[50vw] lg:-mr-[50vw] ">
      {/* จอเล็ก: อยู่ในกรอบกึ่งกลาง / จอใหญ่: ทำ full‑bleed */}
      <div
        className="
          relative w-[96%]  mx-auto bg-slate-900/70 backdrop-blur-sm border-t border-white/10
          rounded-3xl
        "
      >
        <div className="relative w-full mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-white">
            ผู้สนับสนุน & พันธมิตร
          </h2>

          {/* แถว 1: ขวา → ซ้าย */}
          <Marquee direction="left" speed={48} pauseOnHover gradient={false} className="py-5">
            {row1.map((it, i) => <Logo key={`r1-${i}`} it={it} />)}
          </Marquee>

          {/* แถว 2: ซ้าย → ขวา */}
          <Marquee direction="right" speed={44} pauseOnHover gradient={false} className="py-5 -mt-2">
            {row2.map((it, i) => <Logo key={`r2-${i}`} it={it} />)}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
