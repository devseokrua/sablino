import Hero from '@/components/sections/hero/Hero';
import About from '@/components/sections/about/About';
import Gallery from '@/components/sections/gallery/Gallery';
import Houses from '@/components/sections/houses/Houses';
import Cta from '@/components/sections/cta/Cta';
import Contacts from '@/components/sections/contacts/Contacts';
import HashScroll from '@/components/common/HashScroll';
import StickyCta from '@/components/sections/sticky-cta/StickyCta';
import Footer from '@/components/layout/footer/Footer';

export default function Home() {
  return (
    <>
      <HashScroll />
      <main>
        <Hero />
        <About />
        <Houses />
        <Gallery />
        <Cta />
        <Contacts />
      </main>
      <StickyCta />
      <Footer />
    </>
  );
}
