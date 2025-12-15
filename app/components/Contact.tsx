'use client';

import { useState } from 'react';

const EmailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: result.message || 'Tin nhắn đã được gửi thành công!' });
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus({ type: 'error', message: result.error || 'Đã xảy ra lỗi. Vui lòng thử lại.' });
            }
        } catch {
            setStatus({ type: 'error', message: 'Không thể kết nối. Vui lòng kiểm tra mạng và thử lại.' });
        } finally {
            setIsLoading(false);
        }
    };

    const contactLinks = [
        { href: 'mailto:quangvh.technical@gmail.com', icon: <EmailIcon />, label: 'quangvh.technical@gmail.com', color: '#EA4335' },
        { href: 'https://github.com/vuhuyquang2k', icon: <GitHubIcon />, label: 'github.com/vuhuyquang2k', color: '#ffffff' },
        { href: '#', icon: <LinkedInIcon />, label: 'LinkedIn (Coming soon)', color: '#0A66C2' },
        { href: 'https://facebook.com/homie2100', icon: <FacebookIcon />, label: 'facebook.com/homie2100', color: '#1877F2' },
    ];

    return (
        <section id="contact" className="contact">
            <div className="container">
                <h2 className="section-title"><span>Liên hệ</span></h2>
                <div className="contact-content">
                    <div className="contact-info">
                        <h3>Hãy kết nối với tôi!</h3>
                        <p>Bạn có dự án thú vị? Hãy liên hệ để chúng ta cùng hợp tác tạo ra những sản phẩm tuyệt vời.</p>
                        <div className="contact-links">
                            {contactLinks.map((link) => (
                                <a key={link.href} href={link.href} className="contact-link" target={link.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">
                                    <span className="link-icon" style={{ color: link.color }}>{link.icon}</span>
                                    <span>{link.label}</span>
                                    <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        {status && (
                            <div className={`status-message ${status.type}`}>
                                {status.type === 'success' ? '✅' : '❌'} {status.message}
                            </div>
                        )}
                        <div className="form-group">
                            <label>Họ tên</label>
                            <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Nhập họ tên của bạn" required disabled={isLoading} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com" required disabled={isLoading} />
                        </div>
                        <div className="form-group">
                            <label>Tin nhắn</label>
                            <textarea rows={5} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Nội dung tin nhắn..." required disabled={isLoading}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" opacity="0.25" />
                                        <path d="M12 2a10 10 0 0 1 10 10" />
                                    </svg>
                                    Đang gửi...
                                </>
                            ) : (
                                <>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                    Gửi tin nhắn
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
            <style jsx>{`
        .contact-content { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; max-width: 1000px; margin: 0 auto; }
        .contact-info h3 { font-size: 1.8rem; font-weight: 700; margin-bottom: 15px; }
        .contact-info p { color: var(--text-secondary); margin-bottom: 30px; line-height: 1.7; }
        .contact-links { display: flex; flex-direction: column; gap: 15px; }
        .contact-link { 
          display: flex; 
          align-items: center; 
          gap: 15px; 
          padding: 18px 20px; 
          background: var(--bg-card); 
          border: 1px solid var(--border-color); 
          border-radius: 16px; 
          text-decoration: none; 
          color: var(--text-secondary); 
          transition: all 0.3s ease;
        }
        .contact-link:hover { 
          border-color: var(--accent-cyan); 
          color: white; 
          transform: translateX(10px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        .link-icon { 
          width: 28px; 
          height: 28px; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          flex-shrink: 0;
        }
        .link-icon :global(svg) { width: 24px; height: 24px; }
        .contact-link span:nth-child(2) { flex: 1; font-weight: 500; }
        .arrow-icon { 
          opacity: 0; 
          transform: translateX(-10px); 
          transition: all 0.3s ease;
          color: var(--accent-cyan);
        }
        .contact-link:hover .arrow-icon { 
          opacity: 1; 
          transform: translateX(0); 
        }
        .contact-form { display: flex; flex-direction: column; gap: 20px; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: 500; color: var(--text-secondary); }
        .form-group input, .form-group textarea { 
          width: 100%; 
          padding: 16px 18px; 
          background: var(--bg-card); 
          border: 1px solid var(--border-color); 
          border-radius: 12px; 
          color: white; 
          font-size: 1rem; 
          font-family: inherit; 
          transition: all 0.3s ease;
        }
        .form-group input::placeholder, .form-group textarea::placeholder {
          color: var(--text-muted);
        }
        .form-group input:focus, .form-group textarea:focus { 
          outline: none; 
          border-color: var(--accent-cyan);
          box-shadow: 0 0 0 3px rgba(0, 245, 255, 0.1);
        }
        .btn { display: inline-flex; align-items: center; gap: 10px; justify-content: center; }
        .btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .form-group input:disabled, .form-group textarea:disabled { opacity: 0.6; cursor: not-allowed; }
        .status-message {
          padding: 15px 20px;
          border-radius: 12px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .status-message.success {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10b981;
        }
        .status-message.error {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) { .contact-content { grid-template-columns: 1fr; gap: 40px; } }
      `}</style>
        </section>
    );
}
