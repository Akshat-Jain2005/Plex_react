

import React, { useEffect } from 'react';

const CastMember = ({ cast }) => (
<div className="cast-member">
{cast.profile_path ? (
<img src={cast.profile_path} alt={cast.name} loading="lazy" />
) : (
<div className="cast-placeholder">👤</div>
)}
<div className="name">{cast.name}</div>
<div className="character">{cast.character}</div>
</div>
);

const Modal = ({ movie, onClose }) => {
useEffect(() => {
const handleEscape = (e) => {
if (e.key === 'Escape') {
onClose();
}
};

document.addEventListener('keydown', handleEscape);
return () => document.removeEventListener('keydown', handleEscape);
}, [onClose]);

if (!movie) return null;

const year = new Date(movie.release_date).getFullYear();
const rating = Math.round(movie.vote_average * 10) / 10;

return (
<div className="modal show">
<div className="modal-overlay" onClick={onClose}></div>

<div className="modal-content">
<button className="modal-close" onClick={onClose}>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<line x1="18" y1="6" x2="6" y2="18"></line>
<line x1="6" y1="6" x2="18" y2="18"></line>
</svg>
</button>

<div className="modal-hero">
<div className="modal-poster">
<img
id="modalPoster"
src={movie.poster_path || ''}
alt={movie.poster_path ? movie.original_title : 'No poster available'}
style={!movie.poster_path ? { backgroundColor: '#333' } : {}}
/>
</div>

<div className="modal-details">
<h1>{movie.original_title}</h1>
<div className="modal-subtitle">
<span>Directed by {movie.director || 'Unknown Director'}</span>
</div>

<div className="modal-meta">
<span className="rating-badge">PG</span>
<span className="year-badge">{year}</span>
<span className="duration-badge">2h 5m</span>
<span className="genre-badges">Action, Adventure, and more</span>
</div>

<div className="modal-ratings">
<div className="rating-item">
<svg width="16" height="16" viewBox="0 0 24 24" fill="#f5c518">
<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
</svg>
<span>{rating}</span>
</div>

<div className="rating-item">
<svg width="16" height="16" viewBox="0 0 24 24" fill="#ff6b6b">
<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
</svg>
<span>77%</span>
</div>

<div className="rating-item">
<svg width="16" height="16" viewBox="0 0 24 24" fill="#4ecdc4">
<circle cx="12" cy="12" r="10"></circle>
<polygon points="16,8 12,16 8,12"></polygon>
</svg>
<span>98%</span>
</div>
</div>

<div className="modal-actions">
<button className="action-btn primary">
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"></path>
</svg>
Add to Watchlist
</button>

<button className="action-btn secondary">
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<circle cx="18" cy="5" r="3"></circle>
<circle cx="6" cy="12" r="3"></circle>
<circle cx="18" cy="19" r="3"></circle>
<line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
<line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
</svg>
</button>

<button className="action-btn secondary">
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<circle cx="18" cy="12" r="3"></circle>
<circle cx="6" cy="12" r="3"></circle>
</svg>
</button>

<button className="action-btn secondary">
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
<polyline points="16,6 12,2 8,6"></polyline>
<line x1="12" y1="2" x2="12" y2="15"></line>
</svg>
</button>
</div>
</div>
</div>

<div className="modal-body">
<div className="modal-description">
<p>{movie.overview}</p>
</div>

<div className="watch-section">
<h3>Where to Watch</h3>
<div className="watch-info">
<p>There are no locations currently available for this title</p>
</div>
</div>

<div className="cast-section">
<h3>Cast</h3>
<div className="cast-grid">
{movie.casts && movie.casts.length > 0 ? (
movie.casts.slice(0, 10).map((cast, index) => (
<CastMember key={index} cast={cast} />
))
) : (
<div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#999' }}>
No cast information available.
</div>
)}
</div>
</div>
</div>
</div>
</div>
);
};

export default Modal;