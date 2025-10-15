import svgPaths from '../imports/svg-c8ry94iu4r';

interface AmenityProps {
  icon: React.ReactNode;
  label: string;
}

function AmenityItem({ icon, label }: AmenityProps) {
  return (
    <div className="flex flex-col items-center space-y-1 p-2">
      <div className="text-white flex-shrink-0 w-6 h-6 flex items-center justify-center">{icon}</div>
      <span className="text-white text-xs uppercase font-medium text-center leading-tight">{label}</span>
    </div>
  );
}

export function OriginalMobileAmenities() {
  const amenities = [
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 29 29">
          <path d={svgPaths.p1b332880} fill="currentColor" />
        </svg>
      ),
      label: 'WIFI'
    },
    {
      icon: (
        <svg className="w-5 h-4" fill="currentColor" viewBox="0 0 23 17">
          <path d={svgPaths.p2c892b00} fill="currentColor" />
        </svg>
      ),
      label: 'BEDS'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 21 21">
          <path d={svgPaths.p12c89c80} fill="currentColor" />
        </svg>
      ),
      label: 'JACUZZI'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 21 24">
          <path d={svgPaths.p2459e500} fill="currentColor" />
        </svg>
      ),
      label: 'BALCONY'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 25 25">
          <path d={svgPaths.p3553c080} fill="currentColor" />
        </svg>
      ),
      label: 'DART'
    }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mt-4">
      <div className="grid grid-cols-5 gap-2">
        {amenities.map((amenity, index) => (
          <AmenityItem
            key={index}
            icon={amenity.icon}
            label={amenity.label}
          />
        ))}
      </div>
    </div>
  );
}