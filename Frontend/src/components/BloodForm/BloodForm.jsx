import React, { useState } from 'react';
import './BloodForm.css';
import axios from 'axios';

const BloodForm = ({isLogin}) => {
  const [interests, setInterests] = useState([]);
  const [formError, setFormError] = useState('');

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setInterests([...interests, value]);
    } else {
      setInterests(interests.filter((item) => item !== value));
    }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (interests.length === 0) {
        setFormError('Please select at least one of Blood / Plasma / Platelets.');
        return;
      } else {
        setFormError('');
      }

        const form = new FormData(e.target);
        const patName = form.get("patName");
        const patPhone = form.get("patPhone");
        const group = form.get("group");
        const units = form.get("units");
        const date = form.get("date");
        const hosName = form.get("hosName");
        const hosAddress = form.get("hosAddress");
        const attName = form.get("attName");
        const attPhone = form.get("attPhone");
        const attEmail = form.get("attEmail");
        const attRelation = form.get("attRelation");
      
      if (patPhone.length != 10 || attPhone.length != 10) {
        alert('Phone number must be exactly 10 digits.');
        return;
      }
      
      if (isLogin) {
        try {
          const response = await axios.post("http://localhost:5000/api/request/requestBlood", {
            patName,
            patPhone,
            interests,
            group,
            units,
            date,
            hosName,
            hosAddress,
            attName,
            attPhone,
            attEmail,
            attRelation
          });
          alert("Blood request sent successfully!");

          
        } catch (error) {
          if (error.response) {
            alert(error.response.data.message);
          } else {
            alert("Request failed");
          }
          console.log("Request sent error: ", error);
        }
      }
      else {
        e.preventDefault();
        alert("Login before requesting blood");
        return;
      }
  };

  return (
    <div>
      <div className="request-form" id='request-blood'>
        <form onSubmit={handleSubmit}>
          <p className='form-heading'>Blood donor request form</p>

          <div className="patient-details">
            <p>Enter Patient details</p>
            <div className="patient-details-field">
              <input type="text" name='patName' placeholder='Name' required />
              <input type="number" name='patPhone' placeholder='Phone number' required />
            </div>
          </div>

          <div className="blood-details-field">
            <p>Enter Blood details</p>
            <div className="multi-fields">
              <div className="multi-fields-up">
                <p><input type="checkbox" name='interests' value="blood" onChange={handleCheckboxChange} /> Blood</p>
                <p><input type="checkbox" name='interests' value="plasma" onChange={handleCheckboxChange} /> Plasma</p>
                <p><input type="checkbox" name='interests' value="platelets" onChange={handleCheckboxChange} /> Platelets</p>
              </div>
              {formError && <p style={{ color: 'red' }}>{formError}</p>}
              <div className="multi-fields-down">
                <p className='mfd-p'>Select the blood group</p>
                <select className='mfd-select' name="group">
                  <option value="A+ve">A+ve</option>
                  <option value="A-ve">A-ve</option>
                  <option value="B+ve">B+ve</option>
                  <option value="B-ve">B-ve</option>
                  <option value="O+ve">O+ve</option>
                  <option value="O-ve">O-ve</option>
                  <option value="A1+ve">A1+ve</option>
                  <option value="A1-ve">A1-ve</option>
                  <option value="A1B-ve">A1B-ve</option>
                  <option value="A1B+ve">A1B+ve</option>
                  <option value="A2B+ve">A2B+ve</option>
                  <option value="A2B-ve">A2B-ve</option>
                  <option value="Bombay Blood">Bombay blood</option>
                </select>
                <input name='units' type="number" placeholder='No. of units' required />
                <p className='mfd-p'>When do you need blood?</p>
                <input type="date" name="date" required />
              </div>
            </div>
          </div>

          <div className='hospital-details'>
            <p>Enter Hospital Details</p>
            <input type="text" name="hosName" placeholder='Hospital name' required />
            <textarea name="hosAddress" placeholder='Hospital Address' required />
          </div>

          <div className="attender-details">
            <p>Enter Attender details</p>
            <input type="text" name="attName" placeholder='Attender name' required />
            <input className='attender-phone' name="attPhone" type="text" placeholder='Attender Phone number' required />
            <input type="email" name="attEmail" placeholder='Attender Email' required />
            <input type="text" name="attRelation" placeholder='Attender relation with Patient' required />
          </div>

          <div className="form-submit">
            <button type="submit">Submit</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BloodForm;
