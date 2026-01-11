'use client';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">
          <span>Về tôi</span>
        </h2>

        <div className="about-content">
          <div className="about-image">
            <div className="image-wrapper">
              <div className="image-glow"></div>
              <div className="profile-placeholder">
                <span className="profile-icon">👨‍💻</span>
              </div>
              <div className="floating-badge frontend">
                <span>Frontend</span>
              </div>
              <div className="floating-badge backend">
                <span>Backend</span>
              </div>
            </div>
          </div>

          <div className="about-text">
            <div className="about-intro">
              <h3>Lập trình viên Full-Stack</h3>
              <p className="tagline">Đam mê xây dựng sản phẩm số đột phá</p>
            </div>

            <p className="about-description">
              Với hơn <span className="highlight">4 năm kinh nghiệm</span> trong ngành phát triển phần mềm,
              tôi chuyên về xây dựng các ứng dụng web từ backend đến frontend. Tôi tin rằng code không chỉ
              là việc giải quyết vấn đề, mà còn là nghệ thuật tạo ra trải nghiệm người dùng tuyệt vời.
            </p>

            <p className="about-description">
              Tôi không ngừng học hỏi và cập nhật những công nghệ mới nhất để mang đến những giải pháp
              tốt nhất cho mỗi dự án. Mục tiêu của tôi là tạo ra những sản phẩm không chỉ hoạt động tốt
              mà còn mang lại giá trị thực sự cho người dùng.
            </p>

            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">🎯</div>
                <div className="highlight-text">
                  <h4>Tập trung vào chất lượng</h4>
                  <p>Code sạch, hiệu suất cao, dễ bảo trì</p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon">⚡</div>
                <div className="highlight-text">
                  <h4>Giải pháp hiện đại</h4>
                  <p>Sử dụng công nghệ tiên tiến nhất</p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon">🤝</div>
                <div className="highlight-text">
                  <h4>Hợp tác chặt chẽ</h4>
                  <p>Lắng nghe và thấu hiểu nhu cầu</p>
                </div>
              </div>
            </div>

            <div className="about-tech-stack">
              <span className="tech-label">Công nghệ yêu thích:</span>
              <div className="tech-tags">
                <span className="tech-tag spring">Spring Boot</span>
                <span className="tech-tag react">React</span>
                <span className="tech-tag next">Next.js</span>
                <span className="tech-tag vue">Vue.js</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about {
          position: relative;
          overflow: hidden;
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 80px;
          align-items: center;
        }

        .about-image {
          display: flex;
          justify-content: center;
        }

        .image-wrapper {
          position: relative;
          width: 300px;
          height: 350px;
        }

        .image-glow {
          position: absolute;
          inset: -20px;
          background: var(--primary-gradient);
          border-radius: 30px;
          filter: blur(40px);
          opacity: 0.4;
        }

        .profile-placeholder {
          position: relative;
          width: 100%;
          height: 100%;
          background: linear-gradient(145deg, rgba(30, 30, 50, 0.8), rgba(20, 20, 35, 0.9));
          border: 2px solid var(--border-color);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .profile-icon {
          font-size: 8rem;
        }

        .floating-badge {
          position: absolute;
          padding: 10px 20px;
          background: rgba(20, 20, 30, 0.95);
          border: 1px solid var(--border-color);
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          animation: float 4s ease-in-out infinite;
        }

        .floating-badge.frontend {
          top: 20px;
          right: -30px;
          color: var(--accent-cyan);
          border-color: rgba(0, 245, 255, 0.3);
        }

        .floating-badge.backend {
          bottom: 30px;
          left: -20px;
          color: var(--accent-purple);
          border-color: rgba(168, 85, 247, 0.3);
          animation-delay: -2s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .about-text {
          color: var(--text-secondary);
        }

        .about-intro {
          margin-bottom: 25px;
        }

        .about-intro h3 {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
        }

        .tagline {
          font-size: 1.1rem;
          color: var(--accent-cyan);
        }

        .about-description {
          font-size: 1.05rem;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .about-description .highlight {
          color: var(--accent-purple);
          font-weight: 600;
        }

        .about-highlights {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin: 35px 0;
        }

        .highlight-item {
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }

        .highlight-icon {
          font-size: 1.8rem;
        }

        .highlight-text h4 {
          font-size: 1rem;
          font-weight: 600;
          color: white;
          margin-bottom: 5px;
        }

        .highlight-text p {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .about-tech-stack {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .tech-label {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .tech-tags {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .tech-tag {
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 500;
          border: 1px solid;
          transition: all 0.3s ease;
        }

        .tech-tag.spring {
          color: #6cb52d;
          border-color: rgba(108, 181, 45, 0.3);
          background: rgba(108, 181, 45, 0.1);
        }

        .tech-tag.react {
          color: #61dafb;
          border-color: rgba(97, 218, 251, 0.3);
          background: rgba(97, 218, 251, 0.1);
        }

        .tech-tag.next {
          color: white;
          border-color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.1);
        }

        .tech-tag.vue {
          color: #42b883;
          border-color: rgba(66, 184, 131, 0.3);
          background: rgba(66, 184, 131, 0.1);
        }

        .tech-tag:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 900px) {
          .about-content {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .about-image {
            order: 1;
          }

          .about-text {
            order: 2;
          }

          .about-highlights {
            grid-template-columns: 1fr;
          }

          .highlight-item {
            padding: 15px;
            background: var(--bg-card);
            border-radius: 12px;
            border: 1px solid var(--border-color);
          }
        }

        @media (max-width: 500px) {
          .image-wrapper {
            width: 250px;
            height: 300px;
          }

          .profile-icon {
            font-size: 6rem;
          }

          .floating-badge.frontend {
            right: -10px;
          }

          .floating-badge.backend {
            left: -10px;
          }
        }
      `}</style>
    </section>
  );
}
