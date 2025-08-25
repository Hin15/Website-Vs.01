// src/components/HomePage/Carousel.jsx
import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import Picture1 from "../../store/Picture1.png";
import Picture2 from "../../store/Picture2.png";
import Picture3 from "../../store/Picture3.png";
import Picture4 from "../../store/Picture4.png";
import Picture5 from "../../store/Picture5.png";

import Video01 from "../../store/Video-01.mp4";
import Video02 from "../../store/Video-02.mp4";
import Video03 from "../../store/Video-03.mp4";
import Video04 from "../../store/Video-04.mp4";
import Video05 from "../../store/Video-05.mp4";

const items = [
  { img: Picture1, video: Video01, title: "Marrakech\nMerzouga", subtitle: "Sahara Desert • Morocco" },
  { img: Picture2, video: Video02, title: "Yosemite\nNational Park", subtitle: "Sierra Nevada • United States" },
  { img: Picture3, video: Video03, title: "Los Lances\nBeach", subtitle: "Tarifa • Spain" },
  { img: Picture4, video: Video04, title: "Göreme\nValley", subtitle: "Cappadocia • Turkey" },
  { img: Picture5, video: Video05, title: "Nagano\nPrefecture", subtitle: "Japan Alps • Japan" },
];

const VISIBLE = 3;

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.load();
    videoRef.current.play().catch(() => {});
  }, [current]);

  const next = () => setCurrent((p) => (p + 1) % items.length);
  const prev = () => setCurrent((p) => (p - 1 + items.length) % items.length);

  const visibleIndexes = Array.from({ length: VISIBLE }, (_, i) => (current + i) % items.length);
  const centerSlot = Math.floor(VISIBLE / 2);

  // โปร่งใสแบบทิศทาง: ซ้ายชัดกว่า (0.75), กลาง 1.0, ขวาจางกว่า (0.5)
  const leftOpacity = 0.75;
  const centerOpacity = 1.0;
  const rightOpacity = 0.75;
  const slotToOpacity = (slot) =>
    slot === centerSlot ? centerOpacity : slot < centerSlot ? leftOpacity : rightOpacity;

  const progress = ((current + 1) / items.length) * 100;

  return (
    <section className="absolute top-[13.6vh] left-0 w-full h-[70vh] object-cover z-0">
      <div className="relative w-[96%] h-[85vh]  mx-auto  overflow-hidden rounded-3xl shadow-2xl ">
        {/* วิดีโอพื้นหลัง */}
        <video
          key={items[current].video}
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          controls={false}
          playsInline
          autoPlay
          loop
        >
          <source src={items[current].video} type="video/mp4" />
        </video>

        {/* ม่านให้อ่านง่าย */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/0" />

        {/* ข้อความด้านซ้าย */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 text-white drop-shadow-sm">
          <div className="mb-3 h-1 w-8 rounded bg-white/70" />
          <p className="text-sm/6 opacity-80">Japan Alps</p>
          <h1 className="mt-1 whitespace-pre-line text-6xl font-extrabold tracking-tight sm:text-7xl">
            NAGANO{"\n"}PREFECTURE
          </h1>
          <p className="mt-4 max-w-md text-sm opacity-80">
            Natus molestias nesciunt amet augue accumsan tincidunt. Maecenas
            tincidunt velit leo porttitor pulvinar, tortor eros facilisis libero.
          </p>
          <div className="mt-6">
            <button className="rounded-full bg-white/90 px-3 py-2 text-sm text-slate-900 shadow hover:bg-white">
              Discover Location
            </button>
          </div>
        </div>

        {/* การ์ด 3 ใบ — วางชิดขวา */}
        <div
          className="
            absolute bottom-32   // ⬅⬅ เปลี่ยนจาก bottom-20 เป็น bottom-32
            right-10 sm:right-16 md:right-24 lg:right-28 xl:right-32
            flex items-end justify-end gap-1 px-2 overflow-visible max-w-[62%]
          "
        >
          {visibleIndexes.map((idx, slot) => {
            const it = items[idx];
            const isCenter = slot === centerSlot;
            const opacity = slotToOpacity(slot);

            // ไล่ความจางด้วย CSS mask-image:
            // - การ์ดซ้าย (slot < center): ทึบที่ขวา -> จางไปทางซ้าย
            // - การ์ดขวา (slot > center): ทึบที่ซ้าย -> จางไปทางขวา
            let maskClass = "";
            if (!isCenter && slot < centerSlot) {
              maskClass =
                "[mask-image:linear-gradient(to_right,rgba(0,0,0,0.3),rgba(0,0,0,1))] [mask-repeat:no-repeat] [mask-size:100%_100%]";
            } else if (!isCenter && slot > centerSlot) {
              maskClass =
                "[mask-image:linear-gradient(to_left,rgba(0,0,0,0.3),rgba(0,0,0,1))] [mask-repeat:no-repeat] [mask-size:100%_100%]";
            }

            // ให้การ์ดทับกันเล็กน้อย & การ์ดกลางอยู่บนสุด
            const overlap = "-mx-6";
            const z = isCenter ? 30 : 10;

            return (
              <motion.button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`group relative ${overlap}`}
                whileHover={{ y: isCenter ? -6 : -2 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                aria-label={it.title.replace("\n", " ")}
                style={{ opacity, zIndex: z }}
              >
                {/* กล่องการ์ด */}
                <div
                  className={`
                    relative
                    h-40 w-28 sm:h-48 sm:w-32 lg:h-52 lg:w-36
                    rounded-2xl overflow-hidden backdrop-blur ring-1 shadow
                    transition-all duration-300
                    ${
                      isCenter
                        ? "scale-110 bg-white/95 ring-white/80 ring-2 drop-shadow-2xl"
                        : "scale-95 bg-white/20 ring-white/20"
                    }
                  `}
                >
                  {/* เงาวงรีใต้การ์ดกลาง */}
                  {isCenter && (
                    <span
                      className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 block h-4 w-[70%] rounded-full bg-black/40 blur-md"
                    />
                  )}

                  {/* รูป + mask ไล่ความจาง */}
                  <img
                    src={it.img}
                    alt={it.title}
                    className={`h-full w-full object-cover ${maskClass}`}
                  />
                </div>

                {/* คำอธิบาย (กลางชัด, ซ้าย/ขวาเบาลง) */}
                <div className="absolute left-1/2 top-full -translate-x-1/2 mt-2 w-max pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: isCenter ? 1 : 0., y: 0 }}
                    className={isCenter ? "text-white text-sm" : "text-white/70 text-xs"}
                  >
                    <div className="text-[10px] uppercase tracking-wide opacity-80">
                      {it.subtitle}
                    </div>
                    <div className="whitespace-pre-line font-semibold leading-tight">
                      {it.title}
                    </div>
                  </motion.div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ปุ่มเลื่อน */}
        <div className="absolute bottom-6 right-6 flex items-center gap-3">
          <button
            onClick={prev}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur hover:bg-white/30"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur hover:bg-white/30"
            aria-label="Next"
          >
            ›
          </button>
        </div>

        {/* โปรเกรส + เลขหน้า */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex w-[70%] items-center gap-6 pointer-events-none">
          <div className="h-[3px] w-full rounded-full bg-white/25">
            <div className="h-[3px] rounded-full bg-white" style={{ width: `${progress}%` }} />
          </div>
          <div className="min-w-[48px] text-right text-white/90 text-xl font-semibold tabular-nums">
            {String(current + 1).padStart(2, "0")}
          </div>
        </div>
      </div>
    </section>
  );
}
