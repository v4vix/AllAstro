import { Hero } from '../components/Hero'
import { StatsStrip } from '../components/StatsStrip'
import { DailyBrief } from '../components/DailyBrief'
import { Products } from '../components/Products'
import { PlatformQuiz } from '../components/PlatformQuiz'
import { FeatureMatrix } from '../components/FeatureMatrix'
import { Testimonials } from '../components/Testimonials'
import { DeploySection } from '../components/DeploySection'
import { Footer } from '../components/Footer'

export function Home() {
  return (
    <main>
      <Hero />
      <StatsStrip />
      <DailyBrief />
      <Products />
      <PlatformQuiz />
      <FeatureMatrix />
      <Testimonials />
      <DeploySection />
      <Footer />
    </main>
  )
}
