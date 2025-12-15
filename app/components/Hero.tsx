'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const roles = [
    'Full-Stack Developer',
    'Spring Boot Expert',
    'Laravel Developer',
    'React Enthusiast',
    'Next.js Builder',
    'Vue.js Developer'
  ];

  const typeWriter = useCallback(() => {
    const currentText = roles[currentRole];

    if (isDeleting) {
      setDisplayText(prev => currentText.substring(0, prev.length - 1));
    } else {
      setDisplayText(prev => currentText.substring(0, prev.length + 1));
    }
  }, [currentRole, isDeleting]);

  useEffect(() => {
    const currentText = roles[currentRole];
    let timeout: number;

    if (!isDeleting && displayText === currentText) {
      // Finished typing, wait then start deleting
      timeout = 2000;
      timerRef.current = setTimeout(() => setIsDeleting(true), timeout);
    } else if (isDeleting && displayText === '') {
      // Finished deleting, move to next role
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    } else {
      // Continue typing or deleting
      timeout = isDeleting ? 50 : 100;
      timerRef.current = setTimeout(typeWriter, timeout);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [displayText, currentRole, isDeleting, typeWriter]);

  return (
    <section id="home" className="hero">
      {/* Animated orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          <span>Available for work</span>
        </div>

        <h1 className="hero-title">
          Xin chào, tôi là
          <br />
          <span className="gradient-text">Young Coder</span>
        </h1>

        <div className="hero-role">
          <span className="role-prefix">I am a </span>
          <span className="role-text">{displayText}</span>
          <span className="cursor">|</span>
        </div>

        <p className="hero-description">
          Lập trình viên đam mê xây dựng các ứng dụng web hiện đại và mạnh mẽ.
          Chuyên về <span className="highlight">Spring Boot</span>, <span className="highlight">Laravel</span>, <span className="highlight">ReactJS</span>, <span className="highlight">NextJS</span> và <span className="highlight">VueJS</span>.
        </p>

        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            Xem dự án
          </a>
          <a href="#contact" className="btn btn-outline">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Liên hệ ngay
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">4+</span>
            <span className="stat-label">Năm kinh nghiệm</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">20+</span>
            <span className="stat-label">Dự án hoàn thành</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">5+</span>
            <span className="stat-label">Công nghệ thành thạo</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="code-window">
          <div className="window-header">
            <div className="window-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <span className="window-title">developer.js</span>
          </div>
          <div className="code-content">
            <pre>
              <code>
                {`const developer = {
  name: "Young Coder",
  title: "Full-Stack Developer",
  skills: [
    "Spring Boot",
    "Laravel",
    "ReactJS",
    "NextJS",
    "VueJS"
  ],
  passion: "Building amazing apps",
  available: true
};

export default developer;`}
              </code>
            </pre>
          </div>
        </div>

        <div className="floating-icons">
          <div className="floating-icon react">
            <svg viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="2.5" fill="#61DAFB" />
              <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
              <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 16 16)" />
              <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 16 16)" />
            </svg>
          </div>
          <div className="floating-icon vue">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M2 4l14 24L30 4h-5.5L16 18.5 7.5 4H2z" fill="#41B883" />
              <path d="M7.5 4L16 18.5 24.5 4h-5L16 10.5 12.5 4h-5z" fill="#35495E" />
            </svg>
          </div>
          <div className="floating-icon spring">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 25.5c-6.351 0-11.5-5.149-11.5-11.5S9.649 4.5 16 4.5 27.5 9.649 27.5 16 22.351 27.5 16 27.5z" fill="#6cb52d" />
              <path d="M21.5 11.5c-1.5-1.5-4-1.5-5.5 0l-5.5 5.5c-1.5 1.5-1.5 4 0 5.5s4 1.5 5.5 0l5.5-5.5c1.5-1.5 1.5-4 0-5.5z" fill="#6cb52d" />
            </svg>
          </div>
          <div className="floating-icon laravel">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M6.5 10.5l7 4v8l-7-4v-8zm0 0l7-4 7 4-7 4-7-4z" stroke="#FF2D20" strokeWidth="2" fill="none" />
              <path d="M13.5 14.5l7-4v8l-7 4v-8z" stroke="#FF2D20" strokeWidth="2" fill="none" />
              <path d="M20.5 18.5l5-3v6l-5 3v-6z" stroke="#FF2D20" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          padding: 120px 80px 80px;
          position: relative;
          overflow: hidden;
          width: 100%;
          gap: 60px;
        }

        .hero-content {
          max-width: 650px;
          z-index: 2;
          margin-left: auto;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 20px;
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 50px;
          margin-bottom: 30px;
          font-size: 0.9rem;
          color: var(--accent-cyan);
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: #00ff88;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .hero-role {
          font-size: clamp(1.2rem, 3vw, 1.5rem);
          margin-bottom: 25px;
          font-weight: 500;
          min-height: 40px;
        }

        .role-prefix {
          color: var(--text-secondary);
        }

        .role-text {
          color: var(--accent-cyan);
        }

        .cursor {
          color: var(--accent-cyan);
          animation: blink 1s step-end infinite;
        }

        .hero-description {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 35px;
          line-height: 1.8;
        }

        .highlight {
          color: var(--accent-purple);
          font-weight: 600;
        }

        .hero-cta {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          margin-bottom: 50px;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        .stat {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 800;
          background: var(--cyber-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: var(--border-color);
        }

        .hero-visual {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .code-window {
          width: 400px;
          background: rgba(20, 20, 30, 0.9);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
        }

        .window-header {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid var(--border-color);
        }

        .window-dots {
          display: flex;
          gap: 8px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .dot.red { background: #ff5f56; }
        .dot.yellow { background: #ffbd2e; }
        .dot.green { background: #27ca3f; }

        .window-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .code-content {
          padding: 20px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          line-height: 1.6;
          color: #e0e0e0;
        }

        .code-content pre {
          margin: 0;
        }

        .code-content code {
          color: var(--accent-cyan);
        }

        .floating-icons {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
        }

        .floating-icon {
          position: absolute;
          width: 48px;
          height: 48px;
          animation: float 6s ease-in-out infinite;
        }

        .floating-icon svg {
          width: 100%;
          height: 100%;
        }

        .floating-icon.react {
          top: -30px;
          right: -30px;
          animation-delay: 0s;
        }

        .floating-icon.vue {
          bottom: -30px;
          right: 50px;
          animation-delay: -1.5s;
        }

        .floating-icon.spring {
          top: 50%;
          right: -50px;
          animation-delay: -3s;
        }

        .floating-icon.laravel {
          bottom: 50px;
          left: -40px;
          animation-delay: -4.5s;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }

        @media (max-width: 1100px) {
          .hero {
            grid-template-columns: 1fr;
            padding-top: 150px;
          }

          .hero-visual {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .hero-stats {
            gap: 20px;
          }

          .stat-divider {
            display: none;
          }

          .hero-cta {
            flex-direction: column;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
