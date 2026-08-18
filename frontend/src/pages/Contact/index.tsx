import { PageWrapper } from '../../components/Layout/PageWrapper'
import { PageHero } from '../../components/Layout/PageHero'
import { ContactSection } from '../../components/Contact/ContactSection'
import { PageCTA } from '../../components/Common/PageCTA'
import { Footer } from '../../components/Footer/Footer'

export const ContactPage = () => {
  return (
    <PageWrapper
      title="Book a Shoot — Shree Radha Krishna Studio"
      description="Book your wedding photography, pre-wedding shoot, or commercial campaign with Shree Radha Krishna Studio in Jaipur. Call +91 9460142572."
    >
      <main style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
        <PageHero
          badge="Direct Inquiries"
          title="Let's Create Something Beautiful Together"
          subtitle="Check shoot date availability, request a custom pricing proposal, or speak directly with our lead creative director."
          pageName="Contact"
        />
        <ContactSection />
        <PageCTA
          heading="Prefer Instant Communication?"
          subheading="Message us on WhatsApp for instant quote estimates and shoot availability."
          buttonText="Chat On WhatsApp (+91 9460142572)"
          buttonLink="https://wa.me/919460142572?text=Hi%20Shree%20Radha%20Krishna%20Studio,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20shoot."
          isExternal={true}
        />
        <Footer />
      </main>
    </PageWrapper>
  )
}

export default ContactPage
