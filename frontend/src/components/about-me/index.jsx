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
      console.log("res from fetch: ", key)

      setApiKey(key)
    };

    getKey();
    console.log("setApiKey called: ", apiKey)

  }, [apiKey]);

  return (
    <div id="about-me">
      <h3 id='about-me-title'>about me/contact</h3>
      <div id="map-contact-container">
        {apiKey && <Maps keyProp={apiKey} />}
        <div id="contact-info">
          <p>address: 123 Sesame Street</p>
          <p>phone: <a href='tel:555-876-5309'>(555) 867-5309</a></p>
          <p> email: <a href='mailto:thatsawrapautostylin@gmail.com'>thatsawrapautostylin@gmail.com</a></p>
          <p>socials: FB,whatever</p>

        </div>
      <ContactForm />
      </div>
    </div>
  )
}

export default AboutMe
