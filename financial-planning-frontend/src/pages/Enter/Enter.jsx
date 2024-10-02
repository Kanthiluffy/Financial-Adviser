import React, { useState } from 'react';
import "./Enter.css";

const Enter = () => {
  const [formData, setFormData] = useState({
    phone: '',
    color: '',
    city: '3', // Default selected value for Las Vegas
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.agree) {
      newErrors.agree = 'You must enter the mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Form submitted successfully!');
      // Perform any further actions here
    }
  };

  return (
    <form name="demo-form" onSubmit={handleSubmit}>
      <div className="field">
        <h1>JS form validation</h1>
      </div>

      <div className="field">
        <label>
          Enter the valid phone number<i>*</i>
        </label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>

    

      <div className="field submit">
       

        <input type="submit" value="Go" />
      </div>
    </form>
  );
};

export default Enter;