import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  Github, Linkedin, Mail, Menu, X, ExternalLink, 
  Code2, Globe, Cpu, BookOpen, ArrowUpRight, 
  Layout, Database, Terminal, Brain, Settings, 
  MessageSquare, User2, ShieldCheck 
} from 'lucide-react';

// --- Komponen Navbar ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-700 ${
      isScrolled ? 'py-4 bg-cream/90 backdrop-blur-md border-b border-zinc-200' : 'py-8 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.a href="#home" className="text-2xl font-black tracking-tighter text-espresso">
          APM<span className="text-bronze">.</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-[10px] uppercase tracking-[0.4em] font-bold text-espresso/60 hover:text-bronze transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <button className="md:hidden text-espresso" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-cream border-b border-zinc-200 p-8 flex flex-col gap-6 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold tracking-tight text-espresso hover:text-bronze">
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Komponen Section ---
const Section = ({ children, className, id }) => (
  <section id={id} className={`min-h-screen flex flex-col justify-center px-8 md:px-32 py-24 ${className}`}>
    {children}
  </section>
);

// --- Main Application ---
export default function App() {
  const container = useRef();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // --- LOGIKA FORM CONTACT ---
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Sending your message...');

    try {
      // Pastikan port (5000) sesuai dengan yang ada di server/index.js Anda
      const response = await fetch('https://afsalportofoliopro-x6vs7069.b4a.run/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('Message sent successfully! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setStatus('Server error. Make sure your backend is running.');
    } finally {
      setLoading(false);
      // Hilangkan pesan status setelah 5 detik
      setTimeout(() => setStatus(''), 5000);
    }
  };
  // -----------------------------

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useGSAP(() => {
    gsap.from(".reveal-item", {
      y: 120,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.15,
      skewY: 7
    });
  }, { scope: container });

return (
    <div className="bg-[#F9F7F2] text-espresso font-sans selection:bg-espresso selection:text-white overflow-x-hidden">
      <Navbar />

      {/* --- Home Section --- */}
      <Section id="home" className="relative overflow-hidden bg-cream pt-32">
        <div ref={container} className="max-w-7xl mx-auto z-10 w-full text-left">
          <div className="overflow-hidden mb-6">
            <span className="reveal-item block text-[10px] uppercase tracking-[0.6em] text-bronze font-bold">
              Engineering the Digital Future
            </span>
          </div>
          <div className="space-y-2 mb-16">
            <div className="overflow-hidden">
              <h1 className="reveal-item text-7xl md:text-[150px] font-black leading-[0.85] tracking-tighter text-espresso">
                ARCHITECTING
              </h1>
            </div>
            <div className="overflow-hidden flex items-center gap-6">
              <h1 className="reveal-item text-7xl md:text-[150px] font-black leading-[0.85] tracking-tighter text-espresso">
                <span className="text-stone-gold/20 italic font-thin">PURE</span> LOGIC.
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-5 overflow-hidden">
              <p className="reveal-item text-espresso/60 text-sm leading-relaxed border-l-2 border-bronze/30 pl-8 max-w-sm">
                Mahasiswa Informatika yang mengkurasi pengalaman digital melalui kode yang bersih dan estetika yang presisi. Berbasis di Bandung, Jawa Barat.
              </p>
            </div>
            <div className="md:col-span-7 flex justify-end gap-12 text-espresso/40 overflow-hidden">
              <div className="reveal-item flex gap-8">
                <Github className="hover:text-bronze cursor-pointer transition-all duration-500 hover:-translate-y-1" size={22} /> 
                <Linkedin className="hover:text-bronze cursor-pointer transition-all duration-500 hover:-translate-y-1" size={22} />
                <Mail className="hover:text-bronze cursor-pointer transition-all duration-500 hover:-translate-y-1" size={22} />
              </div>
            </div>
          </div>
        </div>
        <motion.div animate={{ x: mousePos.x, y: mousePos.y }} transition={{ type: "spring", stiffness: 50, damping: 20 }} className="absolute top-[15%] right-[-5%] w-[40vw] h-[40vw] border border-bronze/10 rounded-full pointer-events-none" />
        <motion.div animate={{ x: -mousePos.x * 1.5, y: -mousePos.y * 1.5 }} transition={{ type: "spring", stiffness: 50, damping: 20 }} className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] bg-bronze/[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/fine-grained.png')] opacity-[0.15] pointer-events-none" />
      </Section>

      {/* --- About Section --- */}
      <Section id="about" className="bg-cream border-t border-zinc-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start text-left">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className="md:col-span-5">
            <h2 className="text-bronze uppercase tracking-[0.5em] text-[10px] mb-8 font-bold">The Persona</h2>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-espresso mb-10">
              Afsal Prima <br /> Maula<span className="text-stone-gold/30">.</span>
            </h3>
            <div className="space-y-6 text-espresso/70 text-sm leading-relaxed max-w-sm">
              <p>Mahasiswa Teknik Informatika semester 3 di Bandung. Saya fokus pada pembuatan arsitektur digital yang bersih dan fungsional.</p>
              <p>Bagi saya, pemrograman adalah seni membangun solusi masa depan yang bermakna bagi setiap pengguna.</p>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-zinc-200 pt-8">
              <div>
                <span className="block text-2xl font-bold text-espresso tracking-tighter">03</span>
                <span className="text-[9px] uppercase tracking-widest text-bronze font-bold">Semester</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-espresso tracking-tighter">Bdg</span>
                <span className="text-[9px] uppercase tracking-widest text-bronze font-bold">Base</span>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-10 bg-espresso text-cream rounded-[48px] flex flex-col justify-between aspect-square group">
              <Layout className="text-gold-leaf" size={40} />
              <div>
                <h4 className="text-2xl font-bold tracking-tight mb-3 text-left">Frontend Artistry</h4>
                <p className="text-cream/50 text-xs text-left">Transformasi React & Tailwind menjadi antarmuka pixel-perfect.</p>
              </div>
            </div>
            <div className="p-10 border border-zinc-200 rounded-[48px] flex flex-col justify-between aspect-square group text-left">
              <Database className="text-bronze" size={40} />
              <div>
                <h4 className="text-2xl font-bold tracking-tight mb-3">System Logic</h4>
                <p className="text-espresso/50 text-xs">Perancangan database efisien untuk performa aplikasi maksimal.</p>
              </div>
            </div>
            <div className="p-10 border border-zinc-200 rounded-[48px] flex flex-col justify-between sm:col-span-2 group text-left">
              <Code2 className="text-stone-gold" size={40} />
              <h4 className="text-3xl font-bold tracking-tight mt-12 text-espresso">Informatics Engineering</h4>
              <p className="text-espresso/50 text-xs mt-4 italic text-left">"Mendalami algoritma untuk solusi masa depan."</p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* --- Skills Section (Bento Grid Profesional) --- */}
      {/* --- Skills Section: Luxury Architectural Bento --- */}
      <Section id="skills" className="bg-[#FDFBF7] relative overflow-hidden py-32">
        {/* Grain Overlay untuk kesan tekstur mahal */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section dengan Tipografi Agensi Besar */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-left"
            >
              <h2 className="text-bronze uppercase tracking-[0.8em] text-[9px] mb-8 font-black">Technical Assets</h2>
              <h3 className="text-6xl md:text-[100px] font-bold tracking-[ -0.05em] text-espresso leading-[0.8] mb-0">
                CRAFTING <br /> 
                <span className="italic text-stone-gold/20 font-thin tracking-tighter">PERFECTION.</span>
              </h3>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-espresso/40 text-[11px] max-w-[300px] leading-relaxed text-left md:text-right border-l md:border-l-0 md:border-r border-zinc-200 pl-6 md:pl-0 md:pr-6"
            >
              Integrasi logika rekayasa perangkat lunak dengan estetika visual yang tidak lekang oleh waktu.
            </motion.p>
          </div>

          {/* Bento Grid dengan Kedalaman Visual Tinggi */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* 1. Core Stack - The Giant Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 0.995 }}
              className="md:col-span-8 bg-white border border-zinc-100 rounded-[50px] p-10 md:p-16 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] flex flex-col justify-between group transition-all duration-700"
            >
              <div>
                <div className="flex justify-between items-start mb-16">
                  <div className="p-4 bg-espresso rounded-2xl text-cream group-hover:bg-bronze transition-colors duration-500">
                    <Terminal size={32} strokeWidth={1} />
                  </div>
                  <span className="text-[10px] font-black tracking-[0.3em] text-espresso/20 uppercase">Core Development</span>
                </div>
                <h4 className="text-3xl font-bold tracking-tight text-espresso mb-10 text-left">Technical Toolstack</h4>
                <div className="flex flex-wrap gap-3">
                  {['React.js', 'Tailwind v4', 'GSAP', 'Framer Motion', 'PHP', 'JavaScript', 'MySQL', 'Node.js'].map((skill, i) => (
                    <motion.span 
                      key={skill}
                      whileHover={{ y: -5, backgroundColor: "#1C1917", color: "#F9F7F2" }}
                      className="px-8 py-4 rounded-2xl bg-cream/50 border border-zinc-100 text-espresso/60 text-[11px] font-bold uppercase tracking-widest transition-all duration-500 cursor-default shadow-sm"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 2. Logic & Engineering - The Tall Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="md:col-span-4 bg-espresso text-cream rounded-[50px] p-10 md:p-16 flex flex-col justify-between relative overflow-hidden group shadow-2xl"
            >
              <div className="relative z-10">
                <Brain className="text-gold-leaf mb-12" size={40} strokeWidth={1} />
                <h4 className="text-3xl font-bold tracking-tight mb-8 text-left">System <br />Architecture</h4>
                <div className="space-y-6">
                  {['Software Design', 'System Logic', 'Database Management', 'SDLC Models'].map((item) => (
                    <div key={item} className="flex items-center gap-4 group/item">
                      <div className="w-2 h-[1px] bg-gold-leaf/30 group-hover/item:w-6 transition-all duration-500"></div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream/40 group-hover/item:text-cream transition-colors">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold-leaf/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            </motion.div>

            {/* 3. Human Skills - Minimalist Dashboard Style */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="md:col-span-5 bg-white border border-zinc-100 rounded-[50px] p-10 md:p-14 shadow-sm group hover:border-bronze transition-colors duration-700"
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center text-espresso group-hover:bg-espresso group-hover:text-cream transition-all">
                  <User2 size={20} />
                </div>
                <h4 className="text-lg font-bold tracking-tight text-espresso">Soft Power</h4>
              </div>
              <div className="grid grid-cols-1 gap-8">
                {[
                  { label: "Project Management", val: "PM for 'Pus Tani'" },
                  { label: "Linguistic", val: "Professional English" },
                  { label: "Public Speaking", val: "Technical Presentation" }
                ].map((s) => (
                  <div key={s.label} className="text-left border-l border-zinc-100 pl-6 hover:border-bronze transition-colors">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-bronze font-black mb-1">{s.label}</p>
                    <p className="text-espresso/40 text-xs font-medium">{s.val}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 4. Future Vision - Dark Glassmorphism */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="md:col-span-7 bg-[#F2EFE9] rounded-[50px] p-10 md:p-14 flex flex-col md:flex-row gap-12 items-center justify-between group relative overflow-hidden"
            >
              <div className="text-left relative z-10 flex-1">
                <ShieldCheck className="text-bronze mb-8" size={32} strokeWidth={1.5} />
                <h4 className="text-2xl font-bold tracking-tight text-espresso mb-4">Additional Expertise</h4>
                <p className="text-espresso/40 text-[11px] leading-relaxed max-w-xs uppercase tracking-widest font-bold">
                  Eksplorasi AI Integration, Web3 Ecosystem, dan Analisis Pasar Keuangan.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 relative z-10 w-full md:w-auto">
                {['Financial Market', 'AI & ML', 'Web3 Tech'].map((tech) => (
                  <div key={tech} className="px-6 py-3 bg-white/40 backdrop-blur-md rounded-xl border border-white/50 text-[9px] font-black uppercase tracking-[0.4em] text-espresso/30 text-center hover:text-bronze transition-colors">
                    {tech}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </Section>

      {/* --- Projects Section: Editorial Narrative with CTA --- */}
      <Section id="projects" className="bg-[#1A1A1A] text-[#FDFBF7] relative overflow-hidden py-32">
        {/* Subtle Dark Blue Radial Gradient */}
        <div className="absolute top-0 right-0 w-[70vw] h-[70vw] bg-[radial-gradient(circle_at_top_right,_#1e293b_0%,_transparent_60%)] opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="mb-32 text-left">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-gold-leaf uppercase tracking-[0.8em] text-[10px] mb-6 font-black"
            >
              Case Studies
            </motion.h2>
            <h3 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
              CRAFTING <br /> 
              <span className="italic font-thin text-white/20">SOLUTIONS.</span>
            </h3>
          </div>

          <div className="space-y-48">
            {/* Project 1: Pus Tani (Image Left, Text Right) */}
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full md:w-3/5 group"
              >
                <div className="relative rounded-[24px] border border-white/10 overflow-hidden bg-zinc-900 shadow-2xl">
                  <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex gap-1.5 items-center">
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                  </div>
                  <div className="overflow-hidden aspect-video bg-[#222]">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="w-full h-full bg-gradient-to-br from-bronze/20 to-espresso flex items-center justify-center"
                    >
                      <Layout size={64} className="text-white/10" strokeWidth={1} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full md:w-2/5 text-left"
              >
                <div className="space-y-6">
                  <p className="text-gold-leaf text-[10px] font-black uppercase tracking-[0.4em]">Agricultural Technology</p>
                  <h4 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">Pus Tani Platform</h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    "Solving agricultural distribution through technology." Memimpin digitalisasi rantai pasok tani dengan arsitektur data yang presisi.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {['Project Manager', 'Database Architect', 'React', 'MySQL'].map(tag => (
                      <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[9px] font-bold uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Project 2: Gedoy Camping (Text Left, Image Right) */}
            <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full md:w-2/5 text-left"
              >
                <div className="space-y-6">
                  <p className="text-gold-leaf text-[10px] font-black uppercase tracking-[0.4em]">Leisure & Business</p>
                  <h4 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">Gedoy Camping</h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Mentransformasi bisnis penyewaan villa konvensional menjadi ekosistem digital yang efisien dan user-centric.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {['Lead Developer', 'Fullstack', 'PHP', 'Tailwind CSS'].map(tag => (
                      <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[9px] font-bold uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full md:w-3/5 group"
              >
                <div className="relative rounded-[24px] border border-white/10 overflow-hidden bg-zinc-900 shadow-2xl">
                   <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex gap-1.5 items-center">
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                  </div>
                  <div className="overflow-hidden aspect-video bg-[#222]">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center"
                    >
                      <Globe size={64} className="text-white/10" strokeWidth={1} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Footer Call to Action (Integrated Style) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-48 pt-20 border-t border-white/10 flex flex-col items-center"
          >
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.5em] mb-10 text-center italic">
              Ingin melihat arsitektur kode lainnya??
            </p>
            <a 
              href="https://github.com/afsalprimamaula" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-6 text-[#FDFBF7] font-black text-2xl md:text-4xl tracking-tighter hover:text-gold-leaf transition-all duration-500"
            >
              EXPLORE REPOSITORY 
              <Github className="group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500 text-gold-leaf" size={32} />
            </a>
          </motion.div>
        </div>
      </Section>

      {/* --- Blog Section --- */}
      {/* --- Blog Section: Editorial Journal Aesthetics --- */}
      <Section id="blog" className="bg-[#2D3A30] text-[#FDFBF7] py-32 relative overflow-hidden">
        {/* Dekoratif Latar Belakang */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header & Filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-left"
            >
              <h2 className="text-white/40 uppercase tracking-[0.6em] text-[10px] mb-6 font-bold">Journal</h2>
              <h3 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
                LATEST <br /> <span className="italic font-thin text-white/30">ARTICLES.</span>
              </h3>
            </motion.div>

            {/* Minimalist Filter Pills */}
            <div className="flex flex-wrap gap-3">
              {['All', 'Web3', 'Engineering', 'AI'].map((cat) => (
                <button 
                  key={cat}
                  className="px-6 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-widest font-bold hover:bg-[#FDFBF7] hover:text-[#2D3A30] transition-all duration-500"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Article List Container */}
          <div className="border-t border-white/10">
            {[
              {
                date: "Jan 18, 2026",
                category: "Web3",
                title: "The Future of Web3 in Indonesia",
                desc: "Menelusuri potensi desentralisasi dalam ekosistem digital lokal yang sedang berkembang pesat.",
                readTime: "5 min read",
                img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=400&auto=format&fit=crop"
              },
              {
                date: "Jan 12, 2026",
                category: "Engineering",
                title: "Modern Database Management with Stored Procedures",
                desc: "Optimasi logika backend menggunakan arsitektur database yang presisi dan efisien.",
                readTime: "8 min read",
                img: "https://images.unsplash.com/photo-1544380903-586141049310?q=80&w=400&auto=format&fit=crop"
              },
              {
                date: "Jan 05, 2026",
                category: "AI",
                title: "How AI is Revolutionizing Frontend Development",
                desc: "Transformasi alur kerja UI/UX melalui integrasi kecerdasan buatan dalam pengembangan komponen.",
                readTime: "6 min read",
                img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400&auto=format&fit=crop"
              }
            ].map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative border-b border-white/10 py-12 md:py-16 transition-all duration-700 hover:px-4 md:hover:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 cursor-pointer"
              >
                {/* Image Preview Side - Fade in on side effect */}
                <div className="absolute left-[60%] top-1/2 -translate-y-1/2 w-48 h-32 opacity-0 group-hover:opacity-100 group-hover:left-[65%] transition-all duration-700 pointer-events-none hidden lg:block overflow-hidden rounded-xl border border-white/20 shadow-2xl">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-125 group-hover:scale-100" />
                </div>

                {/* Left: Date */}
                <div className="w-32">
                  <span className="text-gray-400 text-xs font-mono tracking-tighter">{post.date}</span>
                </div>

                {/* Center: Title & Description */}
                <div className="flex-1 text-left md:max-w-2xl group-hover:translate-x-4 transition-transform duration-700">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 border border-white/10 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-[9px] font-medium text-gray-400 italic">
                      {post.readTime}
                    </span>
                  </div>
                  <h4 className="text-2xl md:text-4xl font-bold tracking-tight text-[#FDFBF7] group-hover:font-serif group-hover:italic transition-all duration-500">
                    {post.title}
                  </h4>
                  <p className="mt-4 text-gray-300 text-sm leading-relaxed max-w-xl opacity-60 group-hover:opacity-100 transition-opacity">
                    {post.desc}
                  </p>
                </div>

                {/* Right: Read More */}
                <div className="flex items-center gap-4 group-hover:text-white transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] hidden sm:block">Read More</span>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#FDFBF7] group-hover:text-[#2D3A30] transition-all duration-500">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer CTA */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 flex justify-center"
          >
            <a href="#blog" className="text-white/20 hover:text-white text-[10px] font-bold uppercase tracking-[0.5em] transition-all border-b border-transparent hover:border-white pb-2">
              View All Insights
            </a>
          </motion.div>
        </div>
      </Section>

      {/* --- Contact Section --- */}
      <Section id="contact" className="bg-[#0F172A] text-[#FDFBF7] py-32 relative overflow-hidden text-left">
        {/* Glow Halus Midnight Navy */}
        <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_bottom_right,_#1e293b_0%,_transparent_60%)] opacity-50 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32">
            
            {/* Kolom Kiri */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="flex flex-col justify-between text-left">
              <div>
                <h3 className="text-5xl md:text-8xl font-serif font-light tracking-tighter mb-8 italic">Get in touch<span className="text-blue-400">.</span></h3>
                <p className="text-white/50 text-lg max-w-sm mb-12 italic leading-relaxed">
                  "Available for select freelance opportunities." Let's collaborate on your next digital venture.
                </p>
                <div className="space-y-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-2">Direct Mail</p>
                    <p className="text-xl font-medium hover:text-blue-400 transition-colors">hello@afsal.dev</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-2">Current Location</p>
                    <p className="text-xl font-medium flex items-center gap-3">
                      Bandung, Indonesia <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-20">
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-6 font-bold">Social Connections</p>
                <div className="flex gap-8">
                  <Github className="text-white/40 hover:text-white transition-all cursor-pointer" />
                  <Linkedin className="text-white/40 hover:text-white transition-all cursor-pointer" />
                  <Mail className="text-white/40 hover:text-white transition-all cursor-pointer" />
                </div>
              </div>
            </motion.div>

            {/* Kolom Kanan: Interactive Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}>
              <form onSubmit={handleSubmit} className="space-y-12">
                
                {/* Status Message Display */}
                {status && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 border border-blue-400/30 bg-blue-400/5 text-blue-400 text-[11px] font-bold uppercase tracking-widest">
                    {status}
                  </motion.div>
                )}
                {/* Field: Name */}
                <div className="relative group">
                  <input 
                    type="text" 
                    required
                    placeholder=" "
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="peer w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-blue-400 transition-colors text-lg"
                  />
                  <label className="absolute left-0 top-4 text-white/30 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px]">
                    Your Name
                  </label>
                </div>

                {/* Field: Email */}
                <div className="relative group">
                  <input 
                    type="email" 
                    required
                    placeholder=" "
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="peer w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-blue-400 transition-colors text-lg"
                  />
                  <label className="absolute left-0 top-4 text-white/30 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px]">
                    Email Address
                  </label>
                </div>

                {/* Field: Message */}
                <div className="relative group">
                  <textarea 
                    required
                    rows="4"
                    placeholder=" "
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="peer w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-blue-400 transition-colors text-lg resize-none"
                  />
                  <label className="absolute left-0 top-4 text-white/30 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px]">
                    Your Message
                  </label>
                </div>

                {/* Submit Button */}
                <div className="space-y-6 pt-4">
                  <motion.button 
                    disabled={loading}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className={`w-full py-6 text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 shadow-xl ${loading ? 'bg-zinc-800 text-white/50 cursor-not-allowed' : 'bg-[#FDFBF7] text-[#0F172A] hover:bg-blue-400'}`}
                  >
                    {loading ? 'Processing...' : 'Send Message'}
                  </motion.button>
                  
                  <div className="flex justify-between items-center text-[9px] text-white/20 uppercase tracking-[0.2em] font-bold">
                    <span>Typical response time: Within 24 hours</span>
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Secure Encryption
                    </span>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </Section>

      <footer className="py-12 text-center text-[9px] uppercase tracking-[0.4em] text-espresso/40">
        &copy; 2026 Afsal Prima Maula
      </footer>
    </div>
  );
}