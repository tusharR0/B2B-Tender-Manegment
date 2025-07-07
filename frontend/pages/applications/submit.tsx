import { useState, useEffect } from 'react';

export default function SubmitProposal() {
  const [tenders, setTenders] = useState([]);
  const [form, setForm] = useState({ tender_id: '', proposal: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/tender')
      .then(res => res.json())
      .then(data => setTenders(data.tenders));
  }, []);

  const submit = async () => {
    const email = localStorage.getItem('email');
    if (!form.tender_id || !form.proposal || !email) {
      alert('Fill all fields');
      return;
    }

    await fetch('http://localhost:5000/api/application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, company_email: email })
    });

    alert('Proposal submitted!');
    setForm({ tender_id: '', proposal: '' });
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Submit Proposal</h2>
      <label htmlFor="tender-select" className="block mb-1 font-medium">
        Select Tender
      </label>
      <select
        id="tender-select"
        className="w-full border px-4 py-2 mb-3"
        value={form.tender_id}
        onChange={e => setForm({ ...form, tender_id: e.target.value })}
      >
        <option value="">Select Tender</option>
        {tenders.map(t => (
          <option key={t.id} value={t.id}>{t.title}</option>
        ))}
      </select>

      <textarea
        className="w-full border px-4 py-2 mb-3"
        placeholder="Your Proposal"
        value={form.proposal}
        onChange={e => setForm({ ...form, proposal: e.target.value })}
      />

      <button onClick={submit} className="bg-blue-600 text-white px-6 py-2 rounded">
        Submit
      </button>
    </div>
  );
}
