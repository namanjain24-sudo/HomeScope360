import React, { useState, useRef, useEffect } from 'react';
import './styles/MapView.css';

const MapView = ({ properties, onPropertyClick }) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const minZoom = 0.5;
  const maxZoom = 2.5;
  const zoomStep = 0.2;
  const mapRef = useRef(null);

  useEffect(() => {
    if (zoom <= 1) {
      setPan({ x: 0, y: 0 });
    }
  }, [zoom]);

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

  const handleZoomIn = () => {
    setZoom((z) => Math.min(maxZoom, z + zoomStep));
  };
  const handleZoomOut = () => {
    setZoom((z) => Math.max(minZoom, z - zoomStep));
  };

  // Helper to convert percent string to scaled percent
  const scalePercent = (percentStr) => {
    const value = parseFloat(percentStr);
    return `${50 + (value - 50) * zoom}%`;
  };

  // Drag handlers (only active if zoom > 1)
  const onMouseDown = (e) => {
    if (zoom <= 1) return;
    setDragging(true);
    setDragStart({
      x: e.clientX - pan.x,
      y: e.clientY - pan.y,
    });
  };
  const onMouseMove = (e) => {
    if (!dragging || zoom <= 1) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };
  const onMouseUp = () => {
    setDragging(false);
  };
  // Touch support
  const onTouchStart = (e) => {
    if (zoom <= 1 || e.touches.length !== 1) return;
    setDragging(true);
    setDragStart({
      x: e.touches[0].clientX - pan.x,
      y: e.touches[0].clientY - pan.y,
    });
  };
  const onTouchMove = (e) => {
    if (!dragging || zoom <= 1 || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };
  const onTouchEnd = () => {
    setDragging(false);
  };

  // Prevent map from being dragged out of bounds (optional, simple clamp)
  // You can improve this logic for more natural bounds
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
  const containerWidth = 800; // SVG width
  const containerHeight = 600; // SVG height
  const viewW = containerWidth * zoom;
  const viewH = containerHeight * zoom;
  const maxPanX = (viewW - containerWidth) / 2;
  const maxPanY = (viewH - containerHeight) / 2;
  const panX = clamp(pan.x, -maxPanX, maxPanX);
  const panY = clamp(pan.y, -maxPanY, maxPanY);

  return (
    <div
      className="bhm-map-container"
      style={{ overflow: 'hidden', position: 'relative', cursor: zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'default' }}
      ref={mapRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
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
              <path d="M 150 200 Q 200 180 300 200 Q 400 220 450 280 Q 480 350 450 420 Q 400 480 300 460 Q 200 440 150 380 Q 120 300 150 200 Z" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" opacity="0.3"/>
              <line x1="100" y1="300" x2="500" y2="300" stroke="#9ca3af" stroke-width="3" opacity="0.6"/>
              <line x1="300" y1="100" x2="300" y2="500" stroke="#9ca3af" stroke-width="3" opacity="0.6"/>
              <line x1="150" y1="150" x2="450" y2="450" stroke="#9ca3af" stroke-width="2" opacity="0.4"/>
              <line x1="450" y1="150" x2="150" y2="450" stroke="#9ca3af" stroke-width="2" opacity="0.4"/>
              <text x="200" y="250" font-family="Arial, sans-serif" font-size="12" fill="#6b7280" opacity="0.8">Phoenix</text>
              <text x="350" y="200" font-family="Arial, sans-serif" font-size="10" fill="#6b7280" opacity="0.6">Scottsdale</text>
              <text x="150" y="350" font-family="Arial, sans-serif" font-size="10" fill="#6b7280" opacity="0.6">Tempe</text>
              <text x="400" y="380" font-family="Arial, sans-serif" font-size="10" fill="#6b7280" opacity="0.6">Mesa</text>
              <text x="120" y="180" font-family="Arial, sans-serif" font-size="10" fill="#6b7280" opacity="0.6">Glendale</text>
            </svg>
          `)}`,
          transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
          transformOrigin: '50% 50%',
        }}
      />
      {/* Map Controls */}
      <div className="bhm-map-controls">
        <button className="bhm-map-control-button" onClick={handleZoomIn} aria-label="Zoom in">
          <span className="bhm-control-text">+</span>
        </button>
        <button className="bhm-map-control-button" onClick={handleZoomOut} aria-label="Zoom out">
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
            top: scalePercent(property.mapPosition.top),
            left: scalePercent(property.mapPosition.left),
            zIndex: 10,
            transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
            transformOrigin: '50% 50%',
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