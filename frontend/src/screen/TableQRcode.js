import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import {Link} from 'react-router-dom'

const TableQrCode = () => {
  
  const { id } = useParams();

  const [tableExists, setTableExists] = useState(false); 

  const [qrCodeValue, setQRCodeValue] = useState('');

  useEffect(() => {
    fetchTables();

    if (id) {
      const homeURL = window.location.origin;
      const qrCode = `${homeURL}/table/${id}`;
      setQRCodeValue(qrCode);
    } 
  }, [id]);


  const fetchTables = async () => {
    try {
      const response = await fetch('/api/menuItems/tables');
      if (response.ok) {
        const data = await response.json();
        

        const tableExists = data.some(table => table._id === Number(id));
        setTableExists(tableExists);

       
      } else {
        throw new Error('Failed to fetch tables');
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  
  const downloadQRCode = () => {
    const canvas = document.querySelector("canvas"); // Get the canvas element containing the QR code
    const imageData = canvas.toDataURL("image/png"); // Convert the canvas to a data URL representing a PNG image
  
    const filename = `qrcode_${id}.png`; // Use the table ID from the URL params in the filename
  
    // Create a temporary anchor element
    const anchor = document.createElement("a");
    anchor.href = imageData; 
    anchor.download = filename; 
  
    anchor.click();
    
    
  };


  const printQRCode = () => {
    window.print();
  };

  if (!tableExists) {
    
    return <div>Table does not exist.</div>;
  }

  return (<div>
    <div style={{display:'flex', justifyContent:'space-between'}}>
    <h3 className='logo'><Link to='/admin/tablelist' style={{margin:"5px",  textDecoration: 'none'}}>Go Back</Link></h3>
          <button className='cart-btn' onClick={downloadQRCode} style={{margin:"5px"}}>
            Download QR Code
          </button>
          
        </div>
        <div style={{marginLeft:"88%"}}>
        <button className='cart-btn' onClick={printQRCode} >
            Print QR Code
          </button></div>
    <div className="qrcode-container">
      <div className="qrcode-detail">
        <div className="qr-code-center">
          <QRCode value={qrCodeValue} size={420} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default TableQrCode;
