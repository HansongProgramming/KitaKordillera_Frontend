import React, { useRef, useState } from "react";

const CaptureModal = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  React.useEffect(() => {
    if (isOpen) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Camera access error:", err));
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    }
  }, [isOpen]);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);
    onCapture(imageData);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          textAlign: "center",
          width: 400,
        }}
      >
        <h2>Capture Image</h2>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: "100%", borderRadius: 8 }}
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        {capturedImage && (
          <div style={{ marginTop: 10 }}>
            <h4>Preview:</h4>
            <img
              src={capturedImage}
              alt="Captured"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </div>
        )}
        <div style={{ marginTop: 15 }}>
          <button onClick={captureImage} style={{ marginRight: 8 }}>
            Capture
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CaptureModal;