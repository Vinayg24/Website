import { PageWrapper } from '../../components/Layout/PageWrapper'
import { PageHero } from '../../components/Layout/PageHero'
import { AboutSection } from '../../components/About/AboutSection'
import { WhyChooseUs } from '../../components/WhyChooseUs/WhyChooseUs'
import { TestimonialsSection } from '../../components/Testimonials/TestimonialsSection'
import { PageCTA } from '../../components/Common/PageCTA'
import { Footer } from '../../components/Footer/Footer'

export const AboutPage = () => {
  return (
    <PageWrapper
      title="About Us — Shree Radha Krishna Studio"
      description="Learn about Shree Radha Krishna Studio — 15+ years of craft, luxury cinema equipment, awards, and wedding photography excellence in Jaipur."
    >
      <main style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
        <PageHero
          badge="15+ Years of Legacy"
          title="15+ Years of Creating Timeless Memories"
          subtitle="Shree Radha Krishna Studio is Jaipur's premier photography house, blending royal heritage aesthetics with modern 8K cinema optics."
          pageName="About"
        />
        <AboutSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <PageCTA
          heading="Let's Capture Your Story"
          subheading="Partner with our master team of cinematographers and lighting directors for an unforgettable visual legacy."
          buttonText="Get in Touch"
          buttonLink="/contact"
        />
        <Footer />
      </main>
    </PageWrapper>
  )
}

export default AboutPage
