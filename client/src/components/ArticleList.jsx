import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArticleList.css';
import { getReadTime } from '../utils/readTime';

function ArticleList({ articles }) {
  return (
    <div className="article-list">
      {articles.map((article) => {
        const content = Array.isArray(article.content) ? article.content : [];
        const minutes = getReadTime(content);
        const excerpt = content[0] ? `${content[0].substring(0, 140)}...` : '';

        return (
          <Link
            key={article.name}
            to={`/articles/${article.name}`}
            className="article-card"
          >
            <div className="article-card__meta">
              <span className="pill">Stories with heart</span>
              <span className="muted">{minutes} min read</span>
            </div>
            <h3>{article.title}</h3>
            <p>{excerpt}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default ArticleList;