import { motion } from 'framer-motion'
import { Microphone2, VolumeLoud, ClockCircle, CupHot, Crown, MusicNote } from '@solar-icons/react'
import { beatReveal, stageFade } from '../ui/animations'

const TICKER = [
  { Icon: Microphone2, text: '50.000+ Lagu' },
  { Icon: VolumeLoud,  text: 'Sound System JBL Pro' },
  { Icon: ClockCircle, text: 'Buka 12.00–02.00' },
  { Icon: CupHot,      text: 'F&B Tersedia' },
  { Icon: Crown,       text: '4 Tipe Room' },
]

const NOTES = [
  { delay: 0,   left: '8%',  size: 20 },
  { delay: 1.3, left: '22%', size: 14 },
  { delay: 2.1, left: '55%', size: 22 },
  { delay: 0.7, left: '72%', size: 16 },
  { delay: 3.0, left: '88%', size: 18 },
  { delay: 1.8, left: '40%', size: 12 },
]

function FloatingNote({ delay, left, size }: { delay: number; left: string; size: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left, bottom: '25%' }}
      animate={{ y: [0, -90], opacity: [0, 0.6, 0], rotate: [0, 18] }}
      transition={{ duration: 4, repeat: Infinity, delay, ease: 'easeOut' }}
    >
      <MusicNote size={size} weight="Broken" color="#e91e8c" />
    </motion.div>
  )
}

function TickerItem({ Icon, text }: { Icon: typeof Microphone2; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-6">
      <Icon size={14} weight="Bold" color="#e91e8c" />
      <span>{text}</span>
      <span className="text-pink/40 ml-4">•</span>
    </span>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [1, 0.85, 1, 0.9, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80"
          alt="Karaoke room neon lights"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/40 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/60 via-transparent to-bg/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-pink/8 via-transparent to-purple/8" />
      </motion.div>

      {/* Floating notes */}
      {NOTES.map((n, i) => <FloatingNote key={i} {...n} />)}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-40 w-full">
        <motion.div
          variants={beatReveal}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={stageFade} className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-pink animate-pulse" />
            <span className="text-xs font-bold text-pink tracking-[0.2em] uppercase">Buka Sekarang</span>
          </motion.div>

          <motion.h1
            variants={stageFade}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-display text-white leading-[1.05] mb-6"
          >
            Teriakkan Lagu Favoritmu.{' '}
            <span className="gradient-text">Kami Tidak Akan Menilai.</span>
          </motion.h1>

          <motion.p
            variants={stageFade}
            className="text-lg md:text-xl text-muted leading-relaxed mb-10 max-w-xl"
          >
            Karaoke private room dengan sound system kelas konser, 50.000+ lagu update terus, dan ruangan yang bikin kamu tidak mau pulang. Buka setiap hari sampai jam 02.00.
          </motion.p>

          <motion.div variants={stageFade} className="flex flex-wrap gap-4">
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 bg-pink text-white rounded-full px-8 py-4 text-base font-bold hover:bg-pink-dark transition-colors glow-pink"
            >
              <Microphone2 size={20} weight="Bold" color="#ffffff" />
              Book Room Sekarang
            </motion.a>
            <a
              href="#harga"
              className="inline-flex items-center gap-2 border border-white/30 text-white rounded-full px-8 py-4 text-base font-semibold hover:border-white/60 hover:bg-white/5 transition-all"
            >
              Cek Harga & Promo
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={stageFade} className="flex flex-wrap gap-8 mt-14">
            {[['50.000+','Lagu'],['4','Tipe Room'],['02.00','Tutup Jam'],['15 Menit','Konfirmasi']].map(([val, label]) => (
              <div key={label}>
                <p className="text-2xl font-extrabold font-display text-white">{val}</p>
                <p className="text-xs text-muted mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Energy ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-pink/10 border-t border-pink/20 backdrop-blur-sm overflow-hidden">
        <div className="ticker-track py-3 text-sm font-medium text-white/70">
          {[...Array(3)].map((_, i) =>
            TICKER.map((item, j) => <TickerItem key={`${i}-${j}`} {...item} />)
          )}
          {[...Array(3)].map((_, i) =>
            TICKER.map((item, j) => <TickerItem key={`dup-${i}-${j}`} {...item} />)
          )}
        </div>
      </div>
    </section>
  )
}
