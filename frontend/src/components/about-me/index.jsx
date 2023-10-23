import './about-me.css';
import ContactForm from './contact-form';

const AboutMe = () => {
  return (
    <div id="about-me">
      <h3 id='about-me-title'>about me/contact</h3>
      <div id="map-contact-container">
        <div id='google-map'>
          Google Map Here
        </div>
        <div id="contact-info">
          <p>address: 123 Sesame Street</p>
          <p>phone: (555) 867-5309</p>
          <p>email: john-doe@example.com</p>
          <p>socials: FB,whatever</p>

        </div>
      </div>
      <ContactForm />
    </div>
  )
}

export default AboutMe
