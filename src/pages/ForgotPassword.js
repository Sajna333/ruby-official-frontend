import React, { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter your email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}
