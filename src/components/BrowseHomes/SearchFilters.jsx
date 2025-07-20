import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import './styles/SearchFilters.css';

// Find the max price from the properties dataset
import { properties } from './data/properties';
const MAX_PROPERTY_PRICE = Math.max(...properties.map(p => p.price));

const SearchFilters = ({
  selectedBeds,
  selectedBaths,
  onBedsChange,
  onBathsChange,
  priceRange,
  onPriceRangeChange,
  propertyType,
  onPropertyTypeChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const bedOptions = [1, 2, 3, 4, 5, 6];
  const bathOptions = [1, 2, 3, 4, 5];
  const propertyTypes = ['Single family', 'Townhouse', 'Condo', 'Patio Home'];

  return (
    <div className="filters-container">
      {/* Beds Dropdown */}
      <div className="filter-dropdown">
        <select
          value={selectedBeds || ''}
          onChange={(e) => onBedsChange(e.target.value ? parseInt(e.target.value) : null)}
          className="filter-select"
        >
          <option value="">Beds</option>
          {bedOptions.map(beds => (
            <option key={beds} value={beds}>{beds}+</option>
          ))}
        </select>
        <ChevronDown className="dropdown-icon" />
      </div>

      {/* Baths Dropdown */}
      <div className="filter-dropdown">
        <select
          value={selectedBaths || ''}
          onChange={(e) => onBathsChange(e.target.value ? parseInt(e.target.value) : null)}
          className="filter-select"
        >
          <option value="">Baths</option>
          {bathOptions.map(baths => (
            <option key={baths} value={baths}>{baths}+</option>
          ))}
        </select>
        <ChevronDown className="dropdown-icon" />
      </div>

      {/* Filters Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="filters-button"
      >
        <Filter className="filter-icon" />
        <span>Filters</span>
      </button>

      {/* Filters Dropdown */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filters-content">
            {/* Property Type */}
            <div className="filter-group">
              <label className="filter-label">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => onPropertyTypeChange(e.target.value)}
                className="filter-input"
              >
                <option value="">All Types</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="filter-group">
              <label className="filter-label">
                Price Range
              </label>
              <div className="price-range">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0] || ''}
                  onChange={(e) => onPriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="filter-input price-input"
                  min={0}
                  max={MAX_PROPERTY_PRICE}
                />
                <span className="price-separator">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1] === MAX_PROPERTY_PRICE ? '' : priceRange[1]}
                  onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value) || MAX_PROPERTY_PRICE])}
                  className="filter-input price-input"
                  min={0}
                  max={MAX_PROPERTY_PRICE}
                />
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                onBedsChange(null);
                onBathsChange(null);
                onPriceRangeChange([0, MAX_PROPERTY_PRICE]);
                onPropertyTypeChange('');
                setShowFilters(false);
              }}
              className="clear-filters"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;