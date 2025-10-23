
import React, { useState } from 'react';
import './home.css';
import { BsLightningChargeFill, BsShieldLock, BsLightbulb, BsPlug, BsClockHistory } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
      <div className="app dark-mode">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
          <TestimonialsSection />
        </main>
        <Footer />
      </div>
    );
  }
  
  function Navbar() {
    return (
      <nav className="navbar">
        <div className="navbar-logo">AI Summarizer</div>
        <div className="navbar-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#testimonials">Testimonials</a>
          <Link to="/login">Login</Link>
        </div>
      </nav>
    );
  }
  
  function HeroSection() {
    return (
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Summarize Less, Know More</h1>
          <p className="hero-subtitle">
            Our AI-powered summarizer condenses long articles, papers, and documents into key points, so you can stay informed, faster.
          </p>
          <div className="cta-buttons">
            <button className="cta-primary">Try it for Free</button>
            <button className="cta-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-visual">
          <img src="https://via.placeholder.com/600x300" alt="Dashboard preview" />
        </div>
      </section>
    );
  }
  
  function FeaturesSection() {
    return (
      <section className="features">
        <FeatureCard icon={<BsLightningChargeFill/>} title="Powered by Python" description="Leveraging the latest in AI to deliver smart, concise summaries." />
        <FeatureCard icon={<BsClockHistory/>}  title="Fast Summaries" description="Get summaries in seconds, not minutes." />
        <FeatureCard icon={<BsShieldLock/>} title="Privacy Focused" description="Your data is your own. We don't store it." />
        <FeatureCard icon={<BsLightbulb/>} title="Accurate Insights" description="Our AI provides human-like accuracy." />
        <FeatureCard icon={<BsPlug/>} title="Easy Integration" description="Integrate with your favorite apps." />
      </section>
    );
  }
  
  function FeatureCard({ icon, title, description }) {
      return (
        <div className="feature-card">
          <div className="feature-icon">{icon}</div>
          <h3 className="feature-title">{title}</h3>
          <p className="feature-description">{description}</p>
        </div>
      );
    }
  
  function PricingSection() {
    return (
      <section className="pricing">
        <h2 className="section-title">Find the Right Plan</h2>
        <div className="pricing-container">
          <PricingCard 
            title="Basic"
            price="$0"
            features={['Up to 10 summaries per month', 'Basic AI model', 'Community support']}
          />
          <PricingCard 
            title="Pro"
            price="$15"
            features={['Unlimited summaries', 'Advanced AI model', 'Priority support', 'API access']}
            isPro={true}
          />
          <PricingCard 
            title="Team"
            price="$25"
            features={['All Pro features', 'Team collaboration', 'Dedicated account manager']}
          />
        </div>
      </section>
    );
  }
  
  function PricingCard({ title, price, features, isPro }) {
    return (
      <div className={`pricing-card ${isPro ? 'pro' : ''}`}>
        <h3 className="pricing-title">{title}</h3>
        <div className="pricing-price">{price}<span style={{fontSize: '1rem', opacity: 0.7}}>/mo</span></div>
        <ul className="pricing-features">
          {features.map(feature => <li key={feature}>{feature}</li>)}
        </ul>
        <button className={isPro ? "cta-primary" : "cta-secondary"}>Get Started</button>
      </div>
    );
  }
  
  function TestimonialsSection() {
    return (
      <section className="testimonials">
        <h2 className="section-title">Loved by Professionals</h2>
        <div className="testimonial-container">
          <TestimonialCard 
            text="This tool has saved me hours of reading every week. It's a game-changer for my research."
            author="Dr. Jane Foster, Research Scientist"
          />
          <TestimonialCard 
            text="As a journalist, I need to get the gist of a story quickly. AI Summarizer is my go-to tool."
            author="John Doe, TechCrunch"
          />
        </div>
      </section>
    );
  }
  
  function TestimonialCard({ text, author }) {
    return (
      <div className="testimonial-card">
        <p className="testimonial-text">"{text}"</p>
        <p className="testimonial-author">- {author}</p>
      </div>
    );
  }
  
  function Footer() {
    return (
      <footer className="footer">
        <div className="footer-left">
          &copy; 2024 AI Summarizer. All Rights Reserved.
        </div>
        <div className="footer-right">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    );
  }
