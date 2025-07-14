import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import MovieSections from './components/MovieSections';
import Modal from './components/Modal';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiUrl = 'https://jsonfakery.com/movies/paginated';

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${apiUrl}?page=${currentPage}`);
      const data = await response.json();
      
      setMovies(prev => [...prev, ...(data.data || [])]);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch (error) {
      console.error('Failed to load movies:', error);
      showError('Failed to load movies. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreMovies = async () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      const response = await fetch(`${apiUrl}?page=${currentPage + 1}`);
      const data = await response.json();
      setMovies(prev => [...prev, ...(data.data || [])]);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const showError = (message) => {
    // Simple error handling - you can enhance this with a proper notification system
    alert(message);
  };

  const filteredMovies = searchQuery
    ? movies.filter(movie => 
        movie.original_title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : movies;

  return (
    <div className="App">
      <Header onSearch={handleSearch} searchQuery={searchQuery} />
      
      <main className="main-content">
        <MovieSections 
          movies={filteredMovies}
          searchQuery={searchQuery}
          onMovieClick={openModal}
          onLoadMore={loadMoreMovies}
          canLoadMore={currentPage < totalPages}
          isLoading={isLoading}
        />
        
        {isLoading && <LoadingSpinner />}
        
        {isModalOpen && (
          <Modal 
            movie={selectedMovie}
            onClose={closeModal}
          />
        )}
      </main>
    </div>
  );
}

export default App;
