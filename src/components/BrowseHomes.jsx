import React, { useState, useMemo } from 'react';
import { Home, Search } from 'lucide-react';
import { properties } from './BrowseHomes/data/properties';
import PropertyCard from './BrowseHomes/PropertyCard.jsx';
import PropertyModal from './BrowseHomes/PropertyModal.jsx';
import MapView from './BrowseHomes/MapView.jsx';
import SearchFilters from './BrowseHomes/SearchFilters.jsx';
import './BrowseHomes/styles/App.css';

const BrowseHomes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBeds, setSelectedBeds] = useState(null);
  const [selectedBaths, setSelectedBaths] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [propertyType, setPropertyType] = useState('');
  const [viewMode, setViewMode] = useState('browse');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyData, setPropertyData] = useState(properties);

  const filteredProperties = useMemo(() => {
    let filtered = propertyData;
    if (viewMode === 'favorites') {
      filtered = filtered.filter(p => p.isFavorite);
    }
    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedBeds) {
      filtered = filtered.filter(property => property.beds >= selectedBeds);
    }
    if (selectedBaths) {
      filtered = filtered.filter(property => property.baths >= selectedBaths);
    }
    if (propertyType) {
      filtered = filtered.filter(property => property.type === propertyType);
    }
    filtered = filtered.filter(property => 
      property.price >= priceRange[0] && property.price <= priceRange[1]
    );
    return filtered;
  }, [searchQuery, selectedBeds, selectedBaths, priceRange, propertyType, viewMode, propertyData]);

  const toggleFavorite = (propertyId) => {
    setPropertyData(prevData => 
      prevData.map(property => 
        property.id === propertyId 
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );
    if (selectedProperty && selectedProperty.id === propertyId) {
      setSelectedProperty(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  };

  const handlePropertyClick = (property) => {
    const updatedProperty = propertyData.find(p => p.id === property.id) || property;
    setSelectedProperty(updatedProperty);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  const handlePropertySelect = (property) => {
    const updatedProperty = propertyData.find(p => p.id === property.id) || property;
    setSelectedProperty(updatedProperty);
  };

  const getSimilarProperties = (currentProperty) => {
    return propertyData
      .filter(p => 
        p.id !== currentProperty.id &&
        p.city === currentProperty.city &&
        Math.abs(p.price - currentProperty.price) < 100000
      )
      .slice(0, 6);
  };

  const favoriteCount = propertyData.filter(p => p.isFavorite).length;

  return (
    <div className="app">
      <div className="main-layout">
        {/* Map Section */}
        <div className="map-section">
          <MapView properties={filteredProperties} onPropertyClick={handlePropertyClick} />
        </div>

        {/* Properties Section */}
        <div className="properties-section">
          {/* Search and Filters (moved here) */}
          <div className="header-controls" style={{marginBottom: '1rem'}}>
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="City, address, zip"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filters-group">
              <SearchFilters
                selectedBeds={selectedBeds}
                selectedBaths={selectedBaths}
                onBedsChange={setSelectedBeds}
                onBathsChange={setSelectedBaths}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                propertyType={propertyType}
                onPropertyTypeChange={setPropertyType}
              />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="tab-navigation">
            <div className="tab-buttons">
              <button
                onClick={() => setViewMode('browse')}
                className={`tab-button ${viewMode === 'browse' ? 'active' : 'inactive'}`}
              >
                Browse
              </button>
              <button
                onClick={() => setViewMode('favorites')}
                className={`tab-button ${viewMode === 'favorites' ? 'active' : 'inactive'}`}
              >
                Favorites {favoriteCount > 0 && <span className="favorite-count">({favoriteCount})</span>}
              </button>
            </div>
          </div>
          
          {/* Properties List */}
          <div className="properties-container">
            <div className="properties-grid">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onToggleFavorite={toggleFavorite}
                  onClick={handlePropertyClick}
                />
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-content">
                  <Home className="empty-state-icon" />
                  <p className="empty-state-text">
                    {viewMode === 'favorites' 
                      ? 'No favorite properties yet. Click the heart icon on properties to add them to your favorites!' 
                      : 'No properties found matching your criteria'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Property Modal */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={handleCloseModal}
          onPropertySelect={handlePropertySelect}
          onToggleFavorite={toggleFavorite}
          similarProperties={getSimilarProperties(selectedProperty)}
        />
      )}
    </div>
  );
};

export default BrowseHomes;
