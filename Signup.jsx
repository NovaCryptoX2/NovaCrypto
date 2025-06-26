import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSignup = async () => {
    if (!name || !email) return alert('All fields required');
    const code = generateCode();

    // Store temp user and code in localStorage
    localStorage.setItem('pending_user', JSON.stringify({ name, email, code }));

    const templateParams = {
      user_name: name,
      code: code,
      user_email: email,
    };

    try {
      await emailjs.send('service_dgi4qmd', 'template_tzznx69', templateParams, 'fZ_0NZJ_EbvPkNe2S');
      alert('Verification code sent to your email');
      navigate('/verify');
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Failed to send verification email');
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleSignup} style={buttonStyle}>Send Verification Code</button>
    </div>
  );
}

const containerStyle = {
  padding: '2rem',
  maxWidth: '400px',
  margin: '0 auto',
  fontFamily: 'Arial',
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  fontSize: '1rem',
  borderRadius: '0.5rem',
  border: '1px solid #ccc',
};

const buttonStyle = {
  backgroundColor: '#0f766e',
  color: '#fff',
  padding: '0.75rem',
  border: 'none',
  borderRadius: '0.5rem',
  fontWeight: 'bold',
  cursor: 'pointer',
};