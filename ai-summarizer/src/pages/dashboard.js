
import React, { useState } from 'react';
import './dashboard.css';
import { FiCopy, FiDownload, FiUser, FiLogOut } from 'react-icons/fi';

// Mock data for history
const mockHistory = [
  { id: 1, title: 'Article on AI ethics', date: '2024-07-28' },
  { id: 2, title: 'Research paper on climate change', date: '2024-07-27' },
  { id: 3, title: 'Business report Q2', date: '2024-07-26' },
];

export default function DashboardPage() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');

  const handleSummarize = () => {
    // Mock summarization
    setSummary(`This is a summary of the text you entered: "${text.substring(0, 50)}..."`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
  };

  const handleDownload = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'summary.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="dashboard-page">
      <DashboardNavbar />
      <main className="dashboard-main">
        <div className="summarizer-workspace">
          <div className="input-section">
            <h2>Enter Your Text Below</h2>
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here..."
              maxLength="3000"
            />
            <div className="char-counter">{text.length}/3000</div>
            <button className="btn-primary" onClick={handleSummarize}>Summarize</button>
          </div>

          {summary && (
            <div className="output-section card">
                <div className="card-header">
                    <h3>Summary</h3>
                    <div className="card-actions">
                        <button onClick={handleCopy}><FiCopy /></button>
                        <button onClick={handleDownload}><FiDownload /></button>
                    </div>
                </div>
              <p>{summary}</p>
            </div>
          )}
        </div>
        <aside className="history-sidebar card">
          <h3>History</h3>
          <ul>
            {mockHistory.map(item => (
              <li key={item.id}>
                <span>{item.title}</span>
                <small>{item.date}</small>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
}

function DashboardNavbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">AI Summarizer</div>
      <div className="user-menu">
        <FiUser />
        <div className="dropdown">
          <a href="#profile">Profile</a>
          <a href="/login">Logout <FiLogOut /></a>
        </div>
      </div>
    </nav>
  );
}
