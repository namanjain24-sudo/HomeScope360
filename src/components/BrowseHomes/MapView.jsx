import React from 'react';
import './styles/MapView.css';

const MapView = ({ properties, onPropertyClick }) => {
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `${Math.round(price / 1000)}K`;
    }
    return price.toString();
  };

  const handleMarkerClick = (property) => {
    if (onPropertyClick) {
      onPropertyClick(property);
    }
  };

  return (
    <div className="bhm-map-container">
      {/* Map Background */}
      <div 
        className="bhm-map-background"
        style={{
          backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
            <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" stroke-width="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="#f3f4f6"/>
              <rect width="100%" height="100%" fill="url(#grid)"/>
              
              <!-- Phoenix area outline -->
              <path d="M 150 200 Q 200 180 300 200 Q 400 220 450 280 Q 480 350 450 420 Q 400 480 300 460 Q 200 440 150 380 Q 120 300 150 200 Z" 
                    fill="#e0f2fe" stroke="#0284c7" stroke-width="2" opacity="0.3"/>
              
              <!-- Major roads -->
              <line x1="100" y1="300" x2="500" y2="300" stroke="#9ca3af" stroke-width="3" opacity="0.6"/>
              <line x1="300" y1="100" x2="300" y2="500" stroke="#9ca3af" stroke-width="3" opacity="0.6"/>
              <line x1="150" y1="150" x2="450" y2="450" stroke="#9ca3af" stroke-width="2" opacity="0.4"/>
              <line x1="450" y1="150" x2="150" y2="450" stroke="#9ca3af" stroke-width="2" opacity="0.4"/>
              
              <!-- Area labels -->
              <text x="200" y="250" font-family="Arial, sans-serif" font-size="12" fill="#6b7280" opacity="0.8">Phoenix</text>
              <text x="350" y="200" font-family="Arial, sans-serif" font-size="10" fill="#6b7280" opacity="0.6">Scottsdale</text>
              <text x="150" y="350" font-family="Arial, sans-serif" font-size="10" fill="#6b7280" opacity="0.6">Tempe</text>
              <text x="400" y="380" font-family="Arial, sans-serif" font-size="10" fill="#6b7280" opacity="0.6">Mesa</text>
              <text x="120" y="180" font-family="Arial, sans-serif" font-size="10" fill="#6b7280" opacity="0.6">Glendale</text>
            </svg>
          `)}`
        }}
      />
      
      {/* Map Controls */}
      <div className="bhm-map-controls">
        <button className="bhm-map-control-button">
          <span className="bhm-control-text">+</span>
        </button>
        <button className="bhm-map-control-button">
          <span className="bhm-control-text">−</span>
        </button>
      </div>

      {/* Compass */}
      <div className="bhm-compass">
        <div className="bhm-compass-inner">
          <div className="bhm-compass-needle"></div>
        </div>
      </div>

      {/* Property Price Markers */}
      {properties.slice(0, 50).map((property) => (
        <div
          key={property.id}
          className="bhm-property-marker"
          style={{
            top: property.mapPosition.top,
            left: property.mapPosition.left,
          }}
          onClick={() => handleMarkerClick(property)}
        >
          <div className="bhm-marker-price">
            ${formatPrice(property.price)}
          </div>
          
          {/* Tooltip on hover */}
          <div className="bhm-marker-tooltip">
            <div className="bhm-tooltip-content">
              <img
                src={property.image}
                alt={property.address}
                className="bhm-tooltip-image"
              />
              <div className="bhm-tooltip-price">
                ${formatPrice(property.price)}
              </div>
              <div className="bhm-tooltip-details">
                {property.beds} bd • {property.baths} ba • {property.sqft.toLocaleString()} sqft
              </div>
              <div className="bhm-tooltip-address">
                {property.address}
              </div>
              <div className="bhm-tooltip-arrow"></div>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default MapView;