import { motion } from 'framer-motion'
import { CheckCircle, MusicNote, Microphone2, MusicNotes, Crown, Star, UsersGroupRounded } from '@solar-icons/react'
import { stageFade, staggerContainer } from '../ui/animations'

const WA = '628112233445'

const ROOMS = [
  {
    Icon: MusicNote,
    iconColor: '#e91e8c',
    name: 'Box Room',
    cap: '2–5 orang',
    size: '12 m²',
    weekday: 'Rp 60k',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    desc: 'Cocok untuk kencan, teman dekat, atau berdua. Intimate dan cozy.',
    features: ['TV 50" 4K', 'JBL Sound System', 'Mic Wireless 2 pcs', 'Sofa 5 Seater'],
    badge: null,
    BadgeIcon: null,
    accent: 'text-pink',
    borderHover: 'hover:border-pink/50',
    checkColor: '#e91e8c',
  },
  {
    Icon: Microphone2,
    iconColor: '#7c3aed',
    name: 'Studio Room',
    cap: '5–10 orang',
    size: '20 m²',
    weekday: 'Rp 90k',
    img: 'https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?auto=format&fit=crop&w=800&q=80',
    desc: 'Pas untuk arisan kecil, birthday, atau after-work bareng tim.',
    features: ['TV 65" 4K', 'JBL 2.1 Surround', 'Mic Wireless 4 pcs', 'Mini Bar'],
    badge: null,
    BadgeIcon: null,
    accent: 'text-purple',
    borderHover: 'hover:border-purple/50',
    checkColor: '#7c3aed',
  },
  {
    Icon: MusicNotes,
    iconColor: '#e91e8c',
    name: 'Stage Room',
    cap: '10–20 orang',
    size: '35 m²',
    weekday: 'Rp 150k',
    img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
    desc: 'Birthday besar, reuni, team kantor. Ada panggung mini + dance floor!',
    features: ['TV 75" + LED Wall', 'JBL PRX Surround', 'Mic 6 pcs', 'Mini Stage & Disco Light'],
    badge: 'Paling Seru',
    BadgeIcon: Star,
    accent: 'text-pink',
    borderHover: 'hover:border-pink/50',
    checkColor: '#e91e8c',
  },
  {
    Icon: Crown,
    iconColor: '#f59e0b',
    name: 'VIP Suite',
    cap: '20–40 orang',
    size: '60 m²',
    weekday: 'Rp 350k',
    img: 'https://images.unsplash.com/photo-1559508551-44bff1de756b?auto=format&fit=crop&w=800&q=80',
    desc: 'Pesta besar, company event, atau momen spesial yang tidak terlupakan.',
    features: ['Dual Screen 85"', 'JBL PRX + Subwoofer', 'Mic 8 pcs', 'Full Stage + Private Bar'],
    badge: 'Premium',
    BadgeIcon: Crown,
    accent: 'text-gold',
    borderHover: 'hover:border-gold/50',
    checkColor: '#f59e0b',
  },
]

export default function RoomTypes() {
  return (
    <section className="section-padding bg-bg" id="rooms">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.h2 variants={stageFade} className="text-4xl md:text-5xl font-extrabold font-display text-white mb-3">
            Pilih <span className="gradient-text">Roommu.</span>
          </motion.h2>
          <motion.p variants={stageFade} className="text-muted text-lg">
            Dari berdua sampai rombongan besar — ada room yang pas.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {ROOMS.map((room) => (
            <motion.div
              key={room.name}
              variants={stageFade}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`card-dark overflow-hidden flex flex-col border border-border ${room.borderHover} transition-all duration-300 group`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={room.img}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent" />
                {room.badge && room.BadgeIcon && (
                  <span className={`absolute top-3 right-3 inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-bg/80 backdrop-blur-sm ${room.accent}`}>
                    <room.BadgeIcon size={11} weight="Bold" color={room.checkColor} />
                    {room.badge}
                  </span>
                )}
                <div className="absolute bottom-3 left-3">
                  <room.Icon size={26} weight="BoldDuotone" color={room.iconColor} />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-start justify-between mb-1">
                  <h3 className={`text-lg font-bold font-display ${room.accent}`}>{room.name}</h3>
                  <span className="text-xs text-muted bg-surface-2 rounded-full px-2.5 py-1">{room.size}</span>
                </div>
                <p className="flex items-center gap-1.5 text-xs text-muted mb-1">
                  <UsersGroupRounded size={12} weight="Bold" color="#9ca3af" />
                  {room.cap}
                </p>
                <p className="text-sm text-muted/80 mb-4 leading-relaxed">{room.desc}</p>

                <ul className="flex flex-col gap-1.5 mb-5 flex-1">
                  {room.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted">
                      <CheckCircle size={13} weight="Bold" color={room.checkColor} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted mb-0.5">mulai dari</p>
                  <p className={`text-xl font-extrabold font-display ${room.accent}`}>
                    {room.weekday}<span className="text-sm font-medium text-muted">/jam</span>
                  </p>
                  <motion.a
                    href={`https://wa.me/${WA}?text=${encodeURIComponent(`Halo SoundBox! Saya tertarik book ${room.name} (${room.cap}). Bisa info ketersediaannya?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-3 w-full inline-flex justify-center items-center gap-1.5 bg-surface-2 hover:bg-surface-3 text-white rounded-full py-2.5 text-sm font-semibold transition-colors border border-border hover:border-white/20"
                  >
                    Book Room Ini
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={stageFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-xs text-muted mt-8"
        >
          Semua room: AC individual • LED mood lighting 18 warna • Bluetooth/HDMI • Loker barang
        </motion.p>
      </div>
    </section>
  )
}
