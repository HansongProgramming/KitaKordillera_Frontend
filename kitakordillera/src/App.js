
import React, { useState } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState('consultation');
  const [image, setImage] = useState(null);
  const [patientInfo, setPatientInfo] = useState({
    fullname: '',
    dob: '',
    gender: '',
    phone: '',
    address: '',
    familyHistory: '',
    previousDiagnosis: '',
  });

  const handleSubmitConsultation = (e) => {
    e.preventDefault();
    setPage('patientInfo');
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePatientInfoChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPatientInfo = (e) => {
    e.preventDefault();
    setPage('results');
  };

  if (page === 'consultation') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="App" style={{ maxWidth: 500, width: '100%', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2>KitaKordillera</h2>
          <div style={{ marginBottom: 20, background: '#f9f9f9', padding: 16, borderRadius: 6, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <strong>Disclaimer:</strong> This tool is for informational purposes only and does not replace professional medical advice.
          </div>
          <form onSubmit={handleSubmitConsultation}>
            <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'row', gap: 16}}> 
              <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: '1px solid #ccc', padding: 16, borderRadius: 8, flex:1}}>
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
                    style={{ padding: '8px 16px' }}
                    onClick={() => document.getElementById('upload-image').click()}
                  >
                    Upload Image
                  </button>
                </label>
                {image && (
                  <img src={image} alt="Preview" style={{ maxWidth: '100%', borderRadius: 8, marginTop: 8 }} />
                )}
              </div>
              <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: '1px solid #ccc', padding: 16, borderRadius: 8, flex: 1}}>
                <button type="button" style={{ padding: '8px 16px' }}>Open Camera</button>
              </div> 
            </div>            
            <button type="submit" style={{ padding: '10px 24px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>Submit</button>
          </form>
        </div>
      </div>
    );
  }

  if (page === 'patientInfo') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="App" style={{ maxWidth: 500, width: '100%', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2>Patient Information</h2>
          <form onSubmit={handleSubmitPatientInfo}>
            <div style={{ marginBottom: 12 }}>
              <label>Full Name:</label><br />
              <input type="text" name="fullname" value={patientInfo.fullname} onChange={handlePatientInfoChange} required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Date of Birth:</label><br />
              <input type="date" name="dob" value={patientInfo.dob} onChange={handlePatientInfoChange} required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Gender:</label><br />
              <select name="gender" value={patientInfo.gender} onChange={handlePatientInfoChange} required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Phone Number:</label><br />
              <input type="tel" name="phone" value={patientInfo.phone} onChange={handlePatientInfoChange} required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Address:</label><br />
              <input type="text" name="address" value={patientInfo.address} onChange={handlePatientInfoChange} required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Family History of Cancer:</label><br />
              <select name="familyHistory" value={patientInfo.familyHistory} onChange={handlePatientInfoChange} required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}>
                <option value="">Select</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            {patientInfo.familyHistory === 'Yes' && (
              <div style={{ marginBottom: 12 }}>
                <label>Previous Diagnosis:</label><br />
                <input type="text" name="previousDiagnosis" value={patientInfo.previousDiagnosis} onChange={handlePatientInfoChange} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
              </div>
            )}
            <button type="submit" style={{ padding: '10px 24px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>Submit</button>
          </form>
        </div>
      </div>
    );
  }

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
