import { Hero } from '../components/Hero'
import { StatsStrip } from '../components/StatsStrip'
import { DailyBrief } from '../components/DailyBrief'
import { FreeTools } from '../components/FreeTools'
import { Products } from '../components/Products'
import { PlatformQuiz } from '../components/PlatformQuiz'
import { Testimonials } from '../components/Testimonials'
import { DeploySection } from '../components/DeploySection'
import { Footer } from '../components/Footer'
import { useAdminContext } from '../lib/AdminContext'

export function Home() {
  const { isAdmin } = useAdminContext()

  return (
    <main>
      <Hero />
      <StatsStrip />
      <DailyBrief />
      <FreeTools />
      <Products />
      <PlatformQuiz />
      <Testimonials />
      {isAdmin && <DeploySection />}
      <Footer />
    </main>
  )
}
