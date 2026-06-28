import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AltArrowDown } from '@solar-icons/react'
import { stageFade, staggerContainer } from '../ui/animations'

const FAQS = [
  { q: 'Apakah bisa walk-in tanpa booking?', a: 'Bisa! Tapi booking dulu lebih aman — terutama weekend dan malam. Kalau ada room kosong, langsung masuk tanpa antre.' },
  { q: 'Berapa minimum orang untuk masuk?', a: 'Tidak ada minimum. Mau berdua di Box Room? Silakan — dan itu bahkan lebih seru dan lebih hemat!' },
  { q: 'Apakah boleh bawa makanan & minuman dari luar?', a: 'Maaf, tidak boleh. Tapi F&B kami harganya reasonable dan bisa order langsung dari dalam room via tablet — tanpa perlu keluar.' },
  { q: 'Apakah mic-nya bersih?', a: 'Mic di-sanitize dengan UV sterilizer dan disinfektan setiap pergantian tamu. Kalau masih ragu, tersedia mic cover sekali pakai — gratis, minta ke staff.' },
  { q: 'Apakah bisa request lagu yang tidak ada di katalog?', a: 'Bisa! Request ke staff atau via WA, kami tambah dalam 3 hari kerja. Setelah lagu ditambah, kami konfirmasi via WhatsApp.' },
  { q: 'Apakah bisa extend waktu?', a: 'Bisa. Minta ke staff 15 menit sebelum waktu habis. Kami cek ketersediaan — kalau room tidak ada yang booking setelah, langsung lanjut.' },
  { q: 'Apakah ada aturan khusus?', a: 'Tidak ada kekerasan, tidak ada tindakan merusak fasilitas, tidak ada konsumsi alkohol (kami dry venue). Selain itu, nyanyi sesukamu! 😄' },
  { q: 'Apakah anak-anak boleh masuk?', a: 'Boleh! Semua umur welcome. Anak di bawah 12 tahun harus ditemani orang tua atau wali.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="section-padding bg-bg" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.p variants={stageFade} className="text-xs font-bold text-purple tracking-[0.2em] uppercase mb-3">FAQ</motion.p>
          <motion.h2 variants={stageFade} className="text-4xl md:text-5xl font-extrabold font-display text-white">
            Pertanyaan yang <span className="gradient-text">Sering Ditanya.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-3"
        >
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              variants={stageFade}
              className={`card-dark overflow-hidden border-l-2 transition-colors duration-300 ${
                open === i ? 'border-l-pink' : 'border-l-transparent'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className={`text-sm font-semibold transition-colors ${open === i ? 'text-white' : 'text-muted hover:text-white'}`}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0"
                >
                  <AltArrowDown size={18} weight="Bold" color={open === i ? '#e91e8c' : '#9ca3af'} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
