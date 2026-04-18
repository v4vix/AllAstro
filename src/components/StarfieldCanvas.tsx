import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  alpha: number
  twinkleSpeed: number
  twinkleOffset: number
  color: string
}

interface ShootingStar {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  length: number
  active: boolean
}

export function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number
    let t = 0
    let lastShoot = 0

    const stars: Star[] = []
    const shooters: ShootingStar[] = [
      { x: 0, y: 0, vx: 0, vy: 0, alpha: 0, length: 0, active: false },
      { x: 0, y: 0, vx: 0, vy: 0, alpha: 0, length: 0, active: false },
    ]

    const STAR_COLORS = ['#ffffff', '#ffffff', '#ffffff', '#ffb347', '#fffde7', '#9b59b6', '#00ffcc']

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
      initStars()
    }

    function initStars() {
      stars.length = 0
      const count = Math.min(280, Math.floor((canvas!.width * canvas!.height) / 6000))
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          radius: Math.random() * 1.4 + 0.2,
          alpha: Math.random() * 0.6 + 0.2,
          twinkleSpeed: Math.random() * 0.025 + 0.008,
          twinkleOffset: Math.random() * Math.PI * 2,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        })
      }
    }

    function spawnShooter(s: ShootingStar) {
      s.x = Math.random() * canvas!.width * 0.75
      s.y = Math.random() * canvas!.height * 0.35
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.6
      const speed = Math.random() * 9 + 7
      s.vx = Math.cos(angle) * speed
      s.vy = Math.sin(angle) * speed
      s.alpha = 1
      s.length = Math.random() * 110 + 70
      s.active = true
    }

    function drawFrame(now: number) {
      ctx!.fillStyle = 'rgba(0, 5, 17, 0.18)'
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height)

      t += 0.016

      // Stars
      for (const star of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * (star.twinkleSpeed / 0.016) + star.twinkleOffset)
        ctx!.beginPath()
        ctx!.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx!.fillStyle = star.color
        ctx!.globalAlpha = star.alpha * (0.4 + 0.6 * twinkle)
        ctx!.fill()
      }
      ctx!.globalAlpha = 1

      // Constellation lines between nearby stars (subtle)
      ctx!.strokeStyle = 'rgba(255,179,71,0.04)'
      ctx!.lineWidth = 0.5
      for (let i = 0; i < Math.min(stars.length, 80); i++) {
        for (let j = i + 1; j < Math.min(stars.length, 80); j++) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            ctx!.globalAlpha = (1 - dist / 110) * 0.12
            ctx!.beginPath()
            ctx!.moveTo(stars[i].x, stars[i].y)
            ctx!.lineTo(stars[j].x, stars[j].y)
            ctx!.stroke()
          }
        }
      }
      ctx!.globalAlpha = 1

      // Shooting stars
      if (now - lastShoot > 3800) {
        for (const s of shooters) {
          if (!s.active) {
            spawnShooter(s)
            lastShoot = now
            break
          }
        }
      }

      for (const s of shooters) {
        if (!s.active) continue
        const tailX = s.x - s.vx * (s.length / Math.hypot(s.vx, s.vy))
        const tailY = s.y - s.vy * (s.length / Math.hypot(s.vx, s.vy))
        const grad = ctx!.createLinearGradient(s.x, s.y, tailX, tailY)
        grad.addColorStop(0, `rgba(255,255,255,${s.alpha})`)
        grad.addColorStop(0.3, `rgba(255,179,71,${s.alpha * 0.6})`)
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx!.beginPath()
        ctx!.moveTo(s.x, s.y)
        ctx!.lineTo(tailX, tailY)
        ctx!.strokeStyle = grad
        ctx!.lineWidth = 1.8
        ctx!.stroke()

        s.x += s.vx
        s.y += s.vy
        s.alpha -= 0.014
        if (s.alpha <= 0 || s.x > canvas!.width + 50 || s.y > canvas!.height + 50) {
          s.active = false
        }
      }

      rafId = requestAnimationFrame(drawFrame)
    }

    // Initial solid fill
    ctx.fillStyle = '#000511'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    resize()
    window.addEventListener('resize', resize)
    rafId = requestAnimationFrame(drawFrame)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
