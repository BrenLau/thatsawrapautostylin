import './about-me.css';
import ContactForm from './contact-form';
import Maps from './map';

const getApiKey = async() => {
  const key = await fetch('/api/maps', {method: "GET"})
  .then(res => res.text());


  console.log("\n\n\n\n\n\n\getApiKey/function", key, "\n\n\n\n\n\n\n");

  return key;
}
const AboutMe = () => {
  const apiKey = getApiKey();
  return (
    <div id="about-me">
      <h3 id='about-me-title'>about me/contact</h3>
      <div id="map-contact-container">
        <Maps apiKey={apiKey}/>
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
