import { HeroSection } from '../../components/Hero/HeroSection'
import { AboutSection } from '../../components/About/AboutSection'
import { ServicesSection } from '../../components/Services/ServicesSection'
import { FeaturedFilmsSection } from '../../components/FeaturedFilms/FeaturedFilmsSection'
import { GallerySection } from '../../components/Gallery/GallerySection'
import { WhyChooseUs } from '../../components/WhyChooseUs/WhyChooseUs'
import { PageCTA } from '../../components/Common/PageCTA'
import { Footer } from '../../components/Footer/Footer'
import { PageWrapper } from '../../components/Layout/PageWrapper'

export const HomePage = () => {
  return (
    <PageWrapper
      title="Shree Radha Krishna Studio — Luxury Photography & Cinematography Jaipur"
      description="Premier Luxury Wedding Photography, Cinematic Films, Pre Wedding & Drone Cinematography in Jaipur. Contact: +91 9460142572."
    >
      <main style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <FeaturedFilmsSection />
        <GallerySection />
        <WhyChooseUs />
        <PageCTA
          heading="Reserve Your Royal Shoot Today"
          subheading="Ready to capture your love story or high-fashion brand campaign with master-class optics?"
          buttonText="Book Your Shoot Now"
          buttonLink="/contact"
        />
        <Footer />
      </main>
    </PageWrapper>
  )
}

export default HomePage
