import Hero from '@/components/sections/hero/Hero';
import About from '@/components/sections/about/About';
import Gallery from '@/components/sections/gallery/Gallery';
import Houses from '@/components/sections/houses/Houses';
import Cta from '@/components/sections/cta/Cta';
import Contacts from '@/components/sections/contacts/Contacts';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Houses />
      <Gallery />
      <Cta />
      <Contacts />
    </main>
  );
}
