import React, { useState, useRef } from 'react';
import './Accordion.css';
import { assets } from '../../assets/assets';

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  const contentRef = useRef(null);

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={onClick}>
        <p>{title}</p>
      </div>
      <div
        className="accordion-content"
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current.scrollHeight}px` : '0px',
        }}
      >
        <p>{content}</p>
      </div>
    </div>
  );
};

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: 'Formation of Red Cross',
      content: `The famous quote said by Jean Henry Dunant "By Thy power, let there be peace, O God!" after witnessing the battle Solferino, led to the formation of Red Cross Society. Initially, an International Committee of the Red Cross (ICRC) was formed to assist victims of armed conflicts.`,
    },
    {
      title: 'Internaltional Federation of Red Cross and Red Crescent Societies',
      content: `The International Federation of Red Cross and Red Crescent Societies (IFRC) is an international humanitarian organization with a unique worldwide network. It is a federation of all National Societies recognized by ICRC. IFRC commands an immense potential because it can mobilize local volunteers through National Society world over. It's mission is to improve the situation of the world's most vulnerable people and to assist National Societies in their work to promote co-operation between them.`,
    },
    {
      title: 'Indian Red Cross Society',
      content: `The Indian Red Cross Society (IRCS) was established under the provision of section 8 of the IRCS Act XV of 1920 with its National Head Quarters in New Delhi. The core focus of IRCS is to promote Humanitarian Principles and Values, Disaster Management, Health and Care in Community and Blood Services.`,
    },
    {
      title: 'Indian Red Cross Society, TamilNadu branch',
      content: `IRCS TamilNadu branch was formed on 27th November 1920 with its State Headquarters in Egmore, Chennai. Some of the activities that are carried by Tamilnadu branch are: AIDS/HIV awareness, Disaster Management, First Aid, Health Services`,
    },
    {
      title: 'YRC Organisational setup',
      content: (
          <>
            <p>Principal</p>
            <hr className='accordian-content-hr'/>
            <p>Programme Officer</p>
            <hr className='accordian-content-hr'/>
            <p>Office Bearers</p>
            <hr className='accordian-content-hr'/>
            <p>Student volunteers</p>
          </>
      ),
    },
    {
      title: 'YRC - MIT',
      content: (
          <>
            <p className='accordion-po'>Program Officers</p>
            <img className='accordion-content-img' src={assets.po1} alt="" />
            <p>Dr. G. Anand Kumar, Assistant Professor, Anna University</p>
            <hr className='accordion-content-hr'/>
            <br />
            <img className='accordion-content-img' src={assets.po2} alt="" />
            <p>Dr. M. Vijayakarthick, Associate Professor, Anna University</p>
          </>
      ),
    },
  ];

  return (
    <div className="accordion">
      {accordionData.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
