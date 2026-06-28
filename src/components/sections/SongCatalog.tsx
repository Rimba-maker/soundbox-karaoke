import { motion } from 'framer-motion'
import { stageFade, staggerContainer } from '../ui/animations'

const WA = '628112233445'

const GENRES = [
  '🎵 Pop Indonesia', '🎶 K-Pop', '🎸 Rock', '🎺 Jazz', '🎻 Klasik',
  '💃 Dangdut', '🔥 Koplo', '🌊 J-Pop', '🎤 R&B', '🎧 EDM',
  '🤠 Country', '🙏 Rohani', '🇬🇧 Western Pop', '🎬 OST Film',
  '💕 Lagu Galau', '🎊 Lagu Pesta',
]

const TOP10 = [
  { rank: 1,  title: 'Ojo Dibandingke',       artist: 'Abah Lala' },
  { rank: 2,  title: 'To The Bone',            artist: 'Pamungkas' },
  { rank: 3,  title: 'Hati-Hati di Jalan',     artist: 'Tulus' },
  { rank: 4,  title: 'APT.',                   artist: 'Rosé ft. Bruno Mars' },
  { rank: 5,  title: 'Pamer Bojo',             artist: 'Didi Kempot' },
  { rank: 6,  title: 'Yellow',                 artist: 'Coldplay' },
  { rank: 7,  title: 'Dynamite',               artist: 'BTS' },
  { rank: 8,  title: 'Shallow',                artist: 'Lady Gaga & Bradley Cooper' },
  { rank: 9,  title: 'Rasa Yang Tertinggal',   artist: 'Raisa' },
  { rank: 10, title: 'Perfect',                artist: 'Ed Sheeran' },
]

const rankColor = (r: number) =>
  r === 1 ? 'text-gold font-extrabold' :
  r === 2 ? 'text-muted font-bold' :
  r === 3 ? 'text-amber-700 font-bold' :
  'text-subtle font-semibold'

export default function SongCatalog() {
  return (
    <section className="section-padding bg-surface-3" id="katalog">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.p variants={stageFade} className="text-xs font-bold text-pink tracking-[0.2em] uppercase mb-3">Katalog Lagu</motion.p>
          <motion.h2 variants={stageFade} className="text-4xl md:text-5xl font-extrabold font-display text-white mb-3">
            50.000+ Lagu. <span className="gradient-text">Dari Legend Sampai Viral Kemarin.</span>
          </motion.h2>
          <motion.p variants={stageFade} className="text-muted text-lg">
            Semua genre, semua era, semua mood.
          </motion.p>
        </motion.div>

        {/* Genre pills */}
        <motion.div
          variants={staggerContainer(0.04)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-2.5 justify-center mb-16"
        >
          {GENRES.map((g) => (
            <motion.span
              key={g}
              variants={stageFade}
              whileHover={{ scale: 1.08, y: -2 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="bg-surface border border-border text-sm font-medium text-muted hover:text-white hover:border-pink/40 hover:bg-surface-2 rounded-full px-4 py-2 cursor-default transition-colors"
            >
              {g}
            </motion.span>
          ))}
        </motion.div>

        {/* Top 10 */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 variants={stageFade} className="text-xl font-bold font-display text-white text-center mb-6">
              🔥 Top Request Minggu Ini
            </motion.h3>

            <div className="card-dark overflow-hidden divide-y divide-border">
              {TOP10.map((song, i) => (
                <motion.div
                  key={song.rank}
                  variants={stageFade}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-surface-2 transition-colors group"
                >
                  <span className={`w-7 text-center text-base ${rankColor(song.rank)}`}>
                    {song.rank <= 3 ? ['🥇','🥈','🥉'][song.rank - 1] : song.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate group-hover:text-pink transition-colors">{song.title}</p>
                    <p className="text-xs text-muted">{song.artist}</p>
                  </div>
                  <span className="text-xs text-muted/50">♪</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.p
            variants={stageFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center text-sm text-muted mt-6"
          >
            Lagu favorit tidak ada?{' '}
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent('Halo SoundBox! Saya mau request lagu: ')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink hover:underline font-semibold"
            >
              Request ke staff kami
            </a>
            {' '}— ditambah dalam 3 hari kerja.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
