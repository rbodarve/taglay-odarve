import React from 'react';

function AboutPage() {
  return (
    <div className="page">
      <div className="page-header">
        <p className="eyebrow">About</p>
        <h1>Personal Profile Project of Renaire Odarve.</h1>
        <p className="lead">
          Self Improvement <br/> This pet project will be used as a reminder for self improvement and growth.
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
          <strong>The Objective</strong>
          <p>
            This project started as a personal reminder to focus on self-awareness, self-improvement, 
            and intentional living, keeping growth and learning at the center of every decision.
          </p>
        </div>
        <div className="timeline-row">
          <strong>The Progress</strong>
          <p>
            Through consistent reflection, journaling, and habit tracking, I document the lessons learned, 
            milestones achieved, and challenges overcome in the journey of personal growth.
          </p>
        </div>
        <div className="timeline-row">
          <strong>The End Goal</strong>
          <p>
            The ultimate aim is to cultivate a balanced, resilient, and mindful life where self-improvement 
            becomes a continuous process, and personal growth is prioritized without losing perspective.
          </p>
        </div>
      </div>

      <div className="cta-banner">
        <h3>Reminder</h3>
        <p>
          Focus on your personal growth above external pressures. Learn to set boundaries, make deliberate choices, 
          and reflect on your decisions to move forward intentionally.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;