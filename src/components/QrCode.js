import React, { useState } from "react";


export const QrCode = () => {
    const [img, setImg] = useState();
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState("https://www.linkedin.com/in/adithya-ss-26b936260/");
    const [qrSize, setQrSize] = useState("150");
    async function generateQR() {
        setLoading(true);
        try{
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        }catch(error) {  
            console.error("Error While Generating QR code ", error);
        }finally {
            setLoading(false);
        }
    }

    function downloadQr(){
        fetch(img)
        .then((response) => response.blob())
        .then((blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download="QRcode.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
        })
        .catch((error) => {
            console.error("Error While Downloading QR Code", error);
        });
    }
    return(
        <div className="app-container">
            <div>
                <h1>QR CODE GENERATOR</h1>
                {loading && <p>Please wait...</p>}
                {img && <img src = {img}  alt ="pic" className="Qr-image"/>}

                <label htmlFor="dataInput" className="input-label">
                Data for QR Code:
                </label>
                <input type="text" value={qrData} id="dataInput" placeholder="Enter data for Qr Code" onChange={(e) => setQrData (e.target.value)} />
                <label htmlFor="sizeInput" className="input-label">
                Image size (e,g., 100):
                </label>
                <input type="text" value={qrSize} id="sizeInput" placeholder="Enter Image Size" onChange={(e) => setQrSize (e.target.value)} />
                <button className="gen-button" disabled= {loading} onClick={generateQR}>Generate QR Code</button>
                <button className="down-button" onClick={downloadQr}>Download QR Code</button>
            </div>
            <p className="footer">
                Designed by <a href="https://www.linkedin.com/in/adithya-ss-26b936260/">
                 Adithya SS </a></p>
        </div>
    )
}