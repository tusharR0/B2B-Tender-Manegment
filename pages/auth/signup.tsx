import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const submit = async () => {
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      // ✅ Redirect to company profile page after signup
      router.push('/company/profile');
    } else {
      alert('Signup failed');
    }
  };

  return (
    <div className="page">
      <h2>Signup</h2>
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={submit}>Signup</button>
    </div>
  );
}
