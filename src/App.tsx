import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { MobileNavigation } from "./components/MobileNavigation";
import { DesktopNavigation } from "./components/DesktopNavigation";
import React, { Suspense } from 'react';
const DesktopGalleryLazy = React.lazy(() => import('./components/DesktopGallery').then(m => ({ default: m.DesktopGallery })));
import { DesktopContactForm } from "./components/DesktopContactForm";
import { DesktopAmenities } from "./components/DesktopAmenities";
import { MobileGridGallery } from "./components/MobileGridGallery";
import { OriginalMobileAmenities } from "./components/OriginalMobileAmenities";
import { ContactForm } from "./components/ContactForm";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { ResponsivePicture, buildSrcSet } from "./components/figma/ResponsivePicture";
import { Toaster } from "./components/ui/sonner";
// Hero background: default image plus imagetools-generated variants
import heroDefault from "./assets/hero/hero-background.webp";
// Generate multiple width variants (WebP), returned as an object map
// Example keys include widths; we'll convert to a srcset string in usage
import heroVariants from "./assets/hero/hero-background.webp?w=640;960;1280;1920;2560&format=webp;webp;webp;webp;webp&as=object";
import heroAvif from "./assets/hero/hero-background.webp?w=640;960;1280;1920;2560&format=avif;avif;avif;avif;avif&as=object";
import imgRectangle2 from "./assets/about/about-interior.png";
// Contact background: default and responsive variants
import contactDefault from "./assets/contact/contact-background.webp";
import contactVariants from "./assets/contact/contact-background.webp?w=640;960;1280;1920;2560&format=webp;webp;webp;webp;webp&as=object";  
import contactAvif from "./assets/contact/contact-background.webp?w=640;960;1280;1920;2560&format=avif;avif;avif;avif;avif&as=object";  

export default function App() {
  const [activeSection, setActiveSection] = useState("welcome");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Preload the hero image srcset to improve LCP
  useEffect(() => {
    try {
      const avifSrcSet = buildSrcSet(heroAvif as any, 'w');
      const webpSrcSet = buildSrcSet(heroVariants as any, 'w');
      const sizes = '100vw';

      const append = (attrs: Record<string, string>) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        Object.entries(attrs).forEach(([k, v]) => (link as any)[k] = v);
        document.head.appendChild(link);
        return link;
      };

      const avifLink = append({ imagesrcset: avifSrcSet, imagesizes: sizes, type: 'image/avif' } as any);
      const webpLink = append({ imagesrcset: webpSrcSet, imagesizes: sizes, type: 'image/webp' } as any);

      return () => {
        avifLink?.remove();
        webpLink?.remove();
      };
    } catch {
      // no-op if document/head not available
    }
  }, []);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, -100],
  );
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1, 0],
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const offsetTop = element.offsetTop - (isMobile ? 0 : 80);
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveSection(section);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -80px 0px" },
    );

    const sections = ["welcome", "about", "gallery", "contact"];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  if (isMobile) {
    // Mobile layout (existing implementation)
    return (
      <div className="min-h-screen bg-white">
        {/* Welcome Section */}
        <section
          id="welcome"
          className="relative h-screen w-full overflow-hidden"
        >
          <ResponsivePicture
            alt="Zollus House exterior"
            imgSrc={heroDefault}
            className="absolute inset-0"
            imgClassName="w-full h-full object-cover"
            sizes="100vw"
            width={1920}
            height={1080}
            sources={[
              { type: 'image/avif', srcSet: buildSrcSet(heroAvif as any, 'w') },
              { type: 'image/webp', srcSet: buildSrcSet(heroVariants as any, 'w') }
            ]}
            priority
          />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
            <div className="text-center px-6 max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="space-y-4"
              >
                <p className="text-lg tracking-widest uppercase opacity-90 mb-6">
                  Welcome to
                </p>
                <h1 className="text-6xl sm:text-7xl font-bold uppercase leading-none tracking-tight">
                  <span className="block text-shadow-2xl">
                    Zollus
                  </span>
                  <span className="block text-shadow-2xl mt-2">
                    House
                  </span>
                </h1>
                <div className="w-16 h-0.5 bg-white/60 mx-auto mt-8"></div>
                <p className="text-sm uppercase tracking-wide opacity-80 mt-6">
                  Luxury • Comfort • Elegance
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="relative min-h-screen w-full"
        >
          <div className="bg-[#a18f85] h-96 relative">
            <div className="absolute inset-0 p-6 text-white">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl font-bold text-center uppercase mb-6 mt-8"
              >
                About Us
              </motion.h2>
              <div className="max-w-md mx-auto space-y-4 text-center">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-sm leading-relaxed mobile-about-text"
                >
                  Zollus House is a luxurious guesthouse located
                  in the heart of the city, offering a unique
                  blend of modern comfort and classic elegance.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-sm leading-relaxed mobile-about-text"
                >
                  This guesthouse offers a romantic and relaxed
                  atmosphere, perfect for short business trips,
                  family visits, or weekend getaways.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <OriginalMobileAmenities />
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: window.innerWidth < 768 ? 0 : 0.8, delay: window.innerWidth < 768 ? 0 : 0.3 }}
            className="relative h-[60vh]"
          >
            <ImageWithFallback
              src={imgRectangle2}
              alt="Elegant interior view"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="relative w-full">
          <MobileGridGallery className="w-full" />
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="relative min-h-screen w-full"
        >
          <ResponsivePicture
            alt="Contact background"
            imgSrc={contactDefault}
            className="absolute inset-0"
            imgClassName="w-full h-full object-cover"
            sizes="100vw"
            sources={[
              { type: 'image/avif', srcSet: buildSrcSet(contactAvif as any, 'w') },
              { type: 'image/webp', srcSet: buildSrcSet(contactVariants as any, 'w') }
            ]}
          />

          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-[rgba(161,143,133,0.54)]" />

          <div className="relative z-10 min-h-screen flex flex-col justify-between p-6">
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-center mb-8">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl font-bold text-white uppercase mb-8"
                >
                  Contact Us
                </motion.h2>
              </div>
              <ContactForm />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-[#a18f85] rounded-lg p-6 mt-12 mb-8"
            >
              <div className="text-center mb-4">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-white text-lg uppercase font-medium"
                >
                  Make yourself comfortable
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-white text-lg uppercase font-medium"
                >
                  Your stay begins here
                </motion.p>
              </div>
              <div className="text-center">
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="text-white text-sm"
                >
                  All rights reserved © 2025 zollus house
                </motion.p>
              </div>
            </motion.div>
          </div>
        </section>

        <MobileNavigation
          activeSection={activeSection}
          onSectionChange={scrollToSection}
        />

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 right-4 z-40 bg-[#a18f85] hover:bg-[#8d7a70] text-white p-3 rounded-full shadow-lg transition-all duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        )}

        <Toaster />
      </div>
    );
  }

  // Desktop layout (improved implementation)
  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Navigation */}
      <DesktopNavigation
        activeSection={activeSection}
        onSectionChange={scrollToSection}
      />

      {/* Hero Section */}
      <section
        id="welcome"
        className="relative h-screen w-full overflow-hidden"
      >
        <ResponsivePicture
          alt="Zollus House exterior"
          imgSrc={heroDefault}
          className="absolute inset-0"
          imgClassName="w-full h-full object-cover"
          sizes="100vw"
          width={1920}
          height={1080}
          sources={[
            { type: 'image/avif', srcSet: buildSrcSet(heroAvif as any, 'w') },
            { type: 'image/webp', srcSet: buildSrcSet(heroVariants as any, 'w') }
          ]}
          priority
        />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Hero Content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 flex items-center justify-center text-white z-10"
        >
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-left"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-xl mb-6 text-white/90"
              >
                Welcome to Guest House
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="text-7xl xl:text-8xl font-bold uppercase leading-tight mb-8 text-shadow-lg"
              >
                Zollus
                <br />
                House
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <button
                  onClick={() => scrollToSection("about")}
                  className="bg-[#a18f85] hover:bg-[#8d7a70] text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Discover More
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl font-bold text-[#a18f85] mb-8 uppercase"
              >
                About Us
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6 text-lg text-gray-700 leading-relaxed"
              >
                <p>
                  Zollus House is a luxurious guesthouse located
                  in the heart of the city, offering a unique
                  blend of modern comfort and classic elegance.
                  Our guesthouse features beautifully designed
                  rooms, each equipped with high-end amenities
                  to ensure a comfortable stay.
                </p>
                <p>
                  This guesthouse offers a romantic and relaxed
                  atmosphere, perfect for short business trips,
                  family visits, or weekend getaways.
                </p>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: window.innerWidth < 768 ? 0 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: window.innerWidth < 768 ? 0 : 0.8 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <ImageWithFallback
                  src={imgRectangle2}
                  alt="Elegant interior view"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#a18f85]/20 to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Amenities */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-20"
          >
            <div className="bg-[#a18f85] rounded-3xl p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#a18f85] to-[#8d7a70]" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white text-center mb-12 uppercase">
                  Premium Amenities
                </h3>
                <DesktopAmenities />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section (lazy) */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading gallery…</div>}>
            <DesktopGalleryLazy />
          </Suspense>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-20 min-h-screen"
      >
        <ResponsivePicture
          alt="Contact background"
          imgSrc={contactDefault}
          className="absolute inset-0"
          imgClassName="w-full h-full object-cover"
          sizes="100vw"
          sources={[
            { type: 'image/avif', srcSet: buildSrcSet(contactAvif as any, 'w') },
            { type: 'image/webp', srcSet: buildSrcSet(contactVariants as any, 'w') }
          ]}
        />

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#a18f85]/60 to-[#8d7a70]/60" />

        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl font-bold text-white mb-8 uppercase">
                Contact Us
              </h2>
              <div className="space-y-6 text-xl text-white/90 leading-relaxed">
                <p className="text-2xl font-medium">
                  Make yourself comfortable
                </p>
                <p className="text-xl">Your stay begins here</p>
                <p className="text-lg">
                  Ready to experience luxury and comfort like
                  never before? Get in touch with us to book
                  your stay or learn more about our premium
                  accommodations.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <DesktopContactForm />
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#a18f85]/90 backdrop-blur-sm py-6">
          <div className="container mx-auto px-6 text-center">
            <p className="text-white">
              All rights reserved © 2025 Zollus House
            </p>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 bg-[#a18f85] hover:bg-[#8d7a70] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}

      <Toaster />
    </div>
  );
}