import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="page">
      <div className="not-found card">
        <p className="eyebrow">Error</p>
        <h1>Page not found.</h1>
        <p className="lead">
          The link you followed to get here must be broken. 
        </p>
        <div className="hero-actions">
          <Link to="/" className="button-link primary">
            Go home
          </Link>
          <Link to="/articles" className="button-link secondary">
            Visit articles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;