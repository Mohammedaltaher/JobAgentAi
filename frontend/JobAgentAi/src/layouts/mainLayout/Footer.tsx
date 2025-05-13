import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Twitter, Linkedin } from "lucide-react"
import "./Footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">JobAgentAI</h3>
            <p className="footer-text">
              AI-powered job hunting platform that finds the perfect job matches and creates tailored CVs for you.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <Twitter className="social-icon" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="social-link">
                <Github className="social-icon" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="social-link">
                <Linkedin className="social-icon" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3 className="footer-subtitle">Company</h3>
            <ul className="footer-list">
              <li>
                <a href="#" className="footer-link">About</a>
              </li>
              <li>
                <a href="#" className="footer-link">Careers</a>
              </li>
              <li>
                <a href="#" className="footer-link">Contact</a>
              </li>
              <li>
                <a href="#" className="footer-link">Blog</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-subtitle">Legal</h3>
            <ul className="footer-list">
              <li>
                <a href="#" className="footer-link">Terms</a>
              </li>
              <li>
                <a href="#" className="footer-link">Privacy</a>
              </li>
              <li>
                <a href="#" className="footer-link">Cookies</a>
              </li>
              <li>
                <a href="#" className="footer-link">Licenses</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-subtitle">Subscribe</h3>
            <p className="footer-text">Stay updated with the latest job market trends and features</p>
            <form className="subscribe-form">
              <Input
                placeholder="Enter your email"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                className="subscribe-input"
              />
              <Button type="submit" className="subscribe-button">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">© {new Date().getFullYear()} JobAgentAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}