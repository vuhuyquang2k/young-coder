'use client';

// SVG Logo components
const GHTKLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" className="project-logo">
    <rect width="100" height="100" rx="20" fill="#FF6B35" />
    <g transform="translate(12, 22)">
      {/* Truck body */}
      <rect x="0" y="20" width="48" height="28" rx="4" fill="white" />
      {/* Truck cabin */}
      <path d="M48 28 L48 48 L72 48 L72 36 L60 28 Z" fill="white" />
      {/* Window */}
      <rect x="52" y="32" width="14" height="10" rx="2" fill="#FF6B35" />
      {/* Wheels */}
      <circle cx="18" cy="52" r="8" fill="#FF6B35" stroke="white" strokeWidth="4" />
      <circle cx="60" cy="52" r="8" fill="#FF6B35" stroke="white" strokeWidth="4" />
      {/* Speed lines */}
      <rect x="-8" y="26" width="10" height="3" rx="1.5" fill="white" opacity="0.8" />
      <rect x="-12" y="34" width="14" height="3" rx="1.5" fill="white" opacity="0.6" />
      <rect x="-6" y="42" width="8" height="3" rx="1.5" fill="white" opacity="0.8" />
    </g>
  </svg>
);

const GAMLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" className="project-logo">
    <rect width="100" height="100" rx="20" fill="#6366F1" />
    <g transform="translate(20, 18)">
      {/* AI Brain outline */}
      <ellipse cx="30" cy="32" rx="26" ry="24" stroke="white" strokeWidth="3" fill="none" />
      {/* Neural network nodes */}
      <circle cx="18" cy="24" r="5" fill="white" />
      <circle cx="42" cy="24" r="5" fill="white" />
      <circle cx="30" cy="40" r="5" fill="white" />
      <circle cx="16" cy="42" r="4" fill="white" opacity="0.7" />
      <circle cx="44" cy="42" r="4" fill="white" opacity="0.7" />
      <circle cx="30" cy="18" r="4" fill="white" opacity="0.7" />
      {/* Connections */}
      <line x1="18" y1="24" x2="30" y2="40" stroke="white" strokeWidth="2" />
      <line x1="42" y1="24" x2="30" y2="40" stroke="white" strokeWidth="2" />
      <line x1="18" y1="24" x2="42" y2="24" stroke="white" strokeWidth="2" />
      <line x1="30" y1="18" x2="18" y2="24" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="30" y1="18" x2="42" y2="24" stroke="white" strokeWidth="1.5" opacity="0.6" />
      {/* Antenna */}
      <line x1="30" y1="8" x2="30" y2="14" stroke="white" strokeWidth="2" />
      <circle cx="30" cy="6" r="3" fill="white" />
    </g>
  </svg>
);

const KSBLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" className="project-logo">
    <rect width="100" height="100" rx="20" fill="#10B981" />
    <g transform="translate(18, 16)">
      {/* Hexagon ecosystem */}
      <polygon points="32,4 56,18 56,46 32,60 8,46 8,18" stroke="white" strokeWidth="3" fill="none" />
      {/* Inner hexagon */}
      <polygon points="32,14 48,24 48,42 32,52 16,42 16,24" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.15" />
      {/* Leaf/Growth icon */}
      <path d="M32 20 C32 20 42 28 42 38 C42 46 38 52 32 52 C26 52 22 46 22 38 C22 28 32 20 32 20" fill="white" />
      <path d="M32 28 L32 46" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M27 36 L32 42 L37 36" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Connection dots */}
      <circle cx="32" cy="4" r="4" fill="white" />
      <circle cx="56" cy="18" r="4" fill="white" />
      <circle cx="56" cy="46" r="4" fill="white" />
      <circle cx="32" cy="60" r="4" fill="white" />
      <circle cx="8" cy="46" r="4" fill="white" />
      <circle cx="8" cy="18" r="4" fill="white" />
    </g>
  </svg>
);

const projects = [
  {
    title: 'GHTK - Giao Hàng Tiết Kiệm',
    description: 'Nền tảng logistics chuyên nghiệp hàng đầu Việt Nam. Cung cấp dịch vụ giao hàng cho E-Commerce, Business với các giải pháp Express, BBS, Fulfillment.',
    tech: ['Spring Boot', 'Next.js', 'MySQL', 'Redis'],
    color: '#FF6B35',
    url: 'https://ghtk.vn',
    Logo: GHTKLogo,
    features: ['Hệ thống tracking real-time', 'API integration', 'Dashboard analytics']
  },
  {
    title: 'GAM - Apollo AI Platform',
    description: 'Nền tảng giải pháp ứng dụng AI và công nghệ dữ liệu. Tự động hóa, nâng cao trải nghiệm khách hàng, cá nhân hóa với NLP, Computer Vision, Machine Learning.',
    tech: ['Next.js', 'Spring Boot'],
    color: '#6366F1',
    url: 'https://gam.vn',
    Logo: GAMLogo,
    features: ['AI Chatbot', 'Data Analytics', 'Automation']
  },
  {
    title: 'KSB Group',
    description: 'Hệ sinh thái kinh doanh đa ngành bao gồm F&B, hóa - mỹ phẩm, sản xuất – phân phối thực phẩm và hàng tiêu dùng nhập khẩu với mạng lưới phủ rộng toàn quốc.',
    tech: ['Next.js', 'Strapi', 'MySQL'],
    color: '#10B981',
    url: 'https://ksbgroup.vn',
    Logo: KSBLogo,
    features: ['E-commerce Platform', 'Inventory Management', 'B2B Portal']
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title"><span>Dự án nổi bật</span></h2>
        <p className="section-subtitle">Các dự án tôi đã tham gia phát triển</p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="project-header">
                <div className="project-logo-wrapper" style={{ background: `linear-gradient(135deg, ${project.color}22, ${project.color}44)` }}>
                  <project.Logo />
                </div>
                <div className="project-link-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>

              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-features">
                  {project.features.map(feature => (
                    <span key={feature} className="feature-tag">
                      <span className="feature-dot" style={{ background: project.color }}></span>
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="project-tech">
                  {project.tech.map(t => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>

              <div className="project-footer">
                <span className="visit-link" style={{ color: project.color }}>
                  Xem website
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .section-subtitle {
          text-align: center;
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin-top: -40px;
          margin-bottom: 50px;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .project-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.4s ease;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
        }

        .project-card:hover {
          transform: translateY(-10px);
          border-color: var(--accent-purple);
          box-shadow: 0 25px 50px rgba(0,0,0,0.4);
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .project-header {
          padding: 25px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .project-logo-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .project-logo-wrapper :global(.project-logo) {
          width: 60px;
          height: 60px;
          object-fit: contain;
        }

        .project-link-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: all 0.3s;
        }

        .project-card:hover .project-link-icon {
          background: var(--accent-purple);
          color: white;
          transform: rotate(45deg);
        }

        .project-content {
          padding: 0 25px;
          flex: 1;
        }

        .project-content h3 {
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
          margin-bottom: 12px;
        }

        .project-description {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .project-features {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .feature-tag {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .feature-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .project-tech {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tech-badge {
          padding: 6px 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-color);
          border-radius: 50px;
          font-size: 0.8rem;
          color: var(--accent-cyan);
          transition: all 0.3s;
        }

        .project-card:hover .tech-badge {
          border-color: rgba(0, 245, 255, 0.3);
        }

        .project-footer {
          padding: 20px 25px;
          margin-top: auto;
          border-top: 1px solid var(--border-color);
        }

        .visit-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: gap 0.3s;
        }

        .project-card:hover .visit-link {
          gap: 12px;
        }

        @media (max-width: 600px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }

          .project-content h3 {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </section>
  );
}
