
import React, { useState } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState('consultation');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage('results');
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  if (page === 'consultation') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="App" style={{ maxWidth: 500, width: '100%', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2>KitaKordillera</h2>
          <div style={{ marginBottom: 20, background: '#f9f9f9', padding: 16, borderRadius: 6 }}>
            <strong>Disclaimer:</strong> This tool is for informational purposes only and does not replace professional medical advice.
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="upload-image" style={{ display: 'block', marginBottom: 8 }}>Upload Image:</label>
              <input type="file" id="upload-image" accept="image/*" onChange={handleImageUpload} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 8 }}>Take Image:</label>
              <button type="button" style={{ padding: '8px 16px' }}>Open Camera</button>
            </div>
            <button type="submit" style={{ padding: '10px 24px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>Submit</button>
          </form>
        </div>
      </div>
    );
  }

  // Results page
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="App" style={{ maxWidth: 600, width: '100%', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2>Results</h2>
        <div style={{ marginBottom: 20, background: '#e3f2fd', padding: 16, borderRadius: 6 }}>
          <strong>Result:</strong> <span style={{ color: '#1976d2' }}>Sample Diagnosis</span>
        </div>
        <div style={{ marginBottom: 20 }}>
          <strong>Image:</strong><br />
          {image ? (
            <img src={image} alt="Uploaded" style={{ maxWidth: '100%', borderRadius: 8, marginTop: 8 }} />
          ) : (
            <div style={{ color: '#888', marginTop: 8 }}>No image uploaded.</div>
          )}
        </div>
        <div style={{ marginBottom: 20 }}>
          <strong>Probability:</strong> <span style={{ color: '#388e3c' }}>85%</span>
        </div>
        <div style={{ marginBottom: 20 }}>
          <strong>Clinic Suggestion:</strong>
          <div style={{ marginTop: 8, height: 150, background: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
            [Map Placeholder]
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="button" style={{ padding: '8px 16px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>View Report</button>
          <button type="button" style={{ padding: '8px 16px', background: '#388e3c', color: '#fff', border: 'none', borderRadius: 4 }}>Print/Save Report</button>
        </div>
      </div>
    </div>
  );
}

export default App;
