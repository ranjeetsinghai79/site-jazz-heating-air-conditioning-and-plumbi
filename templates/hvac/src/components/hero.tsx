"use client"

import { useEffect, useRef, useState } from "react"
import { Phone, ArrowRight, ShieldCheck, Star, Clock } from "lucide-react"
import { BUSINESS, TRUST_BADGES } from "@/lib/config"
import { gsap, ScrollTrigger } from "@/lib/gsap-init"

const EASE = "power3.out"

// Photo grid — 4 AI images, shown right-side in hero
const HERO_IMAGES = ["/hero-1.jpg", "/hero-2.jpg", "/hero-3.jpg", "/hero-4.jpg"]

function useParticles(ref: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    const particleColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--brand-particle").trim() || "rgba(96,165,250,0.40)"
    let w = (canvas.width = canvas.offsetWidth)
    let h = (canvas.height = canvas.offsetHeight)
    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.3, o: Math.random() * 0.4 + 0.1,
    }))
    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        p.x = (p.x + p.vx + w) % w; p.y = (p.y + p.vy + h) % h
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = particleColor; ctx.globalAlpha = p.o; ctx.fill(); ctx.globalAlpha = 1
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight }
    window.addEventListener("resize", resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize) }
  }, [ref])
}

// Photo card — shimmer while loading, fade in on load, subtle scale on hover
function PhotoCard({ src, delay, tall }: { src: string; delay: number; tall?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef  = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    gsap.from(card, { opacity: 0, y: 30, duration: 0.65, ease: EASE, delay })
  }, [delay])

  // Images cached before React hydrates never fire onLoad — check complete on mount
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden group cursor-default"
      style={{
        height: tall ? "220px" : "160px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 32px -8px rgba(0,0,0,0.5)",
      }}
    >
      {/* Shimmer skeleton while loading */}
      {!loaded && (
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.04) 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.6s ease-in-out infinite",
          }}
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
        onError={e => { (e.currentTarget.parentElement as HTMLElement).style.display = "none" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}
      />
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const badgeRef   = useRef<HTMLDivElement>(null)
  const labelRef   = useRef<HTMLDivElement>(null)
  const h1Ref      = useRef<HTMLHeadingElement>(null)
  const paraRef    = useRef<HTMLParagraphElement>(null)
  const ctaRef     = useRef<HTMLDivElement>(null)
  const trustRef   = useRef<HTMLDivElement>(null)
  const badgesRef  = useRef<HTMLDivElement>(null)

  useParticles(canvasRef)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: EASE } })
    tl
      .from(labelRef.current,  { opacity: 0, y: -16, duration: 0.45 })
      .from(badgeRef.current,  { opacity: 0, y: -12, duration: 0.45 }, "-=0.2")
      .from(h1Ref.current,     { opacity: 0, y: 48, duration: 0.8, filter: "blur(6px)" }, "-=0.3")
      .from(paraRef.current,   { opacity: 0, y: 24, duration: 0.6 }, "-=0.5")
      .from(ctaRef.current,    { opacity: 0, y: 20, duration: 0.5 }, "-=0.4")
      .from(trustRef.current,  { opacity: 0, duration: 0.4 }, "-=0.3")
      .from(badgesRef.current, { opacity: 0, y: 12, duration: 0.4 }, "-=0.25")
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="grain relative min-h-screen flex items-center overflow-hidden"
      style={{ background: `linear-gradient(160deg, var(--brand-bg) 0%, var(--brand-bg-mid) 60%, var(--brand-bg) 100%)` }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />
      <div className="aurora-blob-1 absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none" aria-hidden />
      <div className="aurora-blob-2 absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full pointer-events-none" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `linear-gradient(var(--brand-grid) 1px,transparent 1px),linear-gradient(90deg,var(--brand-grid) 1px,transparent 1px)`, backgroundSize: "56px 56px" }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)" }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 pt-24 pb-14 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — copy (tighter, crisper) */}
          <div>
            <div ref={labelRef} className="mb-3">
              <span
                className="text-[0.6rem] font-body font-700 tracking-[0.35em] uppercase"
                style={{ color: "var(--brand-accent-light)" }}
              >
                {BUSINESS.serviceAreas[0]} · Licensed & Insured
              </span>
            </div>

            <div ref={badgeRef} className="accent-badge mb-5 w-fit">
              <span className="accent-dot" />
              24/7 Emergency Service
            </div>

            <h1
              ref={h1Ref}
              className="font-display font-900 text-white mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
              }}
            >
              {BUSINESS.name}<br />
              <span className="text-gradient-animate" style={{ fontSize: "0.85em" }}>
                {BUSINESS.tagline}
              </span>
            </h1>

            <p
              ref={paraRef}
              className="font-body text-white/55 leading-relaxed mb-7"
              style={{ fontSize: "1rem", maxWidth: "30rem" }}
            >
              Same-day service, 24/7. Trusted by{" "}
              <span className="text-white font-700">{BUSINESS.review_count}+</span> homeowners in {BUSINESS.serviceAreas[0]}.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href={BUSINESS.phoneHref} className="btn-primary">
                <Phone className="w-4 h-4 shrink-0" />
                {BUSINESS.phone}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-body font-600 px-6 py-3.5 rounded-full text-sm transition-all duration-200 hover:bg-white/5 cursor-pointer group"
              >
                Free Estimate
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>

            <div ref={trustRef} className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-1.5 text-white/50 text-xs font-body">
                <Star className="w-3.5 h-3.5 fill-current" style={{ color: "var(--brand-accent)" }} />
                <span className="text-white font-700">{BUSINESS.google_rating}</span> rated
                <span className="text-white/30 ml-1">({BUSINESS.review_count} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/50 text-xs font-body">
                <ShieldCheck className="w-3.5 h-3.5" style={{ color: "var(--brand-accent-light)" }} />
                Licensed & Insured
              </div>
              <div className="flex items-center gap-1.5 text-white/50 text-xs font-body">
                <Clock className="w-3.5 h-3.5" style={{ color: "var(--brand-accent-light)" }} />
                Since {BUSINESS.since}
              </div>
            </div>

            {/* Trust badges */}
            <div ref={badgesRef} className="flex flex-wrap gap-2">
              {TRUST_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="text-white/40 text-[0.65rem] font-body font-600 border border-white/10 px-3 py-1.5 rounded-full hover:border-white/25 hover:text-white/60 transition-all duration-200 cursor-default"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — 4-photo grid */}
          <div className="hidden md:grid grid-cols-2 gap-3">
            <PhotoCard src={HERO_IMAGES[0]} delay={0.4} tall />
            <PhotoCard src={HERO_IMAGES[1]} delay={0.5} />
            <PhotoCard src={HERO_IMAGES[2]} delay={0.55} />
            <PhotoCard src={HERO_IMAGES[3]} delay={0.6} tall />
          </div>
        </div>
      </div>
    </section>
  )
}
