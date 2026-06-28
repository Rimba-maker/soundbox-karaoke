import { motion } from 'framer-motion'
import {
  Microphone2, Tablet, Lightbulb, Bluetooth,
  LockPassword, Snowflake, MapPoint, CameraMinimalistic,
  CupHot, CupPaper, CupStar,
} from '@solar-icons/react'
import { stageFade, staggerContainer } from '../ui/animations'

const FACILITIES = [
  { Icon: Microphone2,  color: '#e91e8c', title: 'Microphone Wireless Sennheiser', desc: 'Bukan yang bikin suara aneh — kualitas studio recording.' },
  { Icon: Tablet,       color: '#7c3aed', title: 'Tablet Control System',           desc: 'Cari lagu, atur volume, order F&B — semua dari satu tablet di tiap room.' },
  { Icon: Lightbulb,    color: '#f59e0b', title: 'LED Mood Lighting',               desc: 'Ganti warna sesuai mood, 18 pilihan warna. Dari merah menyala sampai biru lembut.' },
  { Icon: Bluetooth,    color: '#7c3aed', title: 'Bluetooth Input',                 desc: 'Mau putar playlist sendiri di jeda? Connect aja — semua room support Bluetooth & HDMI.' },
  { Icon: LockPassword, color: '#e91e8c', title: 'Loker Barang',                    desc: 'Titip tas & barang berharga di dalam room, aman dan terkunci.' },
  { Icon: Snowflake,    color: '#7c3aed', title: 'AC Individual Per Room',          desc: 'Atur sendiri suhunya tanpa bergantung AC sentral. Panas atau dingin, terserah kamu.' },
  { Icon: MapPoint,            color: '#e91e8c', title: 'Parkir Luas & Gratis',  desc: '80 mobil + 100 motor, gratis untuk semua tamu. Tidak perlu khawatir parkir.' },
  { Icon: CameraMinimalistic, color: '#7c3aed', title: 'CCTV di Area Umum',     desc: 'Aman dan nyaman. CCTV 24 jam di seluruh area umum.' },
]

const FNB = [
  { Icon: CupHot,   color: '#e91e8c', label: 'Makanan', items: 'Pizza · Pasta · Ayam Goreng · Kentang Goreng · Dimsum · Dan masih banyak lagi' },
  { Icon: CupPaper, color: '#7c3aed', label: 'Minuman', items: 'Soft Drink · Jus Segar · Mocktail · Es Teh · Kopi Susu' },
  { Icon: CupStar,  color: '#f59e0b', label: 'Snack',   items: 'Nachos · Popcorn · Onion Ring · Chicken Wings · Edamame' },
]

export default function Facilities() {
  return (
    <section className="section-padding bg-bg" id="fasilitas">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.p variants={stageFade} className="text-xs font-bold text-purple tracking-[0.2em] uppercase mb-3">Fasilitas</motion.p>
          <motion.h2 variants={stageFade} className="text-4xl md:text-5xl font-extrabold font-display text-white">
            Fasilitasnya Lengkap. <span className="gradient-text">Serius.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {FACILITIES.map((f) => (
            <motion.div
              key={f.title}
              variants={stageFade}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="card-dark p-5 hover:border-pink/30 transition-colors duration-300 group"
            >
              <motion.div
                className="mb-3 w-fit"
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <f.Icon size={36} weight="BoldDuotone" color={f.color} />
              </motion.div>
              <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-pink transition-colors">{f.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* F&B */}
        <motion.div
          variants={stageFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="card-dark p-8 border border-pink/20"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3">
              <p className="text-xs font-bold text-pink tracking-[0.2em] uppercase mb-2">Order dari Room</p>
              <h3 className="text-2xl font-extrabold font-display text-white mb-3">Menu F&B Tersedia</h3>
              <p className="text-muted text-sm leading-relaxed">
                Order via tablet di room, diantar langsung tanpa perlu keluar.{' '}
                <span className="text-white font-semibold">Tidak ada minimum order</span>,{' '}
                tidak ada biaya servis tersembunyi.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {FNB.map(({ Icon, color, label, items }) => (
                <div key={label} className="bg-surface-2 rounded-xl p-4">
                  <p className="inline-flex items-center gap-1.5 text-sm font-bold text-white mb-2">
                    <Icon size={15} weight="BoldDuotone" color={color} />
                    {label}
                  </p>
                  <p className="text-xs text-muted leading-relaxed">{items}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
