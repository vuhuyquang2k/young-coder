'use client';

import { useState } from 'react';
import Link from 'next/link';
import { blogPosts, categoryColors } from '@/lib/blogData';

// Blog categories
const categories = ['Tất cả', 'React', 'Spring Boot', 'DevOps', 'Tips & Tricks'];

export default function Blog() {
    const [activeCategory, setActiveCategory] = useState('Tất cả');

    const filteredPosts = activeCategory === 'Tất cả'
        ? blogPosts
        : blogPosts.filter(post => post.category === activeCategory);

    const featuredPosts = blogPosts.filter(post => post.featured);
    const regularPosts = filteredPosts.filter(post => !post.featured || activeCategory !== 'Tất cả');

    return (
        <section id="blog" className="blog">
            <div className="container">
                <h2 className="section-title"><span>Blog & Bài viết</span></h2>
                <p className="section-subtitle">Chia sẻ kiến thức và kinh nghiệm lập trình</p>

                {/* Category Filter */}
                <div className="category-filter">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category !== 'Tất cả' && (
                                <span
                                    className="category-dot"
                                    style={{ background: categoryColors[category] }}
                                />
                            )}
                            {category}
                        </button>
                    ))}
                </div>

                {/* Featured Posts - Only show when "Tất cả" is selected */}
                {activeCategory === 'Tất cả' && (
                    <div className="featured-section">
                        <h3 className="featured-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            Bài viết nổi bật
                        </h3>
                        <div className="featured-grid">
                            {featuredPosts.map((post, index) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="featured-card"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="featured-image">
                                        <img src={post.image} alt={post.title} />
                                        <div className="featured-overlay" />
                                        <span
                                            className="featured-category"
                                            style={{ background: categoryColors[post.category] }}
                                        >
                                            {post.category}
                                        </span>
                                    </div>
                                    <div className="featured-content">
                                        <div className="post-meta">
                                            <span className="post-date">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                    <line x1="16" y1="2" x2="16" y2="6" />
                                                    <line x1="8" y1="2" x2="8" y2="6" />
                                                    <line x1="3" y1="10" x2="21" y2="10" />
                                                </svg>
                                                {post.date}
                                            </span>
                                            <span className="post-read-time">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <polyline points="12,6 12,12 16,14" />
                                                </svg>
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <h4>{post.title}</h4>
                                        <p>{post.excerpt}</p>
                                        <div className="post-tags">
                                            {post.tags.map(tag => (
                                                <span key={tag} className="tag">#{tag}</span>
                                            ))}
                                        </div>
                                        <span className="read-more-btn">
                                            Đọc tiếp
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Regular Posts Grid */}
                <div className="posts-grid">
                    {(activeCategory === 'Tất cả' ? blogPosts.filter(p => !p.featured) : filteredPosts).map((post, index) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="post-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="post-image">
                                <img src={post.image} alt={post.title} />
                                <div className="post-overlay" />
                                <span
                                    className="post-category"
                                    style={{ background: categoryColors[post.category] }}
                                >
                                    {post.category}
                                </span>
                            </div>
                            <div className="post-content">
                                <div className="post-meta">
                                    <span className="post-date">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        {post.date}
                                    </span>
                                    <span className="post-read-time">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12,6 12,12 16,14" />
                                        </svg>
                                        {post.readTime}
                                    </span>
                                </div>
                                <h4>{post.title}</h4>
                                <p>{post.excerpt}</p>
                                <div className="post-footer">
                                    <div className="post-tags">
                                        {post.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="tag">#{tag}</span>
                                        ))}
                                    </div>
                                    <span className="read-more-link">
                                        Đọc tiếp
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All Button */}
                <div className="view-all-wrapper">
                    <button className="view-all-btn">
                        <span>Xem tất cả bài viết</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <style jsx>{`
        .blog {
          padding: 100px 0;
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
        }

        .blog::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent-purple), transparent);
        }

        .section-subtitle {
          text-align: center;
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin-top: -40px;
          margin-bottom: 40px;
        }

        /* Category Filter */
        .category-filter {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 50px;
        }

        .category-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 50px;
          color: var(--text-secondary);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-btn:hover {
          border-color: var(--accent-purple);
          color: white;
        }

        .category-btn.active {
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-cyan));
          border-color: transparent;
          color: white;
        }

        .category-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        /* Featured Section */
        .featured-section {
          margin-bottom: 50px;
        }

        .featured-title {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #FFD700;
          font-size: 1.1rem;
          margin-bottom: 25px;
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }

        .featured-card {
          display: flex;
          flex-direction: column;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          overflow: hidden;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
          transition: all 0.4s ease;
          text-decoration: none;
          color: inherit;
        }

        .featured-card:hover {
          transform: translateY(-8px);
          border-color: var(--accent-purple);
          box-shadow: 0 20px 40px rgba(139, 92, 246, 0.2);
        }

        .featured-image {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .featured-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .featured-card:hover .featured-image img {
          transform: scale(1.1);
        }

        .featured-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8));
        }

        .featured-category {
          position: absolute;
          top: 15px;
          left: 15px;
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .featured-content {
          padding: 25px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .featured-content h4 {
          font-size: 1.3rem;
          font-weight: 700;
          color: white;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .featured-content p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 15px;
          flex: 1;
        }

        /* Post Meta */
        .post-meta {
          display: flex;
          gap: 15px;
          margin-bottom: 12px;
        }

        .post-date,
        .post-read-time {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        /* Tags */
        .post-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 15px;
        }

        .tag {
          padding: 4px 10px;
          background: rgba(139, 92, 246, 0.15);
          border-radius: 20px;
          color: var(--accent-purple);
          font-size: 0.8rem;
        }

        .read-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-cyan));
          border: none;
          border-radius: 50px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: auto;
        }

        .read-more-btn:hover {
          transform: translateX(5px);
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
        }

        /* Regular Posts Grid */
        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 25px;
        }

        .post-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          overflow: hidden;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
          transition: all 0.4s ease;
          text-decoration: none;
          color: inherit;
        }

        .post-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-cyan);
          box-shadow: 0 15px 30px rgba(0, 245, 255, 0.15);
        }

        .post-image {
          position: relative;
          height: 180px;
          overflow: hidden;
        }

        .post-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .post-card:hover .post-image img {
          transform: scale(1.1);
        }

        .post-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7));
        }

        .post-category {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 5px 12px;
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .post-content {
          padding: 20px;
        }

        .post-content h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          margin-bottom: 10px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .post-content p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 15px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .post-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 15px;
          border-top: 1px solid var(--border-color);
        }

        .post-footer .post-tags {
          margin-bottom: 0;
        }

        .read-more-link {
          display: flex;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
          color: var(--accent-cyan);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .read-more-link:hover {
          gap: 10px;
          color: var(--accent-purple);
        }

        /* View All Button */
        .view-all-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 50px;
        }

        .view-all-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px 35px;
          background: transparent;
          border: 2px solid var(--accent-purple);
          border-radius: 50px;
          color: var(--accent-purple);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-all-btn:hover {
          background: var(--accent-purple);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(139, 92, 246, 0.3);
        }

        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @media (max-width: 900px) {
          .featured-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .category-filter {
            gap: 8px;
          }

          .category-btn {
            padding: 8px 16px;
            font-size: 0.85rem;
          }

          .posts-grid {
            grid-template-columns: 1fr;
          }

          .featured-content h4 {
            font-size: 1.1rem;
          }

          .post-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>
        </section>
    );
}
