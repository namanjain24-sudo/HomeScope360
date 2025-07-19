import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ChevronDown, Bed, Bath, Square, MapPin, Heart, Play, Maximize2 } from 'lucide-react';
import './styles/PropertyModal.css';

const PropertyModal = ({ property, onClose, onPropertySelect, onToggleFavorite, similarProperties = [] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSelfTour, setShowSelfTour] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    homeDetails: false,
    schools: false,
    priceHistory: false,
    similarListings: true
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSimilarPropertyClick = (similarProperty) => {
    if (onPropertySelect) {
      onPropertySelect(similarProperty);
    }
  };

  const handleFavoriteClick = () => {
    if (onToggleFavorite) {
      onToggleFavorite(property.id);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {/* Left Side - Images */}
        <div className="modal-left">
          <div className="image-gallery">
            <img
              src={property.images[currentImageIndex]}
              alt={`${property.address} - Image ${currentImageIndex + 1}`}
              className="main-image"
            />
            
            <button onClick={onClose} className="close-button">
              <X className="close-icon" />
            </button>
            
            <button onClick={handleFavoriteClick} className="favorite-button-modal">
              <Heart className={`favorite-icon-modal ${property.isFavorite ? 'favorited' : 'not-favorited'}`} />
            </button>
            
            {property.images.length > 1 && (
              <>
                <button onClick={prevImage} className="image-navigation nav-prev">
                  <ChevronLeft className="nav-icon" />
                </button>
                <button onClick={nextImage} className="image-navigation nav-next">
                  <ChevronRight className="nav-icon" />
                </button>
                <div className="image-counter">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </>
            )}
            
            {property.has360Tour && (
              <div className="tour-badge-modal">
                <Play className="tour-icon" />
                360° Tour Available
              </div>
            )}
          </div>
          
          {/* Thumbnail Strip */}
          <div className="thumbnail-strip">
            {property.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Property Details */}
        <div className="modal-right">
          <div className="property-header-modal">
            <h1 className="property-address">
              {property.address}, {property.city}, {property.state} {property.zip}
            </h1>
            <div className="property-price-modal">
              {formatPrice(property.price)}
            </div>
            <div className="property-stats">
              <div className="property-stat">
                <Bed className="stat-icon" />
                <span>{property.beds} bds</span>
              </div>
              <div className="property-stat">
                <Bath className="stat-icon" />
                <span>{property.baths} ba</span>
              </div>
              <div className="property-stat">
                <Square className="stat-icon" />
                <span>{formatNumber(property.sqft)} sqft</span>
              </div>
              <div className="property-stat">
                <span>${formatNumber(property.monthlyEst)}/month est.</span>
              </div>
            </div>
            <div className="school-district">
              {property.schoolDistrict}
            </div>
          </div>

          {/* Home Details Section */}
          <div className="expandable-section">
            <button 
              className="section-header"
              onClick={() => toggleSection('homeDetails')}
            >
              <h3 className="section-title">Home details</h3>
              <ChevronDown className={`expand-icon ${expandedSections.homeDetails ? 'expanded' : ''}`} />
            </button>
            <div className={`section-content ${expandedSections.homeDetails ? '' : 'collapsed'}`}>
              <div className="home-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Property type</span>
                  <span className="detail-value">{property.type}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Year built</span>
                  <span className="detail-value">{property.yearBuilt}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Lot size</span>
                  <span className="detail-value">{formatNumber(property.lotSize)} sqft</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Price per sqft</span>
                  <span className="detail-value">${property.pricePerSqft}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className="detail-value">{property.status}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">360° Tour</span>
                  <span className="detail-value">{property.has360Tour ? 'Available' : 'Not available'}</span>
                </div>
              </div>
              
              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>Description</h4>
                <p style={{ color: '#374151', lineHeight: '1.6' }}>{property.description}</p>
              </div>
              
              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>Features</h4>
                <div className="features-list">
                  {property.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <div className="feature-bullet"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Property Map */}
              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>Location</h4>
                <div className="property-map">
                  <div className="map-placeholder">
                    <MapPin style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} />
                    Interactive map view
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schools Section */}
          <div className="expandable-section">
            <button 
              className="section-header"
              onClick={() => toggleSection('schools')}
            >
              <h3 className="section-title">Schools</h3>
              <ChevronDown className={`expand-icon ${expandedSections.schools ? 'expanded' : ''}`} />
            </button>
            <div className={`section-content ${expandedSections.schools ? '' : 'collapsed'}`}>
              <p>School information for {property.schoolDistrict}</p>
              <div style={{ marginTop: '1rem' }}>
                <div className="detail-item">
                  <span className="detail-label">Elementary School</span>
                  <span className="detail-value">Desert Valley Elementary</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Middle School</span>
                  <span className="detail-value">Phoenix Middle School</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">High School</span>
                  <span className="detail-value">Desert Ridge High School</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price History Section */}
          <div className="expandable-section">
            <button 
              className="section-header"
              onClick={() => toggleSection('priceHistory')}
            >
              <h3 className="section-title">Price history</h3>
              <ChevronDown className={`expand-icon ${expandedSections.priceHistory ? 'expanded' : ''}`} />
            </button>
            <div className={`section-content ${expandedSections.priceHistory ? '' : 'collapsed'}`}>
              <div className="detail-item">
                <span className="detail-label">Listed</span>
                <span className="detail-value">{formatPrice(property.price)} (Current)</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Previous Sale</span>
                <span className="detail-value">{formatPrice(Math.floor(property.price * 0.85))} ({property.yearBuilt + 5})</span>
              </div>
            </div>
          </div>

          {/* Similar Listings Section */}
          {similarProperties.length > 0 && (
            <div className="expandable-section">
              <button 
                className="section-header"
                onClick={() => toggleSection('similarListings')}
              >
                <h3 className="section-title">Similar listings</h3>
                <ChevronDown className={`expand-icon ${expandedSections.similarListings ? 'expanded' : ''}`} />
              </button>
              <div className={`section-content ${expandedSections.similarListings ? '' : 'collapsed'}`}>
                <div className="similar-listings">
                  {similarProperties.slice(0, 4).map((similar) => (
                    <div 
                      key={similar.id} 
                      className="similar-listing"
                      onClick={() => handleSimilarPropertyClick(similar)}
                    >
                      <img
                        src={similar.image}
                        alt={similar.address}
                        className="similar-image"
                      />
                      <div className="similar-content">
                        <div className="similar-price">{formatPrice(similar.price)}</div>
                        <div className="similar-details">
                          {similar.beds} bds • {similar.baths} ba • {formatNumber(similar.sqft)} sqft
                        </div>
                        <div className="similar-location">{similar.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className="action-button primary"
              onClick={() => setShowSelfTour((prev) => !prev)}
            >
              {showSelfTour ? 'Hide Self-tour' : 'Self-tour now'}
            </button>
            <button className="action-button secondary">
              Contact agent
            </button>
          </div>

          {showSelfTour && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.35)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  background: '#fff',
                  borderRadius: '32px',
                  boxShadow: '0 8px 40px 0 rgba(0,0,0,0.18)',
                  padding: '32px 32px 40px 32px',
                  maxWidth: '900px',
                  width: '90vw',
                  minWidth: '320px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <button
                  onClick={() => setShowSelfTour(false)}
                  style={{
                    position: 'absolute',
                    top: 24,
                    right: 32,
                    background: 'rgba(0,0,0,0.06)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    color: '#374151',
                    boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
                    transition: 'background 0.2s',
                  }}
                  title="Close"
                >
                  <X />
                </button>
                <h2
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    color: '#1a202c',
                    margin: 0,
                    marginBottom: 12,
                    textAlign: 'center',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {property.address}, {property.city}, {property.state} {property.zip}
                </h2>
                <div
                  style={{
                    width: '100%',
                    height: 3,
                    background: 'linear-gradient(90deg, #4a90e2 0%, #2563eb 100%)',
                    borderRadius: 2,
                    margin: '0 0 32px 0',
                    opacity: 0.12,
                  }}
                />
                <iframe
                  src="https://my.matterport.com/show?play=1&lang=en-US&m=6yL2uKFX1NC"
                  title="Virtual Tour"
                  width="100%"
                  height="500"
                  style={{
                    border: 'none',
                    borderRadius: '20px',
                    boxShadow: '0 4px 32px 0 rgba(0,0,0,0.10)',
                    background: '#f3f4f6',
                    minHeight: 400,
                    maxWidth: 800,
                    margin: '0 auto',
                    display: 'block',
                  }}
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;