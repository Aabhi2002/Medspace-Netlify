import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { HeroContent } from "@/components/hero-content"
import { WaveDivider } from "@/components/wave-divider"
import { HowItWorks } from "@/components/how-it-works"
import { WhatYouGet } from "@/components/what-you-get"
import { PricingSnapshot } from "@/components/pricing-snapshot"
import { Specialties } from "@/components/specialties"
import { SocialProof } from "@/components/social-proof"
import { CostAdvantage } from "@/components/cost-advantage"
import { ImageGalleryScroll } from "@/components/image-gallery-scroll"
import { FacilityPartners } from "@/components/facility-partners"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <section><CostAdvantage /></section>
      <HeroContent />
      <WaveDivider />
      <section id="what-you-get"><WhatYouGet /></section>
      <ImageGalleryScroll />
      <section id="how-it-works"><HowItWorks /></section>
      <section id="pricing"><PricingSnapshot /></section>
      <section id="specialties"><Specialties /></section>
      {/* <section id="community"><SocialProof /></section> */}
      <section id="for-facilities"><FacilityPartners /></section>
      <Footer />
      <style>{`html { scroll-behavior: smooth; }`}</style>
    </main>
  )
}
