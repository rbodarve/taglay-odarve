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
            <p className="eyebrow">Stories. Care. Compassion.</p>
            <h1>A voice for stray dogs & cats.</h1>
            <p className="lead">
              Sharing knowledge about animal care and welfare, 
              and inspires readers to help, whether through adoption, volunteering, or simple kindness.
            </p>
            <div className="hero-actions">
              <Link to="/articles" className="button-link primary">
                Browse articles
              </Link>
              <Link to="/about" className="button-link secondary">
                About the project
              </Link>
            </div>
            <div className="stats">
              <div className="stat">
                <strong>{articles.length}+</strong>
                <span>Articles</span>
              </div>
              <div className="stat">
                <strong>1</strong>
                <span>Shared mission</span>
              </div>
              <div className="stat">
                <strong>Zero</strong>
                <span>Strays we want left behind</span>
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
            <h2>What you will learn here</h2>
          </div>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Learn to care, one paw at a time</h3>
            <p>
              Insights about animal care, rescue, and welfare,
              made for anyone who wants to help but does not know where to start.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Care starts with knowledge</h3>
            <p>
              Understanding the lives of stray dogs <br/> and cats is the first step to change.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Built on compassion</h3>
            <p>
              The Pawradise Project is driven by care, awareness, and love for strays.
            </p>
          </div>
        </div>
        </section>

        <section className="articles-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Articles</p>
            <h2>Most reads</h2>
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