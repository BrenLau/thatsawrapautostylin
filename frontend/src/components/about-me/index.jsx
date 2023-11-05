import './about-me.css';
import ContactForm from './contact-form';
import Maps from './map';

import { useEffect, useState } from 'react';

const AboutMe = () => {
  const [apiKey, setApiKey] = useState("")

  useEffect(() => {
    const getKey = async () => {
      const res = await fetch("/api/maps");

      const key = await res.json();

      setApiKey(key)
    };

    getKey();

  }, []);

  return (
    <div id="about-me">
      <h2 id='section-title'>About me/Contact</h2>
      <div id="map-contact-container">
        <div id="contact-info">
          <span>
            <p className='contact-header'>Address: </p>
            <p>123 Sesame Street,
            Los Angeles, CA 90210
            </p>
          </span>
          <span>
            <p className='contact-header'>Phone: </p>
            <p><a href='tel:555-876-5309'>(555) 867-5309</a></p>
          </span>
          <span>
            <p className='contact-header'>Email:</p>
            <p><a href='mailto:thatsawrapautostylin@gmail.com'>thatsawrapautostylin@gmail.com</a></p>
          </span>
          <span>
            <p>
            <i className="fa-brands fa-instagram"></i>
          </p>
          </span>

        </div>
        {apiKey && <Maps keyProp={apiKey} />}
      {/* <ContactForm /> */}
      </div>
    </div>
  )
}

export default AboutMe
