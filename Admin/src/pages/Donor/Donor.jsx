import React from 'react'
import './Donor.css'
import axios from 'axios'

const Donor = () => {

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const form = new FormData(event.target);
            const name = form.get("name");
            const regno = form.get("regno");
            const dept = form.get("department");
            const year = form.get("year");
            const phone = form.get("phone");
            const date = form.get("date");
            const patName = form.get("patName");

            const response = await axios.post("http://localhost:5000/api/donor/Donor", {
                name,
                regno,
                dept,
                year,
                phone,
                date,
                patName
            });
            alert("Donor detail updated successfully");

        } catch (error) {
            console.log(error);
            alert("Error");
            return;
        }
    }

    return (
        <div className='donor'>
            <form onSubmit={onSubmitHandler}>
                <div className="donor-details">
                    <h2>Donor Details</h2>
                    <input type="text" name='name' placeholder='Donor name' required/>
                    <input type="number" name='regno' placeholder='Register number' required />
                    <select name="department" >
                        <option value="Aerospace Engineering">Aerospace Engineering</option>
                        <option value="Artiicial Intelligence and Data Science">Artiicial Intelligence and Data Science</option>
                        <option value="Automobile Engineering">Automobile Engineering</option>
                        <option value="Computer Technology">Computer Technology</option>
                        <option value="Electronics Engineering">Electronics Engineering</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Instrumentation Engineering">Instrumentation Engineering</option>
                        <option value="Production Technology">Production Technology</option>
                        <option value="Robotics and Automation">Robotics and Automation</option>
                        <option value="Rubber and Plastics Technology">Rubber and Plastics Technology</option>
                    </select>
                    <input type="number" name='phone' placeholder='Phone number' required />
                    <input type="number" name='year' placeholder='Year of study' required />
                    <p>Date of donation:</p>
                    <input type="date" name='date' required/>
                    <input type="text" name='patName' placeholder='Name of blood acceptor' required />
                    <button type='submit'  className='submit-btn'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Donor
