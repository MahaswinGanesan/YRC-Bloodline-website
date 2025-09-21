import React, { useState } from 'react';
import './About.css';
import Accordion from '../../components/Accordion/Accordion';

const About = () => {

  return (
    <div className='about'>
        <hr className='about-hr'/>
        <br />
        <Accordion />
    </div>
  );
};

export default About;
