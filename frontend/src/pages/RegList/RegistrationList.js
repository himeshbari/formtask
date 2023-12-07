


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { RingLoader } from 'react-spinners';

const RegistrationList = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating a delay of 2 seconds for demonstration purposes
        setTimeout(async () => {
          const response = await axios.get('http://localhost:8080/reg/get-reg');
          setRegistrations(response.data.data);
        }, 2000);
      } catch (error) {
        console.error(error);
      } finally {
        // Hide the loader after 2 seconds
        setTimeout(() => {
          setLoading(false);
          setShowLoader(false);
        }, 2000);
      }
    };

    fetchData();
  }, []);

  const handleDownloadResume = (filename) => {
    window.open(`http://localhost:8080/uploads/${filename}`);
  };

  return (
    <div className="container xyz mt-5 " style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', position: 'relative' }}>
      <h1 className="text-primary mb-3">Registration List</h1>
      <Link to="/" className="btn btn-success mb-3">
        Go to Registration Form
      </Link>

      {showLoader && (
        <div className="text-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <RingLoader color="#007bff" size={80} loading={loading} />
        </div>
      )}

      {!loading && (
        <div className="row">
          {registrations.map((registration) => (
            <div key={registration._id} className="col-md-3 mb-4">
              <div className="card">
                <div className="card-body" style={{ transition: 'background-color 0.3s', borderRadius: '8px', ':hover': { backgroundColor: '#e0e0e0' } }}>
                  <p className="card-title">
                    <strong>Name:</strong>
                    {registration.name}
                  </p>
                  <p className="card-text">
                    <strong>Gender:</strong> {registration.gender}
                  </p>
                  <p className="card-text">
                    <strong>Date of Birth:</strong> {new Date(registration.dob).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>State:</strong> {registration.state}
                  </p>
                  <p className="card-text">
                    <strong>Address:</strong> {registration.address}
                  </p>
                  <p className="card-text">
                    <strong>Hobbies:</strong> {registration.hobbies.join(', ')}
                  </p>
                  <button className="btn btn-info" onClick={() => handleDownloadResume(registration.resume)}>
                    Download Resume
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegistrationList;
