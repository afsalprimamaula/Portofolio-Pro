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
      isScrolled ? 'py-4 bg-white/80 backdrop-blur-md border-b border-zinc-200' : 'py-8 bg-transparent'
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
            className="absolute top-full left-0 w-full bg-white border-b border-zinc-200 p-8 flex flex-col gap-6 md:hidden shadow-xl"
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
      const response = await fetch('http://localhost:5000/api/contact', {
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
      <Section id="home" className="relative overflow-hidden bg-[#F9F7F2] pt-32 text-left">
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
      </Section>

      {/* --- About Section --- */}
      <Section id="about" className="bg-[#F9F7F2] border-t border-zinc-100">
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
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-10 bg-espresso text-white rounded-[48px] flex flex-col justify-between aspect-square group">
              <Layout className="text-gold-leaf" size={40} />
              <div>
                <h4 className="text-2xl font-bold tracking-tight mb-3">Frontend Artistry</h4>
                <p className="text-white/50 text-xs">Transformasi React & Tailwind menjadi antarmuka pixel-perfect.</p>
              </div>
            </div>
            <div className="p-10 border border-zinc-200 bg-white rounded-[48px] flex flex-col justify-between aspect-square group text-left">
              <Database className="text-bronze" size={40} />
              <div>
                <h4 className="text-2xl font-bold tracking-tight mb-3 text-espresso">System Logic</h4>
                <p className="text-espresso/50 text-xs">Perancangan database efisien untuk performa aplikasi maksimal.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* --- Skills Section --- */}
      <Section id="skills" className="bg-[#FDFBF7] relative overflow-hidden py-32 text-left">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 gap-12 text-left">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
              <h2 className="text-bronze uppercase tracking-[0.8em] text-[9px] mb-8 font-black">Technical Assets</h2>
              <h3 className="text-6xl md:text-[100px] font-bold tracking-[-0.05em] text-espresso leading-[0.8]">
                CRAFTING <br /> 
                <span className="italic text-stone-gold/20 font-thin tracking-tighter">PERFECTION.</span>
              </h3>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="md:col-span-8 bg-white border border-zinc-100 rounded-[50px] p-10 md:p-16 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.02)] flex flex-col justify-between group transition-all duration-700">
              <div>
                <Terminal className="p-4 bg-espresso rounded-2xl text-white mb-10" size={64} strokeWidth={1} />
                <h4 className="text-3xl font-bold tracking-tight text-espresso mb-10">Technical Toolstack</h4>
                <div className="flex flex-wrap gap-3">
                  {['React.js', 'Tailwind v4', 'GSAP', 'Framer Motion', 'PHP', 'JavaScript', 'MySQL', 'Node.js'].map((skill) => (
                    <span key={skill} className="px-8 py-4 rounded-2xl bg-[#F9F7F2] border border-zinc-100 text-espresso/60 text-[11px] font-bold uppercase tracking-widest shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="md:col-span-4 bg-espresso text-white rounded-[50px] p-10 md:p-16 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <Brain className="text-gold-leaf mb-12" size={40} />
                <h4 className="text-3xl font-bold tracking-tight mb-8">System <br />Architecture</h4>
                <div className="space-y-6 text-left">
                  {['Software Design', 'System Logic', 'Database Management', 'SDLC Models'].map((item) => (
                    <div key={item} className="flex items-center gap-4 group">
                      <div className="w-2 h-[1px] bg-gold-leaf/30 group-hover:w-6 transition-all"></div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">{item}</span>
                    </div>
                  ))}
                </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
      </Section>

      {/* --- Projects Section --- */}
      <Section id="projects" className="bg-[#1A1A1A] text-[#FDFBF7] relative overflow-hidden py-32 text-left">
        <div className="absolute top-0 right-0 w-[70vw] h-[70vw] bg-[radial-gradient(circle_at_top_right,_#1e293b_0%,_transparent_60%)] opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-32">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-gold-leaf uppercase tracking-[0.8em] text-[10px] mb-6 font-black">Case Studies</motion.h2>
            <h3 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none text-[#FDFBF7]">CRAFTING <br /> <span className="italic font-thin text-white/20">SOLUTIONS.</span></h3>
          </div>

          <div className="space-y-48">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="w-full md:w-3/5 group">
                <div className="relative rounded-[24px] border border-white/10 overflow-hidden bg-zinc-900 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]">
                  <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex gap-1.5 items-center">
                    <div className="w-2 h-2 rounded-full bg-white/10" /><div className="w-2 h-2 rounded-full bg-white/10" /><div className="w-2 h-2 rounded-full bg-white/10" />
                  </div>
                  <div className="overflow-hidden aspect-video bg-[#222]">
                    <motion.div whileHover={{ scale: 1.05 }} className="w-full h-full bg-gradient-to-br from-bronze/20 to-espresso flex items-center justify-center">
                      <Layout size={64} className="text-white/10" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} className="w-full md:w-2/5 text-left">
                <p className="text-gold-leaf text-[10px] font-black uppercase mb-4 tracking-[0.4em]">Agricultural Technology</p>
                <h4 className="text-4xl md:text-5xl font-bold text-[#FDFBF7]">Pus Tani Platform</h4>
                <p className="text-white/50 text-sm mt-6 leading-relaxed italic">"Solving agricultural distribution through technology." Fokus pada otomatisasi database trigger & procedures.</p>
                <div className="flex gap-2 mt-8">
                    {['Project Manager', 'Database', 'React'].map(tag => (
                      <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-[9px] font-bold uppercase tracking-widest">{tag}</span>
                    ))}
                </div>
              </motion.div>
            </div>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mt-48 pt-20 border-t border-white/10 flex flex-col items-center">
            <a href="https://github.com/afsalprimamaula" target="_blank" className="group flex items-center gap-6 text-[#FDFBF7] font-black text-2xl md:text-4xl tracking-tighter hover:text-gold-leaf transition-all duration-500">
              EXPLORE REPOSITORY <Github size={32} className="text-gold-leaf" />
            </a>
          </motion.div>
        </div>
      </Section>

      {/* --- Blog Section --- */}
      <Section id="blog" className="bg-[#2D3A30] text-[#FDFBF7] py-32 relative overflow-hidden text-left">
        <div className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_top_left,_#3d4f41_0%,_transparent_60%)] opacity-50 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
              <h2 className="text-white/40 uppercase tracking-[0.6em] text-[10px] mb-6 font-bold">Journal</h2>
              <h3 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">LATEST <br /> <span className="italic font-thin text-white/30">ARTICLES.</span></h3>
            </motion.div>
          </div>
          <div className="border-t border-white/10">
            {[
              { date: "Jan 18, 2026", cat: "Web3", title: "The Future of Web3 in Indonesia" },
              { date: "Jan 12, 2026", cat: "Engineering", title: "Modern Database Management" }
            ].map((post, i) => (
              <div key={i} className="group border-b border-white/10 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 cursor-pointer hover:px-10 transition-all duration-700">
                <span className="text-white/40 text-xs font-mono">{post.date}</span>
                <div className="flex-1 text-left">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 border border-white/10 px-3 py-1 rounded-full mb-4 inline-block">{post.cat}</span>
                    <h4 className="text-2xl md:text-4xl font-bold text-[#FDFBF7] group-hover:font-serif group-hover:italic transition-all">{post.title}</h4>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#FDFBF7] group-hover:text-[#2D3A30] transition-all"><ArrowUpRight size={20} /></div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* --- Contact Section: ULTRA-MINIMALIST ARCHITECTURE --- */}
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

      <footer className="py-12 text-center text-[9px] uppercase tracking-[0.4em] text-white/20 bg-[#0F172A]">
        &copy; 2026 Afsal Prima Maula &bull; Handcrafted in Bandung
      </footer>
    </div>
  );
}