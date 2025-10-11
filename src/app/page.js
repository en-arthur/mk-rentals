import Hero from '@/components/home/hero';
import FeaturedCategories from '@/components/home/featured-categories';
import VideoDemo from '@/components/home/video-demo';
import WhyChooseUs from '@/components/home/why-choose-us';

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedCategories />
      <VideoDemo />
      <WhyChooseUs />
    </div>
  );
}
