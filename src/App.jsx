import { useMemo } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { Shield, ArrowLeftRight, Landmark, GraduationCap } from 'lucide-react'

const gold = '#E4A951'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: 'easeOut' }
  })
}

function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 6 + 2,
      delay: Math.random() * 6,
      duration: Math.random() * 8 + 8,
      y: Math.random() * 40 + 20,
      hue: Math.random() > 0.5 ? 226 : 48 // indigo/gold hues
    })), []
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.span
          key={p.id}
          className="absolute rounded-full blur-[1.2px]"
          style={{ left: p.left, width: p.size, height: p.size, background: `hsla(${p.hue}, 72%, 62%, 0.7)` }}
          initial={{ y: p.y + 40, opacity: 0 }}
          animate={{ y: p.y - 40, opacity: [0, 0.6, 0], filter: ['blur(1.2px)', 'blur(2px)', 'blur(1.2px)'] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function IconWrap({ children, pulse = true }) {
  return (
    <motion.div
      className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600/20 to-black border border-indigo-500/30 flex items-center justify-center shadow-[0_0_0_0_rgba(0,0,0,0)]"
      animate={pulse ? {
        scale: [1, 1.04, 1],
        boxShadow: [
          '0 0 0 0 rgba(0,0,0,0)',
          `0 0 24px 0 ${gold}33`,
          '0 0 0 0 rgba(0,0,0,0)'
        ],
        filter: ['saturate(1)', 'saturate(1.25)', 'saturate(1)']
      } : undefined}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 rounded-xl bg-[radial-gradient(closest-side,rgba(228,169,81,0.18),transparent)]" />
      <motion.div
        whileHover={{ rotate: 5 }}
        className="relative text-[${gold}]"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

function FeatureCard({ index, icon, title, bullets, hoverEffect = 'rotate' }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="group relative rounded-2xl p-6 bg-gradient-to-b from-slate-900/70 to-black/70 border border-slate-700/40 hover:border-indigo-400/60 transition-all duration-300 backdrop-blur-xl"
      style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 10px 25px rgba(0,0,0,0.35)' }}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-[rgba(228,169,81,0.45)] group-hover:ring-offset-2 group-hover:ring-offset-black" />
      <div className="absolute -inset-px rounded-2xl bg-[conic-gradient(from_0deg,rgba(228,169,81,0.18),rgba(99,102,241,0.18),rgba(228,169,81,0.18))] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

      <div className="relative flex items-start gap-4">
        <motion.div
          whileHover={hoverEffect === 'rotate' ? { rotate: 5 } : hoverEffect === 'float' ? { y: -4 } : hoverEffect === 'bounce' ? { y: [0, -2, 0] } : undefined}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        >
          <IconWrap>{icon}</IconWrap>
        </motion.div>
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-white mb-2">{title}</h3>
          <ul className="space-y-1.5 text-sm text-slate-300">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: gold }} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

function App() {
  const features = [
    {
      title: 'Անվտանգություն՝ առաջին հերթին',
      icon: <Shield size={22} color={gold} className="drop-shadow-[0_0_12px_rgba(228,169,81,0.5)]" />,
      bullets: ['Cold wallets, 2FA', 'Anti-phishing, whitelists', 'Ինչ scam-երից խուսափել'],
      hover: 'rotate'
    },
    {
      title: 'Կանխիկացում Հայաստանում',
      icon: <ArrowLeftRight size={22} color={gold} className="drop-shadow-[0_0_12px_rgba(228,169,81,0.5)]" />,
      bullets: ['P2P, բանկային փոխանցումներ', 'Ի՞նչ է օրինական, ինչն է վտանգավոր', 'Արագ և ապահով դուրսբերում'],
      hover: 'float'
    },
    {
      title: 'Օրինականություն և KYC',
      icon: <Landmark size={22} color={gold} className="drop-shadow-[0_0_12px_rgba(228,169,81,0.5)]" />,
      bullets: ['AML/KYC', 'Հաշվետվություն, exchange limits', 'Անհրաժեշտ փաստաթղթեր'],
      hover: 'bounce'
    },
    {
      title: 'Գործնական թրեյնինգային դասեր',
      icon: <GraduationCap size={22} color={gold} className="drop-shadow-[0_0_12px_rgba(228,169,81,0.5)]" />,
      bullets: ['Իրական թեստային ֆոնդերով պրակտիկա', 'Պարզ և կիրառելի checklists', 'Հստակ քայլեր յուրաքանչյուր թեմայի համար'],
      hover: 'float'
    }
  ]

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0a0f1b] to-black text-slate-100">
      {/* HERO with Spline cover */}
      <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
        <Spline scene="https://prod.spline.design/44zrIZf-iQZhbQNQ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        {/* Soft vignette and gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0a0f1b]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.25),transparent_55%)]" />
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="max-w-5xl w-full text-center">
            <motion.h1
              className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[${gold}] via-indigo-300 to-white"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              Crypto Education, Crafted for Armenia
            </motion.h1>
            <motion.p
              className="mt-4 text-sm md:text-base text-slate-300"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.12 }}
            >
              Սիմուլյացիաներ, անվտանգության լավագույն փորձեր և քայլ առ քայլ ուղեցույցներ՝ վստահ սկսելու համար։
            </motion.p>
          </div>
        </div>
      </section>

      {/* PREMIUM TRUST SECTION (replaces the original) */}
      <section className="relative py-16 md:py-24">
        <FloatingParticles />

        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-10 md:mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-slate-700/50">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: gold }} />
              <span className="text-xs tracking-wider text-slate-300">Premium</span>
            </div>
            <h2 className="mt-5 text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Ինչու ուսանողները վստահում են մեզ
            </h2>
            <p className="mt-3 md:mt-4 text-sm md:text-base text-slate-300/90 max-w-3xl mx-auto">
              Հարմարեցված է Հայաստանի իրականություններին․ շեշտը՝ անվտանգություն, օրինականություն և հստակ քայլեր։
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {features.map((f, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03 }} transition={{ duration: 0.25 }}>
                <FeatureCard
                  index={i}
                  icon={f.icon}
                  title={f.title}
                  bullets={f.bullets}
                  hoverEffect={f.hover}
                />
              </motion.div>
            ))}
          </div>

          {/* Crypto themed subtle motion accents */}
          <div className="relative mt-14">
            <div className="absolute inset-0 -z-[0] pointer-events-none">
              <div className="mx-auto max-w-5xl">
                <motion.div
                  className="h-24 md:h-28 w-full rounded-full opacity-60 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_60%)]"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal footer note */}
      <footer className="py-8 border-t border-slate-800/60 bg-black/30">
        <div className="max-w-6xl mx-auto px-6 text-center text-xs text-slate-400">
          Built with a security-first mindset • Indigo & Gold theme
        </div>
      </footer>
    </div>
  )
}

export default App
