import React, { useState } from 'react';
import CaptureModal from "./components/capture";
import './App.css';

function App() {
  const [page, setPage] = useState('consultation');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);   // 👈 NEW: store actual file
  const [patientInfo, setPatientInfo] = useState({
    fullname: '',
    dob: '',
    gender: '',
    phone: '',
    address: '',
    familyHistory: '',
    previousDiagnosis: '',
  });

  const [results, setResults] = useState(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleSubmitConsultation = (e) => {
    e.preventDefault();
    setPage('patientInfo');
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);                       // 👈 store file object
      setImage(URL.createObjectURL(e.target.files[0])); // 👈 store preview URL
    }
  };

  const handlePatientInfoChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPatientInfo = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload an image first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);  // 👈 safe now, file is in state
    formData.append("patientInfo", JSON.stringify(patientInfo));

    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResults(data);
      setPage("results");
    } catch (err) {
      console.error("Error uploading:", err);
      alert("Failed to analyze image");
    }
  };

if (page === 'consultation') {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        className="App"
        style={{ maxWidth: 500, width: '100%', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
      >
        <img src="images/KitaKordillera.png" alt="KitaKordillera Logo" style={{ maxWidth: 150 }} />
          <h2 style={{ fontSize: '40px', textShadow: '2px 2px 6px rgba(0, 0, 0, 0.3), -2px -2px 6px rgba(173, 216, 230, 0.5)' }}>
            KitaKordillera
          </h2>

        <div
          style={{
            marginBottom: 20,
            background: '#f9f9f9',
            padding: 16,
            borderRadius: 6,
            textAlign: 'center'
          }}
        >
          <strong>Disclaimer:</strong> This tool is for informational purposes only and does not replace professional medical advice.
        </div>

        <form onSubmit={handleSubmitConsultation}>
          <div
            style={{
              marginBottom: 16,
              display: 'flex',
              flexDirection: 'row',
              gap: 16
            }}
          >
            {/* Upload Image */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid #ccc',
                padding: 16,
                borderRadius: 8,
                flex: 1
              }}
            >
              <input
                type="file"
                id="upload-image"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                style={{ padding: '8px 16px' }}
                onClick={() => document.getElementById('upload-image').click()}
              >
                Upload Image
              </button>
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  style={{ maxWidth: '100%', borderRadius: 8, marginTop: 8 }}
                />
              )}
            </div>

            {/* Capture Image */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid #ccc',
                padding: 16,
                borderRadius: 8,
                flex: 1
              }}
            >
              <button
                type="button"
                style={{ padding: '8px 16px' }}
                onClick={() => setModalOpen(true)}
              >
                Open Camera
              </button>

              {previewImage && (
                <div style={{ marginTop: 20 }}>
                  <img
                    src={previewImage}
                    alt="Captured Preview"
                    style={{ maxWidth: '100%', borderRadius: 8, marginTop: 8 }}
                  />
                </div>
              )}
            </div>
          </div>

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
        </form>

        {/* Camera Capture Modal */}
        {isModalOpen && (
          <CaptureModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onCapture={(img) => {
              setPreviewImage(img); // store the captured image
              setModalOpen(false); // close modal after capture
            }}
          />
        )}
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
        {results ? (
          <>
            <div style={{ marginBottom: 20, background: '#e3f2fd', padding: 16, borderRadius: 6 }}>
              <strong>Result:</strong>{" "}
              <span style={{ color: '#1976d2' }}>
                {results.metrics?.diagnosis || "No diagnosis"}
              </span>
            </div>
            {/* Nearest Optal Clinic */}
            <div style={{ marginBottom: 20 }}>
              <strong>Clinic Location:</strong>
              <div style={{ marginTop: 8, height: 300, borderRadius: 8, overflow: 'hidden' }}>
                <iframe
                  title="Baguio Eye Center Map" // unique title
                  width="100%"
                  height="100%"
                  style={{ border: 0 }} // must be an object
                  loading="lazy"
                  allowFullScreen
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.123456789!2d120.5960!3d16.4023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3392d8abcd12345%3A0xabcdef1234567890!2sBaguio%20Eye%20Center!5e0!3m2!1sen!2sph!4v1693300000000!5m2!1sen!2sph"
                ></iframe>
              </div>
            </div>


            <div style={{ marginBottom: 20 }}>
              <strong>Probability:</strong>{" "}
              <span style={{ color: '#388e3c' }}>
                {results.metrics?.probability || "N/A"}%
              </span>
            </div>
          </>
        ) : (
          <p>No results yet.</p>
        )}
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