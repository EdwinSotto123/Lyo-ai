import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { IntegrationsMarquee } from "@/components/landing/integrations-marquee"
import { DraftResponseSection } from "@/components/landing/draft-response-section"
import { UniversalSearchSection } from "@/components/landing/universal-search-section"
import { ContextualAssistantSection } from "@/components/landing/contextual-assistant-section"
import { AboutSection } from "@/components/landing/about-section"
import { MorningBriefingSection } from "@/components/landing/morning-briefing-section"
import { OneInboxSection } from "@/components/one-inbox-section"
import { FaqSection } from "@/components/landing/faq-section"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <IntegrationsMarquee />
      <DraftResponseSection />
      <UniversalSearchSection />
      <ContextualAssistantSection />
      <AboutSection />
      <MorningBriefingSection />
      <OneInboxSection />
      <FaqSection />
      <Footer />
    </main>
  )
}
