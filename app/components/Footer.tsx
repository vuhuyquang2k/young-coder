'use client';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <span className="logo">&lt;Young<span className="highlight">Coder</span>/&gt;</span>
                        <p>Full-Stack Developer | Đam mê tạo ra những sản phẩm web tuyệt vời</p>
                    </div>
                    <div className="footer-links">
                        <a href="#home">Trang chủ</a>
                        <a href="#about">Giới thiệu</a>
                        <a href="#skills">Kỹ năng</a>
                        <a href="#projects">Dự án</a>
                        <a href="#contact">Liên hệ</a>
                    </div>
                    <div className="footer-social">
                        <a href="https://github.com/vuhuyquang2k" aria-label="GitHub" className="social-link">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        <a href="#" aria-label="LinkedIn" className="social-link">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <a href="mailto:quangvh.technical@gmail.com" aria-label="Email" className="social-link">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </a>
                        <a href="https://facebook.com/homie2100" aria-label="Facebook" className="social-link">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} Young Coder. Made with 💜 and lots of ☕</p>
                </div>
            </div>
            <style jsx>{`
        .footer { padding: 60px 0 30px; border-top: 1px solid var(--border-color); }
        .footer-content { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
        .logo { font-family: 'JetBrains Mono', monospace; font-size: 1.3rem; font-weight: 600; color: var(--accent-cyan); }
        .highlight { background: var(--cyber-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .footer-brand p { color: var(--text-muted); margin-top: 15px; font-size: 0.9rem; line-height: 1.6; }
        .footer-links { display: flex; flex-direction: column; gap: 12px; }
        .footer-links a { color: var(--text-secondary); text-decoration: none; font-size: 0.95rem; transition: color 0.3s; }
        .footer-links a:hover { color: var(--accent-cyan); }
        .footer-social { display: flex; gap: 15px; align-items: center; }
        .social-link { 
          width: 40px; 
          height: 40px; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          border-radius: 50%;
          color: var(--text-secondary);
          transition: all 0.3s ease;
        }
        .social-link svg { width: 20px; height: 20px; }
        .social-link:hover { 
          transform: translateY(-3px); 
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.3);
        }
        .footer-bottom { text-align: center; padding-top: 30px; border-top: 1px solid var(--border-color); }
        .footer-bottom p { color: var(--text-muted); font-size: 0.9rem; }
        @media (max-width: 768px) { 
          .footer-content { grid-template-columns: 1fr; text-align: center; } 
          .footer-links { flex-direction: row; flex-wrap: wrap; justify-content: center; } 
          .footer-social { justify-content: center; } 
        }
      `}</style>
        </footer>
    );
}
