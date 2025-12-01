export default function Home() {
  return (
    <main className="container">
      <div className="content">
        <div className="logo">
          <h1>Multystamps</h1>
        </div>
        <div className="message">
          <h2>Contact Us</h2>
          <p>Get in touch with us or visit our webshop</p>
        </div>
        <div className="contact-links">
          <a 
            href="mailto:info@multystamps.be" 
            className="contact-button email-button"
          >
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            info@multystamps.be
          </a>
          <a 
            href="https://www.delcampe.net/nl/verzamelingen/store/multy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-button shop-button"
          >
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Visit Our Webshop
          </a>
        </div>
      </div>
    </main>
  )
}

