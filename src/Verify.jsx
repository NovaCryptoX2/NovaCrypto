import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Verify() {
  const [codeInput, setCodeInput] = useState('');
  const [expectedCode, setExpectedCode] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const pending = JSON.parse(localStorage.getItem('pending_user'));
    if (!pending) {
      alert('No verification in progress.');
      navigate('/signup');
    } else {
      setExpectedCode(pending.code);
      setUser({ name: pending.name, email: pending.email });
    }
  }, [navigate]);

  const handleVerify = () => {
    if (codeInput === expectedCode) {
      // Save verified user
      localStorage.setItem('verified_user', JSON.stringify(user));
      localStorage.removeItem('pending_user');
      alert('Email verified. Welcome!');
      navigate('/');
    } else {
      alert('Incorrect code');
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Verify Your Email</h2>
      <input
        type="text"
        placeholder="Enter 6-digit code"
        value={codeInput}
        onChange={(e) => setCodeInput(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleVerify} style={buttonStyle}>Verify</button>
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
