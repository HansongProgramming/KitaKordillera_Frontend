import React, { useState } from 'react';
import CaptureModal from "./components/capture";
import './App.css';

function App() {
  const [page, setPage] = useState('consultation');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);   // 👈 NEW: store actual file
  const [patientInfo, setPatientInfo] = useState({
    fullName: "",              // <-- updated
    dateOfBirth: "",           // <-- matches backend
    gender: "",
    phoneNumber: "",           // <-- updated
    address: "",
    familyHistoryOfCancer: "", // <-- updated
    previousDiagnosis: "",
    ongoingTreatments: "",
    patientId: "moment"
  });
  const [patientId, setPatientId] = useState('');


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
    setPatientInfo((prev) => {
      const updated = { ...prev, [name]: value };
      // console.log(updated); // log the latest state here
      return updated;
    });
  };

  const handleSubmitPatientInfo = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload an image first");
      return;
    }

    try {
      // 1. Save patient info
      const response = await fetch("http://localhost:8000/api/users/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientInfo),
      });

      const data = await response.json();
      setPatientId(data.patientId);

      // 2. Run analysis with image + patientId
      const formData = new FormData();
      formData.append("file", file);

      const analyzeRes = await fetch(
        `http://localhost:8000/analyze?patientId=${data.patientId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const analyzeData = await analyzeRes.json();
      console.log("Analysis:", analyzeData);

      setResults(analyzeData);   // 👈 use actual diagnosis
      setPage("results");

      // 3. Optional: also fetch stored diagnosis history if needed
      const diagnosis = await fetch(
        `http://localhost:8000/api/patients/search?query=${data.patientId}`
      );
      const diagData = await diagnosis.json();
      console.log("From DB:", diagData);

    } catch (err) {
      console.error("Error uploading or analyzing:", err);
      alert("Something went wrong");
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
              <input type="text" name="fullName" value={patientInfo.fullName} onChange={handlePatientInfoChange} required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Date of Birth:</label><br />
              <input type="date" name="dateOfBirth" value={patientInfo.dateOfBirth} onChange={handlePatientInfoChange} required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
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
              <input type="tel" name="phoneNumber" value={patientInfo.phoneNumber} onChange={handlePatientInfoChange} required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Address:</label><br />
              <input type="text" name="address" value={patientInfo.address} onChange={handlePatientInfoChange} required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Family History of Cancer:</label><br />
              <select name="familyHistoryOfCancer" value={patientInfo.familyHistoryOfCancer} onChange={handlePatientInfoChange} required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}>
                <option value="">Select</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            {patientInfo.familyHistoryOfCancer === 'Yes' && (
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
            {/* Show user info */}
            <div style={{ marginBottom: 20, background: '#f1f8e9', padding: 12, borderRadius: 6 }}>
              {results.user?.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>

            {/* Top finding */}
            <div style={{ marginBottom: 20, background: '#e3f2fd', padding: 16, borderRadius: 6 }}>
              <strong>Top Finding:</strong>{" "}
              <span style={{ color: '#1976d2' }}>
                {results.result?.[0]?.name || "No diagnosis"}
              </span>
              <br />
              Confidence:{" "}
              <span style={{ color: '#388e3c' }}>
                {(results.result?.[0]?.confidence * 100).toFixed(1) || "N/A"}%
              </span>
            </div>

            {/* Annotated image */}
            {/* {results.annotated_image && (
              <div style={{ marginBottom: 20 }}>
                <strong>Image:</strong><br />
                <img
                  src={`http://localhost:8000/outputs/${results.annotated_image}`}
                  alt="Annotated"
                  style={{ maxWidth: '100%', borderRadius: 8, marginTop: 8 }}
                />
              </div>
            )} */}

            {/* All findings list */}
            <div style={{ marginBottom: 20 }}>
              <strong>All Findings:</strong>
              <ul style={{ listStyleType: "none" }}>
                {results.result?.map((f, idx) => (
                  <li key={idx}>
                    {f.name} – {f.present ? "Present" : "Absent"} ({(f.confidence * 100).toFixed(1)}%)
                  </li>
                ))}
              </ul>
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