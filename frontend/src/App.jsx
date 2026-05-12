import { useState } from 'react';
import './index.css';

const API_BASE = 'http://127.0.0.1:8000';

function App() {
  const [activeTab, setActiveTab] = useState('ask');
  
  // Ask State
  const [askRepo, setAskRepo] = useState('');
  const [askQuery, setAskQuery] = useState('');
  const [askLoading, setAskLoading] = useState(false);
  const [askResult, setAskResult] = useState(null);
  const [askError, setAskError] = useState('');

  // Load State
  const [loadUrl, setLoadUrl] = useState('');
  const [loadLoading, setLoadLoading] = useState(false);
  const [loadResult, setLoadResult] = useState(null);
  const [loadError, setLoadError] = useState('');

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!askRepo || !askQuery) return;
    
    setAskLoading(true);
    setAskError('');
    setAskResult(null);

    try {
      const response = await fetch(`${API_BASE}/ask?query=${encodeURIComponent(askQuery)}&repo_name=${encodeURIComponent(askRepo)}`);
      if (!response.ok) throw new Error('Failed to fetch answer. Make sure the repo is loaded.');
      const data = await response.json();
      setAskResult(data);
    } catch (err) {
      setAskError(err.message);
    } finally {
      setAskLoading(false);
    }
  };

  const handleLoad = async (e) => {
    e.preventDefault();
    if (!loadUrl) return;

    setLoadLoading(true);
    setLoadError('');
    setLoadResult(null);

    try {
      const response = await fetch(`${API_BASE}/load-repo?repo_url=${encodeURIComponent(loadUrl)}`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to load repository.');
      const data = await response.json();
      setLoadResult(data);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoadLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div>
        <h1 className="title text-gradient">AI Codebase Assistant</h1>
        <p className="subtitle">Ask questions, explore, and understand your repositories instantly.</p>
      </div>

      <div className="glass-panel">
        <div className="tabs">
          <div 
            className={`tab ${activeTab === 'ask' ? 'active' : ''}`}
            onClick={() => setActiveTab('ask')}
          >
            Ask Question
          </div>
          <div 
            className={`tab ${activeTab === 'load' ? 'active' : ''}`}
            onClick={() => setActiveTab('load')}
          >
            Load Repository
          </div>
        </div>

        {activeTab === 'ask' && (
          <form onSubmit={handleAsk}>
            <div className="grid-layout">
              <div className="input-group">
                <label>Repository Name</label>
                <input 
                  type="text" 
                  className="glass-input" 
                  placeholder="e.g., React" 
                  value={askRepo}
                  onChange={(e) => setAskRepo(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Your Question</label>
                <input 
                  type="text" 
                  className="glass-input" 
                  placeholder="What does the auth middleware do?" 
                  value={askQuery}
                  onChange={(e) => setAskQuery(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="btn" disabled={askLoading}>
              {askLoading ? <div className="spinner"></div> : 'Ask AI Assistant'}
            </button>

            {askError && (
              <div className="result-box">
                <span className="badge error">Error</span>
                <p>{askError}</p>
              </div>
            )}

            {askResult && (
              <div className="result-box">
                <span className="badge success">Answered</span>
                <div style={{ whiteSpace: 'pre-wrap' }}>{askResult.answer}</div>
              </div>
            )}
          </form>
        )}

        {activeTab === 'load' && (
          <form onSubmit={handleLoad}>
            <div className="input-group">
              <label>GitHub Repository URL</label>
              <input 
                type="url" 
                className="glass-input" 
                placeholder="https://github.com/username/repo" 
                value={loadUrl}
                onChange={(e) => setLoadUrl(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="btn" disabled={loadLoading}>
              {loadLoading ? <div className="spinner"></div> : 'Process & Index Repository'}
            </button>

            {loadError && (
              <div className="result-box">
                <span className="badge error">Error</span>
                <p>{loadError}</p>
              </div>
            )}

            {loadResult && (
              <div className="result-box">
                <span className="badge success">Success</span>
                <p style={{ marginBottom: '1rem' }}>{loadResult.message}</p>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-value">{loadResult.repo_name}</div>
                    <div className="stat-label">Repository</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{loadResult.files_found}</div>
                    <div className="stat-label">Files Analyzed</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{loadResult.chunks_created}</div>
                    <div className="stat-label">Chunks Indexed</div>
                  </div>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
