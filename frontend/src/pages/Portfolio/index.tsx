import { PageWrapper } from '../../components/Layout/PageWrapper'
import { PageHero } from '../../components/Layout/PageHero'
import { FeaturedFilmsSection } from '../../components/FeaturedFilms/FeaturedFilmsSection'
import { GallerySection } from '../../components/Gallery/GallerySection'
import { PageCTA } from '../../components/Common/PageCTA'
import { Footer } from '../../components/Footer/Footer'

export const PortfolioPage = () => {
  return (
    <PageWrapper
      title="Portfolio & Cinema — Shree Radha Krishna Studio"
      description="Explore our complete portfolio of royal wedding films, fashion campaigns, destination pre-weddings, and 8K anamorphic cinematography."
    >
      <main style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
        <PageHero
          badge="Complete Collection"
          title="Capturing Stories That Last Forever"
          subtitle="Immerse yourself in our signature 8K feature films, high-fashion editorial campaigns, and royal wedding photo stories."
          pageName="Portfolio"
        />
        <FeaturedFilmsSection />
        <GallerySection />
        <PageCTA
          heading="Loved Our Portfolio?"
          subheading="Let us turn your special celebration or brand vision into a timeless visual masterpiece."
          buttonText="Book Your Shoot Now"
          buttonLink="/contact"
        />
        <Footer />
      </main>
    </PageWrapper>
  )
}

export default PortfolioPage
