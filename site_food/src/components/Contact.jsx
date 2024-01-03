import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles/Contact.css';
import Navs from '../components/Navs';

const Contact = () => {
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoyer les données par e-mail en utilisant Email.js
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_name: 'Rahma',  // Remplacez par votre nom ou le destinataire réel
        message: formData.message
      };

      await emailjs.send(
        'service_wu19pdj',  // Remplacez par votre service ID
        'template_i2iyzke', // Remplacez par votre template ID
        templateParams    // Remplacez par votre user ID
      );

      setIsSent(true);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
    }
  };

  return (
    <>
      <Navs></Navs>
      <body className='body-contact'>
        <div className={`wrapper centered ${isSent ? 'sent' : ''}`}>
          <article className="letter">
            <div className="side">
              <h1>Contact us</h1>
              <p>
                <textarea placeholder="Your message" name="message" value={formData.message} onChange={handleChange}
                ></textarea>
              </p>
            </div>
            <div className="side">
              <input className='input_contact' type="text" placeholder="Your name" name="name" value={formData.name} onChange={handleChange}
              />
              <input className='input_contact' type="email" placeholder="Your email" name="email" value={formData.email} onChange={handleChange}
              />
              <button className="btn-contact" onClick={handleSubmit}>Send</button>
            </div>
          </article>
          <div className="envelope front"></div>
          <div className="envelope back"></div>
        </div>
        <p className={`result-message centered ${isSent ? 'sent' : ''}`}>
          Thank you for your message
        </p>
      </body>
    </>
  );
};

export default Contact;
