import React, { useState } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState('consultation');
  const [image, setImage] = useState(null);
    // Define handleCapture
  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

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
          <img src="images/KitaKordillera.png" alt="KitaKordillera Logo" style={{ maxWidth: 150 }} />
          <h2 style={{ fontSize: '40px', textShadow: '2px 2px 6px rgba(0, 0, 0, 0.3), -2px -2px 6px rgba(173, 216, 230, 0.5)' }}>
            KitaKordillera
          </h2>

          <div style={{ marginBottom: 20, background: '#f9f9f9', padding: 16, borderRadius: 6, textAlign: 'center' }}>
            <strong>Disclaimer:</strong> This tool is for informational purposes only and does not replace professional medical advice.
          </div>

          <form onSubmit={handleSubmit}>
            {/* Image Section Header */}
            <h2 style={{ fontSize: '24px', marginBottom: 12, textAlign: 'center' }}>Upload or Capture Image</h2>

            {/* Single Div for Upload & Camera */}
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              {/* Upload Image */}
              <input
                type="file"
                id="upload-image"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="upload-image">
                <button
                  type="button"
                  style={{ padding: '8px 16px', marginRight: 8 }}
                  onClick={() => document.getElementById('upload-image').click()}
                >
                  Upload Image
                </button>
              </label>

              {/* Open Camera */}
              <button type="button" style={{ padding: '8px 16px' }}>Open Camera</button>

              {/* Image Preview */}
              {image && (
                <div style={{ marginTop: 12 }}>
                  <img src={image} alt="Preview" style={{ maxWidth: '100%', borderRadius: 8 }} />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                style={{
                  padding: '10px 24px',
                  background: '#1976d2',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

    return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="App" style={{ maxWidth: 600, width: '100%', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2>Results</h2>

        {/* Camera Button */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ padding: '8px 16px', background: '#1976d2', color: '#fff', borderRadius: 4, cursor: 'pointer' }}>
            Capture Photo
            <input
              type="file"
              accept="image/*"
              capture="environment" // or "user" for front camera
              style={{ display: 'none' }}
              onChange={handleCapture}
            />
          </label>
        </div>

        <div style={{ marginBottom: 20, background: '#e3f2fd', padding: 16, borderRadius: 6 }}>
          <strong>Result:</strong> <span style={{ color: '#1976d2' }}>Sample Diagnosis</span>
        </div>

        <div style={{ marginBottom: 20 }}>
          <strong>Image:</strong><br />
          {image ? (
            <img src={image} alt="Captured" style={{ maxWidth: '100%', borderRadius: 8, marginTop: 8 }} />
          ) : (
            <div style={{ color: '#888', marginTop: 8 }}>No image captured.</div>
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
