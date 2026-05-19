import Hero from '../components/Hero'
// import FeaturedListings from '../components/FeaturedListings'
// import StatsBar from '../components/StatsBar'
import WhyUs from '../components/WhyUs'
import Testimonials from '../components/Testimonials'
import BlogPreview from '../components/BlogPreview'
import Newsletter from '../components/Newsletter'

export default function Home() {
  return (
    <>
      <Hero />
      {/* <StatsBar /> */}
      {/* <FeaturedListings /> */}
      <WhyUs />
      <Testimonials />
      <BlogPreview />
      <Newsletter />
    </>
  )
}
