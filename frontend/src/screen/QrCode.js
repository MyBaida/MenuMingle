import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import QRCode from 'qrcode.react';
import { Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const QrCode = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [tables, setTables] = useState([]);
  const [qrCodeValues, setQRCodeValues] = useState([]);

  const userInfo = useSelector(state => state.adminLogin.userInfo)
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
        navigate('/admin/login')
    }else{
        fetchTables();  
    }
   
  }, [userInfo, navigate]
  );

  const fetchTables = async () => {
    try {
      const response = await fetch('/api/menuItems/tables');
      if (response.ok) {
        const data = await response.json();
        setTables(data);
      } else {
        throw new Error('Failed to fetch tables');
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const generateQRCode = () => {
    const homeURL = window.location.origin; // Get the home screen URL
    const qrCodes = tables.map(table => `${homeURL}/table/${table._id}`);
    setQRCodeValues(qrCodes);
  };

  const printQRCode = () => {
    
    window.print();
  };

  return (
    
    <div className="grid-container">
  <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
  <div className="content-container">
    <Row className="align-items-center justify-content-center">
      <Col className="text-center">
        {/* <h1>QR Code</h1> */}
        <Button className="my-3" onClick={generateQRCode}>
          Generate QR Codes
        </Button>
      </Col>
    </Row>

    {qrCodeValues.length > 0 && (
      <div className='qrcode-container'>
        {qrCodeValues.map((qrCodeValue, index) => (
          <div key={index} className="qrcode-detail" >
            <div className="table-name">
              QRCode for Table {tables[index].name}
            </div>
            <div className="qr-code-container">
              <QRCode value={qrCodeValue} size={180} />
            </div>
            
          </div>
        ))}
        <div className="print">
          <Button className="my-3" onClick={printQRCode}>
            Print QR Codes
          </Button>
        </div>
      </div>
    )}
  </div>
</div>

  );
};

export default QrCode;
