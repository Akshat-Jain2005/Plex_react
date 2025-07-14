import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading show">
      <div className="loading-spinner"></div>
      <p>Loading movies...</p>
    </div>
  );
};

export default LoadingSpinner;
