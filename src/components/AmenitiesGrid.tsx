import { Wifi } from 'lucide-react';
import svgPaths from '../imports/svg-c8ry94iu4r';

interface AmenityProps {
  icon: React.ReactNode;
  label: string;
}

function AmenityItem({ icon, label }: AmenityProps) {
  return (
    <div className="flex flex-col items-center space-y-2 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
      <div className="text-white text-2xl">{icon}</div>
      <span className="text-white text-sm uppercase font-medium">{label}</span>
    </div>
  );
}

export function AmenitiesGrid() {
  const amenities = [
    {
      icon: <Wifi size={24} />,
      label: 'WIFI'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 23 17">
          <path d={svgPaths.p2c892b00} fill="currentColor" />
        </svg>
      ),
      label: '8 BEDS'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 21 21">
          <path d={svgPaths.p12c89c80} fill="currentColor" />
        </svg>
      ),
      label: 'JACUZZI'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 21 24">
          <path d={svgPaths.p2459e500} fill="currentColor" />
        </svg>
      ),
      label: 'BALCONY'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 25 25">
          <path d={svgPaths.p3553c080} fill="currentColor" />
        </svg>
      ),
      label: 'DART'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {amenities.map((amenity, index) => (
        <AmenityItem
          key={index}
          icon={amenity.icon}
          label={amenity.label}
        />
      ))}
    </div>
  );
}