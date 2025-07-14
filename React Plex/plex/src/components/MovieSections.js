import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  const year = new Date(movie.release_date).getFullYear();
  const rating = Math.round(movie.vote_average * 10) / 10;

  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      {movie.poster_path ? (
        <img src={movie.poster_path} alt={movie.original_title} loading="lazy" />
      ) : (
        <div className="placeholder">
          <div>🎬</div>
          <div style={{ fontSize: '0.75rem', textAlign: 'center', marginTop: '0.5rem' }}>
            {movie.original_title}
          </div>
        </div>
      )}
      
      <div className="movie-overlay">
        <div className="movie-rating">★ {rating}</div>
        <div style={{ fontSize: '0.75rem', color: '#999' }}>{year}</div>
      </div>
      
      <div className="movie-title">
        <h3>{movie.original_title}</h3>
        <div className="movie-year">{year}</div>
      </div>
    </div>
  );
};

const MovieSections = ({ movies, searchQuery, onMovieClick, onLoadMore, canLoadMore, isLoading }) => {
  const renderSearchResults = () => {
    if (searchQuery) {
      return (
        <section className="movie-section">
          <div className="section-header">
            <h2>Search Results ({movies.length})</h2>
            <span className="section-subtitle">On Demand</span>
          </div>
          <div className="movie-row">
            {movies.length === 0 ? (
              <div className="no-results">No movies found matching your search.</div>
            ) : (
              movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
              ))
            )}
          </div>
        </section>
      );
    }
    
    return null;
  };

  const renderDefaultSections = () => {
    if (searchQuery) return null;
    
    const midPoint = Math.ceil(movies.length / 2);
    const bingeWorthyShows = movies.slice(0, midPoint);
    const popularInIndia = movies.slice(midPoint);

    return (
      <>
        <section className="movie-section">
          <div className="section-header">
            <h2>Binge-Worthy Shows</h2>
            <span className="section-subtitle">On Demand</span>
          </div>
          <div className="movie-row">
            {bingeWorthyShows.map(movie => (
              <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
            ))}
          </div>
        </section>

        <section className="movie-section">
          <div className="section-header">
            <h2>Most Popular in India</h2>
            <span className="section-subtitle">On Demand</span>
          </div>
          <div className="movie-row">
            {popularInIndia.map(movie => (
              <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
            ))}
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="movie-sections">
      {searchQuery ? renderSearchResults() : renderDefaultSections()}
      
      {!searchQuery && canLoadMore && (
        <div className="load-more-container">
          <button 
            className="load-more-btn" 
            onClick={onLoadMore}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieSections;
