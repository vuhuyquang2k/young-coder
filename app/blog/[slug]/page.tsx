'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { blogPosts, categoryColors } from '@/lib/blogData';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  return (
    <div className="blog-post-page">
      {/* Navigation */}
      <nav className="blog-nav">
        <div className="nav-container">
          <Link href="/" className="logo">
            <span className="logo-bracket">&lt;</span>
            <span className="logo-text">Young</span>
            <span className="logo-highlight">Coder</span>
            <span className="logo-bracket">/&gt;</span>
          </Link>
          <Link href="/#blog" className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Về trang chủ
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="post-hero">
        <div className="hero-image">
          <img src={post.image} alt={post.title} />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <span className="category-badge" style={{ background: categoryColors[post.category] }}>
            {post.category}
          </span>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {post.date}
            </span>
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              {post.readTime}
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="post-content">
        <article className="prose" dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />

        {/* Tags */}
        <div className="post-tags">
          {post.tags.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>

        {/* Share */}
        <div className="share-section">
          <span>Chia sẻ bài viết:</span>
          <div className="share-buttons">
            <button className="share-btn zalo" onClick={() => window.open('https://sp.zalo.me/share/base?url=' + encodeURIComponent(window.location.href), '_blank')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.5 10.5c0-4.694-4.254-8.5-9.5-8.5S2.5 5.806 2.5 10.5c0 2.597 1.305 4.91 3.393 6.456-.16.89-.636 2.455-.732 2.76-.11.35.114.34.238.257.098-.065 1.556-.99 2.16-1.38.448.114.913.177 1.391.177 5.246 0 9.5-3.806 9.5-8.5z" />
                <path d="M12.5 14.5h-4v-1l2.5-2.5h-2.5v-1h4v1l-2.5 2.5h2.5v1z" />
              </svg>
            </button>
            <button className="share-btn twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
            <button className="share-btn linkedin">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>
          </div>
        </div>
      </main>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="related-posts">
          <div className="container">
            <h3>Bài viết liên quan</h3>
            <div className="related-grid">
              {relatedPosts.map(related => (
                <Link key={related.id} href={`/blog/${related.slug}`} className="related-card">
                  <div className="related-image">
                    <img src={related.image} alt={related.title} />
                  </div>
                  <div className="related-content">
                    <h4>{related.title}</h4>
                    <span>{related.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style jsx>{`
        .blog-post-page {
          min-height: 100vh;
          background: var(--bg-primary);
        }

        .blog-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(10, 10, 15, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          padding: 15px 0;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.3rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          gap: 2px;
        }
        .logo-bracket { color: var(--accent-cyan); }
        .logo-text { color: white; }
        .logo-highlight {
          background: var(--cyber-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.3s;
        }
        .back-link:hover { color: var(--accent-cyan); }

        /* Hero */
        .post-hero {
          position: relative;
          height: 450px;
          display: flex;
          align-items: flex-end;
        }

        .hero-image {
          position: absolute;
          inset: 0;
        }
        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(10,10,15,0.3), rgba(10,10,15,0.95));
        }

        .hero-content {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px 50px;
          width: 100%;
        }

        .category-badge {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .hero-content h1 {
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          line-height: 1.3;
          margin-bottom: 20px;
        }

        .post-meta {
          display: flex;
          gap: 20px;
        }
        .post-meta span {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
        }

        /* Content */
        .post-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 60px 24px;
        }

        .post-content :global(.prose) {
          color: var(--text-secondary);
          font-size: 1.1rem;
          line-height: 1.9;
        }

        .post-content :global(h2) {
          color: white;
          font-size: 1.6rem;
          font-weight: 700;
          margin: 40px 0 20px;
        }

        .post-content :global(h3) {
          color: white;
          font-size: 1.3rem;
          font-weight: 600;
          margin: 30px 0 15px;
        }

        .post-content :global(p) {
          margin-bottom: 20px;
        }

        .post-content :global(pre) {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 20px;
          overflow-x: auto;
          margin: 25px 0;
        }

        .post-content :global(code) {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          color: var(--accent-cyan);
        }

        .post-content :global(pre code) {
          color: #e2e8f0;
        }

        .post-content :global(ul), .post-content :global(ol) {
          margin: 20px 0;
          padding-left: 25px;
        }

        .post-content :global(li) {
          margin-bottom: 10px;
        }

        /* Tags */
        .post-tags {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 40px;
          padding-top: 30px;
          border-top: 1px solid var(--border-color);
        }

        .tag {
          padding: 8px 16px;
          background: rgba(139, 92, 246, 0.15);
          border-radius: 50px;
          color: var(--accent-purple);
          font-size: 0.9rem;
        }

        /* Share */
        .share-section {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: 30px;
          color: var(--text-secondary);
        }

        .share-buttons {
          display: flex;
          gap: 10px;
        }

        .share-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        .share-btn:hover {
          transform: translateY(-3px);
        }
        .share-btn.zalo:hover { background: #0068ff; border-color: #0068ff; }
        .share-btn.twitter:hover { background: #000; border-color: #000; }
        .share-btn.linkedin:hover { background: #0a66c2; border-color: #0a66c2; }

        /* Related Posts */
        .related-posts {
          background: var(--bg-card);
          padding: 60px 0;
          border-top: 1px solid var(--border-color);
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .related-posts h3 {
          font-size: 1.5rem;
          color: white;
          margin-bottom: 30px;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 25px;
        }

        .related-card {
          display: flex;
          gap: 15px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          transition: all 0.3s;
        }
        .related-card:hover {
          border-color: var(--accent-purple);
          transform: translateY(-3px);
        }

        .related-image {
          width: 120px;
          flex-shrink: 0;
        }
        .related-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .related-content {
          padding: 15px 15px 15px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .related-content h4 {
          color: white;
          font-size: 0.95rem;
          margin-bottom: 8px;
          line-height: 1.4;
        }
        .related-content span {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        @media (max-width: 768px) {
          .post-hero { height: 350px; }
          .hero-content h1 { font-size: 1.8rem; }
          .related-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

// Helper to format markdown-like content to HTML
function formatContent(content: string): string {
  // Function to escape HTML entities
  const escapeHtml = (text: string): string => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  let result = content;

  // Handle fenced code blocks (```) - extract and escape first
  result = result.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`;
  });

  // Handle inline code (`)
  result = result.replace(/`([^`]+)`/g, (_, code) => {
    return `<code>${escapeHtml(code)}</code>`;
  });

  // Handle headers (must be at start of line)
  result = result.replace(/^### (.*)$/gm, '<h3>$1</h3>');
  result = result.replace(/^## (.*)$/gm, '<h2>$1</h2>');

  // Handle bold text
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Handle unordered lists
  result = result.replace(/^- (.*)$/gm, '<li>$1</li>');
  result = result.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

  // Handle line breaks - convert single newlines to <br> and double to paragraph breaks
  result = result
    .split('\n\n')
    .map(paragraph => {
      // Don't wrap already-wrapped elements
      if (paragraph.trim().startsWith('<h') ||
        paragraph.trim().startsWith('<pre') ||
        paragraph.trim().startsWith('<ul') ||
        paragraph.trim().startsWith('<li')) {
        return paragraph;
      }
      // Wrap regular paragraphs
      if (paragraph.trim()) {
        return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`;
      }
      return '';
    })
    .join('\n');

  return result;
}
