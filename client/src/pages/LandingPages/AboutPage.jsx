import React from 'react';

function AboutPage() {
  return (
    <div className="page">
      <div className="page-header">
        <p className="eyebrow">About</p>
        <h1>The Dota 2 Journey of Renaire Odarve</h1>
        <p className="lead">
          Strategy. Teamwork. Perseverance. <br/> A chronicle of lessons learned through thousands of hours in the most complex MOBA.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <div className="feature-icon"></div>
          <h3>Self Improvement</h3>
          <p>
            Understanding yourself is the first step to growth. Recognizing your strengths, weaknesses, 
            habits, and patterns allows you to make better decisions and stay aligned with your goals.
          </p>
        </div>
        <div className="about-card">
          <div className="feature-icon"></div>
          <h3>Growth</h3>
          <p>
            Growth comes from taking small, consistent actions to improve daily. Reflecting on past 
            experiences, learning new skills, and stepping out of your comfort zone all contribute to progress.
          </p>
        </div>
        <div className="about-card">
          <div className="feature-icon"></div>
          <h3>Progress</h3>
          <p>
            Progress isn’t always visible, but persistence matters. Tracking achievements, learning 
            from setbacks, and staying motivated are key to continuous improvement over time.
          </p>
        </div>
      </div>

      <div className="timeline">
        <div className="timeline-row">
          <strong>The Beginning</strong>
          <p>
            The journey started with a single game that seemed impossibly complex. Over 120 heroes, countless items, 
            and mechanics that take years to master. The first matches were chaotic, confusing, and humbling.
          </p>
        </div>
        <div className="timeline-row">
          <strong>The Grind</strong>
          <p>
            Thousands of hours spent learning heroes, watching replays, studying guides, and climbing ranked. 
            Every game brought new lessons—map awareness, itemization, positioning, and how to work with teammates.
          </p>
        </div>
        <div className="timeline-row">
          <strong>The Journey Continues</strong>
          <p>
            Dota 2 is never truly mastered. Every patch changes the meta, new strategies emerge, and there's always 
            room to improve. The goal isn't perfection—it's continuous growth and enjoying the challenge.
          </p>
        </div>
      </div>

      <div className="cta-banner">
        <h3>Why Document This?</h3>
        <p>
          This project chronicles the highs and lows of playing Dota 2—the victories, defeats, lessons learned, 
          and personal growth that comes from one of gaming's most challenging experiences. It's a reminder that 
          every match, win or lose, is part of the journey.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;