import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AltArrowLeft, AltArrowRight, Star } from '@solar-icons/react'
import { stageFade, staggerContainer } from '../ui/animations'

const REVIEWS = [
  {
    quote: 'Sound system-nya beneran beda levelnya. Suara kita jadi bagus di sini — atau mungkin memang ruangannya yang make everything sound better 😂',
    name: 'Rani & Gang',
    role: 'Google Review',
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
  },
  {
    quote: 'Birthday anak saya di Stage Room. Dekorasinya sudah siap waktu kami datang, snack-nya enak, dan anak-anak tidak mau pulang sampai jam 11 malam.',
    name: 'Bu Dewi',
    role: 'Ibu birthday girl',
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
  },
  {
    quote: 'Team outing kantor di VIP Suite. 25 orang, dan semua orang jadi berani nyanyi — termasuk yang biasanya paling pendiam. Recommended banget buat team building!',
    name: 'Pak Doni',
    role: 'Manajer Perusahaan',
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
  },
  {
    quote: 'Happy hour weekday adalah penyelamat hidup. Datang jam 2 siang, bayar harga murah, pulang jam 5 — sempurna buat hari Rabu yang membosankan.',
    name: '@weekdayescaper',
    role: 'Instagram',
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
  },
  {
    quote: 'Katalog lagunya lengkap banget. Dari lagu mama saya tahun 80an sampai lagu yang baru release minggu lalu. Semua ada.',
    name: 'Tio',
    role: 'Pengunjung Setia',
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08, type: 'spring', stiffness: 400 }}
        >
          <Star size={16} weight="BoldDuotone" color="#f59e0b" />
        </motion.div>
      ))}
    </div>
  )
}

export default function Testimonial() {
  const [cur, setCur] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setCur(c => (c + 1) % REVIEWS.length), 7000)
    return () => clearInterval(t)
  }, [paused])

  return (
    <section className="section-padding bg-surface-3" id="testimoni">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.p variants={stageFade} className="text-xs font-bold text-pink tracking-[0.2em] uppercase mb-3">Testimoni</motion.p>
          <motion.h2 variants={stageFade} className="text-4xl md:text-5xl font-extrabold font-display text-white">
            Kata Mereka Yang Sudah <span className="gradient-text">Nyanyi Di Sini.</span>
          </motion.h2>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={cur}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="card-dark p-8 md:p-10 text-center"
            >
              <div className="flex justify-center">
                <StarRating count={REVIEWS[cur].stars} />
              </div>
              <blockquote className="text-white text-lg md:text-xl font-medium leading-relaxed mt-5 mb-8">
                "{REVIEWS[cur].quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <img
                  src={REVIEWS[cur].avatar}
                  alt={REVIEWS[cur].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-pink/30"
                />
                <div className="text-left">
                  <p className="text-white font-bold text-sm">{REVIEWS[cur].name}</p>
                  <p className="text-muted text-xs">{REVIEWS[cur].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCur(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === cur ? 'w-6 h-2 bg-pink' : 'w-2 h-2 bg-surface-2 hover:bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => setCur(c => (c - 1 + REVIEWS.length) % REVIEWS.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-10 h-10 bg-surface border border-border rounded-full items-center justify-center text-white hover:bg-surface-2 transition-colors hidden md:flex"
          >
            <AltArrowLeft size={18} weight="Bold" color="#ffffff" />
          </button>
          <button
            onClick={() => setCur(c => (c + 1) % REVIEWS.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-10 h-10 bg-surface border border-border rounded-full items-center justify-center text-white hover:bg-surface-2 transition-colors hidden md:flex"
          >
            <AltArrowRight size={18} weight="Bold" color="#ffffff" />
          </button>
        </div>
      </div>
    </section>
  )
}
