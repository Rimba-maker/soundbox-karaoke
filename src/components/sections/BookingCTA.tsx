import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MusicNote, Microphone2, MusicNotes, Crown,
  CalendarDate, ClockCircle, UsersGroupRounded,
} from '@solar-icons/react'
import { stageFade, staggerContainer } from '../ui/animations'

const WA = '628112233445'

const ROOMS = [
  { value: 'box',    Icon: MusicNote,   iconColor: '#e91e8c', name: 'Box Room',    cap: '2–5 orang',   weekday: 'Rp 60k', weekend: 'Rp 75k',  accent: 'border-pink/50 hover:border-pink' },
  { value: 'studio', Icon: Microphone2, iconColor: '#7c3aed', name: 'Studio Room', cap: '5–10 orang',  weekday: 'Rp 90k', weekend: 'Rp 110k', accent: 'border-purple/50 hover:border-purple' },
  { value: 'stage',  Icon: MusicNotes,  iconColor: '#e91e8c', name: 'Stage Room',  cap: '10–20 orang', weekday: 'Rp 150k', weekend: 'Rp 185k', accent: 'border-pink/50 hover:border-pink' },
  { value: 'vip',    Icon: Crown,       iconColor: '#f59e0b', name: 'VIP Suite',   cap: '20–40 orang', weekday: 'Rp 350k', weekend: 'Rp 420k', accent: 'border-gold/50 hover:border-gold' },
]

const DURATIONS = ['1 jam', '2 jam', '3 jam', '4 jam', '5 jam+']

const SPECIAL = [
  { value: '', label: 'Tidak ada (booking biasa)' },
  { value: 'birthday', label: 'Birthday Package' },
  { value: 'corporate', label: 'Corporate / Team Building' },
  { value: 'group', label: 'Group 10+ orang' },
  { value: 'other', label: 'Lainnya' },
]

interface Form {
  room: string; date: string; time: string; duration: string
  people: string; name: string; wa: string; special: string; notes: string
}

const empty: Form = { room: '', date: '', time: '', duration: '', people: '', name: '', wa: '', special: '', notes: '' }

export default function BookingCTA() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<Form>(empty)

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  const today = new Date().toISOString().split('T')[0]
  const room = ROOMS.find(r => r.value === form.room)

  const submit = () => {
    const msg = encodeURIComponent(
      `Halo SoundBox! Saya mau booking:\n\n` +
      `Nama: ${form.name}\n` +
      `WA: ${form.wa}\n` +
      `Room: ${room?.name} (${room?.cap})\n` +
      `Tanggal: ${form.date}\n` +
      `Jam mulai: ${form.time}\n` +
      `Durasi: ${form.duration}\n` +
      `Jumlah orang: ${form.people} orang\n` +
      (form.special ? `Keperluan khusus: ${form.special}\n` : '') +
      (form.notes ? `Catatan: ${form.notes}\n` : '') +
      `\nTolong konfirmasi ketersediaannya ya, makasih!`
    )
    window.open(`https://wa.me/${WA}?text=${msg}`, '_blank')
  }

  const inputCls = 'w-full bg-surface border border-border rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-pink transition-colors placeholder:text-subtle'
  const labelCls = 'flex items-center gap-1.5 text-xs font-semibold text-muted uppercase tracking-wider'

  return (
    <section className="section-padding bg-surface-3" id="booking">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.p variants={stageFade} className="text-xs font-bold text-pink tracking-[0.2em] uppercase mb-3">Booking</motion.p>
          <motion.h2 variants={stageFade} className="text-4xl md:text-5xl font-extrabold font-display text-white mb-3">
            Siap Nyanyi? <span className="gradient-text">Book Dulu.</span>
          </motion.h2>
          <motion.p variants={stageFade} className="text-muted">
            Pilih room, tanggal, dan jam. Kami konfirmasi dalam 15 menit.
          </motion.p>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          {[1,2,3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                step >= s ? 'bg-pink text-white' : 'bg-surface text-muted border border-border'
              }`}>{s}</div>
              {s < 3 && <div className={`w-16 h-0.5 transition-all duration-300 ${step > s ? 'bg-pink' : 'bg-border'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-12 mb-10 text-xs text-muted">
          {['Pilih Room', 'Jadwal', 'Kontak'].map((l, i) => (
            <span key={l} className={step === i + 1 ? 'text-white font-semibold' : ''}>{l}</span>
          ))}
        </div>

        <div className="card-dark p-6 md:p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Room picker */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <p className="text-sm font-semibold text-muted mb-5">Pilih tipe room yang kamu mau:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {ROOMS.map(r => (
                    <button
                      key={r.value}
                      onClick={() => setForm(p => ({ ...p, room: r.value }))}
                      className={`text-left p-4 rounded-xl border-2 transition-all ${
                        form.room === r.value
                          ? 'border-pink bg-pink/10 text-white'
                          : `bg-surface-2 border-border text-muted ${r.accent} hover:text-white`
                      }`}
                    >
                      <span className="block mb-2">
                        <r.Icon size={28} weight="BoldDuotone" color={r.iconColor} />
                      </span>
                      <p className="font-bold text-sm">{r.name}</p>
                      <p className="text-xs opacity-70">{r.cap}</p>
                      <p className="text-xs mt-1 font-semibold">{r.weekday}/jam (weekday)</p>
                    </button>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={!form.room}
                  onClick={() => setStep(2)}
                  className="w-full bg-pink text-white rounded-full py-4 font-bold text-sm hover:bg-pink-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Lanjut
                </motion.button>
              </motion.div>
            )}

            {/* Step 2: Date/time */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <p className="text-sm font-semibold text-muted mb-5 flex items-center gap-2">
                  Room:{' '}
                  {room && <room.Icon size={14} weight="BoldDuotone" color={room.iconColor} />}
                  <span className="text-white">{room?.name}</span>
                  {' '}— pilih jadwal:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
                      <ClockCircle size={13} weight="Bold" color="#9ca3af" />
                      Durasi
                    </label>
                    <select required value={form.duration} onChange={set('duration')} className={inputCls}>
                      <option value="" disabled>Pilih durasi</option>
                      {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>
                      <UsersGroupRounded size={13} weight="Bold" color="#9ca3af" />
                      Jumlah Orang
                    </label>
                    <input type="number" min="1" max="40" placeholder="Berapa orang?" required value={form.people} onChange={set('people')} className={inputCls} />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="px-6 py-4 rounded-full border border-border text-muted hover:text-white hover:border-white/30 transition-colors text-sm font-semibold">
                    Kembali
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={!form.date || !form.time || !form.duration || !form.people}
                    onClick={() => setStep(3)}
                    className="flex-1 bg-pink text-white rounded-full py-4 font-bold text-sm hover:bg-pink-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Lanjut
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <p className="text-sm font-semibold text-muted mb-5">Hampir selesai! Data kontak kamu:</p>
                <div className="flex flex-col gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Nama</label>
                    <input type="text" placeholder="Nama kamu" required value={form.name} onChange={set('name')} className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Nomor WhatsApp</label>
                    <input type="tel" placeholder="08xx xxxx xxxx" required value={form.wa} onChange={set('wa')} className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Keperluan Khusus</label>
                    <select value={form.special} onChange={set('special')} className={inputCls}>
                      {SPECIAL.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Catatan Tambahan (opsional)</label>
                    <textarea
                      rows={2}
                      placeholder="Misal: minta dekorasi, perlu tempat duduk ekstra, dll"
                      value={form.notes}
                      onChange={set('notes')}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="px-6 py-4 rounded-full border border-border text-muted hover:text-white hover:border-white/30 transition-colors text-sm font-semibold">
                    Kembali
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={!form.name || !form.wa}
                    onClick={submit}
                    className="flex-1 bg-pink text-white rounded-full py-4 font-bold text-sm hover:bg-pink-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Microphone2 size={16} weight="Bold" color="#ffffff" />
                    Book Sekarang via WhatsApp
                  </motion.button>
                </div>
                <p className="text-xs text-muted text-center mt-4">
                  Kamu akan diarahkan ke WhatsApp. Kami konfirmasi dalam 15 menit.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
