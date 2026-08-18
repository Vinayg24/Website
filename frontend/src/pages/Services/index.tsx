import { PageWrapper } from '../../components/Layout/PageWrapper'
import { PageHero } from '../../components/Layout/PageHero'
import { ServicesSection } from '../../components/Services/ServicesSection'
import { ProcessSection } from '../../components/Process/ProcessSection'
import { PageCTA } from '../../components/Common/PageCTA'
import { Footer } from '../../components/Footer/Footer'

export const ServicesPage = () => {
  return (
    <PageWrapper
      title="Services & Pricing — Shree Radha Krishna Studio"
      description="Discover our full suite of photography & cinematography services — Royal Weddings, Pre Wedding Shoots, Fashion Lookbooks & 4K Drone Coverage."
    >
      <main style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
        <PageHero
          badge="Bespoke Offerings"
          title="Luxury Photography & Cinematography Services"
          subtitle="From grand palace weddings to high-fashion campaigns and 8K aerial drone cinema, we tailor every shoot to your exact aesthetic."
          pageName="Services"
        />
        <ServicesSection />
        <ProcessSection />
        <PageCTA
          heading="Need a Custom Bespoke Package?"
          subheading="Have specific multi-day dates, international destinations, or custom crew requirements? Let's discuss."
          buttonText="Discuss Custom Package"
          buttonLink="/contact"
        />
        <Footer />
      </main>
    </PageWrapper>
  )
}

export default ServicesPage
