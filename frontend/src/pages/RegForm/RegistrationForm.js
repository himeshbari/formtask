import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { motion, AnimatePresence } from 'framer-motion';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    resume: null,
    dob: '',
    hobbies: [],
    state: '',
    address: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating a delay of 2 seconds for demonstration purposes
        const response = await axios.get('http://localhost:8080/reg/get-reg');
        setFormData({
          name: '',
          gender: '',
          resume: null,
          dob: '',
          hobbies: [],
          state: '',
          address: '',
        });
      } catch (error) {
        console.error(error);
      } finally {
        // Hide the loader after 2 seconds
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? (checked ? [...prevData[name], value] : prevData[name].filter(item => item !== value)) : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate hobbies
    if (formData.hobbies.length < 2) {
      alert('Select at least two hobbies');
      return;
    }

    setLoading(true);

    // FormData for file upload
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await axios.post('http://localhost:8080/reg/add-reg', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Registration successful');
      // Clear the form after successful submission
      setFormData({
        name: '',
        gender: '',
        resume: null,
        dob: '',
        hobbies: [],
        state: '',
        address: '',
      });
    } catch (error) {
      console.error(error);
      alert('Error submitting registration');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Clear the form on cancel
    setFormData({
      name: '',
      gender: '',
      resume: null,
      dob: '',
      hobbies: [],
      state: '',
      address: '',
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container abc mt-5" style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', width: '80%' }}>
      <h1 className="text-primary mb-4">Registration Form</h1>
      <Link to="/reg-list" className="btn btn-success mb-3">
        Go to List
      </Link>

      {loading && (
        <div className="text-center">
          <RingLoader color="#007bff" size={80} loading={loading} />
        </div>
      )}

      {!loading && (
        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onSubmit={handleSubmit}
        >
          <AnimatePresence>
            <div className="row mb-3">
              <motion.div
                className="col-md-6"
                variants={itemVariants}
              >
                <label className="form-label">Name:</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
              </motion.div>
            </div>

            <div className="row mb-3">
              <motion.div
                className="col-md-6"
                variants={itemVariants}
              >
                <label className="form-label">Date of Birth:</label>
                <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} />
              </motion.div>

              <motion.div
                className="col-md-6"
                variants={itemVariants}
              >
                <label className="form-label">Gender:</label>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="male"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="female"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
              </motion.div>
            </div>

            <div className="row mb-3">
              <motion.div
                className="col-md-6"
                variants={itemVariants}
              >
                <label className="form-check-label"style={{fontWeight:'bold'}}>Hobbies:</label>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="hobbies" value="reading" onChange={handleChange} />
                  Reading
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="hobbies" value="sports" onChange={handleChange} />
                  Sports
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="hobbies" value="music" onChange={handleChange} />
                  Music
                </div>
              </motion.div>

              <motion.div
                className="col-md-6"
                variants={itemVariants}
              >
                <label className="form-label">State:</label>
                <select className="form-select" name="state" value={formData.state} onChange={handleChange}>
                  <option value="">Select State</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="rajasthan">Rajasthan</option>
                </select>
              </motion.div>
            </div>

            <div className="row mb-3">
              <motion.div
                className="col-md-6"
                variants={itemVariants}
              >
                <label className="form-label">Address:</label>
                <textarea className="form-control" name="address" value={formData.address} onChange={handleChange}></textarea>
              </motion.div>

              <motion.div
                className="col-md-6"
                variants={itemVariants}
              >
                <label className="form-label">Resume (docx only):</label>
                <input type="file" className="form-control" name="resume" accept=".docx" onChange={handleFileChange} required />
              </motion.div>
            </div>

            <div className="row mb-3">
              <motion.div
                className="col-md-12"
                variants={itemVariants}
              >
                <button type="submit" className="btn btn-info">
                  Submit
                </button>
                <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>
                  Cancel
                </button>
              </motion.div>
            </div>
          </AnimatePresence>
        </motion.form>
      )}
    </div>
  );
};

export default RegistrationForm;
