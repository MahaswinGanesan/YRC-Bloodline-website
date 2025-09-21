import React, { useEffect, useState } from 'react';
import './Requests.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Requests = () => {
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

  const handleClick = async (id) => {
    console.log("ID being sent:", id);
    await axios.post(`http://localhost:5000/api/request/${id}/accept`);
    alert("Mail sent successfully");
    navigate('/donor');
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/request')
      .then(res => {
        console.log("API Response: ", res.data);
        const data = Array.isArray(res.data) ? res.data : [res.data];
        setRequests(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div className='requests'>
      <div className="blood-cards">
        <h2>Blood Requests</h2>
        {requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          <ul>
            {requests.map((res) => (
              <li key={res._id}>
                <div className="request-cards">
                  <div className="field-row">
                    <span className="field-label">Patient Name</span>
                    <span className="field-colon">:</span>
                    <span className="field-value">{res.patName}</span>
                  </div>

                  <div className="field-row">
                    <span className="field-label">Needs</span>
                    <span className="field-colon">:</span>
                    <span className="field-value">{res.interests.join(', ')}</span>
                  </div>

                  <div className="field-row">
                    <span className="field-label">Blood Group</span>
                    <span className="field-colon">:</span>
                    <span className="field-value">{res.group}</span>
                  </div>

                  <div className="field-row">
                    <span className="field-label">Units</span>
                    <span className="field-colon">:</span>
                    <span className="field-value">{res.units}</span>
                  </div>

                  <div className="field-row">
                    <span className="field-label">Date</span>
                    <span className="field-colon">:</span>
                    <span className="field-value">{new Date(res.date).toLocaleDateString()}</span>
                  </div>

                  <div className="field-row">
                    <span className="field-label">Hospital Name</span>
                    <span className="field-colon">:</span>
                    <span className="field-value">{res.hosName}</span>
                  </div>

                  <div className="field-row">
                    <span className="field-label">Hospital Address</span>
                    <span className="field-colon">:</span>
                    <span className="field-value">{res.hosAddress}</span>
                  </div>

                  <div className="field-row">
                    <span className="field-label">Attender</span>
                    <span className="field-colon">:</span>
                    <span className="field-value">{res.attName}</span>
                  </div>

                  <div className="field-row">
                    <span className="field-label">Phone Number</span>
                    <span className="field-colon">:</span>
                    <span className="field-value">{res.attPhone}</span>
                  </div>

                  <div className="field-row">
                    <span className="field-label">Email</span>
                    <span className="field-colon">:</span>
                    <span className="field-value">{res.attEmail}</span>
                  </div>

                  <div className="buttons">
                    <button onClick={() => handleClick(res._id)} className='accept-button'>Accept</button>
                    <button className='reject-button'>Decline</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Requests;
