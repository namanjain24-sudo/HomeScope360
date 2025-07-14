import React from 'react';
import { Heart, Bed, Bath, Square, MapPin } from 'lucide-react';
import './styles/PropertyCard.css';

const PropertyCard = ({ property, onToggleFavorite, onClick }) => {
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

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(property.id);
  };

  const handleCardClick = () => {
    onClick(property);
  };

  return (
    <div className="property-card" onClick={handleCardClick}>
      <div className="property-image-container">
        <img
          src={property.image}
          alt={property.address}
          className="property-image"
        />
        <button
          onClick={handleFavoriteClick}
          className="favorite-button"
          title={property.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`favorite-icon ${
              property.isFavorite ? 'favorited' : 'not-favorited'
            }`}
          />
        </button>
        {property.has360Tour && (
          <div className="tour-badge">
            360° Tour
          </div>
        )}
      </div>
      
      <div className="property-content">
        <div className="property-header">
          <span className="property-price">
            {formatPrice(property.price)}
          </span>
        </div>
        
        <div className="property-details">
          <div className="property-detail">
            <Bed className="property-detail-icon" />
            <span>{property.beds} bd</span>
          </div>
          <div className="property-detail">
            <Bath className="property-detail-icon" />
            <span>{property.baths} ba</span>
          </div>
          <div className="property-detail">
            <Square className="property-detail-icon" />
            <span>{formatNumber(property.sqft)} sqft</span>
          </div>
        </div>
        
        <div className="property-type">
          {property.type}
        </div>
        
        <div className="property-location">
          <MapPin className="location-icon" />
          <span className="location-text">{property.location}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;