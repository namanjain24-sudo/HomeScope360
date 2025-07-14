import React from 'react';
import { Search } from 'lucide-react';
import SearchFilters from './SearchFilters.jsx';
import './styles/Header.css';

const Header = ({
  searchQuery,
  onSearchChange,
  selectedBeds,
  selectedBaths,
  onBedsChange,
  onBathsChange,
  priceRange,
  onPriceRangeChange,
  propertyType,
  onPropertyTypeChange,
}) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Only show search bar and filters, no logo */}
          <div className="header-controls">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="City, address, zip"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
              />
            </div>
            <SearchFilters
              selectedBeds={selectedBeds}
              selectedBaths={selectedBaths}
              onBedsChange={onBedsChange}
              onBathsChange={onBathsChange}
              priceRange={priceRange}
              onPriceRangeChange={onPriceRangeChange}
              propertyType={propertyType}
              onPropertyTypeChange={onPropertyTypeChange}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;