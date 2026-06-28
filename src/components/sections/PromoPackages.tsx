import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  Gift, UsersGroupTwoRounded, ClockCircle, Moon, Buildings2, CheckCircle,
} from '@solar-icons/react'
import { stageFade, staggerContainer } from '../ui/animations'

const WA = '628112233445'

const PROMOS = [
  {
    Icon: Gift,
    iconColor: '#e91e8c',
    label: 'Terlaris',
    labelColor: 'text-pink bg-pink/10 border-pink/30',
    title: 'Birthday Package',
    price: 'Rp 750.000',
    priceNote: 'Studio Room, 2 jam',
    perks: [
      'Room Studio 2 jam',
      'Dekorasi balon & banner ulang tahun',
      '1 loyang kue ulang tahun',
      '1 botol minuman spesial',
      'Free 1 jam extra jika book H-3',
      'Berlaku weekday only',
    ],
    border: 'border-pink/40',
    cta: 'Book Birthday Party',
    isBirthday: true,
  },
  {
    Icon: UsersGroupTwoRounded,
    iconColor: '#7c3aed',
    label: 'Hemat 20%',
    labelColor: 'text-purple bg-purple/10 border-purple/30',
    title: 'Group Package',
    price: 'Diskon 20%',
    priceNote: 'untuk 10+ orang',
    perks: [
      'Diskon 20% Stage atau VIP Room',
      'Free 1 pitcher minuman',
      'Free snack platter',
      'Berlaku semua hari',
    ],
    border: 'border-purple/30',
    cta: 'Book Group Sekarang',
    isBirthday: false,
  },
  {
    Icon: ClockCircle,
    iconColor: '#4ade80',
    label: 'Weekday Only',
    labelColor: 'text-green-400 bg-green-400/10 border-green-400/30',
    title: 'Happy Hour Special',
    price: 'Hemat 20%',
    priceNote: 'Weekday 12.00 – 17.00',
    perks: [
      'Semua room 20% lebih murah',
      'No minimum stay',
      'No catch — langsung dapat diskon',
      'Berlaku Senin – Kamis',
    ],
    border: 'border-green-400/30',
    cta: 'Cek Jadwal Happy Hour',
    isBirthday: false,
  },
  {
    Icon: Moon,
    iconColor: '#7c3aed',
    label: 'After 22.00',
    labelColor: 'text-purple bg-purple/10 border-purple/30',
    title: 'Late Night Deal',
    price: 'Harga Spesial',
    priceNote: 'setelah pukul 22.00',
    perks: [
      'Semua room harga late night khusus',
      'Lebih murah dari prime time',
      'Cocok untuk nyanyi sampai pagi',
      'Berlaku setiap hari',
    ],
    border: 'border-purple/20',
    cta: 'Book Late Night',
    isBirthday: false,
  },
  {
    Icon: Buildings2,
    iconColor: '#f59e0b',
    label: 'Corporate',
    labelColor: 'text-gold bg-gold/10 border-gold/30',
    title: 'Team Building',
    price: 'Special Rate',
    priceNote: 'min. 15 orang',
    perks: [
      'Stage atau VIP Room',
      'F&B package included',
      'Dedicated host',
      'Custom invoice & kwitansi kantor',
    ],
    border: 'border-gold/30',
    cta: 'Minta Penawaran',
    isBirthday: false,
  },
]

function triggerConfetti() {
  confetti({
    particleCount: 80,
    spread: 80,
    origin: { y: 0.55 },
    colors: ['#e91e8c', '#7c3aed', '#f59e0b', '#ffffff', '#ff6b9d'],
  })
}

export default function PromoPackages() {
  return (
    <section className="section-padding bg-surface-3" id="promo">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.p variants={stageFade} className="text-xs font-bold text-gold tracking-[0.2em] uppercase mb-3">Promo & Paket</motion.p>
          <motion.h2 variants={stageFade} className="text-4xl md:text-5xl font-extrabold font-display text-white mb-3">
            Ada <span className="gradient-text">Promo Nih.</span>
          </motion.h2>
          <motion.p variants={stageFade} className="text-muted">Hemat lebih, nyanyi lebih lama.</motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {PROMOS.map((p) => (
            <motion.div
              key={p.title}
              variants={stageFade}
              whileHover={{ y: -6, scale: 1.01 }}
              onHoverStart={p.isBirthday ? triggerConfetti : undefined}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`card-dark flex flex-col p-6 border ${p.border} transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <p.Icon size={44} weight="BoldDuotone" color={p.iconColor} />
                </motion.div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${p.labelColor}`}>
                  {p.label}
                </span>
              </div>

              <h3 className="text-xl font-extrabold font-display text-white mb-1">{p.title}</h3>
              <p className="text-2xl font-extrabold text-pink mb-0.5">{p.price}</p>
              <p className="text-xs text-muted mb-5">{p.priceNote}</p>

              <ul className="flex flex-col gap-2 flex-1 mb-6">
                {p.perks.map(perk => (
                  <li key={perk} className="flex items-start gap-2 text-sm text-muted">
                    <CheckCircle size={16} weight="Bold" color="#e91e8c" className="mt-0.5 shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>

              <motion.a
                href={`https://wa.me/${WA}?text=${encodeURIComponent(`Halo SoundBox! Saya tertarik dengan promo ${p.title}. Bisa info lebih lanjut?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full inline-flex justify-center items-center gap-2 bg-pink text-white rounded-full py-3 text-sm font-bold hover:bg-pink-dark transition-colors"
              >
                {p.cta} →
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
