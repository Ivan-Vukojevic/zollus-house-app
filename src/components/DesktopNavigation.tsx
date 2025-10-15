import { useState, useEffect } from 'react';

interface DesktopNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function DesktopNavigation({ activeSection, onSectionChange }: DesktopNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'welcome', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 transition-colors duration-300 ${
              isScrolled ? 'text-[#a18f85]' : 'text-white'
            }`}>
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 25 20">
                <path d="M23.5 0L46.4497 38.25H0.550327L23.5 0Z" fill="currentColor" />
              </svg>
            </div>
            <span className={`text-xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-[#a18f85]' : 'text-white'
            }`}>
              Zollus House
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => onSectionChange(id)}
                className={`relative py-2 px-1 transition-all duration-300 hover:scale-105 ${
                  activeSection === id
                    ? isScrolled
                      ? 'text-[#a18f85]'
                      : 'text-white'
                    : isScrolled
                      ? 'text-gray-700 hover:text-[#a18f85]'
                      : 'text-white/80 hover:text-white'
                }`}
                aria-label={label}
              >
                {label}
                {activeSection === id && (
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 transition-colors duration-300 ${
                    isScrolled ? 'bg-[#a18f85]' : 'bg-white'
                  }`} />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" aria-label="Toggle mobile menu">
            <div className={`w-6 h-6 transition-colors duration-300 ${
              isScrolled ? 'text-[#a18f85]' : 'text-white'
            }`}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}