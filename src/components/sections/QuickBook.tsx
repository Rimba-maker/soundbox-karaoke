import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDate, ClockCircle, UsersGroupRounded, Home2 } from '@solar-icons/react'
import { stageFade, staggerContainer } from '../ui/animations'

const WA = '628112233445'

const ROOMS = [
  { value: 'box',    label: 'Box Room',    cap: '2–5 org',   price: 'Rp 60k–85k/jam' },
  { value: 'studio', label: 'Studio Room', cap: '5–10 org',  price: 'Rp 90k–130k/jam' },
  { value: 'stage',  label: 'Stage Room',  cap: '10–20 org', price: 'Rp 150k–220k/jam' },
  { value: 'vip',    label: 'VIP Suite',   cap: '20–40 org', price: 'Rp 350k–500k/jam' },
]

export default function QuickBook() {
  const today = new Date().toISOString().split('T')[0]
  const [form, setForm] = useState({ date: '', time: '', people: '', room: '' })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const room = ROOMS.find(r => r.value === form.room)
    const msg = encodeURIComponent(
      `Halo SoundBox!\nSaya mau cek ketersediaan:\n\nTanggal: ${form.date}\nJam mulai: ${form.time}\nJumlah orang: ${form.people} orang\nTipe room: ${room?.label ?? form.room} (${room?.cap})\n\nTolong konfirmasi ya, makasih!`
    )
    window.open(`https://wa.me/${WA}?text=${msg}`, '_blank')
  }

  const inputCls = 'w-full bg-surface-2 border border-border rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-pink transition-colors placeholder:text-subtle'
  const labelCls = 'flex items-center gap-1.5 text-xs font-semibold text-muted uppercase tracking-wider'

  return (
    <section className="bg-surface-3 section-padding" id="quick-book">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <motion.h2 variants={stageFade} className="text-4xl md:text-5xl font-extrabold font-display text-white mb-3">
            Langsung Book, <span className="gradient-text">Langsung Nyanyi.</span>
          </motion.h2>
          <motion.p variants={stageFade} className="text-muted">
            Isi form ini, kami konfirmasi dalam 15 menit via WhatsApp.
          </motion.p>
        </motion.div>

        <motion.form
          variants={stageFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onSubmit={submit}
          className="card-dark p-6 md:p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>
                <CalendarDate size={13} weight="Bold" color="#9ca3af" />
                Tanggal
              </label>
              <input type="date" min={today} required value={form.date} onChange={set('date')} className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>
                <ClockCircle size={13} weight="Bold" color="#9ca3af" />
                Jam Mulai
              </label>
              <input type="time" required value={form.time} onChange={set('time')} className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>
                <UsersGroupRounded size={13} weight="Bold" color="#9ca3af" />
                Jumlah Orang
              </label>
              <input type="number" min="1" max="40" placeholder="Misal: 8" required value={form.people} onChange={set('people')} className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>
                <Home2 size={13} weight="Bold" color="#9ca3af" />
                Tipe Room
              </label>
              <select required value={form.room} onChange={set('room')} className={inputCls}>
                <option value="" disabled>Pilih room</option>
                {ROOMS.map(r => (
                  <option key={r.value} value={r.value}>{r.label} — {r.cap}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto bg-pink text-white rounded-full px-10 py-4 font-bold text-sm hover:bg-pink-dark transition-colors glow-pink"
            >
              Cek Ketersediaan
            </motion.button>
            <p className="text-sm text-muted text-center sm:text-left">
              Atau{' '}
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className="text-pink hover:underline font-semibold">
                chat WA langsung
              </a>
              {' '}— lebih cepat!
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
