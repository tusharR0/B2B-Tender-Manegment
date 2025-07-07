// pages/tenders/create.tsx or CreateTender component

import { useState, useEffect } from 'react';

export default function CreateTender() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    deadline: '',
    budget: '',
    email: '', // Email added but hidden
  });

  // Fetch email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setForm(prev => ({ ...prev, email: storedEmail }));
    }
  }, []);

  const submit = async () => {
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:5000/api/tender', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || 'Submission failed');
    } else {
      alert('Tender created');
      setForm({ ...form, title: '', description: '', deadline: '', budget: '' }); // keep email
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Create Tender</h1>

      <input
        className="w-full border px-4 py-2 mb-3"
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        className="w-full border px-4 py-2 mb-3"
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="date"
        className="w-full border px-4 py-2 mb-3"
        value={form.deadline}
        onChange={e => setForm({ ...form, deadline: e.target.value })}
      />
      <input
        className="w-full border px-4 py-2 mb-3"
        placeholder="Budget"
        value={form.budget}
        onChange={e => setForm({ ...form, budget: e.target.value })}
      />

      <button
        onClick={submit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Submit Tender
      </button>
    </div>
  );
}
