import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CloseCircle } from '@solar-icons/react'
import { stageFade, staggerContainer } from '../ui/animations'

type Cat = 'all' | 'box' | 'studio' | 'stage' | 'vip' | 'fb' | 'lobby'

interface Img { id: number; src: string; alt: string; cat: Cat }

const IMAGES: Img[] = [
  { id: 1,  src: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80', alt: 'Teman nyanyi karaoke',    cat: 'stage'  },
  { id: 2,  src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80', alt: 'Grup teman karaoke',       cat: 'all'    },
  { id: 3,  src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', alt: 'Box room interior',         cat: 'box'    },
  { id: 4,  src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80', alt: 'Stage room suasana',       cat: 'stage'  },
  { id: 5,  src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80', alt: 'Neon lights karaoke',      cat: 'all'    },
  { id: 6,  src: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80', alt: 'F&B snack platter',        cat: 'fb'     },
  { id: 7,  src: 'https://images.unsplash.com/photo-1559508551-44bff1de756b?auto=format&fit=crop&w=800&q=80', alt: 'VIP Suite lounge',           cat: 'vip'    },
  { id: 8,  src: 'https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?auto=format&fit=crop&w=800&q=80', alt: 'Studio room karaoke',      cat: 'studio' },
  { id: 9,  src: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80', alt: 'Microphone close-up',      cat: 'all'    },
  { id: 10, src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80', alt: 'Birthday party karaoke',   cat: 'stage'  },
  { id: 11, src: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80', alt: 'JBL speaker system',         cat: 'all'    },
  { id: 12, src: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=80', alt: 'LED mood lighting',        cat: 'lobby'  },
]

const FILTERS: { key: Cat; label: string }[] = [
  { key: 'all',    label: 'Semua'      },
  { key: 'box',    label: 'Box Room'   },
  { key: 'studio', label: 'Studio'     },
  { key: 'stage',  label: 'Stage Room' },
  { key: 'vip',    label: 'VIP Suite'  },
  { key: 'fb',     label: 'F&B'        },
  { key: 'lobby',  label: 'Lobby'      },
]

export default function Gallery() {
  const [active, setActive]   = useState<Cat>('all')
  const [lightbox, setLightbox] = useState<Img | null>(null)

  const filtered = active === 'all' ? IMAGES : IMAGES.filter(i => i.cat === active)

  return (
    <section className="section-padding bg-bg" id="gallery">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.p variants={stageFade} className="text-xs font-bold text-pink tracking-[0.2em] uppercase mb-3">Gallery</motion.p>
          <motion.h2 variants={stageFade} className="text-4xl md:text-5xl font-extrabold font-display text-white">
            Peek Inside <span className="gradient-text">SoundBox.</span>
          </motion.h2>
        </motion.div>

        {/* Filter */}
        <motion.div
          variants={stageFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                active === f.key
                  ? 'bg-pink text-white'
                  : 'bg-surface text-muted hover:text-white hover:bg-surface-2 border border-border'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map(img => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35 }}
                className="break-inside-avoid mb-4 relative group cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setLightbox(img)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/50 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-semibold bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    Lihat →
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 hover:opacity-80 transition-opacity"
              >
                <CloseCircle size={40} weight="Bold" color="#e91e8c" />
              </button>
              <p className="text-center text-sm text-muted mt-3">{lightbox.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
