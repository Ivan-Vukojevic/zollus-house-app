import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ResponsivePicture, buildSrcSet } from './figma/ResponsivePicture';
import { motion, AnimatePresence } from 'motion/react';
import imgRectangle1 from '../assets/gallery/living-room-overview.jpg';
import imgRectangle2 from '../assets/gallery/bathroom-deluxe-overview.png';
import imgRectangle3 from '../assets/gallery/living-room-wide-angle.jpg';
import imgRectangle4 from '../assets/gallery/bedroom-deluxe-overview.png';
import imgRectangle5 from '../assets/gallery/lobby-entrance.png';
// Responsive variants (AVIF/WebP) for first-row images (optimize above-the-fold)
import rect1Avif from '../assets/gallery/living-room-overview.jpg?w=480;768;1024;1440;1920&format=avif;avif;avif;avif;avif&as=object';
import rect1Webp from '../assets/gallery/living-room-overview.jpg?w=480;768;1024;1440;1920&format=webp;webp;webp;webp;webp&as=object';
import rect2Avif from '../assets/gallery/bathroom-deluxe-overview.png?w=480;768;1024;1440;1920&format=avif;avif;avif;avif;avif&as=object';
import rect2Webp from '../assets/gallery/bathroom-deluxe-overview.png?w=480;768;1024;1440;1920&format=webp;webp;webp;webp;webp&as=object';
import rect3Avif from '../assets/gallery/living-room-wide-angle.jpg?w=480;768;1024;1440;1920&format=avif;avif;avif;avif;avif&as=object';
import rect3Webp from '../assets/gallery/living-room-wide-angle.jpg?w=480;768;1024;1440;1920&format=webp;webp;webp;webp;webp&as=object';
import rect4Avif from '../assets/gallery/bedroom-deluxe-overview.png?w=480;768;1024;1440;1920&format=avif;avif;avif;avif;avif&as=object';
import rect4Webp from '../assets/gallery/bedroom-deluxe-overview.png?w=480;768;1024;1440;1920&format=webp;webp;webp;webp;webp&as=object';
import rect5Avif from '../assets/gallery/lobby-entrance.png?w=480;768;1024;1440;1920&format=avif;avif;avif;avif;avif&as=object';
import rect5Webp from '../assets/gallery/lobby-entrance.png?w=480;768;1024;1440;1920&format=webp;webp;webp;webp;webp&as=object';
import rect6Avif from '../assets/gallery/living-room-sofa-main.jpg?w=480;768;1024;1440;1920&format=avif;avif;avif;avif;avif&as=object';
import rect6Webp from '../assets/gallery/living-room-sofa-main.jpg?w=480;768;1024;1440;1920&format=webp;webp;webp;webp;webp&as=object';
import rect7Avif from '../assets/gallery/amenity-cozy-night-seating.png?w=480;768;1024;1440;1920&format=avif;avif;avif;avif;avif&as=object';
import rect7Webp from '../assets/gallery/amenity-cozy-night-seating.png?w=480;768;1024;1440;1920&format=webp;webp;webp;webp;webp&as=object';
import rect8Avif from '../assets/gallery/atmosphere-morning-light.png?w=480;768;1024;1440;1920&format=avif;avif;avif;avif;avif&as=object';
import rect8Webp from '../assets/gallery/atmosphere-morning-light.png?w=480;768;1024;1440;1920&format=webp;webp;webp;webp;webp&as=object';
import rect9Avif from '../assets/gallery/amenity-outdoor-darts-area.png?w=480;768;1024;1440;1920&format=avif;avif;avif;avif;avif&as=object';
import rect9Webp from '../assets/gallery/amenity-outdoor-darts-area.png?w=480;768;1024;1440;1920&format=webp;webp;webp;webp;webp&as=object';
import rect10Avif from '../assets/gallery/amenity-backyard-jacuzzi-wide.png?w=480;768;1024;1440;1920&format=avif;avif;avif;avif;avif&as=object';
import rect10Webp from '../assets/gallery/amenity-backyard-jacuzzi-wide.png?w=480;768;1024;1440;1920&format=webp;webp;webp;webp;webp&as=object';
import imgRectangle6 from '../assets/gallery/living-room-sofa-main.jpg';
import imgRectangle7 from '../assets/gallery/amenity-cozy-night-seating.png';
import imgRectangle8 from '../assets/gallery/atmosphere-morning-light.png';
import imgRectangle9 from '../assets/gallery/amenity-outdoor-darts-area.png';
import imgRectangle10 from '../assets/gallery/amenity-backyard-jacuzzi-wide.png';
import imgRectangle11 from '../assets/gallery/bedroom-quad-overview.png';
import imgRectangle12 from '../assets/gallery/lobby-entrance-main.png';
import imgRectangle13 from '../assets/gallery/exterior-front-night.png';
import imgRectangle14 from '../assets/gallery/bedroom-family-quad-room.png';
import imgRectangle15 from '../assets/gallery/staircase-wooden-classic.png';
import imgRectangle16 from '../assets/gallery/attic-chill-section.png';
import imgRectangle17 from '../assets/gallery/bedroom-attic-view.png'
import imgRectangle18 from '../assets/gallery/main-entrance-facade.png';
import imgRectangle19 from '../assets/gallery/amenity-jacuzzi-deckchairs.png';
import imgRectangle20 from '../assets/gallery/bathroom-standard-overview.png';
import imgRectangle21 from '../assets/gallery/window-road-view.png';
import imgRectangle22 from '../assets/gallery/bedroom-quad-entrance-view.png';
import imgRectangle23 from '../assets/gallery/amenity-peaceful-night-garden.png';
import imgRectangle24 from '../assets/gallery/kitchen-overview.png';
import imgRectangle25 from '../assets/gallery/amenity-jacuzzi-hangout-sled.png';

interface DesktopGalleryProps {
  className?: string;
}

export function DesktopGallery({ className = '' }: DesktopGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    { src: imgRectangle1, alt: 'Luxury interior view 1' },
    { src: imgRectangle2, alt: 'Bathroom with modern fixtures' },
    { src: imgRectangle3, alt: 'Main living area' },
    { src: imgRectangle4, alt: 'Elegant bedroom design' },
    { src: imgRectangle5, alt: 'Stylish decor details' },
    { src: imgRectangle6, alt: 'Cozy garden ambiance'  },
    { src: imgRectangle7, alt: 'Scenic outdoor view'  },
    { src: imgRectangle8, alt: 'Spacious kitchen area'  },
    { src: imgRectangle9, alt: 'Dining area setup'  },
    { src: imgRectangle10, alt: 'Comfortable seating'  },
    { src: imgRectangle11, alt: 'Quad Room'  },
    { src: imgRectangle12, alt: 'Reception'  },
    { src: imgRectangle13, alt: 'Night View'  },
    { src: imgRectangle14, alt: 'Shared Room'  },
    { src: imgRectangle15, alt: 'Stairway'  },
    { src: imgRectangle16, alt: 'Attic'  },
    { src: imgRectangle17, alt: 'Bedroom Attic View'  },
    { src: imgRectangle18, alt: 'Main Entrance'  },
    { src: imgRectangle19, alt: 'Jacuzzi with Deckchairs'  },
    { src: imgRectangle20, alt: 'Standard Bathroom'  },
    { src: imgRectangle21, alt: 'Window View'  },
    { src: imgRectangle22, alt: 'Quad Room Entrance View'  },
    { src: imgRectangle23, alt: 'Peaceful Night Garden'  },
    { src: imgRectangle24, alt: 'Kitchen Overview'  },
    { src: imgRectangle25, alt: 'Jacuzzi Hangout with Sled'  },
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <div className={className}>
      {/* Gallery Header */}
      <div className="text-center mb-12">
        <h2 className="text-6xl font-bold text-[#a18f85] mb-6 uppercase">Gallery</h2>
        <p className="text-lg text-[#a18576] max-w-4xl mx-auto leading-relaxed">
          Guests are in for a truly special experience at this elegant apartment, featuring a luxurious hot tub for ultimate relaxation. 
          Designed for comfort and privacy, the apartment boasts a private entrance and an expansive layout, including a stylish living room, 
          two well-appointed bedrooms, and two modern bathrooms with either a bath or a shower.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => openLightbox(index)}
          >
            <div className="aspect-[4/5] relative">
              {index < 10 ? (
                <ResponsivePicture
                  alt={image.alt}
                  imgSrc={image.src}
                  imgClassName="w-full h-full object-cover"
                  sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  sources={[
                    { type: 'image/avif', srcSet: buildSrcSet([rect1Avif, rect2Avif, rect3Avif, rect4Avif, rect5Avif, rect6Avif, rect7Avif, rect8Avif, rect9Avif, rect10Avif][index] as any, 'w') },
                    { type: 'image/webp', srcSet: buildSrcSet([rect1Webp, rect2Webp, rect3Webp, rect4Webp, rect5Webp, rect6Webp, rect7Webp, rect8Webp, rect9Webp, rect10Webp][index] as any, 'w') },
                  ]}
                />
              ) : (
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading='lazy'
                />
              )}
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors" aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors" aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors" aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[90vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="w-full h-full object-contain rounded-lg"
              />
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 rounded-full px-4 py-2">
              <span className="text-white text-sm">
                {selectedImage + 1} / {images.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}