import React, { useState } from 'react';
import logo from '../assets/logo.png';

const Header = ({ onSearch, searchQuery }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onSearch('');
      e.target.blur();
    }
  };

  return (
    <header className="header">
      <div
        className="logo"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '150px',
          height: '80px',
          cursor: 'pointer'
        }}
      ></div>

      <nav className="main-nav" id="searchContainer">
        <label className="search-label">
          <input
            type="text"
            className="input"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          {!isSearchFocused && !searchQuery && (
            <kbd className="slash-icon">/</kbd>
          )}
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" version="1.1" width="512" height="512" viewBox="0 0 56.966 56.966">
            <g>
              <path d="M55.146 51.887 41.588 37.786A22.926 22.926 0 0 0 46.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 0 0 .083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z" fill="currentColor"/>
            </g>
          </svg>
        </label>

        <nav>
          <div className="user-menu">
            <button className="nav-btn active">
              <span className="nav-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 9.5L10 4L17 9.5V16C17 16.5523 16.5523 17 16 17H4C3.44772 17 3 16.5523 3 16V9.5Z" stroke="#fff" strokeWidth="2" fill="none"/>
                  <rect x="7" y="13" width="6" height="4" rx="1" fill="#fff"/>
                </svg>
              </span>
              Home
            </button>

            <button className="nav-btn">
              <span className="nav-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="6" width="14" height="9" rx="2" stroke="#fff" strokeWidth="2"/>
                  <line x1="7" y1="15" x2="13" y2="15" stroke="#fff" strokeWidth="2"/>
                </svg>
              </span>
              Live TV
            </button>

            <button className="nav-btn">
              <span className="nav-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="6" width="14" height="9" rx="2" stroke="#fff" strokeWidth="2"/>
                  <polygon points="9,9 13,11.5 9,14" fill="#fff"/>
                </svg>
              </span>
              On Demand
            </button>

            <button className="nav-btn">
              <span className="nav-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="#fff" strokeWidth="2"/>
                  <polygon points="10,6 12,12 10,10 8,12" fill="#fff"/>
                </svg>
              </span>
              Discover
            </button>
          </div>
        </nav>

        <button className="sign-in">Sign In</button>
      </nav>
    </header>
  );
};

export default Header;
