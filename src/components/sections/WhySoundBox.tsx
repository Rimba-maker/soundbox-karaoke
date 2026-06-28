import { motion } from 'framer-motion'
import {
  VolumeLoud, MusicNote, Monitor, Gamepad, CupHot, Broom,
} from '@solar-icons/react'
import { stageFade, staggerContainer } from '../ui/animations'

const USPS = [
  {
    Icon: VolumeLoud,
    color: '#e91e8c',
    title: 'Sound System JBL Pro Series',
    body: 'Bukan speaker murah yang pecah kalau volume tinggi. Kami pakai JBL PRX series — yang sama dipakai di konser. Suaramu layak didengar dengan benar.',
    img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
  },
  {
    Icon: MusicNote,
    color: '#7c3aed',
    title: '50.000+ Lagu, Update Mingguan',
    body: 'Pop Indonesia, K-Pop, J-Pop, Western, dangdut, koplo, rock, jazz — semua ada. Lagu baru ditambah setiap minggu. Kalau tidak ada, request ke staff kami.',
    img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80',
  },
  {
    Icon: Monitor,
    color: '#e91e8c',
    title: 'Layar 4K Ultra HD',
    body: 'Lirik jelas, video jernih. Tidak ada alasan salah lirik lagi — mau lagu baru atau lagu lama.',
    img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
  },
  {
    Icon: Gamepad,
    color: '#7c3aed',
    title: 'Sistem Karaoke Terbaru',
    body: 'Interface sentuh, pencarian cepat, queue lagu, score system, record video — semua dari tablet yang ada di setiap room.',
    img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
  },
  {
    Icon: CupHot,
    color: '#f59e0b',
    title: 'F&B Order dari Dalam Room',
    body: 'Makan sambil nyanyi? Boleh banget. Order via tablet, diantar ke room tanpa perlu keluar. Tidak ada minimum order.',
    img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
  },
  {
    Icon: Broom,
    color: '#e91e8c',
    title: 'Kebersihan Standar Hotel',
    body: 'Mic di-sanitize dengan UV sterilizer setiap pergantian tamu. Room di-bersihkan dan di-spray disinfektan. Sofa diganti cover-nya tiap hari.',
    img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80',
  },
]

export default function WhySoundBox() {
  return (
    <section className="section-padding bg-surface-3" id="why">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.p variants={stageFade} className="text-xs font-bold text-pink tracking-[0.2em] uppercase mb-3">
            Kenapa Pilih Kami
          </motion.p>
          <motion.h2 variants={stageFade} className="text-4xl md:text-5xl font-extrabold font-display text-white">
            Kenapa SoundBox <span className="gradient-text">Beda?</span>
          </motion.h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {USPS.map((usp, i) => {
            const isEven = i % 2 === 0
            return (
              <motion.div
                key={usp.title}
                variants={stageFade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-0 items-stretch card-dark overflow-hidden`}
              >
                {/* Image */}
                <div className="w-full md:w-2/5 h-52 md:h-64 shrink-0 overflow-hidden">
                  <img src={usp.img} alt={usp.title} className="w-full h-full object-cover" />
                </div>

                {/* Text */}
                <div className="flex-1 p-6 md:py-8 md:px-10 flex flex-col justify-center">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="inline-flex mb-4 w-fit"
                  >
                    <usp.Icon size={40} weight="BoldDuotone" color={usp.color} />
                  </motion.div>
                  <h3 className="text-xl font-bold font-display text-white mb-3">{usp.title}</h3>
                  <p className="text-muted leading-relaxed text-sm">{usp.body}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
