import React from 'react';
import { Link } from 'react-router-dom';
import articles from '../../article-content';
import heroVideo from '../../assets/Dota_2_Logo.mp4';

function HomePage() {
  const featuredArticles = articles.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-copy">
            <p className="eyebrow">Strategy. Skill. Perseverance.</p>
            <h1>Dota 2 Journey of Renaire Odarve</h1>
            <p className="lead">
              Documenting the climbing journey, lessons learned, and memorable moments 
              from the world's most complex MOBA.
            </p>
            <div className="hero-actions">
              <Link to="/articles" className="button-link primary">
                Browse Articles
              </Link>
              <Link to="/about" className="button-link secondary">
                About the Project
              </Link>
            </div>
            <div className="stats">
              <div className="stat">
                <strong>{articles.length}+</strong>
                <span>Articles</span>
              </div>
              <div className="stat">
                <strong>2.5k+</strong>
                <span>Hours Played</span>
              </div>
              <div className="stat">
                <strong>120+</strong>
                <span>Heroes Learned</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-panel">
              <video autoPlay loop muted playsInline >
                <source src={heroVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <main className="main-content">
        <section className="feature-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Highlights</p>
            <h2>Major Milestones</h2>
          </div>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>First Ranked Calibration</h3>
            <p>
              Started from the bottom and embraced the grind. Every rank is earned through dedication and improvement.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Mastered Support Role</h3>
            <p>
              Found my calling in supporting the team. Ward placements, saves, and enabling carries became my specialty.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Watched TI Live</h3>
            <p>
              Experienced The International and witnessed the highest level of Dota 2 competition.
            </p>
          </div>
        </div>
        </section>

        <section className="articles-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Journey Stories</p>
            <h2>Featured Articles</h2>
          </div>
          <Link to="/articles" className="button-link primary">
            View all
          </Link>
        </div>
        <div className="article-preview-grid">
          {featuredArticles.map((article) => (
            <div key={article.name} className="article-preview">
              <h3>{article.title}</h3>
              <p>{article.content[0].substring(0, 150)}...</p>
              <Link to={`/articles/${article.name}`} className="button-link secondary">
                Read article
              </Link>
            </div>
          ))}
        </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;