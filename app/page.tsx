import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { IntegrationsMarquee } from "@/components/integrations-marquee"
import { DraftResponseSection } from "@/components/draft-response-section"
import { UniversalSearchSection } from "@/components/universal-search-section"
import { ContextualAssistantSection } from "@/components/contextual-assistant-section"
import { AboutSection } from "@/components/about-section"
import { MorningBriefingSection } from "@/components/morning-briefing-section"
import { OneInboxSection } from "@/components/one-inbox-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

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
