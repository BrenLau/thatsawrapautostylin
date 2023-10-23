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
          <p>phone: <a href='tel:555-876-5309'>(555) 867-5309</a></p>
          <p> email: <a href='mailto:thatsawrapautostylin@gmail.com'>thatsawrapautostylin@gmail.com</a></p>
          <p>socials: FB,whatever</p>

        </div>
      </div>
      <ContactForm />
    </div>
  )
}

export default AboutMe
