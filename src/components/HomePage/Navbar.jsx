import logo from "../../store/logo.png";

const navItems = [
    { label: "หน้าหลัก", href: "#home" },
    {
      label: "โครงการ",
      href: "#projects",
      items: [
        { label: "อ่างเก็บน้ำและอาคารส่วนประกอบ", href: "#projects-Dam" },
        { label: "ระบบส่งและผันน้ำ", href: "#projects-Irrigations" },
        { label: "งานถนน/สะพานและระบบขนส่ง", href: "#projects-Hightway" },
        { label: "บ้านพักอาศัย", href: "#projects-house" },
        { label: "อาคารสำนักงาน", href: "#projects-office" },
      ],
    },
    {
      label: "บริการ",
      href: "#services",
      items: [
        { label: "การออกแบบและวิศวกรรม", href: "#services-Desing" },
        { label: "BIM(การสร้างแบบจำลองโครงสร้าง)", href: "#services-BIM" },
        { label: "การประเมิณราคา", href: "#services-Estimate" },
        { label: "การให้คำปรึกษาและวางแผนโครงการ", href: "#services-Planing" },
        { label: "หน่วยงานสนับสนุน/ทักษะเพิ่มเติม", href: "#services-Cocompany" },
      ],
    },
    { label: "เกี่ยวกับเรา", href: "#about" },
    { label: "ข่าวสาร", href: "#news" },
    { label: "ติดต่อเรา", href: "#contact" },
  ];
export default function Navbar({  mobileOpen, setMobileOpen, projectOpen, setProjectOpen }) {
    
    
  return (
    <header
    className="absolute top-5 left-0 right-0 z-50 bg-white shadow-sm" /* เฉพาะแท็บ Navbar */
   >
     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
       <div className="flex h-20 items-center justify-between"> {/* ขนาดเเท็บ Navbar */}
         {/* Logo */}
         <a href="#home" className="flex items-center gap-2">
           <img
             src={logo}
             alt="Company Logo"
             className="h-16 w-16 object-contain"
           />
           <span className="font-kanit font-bold whitespace-nowrap">
             บริษัท ศ.สองพี่น้อง จำกัด (มหาชน)<br />SongPhiNong.Co
           </span>
         </a>

         {/* Desktop Menu */}
         <nav className="hidden md:flex items-center gap-1">
           {navItems.map((item) => (
             <div key={item.label} className="relative group">
               {item.items ? (
                 <>
                   <button className="px-3 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 transition whitespace-nowrap">
                     {item.label}
                   </button>
                   {/* Dropdown */}
                   <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-0 mt-2 w-64 rounded-2xl border bg-white p-2 shadow-lg transition-all">
                     {item.items.map((sub) => (
                       <a
                         key={sub.label}
                         href={sub.href}
                         className="block rounded-xl px-3 py-2 text-sm hover:bg-gray-50"
                       >
                         {sub.label}
                       </a>
                     ))}
                   </div>
                 </>
               ) : (
                 <a
                   className="px-3 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 transition whitespace-nowrap"
                   href={item.href}
                 >
                   {item.label}
                 </a>
               )}
             </div>
           ))}
         </nav>

         {/* CTA (desktop) */}
         <div className="hidden md:block">
           <a
             href="#contact"
             className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 whitespace-nowrap"
           >
             ขอใบเสนอราคา
           </a>
         </div>

         {/* Mobile Hamburger */}
         <button
           aria-label="Toggle menu"
           className="md:hidden rounded-xl p-2 hover:bg-gray-100"
           onClick={() => setMobileOpen((v) => !v)}
         >
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
             <path
               fillRule="evenodd"
               d="M3.75 6.75h16.5a.75.75 0 000-1.5H3.75a.75.75 0 000 1.5zm0 6h16.5a.75.75 0 000-1.5H3.75a.75.75 0 000 1.5zm0 6h16.5a.75.75 0 000-1.5H3.75a.75.75 0 000 1.5z"
               clipRule="evenodd"
             />
           </svg>
         </button>
       </div>
     </div>

     {/* Mobile Menu Panel */}
     {mobileOpen && (
       <div className="md:hidden border-t bg-white shadow-sm">
         <div className="mx-auto max-w-7xl px-4 py-3">
           <div className="flex flex-col gap-1">
             {navItems.map((item) => (
               <div key={item.label}>
                 {item.items ? (
                   <div>
                     <button
                       className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium hover:bg-gray-50"
                       onClick={() => setProjectOpen((v) => !v)}
                     >
                       {item.label}
                       <svg
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         fill="currentColor"
                         className={`h-5 w-5 transition-transform ${projectOpen ? "rotate-180" : "rotate-0"}`}
                       >
                         <path
                           fillRule="evenodd"
                           d="M12 14.5l-6-6 1.5-1.5L12 11.5l4.5-4.5L18 8.5l-6 6z"
                           clipRule="evenodd"
                         />
                       </svg>
                     </button>
                     {projectOpen && (
                       <div className="mt-1 space-y-1 rounded-xl border bg-gray-50 p-1">
                         {item.items.map((sub) => (
                           <a
                             key={sub.label}
                             href={sub.href}
                             className="block rounded-lg px-3 py-2 text-sm hover:bg-white"
                             onClick={() => setMobileOpen(false)}
                           >
                             {sub.label}
                           </a>
                         ))}
                       </div>
                     )}
                   </div>
                 ) : (
                   <a
                     href={item.href}
                     className="block rounded-xl px-3 py-2 text-sm hover:bg-gray-50"
                     onClick={() => setMobileOpen(false)}
                   >
                     {item.label}
                   </a>
                 )}
               </div>
             ))}

             <a
               href="#contact"
               className="mt-1 rounded-xl border border-gray-300 px-3 py-2 text-center text-sm font-medium hover:bg-gray-100"
               onClick={() => setMobileOpen(false)}
             >
               ขอใบเสนอราคา
             </a>
           </div>
         </div>
       </div>
     )}
   </header>
  );
}
